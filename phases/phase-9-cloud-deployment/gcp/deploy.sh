#!/bin/bash
# Google GKE Deployment Script for LearnFlow

set -e

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-your-project-id}"
CLUSTER_NAME="${GCP_CLUSTER_NAME:-learnflow-gke}"
ZONE="${GCP_ZONE:-us-central1-a}"
NODE_COUNT=3
MACHINE_TYPE="e2-standard-2"

echo "=== LearnFlow Google GKE Deployment ==="

# Step 1: Set Project
echo "Setting GCP project..."
gcloud config set project $PROJECT_ID

# Step 2: Enable APIs
echo "Enabling required APIs..."
gcloud services enable container.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Step 3: Create GKE Cluster
echo "Creating GKE cluster (this may take several minutes)..."
gcloud container clusters create $CLUSTER_NAME \
    --zone $ZONE \
    --num-nodes $NODE_COUNT \
    --machine-type $MACHINE_TYPE \
    --enable-autoscaling \
    --min-nodes 2 \
    --max-nodes 5

# Step 4: Get Credentials
echo "Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE

# Step 5: Verify Connection
echo "Verifying cluster connection..."
kubectl cluster-info

# Step 6: Create Namespace
echo "Creating learnflow namespace..."
kubectl create namespace learnflow --dry-run=client -o yaml | kubectl apply -f -

# Step 7: Deploy Kafka
echo "Deploying Kafka..."
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install kafka bitnami/kafka --namespace learnflow \
    --set replicaCount=3 \
    --set zookeeper.replicaCount=3

# Step 8: Deploy PostgreSQL
echo "Deploying PostgreSQL..."
helm install postgresql bitnami/postgresql --namespace learnflow \
    --set auth.postgresPassword=learnflow123 \
    --set auth.database=learnflow

# Step 9: Deploy LearnFlow Application
echo "Deploying LearnFlow application..."
kubectl apply -f ../../../learnflow-app/k8s/ -n learnflow

# Step 10: Deploy Ingress
echo "Deploying GCE Ingress..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-gce/master/deploy/static/mandatory.yaml

# Step 11: Get External IP
echo "Waiting for external IP..."
kubectl get svc -n learnflow -w

echo "=== Deployment Complete ==="
echo "Run 'kubectl get pods -n learnflow' to check status"
