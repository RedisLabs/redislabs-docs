---
Title: Supported distributions
linkTitle: Supported distributions
description: Support matrix for the current Redis Enterprise K8s operator
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /platforms/kubernetes/reference/supported_k8s_distributions/,
    /platforms/kubernetes/reference/supported_k8s_distributions.md,
    /kubernetes/reference/supported_k8s_distributions.md,
    /kubernetes/reference/supported_k8s_distributions/,
    /rs/getting-started/pcf/,
    /platforms/pcf/using-pcf/,
    /platforms/pcf/using-pcf.md,
    /kubernetes/deployment/tanzu/pcf/using-pcf.md,
    /kubernetes/deployment/tanzu/pcf/using-pcf/,
    /rs/getting-started/pcf/,
    /platforms/pcf/backup-restore-pcf/,
    /platforms/pcf/backup-restore-pcf.md,
    /kubernetes/deployment/tanzu/pcf/backup-restore-pcf.md,
    /kubernetes/deployment/tanzu/pcf/backup-restore-pcf/,
    /platforms/pcf/installing-pcf/,
    /platforms/pcf/,
    /platforms/pcf/_index.md,
    /kubernetes/deployment/tanzu/pcf/_index.md,
    /kubernetes/deployment/tanzu/pcf/_index/,

]
---

Each release of the Redis Enterprise operator is thoroughly tested against a set of Kubernetes distributions. The table below lists the current release's support status for each distribution.

- "supported" indicates this distribution is supported for this release.
- "deprecated" indicates this distribution is supported for this release, but will be dropped in a future release.
- Any distribution not listed below is not supported for production workloads.

| **Kubernetes version**  | 1.19       | 1.20       | 1.21       | 1.22       | 1.23       | 1.24       |
|:------------------------|:----------:|:----------:|:----------:|:----------:|:----------:|:----------:|
| Community Kubernetes    |            | deprecated | deprecated | supported  | supported  | supported* |
| Amazon EKS              | deprecated | deprecated | supported  | supported* |            |
| Azure AKS               |            |            | deprecated | supported  | supported  |
| Google GKE              | deprecated | deprecated | supported  | supported  |supported*  |
| Rancher 2.6             | deprecated | deprecated | supported  | supported  |            |
| **OpenShift version**   | **4.6**    | **4.7**    | **4.8**    | **4.9**    | **4.10**   |
|                         |            | deprecated | deprecated | supported  | supported  |
| **VMware TKGI version** | **1.10**   | **1.11**   | **1.12**   | **1.13**   |            |
|                         | deprecated | deprecated | supported* | supported* |            |

\* Support added in most recent release  
