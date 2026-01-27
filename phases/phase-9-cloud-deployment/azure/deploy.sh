#!/bin/bash
# Azure AKS Deployment Script for LearnFlow

set -e

# Configuration
RESOURCE_GROUP="${AZURE_RESOURCE_GROUP:-learnflow-rg}"
CLUSTER_NAME="${AZURE_CLUSTER_NAME:-learnflow-aks}"
LOCATION="${AZURE_LOCATION:-eastus}"
NODE_COUNT=3
NODE_VM_SIZE="Standard_D2s_v3"

echo "=== LearnFlow Azure AKS Deployment ==="

# Step 1: Create Resource Group
echo "Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Step 2: Create AKS Cluster
echo "Creating AKS cluster (this may take several minutes)..."
az aks create \
    --resource-group $RESOURCE_GROUP \
    --name $CLUSTER_NAME \
    --node-count $NODE_COUNT \
    --node-vm-size $NODE_VM_SIZE \
    --enable-addons monitoring \
    --generate-ssh-keys

# Step 3: Get Credentials
echo "Getting cluster credentials..."
az aks get-credentials --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME

# Step 4: Verify Connection
echo "Verifying cluster connection..."
kubectl cluster-info

# Step 5: Create Namespace
echo "Creating learnflow namespace..."
kubectl create namespace learnflow --dry-run=client -o yaml | kubectl apply -f -

# Step 6: Deploy Kafka
echo "Deploying Kafka..."
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install kafka bitnami/kafka --namespace learnflow \
    --set replicaCount=3 \
    --set zookeeper.replicaCount=3

# Step 7: Deploy PostgreSQL
echo "Deploying PostgreSQL..."
helm install postgresql bitnami/postgresql --namespace learnflow \
    --set auth.postgresPassword=learnflow123 \
    --set auth.database=learnflow

# Step 8: Deploy LearnFlow Application
echo "Deploying LearnFlow application..."
kubectl apply -f ../../../learnflow-app/k8s/ -n learnflow

# Step 9: Deploy Ingress Controller
echo "Deploying NGINX Ingress..."
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace learnflow

# Step 10: Get External IP
echo "Waiting for external IP..."
kubectl get svc -n learnflow -w

echo "=== Deployment Complete ==="
echo "Run 'kubectl get pods -n learnflow' to check status"
