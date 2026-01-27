from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import re
import traceback
import ast
from app.config import settings

app = FastAPI(title=settings.APP_NAME)

class DebugRequest(BaseModel):
    code: str
    error_message: str
    user_id: str
    context: dict = {}

class DebugResponse(BaseModel):
    code: str
    error_analysis: dict
    hints: list[str]
    solution: str = ""

@app.post("/debug")
async def debug_code(request: DebugRequest):
    """
    Parse Python error traceback and provide debugging assistance
    """
    # Analyze the error message to identify the root cause
    error_analysis = {
        "type": "general",
        "description": "Error analysis",
        "line_number": None,
        "suggested_fix": ""
    }

    # Common error patterns and their solutions
    error_patterns = [
        {
            "pattern": r"(SyntaxError|IndentationError)",
            "type": "syntax",
            "hint": "This is a syntax error - check your code formatting and syntax",
            "solution": "Review your code for missing colons, parentheses, quotes, or incorrect indentation"
        },
        {
            "pattern": r"NameError.*name '(\w+)' is not defined",
            "type": "name",
            "hint": "The variable '{}' is not defined. Did you mean to define it or import it?".format(re.search(r"NameError.*name '(\w+)'", request.error_message).group(1) if re.search(r"NameError.*name '(\w+)'", request.error_message) else "variable"),
            "solution": "Define the variable before using it, or check the spelling of the variable name"
        },
        {
            "pattern": r"TypeError.*unsupported operand type",
            "type": "type",
            "hint": "You're trying to perform an operation on incompatible types",
            "solution": "Check the data types of the operands and convert them if necessary"
        },
        {
            "pattern": r"AttributeError.*object has no attribute",
            "type": "attribute",
            "hint": "The object doesn't have the attribute you're trying to access",
            "solution": "Check the attribute name for typos or verify the object type"
        },
        {
            "pattern": r"IndexError.*index out of range",
            "type": "index",
            "hint": "You're trying to access an index that doesn't exist",
            "solution": "Check your list length with len() before accessing by index"
        },
        {
            "pattern": r"KeyError",
            "type": "key",
            "hint": "The key doesn't exist in the dictionary",
            "solution": "Check if the key exists using 'in' operator or use dict.get()"
        }
    ]

    hints = []
    solution = ""

    # Identify error type and provide hints
    for pattern_info in error_patterns:
        if re.search(pattern_info["pattern"], request.error_message):
            error_analysis["type"] = pattern_info["type"]
            error_analysis["description"] = pattern_info["hint"]

            # Add specific hint
            hints.append(pattern_info["hint"])

            # For now, provide the solution (in a real pedagogical system,
            # hints would be provided first and solution only upon request)
            solution = pattern_info["solution"]
            break

    # If no specific pattern matched, provide general debugging hints
    if not hints:
        hints = [
            "Read the error message carefully - it tells you what went wrong and where",
            "Look at the line number mentioned in the error",
            "Check for common issues like typos, missing colons, or incorrect indentation",
            "Try printing variables to see their values before the error occurs"
        ]

    # In a real implementation, this would publish to Kafka
    # For now, we'll return the debugging assistance
    return DebugResponse(
        code=request.code,
        error_analysis=error_analysis,
        hints=hints,
        solution=solution
    )

@app.post("/solution")
async def get_solution_endpoint(request: DebugRequest):
    """
    Provide full solution (used when student requests after hints)
    """
    # Analyze the error message to identify the root cause
    sol_error_analysis = {
        "type": "general",
        "description": "Error analysis",
        "line_number": None,
        "suggested_fix": ""
    }

    # Common error patterns and their solutions
    sol_error_patterns = [
        {
            "pattern": r"(SyntaxError|IndentationError)",
            "type": "syntax",
            "hint": "This is a syntax error - check your code formatting and syntax",
            "solution": "Review your code for missing colons, parentheses, quotes, or incorrect indentation"
        },
        {
            "pattern": r"NameError.*name '(\w+)' is not defined",
            "type": "name",
            "hint": "The variable '{}' is not defined. Did you mean to define it or import it?".format(re.search(r"NameError.*name '(\w+)'", request.error_message).group(1) if re.search(r"NameError.*name '(\w+)'", request.error_message) else "variable"),
            "solution": "Define the variable before using it, or check the spelling of the variable name"
        },
        {
            "pattern": r"TypeError.*unsupported operand type",
            "type": "type",
            "hint": "You're trying to perform an operation on incompatible types",
            "solution": "Check the data types of the operands and convert them if necessary"
        },
        {
            "pattern": r"AttributeError.*object has no attribute",
            "type": "attribute",
            "hint": "The object doesn't have the attribute you're trying to access",
            "solution": "Check the attribute name for typos or verify the object type"
        },
        {
            "pattern": r"IndexError.*index out of range",
            "type": "index",
            "hint": "You're trying to access an index that doesn't exist",
            "solution": "Check your list length with len() before accessing by index"
        },
        {
            "pattern": r"KeyError",
            "type": "key",
            "hint": "The key doesn't exist in the dictionary",
            "solution": "Check if the key exists using 'in' operator or use dict.get()"
        }
    ]

    sol_hints = []
    sol_solution = ""

    # Identify error type and provide hints
    for pattern_info in sol_error_patterns:
        if re.search(pattern_info["pattern"], request.error_message):
            sol_error_analysis["type"] = pattern_info["type"]
            sol_error_analysis["description"] = pattern_info["hint"]

            # For solution endpoint, provide the full solution directly
            sol_solution = pattern_info["solution"]
            sol_hints.append(pattern_info["hint"])  # Still provide hints as well
            break

    # If no specific pattern matched, provide general debugging hints
    if not sol_solution:
        sol_solution = "Review the error message carefully. Look at the specific line mentioned in the error. Check for common Python issues like syntax errors, undefined variables, or incorrect data types."

    # In a real implementation, this would publish to Kafka
    # For now, we'll return the debugging assistance
    return DebugResponse(
        code=request.code,
        error_analysis=sol_error_analysis,
        hints=sol_hints,
        solution=sol_solution
    )

@app.get("/health")
async def health():
    return {"status": "healthy", "service": settings.APP_NAME}

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}", "purpose": "Python debugging assistance for LearnFlow"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)
