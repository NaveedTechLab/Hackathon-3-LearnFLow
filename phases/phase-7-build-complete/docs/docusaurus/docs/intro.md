---
sidebar_position: 1
---

# LearnFlow Platform Documentation

Welcome to the LearnFlow platform documentation. This guide provides comprehensive information about the LearnFlow reusable intelligence and cloud-native mastery system.

## Overview

LearnFlow is an AI-powered learning platform that provides personalized education through interactive coding experiences. The platform leverages microservices architecture with Dapr for service-to-service communication, Kafka for event streaming, and PostgreSQL for persistent storage.

## Architecture

The LearnFlow platform consists of several key components:

- **Course Agent**: Generates personalized lessons based on user parameters
- **User Progress Service**: Tracks and manages user learning progress
- **Frontend**: Provides the user interface for the learning experience
- **Tutor Agent**: Specialized service for detailed coding explanations
- **Dapr**: Provides service mesh capabilities for communication, state management, and pub/sub
- **Kafka**: Event streaming platform for asynchronous communication
- **PostgreSQL**: Persistent storage for user progress and lesson data

## Getting Started

To get started with LearnFlow development:

1. Ensure all prerequisites are installed (Docker, Minikube, Dapr, etc.)
2. Deploy the infrastructure components
3. Build and deploy the backend services
4. Deploy the frontend application
5. Run end-to-end tests to verify the complete system

## Technology Stack

- **Kubernetes**: Container orchestration using Minikube for local development
- **Dapr**: Distributed Application Runtime for service mesh capabilities
- **FastAPI**: Backend service framework
- **Next.js**: Frontend framework
- **Kafka**: Event streaming and pub/sub messaging
- **PostgreSQL**: Persistent data storage
- **Prometheus & Grafana**: Monitoring and visualization