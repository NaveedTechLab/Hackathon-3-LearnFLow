# AGENTS.md - LearnFlow: Reusable Intelligence and Cloud-Native Mastery

## Project Overview

LearnFlow is an AI-powered Python tutoring platform built using Skills with MCP Code Execution pattern. This project demonstrates the paradigm shift from manual coding to teaching AI agents how to build cloud-native applications autonomously.

**Hackathon**: Reusable Intelligence and Cloud-Native Mastery (Hackathon III)
**Standards**: AAIF (Agentic AI Foundation)

## Repository Structure

```
Reusable-Intelligence-and-Cloud-Native-Mastery/
├── .claude/skills/           # Claude Code Skills (27+)
├── .goose/skills/            # Goose Recipe Files
├── .specify/                 # Constitution & Memory
├── learnflow-app/            # Main Application
│   ├── frontend/             # Next.js + Monaco Editor
│   ├── services/             # 12 Backend Services
│   ├── k8s/                  # Kubernetes Manifests
│   └── dapr/                 # Dapr Configuration
└── phases/                   # Documentation (7 phases)
```

## AI Agent Guidelines

### For Claude Code
- Skills are located in `.claude/skills/`
- Each skill follows MCP Code Execution pattern
- Scripts are in `scripts/` subfolder of each skill
- Use `SKILL.md` for instructions, scripts for execution

### For Goose
- Recipes are located in `.goose/skills/`
- Each recipe references Claude skill scripts
- Same scripts work for both agents

### Key Skills Available

| Skill | Purpose | Scripts |
|-------|---------|---------|
| kafka-k8s-setup | Deploy Kafka on K8s | deploy.sh, verify.py |
| postgres-k8s-setup | Deploy PostgreSQL on K8s | deploy_postgres.sh, run_migrations.py |
| fastapi-dapr-agent | FastAPI + Dapr microservices | scaffold.py, deploy.sh |
| nextjs-k8s-deploy | Deploy Next.js to K8s | build.sh, deploy.sh |
| docusaurus-deploy | Deploy documentation | build.sh, deploy.sh |
| agents-md-gen | Generate AGENTS.md | analyze.py, generate.py |
| mcp-code-execution | MCP Code Execution pattern | execute.py, filter.py |

## Tech Stack

### Infrastructure
- **Kubernetes**: Minikube for local, cloud K8s for production
- **Kafka**: Event-driven messaging (Bitnami Helm)
- **Dapr**: Sidecar pattern for microservices
- **PostgreSQL**: Persistent storage

### Application
- **Frontend**: Next.js 14 with Monaco Editor
- **Backend**: FastAPI with OpenAI SDK
- **Auth**: Better Auth middleware

### Services (12 Total)
1. api-gateway - Traffic routing
2. triage-agent - Query routing
3. concepts-agent - Python explanations
4. code-review-agent - Code analysis
5. debug-agent - Error parsing
6. exercise-agent - Challenge generation
7. progress-agent - Mastery tracking
8. course-agent - Course management
9. tutor-agent - AI tutoring
10. user-progress - Progress storage
11. auth - Authentication

## Development Workflow

### Running Locally
```bash
cd learnflow-app
docker-compose up -d
```

### Deploying to Kubernetes
```bash
# Use skills for deployment
kubectl apply -f k8s/
```

### Using Skills
```bash
# Claude Code
claude "Deploy Kafka using kafka-k8s-setup skill"

# Goose
goose run kafka-k8s-setup
```

## Constitution Reference

See `.specify/memory/constitution.md` for:
- Core principles (Skills-First, Token Efficiency, AAIF)
- Project structure rules
- Phase validation requirements
- Governance policies

## Phase Documentation

All phase documentation is in `phases/` folder:
- `phase-1-foundation/` - Environment setup, AGENTS.md
- `phase-2-infrastructure/` - Kafka, PostgreSQL deployment
- `phase-3-backend-services/` - FastAPI + Dapr agents
- `phase-4-frontend/` - Next.js implementation
- `phase-5-integration/` - MCP servers, Docusaurus
- `phase-6-build-complete/` - Monitoring, HPA, resilience
- `phase-7-build-complete/` - ArgoCD, GitHub Actions, Auth

## Contributing

1. All code changes must use Skills
2. Follow MCP Code Execution pattern
3. Update relevant phase documentation
4. Ensure scripts return minimal output

## Version

**Constitution Version**: 1.2.0
**Last Updated**: 2026-01-26
