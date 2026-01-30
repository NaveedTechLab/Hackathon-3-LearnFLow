---
title: LearnFlow API
emoji: 🐍
colorFrom: green
colorTo: blue
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# LearnFlow - AI-Powered Python Learning API

This is the backend API for LearnFlow, an AI-powered Python tutoring platform.

## Features

- **AI Chat**: Get Python help powered by OpenRouter/GPT
- **User Authentication**: JWT-based auth system
- **Code Execution**: Execute Python code safely
- **Progress Tracking**: Track learning progress

## API Endpoints

- `GET /` - API Info
- `GET /health` - Health check
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /chat` - AI chat endpoint
- `GET /docs` - Swagger documentation

## Environment Variables

Set these in your Space secrets:
- `OPENROUTER_API_KEY` - Your OpenRouter API key

## Usage

Visit `/docs` for interactive API documentation.
