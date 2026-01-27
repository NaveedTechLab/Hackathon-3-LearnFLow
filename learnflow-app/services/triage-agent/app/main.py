from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import json
import httpx
from app.config import settings

app = FastAPI(title=settings.APP_NAME)

class QueryRequest(BaseModel):
    query: str
    user_id: str

class RoutingResponse(BaseModel):
    agent: str
    message: str
    params: dict = {}

@app.post("/query")
async def route_query(request: QueryRequest):
    """
    Analyze query intent and route to appropriate agent
    """
    query_lower = request.query.lower()

    # Keyword-based routing logic
    if any(keyword in query_lower for keyword in ["explain", "what is", "how does", "concept", "definition", "meaning"]):
        agent = "concepts-agent"
        message = f"Routing to concepts-agent to explain: {request.query}"
    elif any(keyword in query_lower for keyword in ["error", "bug", "fix", "debug", "problem", "not working"]):
        agent = "debug-agent"
        message = f"Routing to debug-agent to help with: {request.query}"
    elif any(keyword in query_lower for keyword in ["review", "check", "style", "quality", "improve"]):
        agent = "code-review-agent"
        message = f"Routing to code-review-agent to review: {request.query}"
    elif any(keyword in query_lower for keyword in ["quiz", "exercise", "challenge", "practice", "test"]):
        agent = "exercise-agent"
        message = f"Routing to exercise-agent for: {request.query}"
    else:
        # Default to concepts-agent for general questions
        agent = "concepts-agent"
        message = f"Routing to concepts-agent for general question: {request.query}"

    # In a real implementation, this would publish to Kafka
    # For now, we'll return the routing decision
    return RoutingResponse(
        agent=agent,
        message=message,
        params={"original_query": request.query, "user_id": request.user_id}
    )

@app.get("/health")
async def health():
    return {"status": "healthy", "service": settings.APP_NAME}

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}", "purpose": "Query routing for LearnFlow AI agents"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)