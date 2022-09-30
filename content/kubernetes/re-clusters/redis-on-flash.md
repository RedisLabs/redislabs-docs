---
Title: Use Redis on Flash on Kubernetes
linkTitle: Redis on Flash
description: Deploy a cluster with Redis on Flash on Kubernetes.
weight: 16
alwaysopen: false
categories: ["Platforms"]
aliases: [
    /kubernetes/re-clusters/redis-on-flash.md,
    /kubernetes/re-clusters/redis-on-flash/,
]  
---

## Prerequisites

Redis Enterprise Software for Kubernetes supports using Redis on Flash, which extends your node memory to use both RAM and flash storage. SSDs (solid state drives) can store infrequently used (warm) values while your keys and frequently used (hot) values are still stored in RAM. This improves performance or lower costs for large datasets.

{{<note>}}
NVMe (non-volatile memory express) SSDs are strongly recommended to achieve the best performance.
{{</note>}}

Before creating your Redis clusters or databases, these SSDs must be:

- [locally attached to worker nodes in your Kubernetes cluster](https://kubernetes.io/docs/concepts/storage/volumes/#local)
- formatted and mounted on the nodes that will run Redis Enterprise pods
- dedicated to RoF and not shared with other parts of the database, (e.g. durability, binaries)
- [provisioned as local persistent volumes](https://kubernetes.io/docs/concepts/storage/volumes/#local)
  - You can use a [local volume provisioner](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner/blob/master/README.md) to do this [dynamically](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#dynamic)
- a [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/#local) resource with a unique name

For more information on node storage, see [Node persistent and ephemeral storage]({{<relref "/rs/installing-upgrading/persistent-ephemeral-storage.md">}})

## Enable Redis on Flash feature

Redis on Flash support with Kubernetes is currently in preview. To enable this feature, set an environment variable with the name `ENABLE_ALPHA_FEATURES` to `True` in either the `redis-enterprise-operator` pod spec or the `operator-environment-config` ConfigMap.

## Create a Redis Enterprise cluster

To deploy a Redis Enterprise cluster (REC) with flash storage, you'll need to specify the following in the `redisOnFlashSpec` section of your [REC custom resource]({{<relref "/kubernetes/reference/cluster-options.md">}}):

- enable Redis on Flash (`enabled: true`)
- flash storage driver (`flashStorageEngine`)
  - The only currently supported value is `rocksdb`
- storage class name (`storageClassName`)
- minimal flash disk size (`flashDiskSize`)

Here is an example of an REC custom resource with these attributes:

```YAML
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: "rec"
spec:
  
  nodes: 3
  redisOnFlashSpec:
    enabled: true
    flashStorageEngine: rocksdb
    storageClassName: local-scsi
    flashDiskSize: 100G
```

### Create a Redis Enterprise database

By default, any new database will use RAM only. To create a Redis Enterprise database (REDB) that can use flash storage, specify the following in the `redisEnterpriseCluster` section of the REDB custom resource definition:

- `isRof: true` enables Redis on Flash
- `rofRamSize` defines the RAM capacity for the database

Below is an example REDB custom resource:

```YAML
apiVersion: app.redislabs.com/v1alpha1
kind: RedisEnterpriseDatabase
metadata:
  name: rof-redb
spec:
  redisEnterpriseCluster:
    name: rec
  isRof: true
  memorySize: 2GB
  rofRamSize: 0.5GB
```

{{< note >}}
This example defines both `memorySize` and `rofRamSize`. When using Redis on Flash, `memorySize` refers to the total combined memory size (RAM + flash) allocated for the database. `rofRamSize` specifies only the RAM capacity for the database. `rofRamSize` must be at least 10% of `memorySize`.
{{< /note >}}


