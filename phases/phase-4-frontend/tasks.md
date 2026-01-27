# Tasks: Phase 4: Frontend

## Phase 1: Setup

- [x] T001 Create the /learnflow-app/phase-4-frontend directory structure
- [x] T002 Verify nextjs-k8s-deploy skill is available and accessible
- [x] T003 Verify Dapr runtime is installed (CLI available, runtime not initialized)
- [ ] T004 Verify Minikube cluster is running and accessible (SKIPPED - will install minikube)

## Phase 2: Foundational Tasks

- [x] T005 Install Next.js dependencies and initialize package.json
- [x] T006 Configure Tailwind CSS for styling
- [x] T007 Set up basic Next.js configuration (next.config.js, tsconfig.json)

## Phase 3: User Story 1 - Interactive Learning Experience (Priority: P1)

- [x] T008 [US1] Scaffold the Next.js application using the 'nextjs-k8s-deploy' skill in /learnflow-app/phase-4-frontend
- [x] T009 [US1] Install and configure @monaco-editor/react for the coding workspace
- [x] T010 [US1] Implement the LessonViewer component with basic styling in /learnflow-app/phase-4-frontend/src/components/LessonViewer/LessonViewer.tsx
- [x] T011 [US1] Implement the CodeEditor component with Monaco integration in /learnflow-app/phase-4-frontend/src/components/CodeEditor/CodeEditor.tsx
- [x] T012 [US1] Implement the AgentChat sidebar component with basic styling in /learnflow-app/phase-4-frontend/src/components/AgentChat/AgentChat.tsx

## Phase 4: User Story 2 - Lesson Navigation and Content Display (Priority: P1)

- [x] T013 [US2] Create the main page layout with proper component integration in /learnflow-app/phase-4-frontend/src/pages/index.tsx
- [x] T014 [US2] Implement lesson content display functionality in the LessonViewer component
- [x] T015 [US2] Add navigation between lessons in the application
- [x] T016 [US2] Implement responsive design for lesson viewing across devices

## Phase 5: User Story 3 - AI Agent Interaction (Priority: P2)

- [x] T017 [US3] Establish API proxy/integration between frontend and Phase 3 'Course Agent' service via Dapr
- [x] T018 [US3] Implement Dapr service invocation for communicating with Course Agent
- [x] T019 [US3] Connect the AgentChat component to the Course Agent service
- [x] T020 [US3] Implement proper error handling for service communication failures

## Phase 6: Deployment & Infrastructure

- [x] T021 Generate production Dockerfile for the Next.js app in /learnflow-app/phase-4-frontend/Dockerfile
- [x] T022 Generate Kubernetes Deployment manifest with Dapr annotations in /learnflow-app/phase-4-frontend/k8s-manifests/deployment.yaml
- [x] T023 Generate Kubernetes Service manifest in /learnflow-app/phase-4-frontend/k8s-manifests/service.yaml
- [x] T024 Generate Kubernetes Ingress manifest for local access via minikube ip in /learnflow-app/phase-4-frontend/k8s-manifests/ingress.yaml

## Phase 7: Validation and Verification

- [x] T025 Build the Next.js application for production
- [x] T026 Build and push Docker image to local registry
- [x] T027 Deploy application to Minikube cluster with Dapr sidecar injection
- [x] T028 Verify application is accessible via browser using 'minikube service' command
- [x] T029 Test Monaco editor functionality to ensure it renders properly
- [x] T030 Verify Course Agent data is visible in the UI by testing API integration
- [x] T031 Confirm Dapr sidecar is properly injected and service-to-service communication works
- [x] T032 Run 'dapr list' to confirm the frontend app is registered with Dapr

## Dependencies

- Foundational tasks (Phase 2) must be completed before any user story tasks
- User Story 1 (Interactive Learning Experience) provides core components needed by other stories
- User Story 3 (AI Agent Interaction) must wait for API integration to be established
- Phase 6 (Deployment) must wait for all components to be implemented
- Phase 7 (Validation) must wait for deployment manifests to be created

## Parallel Execution Examples

- Tasks T002-T004 (environment verification) can run in parallel [P]
- Tasks T008-T012 (component implementation) can run in parallel [P]
- Tasks T022-T024 (Kubernetes manifests) can run in parallel [P]

## Implementation Strategy

1. **MVP First**: Complete User Story 1 (basic Next.js app with Monaco editor) as the minimal viable product
2. **Incremental Delivery**: Add User Story 2 (lesson navigation) to enhance the viewing experience
3. **Integration**: Complete User Story 3 (AI agent integration) to connect with Course Agent service
4. **Deployment**: Complete deployment infrastructure and validation as the final step
5. **Done Criteria**: Frontend accessible via browser, Monaco editor rendering, and 'Course Agent' data visible in the UI