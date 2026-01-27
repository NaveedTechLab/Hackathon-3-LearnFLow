#!/usr/bin/env python3
"""
Better Auth Middleware Implementation for LearnFlow Platform

This module implements authentication middleware for securing API endpoints
and ensuring secure gRPC communication between services.
"""

import os
import jwt
import time
import logging
from functools import wraps
from typing import Dict, Any, Optional
import requests
from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
JWT_SECRET = os.getenv("JWT_SECRET", "learnflow-default-secret-key-change-in-production")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
AUTH_REQUIRED = os.getenv("AUTH_REQUIRED", "true").lower() == "true"

security = HTTPBearer(auto_error=False)


class BetterAuthMiddleware:
    """
    Better Auth Middleware for securing API endpoints and gRPC communication
    """

    @staticmethod
    def create_token(user_id: str, role: str = "user", expiry_hours: int = 24) -> str:
        """Create a JWT token for a user."""
        payload = {
            "user_id": user_id,
            "role": role,
            "exp": int(time.time()) + (expiry_hours * 3600),
            "iat": int(time.time()),
            "iss": "learnflow-auth",
            "sub": f"user:{user_id}"
        }

        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        return token

    @staticmethod
    def verify_token(token: str) -> Optional[Dict[str, Any]]:
        """Verify a JWT token and return the payload if valid."""
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            if payload.get("exp", 0) < time.time():
                logger.warning("Token has expired")
                return None
            return payload
        except jwt.InvalidTokenError as e:
            logger.error(f"Invalid token: {e}")
            return None

    @staticmethod
    def require_auth(credentials: HTTPAuthorizationCredentials = Depends(security)):
        """Dependency to require authentication for protected endpoints."""
        if not AUTH_REQUIRED:
            # If auth is not required, return a default payload
            return {"user_id": "anonymous", "role": "guest"}

        if not credentials:
            raise HTTPException(status_code=401, detail="Authentication required")

        token = credentials.credentials
        payload = BetterAuthMiddleware.verify_token(token)

        if not payload:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        return payload

    @staticmethod
    def add_auth_headers(headers: Dict[str, str], user_id: str) -> Dict[str, str]:
        """Add authentication headers to outgoing requests."""
        token = BetterAuthMiddleware.create_token(user_id)
        headers["Authorization"] = f"Bearer {token}"
        headers["X-User-ID"] = user_id
        return headers


def auth_required(func):
    """Decorator to require authentication for API endpoints."""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        # Extract request from kwargs or args
        request = None
        for arg in args:
            if isinstance(arg, Request):
                request = arg
                break
        for value in kwargs.values():
            if isinstance(value, Request):
                request = value
                break

        if request and AUTH_REQUIRED:
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                raise HTTPException(status_code=401, detail="Authentication required")

            token = auth_header.split(" ")[1]
            payload = BetterAuthMiddleware.verify_token(token)

            if not payload:
                raise HTTPException(status_code=401, detail="Invalid or expired token")

            # Add user info to request state
            request.state.user = payload

        return await func(*args, **kwargs)

    return wrapper


# Dapr-specific authentication functions
def secure_dapr_invoke(app_id: str, method: str, data: Dict[str, Any], user_id: str = "system") -> Dict[str, Any]:
    """Securely invoke a Dapr service with authentication."""
    try:
        # Add authentication to the request
        headers = BetterAuthMiddleware.add_auth_headers({}, user_id)
        headers["Content-Type"] = "application/json"

        # Dapr service invocation endpoint
        dapr_url = f"http://localhost:3500/v1.0/invoke/{app_id}/method/{method}"

        response = requests.post(dapr_url, json=data, headers=headers)

        if response.status_code == 200:
            logger.info(f"Secure Dapr invocation to {app_id}/{method} successful")
            return response.json()
        else:
            logger.error(f"Dapr invocation failed: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail=f"Dapr invocation failed: {response.text}")

    except Exception as e:
        logger.error(f"Error in secure Dapr invocation: {e}")
        raise HTTPException(status_code=500, detail=f"Secure Dapr invocation error: {str(e)}")


def secure_publish_event(pubsub_name: str, topic: str, data: Dict[str, Any], user_id: str = "system") -> bool:
    """Securely publish an event via Dapr pub/sub with authentication."""
    try:
        # Add authentication to the request
        headers = BetterAuthMiddleware.add_auth_headers({}, user_id)
        headers["Content-Type"] = "application/json"

        # Dapr pub/sub endpoint
        dapr_url = f"http://localhost:3500/v1.0/publish/{pubsub_name}/{topic}"

        response = requests.post(dapr_url, json=data, headers=headers)

        if response.status_code == 200:
            logger.info(f"Secure event published to {pubsub_name}/{topic}")
            return True
        else:
            logger.error(f"Event publishing failed: {response.status_code} - {response.text}")
            return False

    except Exception as e:
        logger.error(f"Error in secure event publishing: {e}")
        return False


def secure_save_state(store_name: str, key: str, value: Any, user_id: str = "system") -> bool:
    """Securely save state via Dapr state management with authentication."""
    try:
        # Add authentication to the request
        headers = BetterAuthMiddleware.add_auth_headers({}, user_id)
        headers["Content-Type"] = "application/json"

        # Dapr state store endpoint
        dapr_url = f"http://localhost:3500/v1.0/state/{store_name}"

        # Prepare state item with metadata
        state_item = {
            "key": key,
            "value": value,
            "metadata": {
                "user_id": user_id,
                "timestamp": time.time()
            }
        }

        response = requests.post(dapr_url, json=[state_item], headers=headers)

        if response.status_code == 200:
            logger.info(f"Secure state saved to {store_name}/{key}")
            return True
        else:
            logger.error(f"State saving failed: {response.status_code} - {response.text}")
            return False

    except Exception as e:
        logger.error(f"Error in secure state saving: {e}")
        return False


def secure_get_state(store_name: str, key: str, user_id: str = "system") -> Optional[Any]:
    """Securely get state via Dapr state management with authentication."""
    try:
        # Add authentication to the request
        headers = BetterAuthMiddleware.add_auth_headers({}, user_id)

        # Dapr state store endpoint
        dapr_url = f"http://localhost:3500/v1.0/state/{store_name}/{key}"

        response = requests.get(dapr_url, headers=headers)

        if response.status_code == 200:
            logger.info(f"Secure state retrieved from {store_name}/{key}")
            return response.json()
        elif response.status_code == 404:
            logger.info(f"State not found for {store_name}/{key}")
            return None
        else:
            logger.error(f"State retrieval failed: {response.status_code} - {response.text}")
            return None

    except Exception as e:
        logger.error(f"Error in secure state retrieval: {e}")
        return None


# Example usage in a service
def example_protected_endpoint(request: Request, user_payload: Dict[str, Any] = Depends(BetterAuthMiddleware.require_auth)):
    """Example of how to use the auth middleware in a protected endpoint."""
    user_id = user_payload.get("user_id", "unknown")
    logger.info(f"Accessing protected endpoint for user {user_id}")

    return {
        "message": f"Hello {user_id}, you have been authenticated!",
        "role": user_payload.get("role", "user"),
        "authenticated": True
    }


if __name__ == "__main__":
    # Example usage
    print("Better Auth Middleware for LearnFlow Platform")
    print("This module provides authentication utilities for securing API endpoints and Dapr communication")

    # Example token creation
    sample_token = BetterAuthMiddleware.create_token("test-user-123", "admin")
    print(f"Sample token created: {sample_token[:20]}...")

    # Example token verification
    verified_payload = BetterAuthMiddleware.verify_token(sample_token)
    print(f"Token verification result: {verified_payload}")