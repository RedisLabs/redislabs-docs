---
Title: Active-Active Geo-Distributed Redis (CRDB)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/intercluster-replication/crdbs/
---
In Redis Enterprise, active-active geo-distribution is based on [CRDT technology](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type).
The Redis Enterprise implementation of CRDT is called Conflict-Free Replicated Database (CRDB).
With CRDBs, applications can read and write to the same data set from different geographical locations seamlessly and with latency less than 1 ms,
without changing the way the application connects to the database.

CRDBs also provide disaster recovery and accelerated data read-access for geographically distributed users.

{{% note %}}
CRDBs do not replicate the entire database, only the data.
Database configurations, Lua scripts, and other configurations are not replicated.
{{% note %}}

## Considerations for Conflict-free Replicated Databases (CRDBs) {#considerations-for-conflictfree-replicated-databases-crdbs}

CRDBs are based on multi-master replication that is configured to run on each database.
A CRDB is made up of instances of the data that are each stored on an RS cluster.

Before configuring a CRDB, you must:

- If the CRDB spans a WAN, establish a VPN between each networks that hosts a cluster with a CDRB instance.
- Setup [RS clusters]({{< relref "/rs/administering/cluster-operations/new-cluster-setup.md" >}}) for each CRDB instance.

    All clusters must have the same RS version.
- Configure [FQDNs in a DNS server]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}}) for connections to the cluster.

    CRDBs are not compatible with the [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) for inter-cluster communications,
    but are compatible with local application connections.
- Configure the network so that all nodes in each cluster can connect to the proxy port and the cluster admin port (8080) of each cluster.
- Confirm that a [network time service](#network-time-service-ntp-or-chrony) is configured and running on each node in all clusters.

### CRDB Current Limitations

1. RS is limited to five Participating Clusters or CRDB Instances per CRDB.
1. An existing database cannot modified to be a CRDB.
    To move existing data to a CRDB you must create a new CRDB and migrate your data.
1. CRDBs do not support [Redis modules]({{< relref "/rs/developing/modules/_index.md" >}}).
1. CRDBs require FQDNs or mDNS (development only). Discovery Service is not supported with CRDBs.
1. Only CRDB on Redis 5 can use Redis on Flash.
1. CRDBs are not compatible with [Replica Of]({{< relref "/rs/administering/active-passive.md" >}}).

    ReplicaOf is a one-way replication, while CRDB utilize multi-master replication.
1. [OSS cluster API]({{< relref "/rs/concepts/data-access/oss-cluster-api.md" >}}) is not supported with CRDB.

### Network Time Service (NTP or Chrony)

For CRDBs, you must use a time service like NTP or Chrony.
This is critical to minimize time drift both intercluster and intracluster for CRDBs on an ongoing basis.

There may be times that the OS system time is used for conflict resolution between CRDB Instances, although that rarely happens.
The built-in vector clocks tell RS the order of operations, or identifies that the data operations were concurrent.
When there is no option to intelligently handle conflicting writes, OS timestamps are used in resolving the conflict.
For example, in certain cases "string type" uses timestamps to resolve conflicts.

The RS installation checks if there is a network time service installed, running, and configured to start on boot.

- If no network time service is found, the installation asks if you want to "tune the system".
- If you answer yes, you are prompted to install and configure a network time service.
- If you answer yes, the NTP is installed.

For example:

```src
2017-10-30 11:24:07 [?] Do you want to automatically tune the system for best performance [Y/N]? Y
2017-10-30 11:24:15 [?] Cluster nodes must have their system time synchronized.
Do you want to set up NTP time synchronization now [Y/N]? Y
2017-10-30 11:24:19 [.] Making sure NTP is installed and time is set.
```

### Network Configurations

RS assumes that networking between the clusters is already configured when you create a CRDB.
For security purposes, recommend that you configure a secure VPN between all clusters that host a CRDB instance.
The setup of the CRDB fails if there is no connectivity between the clusters.

### Network Ports

For initial configuration and ongoing maintenance of a CRDB, every nude must have access to the REST API ports of every other node.
You must also open ports for [VPNs and Security groups]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}).

For synchronization, CRDBs operate over the standard endpoint ports.
The endpoint port that you configure when you create the CRDB is the endpoint port of the proxy for that CRDB on each cluster.

### Data Persistence

You can set the data persistence configuration, including AOF (Append-Only File) data persistence and snapshot,
for each participating cluster.

### Syncer process

Each node in a cluster containing a CRDB instance hosts a process called syncer.
The syncer process synchronizes data from other instances of the CRDB as follows:

- The syncer connects to the other cluster proxy.
- The syncer reads data from that database.
- The syncer writes the data to the master shard of that database.
