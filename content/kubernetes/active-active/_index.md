---
Title: Active-Active controller (preview)
linkTitle: Preview Active-Active
description: Preview content related to Active-Active Redis Enterprise for Kubernetes. 
weight: 40
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/preview/_index.md,
    /kubernetes/preview/,
    /kubernetes/active-active/_index.md,
    /kubernetes/active-active/,
}
---
{{<note>}} These feature are currently in preview and not for production use.  {{</note>}}

## 6.4.2-4

The preview features below are only available for the 6.2.4-3 release. See the 6.2.4-3 release notes for more details.

## Redis Enterprise Active-Active for Kubernetes

[Active-Active]({{<relref "/rs/databases/active-active/">}}) databases give you read and write access to Redis Enterprise clusters (REC) in different Kubernetes clusters or namespaces. Active-Active deployments managed by the Redis Enterprise operator require two additional custom resources: Redis Enterprise Active-Active database (REAADB) and Redis Enterprise remote cluster (RERC).

To create an Active-Active Redis Enterprise deployment for Kubernetes with these new features, first [prepare participating clusters]({{<relref "/kubernetes/preview/prepare-clusters.md">}}) then [create an Active-Active database]({{<relref "/kubernetes/preview/create-reaadb.md">}}).

For the currently supported procedure, see [Create Active-Active databases for Kubernetes]({{<relref "/kubernetes/active-active/create-aa-database.md">}}).

### REAADB custom resource

Redis Enterprise Active-Active database (REAADB) contains a link to the RERC for each participating cluster, and provides configuration and status to the management plane.

For a full list of fields and options, see the [REAADB API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_active_active_database_api.md).

### RERC custom resource

Redis Enterprise remote cluster (RERC) custom resource contains configuration details for all the participating clusters.

For a full list of fields and options, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

## Preview limitations

* Can't automatically update the cluster secret via the operator (can be updated manually)
* No support for migration from old (manual) Active-Active database method to new Active-Active controller
* No support for Hashicorp Vault for storing secrets
* No module support
* No support for client certificates in secrets
* No support for backup configuration
* No support for upgrading the database Redis version
