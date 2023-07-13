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

{{<note>}}This feature is supported for general availability in releases 6.4.2-6 and later. Preview of this feature is available in versions 6.4.2-4 and 6.4.2-5, but we recommend using the GA version 6.4.2-6. This feature is not supported in versions 6.2.18-41 and before.{{</note>}}

## Prerequisites

To create an Active-Active database, make sure you've completed all the following steps and have gathered the information listed below each step.

1. Configure the [admission controller and ValidatingWebhook]({{<relref "/kubernetes/deployment/quick-start.md#enable-the-admission-controller/">}}).
   {{<note>}}These are installed and enabled by default on clusters created via the OpenShift OperatorHub. {{</note>}}

2. Create two or more [RedisEnterpriseCluster (REC) custom resources]({{<relref "/kubernetes/deployment/quick-start#create-a-redis-enterprise-cluster-rec">}}) with enough [memory resources]({{<relref "/rs/installing-upgrading/install/plan-deployment/hardware-requirements.md">}})).
   * Name of each REC (`<rec-name>`)
   * Namespace for each REC (`<rec-namespace>`)

3. Configure the REC [`ingressOrRoutes` field]({{<relref "/kubernetes/networking/ingressorroutespec.md">}}) and [create DNS records]({{<relref "/kubernetes/networking/ingressorroutespec#configure-dns/">}}).
   * REC API hostname (`api-<rec-name>-<rec-namespace>.<subdomain>`)
   * Database hostname suffix (`-db-<rec-name>-<rec-namespace>.<subdomain>`)

4. [Prepare participating clusters]({{<relref "/kubernetes/active-active/prepare-clusters.md">}})
   * RERC name (`<rerc-name`>)
   * RERC secret name (`redis-enterprise-<rerc-name>`)

For a list of example values used throughout this article, see the [Example values](#example-values) section.

## Create `RedisEnterpriseRemoteCluster` resources {#create-rerc}

1. Create a `RedisEnterpriseRemoteCluster` (RERC) custom resource file for each participating Redis Enterprise cluster (REC).

   Below are examples of RERC resources for two participating clusters. Substitute your own values to create your own resource.

    Example RERC (`rerc-ohare`) for the REC named `rec-chicago` in the namespace `ns-illinois`:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseRemoteCluster
    metadata:
      name: rerc-ohare
    spec:
      recName: rec-chicago
      recNamespace: ns-illinois
      apiFqdnUrl: api-rec-chicago-ns-illinois.redis.com
      dbFqdnSuffix: -db-rec-chicago-ns-illinois.redis.com
      secretName: redis-enterprise-rerc-ohare
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

    The output should look similar to:

    ```sh
    kubectl get rerc rerc-ohare

    NAME        STATUS   SPEC STATUS   LOCAL
    rerc-ohare   Active   Valid         true
    ```
  
    In case of errors, review the RERC custom resource events and the Redis Enterprise operator logs.

## Create `RedisEnterpriseActiveActiveDatabase` resource {#create-reaadb}

1. Create a `RedisEnterpriseActiveActiveDatabase` (REAADB) custom resource file meeting the naming requirements and listing the names of the RERC custom resources created in the last step.

    Naming requirements:
    * less than 63 characters
    * contains only lowercase letters, numbers, or hyphens
    * starts with a letter
    * ends with a letter or digit

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
           - name: rerc-ohare
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

    The output should look similar to:

    ```sh
    kubectl get reaadb reaadb-boeing

    NAME             STATUS   SPEC STATUS   GLOBAL CONFIGURATIONS REDB   LINKED REDBS
    reaadb-boeing   active   Valid             
    ```
  
    In case of errors, review the REAADB custom resource events and the Redis Enterprise operator logs.

## Example values

This article uses the following example values:

#### Example cluster 1

* REC name: `rec-chicago`
* REC namespace: `ns-illinois`
* RERC name: `rerc-ohare`
* RERC secret name: `redis-enterprise-rerc-ohare`
* API FQDN: `api-rec-chicago-ns-illinois.redis.com`
* DB FQDN suffix: `-db-rec-chicago-ns-illinois.redis.com`

#### Example cluster 2

* REC name: `rec-arlington`
* REC namespace: `ns-virginia`
* RERC name: `rerc-raegan`
* RERC secret name: `redis-enterprise-rerc-reagan`
* API FQDN: `api-rec-arlington-ns-virginia.redis.com`
* DB FQDN suffix: `-db-rec-arlington-ns-virginia.redis.com`

