from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
import requests
import logging
import asyncio
import uuid
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

# Dapr configuration
DAPR_HTTP_ENDPOINT = "http://localhost:3500"
DAPR_STATE_STORE = "statestore"
DAPR_PUBSUB_NAME = "pubsub"


class CodingTaskRequest(BaseModel):
    task_id: Optional[str] = None
    user_id: str
    course_id: str
    problem_statement: str
    difficulty_level: str = "medium"
    context: Optional[Dict[str, Any]] = {}


class CodingTaskResponse(BaseModel):
    task_id: str
    user_id: str
    course_id: str
    solution: str
    explanation: str
    timestamp: str


class ProgressUpdateRequest(BaseModel):
    user_id: str
    lesson_id: str
    progress_data: Dict[str, Any]


@router.post("/process-coding-task")
async def process_coding_task(request: CodingTaskRequest):
    """
    Process a coding task and provide detailed explanation and solution
    """
    try:
        # Generate task ID if not provided
        task_id = request.task_id or str(uuid.uuid4())

        logger.info(f"Processing coding task {task_id} for user {request.user_id}")

        # Simulate processing time for complex tasks
        await asyncio.sleep(1)  # Simulate processing

        # Generate solution and explanation (in a real implementation, this would involve AI processing)
        solution = f"# Solution for Problem: {request.problem_statement[:50]}...\n\n# This is a sample solution for the coding problem\nprint('Hello, World!')\n\n# Additional solution code would go here based on the problem requirements"
        explanation = f"Detailed explanation for the coding problem: {request.problem_statement}. This solution addresses the core requirements of the problem with appropriate error handling and best practices. Difficulty level: {request.difficulty_level}."

        # Create response object
        response = CodingTaskResponse(
            task_id=task_id,
            user_id=request.user_id,
            course_id=request.course_id,
            solution=solution,
            explanation=explanation,
            timestamp=datetime.now().isoformat()
        )

        # Save task result to state store via Dapr
        state_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}"
        state_item = {
            "key": f"coding_task_result_{task_id}",
            "value": response.dict()
        }

        state_response = requests.post(state_url, json=[state_item])
        if state_response.status_code != 200:
            logger.warning(f"Failed to save task result to state store: {state_response.status_code}")

        # Publish completion event via Dapr pub/sub
        event_data = {
            "task_id": task_id,
            "user_id": request.user_id,
            "course_id": request.course_id,
            "status": "completed",
            "timestamp": datetime.now().isoformat()
        }

        publish_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/publish/{DAPR_PUBSUB_NAME}/coding-task-completed"
        publish_response = requests.post(publish_url, json=event_data)

        if publish_response.status_code != 200:
            logger.warning(f"Failed to publish coding-task-completed event: {publish_response.status_code}")

        logger.info(f"Coding task {task_id} processed successfully")

        return response

    except Exception as e:
        logger.error(f"Error processing coding task: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing coding task: {str(e)}")


@router.post("/update-progress")
async def update_progress(request: ProgressUpdateRequest):
    """
    Update user progress based on coding task completion
    """
    try:
        logger.info(f"Updating progress for user {request.user_id}, lesson {request.lesson_id}")

        # Save progress update to state store via Dapr
        state_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}"
        state_item = {
            "key": f"user_progress_{request.user_id}_{request.lesson_id}",
            "value": {
                "user_id": request.user_id,
                "lesson_id": request.lesson_id,
                "progress_data": request.progress_data,
                "updated_at": datetime.now().isoformat()
            }
        }

        state_response = requests.post(state_url, json=[state_item])
        if state_response.status_code != 200:
            raise HTTPException(status_code=state_response.status_code, detail="Failed to update progress in state store")

        # Publish progress update event
        event_data = {
            "user_id": request.user_id,
            "lesson_id": request.lesson_id,
            "progress_data": request.progress_data,
            "timestamp": datetime.now().isoformat()
        }

        publish_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/publish/{DAPR_PUBSUB_NAME}/progress-updated"
        publish_response = requests.post(publish_url, json=event_data)

        if publish_response.status_code != 200:
            logger.warning(f"Failed to publish progress-updated event: {publish_response.status_code}")

        logger.info(f"Progress updated for user {request.user_id}")

        return {"status": "success", "user_id": request.user_id, "lesson_id": request.lesson_id}

    except Exception as e:
        logger.error(f"Error updating progress: {e}")
        raise HTTPException(status_code=500, detail=f"Error updating progress: {str(e)}")


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "tutor-agent"}


@router.get("/dapr/subscribe")
async def dapr_subscribe():
    """Define Dapr subscription endpoints"""
    subscriptions = [
        {
            "pubsubname": DAPR_PUBSUB_NAME,
            "topic": "coding-task-requested",
            "route": "/events/coding-task-requested"
        },
        {
            "pubsubname": DAPR_PUBSUB_NAME,
            "topic": "lesson-generated",
            "route": "/events/lesson-generated"
        }
    ]
    return subscriptions


@router.post("/events/{topic_name}")
async def handle_event(topic_name: str, data: Dict[str, Any]):
    """Handle incoming events from Dapr pub/sub"""
    logger.info(f"Received event on topic '{topic_name}': {data}")

    # Process the event based on topic
    if topic_name == "coding-task-requested":
        # Handle coding task requests
        logger.info(f"Processing coding task request: {data}")
    elif topic_name == "lesson-generated":
        # Handle lesson generation events
        logger.info(f"Processing lesson generation event: {data}")

    return {"status": "processed", "topic": topic_name}