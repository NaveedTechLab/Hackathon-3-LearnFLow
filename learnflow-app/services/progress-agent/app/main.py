from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import json
import time
from typing import Dict, List, Optional
from app.config import settings

app = FastAPI(title=settings.APP_NAME)

class ProgressUpdateRequest(BaseModel):
    user_id: str
    module: str
    topic: str
    activity_type: str  # 'exercise', 'quiz', 'code_review', 'concept_learning'
    score: float  # 0.0 to 1.0
    details: dict = {}

class StruggleDetectionRequest(BaseModel):
    user_id: str
    event_type: str  # 'repeated_error', 'stuck_exercise', 'low_quiz_score', 'failed_execution'
    details: dict

class ProgressResponse(BaseModel):
    user_id: str
    module: str
    topic: str
    mastery_score: float
    exercise_completion: float
    quiz_score: float
    code_quality: float
    consistency_score: float
    last_updated: str

class ClassOverviewResponse(BaseModel):
    class_stats: dict
    student_progress: List[dict]
    struggle_alerts: List[dict]

# In-memory storage (would be PostgreSQL in real implementation)
student_progress_db: Dict[str, Dict] = {}
struggle_events_db: List[dict] = []

@app.get("/progress/{user_id}")
async def get_progress(user_id: str):
    """
    Retrieve student progress for all modules and topics
    """
    if user_id in student_progress_db:
        return student_progress_db[user_id]
    else:
        # Return default progress if user not found
        return {
            "user_id": user_id,
            "modules": {},
            "overall_mastery": 0.0
        }

@app.post("/track")
async def track_activity(request: ProgressUpdateRequest):
    """
    Track student learning activities and update progress
    """
    # Create user entry if not exists
    if request.user_id not in student_progress_db:
        student_progress_db[request.user_id] = {
            "user_id": request.user_id,
            "modules": {},
            "overall_mastery": 0.0
        }

    # Get or create module entry
    user_progress = student_progress_db[request.user_id]
    if request.module not in user_progress["modules"]:
        user_progress["modules"][request.module] = {}

    # Get or create topic entry
    module_progress = user_progress["modules"][request.module]
    if request.topic not in module_progress:
        module_progress[request.topic] = {
            "mastery_score": 0.0,
            "exercise_completion": 0.0,
            "quiz_score": 0.0,
            "code_quality": 0.0,
            "consistency_score": 0.0,
            "last_updated": time.strftime('%Y-%m-%d %H:%M:%S')
        }

    # Update specific score based on activity type
    topic_progress = module_progress[request.topic]
    if request.activity_type == "exercise":
        topic_progress["exercise_completion"] = max(topic_progress["exercise_completion"], request.score)
    elif request.activity_type == "quiz":
        topic_progress["quiz_score"] = max(topic_progress["quiz_score"], request.score)
    elif request.activity_type == "code_review":
        topic_progress["code_quality"] = max(topic_progress["code_quality"], request.score)
    elif request.activity_type == "concept_learning":
        # For concept learning, we might just track consistency
        topic_progress["consistency_score"] = min(1.0, topic_progress["consistency_score"] + 0.1)

    # Recalculate mastery score using weighted formula
    # Mastery = (exercise_completion * 0.4) + (quiz_score * 0.3) + (code_quality * 0.2) + (consistency * 0.1)
    topic_progress["mastery_score"] = (
        topic_progress["exercise_completion"] * 0.4 +
        topic_progress["quiz_score"] * 0.3 +
        topic_progress["code_quality"] * 0.2 +
        topic_progress["consistency_score"] * 0.1
    )

    topic_progress["last_updated"] = time.strftime('%Y-%m-%d %H:%M:%S')

    # Calculate overall user mastery (not class mastery)
    all_scores = []
    for module_name, module_data in user_progress["modules"].items():
        for topic_name, topic_data in module_data.items():
            all_scores.append(topic_data["mastery_score"])

    if all_scores:
        user_progress["overall_mastery"] = sum(all_scores) / len(all_scores)

    # Return updated progress
    return ProgressResponse(
        user_id=request.user_id,
        module=request.module,
        topic=request.topic,
        mastery_score=topic_progress["mastery_score"],
        exercise_completion=topic_progress["exercise_completion"],
        quiz_score=topic_progress["quiz_score"],
        code_quality=topic_progress["code_quality"],
        consistency_score=topic_progress["consistency_score"],
        last_updated=topic_progress["last_updated"]
    )

@app.post("/detect-struggle")
async def detect_struggle(request: StruggleDetectionRequest):
    """
    Detect struggle patterns and store for teacher dashboard
    """
    # Store struggle event
    struggle_event = {
        "user_id": request.user_id,
        "event_type": request.event_type,
        "details": request.details,
        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
        "resolved": False
    }

    struggle_events_db.append(struggle_event)

    # In a real implementation, this would publish to Kafka
    # For now, we just return success
    return {"status": "struggle_detected", "event_id": len(struggle_events_db)}

@app.get("/class-overview")
async def get_class_overview():
    """
    Get class-wide progress overview for teacher dashboard
    """
    # Calculate class statistics
    all_users = list(student_progress_db.keys())
    total_students = len(all_users)

    if total_students == 0:
        return ClassOverviewResponse(
            class_stats={
                "total_students": 0,
                "avg_mastery": 0.0,
                "active_students": 0
            },
            student_progress=[],
            struggle_alerts=[]
        )

    # Calculate average mastery across all students
    total_mastery = sum([student_progress_db[user]["overall_mastery"] for user in all_users])
    avg_mastery = total_mastery / total_students if total_students > 0 else 0.0

    # Get active students (students with recent activity)
    active_students = 0  # In a real implementation, check last_updated timestamps

    # Get student progress list
    student_list = []
    for user_id, progress in student_progress_db.items():
        student_list.append({
            "user_id": user_id,
            "overall_mastery": progress["overall_mastery"],
            "modules_completed": len(progress["modules"])
        })

    # Get unresolved struggle alerts
    unresolved_alerts = [event for event in struggle_events_db if not event["resolved"]]

    return ClassOverviewResponse(
        class_stats={
            "total_students": total_students,
            "avg_mastery": avg_mastery,
            "active_students": active_students
        },
        student_progress=student_list,
        struggle_alerts=unresolved_alerts
    )

@app.get("/health")
async def health():
    return {"status": "healthy", "service": settings.APP_NAME}

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME}", "purpose": "Student progress tracking and struggle detection for LearnFlow"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)
