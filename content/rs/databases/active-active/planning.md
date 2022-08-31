---
Title: Considerations for planning Active-Active databases
linktitle: Planning considerations
description: Information about Active-Active database to take into consideration while planning a deployment, such as compatibility, limitations, and special configuration
weight: 22
alwaysopen: false
categories: ["RS"]
aliases: [ /rs/databases/active-active/aa-planning.md,
/rs/databases/active-active/aa-planning/,
/rs/databases/active-active/planning.md,
/rs/databases/active-active/planning/,
]

---

In Redis Enterprise, Active-Active geo-distribution is based on [conflict-free replicated data type (CRDT) technology](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type). Compared to databases without geo-distribution, Active-Active databases have more complex replication and networking, as well as a different data type.

Because of the complexities of Active-Active databases, there are special considerations to keep in mind while planning your Active-Active database.

See [Active-Active Redis]({{<relref "/rs/databases/active-active/">}}) for more information about geo-distributed replication. For more info on other high availability features, see [Durability and high availability]({{<relref "/rs/databases/durability-ha/">}}).

## Participating clusters

For Active-Active databases, you need to [set up your participating clusters]({{<relref "/rs/clusters/new-cluster-setup.md">}}). At least two participating clusters. If your database requires more than ten participating clusters, contact Redis support. You can [add or remove participating clusters]({{<relref "/rs/databases/active-active/manage#participating-clusters/">}}) after database creation.

Changes made from the admin console to an Active-Active database configuration only apply to the cluster you are editing. For global configuration changes across all clusters, use the `crdb-cli` command-line utility.

## Memory limits

Database memory limits define the maximum size of your database across all database replicas and [shards]({{<relref "/rs/references/terminology.md#redis-instance-shard">}}) on the cluster. Your memory limit also determines the number of shards.

Besides your dataset, the memory limit must also account for replication, Active-Active metadata, and module overhead. These features can increase your database size, sometimes increasing it by two times or more.

Factors to consider when sizing your database:

- **dataset size**: you want your limit to be above your dataset size to leave room for overhead.
- **database throughput**: high throughput needs more shards, leading to a higher memory limit.
- [**modules**]({{<relref "/modules/">}}): using modules with your database consumes more memory.
- [**database clustering**]({{<relref "/rs/databases/durability-ha/clustering.md">}}): enables you to spread your data into shards across multiple nodes (scale out).
- [**database replication**]({{<relref "/rs/databases/durability-ha/replication.md">}}): enabling replication doubles memory consumption
- [**Active-Active replication**]({{<relref "/rs/databases/active-active/">}}): enabling Active-Active replication requires double the memory of regular replication, which can be up to two times (2x) the original data size per instance.
- [**database replication backlog**]({{<relref "/rs/databases/active-active/manage#replication-backlog/">}}) for synchronization between shards. By default, this is set to 1% of the database size.
- [**Active-Active replication backlog**]({{<relref "/rs/databases/active-active/manage.md">}}) for synchronization between clusters. By default, this is set to 1% of the database size.

It's also important to know Active-Active databases have a lower threshold for activating the eviction policy, because it requires propagation to all participating clusters. The eviction policy starts to evict keys when one of the Active-Active instances reaches 80% of its memory limit. 

For more information on memory limits, see [Memory management with Redis Enterprise Software]({{<relref "/rs/clusters/optimize/node-memory.md">}}), [Memory and performance]({{< relref "/rs/databases/memory-performance/">}}), or [Database memory limits]({{<relref "/rs/databases/memory-performance/memory-limit.md">}}).

## Networking

Network requirements for Active-Active databases include:

- A VPN between each network that hosts a cluster with an instance (if your database spans WAN).
- A network connection to [several ports](#network-ports) on each cluster from all nodes in all participating clusters.
- A [network time service](#network-time-service) running on each node in all clusters.

Networking between the clusters must be configured before creating an Active-Active database. The setup will fail if there is no connectivity between the clusters.

### Network ports

Every node must have access to the REST API ports of every other node as well as other ports for proxies, VPNs, and the admin console. See [Network port configurations]({{<relref "/rs/networking/port-configurations.md">}}) for more details. These ports should be allowed through firewalls that may be positioned between the clusters.

### Network Time Service {#network-time-service}

Active-Active databases require a time service like NTP or Chrony to make sure the clocks on all cluster nodes are synchronized.
This is critical to avoid problems with internal cluster communications that can impact your data integrity.

See [Synchronizing cluster node clocks]({{<relref "/rs/clusters/configure/sync-clocks.md">}}) for more information.

## Redis modules {#redis-modules}

Not all Redis modules are compatible with Active-Active databases. Below is a list of [compatible Redis modules]({{< relref "/modules/enterprise-capabilities.md" >}}).

- [RediSearch 2.x in Redis Enterprise Software 6.0 and higher]({{< relref "/modules/redisearch/redisearch-active-active.md" >}})
- RedisGears

## Limitations

Active-Active databases have the following limitations:

- An existing database can't be changed into an Active-Active database. To move data from an existing database to an Active-Active database, you must [create a new Active-Active database]({{< relref "/rs/databases/active-active/create.md" >}}) and [migrate the data]({{< relref "/rs/databases/import-export/migrate-to-active-active.md">}}).
- [Discovery service]({{< relref "/rs/databases/durability-ha/discovery-service.md" >}}) is not supported with Active-Active databases. Active-Active databases require FQDNs or [mDNS]({{< relref "/rs/networking/mdns.md">}}).
- The `FLUSH` command is not supported from the CLI. To flush your database, use the API or admin console.
- Cross slot multi commands (such as `MSET`) are not supported with Active-Active databases.
- The hashing policy can't be changed after database creation.
