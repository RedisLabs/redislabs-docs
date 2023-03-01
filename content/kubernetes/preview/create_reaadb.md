---
Title: Create Active-Active database for Kubernetes
linkTitle: Create database
description: 
weight: 20
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/preview/prepare.md,
    /kubernetes/preview/prepare/,
}
---

{{<note>}} This feature is currently in preview and is not for production use. See [Create Active-Active databases for Kubernetes]({<relref "/kubernetes/re-clusters/create-aa-database.md">}) for the currently supported procedure.{{</note>}}

## Prerequisites

Before creating an Active-Active database on Redis Enterprise for Kubernetes, you'll need to prepare your participating Redis Enterprise clusters (REC). See [Prepare participating clusters]({{<relref "/kubernetes/preview/prepare-clusters.md">}}) before creating your Redis Enterprise remote cluster (RERC) and Redis Enterprise Active-Active database (REAADB).

## Create `RedisEnterpriseRemoteCluster` resources

1. Create a `RedisEnterpriseRemoteCluster` (RERC) custom resource files for each participating Redis Enterprise cluster (REC). 
  Below are examples of RERC resources for two participating clusters. Substitute your own values to create your own resource.

  Example RERC for a REC named `rec1` in the namespace `ns1`:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseRemoteCluster
    metadata:
      name: rec1.ns1
    spec:
      apiFqdnUrl: test-example-api-rec1-ns1.redis.com
      dbFqdnSuffix: -example-cluster-rec1-ns1.redis.com
      secretName: redis-enterprise-rec1-ns1
    ```

  Example RERC for a REC named `rec2` in the namespace `ns2`:

    ```yaml
    apiVersion: app.redislabs.com/v1alpha1
    kind: RedisEnterpriseRemoteCluster
    metadata:
      name: rec2.ns2
    spec:
      apiFqdnUrl: test-example-api-rec2-ns2.redis.com
      dbFqdnSuffix: -example-cluster-rec2.ns2.redis.com
      secretName: redis-enterprise-rec2-ns2
    ```

  For more details on RERC fields, see the [RERC API reference]().

1. Create a Redis Enterprise remote cluster from each RERC custom resource file. 
  
    ```sh
    kubectl create -f <rerc-file>
    ```

1. Check the status of your RERC.
  
    ```sh
    kubectl get rerc <rerc-name>
    ```

  Output should look similar to:

    ```sh
    kubectl get rerc <rec1.ns1>

    NAME        STATUS   SPEC STATUS   LOCAL
    rec1.ns1   Active   Valid         true
    ```

## Create `RedisEnterpriseActiveActiveDatabase` resource
