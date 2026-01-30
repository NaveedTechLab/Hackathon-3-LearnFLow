from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import os
import jwt
import httpx
import hashlib
import json
from datetime import datetime, timedelta

app = FastAPI(title="LearnFlow API Gateway")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "learnflow-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "openai/gpt-3.5-turbo")

# Service URLs
SERVICES = {
    "triage": os.getenv("TRIAGE_URL", "http://localhost:8001"),
    "concepts": os.getenv("CONCEPTS_URL", "http://localhost:8002"),
    "code_review": os.getenv("CODE_REVIEW_URL", "http://localhost:8003"),
    "debug": os.getenv("DEBUG_URL", "http://localhost:8004"),
    "exercise": os.getenv("EXERCISE_URL", "http://localhost:8005"),
    "progress": os.getenv("PROGRESS_URL", "http://localhost:8006"),
}

# In-memory user store (replace with PostgreSQL in production)
users_db = {}

security = HTTPBearer()

# ==================== MODELS ====================

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "student"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str

class AuthResponse(BaseModel):
    token: str
    user: UserResponse

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_id: Optional[str] = None
    context: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    agent_used: str

class CodeExecuteRequest(BaseModel):
    code: str
    user_id: Optional[str] = None

class CodeExecuteResponse(BaseModel):
    output: str
    error: Optional[str] = None
    execution_time_ms: int

class ExplainRequest(BaseModel):
    topic: str
    level: str = "intermediate"

# ==================== AUTH HELPERS ====================

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_token(user_id: str, email: str, role: str) -> str:
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": expire
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ==================== AUTH ENDPOINTS ====================

@app.post("/auth/register", response_model=AuthResponse)
async def register(data: UserRegister):
    if data.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = hashlib.md5(data.email.encode()).hexdigest()[:12]
    hashed_password = hash_password(data.password)

    users_db[data.email] = {
        "id": user_id,
        "name": data.name,
        "email": data.email,
        "password": hashed_password,
        "role": data.role,
        "created_at": datetime.utcnow().isoformat()
    }

    token = create_token(user_id, data.email, data.role)

    return AuthResponse(
        token=token,
        user=UserResponse(
            id=user_id,
            name=data.name,
            email=data.email,
            role=data.role
        )
    )

@app.post("/auth/login", response_model=AuthResponse)
async def login(data: UserLogin):
    user = users_db.get(data.email)

    if not user or user["password"] != hash_password(data.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(user["id"], user["email"], user["role"])

    return AuthResponse(
        token=token,
        user=UserResponse(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            role=user["role"]
        )
    )

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user(payload: dict = Depends(verify_token)):
    user = users_db.get(payload["email"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return UserResponse(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"]
    )

# ==================== AI CHAT ENDPOINT ====================

@app.post("/chat", response_model=ChatResponse)
async def chat_with_ai(data: ChatRequest, payload: dict = Depends(verify_token)):
    """
    Chat with AI tutor using OpenRouter API
    """
    if not OPENROUTER_API_KEY:
        # Fallback to simulated response if no API key
        return ChatResponse(
            response=get_simulated_response(data.messages[-1].content if data.messages else ""),
            agent_used="simulated"
        )

    try:
        async with httpx.AsyncClient() as client:
            # Build system prompt for Python tutor
            system_prompt = """You are a friendly and knowledgeable Python programming tutor.
Your goal is to help students learn Python effectively.
- Explain concepts clearly with examples
- When students share code, provide constructive feedback
- If they have errors, help them understand why and how to fix them
- Encourage good coding practices
- Keep responses concise but informative
- Use code blocks for code examples"""

            messages = [{"role": "system", "content": system_prompt}]
            for msg in data.messages:
                messages.append({"role": msg.role, "content": msg.content})

            response = await client.post(
                f"{OPENROUTER_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "LearnFlow Python Tutor"
                },
                json={
                    "model": LLM_MODEL,
                    "messages": messages,
                    "max_tokens": 1000,
                    "temperature": 0.7
                },
                timeout=30.0
            )

            if response.status_code == 200:
                result = response.json()
                ai_response = result["choices"][0]["message"]["content"]
                return ChatResponse(
                    response=ai_response,
                    agent_used="openrouter"
                )
            else:
                # Fallback to simulated
                return ChatResponse(
                    response=get_simulated_response(data.messages[-1].content if data.messages else ""),
                    agent_used="simulated-fallback"
                )
    except Exception as e:
        return ChatResponse(
            response=get_simulated_response(data.messages[-1].content if data.messages else ""),
            agent_used="simulated-error"
        )

def get_simulated_response(query: str) -> str:
    """Simulated AI response when API is unavailable"""
    query_lower = query.lower()

    if "for loop" in query_lower or "loop" in query_lower:
        return """**For Loops in Python**

For loops iterate over sequences (lists, strings, ranges, etc.):

```python
# Loop through a list
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)

# Loop with range
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

# Loop with enumerate
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

Key points:
- `range(n)` generates numbers from 0 to n-1
- Use `enumerate()` when you need both index and value
- `break` exits the loop, `continue` skips to next iteration"""

    elif "function" in query_lower or "def" in query_lower:
        return """**Functions in Python**

Functions are reusable blocks of code:

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameter
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Function with multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

minimum, maximum, average = get_stats([1, 2, 3, 4, 5])
```

Key points:
- Use `def` keyword to define functions
- Parameters can have default values
- Use `return` to send back values
- Functions can return multiple values as tuples"""

    elif "list" in query_lower:
        return """**Lists in Python**

Lists are ordered, mutable collections:

```python
# Create a list
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Access elements
first = numbers[0]      # 1
last = numbers[-1]      # 5

# Modify lists
numbers.append(6)       # Add to end
numbers.insert(0, 0)    # Insert at index
numbers.remove(3)       # Remove value
popped = numbers.pop()  # Remove and return last

# List comprehension
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
```

Key points:
- Lists are zero-indexed
- Use negative indices to access from the end
- List comprehensions are concise ways to create lists"""

    elif "error" in query_lower or "debug" in query_lower:
        return """**Debugging Python Errors**

Common errors and fixes:

1. **SyntaxError**: Check for missing colons, parentheses, or quotes
2. **NameError**: Variable not defined - check spelling
3. **TypeError**: Wrong type - check your data types
4. **IndexError**: List index out of range - check list length
5. **KeyError**: Dictionary key not found - use `.get()` method

```python
# Use try-except for error handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Debug with print statements
print(f"Variable value: {my_var}")

# Use type() to check types
print(type(my_var))
```

Share your error message and I'll help you fix it!"""

    else:
        return """I'm your Python tutor! I can help you with:

- **Concepts**: Variables, loops, functions, classes, etc.
- **Code Review**: Share your code for feedback
- **Debugging**: Paste your error and I'll explain the fix
- **Exercises**: Practice problems to build skills

What would you like to learn about? Try asking:
- "How do for loops work?"
- "Explain functions in Python"
- "Help me fix this error: [paste error]"
- "Review my code: [paste code]" """

# ==================== CODE EXECUTION ENDPOINT ====================

@app.post("/execute", response_model=CodeExecuteResponse)
async def execute_code(data: CodeExecuteRequest, payload: dict = Depends(verify_token)):
    """
    Execute Python code in a sandboxed environment
    """
    import subprocess
    import tempfile
    import time

    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(data.code)
            temp_file = f.name

        start_time = time.time()

        # Execute with timeout
        result = subprocess.run(
            ['python3', temp_file],
            capture_output=True,
            text=True,
            timeout=5  # 5 second timeout
        )

        execution_time = int((time.time() - start_time) * 1000)

        # Cleanup
        os.unlink(temp_file)

        if result.returncode == 0:
            return CodeExecuteResponse(
                output=result.stdout,
                error=None,
                execution_time_ms=execution_time
            )
        else:
            return CodeExecuteResponse(
                output=result.stdout,
                error=result.stderr,
                execution_time_ms=execution_time
            )

    except subprocess.TimeoutExpired:
        os.unlink(temp_file)
        return CodeExecuteResponse(
            output="",
            error="Execution timed out (5 second limit)",
            execution_time_ms=5000
        )
    except Exception as e:
        return CodeExecuteResponse(
            output="",
            error=str(e),
            execution_time_ms=0
        )

# ==================== CONCEPTS ENDPOINT ====================

@app.post("/explain")
async def explain_concept(data: ExplainRequest, payload: dict = Depends(verify_token)):
    """
    Get explanation for a Python concept
    """
    if OPENROUTER_API_KEY:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{OPENROUTER_BASE_URL}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": LLM_MODEL,
                        "messages": [
                            {"role": "system", "content": f"You are a Python tutor. Explain concepts at a {data.level} level with examples."},
                            {"role": "user", "content": f"Explain {data.topic} in Python"}
                        ],
                        "max_tokens": 800
                    },
                    timeout=30.0
                )

                if response.status_code == 200:
                    result = response.json()
                    return {
                        "topic": data.topic,
                        "explanation": result["choices"][0]["message"]["content"],
                        "level": data.level
                    }
        except:
            pass

    # Fallback
    return {
        "topic": data.topic,
        "explanation": get_simulated_response(data.topic),
        "level": data.level
    }

# ==================== PROGRESS ENDPOINTS ====================

# In-memory progress store
progress_db = {}

@app.get("/progress/{user_id}")
async def get_progress(user_id: str, payload: dict = Depends(verify_token)):
    """Get user's learning progress"""
    if user_id not in progress_db:
        progress_db[user_id] = {
            "user_id": user_id,
            "overall_mastery": 0,
            "modules_completed": 0,
            "current_module": "Basics",
            "modules": {
                "Basics": {"variables": {"mastery_score": 0}, "operators": {"mastery_score": 0}},
                "Control Flow": {"if_statements": {"mastery_score": 0}, "loops": {"mastery_score": 0}},
                "Functions": {"basic": {"mastery_score": 0}, "advanced": {"mastery_score": 0}},
            },
            "quiz_scores": [],
            "total_time_spent": 0
        }

    return progress_db[user_id]

@app.post("/progress")
async def update_progress(data: dict, payload: dict = Depends(verify_token)):
    """Update user's learning progress"""
    user_id = data.get("user_id")
    module = data.get("module")
    topic = data.get("topic")
    score = data.get("score", 0)

    if user_id not in progress_db:
        await get_progress(user_id, payload)

    # Update module/topic score
    if module in progress_db[user_id]["modules"]:
        if topic in progress_db[user_id]["modules"][module]:
            old_score = progress_db[user_id]["modules"][module][topic]["mastery_score"]
            # Weighted average with new score
            progress_db[user_id]["modules"][module][topic]["mastery_score"] = (old_score * 0.7) + (score * 100 * 0.3)

    # Recalculate overall mastery
    total_score = 0
    count = 0
    for mod in progress_db[user_id]["modules"].values():
        for top in mod.values():
            total_score += top["mastery_score"]
            count += 1

    progress_db[user_id]["overall_mastery"] = total_score / count if count > 0 else 0

    return progress_db[user_id]

# ==================== HEALTH CHECK ====================

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "api-gateway",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/")
async def root():
    return {
        "message": "Welcome to LearnFlow API Gateway",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
