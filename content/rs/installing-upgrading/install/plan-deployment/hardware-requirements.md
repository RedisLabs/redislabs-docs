---
Title: Hardware requirements
linkTitle: Hardware requirements
description: Redis Enterprise Software hardware requirements for development and production environments.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/hardware-requirements.md,
    /rs/administering/designing-production/hardware-requirements/,
    /rs/installing-upgrading/hardware-requirements,
]
---
{{< embed-md "hardware-requirements-embed.md" >}}

## Sizing considerations

### General database sizing {#general-sizing}

Factors to consider when sizing your database.

- **Dataset size** – Your limit should be greater than your dataset size to leave room for overhead.
- **Database throughput** – High throughput needs more shards, leading to a higher memory limit.
- [**Modules**]({{<relref "/stack">}}) – Using modules with your database consumes more memory.
- [**Database clustering**]({{<relref "/rs/databases/durability-ha/clustering">}}) – Allows you to spread your data into shards across multiple nodes.
- [**Database replication**]({{<relref "/rs/databases/durability-ha/replication">}}) – Enabling replication doubles memory consumption.

### Active-Active database sizing {#active-active-sizing}

Additional factors for sizing Active-Active databases:

- [**Active-Active replication**]({{<relref "/rs/databases/active-active">}}) – Requires double the memory of regular replication, which can be up to two times (2x) the original data size per instance.
- [**Database replication backlog**]({{<relref "/rs/databases/durability-ha/replication#database-replication-backlog">}}) – For synchronization between shards. By default, this is set to 1% of the database size.
- [**Active-Active replication backlog**]({{<relref "/rs/databases/active-active/manage#replication-backlog">}}) – For synchronization between clusters. By default, this is set to 1% of the database size.

{{<note>}}
Active-Active databases have a lower threshold for activating the eviction policy, because it requires propagation to all participating clusters. The eviction policy starts to evict keys when one of the Active-Active instances reaches 80% of its memory limit.
{{</note>}}

### Redis on Flash database sizing {#redis-on-flash-sizing}

Additional factors for sizing Redis on Flash databases:

- [**Database persistence**]({{<relref "/rs/databases/configure/database-persistence#redis-on-flash-data-persistence">}}) – Redis on Flash uses dual database persistence where both the primary and replica shards persist to disk. This may add some processor and network overhead, especially in cloud configurations with network-attached storage.

