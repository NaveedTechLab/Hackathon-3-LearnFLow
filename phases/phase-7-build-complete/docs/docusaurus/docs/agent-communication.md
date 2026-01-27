---
sidebar_position: 2
---

# Agent-to-Agent Communication

LearnFlow implements a sophisticated agent-to-agent (A2A) communication protocol that enables specialized services to collaborate effectively.

## Overview

The agent-to-agent communication system allows the Course Agent to delegate complex coding tasks to the specialized Tutor Agent, while maintaining loose coupling and high performance through Dapr service invocation.

## Architecture

### Dapr Service Invocation

The LearnFlow platform uses Dapr's service invocation building block to enable secure, reliable communication between agents:

- **Protocol**: HTTP/gRPC with automatic encryption
- **Discovery**: Built-in service discovery via Dapr sidecar
- **Resiliency**: Automatic retries, circuit breakers, and load balancing
- **Observability**: Distributed tracing and metrics

### Communication Flow

The typical communication flow between Course Agent and Tutor Agent:

1. User requests a complex lesson generation
2. Course Agent determines the request requires specialized coding assistance
3. Course Agent invokes Tutor Agent via Dapr service invocation
4. Tutor Agent processes the coding task with specialized algorithms
5. Tutor Agent returns results to Course Agent via Dapr
6. Course Agent combines results with lesson content and returns to user

## Implementation Details

### Dapr Configuration

Both agents use Dapr configuration files to enable service invocation:

- Service endpoints are registered with Dapr runtime
- Automatic sidecar injection provides communication capabilities
- Configuration includes resiliency policies and tracing settings

### Security

- All agent communication is secured with mutual TLS
- Authentication tokens are validated for each service invocation
- Access control lists define which agents can communicate with each other