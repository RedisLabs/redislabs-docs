---
Title: Managing pod stability
description: You can use quality of service, priority class, eviction thresholds and resource monitoring
    to maintain cluster node pod stability.
weight: 90
alwaysopen: false
categories: ["Platforms"]
aliases:
---
Kubernetes clusters manage the allocation of system resources and can evict pods to release system resources.
Here are some ways that you can configure the Redis Enterprise node pods to maintain pod stability:

## Guaranteed Quality of Service

At pod creations, Kubernetes assigns the pod one of three [quality of service classes](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/):
Guaranteed, Burstable, and Best Effort.
You can assign the Guaranteed class to the Redis Enterprise node pods.

To assign a quality of service class:

 * Every container in the pod must have a memory limit and a memory request, and they must be the same.
 * Every container in the pod must have a CPU limit and a CPU request, and they must be the same.

These requirements are met in the default version of your Redis Enterprise cluster CRD,
if you did not change the `redisEnterpriseNodeResources`.
Otherwise, you must set the limits and requests to the same value for memory and CPU.

Sidecar containers also impact the quality of service class assignment for the pod.

To can check the quality of service class for your Redis Enterprise node pod when it is running, run:

```sh
kubectl get pod rec-0 --o yaml | grep qosClass
```

## Using Priority to Protect from Preemption

When a Redis Enterprise node pod is scheduled, it can be assigned a
[priority class](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/)
with the `priorityClassName` property.
If you assign a high priority value, the deployment of other applications cannot preempt a Redis Enterprise node pod.

You must assign a priority class for the cluster with a high value:

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: redis-enterprise-priority
value: 1000000000
globalDefault: false
description: "This priority class should be used for Redis Enterprise pods only."
```

When the Redis Enterprise cluster is created, you can refer to the priority class by name:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: example-redisenterprisecluster
spec:
  size: 3
  priorityClassName: "redis-enterprise-priority"
```

You can also [disable preemption entirely](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#how-to-disable-preemption).

## Managing eviction thresholds

Eviction thresholds are typically managed by kubelet arguments and your ability
to set them may depend on your K8s platform. On OpenShift, these are in the
[config file](https://docs.openshift.com/container-platform/3.11/admin_guide/out_of_resource_handling.html#out-of-resource-create-config).
On GKE, these are [managed settings](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture#node_allocatable).

We recommend:

 * Set high a [soft eviction threshold](https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/#soft-eviction-thresholds)
   relative to the [hard eviction threshold](https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/#hard-eviction-thresholds).
   The high soft threshold mean the node condition will change earlier, alerting the administrator.
 * Set `eviction-max-pod-grace-period high` enough to allow RS pods to migrate redis databases itself, before being force killed.
 * The `eviction-soft-grace-period` should be set high enough for the administrator (or a k8s auto-scaling mechanism) to scale k8s up or out.

## Monitoring for memory & disk usage

We recommend monitoring node for MemoryPressure and DiskPressure. When both of
these conditions are true, then an [eviction threshold](https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/#eviction-thresholds)
has been met and pod eviction is immanent.

The following can be used to retrieve the flags:

```sh
kubectl get nodes -o jsonpath='{range .items[*]}name:{.metadata.name}{"\t"}MemoryPressure:{.status.conditions[?(@.type == "MemoryPressure")].status}{"\t"}DiskPressure:{.status.conditions[?(@.type == "DiskPressure")].status}{"\n"}{end}'
```

The output might be something like:

```sh
name:gke-55d1ac88-213c	MemoryPressure:False	DiskPressure:False
name:gke-55d1ac88-vrpp	MemoryPressure:False	DiskPressure:False
name:gke-7253cc19-42g0	MemoryPressure:False	DiskPressure:False
```
