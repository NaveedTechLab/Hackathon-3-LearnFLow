# Feature Specification: Phase 3: Backend Services

**Feature Branch**: `3-backend-services`
**Created**: 2026-01-23
**Status**: Draft
**Input**: User description: "Create a specification for Phase 3: Backend Services.

- Define requirements for a FastAPI-based "Course Agent" service.

- Define requirements for a FastAPI-based "User Progress" service.

- Specify Dapr integration for both services (State Store for Postgres, Pub/Sub for Kafka).

- Require the use of the 'fastapi-dapr-agent' skill to scaffold the service boilerplate.

- Define the API endpoints:

  - Course Agent: POST /generate-lesson, GET /lessons

  - User Progress: POST /update-progress, GET /status

- Success Criteria: Services must be containerized, deployed to Minikube in the /phase-3-backend-services folder, and successfully register with the Dapr placement service."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Course Agent Service (Priority: P1)

As a student using the LearnFlow platform, I need the Course Agent service to generate personalized lessons so that I can receive tailored educational content based on my learning needs and progress.

**Why this priority**: The Course Agent is fundamental to the platform's core value proposition of providing personalized education.

**Independent Test**: Can be fully tested by calling the POST /generate-lesson endpoint and verifying that a lesson is created, and by calling GET /lessons to retrieve the generated lessons.

**Acceptance Scenarios**:

1. **Given** a user request with course parameters, **When** calling POST /generate-lesson, **Then** a new lesson is created and returned with appropriate content.

2. **Given** existing lessons in the system, **When** calling GET /lessons, **Then** the list of available lessons is returned.

---

### User Story 2 - User Progress Service (Priority: P1)

As a student using the LearnFlow platform, I need the User Progress service to track my learning progress so that the system can adapt to my learning pace and provide appropriate recommendations.

**Why this priority**: The User Progress service is essential for personalizing the learning experience based on individual progress.

**Independent Test**: Can be fully tested by calling the POST /update-progress endpoint to record progress and calling GET /status to retrieve progress information.

**Acceptance Scenarios**:

1. **Given** a user progress update request, **When** calling POST /update-progress, **Then** the progress is recorded and confirmed.

2. **Given** existing user progress records, **When** calling GET /status, **Then** the current status and progress metrics are returned.

---

### User Story 3 - Dapr Integration (Priority: P2)

As a platform engineer, I need both services to integrate with Dapr so that they can leverage distributed system capabilities like state management and pub/sub messaging without tight coupling to infrastructure.

**Why this priority**: Dapr integration enables scalable, resilient microservices architecture that follows cloud-native best practices.

**Independent Test**: Can be fully tested by verifying that services register with the Dapr placement service and can interact with Dapr components for state and pub/sub.

**Acceptance Scenarios**:

1. **Given** a deployed service with Dapr sidecar, **When** the service starts, **Then** it registers successfully with the Dapr placement service.

2. **Given** a service with Dapr integration, **When** performing state operations, **Then** data is stored in and retrieved from the configured Postgres state store.

3. **Given** a service with Dapr integration, **When** publishing/subscribing to topics, **Then** messages are properly routed through the Kafka pub/sub component.

---

### Edge Cases

- What happens when the Dapr sidecar is not available?
- How does the system handle state store unavailability?
- What occurs when pub/sub messaging fails?
- How does the system handle invalid lesson generation requests?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Course Agent service MUST be built using FastAPI framework
- **FR-002**: User Progress service MUST be built using FastAPI framework
- **FR-003**: Both services MUST integrate with Dapr for state management using Postgres
- **FR-004**: Both services MUST integrate with Dapr for pub/sub messaging using Kafka
- **FR-005**: Course Agent service MUST provide POST /generate-lesson endpoint
- **FR-006**: Course Agent service MUST provide GET /lessons endpoint
- **FR-007**: User Progress service MUST provide POST /update-progress endpoint
- **FR-008**: User Progress service MUST provide GET /status endpoint
- **FR-009**: Both services MUST be scaffolded using the 'fastapi-dapr-agent' skill
- **FR-010**: Both services MUST be containerized for deployment
- **FR-011**: Both services MUST successfully register with the Dapr placement service
- **FR-012**: Services MUST be deployed to Minikube cluster in the /phase-3-backend-services scope

### Key Entities

- **Lesson**: Educational content unit generated by the Course Agent, containing curriculum elements and learning objectives
- **Progress**: Learning progress data tracking user achievements, completion rates, and performance metrics
- **Dapr Integration**: Distributed system capabilities enabling state management and pub/sub messaging between services

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Course Agent service is deployed and accessible via the specified API endpoints
- **SC-002**: User Progress service is deployed and accessible via the specified API endpoints
- **SC-003**: Both services are successfully containerized and deployed to Minikube
- **SC-004**: Both services successfully register with the Dapr placement service
- **SC-005**: Dapr state management integration works with Postgres for both services
- **SC-006**: Dapr pub/sub integration works with Kafka for both services
- **SC-007**: All API endpoints return expected responses and handle errors appropriately
- **SC-008**: Services are deployed within the /phase-3-backend-services folder structure