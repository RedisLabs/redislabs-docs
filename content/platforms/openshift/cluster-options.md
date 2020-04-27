---
Title: Options for Clusters
description: A primer to configuration options for Redis Enterprise cluster Custom Resource Definitions.
weight: 70
alwaysopen: false
categories: ["Platforms"]
aliases:
---

A Redis Enterprise cluster is defined in a Custom Resource Definition (CRD). The
default format is a YAML definition that will look something like the follow:

```text
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
    versionTag: 5.4.14-31.rhel7-openshift
```

This default may be useful for quick-start purposes for test or development. You
can edit this for the required deployment use case. The full reference is
available on the [Github project RedisLabs/redis-enterprise-k8s-docs](https://github.com/RedisLabs/redis-enterprise-k8s-docs).

Here are the main fields you may want to review and edit:

- `name`: “rec”

    This is the cluster name that will be used by the operator to name various
    resources in the Kubernetes cluster and also name the CRD.

    {{% note %}}

The name is currently restricted to the value "rec" in the current release due to the
way that service accounts are created. There is a binding between the SCC
and the service account. While this binding can be created manually, this is
not a recommended practice.

    {{% /note %}}

- [`nodes`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#redisenterpriseclusterspec): *nnn*

    This [must be an odd number](https://redislabs.com/redis-enterprise/technology/highly-available-redis/) of at least 3 or greater.
- [`uiServiceType`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#redisenterpriseclusterspec): *service_type*

    This controls how the Redis Enterprise UI is exposed on the cluster. The *service_type* must be either `ClusterIP` or `LoadBalancer` (defaults to `ClusterIP`). This is an optional configuration based on [k8s service types](https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/).

- [`persistentSpec`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#persistentconfigurationspec):

    You may way to add a `storageClassName` that specifies the [StorageClass](https://kubernetes.io/docs/concepts/storage/storage-classes/) used for your nodes’ persistent disks. For example, AWS uses “gp2” as a default, GKE uses “standard” and Azure uses "default").

    Also, adding a `volumeSize` allows you to control the size of the persistent volume attached to the Redis Enterprise pods.

    ```yaml
    persistentSpec:
      enabled: true
      volumeSize: "10Gi"
      storageClassName: "gp2"    
    ```

- [`redisEnterpriseNodeResources`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#redisenterpriseclusterspec):

    The [compute resources](https://docs.openshift.com/enterprise/3.2/dev_guide/compute_resources.html#dev-compute-resources) required for each node (see `limits` and `requests` below).

    {{% note %}}
Resource limits should equal requests ([Learn why](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/topics.md#guaranteed-quality-of-service)).
    {{% /note %}}

    - [`limits`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#redisenterpriseclusterspec):

        The max resources for a Redis node (similar to pod limits).

        For example:
        ```yaml
        limits:
          cpu: “4000m”
          memory: 4Gi
        ```

        The default (if unspecified) is 4 cores (4000m) and 4GB (4Gi).

    - [`requests`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#redisenterpriseclusterspec):

        The minimum resources for a Redis node (similar to pod requests).

        For example:

        ```yaml
        requests:
          cpu: “4000m”
          memory: 4Gi
        ```

        The default (if unspecified) is 4 cores (4000m) and 4GB (4Gi).


- [`serviceBrokerSpec`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#servicebrokerspec):

    Enables and controls the service broker. The service broker is disabled by default.

    ```yaml
      enabled: true|false
      persistentSpec:
         storageClassName: "*class_name*"
    ```

- [`redisEnterpriseImageSpec`](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/docs/operator.md#imagespec):

    This configuration controls the Redis Enterprise version used, and where it is fetched from. This is an optional field. The Operator will automatically use the matching RHEL image version for the release.

    The value is structured as follows with the [policy values from OpenShift](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/builds_and_image_streams.html#image-pull-policy):

    ```
    imagePullPolicy: IfNotPresent
    Repository: redislabs/redis
    versionTag: 5.2.10-22
    ```

    The version tag is as it appears on your repository (e.g., on [DockerHub](https://hub.docker.com/r/redislabs/redis/)).
