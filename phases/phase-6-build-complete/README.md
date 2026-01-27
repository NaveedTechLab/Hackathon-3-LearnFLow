# Phase 6: Monitoring, Resilience & Scaling

This directory contains the implementation for Phase 6 of the LearnFlow platform: Monitoring, Resilience & Scaling.

## Overview

Phase 6 focuses on implementing comprehensive monitoring, resilience mechanisms, and scaling capabilities for the LearnFlow platform. This includes deploying Prometheus and Grafana for monitoring, configuring Dapr for observability and resilience policies, and setting up Horizontal Pod Autoscalers for automatic scaling.

## Components

### Monitoring Stack
- **Prometheus**: Metric collection and storage for cluster and application monitoring
- **Grafana**: Visualization layer for metrics and dashboards
- **Kube-Prometheus-Stack**: Integrated solution with Prometheus, Grafana, and AlertManager

### Dapr Observability
- **Tracing**: Distributed tracing configuration for service-to-service communication
- **Metrics**: Dapr metrics export to Prometheus for monitoring
- **Components**: Configuration files for state management and pub/sub

### Resilience Policies
- **Retry Configuration**: Automatic retry policies for handling transient failures
- **Circuit Breakers**: Prevention of cascading failures with appropriate thresholds
- **Timeout Management**: Proper timeout configurations to prevent hanging requests

### Horizontal Pod Autoscaling (HPA)
- **CPU-Based Scaling**: Automatic scaling based on CPU utilization thresholds
- **Resource Limits**: Proper resource configuration for scaling decisions
- **Behavior Policies**: Scaling behavior definitions for gradual and controlled scaling

## Architecture

The LearnFlow platform implements a cloud-native architecture with:

- **Kubernetes**: Container orchestration using Minikube for local development
- **Dapr**: Distributed Application Runtime for service mesh capabilities
- **Prometheus**: Metrics collection and alerting
- **Grafana**: Visualization and dashboard capabilities
- **Kafka**: Event streaming and pub/sub messaging
- **PostgreSQL**: Persistent storage for user progress and lesson data

## Files and Directories

- `dapr-config.yaml`: Dapr configuration for tracing and metrics export
- `resilience.yaml`: Resilience policies including retry and circuit breaker configurations
- `hpa-frontend.yaml`: Horizontal Pod Autoscaler for the frontend service
- `hpa-course-agent.yaml`: Horizontal Pod Autoscaler for the course agent service
- `scripts/resilience-test.py`: Verification script for resilience policies
- `monitoring/`: Directory for monitoring-related configurations

## Validation Process

The resilience and monitoring implementation can be validated through:

1. **Environment Verification**: Confirming all required tools are installed and accessible
2. **Service Health Checks**: Verifying services are running and responsive
3. **Resilience Testing**: Testing retry and circuit breaker functionality under simulated failures
4. **Metric Collection**: Confirming metrics are properly collected and visualized
5. **Auto-Scaling Validation**: Verifying HPA configurations respond to load appropriately

## Deployment

To deploy the monitoring and resilience features:

1. Ensure all prerequisite services are running (Kafka, PostgreSQL, Dapr)
2. Apply Dapr configuration with observability settings
3. Deploy resilience policies to protect services from failures
4. Configure HPAs for automatic scaling
5. Run validation scripts to confirm proper operation

## Verification

Run the following commands to verify the implementation:

```bash
# Execute the resilience test
python scripts/resilience-test.py

# Check that services are running
kubectl get pods

# Verify Dapr services are registered
dapr list

# Check HPA status
kubectl get hpa

# Verify metrics are being collected
kubectl get svc -n monitoring
```