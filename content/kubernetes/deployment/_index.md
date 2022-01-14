---
Title: Deployment
linkTitle: Deployment
description: This section lists the different ways to set up and run Redis Enterprise on Kubernetes. You can deploy on variety of Kubernetes   
  distributions both on-prem and in the cloud via our Redis Enterprise Operator for Kubernetes.
weight: 11
alwaysopen: false
categories: ["Platforms"]
aliases: [
  /platforms/kubernetes/getting-started/,
  /platforms/kubernetes/getting-started/_index.md,
  /platforms/kubernetes/deployment/,
  /platforms/kubernetes/deployment/_index.md,
  /kubernetes/deployment/_index.md,
  /kubernetes/deployment/_index/

]
---

This section lists the different ways to set up and run Redis Enterprise on Kubernetes. You can deploy on variety of Kubernetes distributions both on-prem and in the cloud via our Redis Enterprise operator for Kubernetes.

## Operator overview {#overview}

The Redis Enterprise operator uses [custom resource definitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) (CRDs) to create and manage Redis Enterprise clusters (REC) and Redis Enterprise databases (REDB).

The operator is a deployment that runs within a given namespace. These operator pods must run with sufficient privileges to create the Redis Enterprise cluster resources within that namespace.

When the operator is installed, the following resources are created:

* a service account under which the operator will run
* a set of roles to define the privileges necessary for the operator to perform its tasks
* a set of role bindings to authorize the service account for the correct roles (see above)
* the CRD for a Redis Enterprise cluster (REC)
* the CRD for a Redis Enterprise database (REDB)
* the operator itself (a deployment)

The operator currently runs within a single namespace and is scoped to operate only on the Redis Enterprise cluster in that namespace.

{{< allchildren style="h2" description="true" />}}
