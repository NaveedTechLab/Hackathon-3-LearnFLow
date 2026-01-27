# Implementation Plan: Phase 3: Backend Services

**Branch**: `3-backend-services` | **Date**: 2026-01-23 | **Spec**: specs/3-backend-services/spec.md
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Backend services implementation for the LearnFlow platform, including FastAPI-based Course Agent and User Progress services with Dapr integration for state management and pub/sub messaging.

## Technical Context

**Language/Version**: Python 3.9 (for FastAPI services)
**Primary Dependencies**: FastAPI, Dapr SDK, fastapi-dapr-agent skill, Docker, Kubernetes
**Storage**: PostgreSQL for persistent storage via Dapr state store
**Testing**: Unit tests for service endpoints, integration tests for Dapr components
**Target Platform**: Minikube cluster with Dapr sidecar injection
**Project Type**: Microservices architecture with Dapr sidecar pattern
**Performance Goals**: N/A (initial implementation phase)
**Constraints**: Services must be deployed within /learnflow-app/phase-3-backend-services scope, use Dapr for state/pubsub, containerized for deployment
**Scale/Scope**: Two FastAPI services with Dapr integration for distributed system capabilities

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Skills-First Architecture: All operations must use fastapi-dapr-agent skill for scaffolding
- Tech Stack Mandate: Use specified technologies (FastAPI, Dapr, Kubernetes, PostgreSQL, Kafka)
- MCP Code Execution Priority: Use scripts for complex operations
- Cross-Phase Isolation: All outputs restricted to /learnflow-app/phase-3-backend-services
- Foundation-First Approach: Phase 1 and Phase 2 must be complete before Phase 3 (assumed complete)

## Project Structure

### Documentation (this feature)

```text
specs/3-backend-services/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
/learnflow-app/
└── phase-3-backend-services/
    ├── course-agent/
    │   ├── app/
    │   │   ├── main.py
    │   │   ├── api/
    │   │   └── models/
    │   ├── Dockerfile
    │   ├── dapr-components/
    │   │   ├── statestore.yaml
    │   │   └── pubsub.yaml
    │   └── k8s-manifests/
    │       └── deployment.yaml
    ├── user-progress/
    │   ├── app/
    │   │   ├── main.py
    │   │   ├── api/
    │   │   └── models/
    │   ├── Dockerfile
    │   ├── dapr-components/
    │   │   ├── statestore.yaml
    │   │   └── pubsub.yaml
    │   └── k8s-manifests/
    │       └── deployment.yaml
    └── dapr-config/
        └── config.yaml
```

**Structure Decision**: Microservices architecture using FastAPI with Dapr sidecar pattern. All outputs contained within the designated phase-3-backend-services directory.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None] | [No violations identified] | [N/A] |