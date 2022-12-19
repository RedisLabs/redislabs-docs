---
Title: Flexible deployment options
linktitle: Deployment options
description: Redis Enterprise for Kubernetes allows you to deploy to multiple namespaces. This article describes flexible deployment options you can use to meet your specific needs. 
weight: 10
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/deployment/deployment-options.md,
    /kubernetes/deployment/deployment-options/,
]

---
Redis Enterprise for Kubernetes can be deployed in several different ways depending on your database needs.

A single Redis Enterprise cluster (REC) can manage multiple Redis Enterprise database objects (REDB) in multiple namespaces within the same Kubernetes cluster.

## Single REC and single namespace (one-to-one)

The standard and simplest way is with your Redis Enterprise cluster (REC) and Redis Enterprise databases (REDB) residing within the same namespace. No additional configuration is required for this, since there is no communication required to cross namespaces. See [Deploy Redis Enterprise Software on Kubernetes]{{<relref "/kubernetes/deployment/quick-start.md">}}.

![One-to-one deployment option](/images/platforms/k8s-deploy-one-to-one.png)

## Single REC and multiple namespaces (one-to-many)

A single Redis Enterprise cluster (REC) can manage multiple Redis Enterprise database objects (REDB) in multiple namespaces within the same Kubernetes cluster. See [Manage databases in multiple namespaces]({{<relref "/kubernetes/re-clusters/multi-namespace.md">}}) for more information.

![one-to-many deployment option](/images/platforms/k8s-deploy-one-to-many.png)

## Multiple RECs and multiple namespaces (many-to-many)

A single Kubernetes cluster can contain multiple Redis Enterprise clusters (REC), as long as they reside in different namespaces. Each namespace can host only one REC.

You have the flexibility to create databases in separate namespaces, or in the same namespace as the REC, or combine any of the supported deployment options above. This configuration is ideal for running a variety of applications in the same Kubernetes cluster.

See [Manage databases in multiple namespaces]({{<relref "/kubernetes/re-clusters/multi-namespace.md">}}) for more information.


![many-to-many deployment option](/images/platforms/k8s-deploy-many-to-many.png)

## Unsupported deployment patterns

### Cross-cluster operations

Redis Enterprise for Kubernetes does not support operations that cross Kubernetes clusters. Redis Enterprise clusters (REC) work inside a single K8s cluster. Crossing clusters could result in functional and security issues.

![cross cluster deployment](/images/platforms/k8s-deploy-cross-namespaces.png)

### Multiple RECs in one namespace

Redis Enterprise for Kubernetes does not support multiple Redis Enterprise clusters (REC) in the same namespace. Creating more than one REC in the same namespace will result in errors.

![multi-cluster single namespace deployment](/images/platforms/k8s-deploy-multicluster-antipattern.png)

