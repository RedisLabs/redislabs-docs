---
Title: Supported Kubernetes distributions
linkTitle: Supported distributions
description: Support matrix for the current Redis Enterprise K8s operator
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /platforms/kubernetes/reference/supported_k8s_distributions,
    /platforms/kubernetes/reference/supported_k8s_distributions.md,
    /kubernetes/reference/supported_k8s_distributions.md,
    /kubernetes/reference/supported_k8s_distributions,
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

Each release of Redis Enterprise for Kubernetes is thoroughly tested against a set of Kubernetes distributions. The table below lists Redis Enterprise for Kubernetes versions and the Kubernetes distributions they support.

<span title="Check mark icon">&#x2705;</span> Supported – This distribution is supported for this version of Redis Enterprise Software for Kubernetes.

<span title="Warning icon">&#x26A0;&#xFE0F;</span> Deprecated – This distribution is still supported for this version of Redis Enterprise Software for Kubernetes, but support will be removed in a future release.

<span title="X icon">&#x274c;</span> End of life – Support for this distribution ended.

Any distribution not listed below is not supported for production workloads.

## Community Kubernetes

For details on this platform, see the Kubernetes [documentation](https://kubernetes.io/docs/home/supported-doc-versions/).

{{<table-scrollable>}}
| **Redis operator** | **<nobr>7.2.4-2</nobr>** | **<nobr>6.4.2-8</nobr>** | **<nobr>6.4.2-6</nobr>** | **<nobr>6.4.2-5</nobr>** | **<nobr>6.4.2-4</nobr>** | **<nobr>6.2.18-41</nobr>** | **<nobr>6.2.18-3</nobr>** | **<nobr>6.2.12-1</nobr>** | **<nobr><nobr>6.2.10-4</nobr>5</nobr>** | **<nobr>6.2.10-34</nobr>** | **<nobr>6.2.10-4</nobr>** | **<nobr>6.2.8-15</nobr>** | **<nobr>6.2.8-11</nobr>** | **<nobr>6.2.8-2</nobr>** | **<nobr>6.2.4-1</nobr>** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **** | Aug 2023 | July 2023 | June 2023 | April 2023 | March 2023 | Jan 2022 | Nov 2022 | Sept 2022 | July 2022 | May 2022 | March 2022 | Jan 2022 | Jan 2022 | Nov 2021 | Sept 2021 |
| **Community K8s** |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| **1.27** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |  |  |
| **1.26** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |
| **1.25** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |
| **1.24** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |
| **1.23** | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |
| **1.22** |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.21** |  |  |   |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.20** |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.19** |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.18** |  |  |  |  |  |  |  |  |  |  | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.17** |  |  |  |  |  |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> |
| **1.16** |  |  |  |  |  |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> |

{{</table-scrollable>}}

## OpenShift Container Platform

For details on this platform, see the [OpenShift documentation](https://docs.openshift.com/container-platform/4.13/welcome/index.html).


{{<table-scrollable>}}
|  | <nobr>**7.2.4-2**</nobr> | <nobr>**6.4.2-6**</nobr> | <nobr>**6.4.2-5**</nobr> | <nobr>**6.2.18-41**</nobr> | <nobr>**6.2.18-3**</nobr> | <nobr>**6.2.12-1**</nobr> | <nobr>**6.2.10-45**</nobr> | <nobr>**6.2.10-34**</nobr> | <nobr>**6.2.10-4**</nobr> | <nobr>**6.2.8-15**</nobr> | <nobr>**6.2.8-2**</nobr> | <nobr>**6.2.4-1**</nobr> |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **4.13** | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |  |
| **4.12** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |
| **4.11** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |
| **4.10** | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |
| **4.9** |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **4.8** |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **4.7** |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **4.6** |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **4.5** |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **3.11** |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> |

{{</table-scrollable>}}

## Amazon Elastic Kubernetes Service (EKS)

For details on this platform, see the [EKS documentation](https://docs.aws.amazon.com/eks/?icmpid=docs_homepage_containers).

{{<table-scrollable>}}
|  | <nobr>**7.2.4-2**</nobr> | <nobr>**6.4.2-6**</nobr> | <nobr>**6.4.2-5**</nobr> | <nobr>**6.2.18-41**</nobr> | <nobr>**6.2.18-3**</nobr> | <nobr>**6.2.12-1**</nobr> | <nobr>**6.2.10-45**</nobr> | <nobr>**6.2.10-34**</nobr> | <nobr>**6.2.10-4**</nobr> | <nobr>**6.2.8-15**</nobr> | <nobr>**6.2.8-2**</nobr> | <nobr>**6.2.4-1**</nobr> |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1.27** | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |  |
| **1.26** | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |  |
| **1.25** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |
| **1.24** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |
| **1.23** | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |
| **1.22** | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |
| **1.21** |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.20** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.19** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.18** |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |


{{</table-scrollable>}}

## Azure Kubernetes Service (AKS)

For details on this platform, see the [AKS documentation](https://learn.microsoft.com/en-us/azure/aks/).

{{<table-scrollable>}}
|  | <nobr>**7.2.4-2**</nobr> | <nobr>**6.4.2-6**</nobr> | <nobr>**6.4.2-5**</nobr> | <nobr>**6.2.18-41**</nobr> | <nobr>**6.2.18-3**</nobr> | <nobr>**6.2.12-1**</nobr> | <nobr>**6.2.10-45**</nobr> | <nobr>**6.2.10-34**</nobr> | <nobr>**6.2.10-4**</nobr> | <nobr>**6.2.8-15**</nobr> | <nobr>**6.2.8-2**</nobr> | <nobr>**6.2.4-1**</nobr> |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1.27** | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |  |
| **1.26** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |
| **1.25** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |
| **1.24** | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |
| **1.23** | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |
| **1.22** |  |  | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.21** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |
| **1.20** |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.19** |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.18** |  |  |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> |
{{</table-scrollable>}}

## Google Kubernetes Engine (GKE)

For details on this platform, see the [GKE documentation](https://cloud.google.com/kubernetes-engine/docs).

{{<table-scrollable>}}
|  | <nobr>**7.2.4-2**</nobr> | <nobr>**6.4.2-6**</nobr> | <nobr>**6.4.2-5**</nobr> | <nobr>**6.2.18-41**</nobr> | <nobr>**6.2.18-3**</nobr> | <nobr>**6.2.12-1**</nobr> | <nobr>**6.2.10-45**</nobr> | <nobr>**6.2.10-34**</nobr> | <nobr>**6.2.10-4**</nobr> | <nobr>**6.2.8-15**</nobr> | <nobr>**6.2.8-2**</nobr> | <nobr>**6.2.4-1**</nobr> |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1.27** | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |  |
| **1.26** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |
| **1.25** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |
| **1.24** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |
| **1.23** | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |
| **1.22** | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.21** |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.20** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.19** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.18** |  |  |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Supported">&#x2705;</span> |

{{</table-scrollable>}}

## Rancher

For details on this platform, see the [Rancher documentation](https://ranchermanager.docs.rancher.com/).

{{<table-scrollable>}}
|  | <nobr>**7.2.4-2**</nobr> | <nobr>**6.4.2-6**</nobr> | <nobr>**6.4.2-5**</nobr> | <nobr>**6.2.18-41**</nobr> | <nobr>**6.2.18-3**</nobr> | <nobr>**6.2.12-1**</nobr> | <nobr>**6.2.10-45**</nobr> | <nobr>**6.2.10-34**</nobr> | <nobr>**6.2.10-4**</nobr> | <nobr>**6.2.8-15**</nobr> | <nobr>**6.2.8-2**</nobr> | <nobr>**6.2.4-1**</nobr> |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1.25** (2.7) | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |  |  |
| **1.24** (2.7) | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |
| **1.23** (2.7) | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |  |  |
| **1.24** (2.6) | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |
| **1.23** (2.6) | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |
| **1.22** | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |
| **1.21** |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |
| **1.20** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.19** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |
| **1.18** |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.17** |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.18** |  |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> |
| **1.17** |  |  |  |  |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> |

{{</table-scrollable>}}

## VMware Tanzu Kubernetes Grid (TKG)

For details on this platform, see the [TKG documentation](https://docs.vmware.com/en/VMware-Tanzu-Kubernetes-Grid/index.html).

#### TKG 1.6

{{<table-scrollable>}}
|  | <nobr>**7.2.4**</nobr> | <nobr>**6.4.2-6**</nobr> | <nobr>**6.4.2-5**</nobr> | <nobr>**6.2.18-41**</nobr> |
|---|---|---|---|---|
| **1.24** | <span title="Deprecated">&#x26A0;&#xFE0F;</span> |  |  |  |
| **1.23** | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **1.22** | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
{{</table-scrollable>}}

## VMware Tanzu Kubernetes Grid Integrated Edition (TKGI)

For details on this platform, see the [TKGI documentation](https://docs.vmware.com/en/VMware-Tanzu-Kubernetes-Grid-Integrated-Edition/index.html).

{{<table-scrollable>}}
| | **<nobr>**7.2.4-2**</nobr>** | **<nobr>**6.4.2-6**</nobr>** | **<nobr>**6.4.2-5**</nobr>** | **<nobr>**6.2.18-41**</nobr>** | **<nobr>**6.2.18-3**</nobr>** | **<nobr>**6.2.12-1**</nobr>** | **<nobr>**6.2.10-45**</nobr>** | **<nobr>**6.2.10-34**</nobr>** | **<nobr>**6.2.10-4**</nobr>** | **<nobr>**6.2.8-15**</nobr>** | **<nobr>**6.2.8-2**</nobr>** | **<nobr>**6.2.4-1**</nobr>** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **1.15** | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |  |
| **1.14** | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |  |
| **1.13** | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |  |
| **1.12** |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |  |
| **1.11** |  |  |  |  |  | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |  |  |  |
| **1.10** |  |  |  |  |  | <span title="X icon">&#x274c;</span> | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
{{</table-scrollable>}}


## Supported upgrade paths

   If you are using a version earlier than 6.2.10-45, you must upgrade to 6.2.10-45 before you can upgrade to versions 6.2.18 or later.
