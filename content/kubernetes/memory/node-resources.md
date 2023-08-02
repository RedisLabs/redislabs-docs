---
Title: Manage node resources
linktitle: Manage resources
description: Recommendations on managing node resources and setting eviction thresholds with Redis Enterprise for Kubernetes. 
weight: 17
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/memory/node-resources/,
    /platforms/kubernetes/stability/,
    /platforms/kubernetes/concepts/stability.md,
    /platforms/kubernetes/concepts/stability/,
    /platforms/kubernetes/memory/pod-stability.md,
    /platforms/kubernetes/memory/pod-stability/,
    /kubernetes/memory/pod-stability.md,
    /kubernetes/memory/pod-stability/,
]
---
 


We recommend the following best practices for production environments of Redis Enterprise for Kubernetes. These settings are not unique to the Redis Enterprise operator but affect the performance and reliability of your deployment. More information about these Kubernetes settings is available at [https://kubernetes.io/docs/home/](https://kubernetes.io/docs/home/).

## Quality of service

There are three [Quality of Service classes](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/) you can assign to a pod when it's created: `Guaranteed`, `Burstable`, and `BestEffort`. The Quality of Service class determines which pods are evicted when node resources run out. Best practice for Redis Enterprise is to use the `Guaranteed` class.

Guaranteed Quality of Service requires:

* every container has the same memory limit or memory requests
* every container has the same CPU limit and CPU requests

These settings are required to keep the Guaranteed Quality of Service and are set by default.

If you make changes to the resources for Redis Enterprise, the services rigger, or the bootstrapper, make sure these requirements are still met. This also applies to side containers running alongside Redis Enterprise.

To check the Quality of Service class of any running Redis Enterprise pod, run:

```sh
kubectl get pod rec-0 --o jsonpath="{.status.qosClass}"
```

## Pod priority

Pods managed by the operator should have a high [priority class](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/). This gives Redis Enterprise priority in scheduling if lower priority workloads are deployed on the same cluster.  

Reference the name of your PriorityClass resource in the `priorityClassName` field in your REC `spec`.

You can use an existing PriorityClass resource or create a new one like the example below. 

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: redis-enterprise-priority
value: 1000000000
globalDefault: false
description: "This priority class should be used for Redis Enterprise pods only."
```

## Dedicated resources

Redis Enterprise clusters should run have dedicated resources. If Redis Enterprise is sharing resources with other applications, this can lead to performance issues. Most Kubernetes environments use labels on nodes, but it can vary depending on your provider and environment. Google Kubernetes Engine (GKE) uses node pools to manage this.

The example below uses the `nodeSelector` field in the RedisEnterpriseCluster to run only on nodes with a specific GKE node pool label.

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: example-redisenterprisecluster
  labels:
    app: redis-enterprise
spec:
  nodes: 3
  nodeSelector:
    cloud.google.com/gke-nodepool: pool1
```

## Eviction thresholds

Kubernetes uses [node-pressure eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/) to terminate pods and reclaim node resources. Eviction thresholds are managed by `kubelet` arguments.

Best practice for production Redis Enterprise deployments: 

* Set a high [soft eviction threshold](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#soft-eviction-thresholds), which will change the node condition early and notify the administrator.
* Set the `eviction-soft-grace-period` high enough for the administrator to scale the deployment up or out when needed.
* Set the `eviction-max-pod-grace-period` high enough to allow Redis Enterprise pods to migrate the database before being evicted.

## Monitor resources

There are two [node conditions](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#node-conditions) that are `True` if your [eviction threshold](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/#eviction-thresholds) has been met and a pod eviction is likely:  `MemoryPressure` and `DiskPressure`.

Use the `kubectl get nodes` command to monitor these conditions.

```yaml
> kubectl get nodes -o jsonpath='{range .items[*]}name:{.metadata.name}{"\t"}MemoryPressure:{.status.conditions[?(@.type == "MemoryPressure")].status}{"\t"}DiskPressure:{.status.conditions[?(@.type == "DiskPressure")].status}{"\n"}{end}'
name:gke-55d1ac88-213c	MemoryPressure:False	DiskPressure:False
name:gke-55d1ac88-vrpp	MemoryPressure:False	DiskPressure:False
name:gke-7253cc19-42g0	MemoryPressure:False	DiskPressure:False
```

## Resource limits

The Redis Enterprise operator is set with resource limits and requests by default. You can find the recommended settings in the []`operator.yaml`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/operator.yaml) file.

If you create a [ResourceQuota](https://kubernetes.io/docs/concepts/policy/resource-quotas/) on the namespace containing the RedisEnterpriseCluster, be careful applying the quotas to ConfigMaps, as it can reach the limit with as little as one ConfigMap.

## Pod security

[PodSecurityPolicy](https://kubernetes.io/docs/concepts/security/pod-security-policy/) has been deprecated for Kubernetes versions 1.21 and after and is invalid for versions 1.25 and after. Please migrate to using the [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/).

There are three Pod Security Admission levels: `restricted`, `baseline`, and `privileged`. Redis Enterprise pods require the `privileged` level.
