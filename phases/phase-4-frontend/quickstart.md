# Quickstart Guide: Phase 4 Frontend

## Prerequisites
- Node.js 18+ installed
- Docker installed
- Kubernetes cluster (Minikube recommended)
- Dapr installed and initialized
- Access to Phase 3 Course Agent service

## Setup Steps

1. **Initialize Next.js Project**:
   ```bash
   # Use nextjs-k8s-deploy skill to scaffold the project
   ```

2. **Install Dependencies**:
   ```bash
   cd /learnflow-app/phase-4-frontend
   npm install @monaco-editor/react next react react-dom
   ```

3. **Create UI Components**:
   ```bash
   # Create LessonViewer component
   # Create CodeEditor component with Monaco integration
   # Create AgentChat sidebar component
   ```

4. **Configure Dapr Integration**:
   ```bash
   # Set up API routes to proxy requests to Course Agent via Dapr
   # Configure service invocation for communication with backend
   ```

5. **Build and Deploy**:
   ```bash
   # Build the Next.js application
   npm run build

   # Containerize the application
   docker build -t learnflow-frontend .

   # Deploy to Kubernetes using generated manifests
   kubectl apply -f k8s-manifests/
   ```

6. **Verify Deployment**:
   ```bash
   # Check that pods are running
   kubectl get pods

   # Verify Dapr sidecar is injected
   dapr list

   # Access the application
   minikube service [service-name] --url
   ```

## Expected Output

- Next.js application running with Lesson Viewer displaying educational content
- Monaco Editor integrated and functional for code interaction
- Agent Chat sidebar connecting to Course Agent service
- Application deployed to Kubernetes and accessible via browser
- Dapr sidecar properly injected with service-to-service communication working