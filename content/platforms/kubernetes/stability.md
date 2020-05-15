---
Title: Managing pod stability
description: Pods can be evicted from a node for various reasons - including
 being preempted by other scheduling requests. There are various ways for
 controlling this behaviour.
weight: 90
alwaysopen: false
categories: ["Platforms"]
aliases:
---

Redis Enterprise cluster node pods can be evicted from a node for variety
of ways that can be controlled by configuring the cluster or the node pods
correctly for the desired outcome.

## Guaranteeing quality of service

When Kubernetes creates a pod it assigns it one of three [quality of service
classes](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/):
Guaranteed, Burstable, and Best Effort. For Redis Enterprise node
pods we want all the pods to be assigned the Guaranteed class.

To do so, each operator managed pods must have:

 * Every Container must have a memory limit and a memory request, and they must be the same.
 * Every Container must have a CPU limit and a CPU request, and they must be the same.

If you have not specified `redisEnterpriseNodeResources` in your Redis
Enterprise cluster CRD, these limits and request will be the same. Otherwise,
you must set the limits and requests to the same amount for memory and CPU.

You can check your Redis Enterprise node pod's quality of service class by
examining the 'qosClass' once it is running:

```sh
kubectl get pod rec-0 --o yaml | grep qosClass
```

Also, keep in mind that sidecar containers also affect the quality of service class
assignment for the pod.

## Using priority to protect from preemption

When a Redis Enterprise node pod is scheduled it can be assigned a [
priority class](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/)
via the `priorityClassName` property.  In this approach, we create a sufficiently
large priority that prevents the deployment of other applications from causing
a Redis Enterprise node pod from being preempted.

The class must be first defined for the cluster with a sufficiently very large value:

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: redis-enterprise-priority
value: 1000000000
globalDefault: false
description: "This priority class should be used for Redis Enterprise pods only."
```

When the Redis Enterprise cluster is created, the priority class can be referred
to by name:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: example-redisenterprisecluster
spec:
  size: 3
  priorityClassName: "redis-enterprise-priority"
```

Another option is to [disable preemption entirely](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#how-to-disable-preemption).

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
