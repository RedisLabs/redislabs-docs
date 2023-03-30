---
Title: Create Active-Active database (REAADB)
linkTitle: Create database
description: 
weight: 30
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/preview/create-reaadb.md,
    /kubernetes/preview/create-reaadb/,
    //kubernetes/active-active/preview/prepare-clusters.md,
    //kubernetes/active-active/preview/prepare-clusters/,
}
---
{{<banner-article bannerColor="#fff8dc">}}
This feature is currently in public preview. Contact Redis support if you plan to use this feature.
See [Create Active-Active databases for Kubernetes]({{<relref "/kubernetes/active-active/create-aa-database.md">}}) for the currently supported procedure.
{{</banner-article>}}


## Prerequisites

{{<note>}}To use this feature, upgrade to the 6.4.2-4 release.{{</note>}}

Before creating an Active-Active database on Redis Enterprise for Kubernetes, you'll need to prepare your participating Redis Enterprise clusters (REC). See [Prepare participating clusters]({{<relref "/kubernetes/active-active/preview/prepare-clusters.md">}}) before creating your Redis Enterprise remote cluster (RERC) and Redis Enterprise Active-Active database (REAADB).

## Create `RedisEnterpriseRemoteCluster` resources

1. Create a `RedisEnterpriseRemoteCluster` (RERC) custom resource file for each participating Redis Enterprise cluster (REC). 
  Below are examples of RERC resources for two participating clusters. Substitute your own values to create your own resource.

    Example RERC for a REC named `rec1` in the namespace `ns1`:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseRemoteCluster
    metadata:
      name: rerc1
    spec:
      recName: rec1
      recNamespace: ns1
      apiFqdnUrl: test-example-api-rec1-ns1.redis.com
      dbFqdnSuffix: -example-cluster-rec1-ns1.redis.com
      secretName: redis-enterprise-rerc1
    ```

    Example RERC for a REC named `rec2` in the namespace `ns2`:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseRemoteCluster
    metadata:
      name: rerc2
    spec:
      recName: rec2
      recNamespace: ns2
      apiFqdnUrl: test-example-api-rec2-ns2.redis.com
      dbFqdnSuffix: -example-cluster-rec2-ns2.redis.com
      secretName: redis-enterprise-rerc2
    ```

    For more details on RERC fields, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

1. Create a Redis Enterprise remote cluster from each RERC custom resource file. 
  
    ```sh
    kubectl create -f <rerc-file>
    ```

1. Check the status of your RERC. If `STATUS` is `Active` and `SPEC STATUS` is `Valid`, then your configurations are correct.
  
    ```sh
    kubectl get rerc <rerc-name>
    ```

    Output should look similar to:

    ```sh
    kubectl get rerc rerc1

    NAME        STATUS   SPEC STATUS   LOCAL
    rerc1   Active   Valid         true
    ```
  
    In case of errors, review the RERC custom resource events and the Redis Enterprise operator logs.

## Create `RedisEnterpriseActiveActiveDatabase` resource

1. Create a `RedisEnterpriseActiveActiveDatabase` (REAADB) custom resource file meeting the naming requirements and listing the names of the RERC custom resources created in the last step.

    Naming requirements:
    - less than 63 characters
    - contains only lowercase letters, numbers, or hyphens
    - starts with a letter
    - ends with a letter or digit

    Example REAADB named `example-aadb-1` linked to the REC named `rec1` with two participating clusters and a global database configuration with shard count set to 3:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseActiveActiveDatabase
    metadata:
      name: example-reaadb-1
    spec:
      globalConfigurations:
        databaseSecretName: <my-secret>
        memorySize: 200MB
        shardCount: 3
      participatingClusters:
          - name: rerc1
          - name: rerc2
    ```

    For more details on RERC fields, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

1. Create a Redis Enterprise Active-Active database from the REAADB custom resource file. 
  
    ```sh
    kubectl create -f <reaadb-file>
    ```

1. Check the status of your RERC. If `STATUS` is `Active` and `SPEC STATUS` is `Valid`, your configurations are correct.
  
    ```sh
    kubectl get raadb <raadb-name>
    ```

    Output should look similar to:

    ```sh
    kubectl get raadb example-aadb-1

    NAME             STATUS   SPEC STATUS   GLOBAL CONFIGURATIONS REDB   LINKED REDBS
    example-aadb-1   active   Valid             
    ```
  
    In case of errors, review the REAADB custom resource events and the Redis Enterprise operator logs.
