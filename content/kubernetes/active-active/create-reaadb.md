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
    /kubernetes/active-active/preview/prepare-clusters.md,
    /kubernetes/active-active/preview/prepare-clusters/,
    /kubernetes/active-active/create-reaadb/,
}
---

## Prerequisites

{{<note>}}This feature is only available for versions 6.2.4-4 or later.{{</note>}}

Before creating an Active-Active database on Redis Enterprise for Kubernetes, you'll need to prepare your participating Redis Enterprise clusters (REC). See [Prepare participating clusters]({{<relref "/kubernetes/active-active/prepare-clusters.md">}}) before creating your Redis Enterprise remote cluster (RERC) and Redis Enterprise Active-Active database (REAADB).

## Create `RedisEnterpriseRemoteCluster` resources

1. Create a `RedisEnterpriseRemoteCluster` (RERC) custom resource file for each participating Redis Enterprise cluster (REC).

  Below are examples of RERC resources for two participating clusters. Substitute your own values to create your own resource.

    Example RERC (`rerc-midway`) for the REC named `rec-chicago` in the namespace `ns-illinois`:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseRemoteCluster
    metadata:
      name: rerc-midway
    spec:
      recName: rec-chicago
      recNamespace: ns-illinois
      apiFqdnUrl: test-example-api-rec-chicago-ns-illinois.redis.com
      dbFqdnSuffix: -example-cluster-rec-chicago-ns-illinois.redis.com
      secretName: redis-enterprise-rerc-midway
    ```

    Example RERC (`rerc-raegan`) for the REC named `rec-arlington` in the namespace `ns-virginia`:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseRemoteCluster
    metadata:
      name: rerc-reagan
    spec:
      recName: rec-arlington
      recNamespace: ns-virginia
      apiFqdnUrl: test-example-api-rec-arlington-ns-virginia.redis.com
      dbFqdnSuffix: -example-cluster-rec-arlington-ns-virginia.redis.com
      secretName: redis-enterprise-rerc-reagan
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
    kubectl get rerc rerc-midway

    NAME        STATUS   SPEC STATUS   LOCAL
    rerc-midway   Active   Valid         true
    ```
  
    In case of errors, review the RERC custom resource events and the Redis Enterprise operator logs.

## Create `RedisEnterpriseActiveActiveDatabase` resource

1. Create a `RedisEnterpriseActiveActiveDatabase` (REAADB) custom resource file meeting the naming requirements and listing the names of the RERC custom resources created in the last step.

    Naming requirements:
    - less than 63 characters
    - contains only lowercase letters, numbers, or hyphens
    - starts with a letter
    - ends with a letter or digit

    Example REAADB named `reaadb-boeing` linked to the REC named `rec-chicago` with two participating clusters and a global database configuration with shard count set to 3:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseActiveActiveDatabase
    metadata:
      name: reaadb-boeing
    spec:
      globalConfigurations:
        databaseSecretName: <my-secret>
        memorySize: 200MB
        shardCount: 3
      participatingClusters:
          - name: rerc-midway
          - name: rerc-reagan
    ```

    For more details on RERC fields, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

1. Create a Redis Enterprise Active-Active database from the REAADB custom resource file.
  
    ```sh
    kubectl create -f <reaadb-file>
    ```

1. Check the status of your RERC. If `STATUS` is `Active` and `SPEC STATUS` is `Valid`, your configurations are correct.
  
    ```sh
    kubectl get reaadb <reaadb-name>
    ```

    Output should look similar to:

    ```sh
    kubectl get reaadb reaadb-boeing

    NAME             STATUS   SPEC STATUS   GLOBAL CONFIGURATIONS REDB   LINKED REDBS
    reaadb-boeing   active   Valid             
    ```
  
    In case of errors, review the REAADB custom resource events and the Redis Enterprise operator logs.
