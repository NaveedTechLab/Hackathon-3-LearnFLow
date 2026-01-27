# Phase 9: Cloud Deployment

## Overview
Deploy LearnFlow to production cloud environments. Supports Azure AKS, Google GKE, and Oracle OKE.

## Supported Platforms

| Platform | Service | Status |
|----------|---------|--------|
| Azure | AKS (Azure Kubernetes Service) | Ready |
| Google Cloud | GKE (Google Kubernetes Engine) | Ready |
| Oracle Cloud | OKE (Oracle Container Engine) | Ready |

## Prerequisites

### Common Requirements
- kubectl configured
- Helm 3.x installed
- Docker for building images
- Cloud CLI tools installed

### Platform-Specific
- **Azure**: `az` CLI, Azure subscription
- **GCP**: `gcloud` CLI, GCP project
- **Oracle**: `oci` CLI, Oracle Cloud tenancy

## Quick Start

### Azure AKS
```bash
cd azure
./deploy.sh
```

### Google GKE
```bash
cd gcp
./deploy.sh
```

### Oracle OKE
```bash
cd oracle
./deploy.sh
```

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 Cloud Provider                   │
│  ┌─────────────────────────────────────────────┐│
│  │            Kubernetes Cluster                ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐       ││
│  │  │Frontend │ │ Backend │ │  Kafka  │       ││
│  │  │  Pods   │ │  Pods   │ │  Pods   │       ││
│  │  └────┬────┘ └────┬────┘ └────┬────┘       ││
│  │       │           │           │             ││
│  │  ┌────┴───────────┴───────────┴────┐       ││
│  │  │         Ingress Controller       │       ││
│  │  └──────────────┬──────────────────┘       ││
│  └─────────────────┼───────────────────────────┘│
│                    │                             │
│  ┌─────────────────┴──────────────────┐         │
│  │          Load Balancer             │         │
│  └────────────────────────────────────┘         │
└─────────────────────────────────────────────────┘
```

## Cost Estimates

| Platform | Config | Monthly Cost |
|----------|--------|--------------|
| Azure AKS | 3 nodes, Standard_D2s_v3 | ~$200 |
| GCP GKE | 3 nodes, e2-medium | ~$150 |
| Oracle OKE | 3 nodes, VM.Standard2.1 | ~$100 |

## Files Structure

```
phase-9-cloud-deployment/
├── README.md
├── azure/
│   ├── deploy.sh
│   ├── aks-cluster.yaml
│   └── values-azure.yaml
├── gcp/
│   ├── deploy.sh
│   ├── gke-cluster.yaml
│   └── values-gcp.yaml
└── oracle/
    ├── deploy.sh
    ├── oke-cluster.yaml
    └── values-oracle.yaml
```

## Environment Variables

```bash
# Common
export LEARNFLOW_NAMESPACE=learnflow
export LEARNFLOW_DOMAIN=learnflow.example.com

# Azure
export AZURE_RESOURCE_GROUP=learnflow-rg
export AZURE_CLUSTER_NAME=learnflow-aks

# GCP
export GCP_PROJECT_ID=your-project-id
export GCP_CLUSTER_NAME=learnflow-gke

# Oracle
export OCI_COMPARTMENT_ID=your-compartment-id
export OCI_CLUSTER_NAME=learnflow-oke
```

## Post-Deployment

1. Configure DNS to point to Load Balancer IP
2. Set up SSL certificates (cert-manager)
3. Configure monitoring (Prometheus/Grafana)
4. Set up CI/CD with ArgoCD
