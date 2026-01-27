<!-- SYNC IMPACT REPORT:
Version change: 1.1.0 → 1.2.0
Modified principles: Updated folder structure to separate app code from documentation
Added sections: Updated Project Structure, Services List, Phase 7 definition
Removed sections: Old nested phase structure inside learnflow-app
Templates requiring updates: None
Follow-up TODOs: None
-->
# LearnFlow: Reusable Intelligence and Cloud-Native Mastery Constitution

## Core Principles

### Skills-First Architecture
Do not write application code manually. All components must be built using skills with MCP Code Execution. Skills are the primary product; applications are secondary artifacts. MCP servers must be accessed via code-execution Skills, not direct agent loading. Focus on building reusable, autonomous skills with MCP code execution.

### Token Efficiency Priority
Strictly follow the 80-98% token reduction pattern by delegating logic to /scripts/. All complex operations must be encapsulated in scripts rather than executed directly in agent context. This ensures minimal token usage and maximum reusability.

### AAIF Standards Compliance
Adhere to Agentic AI Foundation (AAIF) standards and utilize AGENTS.md for repository context. All skills and components must follow AAIF standards for interoperability and consistency. Documentation must be maintained in AGENTS.md format.

### Foundation-First Approach
Phase 1 (Environment & Foundation Skills) must be completed before advancing to Phase 2. All foundation skills (agents-md-gen, k8s-foundation) must be operational before infrastructure work begins. This ensures stable base for subsequent phases.

### Tech Stack Mandate
Use the specified technology stack: Kubernetes (Minikube), Kafka (Event-driven), Dapr (Sidecar), FastAPI, and Next.js. All architectural decisions must align with this stack. No deviation from the specified tech stack without explicit constitutional amendment.

### MCP Code Execution Priority
Prioritize MCP code execution for all operations. All complex tasks must be delegated to scripts executed via MCP rather than direct agent execution. This ensures consistency, auditability, and token efficiency.

### PHR Documentation Requirement
Every user input must be recorded verbatim in a Prompt History Record (PHR). PHRs must follow proper routing structure: constitution → history/prompts/constitution/, feature-specific → history/prompts/<feature-name>/, general → history/prompts/general/.

## Project Structure

### Folder Organization
```
Reusable-Intelligence-and-Cloud-Native-Mastery/
├── .claude/skills/           # Skills Library (27+ skills with MCP Code Execution)
├── .specify/                 # Constitution, Memory, Templates
├── learnflow-app/            # Application Implementation (Single App)
│   ├── frontend/             # Next.js Frontend with Monaco Editor
│   ├── services/             # All Backend Services (12 total)
│   │   ├── api-gateway/
│   │   ├── auth/
│   │   ├── triage-agent/
│   │   ├── concepts-agent/
│   │   ├── code-review-agent/
│   │   ├── debug-agent/
│   │   ├── exercise-agent/
│   │   ├── progress-agent/
│   │   ├── course-agent/
│   │   ├── tutor-agent/
│   │   └── user-progress/
│   ├── k8s/                  # Kubernetes Manifests
│   ├── dapr/                 # Dapr Configuration
│   └── docker-compose.yml    # Local Development Setup
└── phases/                   # Documentation Only (specs, plans, tasks, READMEs)
    ├── phase-1-foundation/
    ├── phase-2-infrastructure/
    ├── phase-3-backend-services/
    ├── phase-4-frontend/
    ├── phase-5-integration/
    ├── phase-6-build-complete/
    └── phase-7-build-complete/
```

### Key Structure Rules
- **learnflow-app/** contains ONLY executable code (frontend, services, configs)
- **phases/** contains ONLY documentation (specs, plans, tasks, READMEs)
- **No duplicate code** - all agents consolidated in services/
- **No nested projects** - single unified application structure

### Multi-Phase Sequential with Foundation First
Work proceeds in phases, but Phase 1 (Foundation) must be completed entirely before any other phase begins. After Phase 1, phases 2-7 may proceed with proper gating and validation, but each phase must meet its validation criteria before advancing.

## Tech Stack Requirements

### Infrastructure Layer
- Kubernetes (Minikube for local development)
- Kafka for event-driven architecture
- Dapr for sidecar pattern implementation
- PostgreSQL for persistent storage

### Application Layer
- FastAPI for backend services
- Next.js for frontend implementation
- Monaco editor for code editing capabilities

### Orchestration
- Claude Code and Goose for autonomous orchestration
- MCP servers for component communication

## Validation Requirements

### Phase Validation Mandate
Every phase must pass verification scripts before closing. No phase may advance without successful validation. Validation scripts must be part of the deliverables for each phase.

### Skills Validation
All skills must pass autonomous operation tests. Skills must be able to execute without human intervention after initial configuration.

## Development Workflow

### Skills-First Contract Binding
Specifications are binding contracts focused on skill definitions; plans and tasks must not exceed skill scope. Implementation must strictly follow the defined skill architecture without adding manual code. All work must follow the LearnFlow project document without inventing new requirements.

### Cross-Phase Isolation
All phase work must be isolated to its corresponding /phase-X folder. No cross-phase file access unless explicitly allowed by spec. Each phase must maintain clear boundaries and interfaces.

### Sequential Phase Gateways
- Phase 1: Complete foundation skills validation (AGENTS.md, k8s-foundation)
- Phase 2: Infrastructure (Kafka + PostgreSQL) deployment validation
- Phase 3: Backend services (FastAPI + Dapr + 11 Agents) validation
- Phase 4: Frontend (Next.js + Monaco Editor) validation
- Phase 5: Integration (MCP servers + Docusaurus) validation
- Phase 6: Build Complete (Monitoring, HPA, Resilience) validation
- Phase 7: Continuous Deployment (ArgoCD + GitHub Actions + Better Auth) validation
- Phase 8: Polish & Demo (Documentation, demo script, submission checklist)
- Phase 9: Cloud Deployment (Azure AKS, Google GKE, Oracle OKE configs)

## Governance

This constitution governs the development of LearnFlow: Reusable Intelligence and Cloud-Native Mastery. All work must follow this constitution without deviation. Skills must operate autonomously with MCP code execution. The LearnFlow application must be built entirely via Skills using Claude Code and Goose.

The project follows the nine-phase structure defined above. Any phase may be revisited for maintenance but must not violate the sequential progression requirements for initial completion.

Constitution amendments require explicit approval and must follow the versioning policy: MAJOR for breaking changes, MINOR for additions, PATCH for clarifications.

**Version**: 1.3.0 | **Ratified**: 2026-01-23 | **Last Amended**: 2026-01-26