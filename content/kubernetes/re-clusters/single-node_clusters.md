---
Title: Create a single-node Redis Enterprise cluster
linkTitle: Create a single-node cluster
description: This task creates a single-node Redis Enterprise cluster for lightweight applications and explains the limitations of this cluster and the databases on it. 
weight: 
alwaysopen: false
categories: ["Platforms"]
aliases: []
---

Single-node clusters have small minimum node resources and small database capacity. The most common use case for single-node clusters is for a volatile cache. 

## Create Redis Enterprise cluster custom resource

Create a RedisEnterpriseCluster custom resource for your single-node cluster based off the example below.

The most important setting above is `nodes: 1` that limits your cluster to one node. Disabling `redisEnterpriseServicesConfiguration` settings helps reduce memory consumption.

```yaml
apiVersion: app.redislabs.com/v1alpha1
kind: RedisEnterpriseCluster
metadata:
  name: "<cluster-name>"
spec:
  nodes: 1
  redisEnterpriseNodeResources:
    limits:
      cpu: "2"
      memory: 2Gi
    requests:
      cpu: "2"
      memory: 2Gi
  redisEnterpriseServicesConfiguration:
    mdnsServer:
      operatingMode: "disabled"
    cmServer:
      operatingMode: "disabled"
    pdnsServer:
      operatingMode: "disabled"
    crdbCoordinator:
      operatingMode: "disabled"
    crdbWorker:
      operatingMode: "disabled"
```

## Limitations

### REC upgrade unavailable

Single-node Redis Enterprise clusters (REC) cannot be upgraded. They must be deleted and recreated.

### Failure recovery

In case of a failure event (hardware or network failure), the Redis Enterprise cluster (REC) is recreated from scratch. Any configuration that is not in the REC custom resource file will be reset.

Databases are not recovered. Instead, databases are recreated with the REDB custom resource files. Databases that were created with the admin console or REST API will not be recreated after a failure event.

### Minimum node resources

Single-node cluster require at least 2 CPUs and 2GB of memory.

### Maximum database capacity

A single Redis Enterprise database (REDB) running on a single-node cluster should not exceed 400MB. Add `memorySize` and `shardCount` to your REDB custom resource file as shown below.

```yaml
apiVersion: app.redislabs.com/v1alpha1
kind: RedisEnterpriseDatabase
metadata:
  name: your-db-name
spec:
  redisEnterpriseCluster:
    name: your-rec-name
  memorySize: 0.4GB
  shardCount: 1
```

## More info

- [Options for Redis Enterprise clusters]({{<relref "/kubernetes/reference/cluster-options.md">}})
- [Options for Redis Enterprise databases]({{<relref "/kubernetes/reference/db-options.md">}})
- [Manage Redis Enterprise databases on Kubernetes]({{< relref "/kubernetes/re-databases/db-controller.md">}})