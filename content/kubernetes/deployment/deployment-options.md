---
Title: Flexible deployment options
linkTitle: Deployment options
description: Redis Enterprise for Kubernetes allows you to deploy to multiple namespaces. This article describes flexible deployment options you can use to meet your specific needs. 
weight: 12
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/deployment/deployment-options.md,
    /kubernetes/deployment/deployment-options/,
]

---
You can deploy Redis Enterprise for Kubernetes in several different ways depending on your database needs.

A single Redis Enterprise cluster (REC) can manage multiple Redis Enterprise database objects (REDB) in multiple namespaces within the same Kubernetes cluster.

{{<note>}} The Redis Enterprise cluster (REC) custom resource must reside in the same namespace as the Redis Enterprise operator.
{{</note>}}

## Single REC and single namespace (one-to-one)

The standard and simplest deployment deploys your Redis Enterprise databases (REDB) in the same namespace as the Redis Enterprise cluster (REC). No additional configuration is required for this, since there is no communication required to cross namespaces. See [Deploy Redis Enterprise Software on Kubernetes]({{<relref "/kubernetes/deployment/quick-start.md">}}).

![One-to-one deployment option](/images/platforms/k8s-deploy-one-to-one.png)

## Single REC and multiple namespaces (one-to-many)

Multiple Redis Enterprise databases (REDB) spread across multiple namespaces within the same K8s cluster can be associated with the same Redis Enterprise cluster (REC). See [Manage databases in multiple namespaces]({{<relref "/kubernetes/re-clusters/multi-namespace.md">}}) for more information.

![one-to-many deployment option](/images/platforms/k8s-deploy-one-to-many.png)

## Multiple RECs and multiple namespaces (many-to-many)

A single Kubernetes cluster can contain multiple Redis Enterprise clusters (REC), as long as they reside in different namespaces. Each namespace can host only one REC and each operator can only manage one REC.

You have the flexibility to create databases in separate namespaces, or in the same namespace as the REC, or combine any of the supported deployment options above. This configuration is geared towards use cases that require multiple Redis Enterprise clusters with greater isolation or different cluster configurations.

See [Manage databases in multiple namespaces]({{<relref "/kubernetes/re-clusters/multi-namespace.md">}}) for more information.


![many-to-many deployment option](/images/platforms/k8s-deploy-many-to-many.png)

## Unsupported deployment patterns

### Cross-cluster operations

Redis Enterprise for Kubernetes does not support operations that cross Kubernetes clusters. Redis Enterprise clusters (REC) work inside a single K8s cluster. Crossing clusters could result in functional and security issues.

![cross cluster deployment antipattern](/images/platforms/k8s-deploy-cross-namespaces.png)

### Multiple RECs in one namespace

Redis Enterprise for Kubernetes does not support multiple Redis Enterprise clusters (REC) in the same namespace. Creating more than one REC in the same namespace will result in errors.

![multicluster deployment antipattern](/images/platforms/k8s-deploy-multicluster-antipattern.png)