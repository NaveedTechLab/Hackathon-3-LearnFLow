# Quickstart Guide: Phase 5 Evaluation & Handover

## Prerequisites
- Docker, Minikube, Helm installed and operational
- Dapr runtime initialized
- Kafka and PostgreSQL services available
- All previous phases (1-4) completed successfully

## Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. **Verify environment components**:
   ```bash
   # Check Docker
   docker --version

   # Check Minikube
   minikube status

   # Check Helm
   helm version

   # Check Dapr
   dapr --version
   ```

3. **Start Minikube cluster**:
   ```bash
   minikube start
   ```

4. **Initialize Dapr**:
   ```bash
   dapr init -k
   ```

## Execution Steps

1. **Navigate to the Phase 5 directory**:
   ```bash
   cd learnflow-app/phase-5-integration
   ```

2. **Run the end-to-end test**:
   ```bash
   python scripts/e2e-test.py --user-id test-user-123 --course-id course-intro-python
   ```

3. **Optionally verify cluster status during test**:
   ```bash
   python scripts/e2e-test.py --verify-cluster
   ```

4. **Review the handover documentation**:
   ```bash
   cat docs/HANDOVER.md
   ```

## Validation

1. **Check that both services are running**:
   ```bash
   kubectl get pods
   ```

2. **Verify Dapr services are registered**:
   ```bash
   dapr list
   ```

3. **Check that the test passes with 100% success rate**:
   - The E2E test script should return a success status
   - All validation steps should pass

4. **Confirm the HANDOVER.md file contains required information**:
   - Service endpoints
   - Troubleshooting procedures
   - Operational runbooks

## Expected Output

Upon successful completion:
- E2E test passes with 100% success rate
- Both Course Agent and User Progress services are running in the cluster
- Both services have Dapr sidecars injected and registered
- `dapr list` shows both App IDs
- HANDOVER.md file contains complete operational information
- All components of the "Lesson Generation -> Pub/Sub -> DB Persistence" flow are validated