---
Title: Unidirectional Replication with Replica of
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
**Replica Of** is a feature of Redis Enterprise Software (RS) where an
administrator designates a database to be a replica (destination) of one
or more databases (sources). Once you have done so and the initial data
load from source to destination is completed, all write commands are
synchronized from the source(s) to the destination. This allows you to
keep a database (destination) that is an exact replica of a database.

ReplicaOf is uni-directional replication between databases, either
within a cluster or between clusters. It should not be confused with
[Geo-Replication via
CRDBs]({{< relref "/rs/administering/intercluster-replication/crdbs.md" >}}),
which is bi-directional replication between N+1 databases on separate,
possibly geo-located, clusters.

This configuration can be very useful, for example, if you would like to
distribute the read load of your application across multiple databases.
In addition, this feature can be used for carrying out a one-time
synchronization of a database, either within RS or external to RS, to
another database.

**Warning:** Configuring a database as a replica of the database that it replicates
creates a cyclical replication and is not supported.

The *Replica of* is defined in the context of the destination database
by specifying the source databases.

A destination database can have a maximum of thirty-two (32) source
databases.

If only one source is defined, then the command execution order in the
source is kept in the destination. However, when multiple sources are
defined, commands that are replicated from the source databases are
executed in the order in which they reach the destination database. As a
result, commands that were executed in a certain order when compared
across source databases might be executed in a different order on the
destination database.

**Note:** The *Replica of* feature should not be confused with the
in-memory [Database
replication]({{< relref "/rs/concepts/high-availability/replication.md" >}})
feature, which is used for creating a master / slave configuration that
enables ensuring database high-availability.

For a quick overview of ReplicaOf capabilities watch this quick video.

{{< youtube AG-XGn7BQkQ >}}

## Replica of sources

RS has a security mechanism in which an internal admin password is
assigned to each database. This password helps protect the database from
being used as a replica source and is required in order to define
another database as a replica target of this database.

The source databases can be located in the same Redis Enterprise
Software (RS) as the destination database, in a different RS, or they
can be Redis databases that are not part of an RS.

- When a source database is from within RS, the source URL has the
    following format:
    \[database name\]: redis://admin:\[internal database
    password\]@\[database endpoint with port\] where the internal
    database password is the password automatically assigned and
    populated by RS. In the RS management UI, when you enter the textbox
    to define a replica source from within the target database page, the
    list of existing databases is shown with the appropriate URL,
    including the internal admin password, already set up.
- When a source database is from a different RS, the source URL has
    the same exact format as indicated above (except for the
    **\[database name\]:** prefix), but in this case, the URL does not
    show up as an option in the UI. In order to configure the target
    database as a replica of a database from a different RS, you need to
    extract the source database URL, including the internal admin
    password, from the source database. This can be done in the UI from
    the source database page by clicking the **Get Replica of source
    URL** link next to the Endpoint field. In addition, you can
    regenerate the internal admin password from the same UI. If you
    regenerate the internal admin password, any existing replica
    destinations already configured will stop working until you update
    them.
    - **Compression:** when a source database is located on a different
    Redis Enterprise Software cluster, there is also an option to enable
    compression of the data being replicated. For additional details,
    refer to the ["Replica of" data
    compression]({{< relref
    "/rs/administering/intercluster-replication/replica-of.md#data-compression-for-replica-of"
    >}}) section.
- When a source database is external to a Redis Enterprise Software
    cluster, the source URL has the following format:
    redis://:\[redis password\]@\[hostname\]:\[port\] where the password
    is the Redis password assigned by the user, represented with URL
    encoding escape characters. If no password was defined for the
    database, the following format should be used:
    redis://hostname:port.

When multiple sources are defined there is no meaning to the order in
which they are defined or presented.

If you make changes to the definition of the sources (such as editing,
adding or deleting a source), then the synchronization process is
restarted from scratch for all the source databases.

**Note:** If you used the mDNS protocol when naming the cluster name
(FQDN), make sure that the client mDNS perquisites are met in order for the
*Replica of* feature to work. For additional details, refer to the
[Client prerequisites for
mDNS]({{< relref "/rs/installing-upgrading/configuring/mdns.md" >}}).

## Replication process

When a database is defined as a replica of another database, all its
existing data is deleted and replaced by data that is loaded from the
source database.

Once the initial data load is completed, an ongoing synchronization
process takes place to keep the destination always synchronized with its
source. During the ongoing synchronization process, there is a certain
delay between the time when a command was executed on the source and
when it is executed on the destination. This delay is referred to as the
**Lag**.

When a **synchronization error** occurs, then depending on the error
type, **the process might stop**, or it might continue running on the
assumption that the error will be automatically resolved. See more
details below.

In addition, **the user can manually stop the synchronization process**.

When the process is in the stopped state - whether stopped by the user
or by the system - the user can restart the process. **Restarting the
process causes the synchronization process to flush the DB and restart
the process from the beginning**.

### Replica of status

The replication process can have the following statuses:

- **Syncing** - indicates that the synchronization process has
    started from scratch. Progress is indicated in percentages (%).
- **Synced** - indicates that the initial synchronization process was
    completed and the destination is synchronizing changes on an ongoing
    basis. The **Lag** delay in synchronization with the source is
    indicated as a time duration.
- **Sync stopped** - indicates that the synchronization process is
    currently not running and the user needs to restart it in order for
    it to continue running. This status occurs if the user stops the
    process, or if certain errors arose that prevent synchronization
    from continuing without manual intervention. See more details below.

The statuses above are displayed for the source database. In addition, a
timestamp is shown on the source indicating when the last command from
the source was executed on the destination.

The system also displays the destination database status as an aggregate
of the statuses of all the sources.

**Note:** If you encounter issues with the *Replica of* process, refer
to the troubleshooting section [Replica of repeatedly
fails]({{< relref "/rs/administering/troubleshooting/replicaof-repeatedly-fails.md" >}}).

### Synchronization errors

Certain errors that occur during the synchronization process require
user intervention for their resolution. When such errors occur, the
synchronization process is automatically stopped.

For other errors, the synchronization process continues running on the
assumption that the error will be automatically resolved.

Examples of errors that require user intervention for their resolution
and that stop the synchronization process include:

- Error authenticating with the source database.
- Cross slot violation error while executing a command on a sharded
    destination database.
- Out-of-memory error that occurs on a source or on the destination
    database.

Example of an error that does not cause the synchronization process to
stop:

- Connection error with the source database. A connection error might
    occur occasionally, for example as result of temporary network
    issues that get resolved. Depending on the connection error and its
    duration the process might be able to start syncing from the last
    point it reached (partial sync) or require a complete
    resynchronization from scratch across all sources (full sync).

## Encryption

ReplicaOf supports the ability to encrypt uni-directional replication
communications between source and destination clusters utilizing TLS 1.2
based encryption. To enable this encryption, proceed through the
following steps:

{{%excerpt-include filename="rs/administering/designing-production/security/tls-configuration.md" %}}

### Configuring TLS for Replica Of on the destination database

To enable TLS for Replica Of in the destintation database:

1. Edit the 'Replica of' section of the destination Database to point
    the source Database and press the 'Enable TLS Authentication' icon:
    ![Replica-of
    Destination](/images/rs/Screen-Shot-2018-03-29-at-10.48.18-PM.png?width=1608&height=178)
    Replica-of Destination
2. From the *source cluster*, copy the "Proxy
    Certificate" (located under **settings**-\> **general**) and paste
    it as the **Source Cluster Certificate** for the destination
    Database:
    ![Replica-of Destination -
    Certificate](/images/rs/Screen-Shot-2018-03-29-at-10.49.55-PM.png?width=1596&height=626)
    Replica-of Destination - Certificate
3. Press the **Continue** button, save the certificate and **Update**
    the database changes.

## Data compression for Replica Of

When the *Replica of* is defined across different Redis Enterprise
Software clusters, it may be beneficial to compress the data that flows
through the network (depending on where the clusters physically reside
and the available network).

Compressing the data reduces the traffic and can help:

- Resolve throughput issues
- Reduce network traffic costs

Compressing the data does have trade-offs, which is why it should not
always be turned on by default. For example:

- It uses CPU and disk resources to compress the data before sending
    it to the network and decompress it on the other side.
- It takes time to compress and decompress the data which can increase
    latency.
- Replication is disk-based and done gradually, shard by shard in the
    case of a multi-shard database. This may have an impact on
    replication times depending on the speed of the disks and load on
    the database.
- If traffic is too fast and the compression takes too much time it
    can cause the replication process to fail and be restarted.

It is advised that you test compression out in a lower environment
before enabling it in production.

In the Redis Enterprise Software management UI, when designating a
*Replica of* source from a different Redis Enterprise Software cluster,
there is also an option to enable compression. When enabled, gzip
compression with level -6 is utilized.

## Database clustering (sharding) implications

If a **source** database is sharded, that entire database is treated as
a single source for the destination database.

If the **destination** database is sharded, when the commands replicated
from the source are executed on the destination database, the
destination database's hashing function is executed to determine to
which shard/s the command refers.

The source and destination can have different shard counts and functions
for placement of keys.
