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

There are two methods for creating an Active-Active database with Redis Enterprise for Kubernetes. The `crdb-cli` method is available on all supported versions. The `RedisEnterpriseActiveActiveDatabase` (REAADB) custom resource available as a public preview with the 6.4.2-4 release. If you plan to use this feature while in preview, contact Redis support.

## `crdb-cli` method

The currently supported Active-Active setup method includes the following steps:

1. Install and configure an ingress.
2. Gathering configuration details.
3. Adding the `ActiveActive` field to the REC spec.
4. Creating the database with the `crdb-cli` tool.

## REAADB public preview

The 6.2.4-4 release includes a public preview of new Active-Active controller. The new setup method includes the following steps:

1. Enable the new resources on your `RedisEnterpriseCluster`s (REC).
2. Configure an ingress with `ingressOrRouteSpec` in the REC spec.
3. Collect and apply REC admin credentials for all participating RECs.
4. Create `RedisEnterpriseRemoteCluster` (RERC) resources.
5. Create `RedisEnterpriseActiveActiveDatabase` (REAADB) resource.

## More info

For more general information about Active-Active, see the [Redis Enterprise Software docs]({{<relref "/rs/databases/active-active/">}}).
