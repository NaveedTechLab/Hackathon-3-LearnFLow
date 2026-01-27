# LearnFlow Platform Handover Documentation

## Overview

This document provides all necessary information for the operations team to maintain and support the LearnFlow platform. It includes service endpoints, troubleshooting procedures, and operational runbooks.

## Service Endpoints

### Minikube Access Information

To access the LearnFlow services, first ensure your Minikube cluster is running:

```bash
minikube status
```

To get the service URLs:

```bash
minikube service list
```

The services will be accessible at the URLs provided by the above command.

### Course Agent Service
- **Service Name**: `course-agent-service`
- **Port**: 3000
- **Endpoints**:
  - POST `/generate-lesson` - Generate a new lesson based on user parameters
  - GET `/lessons` - Retrieve available lessons for a user

### User Progress Service
- **Service Name**: `user-progress-service`
- **Port**: 3000
- **Endpoints**:
  - POST `/update-progress` - Update user progress for a specific lesson
  - GET `/status` - Get progress status for a user

### Tutor Agent Service
- **Service Name**: `tutor-agent-service`
- **Port**: 3000
- **Endpoints**:
  - POST `/process-coding-task` - Process a coding task and provide detailed explanation
  - POST `/update-progress` - Update user progress tracking
  - GET `/health` - Health check endpoint

### Frontend Service
- **Service Name**: `learnflow-frontend-service`
- **Port**: 3000
- **Endpoints**:
  - GET `/` - Main application interface
  - GET `/api/lessons` - Retrieve lessons for display
  - POST `/api/progress` - Update progress information

## Technology Stack Summary

### Infrastructure Layer
- **Kubernetes**: Using Minikube for local development and testing
- **Dapr**: Distributed Application Runtime for service-to-service communication, state management, and pub/sub
- **Kafka**: Event streaming and pub/sub messaging for asynchronous communication
- **PostgreSQL**: Persistent storage for user progress and lesson data

### Application Layer
- **FastAPI**: Backend services implementation for both Course Agent and User Progress services
- **Next.js**: Frontend implementation for the user interface
- **Python 3.9**: Primary language for backend services and automation scripts

### Orchestration
- **Claude Code and Goose**: Autonomous orchestration agents
- **MCP Servers**: Component communication layer
- **Docker**: Containerization for consistent deployments
- **Argo CD**: GitOps-based deployment and synchronization

## Commands for Logs and Troubleshooting

### Cluster Status
```bash
# Check cluster status
kubectl cluster-info

# Check all pods
kubectl get pods

# Check all services
kubectl get services

# Check all deployments
kubectl get deployments
```

### Dapr Status
```bash
# List all Dapr applications
dapr list

# Check Dapr sidecar logs for a specific pod
kubectl logs <pod-name> -c daprd

# Check Dapr control plane status
kubectl get pods -n dapr-system
```

### Service Logs
```bash
# Get logs for Course Agent service
kubectl logs -l app=course-agent

# Get logs for User Progress service
kubectl logs -l app=user-progress

# Get logs for Tutor Agent service
kubectl logs -l app=tutor-agent

# Get logs for Frontend service
kubectl logs -l app=learnflow-frontend
```

### Kafka and PostgreSQL Status
```bash
# Check Kafka pods
kubectl get pods -l app=kafka

# Check PostgreSQL pods
kubectl get pods -l app=postgresql

# Get Kafka topics
kubectl exec -it <kafka-pod> -- kafka-topics.sh --list --bootstrap-server localhost:9092

# Check PostgreSQL tables
kubectl exec -it <postgres-pod> -- psql -U postgres -c "\\dt"
```

### Troubleshooting Common Issues
```bash
# Check if services are receiving traffic
kubectl top pods

# Check resource usage
kubectl describe nodes

# Check for failed pods
kubectl get pods --field-selector=status.phase!=Running

# Get events for troubleshooting
kubectl get events --sort-by='.lastTimestamp'

# Check service connectivity using Dapr
dapr status -k
```

## How to Demo

### Demo Setup
1. Ensure all services are running in the Minikube cluster
2. Verify Dapr sidecars are injected and operational
3. Confirm Kafka and PostgreSQL are accessible

### Demo Steps
1. **Access the Frontend**: Navigate to the frontend service URL obtained from `minikube service list`

2. **Generate a Lesson**:
   - Call the Course Agent service's `/generate-lesson` endpoint with appropriate parameters
   - Observe the response with the generated lesson details

3. **Verify Kafka Event**:
   - Check that a "lesson-generated" event appears in the Kafka topic
   - Use `kubectl exec` to peek at Kafka messages if needed

4. **Update User Progress**:
   - Call the User Progress service's `/update-progress` endpoint
   - Verify the progress is updated in PostgreSQL via Dapr state management

5. **Validate Frontend Response**:
   - Confirm the frontend API responds appropriately to progress updates
   - Check that the UI reflects the updated progress

### Demo Verification Commands
```bash
# Verify all services are running
kubectl get pods -A

# Verify Dapr services are registered
dapr list

# Check that events are flowing through Kafka
# This would typically involve checking topic messages

# Verify progress is stored in PostgreSQL
# This would typically involve querying the database
```

## Operational Runbooks

### Daily Operations
- Monitor service health: `kubectl get pods`
- Check application logs: `kubectl logs -f <pod-name>`
- Verify Dapr sidecar status: `dapr list`
- Monitor resource usage: `kubectl top nodes`

### Maintenance Tasks
- Backup PostgreSQL data: `kubectl exec <postgres-pod> -- pg_dump -U postgres learnflow > backup.sql`
- Update service configurations: `kubectl apply -f <manifest-file>`
- Scale services: `kubectl scale deployment <deployment-name> --replicas=N`
- Restart a service: `kubectl rollout restart deployment/<deployment-name>`

### Monitoring and Alerting
- Use Dapr dashboard: `dapr dashboard`
- Monitor Kubernetes resources: `kubectl top nodes` and `kubectl top pods`
- Set up alerts for pod restarts, service unavailability, and resource exhaustion
- Monitor event flow between services via Kafka

## Argo CD Dashboard Access

To access the Argo CD dashboard:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Then access the dashboard at `https://localhost:8080` using the credentials from the Argo CD installation.

## Validation Commands

### To Verify the Complete System is Working:
```bash
# Check that all pods are running and ready
kubectl get pods

# Verify Dapr services are registered and healthy
dapr list

# Run the E2E test to validate the complete workflow
python scripts/e2e-test.py --verify-cluster

# Check cluster information to confirm it's accessible
kubectl cluster-info

# Verify that the handshake test passes (between Course Agent and Tutor Agent)
python scripts/handshake-test.py
```

### Expected Output:
- All services should show as Running in kubectl get pods
- Both Course Agent and Tutor Agent should appear in dapr list
- E2E test should complete successfully with all validations passing
- Cluster information should be returned without errors
- Handshake test should confirm successful multi-agent communication