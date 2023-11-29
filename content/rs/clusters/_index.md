---
Title: Manage clusters
linktitle: Clusters
description: Administrative tasks and information related to the Redis Enterprise cluster.
weight: 36
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/clusters/_index.md,
    /rs/clusters/,
    /rs/administering/cluster-operations,
    /rs/administering/cluster-operations.md,
    /rs/administering/designing-production/,

]
---

You can manage your Redis Enterprise Software clusters with several different tools:

- Admin console (the web-based user interface)
- Command-line tools ([rladmin]({{<relref "/rs/references/cli-utilities/rladmin">}}), [redis-cli](https://redis.io/docs/manual/cli/), [crdb-cli]({{<relref "/rs/references/cli-utilities/crdb-cli">}}))
- [REST API]({{<relref "/rs/references/rest-api/_index.md">}})

## Manage your cluster

### [Set up cluster]({{< relref "/rs/clusters/new-cluster-setup" >}})

Set up a new cluster using the admin console.

### [Add a node]({{< relref "/rs/clusters/add-node" >}})

Add a node to an existing Redis Enterprise cluster.

### [Configure clusters]({{< relref "/rs/clusters/configure/" >}})

Change [cluster settings]({{< relref "/rs/clusters/configure/cluster-settings" >}}).

### [Optimize clusters]({{< relref "/rs/clusters/optimize" >}})

Find information and configuration settings to improve the performance of Redis Enterprise Software.

### [Monitor cluster]({{< relref "/rs/clusters/monitoring" >}})

Monitor the cluster and database activity with [cluster logs]({{< relref "/rs/clusters/logging" >}}) and metrics.