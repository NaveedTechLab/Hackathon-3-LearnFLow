from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import asyncio
import json
from app.config import settings

app = FastAPI(title=settings.APP_NAME)

class ExplainRequest(BaseModel):
    topic: str
    level: str = "intermediate"  # beginner, intermediate, advanced
    user_context: dict = {}

class ExplanationResponse(BaseModel):
    topic: str
    explanation: str
    examples: list[str]
    level: str

@app.post("/explain")
async def explain_concept(request: ExplainRequest):
    """
    Generate Python concept explanation with examples
    """
    # In a real implementation, this would call an LLM API
    # For now, we'll return a simulated response

    # Generate a response based on the requested level
    level_descriptions = {
        "beginner": f"For beginners, {request.topic} is a fundamental concept in Python. It allows you to {request.topic.replace('_', ' ')} in a simple way.",
        "intermediate": f"At an intermediate level, {request.topic} involves more complex usage patterns and best practices that help write more efficient code.",
        "advanced": f"For advanced users, {request.topic} has sophisticated applications including performance optimizations and integration with other Python features."
    }

    level_examples = {
        "beginner": [f"# Simple example of {request.topic}", f"print('Hello world')"],
        "intermediate": [f"# Intermediate example of {request.topic}", f"def example():", "    # Implementation here", "    pass"],
        "advanced": [f"# Advanced example of {request.topic}", f"class AdvancedExample:", "    def __init__(self):", "        # Complex implementation", "        pass"]
    }

    # In a real implementation, this would publish to Kafka
    # For now, we'll return the explanation
    return ExplanationResponse(
        topic=request.topic,
        explanation=level_descriptions.get(request.level, level_descriptions["intermediate"]),
        examples=level_examples.get(request.level, level_examples["intermediate"]),
        level=request.level
    )

@app.get("/health")
async def health():
    return {"status": "healthy", "service": settings.APP_NAME}

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}", "purpose": "Python concept explanations for LearnFlow"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)
