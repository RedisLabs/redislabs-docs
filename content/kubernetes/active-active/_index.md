---
Title: Active-Active databases
linkTitle: Active-Active databases
description: Content related to Active-Active Redis Enterprise databases for Kubernetes. 
weight: 40
alwaysopen: false
categories: ["Platforms"]
aliases: {
/kubernetes/active-active/_index.md,
/kubernetes/active-active/,
}
---

On Kubernetes, Redis Enterprise [Active-Active]({{<relref "/rs/databases/active-active/">}}) databases provide read and write access to the same dataset from different Kubernetes clusters.

There are two methods for creating an Active-Active database with Redis Enterprise for Kubernetes. The `crdb-cli`` method is available on all supported versions. The the Active-Active controller method is in preview and only available with the 6.4.2-4 release. Preview features are not fit for production environments.

## `credb-cli` method

The currently supported Active-Active setup method includes the following steps:

1. Install and configure an ingress.
2. Gathering configuration details.
3. Adding the `ActiveActive` field to the REC spec.
4. Creating the database with the `crdb-cli` tool.

## Active-Active controller public preview

The 6.2.4-4 release includes a public preview of new Active-Active controller. The new setup method includes the following steps:

1. Enable the new resources on your `RedisEnterpriseCluster`s (REC).
2. Configure an ingress with `ingressOrRouteSpec` in the REC spec.
3. Collect and apply REC admin credentials for all participating RECs.
4. Create `RedisEnterpriseRemoteCluster` (RERC) resources.
5. Create `RedisEnterpriseActiveActiveDatabase` (REAADB) resource.


## More info

For more general information about Active-Active, see the [Redis Enterprise Software docs]({{<relref "/rs/databases/active-active/">}}).
