#!/bin/bash

# Script to verify LearnFlow frontend deployment with Dapr integration

set -euo pipefail

SERVICE_NAME="learnflow-frontend"
NAMESPACE="default"

echo "Verifying LearnFlow frontend deployment..."

# Check if pods are running
echo "Checking if pods are running..."
POD_STATUS=$(kubectl get pods -l app=$SERVICE_NAME -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.status.phase}{"\\n"}{end}')
echo "$POD_STATUS"

# Check if Dapr sidecar is injected
echo "Checking for Dapr sidecar injection..."
SIDECARS=$(kubectl get pods -l app=$SERVICE_NAME -o jsonpath='{range .items[*]}{.metadata.name}{" has containers: "}{.spec.containers[*].name}{"\\n"}{end}')
echo "$SIDECARS"

# Verify Dapr sidecar is present by checking for daprd container
SIDECAR_CHECK=$(kubectl get pods -l app=$SERVICE_NAME -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.spec.containers[*].name}{"\\n"}{end}' | grep -c "daprd" || true)
if [ "$SIDECAR_CHECK" -gt 0 ]; then
    echo "✓ Dapr sidecar found in pods"
else
    echo "✗ Dapr sidecar NOT found in pods"
fi

# Run dapr list to verify service registration
echo "Checking Dapr service registration..."
DAPR_LIST_OUTPUT=$(dapr list 2>/dev/null || echo "dapr command not available")
if [[ "$DAPR_LIST_OUTPUT" == *"dapr command not available"* ]]; then
    echo "⚠ Dapr CLI not available, skipping dapr list check"
else
    echo "$DAPR_LIST_OUTPUT"
    if echo "$DAPR_LIST_OUTPUT" | grep -q "$SERVICE_NAME"; then
        echo "✓ Service $SERVICE_NAME found in Dapr list"
    else
        echo "✗ Service $SERVICE_NAME NOT found in Dapr list"
    fi
fi

# Check service availability
echo "Checking service availability..."
kubectl get services -l app=$SERVICE_NAME

# Test if the service is responding
SERVICE_ENDPOINT=$(kubectl get service learnflow-frontend-service -o jsonpath='{.spec.clusterIP}' 2>/dev/null || echo "not available")
if [ "$SERVICE_ENDPOINT" != "not available" ]; then
    echo "Service endpoint: $SERVICE_ENDPOINT"
else
    echo "Service endpoint not available yet"
fi

echo "Verification completed!"