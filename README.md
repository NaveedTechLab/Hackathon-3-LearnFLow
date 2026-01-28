# LearnFlow - AI-Powered Python Learning Platform

<div align="center">

![LearnFlow Logo](https://img.shields.io/badge/LearnFlow-AI%20Python%20Tutor-teal?style=for-the-badge&logo=python&logoColor=white)

**Hackathon 3: Reusable Intelligence & Cloud-Native Mastery**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)](https://docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?style=flat-square&logo=kubernetes)](https://kubernetes.io/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-purple?style=flat-square)](https://openrouter.ai/)

[Live Demo](#) • [Documentation](#features) • [Quick Start](#quick-start) • [Deployment](#deployment)

</div>

---

## Overview

**LearnFlow** is an AI-powered interactive Python learning platform that provides personalized tutoring through intelligent agents. Built with modern cloud-native architecture, it offers real-time code execution, AI-driven explanations, progress tracking, and adaptive learning paths.

### Key Highlights

- **AI Python Tutor** - Real-time assistance powered by OpenRouter/GPT
- **Interactive Code Editor** - Write, run, and debug Python code in browser
- **Microservices Architecture** - 8 specialized AI agents
- **Cloud-Native** - Docker & Kubernetes ready
- **Modern UI** - Beautiful, responsive Next.js 14 frontend

---

## Features

### For Students

| Feature | Description |
|---------|-------------|
| **AI Tutor Chat** | Ask questions, get instant Python help with code examples |
| **Code Editor** | Monaco-based editor with syntax highlighting & execution |
| **Interactive Quizzes** | Test your knowledge with adaptive difficulty |
| **Progress Tracking** | Visual dashboard showing learning progress |
| **Learning Resources** | Guides, cheatsheets, videos & external tools |

### For Teachers

| Feature | Description |
|---------|-------------|
| **Student Analytics** | Track student progress and performance |
| **Dashboard** | Overview of class performance metrics |
| **Content Management** | Manage learning modules and quizzes |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    (Next.js 14 + Tailwind)                      │
│         Student Dashboard │ Teacher Dashboard │ Chat UI          │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY                                │
│                    (FastAPI + JWT Auth)                         │
│              /auth │ /chat │ /execute │ /progress               │
└─────────────────────────────┬───────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Triage Agent  │    │Concepts Agent │    │  Debug Agent  │
│  (Router)     │    │ (Explanations)│    │ (Error Help)  │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│Code Review    │    │Exercise Agent │    │Progress Agent │
│   Agent       │    │(Practice/Quiz)│    │  (Tracking)   │
└───────────────┘    └───────────────┘    └───────────────┘
                              │
                              ▼
                    ┌───────────────┐
                    │   OpenRouter  │
                    │   (GPT API)   │
                    └───────────────┘
```

### Microservices

| Service | Port | Description |
|---------|------|-------------|
| **API Gateway** | 8000 | Main entry point, auth, chat endpoint |
| **Triage Agent** | 8001 | Routes queries to appropriate agents |
| **Concepts Agent** | 8002 | Explains Python concepts |
| **Code Review Agent** | 8003 | Reviews and improves code |
| **Debug Agent** | 8004 | Helps debug errors |
| **Exercise Agent** | 8005 | Generates practice exercises |
| **Progress Agent** | 8006 | Tracks learning progress |
| **Frontend** | 3000 | Next.js web application |

---

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - VS Code's editor in browser
- **TypeScript** - Type-safe development

### Backend
- **FastAPI** - High-performance Python API
- **OpenRouter API** - AI/LLM integration (GPT-3.5/4)
- **JWT** - Secure authentication
- **Pydantic** - Data validation

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Local orchestration
- **Kubernetes** - Production orchestration
- **Dapr** - Distributed application runtime

---

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker Desktop
- Git

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/NaveedTechLab/Hackathon-3-LearnFLow.git
cd Hackathon-3-LearnFLow/learnflow-app

# Create environment file
cp .env.example .env
# Edit .env and add your OPENROUTER_API_KEY

# Start all services
docker-compose up --build

# Access the app
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/NaveedTechLab/Hackathon-3-LearnFLow.git
cd Hackathon-3-LearnFLow/learnflow-app

# Setup Frontend
cd frontend
npm install
npm run dev

# Setup Backend (new terminal)
cd ../services/api-gateway
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

---

## Environment Variables

Create a `.env` file in the `learnflow-app` directory:

```env
# Required: Get from https://openrouter.ai
OPENROUTER_API_KEY=your-api-key-here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
LLM_MODEL=openai/gpt-3.5-turbo

# JWT Secret (change in production)
JWT_SECRET_KEY=your-secret-key

# Database (optional - uses in-memory by default)
DATABASE_URL=postgresql://user:pass@localhost:5432/learnflow
```

---

## API Endpoints

### Authentication
```
POST /auth/register  - Register new user
POST /auth/login     - Login and get JWT token
GET  /auth/me        - Get current user info
```

### AI Chat
```
POST /chat           - Send message to AI tutor
POST /execute        - Execute Python code
POST /explain        - Get concept explanation
```

### Progress
```
GET  /progress/{id}  - Get user progress
POST /progress       - Update progress
```

### Health
```
GET  /health         - Service health check
GET  /              - API info
```

---

## Deployment

### Railway (Recommended - Free Tier)

1. Connect GitHub repo to [Railway](https://railway.app)
2. Add environment variables
3. Deploy automatically

### Docker on VPS

```bash
# On your server
git clone https://github.com/NaveedTechLab/Hackathon-3-LearnFLow.git
cd Hackathon-3-LearnFLow/learnflow-app
cp .env.example .env
# Edit .env with your API keys

docker-compose up -d --build
```

### Kubernetes

```bash
# Apply Kubernetes configs
kubectl apply -f k8s/namespaces.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## Project Structure

```
Hackathon-3-LearnFLow/
├── learnflow-app/
│   ├── frontend/               # Next.js 14 application
│   │   ├── app/
│   │   │   ├── page.tsx        # Landing page with login
│   │   │   ├── student/        # Student pages
│   │   │   │   ├── dashboard/
│   │   │   │   ├── chat/       # AI Tutor chat
│   │   │   │   ├── learn/      # Code editor + chat
│   │   │   │   ├── quiz/
│   │   │   │   └── progress/
│   │   │   ├── teacher/        # Teacher dashboard
│   │   │   └── resources/      # Learning resources
│   │   └── package.json
│   │
│   ├── services/               # Backend microservices
│   │   ├── api-gateway/        # Main API (FastAPI)
│   │   ├── triage-agent/       # Query router
│   │   ├── concepts-agent/     # Concept explanations
│   │   ├── code-review-agent/  # Code review
│   │   ├── debug-agent/        # Debug assistance
│   │   ├── exercise-agent/     # Exercises & quizzes
│   │   └── progress-agent/     # Progress tracking
│   │
│   ├── k8s/                    # Kubernetes configs
│   ├── dapr/                   # Dapr configuration
│   ├── docker-compose.yml
│   └── .env.example
│
├── phases/                     # Project planning docs
├── .claude/                    # Claude AI skills
├── .specify/                   # Specifications
└── README.md
```

---

## Screenshots

### Landing Page
Modern, responsive landing page with login functionality.

### Student Dashboard
Track progress, access courses, and start learning.

### AI Tutor Chat
Real-time AI assistance for Python questions.

### Code Editor
Write and execute Python code with instant feedback.

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is created for **Hackathon 3: Reusable Intelligence & Cloud-Native Mastery**.

---

## Team

**NaveedTechLab** - Full Stack Development & AI Integration

---

## Acknowledgments

- [OpenRouter](https://openrouter.ai/) - AI/LLM API
- [Next.js](https://nextjs.org/) - React Framework
- [FastAPI](https://fastapi.tiangolo.com/) - Python API Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code Editor

---

<div align="center">

**Built with ❤️ for Hackathon 3**

[⬆ Back to Top](#learnflow---ai-powered-python-learning-platform)

</div>
