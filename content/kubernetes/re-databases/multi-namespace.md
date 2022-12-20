---
Title: Manage databases in multiple namespaces
linktitle: Manage multiple namespaces
description: Redis Enterprise for Kubernetes allows you to deploy to multiple namespaces within your Kubernetes cluster. This article shows you how to configure your Redis Enterprise cluster to connect to databases in multiple namespaces
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-databases/multi-namespace.md,
    /kubernetes/re-databases/multi-namespace/,
]

---

A single Redis Enterprise cluster (REC) can manage multiple Redis Enterprise database objects (REDB) in multiple namespaces within the same Kubernetes cluster.

## Create role and role binding for managed namespaces

## Update Redis Enterprise operator configmap

### Method 1: Explicit namespace list

Only configure the operator to watch a namespace once the namespace is created and configured with the role/role_binding as explained above. If configured to watch a namespace without setting those permissions or a namespace that is not created yet, the operator will fail and not perform normal operations.

Note that this configmap can be created manually before deploying the RedisEnterpriseCluster, or the operator will automatically create it once a RedisEnterpriseCluster is deployed.


### Method 2: Namespace label



