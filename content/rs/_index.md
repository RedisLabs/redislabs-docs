---
Title: Redis Enterprise Software (RS)
description:
weight: 10
alwaysopen: false
categories: ["RS"]
---

## What is Redis Enterprise Software?

Redis Enterprise Software (RS) is based on the proven technology behind the [Redis Enterprise offering](https://redislabs.com/why-redis/redis-enterprise/), which is used by thousands of customers. RS extends and provides advanced, enterprise-critical features to Redis.

You can install RS in your production environment of choice, whether for an on-premises data-center or your preferred cloud platform.
For testing, you can also use pre-installed Docker containers.
Either way, you have full control of your data, clusters, databases, and configuration.

Note: The previous name of Redis Enterprise Software (RS) was “Redis Labs Enterprise Cluster” (RLEC).

## What are the benefits of using RS?

The RS architecture supports multiple threaded Redis databases created for multiple users across the same cluster infrastructure while keeping the databases completely isolated from one another. In addition, RS gives you the flexibility to run your Redis database in multiple configurations to accommodate your specific performance and availability needs.

[Learn more about Redis Enterprise Software architecture.]({{< relref "/rs/concepts/_index.md" >}})

## Redis on Flash

Redis on Flash offers the unique ability to have a very large Redis database but at significant cost savings. Where standard Redis databases must all be in RAM, RoF enables your Redis databases to span both RAM and dedicated flash memory (SSD) to “hot” values in RAM and “warm” values on flash. All of this while guaranteeing 100% compatibility with all Redis clients, data types, and commands, at just a fraction of the overall cost.

[Learn more about Redis on Flash.]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})

## Geo-Distributed Active-Active Conflict-free Replicated Redis Databases (CRDB) {#geodistributed-activeactive-conflictfree-replicated-redis-databases-crdb}

Developing globally distributed applications can be challenging, as developers have to think about race conditions and complex combinations of events under geo-failovers and cross-region write conflicts. CRDBs simplify the development of such applications by directly using built-in smarts for handling conflicting writes based on the data type in use. Instead of depending on simplistic “last-writer-wins” conflict resolution, geo-distributed CRDBs combine techniques defined in CRDT (conflict-free replicated data types) research with Redis types to provide smart and automatic conflict resolution based on the data type's intent.

[Learn more about CRDBs.]({{< relref "/rs/concepts/intercluster-replication.md" >}})

## Additional Features

{{< tabs tabTotal="7" tabID="1" tabName1="Seamless scalability" tabName2="True high availability" tabName3="Data durability" tabName4="Predictable high-performance" tabName5="Dedicated databases" tabName6="Full management UI" tabName7="24/7 support">}}
{{< tab tabNum="1" >}}

With RS, a dataset can grow beyond the largest node in the cluster and
be processed by any number of cores. By creating a Redis cluster and
sharding your dataset across multiple nodes (using a sharding policy of
choice), RS overcomes the memory limitations of a single node and the
performance limitations of a single core. Dynamic scaling is easy; you
can increase your dataset's maximum size by simply changing the memory
limit setting or by increasing the number of shards, all with the click of a
button. Scaling, upgrades, and downgrades do not incur any downtime.

{{< youtube 6iVpOg8V5lQ >}}

{{< /tab >}}
{{< tab tabNum="2" >}}

In addition to replicating a database within the same data center, you
can also replicate a dataset across data-centers and across regions to
achieve high availability, disaster recovery, and performance benefits.
If a node fails, the data is seamlessly served from a replacement node
in the cluster without human intervention. RS technology is capable of
automatically handling node failures, Redis failures, and proxy
failures. Auto-failover is carried out within a few seconds.

[Learn more about High Availability in RS]({{< relref "/rs/concepts/high-availability/_index.md" >}}).

{{< youtube qIZuW_8bPtQ >}}

{{< /tab >}}
{{< tab tabNum="3" >}}

RS enables the use of Redis AOF (Append-Only File) every second or on
every write, or (RDB) snapshots of your dataset every 1, 6, or 12 hours
to persistent storage. In addition, you can back up your dataset
periodically or ad-hoc to an FTP server or AWS S3. Other cloud storage
options, such as Azure Geo-Redundant Storage, SoftLayer Object Storage,
and Google Cloud Storage, are planned to be added in a future release.

{{< /tab >}}
{{< tab tabNum="4" >}}

Datasets are processed by multiple cores to guarantee the best
performance. In addition, RS uses advanced mechanisms to guarantee
high-performance, even during intensive disk-access scenarios.

{{< /tab >}}
{{< tab tabNum="5" >}}

You can run multiple databases over a single RS deployment,
each running in a dedicated process and in a non-blocking manner.
Use as many database connections as you want.

RS's fully-managed solution takes care of all your database scaling,
data-persistence tuning, shards migration and auto-failover needs.

{{< /tab >}}
{{< tab tabNum="6" >}}

RS provides a full-featured and easy-to-use management user interface
(UI) for setting up, configuring and monitoring the cluster and each
database. In addition, RS provides configurable alert notifications for
important events at the single database level as well as the cluster
level.

{{< /tab >}}
{{< tab tabNum="7" >}}

Paying customers enjoy our premium 24/7 support through Redis Labs online
or phone support services.

{{< /tab >}}
{{< /tabs >}}
