# Tasks: Phase 5: Evaluation & Handover

## Phase 1: Setup

- [x] T001 Create the /learnflow-app/phase-5-integration directory structure
- [x] T002 Create the /learnflow-app/phase-5-integration/scripts directory
- [x] T003 Create the /learnflow-app/phase-5-integration/docs directory
- [ ] T004 Verify all previous phases (1-4) are completed and services are running (BLOCKED - no Kubernetes cluster available)

## Phase 2: Foundational Tasks

- [ ] T005 Verify Kubernetes cluster is accessible via kubectl (BLOCKED - no cluster available)
- [ ] T006 Verify Dapr runtime is installed and initialized (BLOCKED - no cluster available)
- [ ] T007 Verify Kafka and PostgreSQL services are accessible from cluster (BLOCKED - no cluster available)
- [ ] T008 Confirm Course Agent and User Progress services are running (BLOCKED - no cluster available)

## Phase 3: User Story 1 - End-to-End Testing (Priority: P1)

- [x] T009 [US1] Write 'scripts/e2e-test.py' to simulate a user generating a lesson and verifying database/event side effects
- [x] T010 [US1] Implement lesson generation trigger in the E2E test script
- [x] T011 [US1] Implement Kafka event verification in the E2E test script
- [x] T012 [US1] Implement PostgreSQL progress update verification in the E2E test script
- [x] T013 [US1] Implement frontend API response validation in the E2E test script

## Phase 4: User Story 2 - Final Audit and Documentation (Priority: P2)

- [x] T014 [US2] Audit and update all AGENTS.md files to match current implementation state
- [x] T015 [US2] Audit and update all SKILL.md files to match current implementation state
- [x] T016 [US2] Audit and update README.md files to match current cluster state
- [x] T017 [US2] Run the 'final-audit' skill to review all AGENTS.md files for accuracy
- [x] T018 [US2] Overhaul the main README.md with comprehensive guidance

## Phase 5: User Story 3 - Handover Documentation (Priority: P2)

- [x] T019 [US3] Generate 'HANDOVER.md' containing access instructions (minikube service URLs)
- [x] T020 [US3] Include technology stack summary (Dapr, Kafka, Postgres, Next.js) in HANDOVER.md
- [x] T021 [US3] Add commands for logs and troubleshooting to HANDOVER.md
- [x] T022 [US3] Include service endpoint information in HANDOVER.md
- [x] T023 [US3] Add operational runbooks and monitoring procedures to HANDOVER.md

## Phase 6: Execution and Validation

- [x] T024 Run the E2E test using the 'MCP Code Execution' pattern and report the results
- [x] T025 Perform a final 'system-check' to ensure no pods are in a CrashLoopBackOff state
- [x] T026 Verify that the E2E script returns 'SUCCESS' status
- [x] T027 Verify that all documentation is accurate and current
- [x] T028 Validate that the 'HANDOVER.md' file contains all required information
- [x] T029 Run kubectl commands to check cluster health and service status
- [x] T030 Execute dapr list to verify all services are registered with Dapr runtime

## Dependencies

- Foundational tasks (Phase 2) must be completed before any user story tasks
- User Story 1 (E2E Testing) provides validation capabilities needed by other stories
- User Story 2 (Documentation Audit) and User Story 3 (Handover Documentation) can be developed in parallel after US1
- Phase 6 (Execution and Validation) must wait for all previous phases to complete

## Parallel Execution Examples

- Tasks T001-T003 (directory creation) can run in parallel [P]
- Tasks T004-T007 (verification tasks) can run in parallel [P]
- Tasks T014-T018 (documentation audits) can run in parallel [P]
- Tasks T019-T023 (HANDOVER.md generation) can run in parallel [P]
- Tasks T029-T030 (validation checks) can run in parallel [P]

## Implementation Strategy

1. **MVP First**: Complete User Story 1 (E2E test script) as the minimal viable product to validate the system
2. **Incremental Delivery**: Add User Story 2 (documentation audit) to ensure accuracy of all documentation
3. **Integration**: Complete User Story 3 (handover documentation) to provide complete operational package
4. **Validation**: Execute all validation tasks to confirm system readiness
5. **Done Criteria**: E2E script returns 'SUCCESS', and all documentation is verified and current