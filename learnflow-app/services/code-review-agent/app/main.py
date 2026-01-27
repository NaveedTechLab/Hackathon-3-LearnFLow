from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import subprocess
import tempfile
import ast
import json
from app.config import settings

app = FastAPI(title=settings.APP_NAME)

class ReviewRequest(BaseModel):
    code: str
    user_id: str
    context: dict = {}

class ReviewResponse(BaseModel):
    code: str
    feedback: dict
    summary: str

@app.post("/review")
async def review_code(request: ReviewRequest):
    """
    Review Python code for correctness, PEP 8 compliance, efficiency, readability
    """
    # Analyze the code for various aspects
    feedback = {
        "correctness": [],
        "style": [],
        "efficiency": [],
        "readability": []
    }

    # Check for basic syntax
    try:
        tree = ast.parse(request.code)
    except SyntaxError as e:
        feedback["correctness"].append(f"Syntax error: {e.msg} at line {e.lineno}")
        return ReviewResponse(
            code=request.code,
            feedback=feedback,
            summary=f"Found syntax error: {e.msg}"
        )

    # In a real implementation, this would use tools like pylint, flake8, etc.
    # For now, we'll simulate some basic checks

    # Check for common issues
    if "import *" in request.code:
        feedback["style"].append("Avoid wildcard imports (import *), use explicit imports instead")

    if "TODO" in request.code or "FIXME" in request.code:
        feedback["readability"].append("Remove TODO/FIXME comments before production")

    # Check for print statements (might indicate debugging code)
    if "print(" in request.code and "print('debug')" not in request.code.lower():
        feedback["readability"].append("Remove print statements in production code")

    # Efficiency check - look for inefficient patterns
    if "for i in range(len(" in request.code:
        feedback["efficiency"].append("Consider using enumerate() or direct iteration instead of range(len())")

    # Correctness - check for common mistakes
    if "==" in request.code and "= =" not in request.code.replace(" ", ""):
        # Check if assignment is used instead of comparison in conditional
        lines = request.code.split("\n")
        for i, line in enumerate(lines):
            if "if " in line and "=" in line and "==" not in line:
                parts = line.split("if ")[1].split(":")[0]
                if "=" in parts and "==" not in parts and "!=" not in parts:
                    feedback["correctness"].append(f"Possible assignment (=) instead of comparison (==) at line {i+1}")

    # Generate summary
    total_issues = sum(len(category) for category in feedback.values())
    if total_issues == 0:
        summary = "Code looks good! No issues detected."
    else:
        summary = f"Found {total_issues} issue(s) to address."

    # In a real implementation, this would store submission in PostgreSQL and publish to Kafka
    # For now, we'll return the review
    return ReviewResponse(
        code=request.code,
        feedback=feedback,
        summary=summary
    )

@app.get("/health")
async def health():
    return {"status": "healthy", "service": settings.APP_NAME}

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}", "purpose": "Python code review for LearnFlow"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)
