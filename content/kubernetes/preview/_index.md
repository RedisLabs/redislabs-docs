---
Title: Preview features
linkTitle: Preview
description: Preview content related to Active-Active Redis Enterprise for Kubernetes. 
weight: 92
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/_index.md,
    /kubernetes/active-active/,
}
---
{{<note>}} This feature is currently in preview and is not for production use.{{</note>}}

## Redis Enterprise Active-Active for Kubernetes public preview

Active-Active databases give you read and write access to Redis Enterprise clusters (REC) in different Kubernetes clusters. Active-Active deployments managed by the Redis Enterprise operator require two additional custom resources: Redis Enterprise Active-Active database (REAADB) and Redis Enterprise remote cluster (RERC).

### Redis Enterprise Active-Active database

Redis Enterprise Active-Active database (REAADB) contains a link to the RERC for each participating cluster, and provides configuration and status to the management plane.

links to procedures

For a full list of fields and options, see the [REAADB API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_active_active_database_api.md).

Link to RS AA content

### Redis Enterprise remote cluster

Redis Enterprise Remote Cluster (RERC) custom resource contains configuration details for all the participating clusters. 

links to procedures

For a full list of fields and options, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

Link to RS AA content
