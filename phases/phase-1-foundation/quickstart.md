# Quickstart Guide: Phase 1 Environment & Foundation

## Prerequisites
- Docker installed and running
- Minikube installed and configured
- Helm installed
- Claude Code available
- Goose installed

## Setup Steps

1. **Verify Environment**:
   ```bash
   docker --version
   minikube version
   helm version
   # Verify Claude Code and Goose are accessible
   ```

2. **Create Project Structure**:
   ```bash
   mkdir -p /learnflow-app/phase-1-foundation
   ```

3. **Generate AGENTS.md**:
   - Execute the agents-md-gen skill in both repositories

4. **Validate Setup**:
   ```bash
   kubectl cluster-info
   minikube status
   ```

## Running Verification

Execute the verification script from the hackathon document to confirm all components are properly configured.

## Expected Output

- All tools return valid version information
- Folder structure created in /learnflow-app/phase-1-foundation
- AGENTS.md files generated in both repositories
- kubectl cluster-info returns valid cluster information
- Verification script passes successfully