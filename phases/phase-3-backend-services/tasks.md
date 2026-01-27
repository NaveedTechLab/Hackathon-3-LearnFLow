# Tasks: Phase 3: Backend Services

## Phase 1: Setup

- [x] T001 Create the /learnflow-app/phase-3-backend-services directory structure
- [x] T002 Verify fastapi-dapr-agent skill is available and accessible
- [ ] T003 Verify Dapr runtime is installed and initialized (SKIPPED - using script-generated config)
- [ ] T004 Verify Minikube cluster is running and accessible (SKIPPED - will check during deployment)

## Phase 2: Foundational Tasks

- [x] T005 Create the dapr-config directory for component manifests
- [x] T006 Prepare the course-agent service directory structure
- [x] T007 Prepare the user-progress service directory structure

## Phase 3: User Story 1 - Course Agent Service (Priority: P1)

- [x] T008 [US1] Scaffold the 'Course Agent' service using the 'fastapi-dapr-agent' skill in /learnflow-app/phase-3-backend-services/course-agent
- [x] T009 [US1] Implement the POST /generate-lesson endpoint in the Course Agent service
- [x] T010 [US1] Implement the GET /lessons endpoint in the Course Agent service
- [x] T011 [US1] Integrate Dapr state management for lesson persistence in the Course Agent service
- [x] T012 [US1] Integrate Dapr pub/sub for lesson-related events in the Course Agent service

## Phase 4: User Story 2 - User Progress Service (Priority: P1)

- [x] T013 [US2] Scaffold the 'User Progress' service using the 'fastapi-dapr-agent' skill in /learnflow-app/phase-3-backend-services/user-progress
- [x] T014 [US2] Implement the POST /update-progress endpoint in the User Progress service
- [x] T015 [US2] Implement the GET /status endpoint in the User Progress service
- [x] T016 [US2] Integrate Dapr state management for progress tracking in the User Progress service
- [x] T017 [US2] Integrate Dapr pub/sub for progress-related events in the User Progress service

## Phase 5: User Story 3 - Dapr Integration (Priority: P2)

- [x] T018 [US3] Generate Dapr component manifest for statestore (PostgreSQL) in /learnflow-app/phase-3-backend-services/dapr-config/statestore.yaml
- [x] T019 [US3] Generate Dapr component manifest for pubsub (Kafka) in /learnflow-app/phase-3-backend-services/dapr-config/pubsub.yaml
- [x] T020 [US3] Write Dockerfile for Course Agent service in /learnflow-app/phase-3-backend-services/course-agent/Dockerfile
- [x] T021 [US3] Write Dockerfile for User Progress service in /learnflow-app/phase-3-backend-services/user-progress/Dockerfile
- [x] T022 [US3] Generate Kubernetes Deployment manifest for Course Agent with Dapr annotations in /learnflow-app/phase-3-backend-services/course-agent/k8s-manifests/deployment.yaml
- [x] T023 [US3] Generate Kubernetes Service manifest for Course Agent in /learnflow-app/phase-3-backend-services/course-agent/k8s-manifests/service.yaml
- [x] T024 [US3] Generate Kubernetes Deployment manifest for User Progress with Dapr annotations in /learnflow-app/phase-3-backend-services/user-progress/k8s-manifests/deployment.yaml
- [x] T025 [US3] Generate Kubernetes Service manifest for User Progress in /learnflow-app/phase-3-backend-services/user-progress/k8s-manifests/service.yaml

## Phase 6: Validation and Verification

- [ ] T026 Deploy Course Agent service to Minikube cluster with Dapr sidecar injection (SKIPPED - Minikube not available in environment)
- [ ] T027 Deploy User Progress service to Minikube cluster with Dapr sidecar injection (SKIPPED - Minikube not available in environment)
- [ ] T028 Verify Course Agent service is running in K8s with sidecar injected using 'kubectl get pods' (SKIPPED - Minikube not available in environment)
- [ ] T029 Verify User Progress service is running in K8s with sidecar injected using 'kubectl get pods' (SKIPPED - Minikube not available in environment)
- [ ] T030 Verify service registration with the Dapr placement service using 'dapr list' (SKIPPED - Dapr runtime not initialized in environment)
- [ ] T031 Test Course Agent API endpoints to ensure they are accessible (SKIPPED - Services not deployed to cluster)
- [ ] T032 Test User Progress API endpoints to ensure they are accessible (SKIPPED - Services not deployed to cluster)
- [ ] T033 Validate Dapr state management functionality with Postgres (SKIPPED - Services not deployed to cluster)
- [ ] T034 Validate Dapr pub/sub functionality with Kafka (SKIPPED - Services not deployed to cluster)
- [ ] T035 Confirm both App IDs appear in 'dapr list' output (SKIPPED - Dapr runtime not initialized in environment)

## Dependencies

- Foundational tasks (Phase 2) must be completed before any user story tasks
- User Story 1 (Course Agent) and User Story 2 (User Progress) can be developed in parallel
- User Story 3 (Dapr Integration) must wait for both US1 and US2 to have basic implementations
- Validation and verification (Phase 6) must wait for all services to be deployed

## Parallel Execution Examples

- Tasks T002-T004 (skill and environment verification) can run in parallel [P]
- Tasks T008 and T013 (service scaffolding) can run in parallel [P]
- Tasks T018-T019 (Dapr component creation) can run in parallel [P]
- Tasks T020-T021 (Dockerfile creation) can run in parallel [P]
- Tasks T022-T025 (Kubernetes manifest creation) can run in parallel [P]

## Implementation Strategy

1. **MVP First**: Complete User Story 1 (Course Agent service) with basic functionality as the minimal viable product
2. **Incremental Delivery**: Add User Story 2 (User Progress service) to complement the Course Agent
3. **Integration**: Complete User Story 3 (Dapr Integration) to connect both services
4. **Cross-Cutting**: Complete validation and verification as the final step
5. **Done Criteria**: Both services running in K8s with sidecars injected and 'dapr list' showing both App IDs