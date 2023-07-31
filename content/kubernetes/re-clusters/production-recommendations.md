---
Title: Recommendations for production environment configuration
linkTitle: Configuration recommendations
description: 
weight: 
alwaysopen: false
categories: ["Platforms"]
aliases: [
]  
---

There are some best practices we recommend using for production environments of Redis Enterprise for Kubernetes. More information about these Kubernetes settings is available at [https://kubernetes.io/docs/home/](https://kubernetes.io/docs/home/). These settings are not unique to the Redis Enterprise operator but affect the performance and reliability of your deployment.

## Quality of service

There are three [Quality of Service classes](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/) you can assign to a pod when it's created: `Guaranteed`, `Burstable`, and `BestEffort`. The Quality of Service class determines which pods are evicted when node resources run out. Best practice for Redis Enterprise is to use the `Guaranteed` class.

In a pod managed by the Redis Enterprise operator, every container needs the same memory limit or memory request. The same applies to the CPU limit and CPU requests. These settings are required to keep the Guaranteed Quality of Service and are set by default. If you make changes to the resources for Redis Enterprise, the services riggeer, or the bootstrapper, make sure these requirements are still met. This also applies to side containers running alongside Redis Enterprise.

## Pod priority

Pods managed by the operator should have a high [priority class](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/). You can use an existing PriorityClass resource or create a new one like the example below.

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

## Monitor resources

node conditions to watch: MemoryPressure and DiskPressure

## Eviction thresholds

high soft evcition threshold
high eviction-max-pod-grace-period
high eviction-soft-grace-period

## Resource limits

resource section in spec, operator has resource limits and requests, 
example shows operator defaults


## Pod security
