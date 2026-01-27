# LearnFlow Demo Script

## Pre-Demo Setup

```bash
# Ensure Minikube is running
minikube status

# Start LearnFlow locally
cd learnflow-app
docker-compose up -d

# Verify all services
docker-compose ps
```

## Demo Flow

### Scene 1: Student Login (Maya)

**Narrator**: "Maya is a beginner Python student. She logs into LearnFlow."

**Actions**:
1. Open browser to http://localhost:3000
2. Click "Student Login"
3. Show dashboard with progress: "Module 2: Loops - 60% complete"

### Scene 2: Learning Interaction

**Narrator**: "Maya asks about for loops."

**Actions**:
1. Type in chat: "How do for loops work in Python?"
2. Concepts Agent responds with explanation
3. Show code examples in Monaco editor
4. Maya types her own loop code
5. Click "Run" - see output

### Scene 3: Assessment

**Narrator**: "The agent offers a quiz to assess understanding."

**Actions**:
1. Agent prompts: "Would you like to test your understanding?"
2. Maya takes quiz - scores 4/5
3. Progress updates to 68%
4. Mastery indicator changes color

### Scene 4: Struggle Detection (James)

**Narrator**: "Another student, James, is struggling."

**Actions**:
1. Switch to James's session
2. Show 3 failed attempts at list comprehensions
3. System detects struggle pattern
4. Alert sent to teacher dashboard

### Scene 5: Teacher Intervention

**Narrator**: "Teacher Mr. Rodriguez receives the alert."

**Actions**:
1. Switch to teacher view
2. Show struggle alert for James
3. View James's code attempts
4. Type: "Create easy exercises on list comprehensions"
5. Exercise Agent generates exercises
6. Teacher assigns with one click

### Scene 6: Resolution

**Narrator**: "James receives personalized exercises."

**Actions**:
1. Switch back to James's view
2. Show notification of new exercises
3. James completes first exercise
4. Progress updates, confidence restored

## Technical Demo

### Skills Structure
```bash
# Show Claude skills
tree .claude/skills/kafka-k8s-setup/

# Show Goose compatibility
cat .goose/skills/kafka-k8s-setup.yaml
```

### Kubernetes Deployment
```bash
# Deploy using manifests
kubectl apply -f learnflow-app/k8s/

# Check pods
kubectl get pods -n learnflow

# Show Dapr sidecars
kubectl get pods -n learnflow -o wide
```

### MCP Code Execution
```bash
# Show token-efficient pattern
cat .claude/skills/kafka-k8s-setup/scripts/verify.py

# Execute script
python .claude/skills/kafka-k8s-setup/scripts/verify.py
```

## Closing

**Narrator**: "LearnFlow demonstrates the power of Skills with MCP Code Execution - teaching AI agents to build sophisticated applications autonomously."

**Key Points**:
1. Skills are reusable across Claude Code and Goose
2. MCP Code Execution reduces token usage by 80-98%
3. Full application built using skills, not manual coding
4. Cloud-native architecture with Kubernetes, Kafka, Dapr
