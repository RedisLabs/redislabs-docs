---
Title: Redis Enterprise Active-Active database (REAADB) public preview
linkTitle: Preview REAADB
description: Preview content related to Active-Active Redis Enterprise for Kubernetes. 
weight: 40
alwaysopen: false
categories: ["Platforms"]
aliases: {
    /kubernetes/preview/_index.md,
    /kubernetes/preview/,
    content/kubernetes/active-active/preview/_index.md,
    content/kubernetes/active-active/preview/,
    
}
---
{{<banner-article bannerColor="#fff8dc">}}
This feature is currently in public preview. Contact Redis support if you plan to use this feature.
See [Create Active-Active databases for Kubernetes]({{<relref "/kubernetes/active-active/create-aa-database.md">}}) for the currently supported procedure.
{{</banner-article>}}


## Redis Enterprise Active-Active for Kubernetes

{{<note>}} The preview features below are only available for the 6.4.2-4 release. {{</note>}}

[Active-Active]({{<relref "/rs/databases/active-active/">}}) databases give you read-and-write access to Redis Enterprise clusters (REC) in different Kubernetes clusters or namespaces. Active-Active deployments managed by the Redis Enterprise operator require two additional custom resources: Redis Enterprise Active-Active database (REAADB) and Redis Enterprise remote cluster (RERC).

To create an Active-Active Redis Enterprise deployment for Kubernetes with these new features, first [prepare participating clusters]({{<relref "/kubernetes/active-active/preview/prepare-clusters.md">}}) then [create an Active-Active database]({{<relref "/kubernetes/active-active/preview/create-reaadb.md">}}).

For the currently supported procedure, see [Create Active-Active databases for Kubernetes]({{<relref "/kubernetes/active-active/create-aa-database.md">}}).

### REAADB custom resource

Redis Enterprise Active-Active database (REAADB) contains a link to the RERC for each participating cluster, and provides configuration and status to the management plane.

For a full list of fields and options, see the [REAADB API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_active_active_database_api.md).

### RERC custom resource

Redis Enterprise remote cluster (RERC) custom resource contains configuration details for all the participating clusters.

For a full list of fields and options, see the [RERC API reference](https://github.com/RedisLabs/redis-enterprise-k8s-docs/blob/master/redis_enterprise_remote_cluster_api.md).

## Preview limitations

* No support for Hashicorp Vault for storing secrets (RED-95805)
* No module support (RED-95153)
* No support for client certificates in secrets (RED-95724)
* No support for backup configuration (RED-95724)
* No support for upgrading the database Redis version
* REAADB secret status isn't updated in source cluster (RED-96296)

  The workaround is to view the secret status in one of the remote clusters.
* Invalid REAADB is not rejected by admission might get deleted after apply. (RED-96300)

  Fix the problems with the REAADB and reapply. Contact support if you aren't sure why the REAADB is invalid.
* Admission is not blocking REAADB with `shardCount` which exceeds license quota. (RED-96301)

  Fix the problems with the REAADB and reapply.
* RERC resources must have a unique name (`<rec-name>/<rec-namespace>`). (RED-96302)

* Only global database options are supported, not support for specifying configuration per location.
* Can't automatically update the cluster secret via the operator (can be updated manually).
* No support for migration from old (manual) Active-Active database method to new Active-Active controller.