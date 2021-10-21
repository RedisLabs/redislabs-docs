---
Title: Redis Enterprise Software on Kubernetes
linkTitle: Redis Enterprise on Kubernetes
description: The Redis Enterprise operators allows you to use Redis Enterprise Software on Kubernetes. 
weight: 50
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /platforms/kubernetes/,
    /platforms/kubernetes/_index.md,
    /platforms/kubernetes/concepts/,
    /platforms/kubernetes/concepts/_index.md,
    /platforms/kubernetes/tasks/,
    //platforms/kubernetes/tasks/_index.md,
    /platforms/,
    /kubernetes/,
    /k8s/,
    /rs/getting-started/getting-started-kubernetes/,
    /rs/administering/kubernetes/,
    /kubernetes/_index.md,
    /platforms/kubernetes/reference/supported_k8s_distributions/,
    /platforms/kubernetes/reference/supported_k8s_distributions.md,
    /kubernetes/reference/supported_k8s_distributions.md,
    /kubernetes/reference/supported_k8s_distributions/,

]
---

Kubernetes provides enterprise orchestration of containers and has been widely adopted. The Redis Enterprise operator for Kubernetes provides a simple way to get a Redis Enterprise cluster on Kubernetes and enables more complex deployment scenarios.

## Supported Kubernetes distributions

Each release of the Redis Enterprise operator is thoroughly tested against a set of Kubernetes distributions. The table below lists the current release's support status for each distribution.

- "supported" indicates this distribution is supported for this release.
- "deprecated" indicates this distribution is supported for this release, but will be dropped in a future release.
- "no longer supported" indicates support has been dropped for this distribution.
- Any distribution not listed below is not supported for production workloads.

| Distribution                    | Support Status |
|---------------------------------|:--------------:|
| Openshift 3.11 (K8s 1.11)       | deprecated     |
| OpenShift 4.5  (K8s 1.18)       | supported      |
| OpenShift 4.6  (K8s 1.19)       | supported      |
| OpenShift 4.7  (K8s 1.20)       | supported      |
| OpenShift 4.8  (K8s 1.21)       | supported      |
| KOPS vanilla 1.16               | deprecated     |
| KOPS vanilla 1.17               | deprecated     |
| KOPS vanilla 1.18               | supported      |
| KOPS vanilla 1.19               | supported      |
| KOPS vanilla 1.20               | supported      |
| KOPS vanilla 1.21               | supported      |
| GKE 1.18                        | supported      |
| GKE 1.19                        | supported      |
| GKE 1.20                        | supported      |
| GKE 1.21                        | supported      |
| Rancher 2.4 (K8s 1.17)          | supported      |
| Rancher 2.4 (K8s 1.18)          | supported      |
| Rancher 2.5 (K8s 1.17)          | supported      |
| Rancher 2.5 (K8s 1.18)          | supported      |
| Rancher 2.5 (K8s 1.19)          | supported      |
| Rancher 2.5 (K8s 1.20)          | supported      |
| VMWare TKGIE* 1.7 (K8s 1.16)    | deprecated     |
| VMWare TKGIE* 1.8 (K8s 1.17)    | deprecated     |
| VMWare TKGIE** 1.10 (K8s 1.19)  | supported      |
| AKS 1.18                        | supported      |
| AKS 1.19                        | supported      |
| EKS 1.18                        | supported      |
| EKS 1.21                        | supported      |
 
\* No longer supported by VMware  
\*\* Tanzu Kubernetes Grid Integrated Edition