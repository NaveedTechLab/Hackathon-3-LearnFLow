# Quickstart Guide: Phase 3 Backend Services

## Prerequisites
- Dapr runtime installed and initialized
- Kubernetes cluster (Minikube) running
- fastapi-dapr-agent skill available
- Docker installed for containerization

## Setup Steps

1. **Scaffold Course Agent Service**:
   ```bash
   # Use fastapi-dapr-agent skill to create course-agent service
   ```

2. **Scaffold User Progress Service**:
   ```bash
   # Use fastapi-dapr-agent skill to create user-progress service
   ```

3. **Configure Dapr Components**:
   ```bash
   # Create statestore.yaml for PostgreSQL
   # Create pubsub.yaml for Kafka
   ```

4. **Create Dockerfiles**:
   ```bash
   # Generate Dockerfiles for both services
   ```

5. **Create Kubernetes Manifests**:
   ```bash
   # Create deployment files with Dapr sidecar annotations
   ```

6. **Deploy to Minikube**:
   ```bash
   # Deploy both services to the Minikube cluster
   ```

7. **Verify Dapr Registration**:
   ```bash
   # Confirm services register with Dapr placement service
   ```

## Expected Output

- Course Agent service deployed with /generate-lesson and /lessons endpoints
- User Progress service deployed with /update-progress and /status endpoints
- Both services integrated with Dapr for state and pub/sub
- Services containerized and running in Minikube cluster
- Successful registration with Dapr placement service
- Service-to-service communication enabled via Dapr