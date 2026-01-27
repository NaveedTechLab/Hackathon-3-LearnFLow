# LearnFlow - AI-Powered Python Tutoring Platform

## Overview

LearnFlow is an AI-powered Python tutoring platform that provides personalized learning experiences through conversational AI tutors. Students learn Python programming concepts interactively by chatting with AI agents and writing/executing code in real-time.

## Features

- **Conversational AI Tutors**: Interactive Python concept explanations with adaptive examples
- **Real-time Code Editor**: Monaco editor integration for Python coding with syntax highlighting
- **Auto-grading System**: Instant feedback on coding exercises and quizzes
- **Progress Tracking**: Mastery scoring with weighted calculations (exercises, quizzes, code quality, consistency)
- **Struggle Detection**: Automatic identification of students needing assistance
- **Teacher Dashboard**: Class monitoring with struggle alerts and custom exercise generation
- **Event-Driven Architecture**: Microservices communication via Kafka
- **Token Efficiency**: MCP code execution pattern for minimal context usage

## Architecture

```
┌─────────────────┐    ┌─────────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Microservices      │    │  Infrastructure │
│  (Next.js)      │◄──►│                     │◄──►│                 │
│                 │    │  • triage-agent     │    │  • Kafka        │
│  • Student      │    │  • concepts-agent   │    │  • PostgreSQL   │
│    Dashboard    │    │  • code-review-agent│    │  • Dapr         │
│  • Learning     │    │  • debug-agent      │    │  • Kubernetes   │
│    Interface    │    │  • exercise-agent   │    │                 │
│  • Monaco       │    │  • progress-agent   │    │                 │
│    Editor       │    │                     │    │                 │
└─────────────────┘    └─────────────────────┘    └─────────────────┘
```

The platform follows an event-driven microservices architecture with:
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS, Monaco Editor
- **Backend**: 6 specialized AI agents using FastAPI + Dapr
- **Messaging**: Apache Kafka for event streaming between services
- **Persistence**: PostgreSQL for user data and progress tracking
- **Orchestration**: Kubernetes with Dapr service mesh

## Prerequisites

- Kubernetes cluster (Minikube or Kind for local development)
- kubectl
- Docker
- Node.js 18+ (for frontend)
- Python 3.8+ (for backend services)
- Dapr runtime installed (dapr init -k)
- OpenRouter API key (for AI agent responses)
- Helm (for infrastructure deployment)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd learnflow-app
   ```

2. Configure API keys:
   ```bash
   # Create .env file with OpenRouter API key
   # Get your key from: https://openrouter.ai/keys
   OPENROUTER_API_KEY=your_openrouter_key_here
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   LLM_MODEL=openai/gpt-3.5-turbo
   ```

3. Deploy infrastructure:
   ```bash
   # Deploy Kafka using kafka-k8s-setup skill
   # Deploy PostgreSQL using postgres-k8s-setup skill
   # Create required Kafka topics
   # Set up PostgreSQL schema
   ```

4. Deploy microservices:
   ```bash
   # Deploy all 6 microservices with Dapr annotations
   # Configure Dapr components (pub/sub, state store)
   ```

5. Deploy frontend:
   ```bash
   # Build and deploy Next.js frontend
   # Integrate with backend services
   ```

6. Run the application:
   ```bash
   # Access frontend at http://localhost:3000
   # Verify all microservices are responding
   # Test student and teacher workflows
   ```

## API Endpoints

### Triage Agent (Port 8001)
- `POST /query` - Route queries to appropriate specialist agents

### Concepts Agent (Port 8002)
- `POST /explain` - Get Python concept explanations with examples
- Uses OpenRouter API for AI responses (configured via OPENROUTER_API_KEY)

### Code Review Agent (Port 8003)
- `POST /review` - Review student code for correctness, style, efficiency
- Uses OpenRouter API for AI-powered code analysis (configured via OPENROUTER_API_KEY)

### Debug Agent (Port 8004)
- `POST /debug` - Get debugging assistance with hints-first approach
- `POST /solution` - Get full solution when requested
- Uses OpenRouter API for intelligent error analysis (configured via OPENROUTER_API_KEY)

### Exercise Agent (Port 8005)
- `POST /generate` - Generate coding challenges with test cases
- `POST /grade` - Auto-grade student submissions in sandbox
- Uses OpenRouter API for exercise generation and grading (configured via OPENROUTER_API_KEY)

### Progress Agent (Port 8006)
- `GET /progress/{user_id}` - Get student progress summary
- `GET /class-overview` - Get class-wide progress for teachers

### Frontend Endpoints
- `POST /api/query` - Send query to backend services
- `POST /api/execute` - Execute Python code in sandbox
- `POST /api/quiz/generate` - Generate quiz questions
- `POST /api/quiz/submit` - Submit quiz answers for grading
- `GET /api/progress/{user_id}` - Get student progress data
- `GET /api/teacher/class-overview` - Get class overview for teachers

## Deployment to Kubernetes

1. Ensure Dapr is installed on your Kubernetes cluster
2. Deploy infrastructure components (Kafka, PostgreSQL)
3. Create Dapr components for pub/sub and state management
4. Deploy all 6 microservices with Dapr annotations
5. Deploy frontend application
6. Configure ingress for external access

## Contributing Guidelines

This project follows the AAIF (Agent and AI Framework) standards for skill-based development:
- All infrastructure deployment done via skills (no manual coding)
- Heavy logic encapsulated in executable scripts
- Minimal token usage through MCP code execution pattern
- Cross-agent compatibility (Claude Code and Goose)
- SKILL.md files kept concise (~100 tokens)
- All services use Dapr for service mesh capabilities

## Team

Built with Claude Code using reusable intelligence skills framework.