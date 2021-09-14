---
Title: Redis Enterprise Kubernetes Operator-based Architecture
linkTitle: What is an operator?
description: This section provides a description of the design of the Redis Enterprise Operator for Kubernetes.
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: /rs/concepts/kubernetes/k8s-operator-based-deployments
         /platforms/kubernetes/kubernetes-with-operator/
---
The Redis Enterprise Operator is the fastest, most efficient way to
deploy and maintain a Redis Enterprise Cluster in Kubernetes.

## What is an Operator?

An Operator is a [Kubernetes custom controller](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#custom-controllers) which extends the native K8s API.

Operators were developed to handle sophisticated, stateful applications
that the default K8s controllers aren’t able to handle. While stock
Kubernetes controllers—for example,
[StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)—are
ideal for deploying, maintaining and scaling simple stateless
applications, they are not equipped to handle access to stateful
resources, upgrade, resize and backup of more elaborate, clustered
applications such as databases.

## What does an Operator do?

In abstract terms, Operators encode human operational knowledge into
software that can reliably manage an application in an extensible,
modular way and do not hinder the basic primitives that comprise the K8s
architecture.

Redis created an Operator that deploys and manages the lifecycle of a Redis Enterprise Cluster.

The Redis Enterprise Operator acts as a custom controller for the custom
resource RedisEnterpriseCluster, or ‘rec’, which is defined through K8s
CRD ([customer resource definition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#custom-resources))
and deployed with a yaml file.

The Operator functions include:

- Validating the deployed Cluster spec (for example, requiring the
deployment of an odd number of nodes)
- Implementing a reconciliation loop to monitor all the applicable
resources
- Logging events
- Enabling a simple mechanism for editing the Cluster spec

The Redis Enterprise Operator functions as the logic “glue” between the
K8s infrastructure and the Redis Enterprise Cluster.

The Operator creates the following resources:

- Service account
- Service account role
- Service account role binding
- Secret – holds the cluster username, password, and license
- Statefulset – holds Redis Enterprise nodes
- The Services Manager deployment – exposes databases and tags nodes
- The Redis UI service
- The service that runs the REST API + Sentinel
- Pod Disruption Budget
- Optionally: a deployment for the Service Broker, including services and a PVC

The following diagram shows the high-level architecture of the Redis
Enterprise Operator:

![k8-high-level-architecture-diagram-of-redis-enterprise](/images/rs/k8-high-level-architecture-diagram-of-redis-enterprise.png)
