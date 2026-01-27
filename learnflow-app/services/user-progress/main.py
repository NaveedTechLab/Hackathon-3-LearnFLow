from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import logging
import json
from typing import Optional

app = FastAPI(title="user-progress", description="FastAPI service with Dapr integration")

# Dapr configuration
DAPR_HTTP_ENDPOINT = "http://localhost:3500"
DAPR_STATE_STORE = "statestore"
DAPR_PUBSUB_NAME = "pubsub"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Message(BaseModel):
    topic: str
    data: dict


@app.on_event("startup")
async def startup_event():
    logger.info("Service started with Dapr integration")


@app.get("/")
async def root():
    return {"message": "Hello from user-progress with Dapr!"}


class ProgressUpdateRequest(BaseModel):
    user_id: str
    lesson_id: str
    progress_percentage: float
    status: str
    timestamp: Optional[str] = None


class ProgressStatusResponse(BaseModel):
    user_id: str
    lesson_id: str
    progress_percentage: float
    status: str
    last_updated: str


@app.post("/update-progress")
async def update_progress(request: ProgressUpdateRequest):
    """Update user progress for a specific lesson"""
    try:
        from datetime import datetime

        # Set timestamp if not provided
        timestamp = request.timestamp or datetime.now().isoformat()

        # Create progress record
        progress_record = {
            "user_id": request.user_id,
            "lesson_id": request.lesson_id,
            "progress_percentage": request.progress_percentage,
            "status": request.status,
            "last_updated": timestamp
        }

        # Save progress to state store
        state_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}"
        state_item = {
            "key": f"progress_{request.user_id}_{request.lesson_id}",
            "value": progress_record
        }
        state_response = requests.post(state_url, json=[state_item])

        if state_response.status_code != 200:
            raise HTTPException(status_code=state_response.status_code, detail="Failed to save progress to state store")

        # Publish "progress-updated" event to Kafka via Dapr Pub/Sub
        event_data = {
            "user_id": request.user_id,
            "lesson_id": request.lesson_id,
            "progress_percentage": request.progress_percentage,
            "status": request.status,
            "timestamp": timestamp
        }

        publish_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/publish/{DAPR_PUBSUB_NAME}/progress-updated"
        publish_response = requests.post(publish_url, json=event_data)

        if publish_response.status_code != 200:
            logger.warning(f"Failed to publish progress-updated event: {publish_response.status_code}")

        logger.info(f"Progress updated for user {request.user_id} on lesson {request.lesson_id}")

        # Return confirmation
        return {
            "user_id": request.user_id,
            "lesson_id": request.lesson_id,
            "progress_percentage": request.progress_percentage,
            "status": request.status,
            "last_updated": timestamp,
            "success": True
        }
    except Exception as e:
        logger.error(f"Error updating progress: {e}")
        raise HTTPException(status_code=500, detail=f"Error updating progress: {str(e)}")


@app.get("/status")
async def get_status(user_id: str, lesson_id: Optional[str] = None):
    """Get user progress status, optionally filtered by lesson_id"""
    try:
        if lesson_id:
            # Get specific lesson progress
            key = f"progress_{user_id}_{lesson_id}"
            state_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}/{key}"
            state_response = requests.get(state_url)

            if state_response.status_code == 200:
                progress_data = state_response.json()
                return {
                    "user_id": user_id,
                    "lesson_id": lesson_id,
                    "progress_data": progress_data
                }
            elif state_response.status_code == 404:
                return {
                    "user_id": user_id,
                    "lesson_id": lesson_id,
                    "progress_data": None,
                    "message": "No progress record found for this user-lesson combination"
                }
            else:
                raise HTTPException(status_code=state_response.status_code, detail="Failed to retrieve progress from state store")
        else:
            # Get all progress for the user (simplified approach - in reality, you'd need an indexing mechanism)
            # For this example, we'll just indicate what would happen
            logger.info(f"Fetching all progress for user: {user_id}")
            return {
                "user_id": user_id,
                "all_lessons_progress": [],
                "message": "In a full implementation, this would return all progress records for the user"
            }
    except Exception as e:
        logger.error(f"Error fetching progress status: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching progress status: {str(e)}")


# Event handler for lesson-generated events
@app.post("/events/lesson-generated")
async def handle_lesson_generated(data: dict):
    """Handle incoming lesson-generated events from Dapr pub/sub"""
    logger.info(f"Received lesson-generated event: {data}")

    # Process the lesson-generated event
    # For example, we could initialize progress tracking for the new lesson
    lesson_id = data.get("lesson_id")
    user_id = data.get("user_id")
    course_id = data.get("course_id")

    if lesson_id and user_id:
        # Initialize progress for the new lesson
        initial_progress = {
            "user_id": user_id,
            "lesson_id": lesson_id,
            "course_id": course_id,
            "progress_percentage": 0.0,
            "status": "not_started",
            "last_updated": data.get("timestamp", "unknown")
        }

        # Save initial progress state
        state_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}"
        state_item = {
            "key": f"progress_{user_id}_{lesson_id}",
            "value": initial_progress
        }
        state_response = requests.post(state_url, json=[state_item])

        if state_response.status_code == 200:
            logger.info(f"Initialized progress tracking for lesson {lesson_id} for user {user_id}")
        else:
            logger.error(f"Failed to initialize progress tracking for lesson {lesson_id}")

    return {"status": "processed", "event_type": "lesson-generated"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# State Management Endpoints
@app.post("/state/{key}")
async def save_state(key: str, value: dict):
    """Save state using Dapr state store"""
    try:
        url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}"
        state_item = {
            "key": key,
            "value": value
        }
        response = requests.post(url, json=[state_item])
        
        if response.status_code == 200:
            logger.info(f"State saved: {key}")
            return {"success": True, "key": key}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to save state")
    except Exception as e:
        logger.error(f"Error saving state: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/state/{key}")
async def get_state(key: str):
    """Get state using Dapr state store"""
    try:
        url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}/{key}"
        response = requests.get(url)
        
        if response.status_code == 200:
            value = response.json()
            logger.info(f"State retrieved: {key}")
            return {"key": key, "value": value}
        elif response.status_code == 404:
            return {"key": key, "value": None}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to get state")
    except Exception as e:
        logger.error(f"Error getting state: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Pub/Sub Endpoints
@app.post("/publish")
async def publish_message(message: Message):
    """Publish a message using Dapr pub/sub"""
    try:
        url = f"{DAPR_HTTP_ENDPOINT}/v1.0/publish/{DAPR_PUBSUB_NAME}/{message.topic}"
        response = requests.post(url, json=message.data)
        
        if response.status_code == 200:
            logger.info(f"Message published to topic: {message.topic}")
            return {"success": True, "topic": message.topic}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to publish message")
    except Exception as e:
        logger.error(f"Error publishing message: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/dapr/subscribe")
async def dapr_subscribe():
    """Define Dapr subscription endpoints"""
    subscriptions = [
        {
            "pubsubname": DAPR_PUBSUB_NAME,
            "topic": "general",
            "route": "/events/general"
        },
        {
            "pubsubname": DAPR_PUBSUB_NAME,
            "topic": "notifications",
            "route": "/events/notifications"
        }
    ]
    return subscriptions


@app.post("/events/{topic_name}")
async def handle_event(topic_name: str, data: dict):
    """Handle incoming events from Dapr pub/sub"""
    logger.info(f"Received event on topic '{topic_name}': {data}")
    # Process the event based on topic
    if topic_name == "general":
        # Handle general events
        pass
    elif topic_name == "notifications":
        # Handle notification events
        pass
    
    return {"status": "processed", "topic": topic_name}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
