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

Each release of Redis Enterprise for Kubernetes is thoroughly tested against a set of Kubernetes distributions. The table below lists the current release's support status for each distribution.

- "supported" indicates this distribution is supported for this release.
- "deprecated" indicates this distribution is supported for this release, but will be dropped in a future release.
- Any distribution not listed below is not supported for production workloads.

| **Kubernetes version**  | 1.22       | 1.23       | 1.24       | 1.25       | 1.26       | 1.27       |
|:------------------------|:----------:|:----------:|:----------:|:----------:|:----------:|:----------:|
| Community Kubernetes    |            | deprecated | supported  | supported  | supported  | supported* |
| Amazon EKS              | deprecated | deprecated | supported  | supported* |            |            |
| Azure AKS               |            | deprecated | supported  | supported  | supported* |
| Google GKE              | deprecated | deprecated | supported  | supported  | supported* |            |
| Rancher 2.6             | deprecated | deprecated | supported  |            |            |            |
| Rancher 2.7             |            | deprecated | supported  |            |            |            |
| VMware TKG 1.6          |            | deprecated | deprecated |            |            |            |
| **OpenShift version**   | **4.9**    | **4.10**   | **4.11**   | **4.12**   |            |            |
|                         |            | deprecated | supported  | supported  |            |            |
| **VMware TKGI version** | **1.13**   | **1.14**   | **1.15**   |            |            |            |
|                         | deprecated | deprecated | supported  |            |            |            |

\* Support added in latest release

### Supported upgrade paths**

   If you are using a version earlier than 6.2.10-45, you must upgrade to 6.2.10-45 before you can upgrade to versions 6.2.18 or later.
