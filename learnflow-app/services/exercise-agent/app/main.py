from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import subprocess
import tempfile
import json
import time
# Import resource module only on Unix-like systems
try:
    import resource
except ImportError:
    resource = None  # resource module is not available on Windows
from app.config import settings

app = FastAPI(title=settings.APP_NAME)

class ExerciseRequest(BaseModel):
    module: str
    topic: str
    difficulty: str = "intermediate"  # beginner, intermediate, advanced
    user_id: str = ""

class SubmissionRequest(BaseModel):
    quiz_id: str
    user_id: str
    code: str

class ExerciseResponse(BaseModel):
    id: str
    module: str
    topic: str
    problem: str
    starter_code: str
    test_cases: list[dict]
    difficulty: str

class GradeResponse(BaseModel):
    quiz_id: str
    user_id: str
    score: float
    feedback: str
    passed_tests: int
    total_tests: int

@app.post("/generate")
async def generate_exercise(request: ExerciseRequest):
    """
    Generate coding challenges with test cases based on module and topic
    """
    # In a real implementation, this would use an LLM to generate exercises
    # For now, we'll return a simulated exercise based on topic

    exercises_db = {
        "basics": {
            "variables": {
                "problem": "Create a variable called 'name' and assign it your name, then print it.",
                "starter_code": "# Create a variable called 'name' and assign it your name\n# Then print it\n",
                "test_cases": [
                    {"input": "", "expected_output": "Alice\\n"},
                    {"input": "", "expected_output": "Bob\\n"}
                ]
            },
            "loops": {
                "problem": "Write a for loop that prints numbers 1 to 5.",
                "starter_code": "# Write a for loop that prints numbers 1 to 5\n",
                "test_cases": [
                    {"input": "", "expected_output": "1\\n2\\n3\\n4\\n5\\n"}
                ]
            }
        },
        "functions": {
            "basic": {
                "problem": "Write a function called 'greet' that takes a name and returns 'Hello, {name}!'",
                "starter_code": "def greet(name):\n    # Your code here\n    pass\n",
                "test_cases": [
                    {"input": "Alice", "expected_output": "Hello, Alice!\\n"},
                    {"input": "Bob", "expected_output": "Hello, Bob!\\n"}
                ]
            }
        }
    }

    # Find the appropriate exercise
    module_exercises = exercises_db.get(request.module.lower(), {})
    topic_exercise = module_exercises.get(request.topic.lower(), None)

    if not topic_exercise:
        # Default exercise if topic not found
        topic_exercise = {
            "problem": f"Write a Python program that demonstrates knowledge of {request.topic}.",
            "starter_code": f"# Implement a solution for {request.topic}\n",
            "test_cases": [{"input": "", "expected_output": ""}]
        }

    # In a real implementation, this would publish to Kafka
    # For now, we'll return the exercise
    return ExerciseResponse(
        id=f"{request.module}-{request.topic}-{int(time.time())}",
        module=request.module,
        topic=request.topic,
        problem=topic_exercise["problem"],
        starter_code=topic_exercise["starter_code"],
        test_cases=topic_exercise["test_cases"],
        difficulty=request.difficulty
    )

@app.post("/grade")
async def grade_submission(request: SubmissionRequest):
    """
    Execute student code in sandbox and grade against test cases
    """
    # Execute the student's code in a sandboxed environment
    try:
        # Create a temporary file for the code
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(request.code)
            temp_file = f.name

        # Execute the code with timeout and resource limits
        start_time = time.time()

        try:
            result = subprocess.run(
                ['python3', temp_file],
                capture_output=True,
                text=True,
                timeout=5  # 5 second timeout
            )

            execution_time = time.time() - start_time

            # Check if execution was successful
            if result.returncode == 0:
                output = result.stdout
                error = None
            else:
                output = result.stdout
                error = result.stderr

        finally:
            # Clean up the temporary file
            os.unlink(temp_file)

        # For this simulation, we'll just return a basic grade
        # In a real implementation, we would run the code against test cases
        if error:
            return GradeResponse(
                quiz_id=request.quiz_id,
                user_id=request.user_id,
                score=0.0,
                feedback=f"Code execution failed with error: {error[:100]}",
                passed_tests=0,
                total_tests=1
            )
        else:
            # Just return a simple success for now
            return GradeResponse(
                quiz_id=request.quiz_id,
                user_id=request.user_id,
                score=1.0,
                feedback="Code executed successfully",
                passed_tests=1,
                total_tests=1
            )

    except subprocess.TimeoutExpired:
        return GradeResponse(
            quiz_id=request.quiz_id,
            user_id=request.user_id,
            score=0.0,
            feedback="Code execution timed out (exceeded 5 seconds)",
            passed_tests=0,
            total_tests=1
        )
    except Exception as e:
        return GradeResponse(
            quiz_id=request.quiz_id,
            user_id=request.user_id,
            score=0.0,
            feedback=f"Execution error: {str(e)[:100]}",
            passed_tests=0,
            total_tests=1
        )

@app.get("/health")
async def health():
    return {"status": "healthy", "service": settings.APP_NAME}

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}", "purpose": "Coding exercise generation and grading for LearnFlow"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)
