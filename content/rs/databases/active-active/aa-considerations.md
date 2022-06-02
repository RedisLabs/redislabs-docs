---
Title: Considerations for planning an Active-Active database
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

In Redis Enterprise, Active-Active geo-distribution is based on [CRDT technology](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)(conflict-free replicated data type). Compared to databases without geo-distribution, Active-Active databases have more complex replication and networking, as well as a different data type. Because of these complexities, there are  special considerations to keep in mind while planning your database and while writing applications for your database.

See Active-Active Redis for more information on the architecure. For more info on other high availability features, see Durability and high availability.

Before configuring an Active-Active database, you must:

- If the Active-Active database spans a WAN, establish a VPN between each network that hosts a cluster with an instance.
- Setup [RS clusters]({{< relref "/rs/administering/new-cluster-setup.md" >}}) for each Active-Active database instance.

    All clusters must have the same Redis Enterprise Software version.
- Configure [FQDNs in a DNS server]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}}) for connections to the cluster.

    Active-Active databases are not compatible with the [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) for inter-cluster communications,
    but are compatible with local application connections.
- Configure the network so that all nodes in each cluster can connect to the proxy port and the cluster admin port (9443) of each cluster.
- Confirm that a [network time service](#network-time-service-ntp-or-chrony) is configured and running on each node in all clusters.

### Redis Modules on Active-Active Databases {#redis-modules-on-activeactive-databases}
Active-Active databases support only compatible [Redis modules]({{< relref "/modules/_index.md" >}}).
- [RediSearch 2.x in Redis Enterprise Software (RS) 6.0 and higher]({{< relref "/modules/redisearch/redisearch-active-active.md" >}}). 
- RedisGears

## Active-Active database current limitations

1. The RS admin console is limited to five participating clusters or instances in an Active-Active database.
1. An existing database cannot be changed into an Active-Active database. To move data from an existing database to an Active-Active database, you must create a new Active-Active database and migrate the data.
1. Active-Active databases require FQDNs or mDNS (development only). Discovery Service is not supported with Active-Active databases.
1. Active-Active databases are not compatible with [Replica Of]({{< relref "/rs/databases/replica-of.md" >}}).

## Network Time Service (NTP or Chrony)

For Active-Active databases, you must use a time service like NTP or Chrony.
This is critical to minimize time drift both intercluster and intracluster for Active-Active databases on an ongoing basis.

There may be times that the OS system time is used for conflict resolution between instances of an Active-Active database, although that rarely happens.
The built-in vector clocks tell RS the order of operations, or identifies that the data operations were concurrent.
When there is no option to intelligently handle conflicting writes, OS timestamps are used in resolving the conflict.
For example, in certain cases "string type" uses timestamps to resolve conflicts.

The RS installation checks if there is a network time service installed, running, and configured to start on boot.

- If no network time service is found, the installation asks if you want to "tune the system".
- If you answer yes, you are prompted to install and configure a network time service.
- If you answer yes, the NTP is installed.

For example:

```sh
2017-10-30 11:24:07 [?] Do you want to automatically tune the system for best performance [Y/N]? Y
2017-10-30 11:24:15 [?] Cluster nodes must have their system time synchronized.
Do you want to set up NTP time synchronization now [Y/N]? Y
2017-10-30 11:24:19 [.] Making sure NTP is installed and time is set.
```

## Network configurations

RS assumes that networking between the clusters is already configured when you create an Active-Active database.
For security purposes, we recommend that you configure a secure VPN between all clusters that host an instance of an Active-Active database.
The setup of the Active-Active database fails if there is no connectivity between the clusters.

## Network ports

For initial configuration and ongoing maintenance of an Active-Active database, every node must have access to the REST API ports of every other node.
You must also open ports for [VPNs and Security groups]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}).

For synchronization, Active-Active databases operate over the standard endpoint ports.
The endpoint port that you configure when you create the Active-Active database is the endpoint port of the proxy for that Active-Active database on each cluster.

### Data persistence

You can set the data persistence configuration, including AOF (Append-Only File) data persistence and snapshot,
for each participating cluster.