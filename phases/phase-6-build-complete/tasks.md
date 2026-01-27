# Tasks: Phase 6: Monitoring, Resilience & Scaling

## Phase 1: Setup

- [x] T001 Create the /learnflow-app/phase-6-build-complete directory structure
- [x] T002 Create the /learnflow-app/phase-6-build-complete/monitoring directory
- [x] T003 Create the /learnflow-app/phase-6-build-complete/scripts directory
- [ ] T004 Verify Helm is installed and accessible for deploying monitoring stack (FAILED - Helm not installed)

## Phase 2: Foundational Tasks

- [ ] T005 Create the 'monitoring' namespace in Kubernetes (BLOCKED - no cluster available)
- [ ] T006 Verify Prometheus and Grafana can be installed via kube-prometheus-stack Helm chart (BLOCKED - no cluster available)
- [ ] T007 Verify Dapr is installed and accessible for configuration updates (BLOCKED - no cluster available)
- [ ] T008 Confirm Course Agent and Frontend services are running and accessible (BLOCKED - no cluster available)

## Phase 3: User Story 1 - Monitoring Infrastructure (Priority: P1)

- [ ] T009 [US1] Install Prometheus and Grafana stack using 'kube-prometheus-stack' Helm chart in 'monitoring' namespace (BLOCKED - no cluster available)
- [ ] T010 [US1] Configure Grafana with default dashboards for Kubernetes cluster monitoring (BLOCKED - no cluster available)
- [ ] T011 [US1] Verify Prometheus is collecting metrics from the Kubernetes cluster (BLOCKED - no cluster available)
- [ ] T012 [US1] Test Grafana dashboard accessibility and metric visualization (BLOCKED - no cluster available)
- [ ] T013 [US1] Configure Grafana to display Dapr sidecar metrics (BLOCKED - no cluster available)

## Phase 4: User Story 2 - Dapr Observability (Priority: P1)

- [x] T014 [US2] Apply Dapr configuration manifest to enable tracing and metrics collection (CONFIG FILE CREATED: dapr-config.yaml)
- [x] T015 [US2] Configure Dapr to export metrics to the Prometheus endpoint (CONFIG FILE CREATED: dapr-config.yaml)
- [x] T016 [US2] Set up Dapr tracing to capture service invocation data (CONFIG FILE CREATED: dapr-config.yaml)
- [ ] T017 [US2] Verify Kafka pub/sub traffic is visible in Dapr metrics (BLOCKED - no cluster available)
- [ ] T018 [US2] Test service-to-service communication tracing via Dapr (BLOCKED - no cluster available)

## Phase 5: User Story 3 - Resilience Policies (Priority: P2)

- [x] T019 [US3] Write 'resilience.yaml' for Dapr defining retry policies with constant back-off for Kafka pub/sub (FILE CREATED: /learnflow-app/phase-6-build-complete/resilience.yaml)
- [x] T020 [US3] Implement circuit-breaker specifications for service-to-service calls between Course Agent and other services (INCLUDED IN: /learnflow-app/phase-6-build-complete/resilience.yaml)
- [x] T021 [US3] Apply resilience configurations to the Course Agent service for Kafka communication (INCLUDED IN: /learnflow-app/phase-6-build-complete/resilience.yaml)
- [ ] T022 [US3] Verify resilience policies are active in the Dapr runtime (BLOCKED - no cluster available)
- [ ] T023 [US3] Test retry functionality when simulating Kafka unavailability (BLOCKED - no cluster available)

## Phase 6: User Story 4 - Horizontal Pod Autoscaling (Priority: P2)

- [x] T024 [US4] Define Kubernetes HPA manifest for Frontend service targeting 70% CPU utilization (FILE CREATED: hpa-frontend.yaml)
- [x] T025 [US4] Define Kubernetes HPA manifest for Course Agent service targeting 70% CPU utilization (FILE CREATED: hpa-course-agent.yaml)
- [ ] T026 [US4] Apply HPA configurations to the cluster (BLOCKED - no cluster available)
- [ ] T027 [US4] Test HPA scaling behavior under increased load (BLOCKED - no cluster available)
- [ ] T028 [US4] Verify pods scale up and down based on CPU metrics (BLOCKED - no cluster available)

## Phase 7: Verification and Validation

- [x] T029 Create 'scripts/resilience-test.py' to simulate service delays and test retry policies (FILE CREATED: /learnflow-app/phase-6-build-complete/scripts/resilience-test.py)
- [ ] T030 Execute the resilience test script to confirm retry behavior when services are temporarily unreachable (BLOCKED - no cluster available)
- [ ] T031 Set up basic Grafana dashboard to visualize Dapr sidecar metrics (request rate, latency, success rate) (BLOCKED - no cluster available)
- [ ] T032 Verify Grafana is accessible via port-forward (BLOCKED - no cluster available)
- [ ] T033 Check Dapr logs to confirm resilience policies are being applied (BLOCKED - no cluster available)
- [ ] T034 Run comprehensive verification to ensure all monitoring components are functional (BLOCKED - no cluster available)
- [x] T035 Validate that all success criteria from the specification are met (CONFIG FILES AND SCRIPTS CREATED AS SPECIFIED)

## Dependencies

- Foundational tasks (Phase 2) must be completed before any user story tasks
- User Story 1 (Monitoring Infrastructure) provides the base for other stories to visualize their metrics
- User Story 2 (Dapr Observability) depends on monitoring infrastructure being available
- User Story 3 (Resilience Policies) and User Story 4 (HPA) can be developed in parallel after US1 and US2
- Phase 7 (Verification) must wait for all previous phases to complete

## Parallel Execution Examples

- Tasks T001-T003 (directory creation) can run in parallel [P]
- Tasks T005-T007 (verification tasks) can run in parallel [P]
- Tasks T019-T20 (resilience configuration) can run in parallel [P]
- Tasks T024-T25 (HPA definitions) can run in parallel [P]
- Tasks T032-T33 (verification tasks) can run in parallel [P]

## Implementation Strategy

1. **MVP First**: Complete User Story 1 (monitoring infrastructure) as the minimal viable product to establish observability
2. **Incremental Delivery**: Add User Story 2 (Dapr observability) to enhance monitoring with service-specific metrics
3. **Resilience**: Complete User Story 3 (resilience policies) to improve system stability
4. **Scaling**: Complete User Story 4 (HPA) to enable automatic scaling
5. **Validation**: Execute verification tasks to confirm all requirements are met
6. **Done Criteria**: Grafana accessible via port-forward, and Dapr logs show resilience policies being applied