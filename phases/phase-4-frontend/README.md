# LearnFlow Frontend - Phase 4: Backend Services

This directory contains the implementation for Phase 4 of the LearnFlow project: Backend Services.

## Overview

The LearnFlow frontend application is a Next.js-based platform that provides an interactive learning experience. It integrates with backend services using Dapr for service-to-service communication, state management, and pub/sub messaging.

## Architecture

### Services
- **Course Agent Service**: Generates personalized lessons based on user needs and progress
- **User Progress Service**: Tracks and manages user learning progress
- **Dapr Integration**: Provides sidecar functionality for state management (PostgreSQL) and pub/sub (Kafka)

### Components
- **Lesson Viewer**: Displays educational content in an accessible format
- **Code Editor**: Provides interactive code editing with Monaco Editor integration
- **Agent Chat**: Offers AI-powered assistance through the Course Agent service

## Technology Stack

- **Framework**: Next.js (React-based)
- **Editor**: Monaco Editor for code editing capabilities
- **State Management**: Dapr with PostgreSQL
- **Messaging**: Dapr pub/sub with Kafka
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Minikube for local development)

## Dapr Configuration

This application uses Dapr for distributed system capabilities:
- Service invocation for communication with backend services
- State management for storing and retrieving data
- Pub/Sub for event-driven architecture

## Getting Started

### Prerequisites
- Node.js 18+
- Docker
- Kubernetes cluster (Minikube recommended for local development)
- Dapr runtime installed and initialized

### Installation

1. Clone the repository
2. Navigate to this directory
3. Install dependencies: `npm install`
4. Initialize Dapr: `dapr init`
5. Start the application: `dapr run --app-id learnflow-frontend --app-port 3000 npm run dev`

### Deployment

To deploy to Kubernetes with Dapr sidecar injection:

1. Build the Docker image: `docker build -t learnflow/frontend:latest .`
2. Ensure Dapr is initialized in your Kubernetes cluster
3. Apply the Kubernetes manifests:
   ```
   kubectl apply -f k8s-manifests/deployment.yaml
   kubectl apply -f k8s-manifests/service.yaml
   kubectl apply -f k8s-manifests/ingress.yaml
   ```

## API Integration

The frontend communicates with backend services through Dapr's service invocation pattern. All calls to the Course Agent and User Progress services are routed through Dapr, which handles service discovery, resilience, and security.

## Verification

To verify the deployment:
1. Check that pods are running: `kubectl get pods`
2. Verify Dapr sidecars are injected: `kubectl describe pods`
3. Confirm services are accessible: `dapr list`
4. Test API endpoints to ensure they return expected responses

## Project Structure

```
/learnflow-app/phase-4-frontend/
├── src/
│   ├── components/
│   │   ├── LessonViewer/
│   │   ├── CodeEditor/
│   │   └── AgentChat/
│   ├── pages/
│   │   └── index.tsx
│   ├── services/
│   │   └── api-client.ts
│   └── styles/
├── public/
├── k8s-manifests/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── Dockerfile
├── package.json
├── tsconfig.json
└── next.config.js
```