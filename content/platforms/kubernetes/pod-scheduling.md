---
Title: Controlling Node Selection
description:
weight: 80
alwaysopen: false
description: Redis Enterprise cluster pods can be scheduled to only be placed
 on specific nodes or node pools.
categories: ["Platforms"]
aliases:
---

In many K8s cluster deployments there are different kinds of nodes, with
differing CPU and memory resources, that are used to service the various
workloads within the cluster. The Redis Enterprise operator and CRD has
the ability to describe the selection of nodes for Redis Enterprise cluster
node pod scheduling.

A Redis Enterprise cluster has a StatefulSet which manages the
Redis Enterprise cluster node pods. When the cluster is created, the cluster
is resized, or a pod fails, the scheduler will attempt to choose a node
to deploy a new Redis Enterprise cluster node pod. You can control this
scheduling in various ways.

## Using node selectors

The [`nodeSelector`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#redisenterpriseclusterspec)
property of the cluster specification uses the same valus and structures as
[K8s' `nodeSelector`](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector). In general,
node labels are a simply way to ensure certain nodes will be used for Redis Entperise pods.
For example, if nodes 'n1' and 'n2' are labeled as "high memory":

```sh
kubectl label nodes n1 memory=high
kubectl label nodes n2 memory=high
```

The Redis Enterprise cluster CRD can request to be scheduled on these nodes:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  size: 3
  nodeSelector:
     memory: high
```

Subsequently, when the operator creates the StatefulSet associated with the pod, the nodeSelector
section is part of the pod specification. Thus, when the scheduler attempts to
create new pods, it will need to satisfy the node selection constraints.


## Using node pools

A node pool is a typically part of the underlying infrastructure of the K8s cluster
deployment and provider. Often, node pools are similarly-configured classes of
nodes (e.g., nodes with the same allocated amount of memory and CPU). Implementors
will often label these nodes with a consistent set of labels.

On GKE, all node pools have the label `cloud.google.com/gke-nodepool` with a
value of the name used during configuration. On Azure AKS, node pools can be
created with a specific set of labels.

As in the previous section, the `nodeSelector` section can be used to request a specific node
pool by label values. For example, on GKE:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  size: 3
  nodeSelector:
     cloud.google.com/gke-nodepool: 'high-memory'
```

## Using pod anti-affinity

By default, the Redis Enterprise node pods are schedule to avoid being placed
on the same node for the same cluster:

```yaml
podAntiAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
  - labelSelector:
      matchLabels:
        app: redis-enterprise
        redis.io/cluster: rec
        redis.io/role: node
    topologyKey: kubernetes.io/hostname
```

Each pod has the three labels above where `redis.io/cluster` is the name of your
cluster.

You can override this rule to restrict or widen the nodes on which Redis Enterprise
cluster node pods will run. For example, you could restrict your cluster so that
no Redis Enterprise node pod is scheduled on the same K8s node regardless of the
cluster it belongs to by just deleting the `redis.io/cluster` label:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  size: 3
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchLabels:
          app: redis-enterprise
          redis.io/role: node
      topologyKey: kubernetes.io/hostname
```

or you could avoid placing Redis Enterprise nodes with other databases:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
spec:
  size: 3
  extraLabels:
     local/role: database
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchLabels:
          local/role: database
          app: redis-enterprise
          redis.io/cluster: rec
          redis.io/role: node
      topologyKey: kubernetes.io/hostname
```

If other database's pods are deployed with the label `local/role: database`,
the Redis Enterprise pods will also not be co-located on the same node.


## Using rack awareness

Redis Enterprise can be configured to be rack aware so that the availability
is increased in the event of partitions or other rack (or region) related
failures.

Rack awareness is a single property in the Redis Enterprise cluster CRD named
`rackAwarenessNodeLabel` whose value is the rack label applied to the node. This
label is often `failure-domain.beta.kubernetes.io/zone` as documented in
['Running in multiple zones'](https://kubernetes.io/docs/setup/best-practices/multiple-zones/#nodes-are-labeled).

You can check your nodes are labeled via:

```sh
kubectl get nodes -o custom-columns="name:metadata.name","rack\\zone:metadata.labels.failure-domain\.beta\.kubernetes\.io/zone"
```

The output might be something like:

```sh
name                                            rack\zone
ip-10-0-x-a.eu-central-1.compute.internal    eu-central-1a
ip-10-0-x-b.eu-central-1.compute.internal    eu-central-1a
ip-10-0-x-c.eu-central-1.compute.internal    eu-central-1b
ip-10-0-x-d.eu-central-1.compute.internal    eu-central-1b
```

All you need to do is tell the operator which label represents the rack zone:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: example-redisenterprisecluster
spec:
  size: 3
  rackAwarenessNodeLabel: failure-domain.beta.kubernetes.io/zone
```

The operator will change the `topologyKey` for the pod anti-affinity rule to
the label value used. Combining `rackAwarenessNodeLabel` and `podAntiAffinity`
requires care to ensure you make the same change.
