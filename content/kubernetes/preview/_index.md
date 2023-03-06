---
Title: Public preview support for Active-Active
linkTitle: Active-Active preview
description: Preview content related to Active-Active Redis Enterprise for Kubernetes. 
weight: 92
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/active-active/_index.md,
    /kubernetes/active-active/,
}
---
{{<note>}} These feature are currently in preview and not for production use.  {{</note>}}

## 6.4.2-1

The preview features below are only available for the 6.2.4-1 release. See the 6.2.4-1 release notes for more details. 

## Enable alpha features

Preview features require the alpha features flag. 

Edit the Redis operator configmap (`operator-environment-config`) to set `ENABLE_ALPHA_FEATURES` to "true".

```sh
  kubectl patch cm  operator-environment-config --type merge --patch "{\"data\": \
    {\"ENABLE_ALPHA_FEATURES\":\"true\"}}"
```

## Public preview features


### IngressOrRoutesSpec field in REC spec

A new field in the Redis Enterprise cluster (REC) custom resource allows you use the REC spec to configure external access to your Redis Enterprise databases.

We support these ingress controllers: 

To use this, you'll need to see this **new article**

### Redis Enterprise Active-Active for Kubernetes

[Active-Active]({{<relref "/rs/databases/active-active/">}}) databases give you read and write access to Redis Enterprise clusters (REC) in different Kubernetes clusters or namespaces. Active-Active deployments managed by the Redis Enterprise operator require two additional custom resources: Redis Enterprise Active-Active database (REAADB) and Redis Enterprise remote cluster (RERC).

To create an Active-Active Redis Enterprise deployment for Kubernetes with these new features, first [prepare participating clusters]({{<relref "/kubernetes/preview/prepare-clusters.md">}}) then [create an Active-Active database]({{<relref "/kubernetes/preview/create_reaadb.md">}}).

For the currently supported procedure, see [Create Active-Active databases for Kubernetes]({{<relref "/kubernetes/re-clusters/create-aa-database.md">}}).

#### REAADB custom resource

Redis Enterprise Active-Active database (REAADB) contains a link to the RERC for each participating cluster, and provides configuration and status to the management plane.

For a full list of fields and options, see the [REAADB API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_active_active_database_api.md).

#### RERC custom resource

Redis Enterprise remote cluster (RERC) custom resource contains configuration details for all the participating clusters.

For a full list of fields and options, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

## Related articles

- [Active-Active geo-distributed Redis]({{<relref "/rs/databases/active-active/">}})
- [Connect to your Active-Active database]({{<relref "/rs/databases/active-active/connect.md">}})
- [Considerations for planning Active-Active databases]({{<relref "/rs/databases/active-active/planning.md">}})

