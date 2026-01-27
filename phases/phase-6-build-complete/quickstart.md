# Quickstart Guide: Phase 6 Monitoring, Resilience & Scaling

## Prerequisites
- Kubernetes cluster (Minikube) running and accessible
- Dapr runtime installed and initialized
- Helm installed and configured
- Course Agent and User Progress services deployed and running

## Setup Steps

1. **Deploy Monitoring Stack**:
   ```bash
   # Add Prometheus community Helm repo
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update

   # Install kube-prometheus-stack
   helm install prometheus-grafana prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
   ```

2. **Configure Dapr for Observability**:
   ```bash
   # Apply Dapr configuration for tracing and metrics
   kubectl apply -f dapr-config/config.yaml
   kubectl apply -f dapr-config/components/
   ```

3. **Apply Resilience Policies**:
   ```bash
   # Apply Dapr component configurations for resilience
   kubectl apply -f dapr-config/components/resilience.yaml
   ```

4. **Deploy HPA Configurations**:
   ```bash
   # Apply Horizontal Pod Autoscaler configurations
   kubectl apply -f hpa/course-agent-hpa.yaml
   kubectl apply -f hpa/frontend-hpa.yaml
   ```

5. **Access Grafana Dashboard**:
   ```bash
   # Port forward to access Grafana
   kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
   ```

## Verification Steps

1. **Check that monitoring components are running**:
   ```bash
   kubectl get pods -n monitoring
   ```

2. **Verify Dapr services are registered**:
   ```bash
   dapr list
   ```

3. **Check HPA status**:
   ```bash
   kubectl get hpa
   ```

4. **Run the resilience test**:
   ```bash
   python scripts/resilience-test.py
   ```

## Expected Output

- Prometheus and Grafana running in monitoring namespace
- Grafana dashboard accessible at http://localhost:3000
- Dapr services sending metrics and traces to monitoring stack
- Resilience policies active in Dapr runtime
- HPAs monitoring CPU utilization and scaling pods appropriately
- Grafana showing Dapr sidecar metrics including request rate, latency, and success rate