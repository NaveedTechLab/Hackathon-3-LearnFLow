#!/bin/bash

# Script to deploy LearnFlow frontend to Kubernetes with Dapr sidecar injection

set -euo pipefail

# Configuration
SERVICE_NAME="learnflow-frontend"
NAMESPACE="default"
IMAGE_NAME="learnflow/frontend:latest"
DAPR_CONFIG="dapr-config"

echo "Starting deployment of LearnFlow frontend service..."

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Push to local registry (if using Minikube's registry)
echo "Pushing Docker image to registry..."
eval $(minikube docker-env)
docker build -t $IMAGE_NAME .
docker push $IMAGE_NAME

# Apply Dapr components
echo "Deploying Dapr components..."
kubectl apply -f dapr-config/statestore.yaml
kubectl apply -f dapr-config/pubsub.yaml
kubectl apply -f dapr-config/config.yaml

# Deploy the application with Dapr sidecar
echo "Deploying application to Kubernetes..."
kubectl apply -f k8s-manifests/deployment.yaml
kubectl apply -f k8s-manifests/service.yaml

# Wait for the deployment to be ready
echo "Waiting for deployment to be ready..."
kubectl wait --for=condition=ready pod -l app=$SERVICE_NAME --timeout=300s

# Verify the pods are running with Dapr sidecar
echo "Verifying deployment..."
kubectl get pods -l app=$SERVICE_NAME

# Verify Dapr sidecar injection
echo "Verifying Dapr sidecar injection..."
kubectl describe pods -l app=$SERVICE_NAME | grep -i "dapr"

# Run dapr list to confirm service registration
echo "Checking Dapr service registration..."
dapr list

echo "Deployment completed successfully!"
echo "Service is now available in the cluster."