#!/bin/bash
# Oracle OKE Deployment Script for LearnFlow

set -e

# Configuration
COMPARTMENT_ID="${OCI_COMPARTMENT_ID:-your-compartment-id}"
CLUSTER_NAME="${OCI_CLUSTER_NAME:-learnflow-oke}"
REGION="${OCI_REGION:-us-ashburn-1}"
NODE_COUNT=3
NODE_SHAPE="VM.Standard2.1"

echo "=== LearnFlow Oracle OKE Deployment ==="

# Step 1: Create VCN (if not exists)
echo "Creating VCN..."
oci network vcn create \
    --compartment-id $COMPARTMENT_ID \
    --display-name learnflow-vcn \
    --cidr-block 10.0.0.0/16

# Step 2: Create OKE Cluster
echo "Creating OKE cluster (this may take several minutes)..."
oci ce cluster create \
    --compartment-id $COMPARTMENT_ID \
    --name $CLUSTER_NAME \
    --kubernetes-version v1.28.2 \
    --vcn-id <vcn-ocid>

# Step 3: Create Node Pool
echo "Creating node pool..."
oci ce node-pool create \
    --cluster-id <cluster-ocid> \
    --compartment-id $COMPARTMENT_ID \
    --name learnflow-pool \
    --node-shape $NODE_SHAPE \
    --node-config-details '{"size": 3}'

# Step 4: Get Kubeconfig
echo "Getting cluster credentials..."
oci ce cluster create-kubeconfig \
    --cluster-id <cluster-ocid> \
    --file $HOME/.kube/config \
    --region $REGION

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

# Step 10: Deploy Ingress Controller
echo "Deploying NGINX Ingress..."
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace learnflow

# Step 11: Get External IP
echo "Waiting for external IP..."
kubectl get svc -n learnflow -w

echo "=== Deployment Complete ==="
echo "Run 'kubectl get pods -n learnflow' to check status"
