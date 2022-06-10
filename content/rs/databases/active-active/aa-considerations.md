---
Title: Considerations for planning Active-Active databases
linktitle: Planning considerations
description: Information about Active-Active database to take into consideration while planning a deployment, such as compatibility, limitations, and special configuration.
weight: 61
alwaysopen: false
categories: ["RS"]
aliases: [
content/rs/databases/active-active/aa-considerations.md,
content/rs/databases/active-active/aa-considerations/,
]

---

In Redis Enterprise, Active-Active geo-distribution is based on [CRDT technology](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)(conflict-free replicated data type). Compared to databases without geo-distribution, Active-Active databases have more complex replication and networking, as well as a different data type.

Because of the complexities of Active-Active databases, there are  special considerations to keep in mind while planning, configuring, and writing applications for your Active-Active database.

See [Active-Active Redis]({{<relref "">}}) for more information about geo-distributed replication. For more info on other high availability features, see [Durability and high availability]({{<relref "">}}).

## Clusters

For Active-Active databases, you need to [set up your participating clusters]({{<relref "/rs/administering/new-cluster-setup.md">}}). You need at least two, but can connect with up to five participating clusters. You can [add or remove participating clusters]({{<relref "/rs/databases/active-active/manage-aa#participating-clusters/">}}) after database creation.

Changes made from the admin console to an Active-Active database configuration only apply to the cluster you are editing. For global configuration changes across all clusters, use the `crrdb-cli` command line utility.

### Hardware requirements

## Networking

Network requirements for Active-Active databases include:

- A VPN between each network that hosts a cluster with an instance (if your database spans WAN).
- At least two (but no more than five) participating clusters.
- A network connection to [several ports](#network-ports) on each cluster from all nodes in all participating clusters.
- A [network time service](#network-time-service) running on each node in all clusters.

Networking between the clusters must be configured before creating an Active-Active database. The setup will fail if there is no connectivity between the clusters.

### Network ports

Every node must have access to the REST API ports of every other node as well as other ports for proxies, VPNs, and the admin console. See [Network port configurations]({{<relref "/rs/administering/designing-production/networking/port-configurations.md">}}) for more details. These ports should be allowed through firewalls that may be positioned between the clusters.

### Network Time Service {#network-time-service}

Active-Active databases require a time service like NTP or Chrony to make sure the clocks on all cluster nodes are synchronized.
This is critical to avoid problems with internal cluster communications that can impact your data integrity.

See [Synchronizing cluster node clocks]({{<relref "/rs/administering/designing-production/synchronizing-clocks.md">}}) for more information.

## Memory limits


Redis Enterprise Software maintains a [replication backlog]({{<relref "/rs/databases/active-active/manage-aa#database-replication-backlog/">}}) for synchronization between shards and an [Active-Active CRDT replication backlog]({{<relref "/rs/databases/active-active/manage-aa#active-active-crdt-replication-backlog/">}}) for synchronization between clusters. This can range from 1MB to 250MB per shard. To configure the replication backlogs, see [Edit Active-Active database configuration]({{<relref "/rs/databases/active-active/manage-aa.md">}}).

### Redis Modules {#redis-modules}

Active-Active databases support only [compatible Redis modules]({{< relref "/modules/enterprise-capabilities.md" >}}).

- [RediSearch 2.x in Redis Enterprise Software 6.0 and higher]({{< relref "/modules/redisearch/redisearch-active-active.md" >}}).
- RedisGears

## Active-Active database limitations

- The RS admin console is limited to five participating clusters or instances in an Active-Active database.
- An existing database cannot be changed into an Active-Active database. To move data from an existing database to an Active-Active database, you must create a new Active-Active database and migrate the data.
- Active-Active databases require FQDNs or mDNS (development only). Discovery Service is not supported with Active-Active databases.
- Active-Active databases are not compatible with [Replica Of]({{< relref "/rs/databases/replica-of.md" >}}).
