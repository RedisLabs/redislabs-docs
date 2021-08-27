---
Title: Supported Kubernetes distributions
description: Support matrix for the current Redis Enterprise K8s operator
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases:
---

Each release of the Redis Enterprise operator is thoroughly tested against a set of Kubernetes distributions. The table below lists the current release's support status for each distribution.

- "supported" indicates this distribution is supported for this release.
- "deprecated" indicates this distribution is supported for this release, but will be dropped in a future release.
- "no longer supported" indicates support has been dropped for this distribution.
- Any distribution not listed below is not supported for production workloads.

| Distribution                    | Support Status |
|---------------------------------|----------------|
| Openshift 3.11 (K8s 1.11)       | supported      |
| OpenShift 4.5  (K8s 1.18)       | supported      |
| OpenShift 4.6  (K8s 1.19)       | supported      |
| OpenShift 4.7  (K8s 1.20)       | supported      |
| KOPS vanilla 1.15               | deprecated     |
| KOPS vanilla 1.16               | supported      |
| KOPS vanilla 1.17               | supported      |
| KOPS vanilla 1.18               | supported      |
| KOPS vanilla 1.19               | supported      |
| KOPS vanilla 1.20               | supported      |
| GKE 1.17*                       | deprecated     |
| GKE 1.18                        | supported      |
| GKE 1.19                        | supported      |
| GKE 1.20                        | supported      |
| Rancher 2.4 (K8s 1.17)          | supported      |
| Rancher 2.4 (K8s 1.18)          | supported      |
| Rancher 2.5 (K8s 1.17)          | supported      |
| Rancher 2.5 (K8s 1.18)          | supported      |
| Rancher 2.5 (K8s 1.19).         | supported      |
| VMWare TKGIE** 1.7 (K8s 1.16)   | deprecated     |
| VMWare TKGIE** 1.8 (K8s 1.17)   | deprecated     |
| VMWare TKGIE*** 1.10 (K8s 1.19) | supported      |
| AKS 1.18                        | supported      |
| EKS 1.18                        | supported      |

\* No longer supported by Google  
\*\* No longer supported by VMware  
\*\*\* Tanzu Kubernetes Grid Integrated Edition  

