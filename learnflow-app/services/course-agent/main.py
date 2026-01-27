from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import logging
import json
from typing import Optional

app = FastAPI(title="course-agent", description="FastAPI service with Dapr integration")

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
    return {"message": "Hello from course-agent with Dapr!"}


class LessonRequest(BaseModel):
    course_id: str
    user_id: str
    lesson_type: Optional[str] = "standard"
    difficulty_level: Optional[str] = "medium"


class LessonResponse(BaseModel):
    lesson_id: str
    title: str
    content: str
    course_id: str
    user_id: str
    created_at: str


@app.post("/generate-lesson")
async def generate_lesson(request: LessonRequest):
    """Generate a personalized lesson based on course and user parameters"""
    try:
        import uuid
        from datetime import datetime

        # Generate a unique lesson ID
        lesson_id = str(uuid.uuid4())

        # Generate sample lesson content (in a real implementation, this would involve AI processing)
        lesson_title = f"Personalized Lesson for Course {request.course_id}"
        lesson_content = f"This is a personalized lesson for user {request.user_id} in course {request.course_id}. Difficulty: {request.difficulty_level}."

        # Create lesson object
        lesson = {
            "lesson_id": lesson_id,
            "title": lesson_title,
            "content": lesson_content,
            "course_id": request.course_id,
            "user_id": request.user_id,
            "difficulty_level": request.difficulty_level,
            "created_at": datetime.now().isoformat()
        }

        # Save lesson to state store
        state_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/state/{DAPR_STATE_STORE}"
        state_item = {
            "key": f"lesson_{lesson_id}",
            "value": lesson
        }
        state_response = requests.post(state_url, json=[state_item])

        if state_response.status_code != 200:
            raise HTTPException(status_code=state_response.status_code, detail="Failed to save lesson to state store")

        # Publish "lesson-generated" event to Kafka via Dapr Pub/Sub
        event_data = {
            "lesson_id": lesson_id,
            "course_id": request.course_id,
            "user_id": request.user_id,
            "timestamp": datetime.now().isoformat()
        }

        publish_url = f"{DAPR_HTTP_ENDPOINT}/v1.0/publish/{DAPR_PUBSUB_NAME}/lesson-generated"
        publish_response = requests.post(publish_url, json=event_data)

        if publish_response.status_code != 200:
            logger.warning(f"Failed to publish lesson-generated event: {publish_response.status_code}")

        logger.info(f"Lesson generated and published: {lesson_id}")

        # Return the lesson
        return LessonResponse(
            lesson_id=lesson_id,
            title=lesson_title,
            content=lesson_content,
            course_id=request.course_id,
            user_id=request.user_id,
            created_at=datetime.now().isoformat()
        )
    except Exception as e:
        logger.error(f"Error generating lesson: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating lesson: {str(e)}")


@app.get("/lessons")
async def get_lessons(user_id: Optional[str] = None, course_id: Optional[str] = None):
    """Get lessons, optionally filtered by user_id or course_id"""
    try:
        # In a real implementation, this would query the state store for lessons
        # For now, we'll simulate by attempting to fetch a list of lessons
        # Since Dapr state store doesn't have a direct "query" API, we'd need to implement
        # a more sophisticated storage pattern. For this example, we'll return an empty list
        # or if a specific user_id is provided, we'll simulate finding lessons for that user.

        # This is a simplified approach - in reality, you'd need to maintain an index
        # of lessons per user/course to efficiently retrieve them
        lessons = []

        # If specific filters are provided, we would implement logic to retrieve
        # the appropriate lessons from the state store
        if user_id:
            # Simulate fetching lessons for a specific user
            logger.info(f"Fetching lessons for user: {user_id}")
            # In a real implementation, you'd have an indexed way to retrieve user-specific lessons
        if course_id:
            # Simulate fetching lessons for a specific course
            logger.info(f"Fetching lessons for course: {course_id}")
            # In a real implementation, you'd have an indexed way to retrieve course-specific lessons

        # For now, return an empty list or simulated data
        return {"lessons": lessons, "filters_applied": {"user_id": user_id, "course_id": course_id}}
    except Exception as e:
        logger.error(f"Error fetching lessons: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching lessons: {str(e)}")


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
