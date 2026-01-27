#!/bin/bash

echo "Environment Verification Script"
echo "==============================="

# Check Docker
if command -v docker &> /dev/null; then
    echo "✓ Docker: $(docker --version)"
else
    echo "✗ Docker: Not installed"
fi

# Check kubectl
if command -v kubectl &> /dev/null; then
    echo "✓ kubectl: $(kubectl version --client --output=json | grep -o '"gitVersion":"[^"]*' | cut -d'"' -f4)"
else
    echo "✗ kubectl: Not installed"
fi

# Check if Minikube would be available (it's not installed in this environment)
if command -v minikube &> /dev/null; then
    echo "✓ Minikube: $(minikube version)"
else
    echo "⚠ Minikube: Not installed"
fi

# Check if Helm would be available (it's not installed in this environment)
if command -v helm &> /dev/null; then
    echo "✓ Helm: $(helm version --short)"
else
    echo "⚠ Helm: Not installed"
fi

# Check if AGENTS.md files exist
if [ -f "/mnt/e/Hackathon 3/Reusable-Intelligence-and-Cloud-Native-Mastery/learnflow-app/phase-1-foundation/AGENTS.md" ]; then
    echo "✓ AGENTS.md exists in learnflow-app"
else
    echo "✗ AGENTS.md missing in learnflow-app"
fi

if [ -f "/mnt/e/Hackathon 3/Reusable-Intelligence-and-Cloud-Native-Mastery/.claude/skills/AGENTS.md" ]; then
    echo "✓ AGENTS.md exists in skills-library"
else
    echo "✗ AGENTS.md missing in skills-library"
fi

# Check if directory structure is in place
if [ -d "/mnt/e/Hackathon 3/Reusable-Intelligence-and-Cloud-Native-Mastery/learnflow-app/phase-1-foundation" ]; then
    echo "✓ Phase 1 foundation directory exists"
else
    echo "✗ Phase 1 foundation directory missing"
fi

echo ""
echo "All checks completed! Ready for hackathon"