# Research: Phase 3 Backend Services

## Decision: FastAPI-Dapr-Agent Skill Usage
**Rationale**: Use the fastapi-dapr-agent skill to scaffold both services as specified in the requirements, following the skills-first architecture.
**Alternatives considered**: Manual service creation vs. using the dedicated skill

## Decision: Dapr Component Configuration
**Rationale**: Configure Dapr components for statestore (PostgreSQL) and pubsub (Kafka) as specified in the requirements, following the Dapr sidecar pattern.
**Alternatives considered**: Direct database connections vs. Dapr state management

## Decision: Containerization Strategy
**Rationale**: Create Dockerfiles for both services to ensure they can be deployed to the Minikube cluster as required.
**Alternatives considered**: Direct deployment vs. containerized deployment

## Decision: Kubernetes Manifest Structure
**Rationale**: Create Kubernetes manifests with Dapr sidecar annotations to ensure proper integration with the Dapr runtime.
**Alternatives considered**: Bare pods vs. Dapr-enabled deployments with sidecar injection

## Decision: Service-to-Service Communication
**Rationale**: Use Dapr's service invocation for communication between services as specified in the requirements.
**Alternatives considered**: Direct HTTP calls vs. Dapr service invocation