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
With CRDBs, applications can read and write to the same data set from different geographical locations
seamlessly and with latency less than 1 ms, without changing the way the application connects to the database.

CRDBs also provide disaster recovery and accelerated data read-access for geographically distributed users.

Note: CRDBs do not replicate the entire database, only the data. Any
database configurations, Lua scripts, etc. are outside the scope of
CRDBs.

## Managing Conflict-free Replicated Databases (CRDBs) {#managing-conflictfree-replicated-databases-crdbs}

Multi-Master Replication is configured to run on a per database basis.
Furthermore, it utilizes a new type of Redis database called a
Conflict-Free Replicated Database (CRDB). There are two types of CRDBs
in Redis Enterprise Software (RS), a global CRDB (gCRDB) and a CRDB
Instance. There are N+1 CRDB Instances that make up a gCRDB, with each
CRDB Instance on a RS cluster.

Before configuring a CRDB, you will need:

- All RS clusters hosting a CRDB must be [set up per the standard
    documentation]({{< relref "/rs/administering/cluster-operations/new-cluster-setup.md" >}})
    and configured to utilize FQDNs via DNS for connections to the
    cluster. CRDBs are not compatible with the [Discovery
    Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}})for
    inter-cluster communications, but are compatible with local
    application connections.
- Configure the network so that all nodes in each cluster are able to
    connect to the Proxy (you can choose which port you want and then
    set the proxy to run on it when you create the CRDB) and cluster's
    admin port (9443) on all destination clusters over the network and
    vice versa.
- If the CRDB spans a WAN, establish a VPN between each of the
    cluster's networks before setting up a CRDB.
- Confirm that all clusters are on the same version of Redis
    Enterprise Software.
- Confirm that a network time service is configured and running on
    each node in all clusters. See [Network Time
    Service](#network-time-service-ntp-or-chrony).

### CRDB Current Limitations

1. RS is limited to five Participating Clusters or CRDB Instances per
    CRDB.
1. An existing database cannot be configured to be a CRDB and visa
    versa. You must create a new CRDB and migrate your existing data.
1. CRDBs do not currently interoperate with other [modules]({{< relref "/rs/developing/modules/_index.md" >}}). You must use only the data types supported by
    CRDBs.
1. Access to CRDBs does not work with IP based connection management
    via the Discovery Service, it requires the setup and use of FQDNs or
    mDNS(development only).
1. A CRDB on Redis 5 can use Redis on Flash.
1. While similar to
    [ReplicaOf]({{< relref "/rs/administering/active-passive.md" >}}),
    CRDBs are not compatible with that feature. ReplicaOf is a one-way
    replication, while CRDB utilize multi-master replication.
1. [OSS cluster API]({{< relref "/rs/concepts/data-access/oss-cluster-api.md" >}}) is not supported
    for use with CRDB.

### Network Time Service (NTP or Chrony)

Utilizing a time service like NTP or Chrony is required for CRDBs. It is
critical to minimize time drift both intercluster and intracluster for
CRDBs on an ongoing basis. There may be times, however rare, that the OS
system time is relied upon for conflict resolution between CRDB
Instances. The built-in vector clocks tell Redis Enterprise Software the
order of operations, or just "don't know" which means for a given object
the data operations were concurrent. In rare cases where there is no
option to intelligently handle conflicting writes, OS timestamps may be
used in resolving the conflict. For example, "string type" may use
timestamps to resolve conflicts depending on circumstances.

As part of the Redis Enterprise Software install, there is a procedure
that checks if there is a network time service daemon installed,
running, and configured to start on boot. When installing Redis
Enterprise Software, the installation process will ask if you want to
"tune the system". Answer yes to that and you will be prompted if you
would like to install/configure a network time service. Answer yes to
that as well. The install will appear something like this.

```src
2017-10-30 11:24:07 [?] Do you want to automatically tune the system for best performance [Y/N]? Y
2017-10-30 11:24:15 [?] Cluster nodes must have their system time synchronized.
Do you want to set up NTP time synchronization now [Y/N]? Y
2017-10-30 11:24:19 [.] Making sure NTP is installed and time is set.
```

The installation will install if necessary and set the service to
auto-start.

### Network Configurations

Redis Enterprise Software assumes that networking between the clusters
is already configured when you create a CRDB. For security purposes, it
is highly recommended that a secure VPN is configured between all
clusters that are part of the CRDB. If it is not set up yet, the setup
of the CRDB will immediately fail.

The use of [DNS and
FQDNs]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}})
(Fully Qualified Domain Names) is required as MMR is not compatible with
the [Discovery
Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}})
for connections. FQDNs must be set up for each cluster per the [regular
Redis Enterprise Software cluster
configuration]({{< relref "/rs/administering/_index.md" >}})
before a CRDB can be configured.

### Network Ports

For initial configuration and ongoing maintenance of a CRDB, each node
of every cluster must have access to the Rest API ports of each of the
other cluster's nodes.

For synchronization, CRDBs operate over the standard endpoint ports. For
example, when you created the CRDB, if you configured its endpoint port
number to be 12845, that is the endpoint of the proxy for that CRDB on
each cluster and must be opened.

See [Network Port
Configuration]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}})
for specifics on what ports should be open for VPNs and Security groups.

### **Data Persistence**

After creating CRDB instances on each participating cluster, you can
individually set your data persistence configuration. Just like regular
Redis Enterprise databases, CRDB data persistence options include AOF
(Append-Only File) data persistence and
snapshot.

### Syncer process

Each node in a cluster containing a CRDB Instance hosts a process called
syncer. Its job is to synchronize data from other Instances of the CRDB.
It connects to the other cluster's proxy and reads data from that
database, brings it back and then writes it to the appropriate master
shard of that database.
