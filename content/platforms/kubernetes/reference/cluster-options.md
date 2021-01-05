---
Title: Options for Redis Enterprise Clusters
description: A primer for the configuration options for Redis Enterprise cluster Custom Resource Definitions.
weight: 32
alwaysopen: false
categories: ["Platforms"]
aliases: /platforms/kubernetes/cluster-options/
---
A Redis Enterprise cluster is defined in a Custom Resource Definition (CRD).
The default format is a YAML definition such as:

```yaml
apiVersion: app.redislabs.com/v1
kind: RedisEnterpriseCluster
metadata:
  name: rec
  namespace: my-project
spec:
  nodes: 3
  persistentSpec:
    enabled: true
  uiServiceType: ClusterIP
  username: demo@redislabs.com
  redisEnterpriseNodeResources:
    limits:
      cpu: 4000m
      memory: 4Gi
    requests:
      cpu: 4000m
      memory: 4Gi
  redisEnterpriseImageSpec:
    imagePullPolicy: IfNotPresent
    repository: redislabs/redis
    versionTag: 6.0.6-39.rhel7-openshift
```

This example may be useful to get started with a test or development deployment.
You can modify it for your required deployment use case.
This file and other references are available in the [RedisLabs/redis-enterprise-k8s-docs](https://github.com/RedisLabs/redis-enterprise-k8s-docs) GitHub repository.

Here are the main fields for you to review and edit:

- `name`: `rec`

    This is the cluster name that the operator uses to name various
    resources in the Kubernetes cluster and also name the CRD.

    {{< note >}}

The name is restricted to the value "rec" in the current release because of the way that service accounts are created.
There is a binding between the SCC and the service account.
You can create this binding manually, but we do not recommend it.

    {{< /note >}}

- [`nodes`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md#redisenterpriseclusterspec): `nnn`

    This [must be an odd number](https://redislabs.com/redis-enterprise/technology/highly-available-redis/) that is 3 or higher.
- [`uiServiceType`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#redisenterpriseclusterspec): `service_type`

    This controls how the Redis Enterprise UI is exposed on the cluster.
    The service_type must be either `ClusterIP` or `LoadBalancer` (default: `ClusterIP`).
    This is an optional configuration based on [k8s service types](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/).

- [`persistentSpec`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md#redisenterpriseclusterspec):

    You can add a `storageClassName` that specifies the [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) used for your nodes’ persistent disks. For example, AWS uses “gp2” as a default, GKE uses “standard” and Azure uses "default".

    Also, adding a `volumeSize` lets you control the size of the persistent volume attached to the Redis Enterprise pods.

    ```yaml
    persistentSpec:
      enabled: true
      volumeSize: "10Gi"
      storageClassName: "gp2"
    ```

- [`redisEnterpriseNodeResources`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md#redisenterpriseclusterspec):

    The [compute resources](https://docs.openshift.com/enterprise/3.2/dev_guide/compute_resources.html#dev-compute-resources) required for each node (see `limits` and `requests`).

    {{< note >}}
We recommend that resource limits equal requests ([Learn why](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/topics.md#guaranteed-quality-of-service)).
    {{< /note >}}

    - [`limits`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md#redisenterpriseclusterspec):

        The max resources for a Redis node (similar to pod limits).

        For example:

        ```yaml
        limits:
          cpu: "4000m"
          memory: 4Gi
        ```

        The default is 4 cores (4000m) and 4GB (4Gi).

    - [`requests`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md#redisenterpriseclusterspec):

        The minimum resources for a Redis node (similar to pod requests).

        For example:

        ```yaml
        requests:
          cpu: "4000m"
          memory: 4Gi
        ```

        The default is 4 cores (4000m) and 4GB (4Gi).

- [`redisEnterpriseImageSpec`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_cluster_api.md#imagespec):

    This configuration controls the Redis Enterprise version used, and where it is fetched from. This is an optional field. The Operator automatically uses the matching RHEL image version for the release.

    The value is structured as follows with the [policy values from OpenShift](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/builds_and_image_streams.html#image-pull-policy):

    ```yaml
    imagePullPolicy: IfNotPresent
    Repository: redislabs/redis
    versionTag: 6.0.6-39
    ```

    The version tag is as it appears on your repository, such as in [DockerHub](https://hub.docker.com/r/redislabs/redis/).
