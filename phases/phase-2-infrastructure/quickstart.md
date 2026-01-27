# Quickstart Guide: Phase 2 Infrastructure Deployment

## Prerequisites
- Minikube cluster running
- kafka-k8s-setup skill available
- postgres-k8s-setup skill available
- kubectl configured to connect to Minikube

## Setup Steps

1. **Deploy Kafka**:
   ```bash
   # Execute the kafka-k8s-setup skill to deploy Apache Kafka
   ```

2. **Deploy PostgreSQL**:
   ```bash
   # Execute the postgres-k8s-setup skill to deploy PostgreSQL
   ```

3. **Verify Kafka Deployment**:
   ```bash
   # Run the verify.py script from kafka-k8s-setup to confirm pod status
   ```

4. **Verify PostgreSQL Deployment**:
   ```bash
   # Run the verify.py script from postgres-k8s-setup to confirm pod status
   ```

5. **Document Endpoints**:
   ```bash
   # Create infra-endpoints.txt with internal cluster endpoints
   ```

## Expected Output

- Kafka pods running in the cluster
- PostgreSQL pods running in the cluster
- Both services accessible within the cluster
- Verification scripts return "Done" status
- Minimal success/failure results in context window
- infra-endpoints.txt file created with service endpoints