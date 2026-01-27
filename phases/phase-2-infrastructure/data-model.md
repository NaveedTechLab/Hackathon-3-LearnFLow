# Data Model: Phase 2 Infrastructure Deployment

## Entities

### Kafka Infrastructure
- **Name**: Apache Kafka deployment
- **Fields**:
  - Pods status (Running, Pending, Failed)
  - Service endpoints (internal cluster addresses)
  - Configuration parameters
- **Relationships**: Part of the Minikube cluster infrastructure

### PostgreSQL Infrastructure
- **Name**: PostgreSQL database deployment
- **Fields**:
  - Pods status (Running, Pending, Failed)
  - Service endpoints (internal cluster addresses)
  - Database name, username, password
- **Relationships**: Part of the Minikube cluster infrastructure

### Infrastructure Endpoints
- **Name**: Internal cluster endpoints documentation
- **Fields**:
  - Kafka endpoint (service URL)
  - PostgreSQL endpoint (service URL)
- **Relationships**: References both Kafka and PostgreSQL infrastructure

## Validation Rules
- Kafka pods must be in Running status
- PostgreSQL pods must be in Running status
- Both services must be accessible within the cluster
- Verification scripts must return success status
- Only minimal output should be logged to maintain token efficiency

## State Transitions
- Kafka: Not deployed → Deployed → Running (after successful deployment and verification)
- PostgreSQL: Not deployed → Deployed → Running (after successful deployment and verification)
- Infrastructure: Incomplete → Complete (after both services are running and verified)