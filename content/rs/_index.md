---
Title: Redis Enterprise Software (RS)
description: 
weight: 10
alwaysopen: false
---
This documentation covers both Redis Enterprise Software and 4.5 and
5.0. Anything that is not explicitly marked for 5.0, applies to 4.5
release as well.<!--more-->

+-----------------------------------+-----------------------------------+
| ### What is Redis Enterprise Soft | ### What does RS enable?          |
| ware?                             |                                   |
|                                   | RS's architecture supports        |
| Redis Enterprise Software (RS) is | multiple threaded Redis databases |
| based on the proven technology    | created for multiple users across |
| behind the [Redis Enterprise      | the same cluster infrastructure   |
| offering](/why-redis/redis-enterp | while keeping the databases       |
| rise/),                           | completely isolated from one      |
| used by thousands of customers.   | another. In addition, RS gives    |
| RS extends and provides advanced, | you the flexibility to run your   |
| enterprise-critical features to   | Redis database in multiple        |
| Redis.                            | configurations to accommodate     |
|                                   | your specific performance and     |
| You can install RS in your        | availability needs.               |
| environment of choice, whether    |                                   |
| for an on-premises data-center,   | [Learn more about Redis           |
| Docker, or your preferred cloud   | Enterprise Software               |
| platform. You have full control   | architecture.](/redis-enterprise- |
| of your data, clusters,           | documentation/concepts-architectu |
| databases, and configuration.     | re/overview/)                     |
|                                   |                                   |
| Note: The previous name of Redis  |                                   |
| Enterprise Software (RS) was      |                                   |
| "Redis Enterprise Pack" (RP) or   |                                   |
| "Redis Labs Enterprise Cluster"   |                                   |
| (RLEC). So you may see this on    |                                   |
| our website or other places.      |                                   |
+-----------------------------------+-----------------------------------+

+-----------------------------------+-----------------------------------+
| ### Redis on Flash                | ### Geo-Distributed Active-Active |
|                                   |  Conflict-free Replicated Redis D |
| Redis on Flash offers the unique  | atabases (CRDB)                   |
| ability to have very large Redis  |                                   |
| database but at significant cost  | Developing globally distributed   |
| savings. Where standard Redis     | applications can be challenging,  |
| databases must all be in RAM, RoF | as developers have to think about |
| enables your Redis databases to   | race conditions and complex       |
| span both RAM and dedicated flash | combinations of events under      |
| memory (SSD) to "hot" values in   | geo-failovers and cross-region    |
| RAM and "warm" values on flash.   | write conflicts. CRDBs simplify   |
| All of this while guaranteeing    | developing such applications by   |
| 100% compatibility with all Redis | directly using built-in smarts    |
| clients, data types, and          | for handling conflicting writes   |
| commands, at just a fraction of   | based on the data type in use.    |
| the overall cost.                 | Instead of depending on just      |
|                                   | simplistic "last-writer-wins"     |
| [Learn more about Redis on        | type conflict resolution,         |
| Flash.]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) | geo-distributed CRDBs combines    |
|                                   | techniques defined in CRDT        |
|                                   | (conflict-free replicated data    |
|                                   | types) research with Redis types  |
|                                   | to provide smart and automatic    |
|                                   | conflict resolution based on the  |
|                                   | data types intent.                |
|                                   |                                   |
|                                   | [Learn more                       |
|                                   | about CRDBs.](/redis-enterprise-d |
|                                   | ocumentation/concepts-architectur |
|                                   | e/intercluster-replication/)      |
+-----------------------------------+-----------------------------------+

Major Features
==============

### Seamless scalability

With RS, a dataset can grow beyond the largest node in the cluster and
be processed by any number of cores. By creating a Redis cluster and
sharding your dataset across multiple nodes (using a sharding policy of
choice), RS overcomes the memory limitations of a single node and the
performance limitations of a single core. Dynamic scaling is easy; you
can increase your dataset's maximum size by simply changing the memory
limit setting, or increase the number of shards with the click of a
button. Scaling, upgrades, and downgrades do not incur any downtime.\

### True high availability

In addition to replicating a database within the same data center, you
can also replicate a dataset across data-centers and across regions, to
achieve high availability, disaster recovery, and performance benefits.
If a node fails, the data is seamlessly served from a replacement node
in the cluster without human intervention. RS technology is capable of
automatically handling node failures, Redis failures, and proxy
failures. Auto-failover is carried out within a few seconds. [Learn more
about High
Availability]({{< relref "/rs/concepts/high-availability/_index.md" >}})
in RS.\

### Built-in data persistence, backups, and replication

RS enables the use of Redis AOF (Append-Only File) every second or on
every write, or (RDB) snapshots of your dataset every 1, 6, or 12 hours
to persistent to storage. In addition, you can back up your dataset
periodically or ad-hoc to an FTP server or AWS S3. Other cloud storage
options, such as Azure Geo-Redundant Storage, SoftLayer Object Storage,
and Google Cloud Storage will be added in a future release.

### Predictable high-performance

Datasets are processed by multiple cores to guarantee the best
performance. In addition, RS uses advanced mechanisms to guarantee
high-performance, even during intensive disk-access scenarios.

### Multiple dedicated databases

You can run multiple databases over a single RS deployment, each running
in a dedicated process and in a non-blocking manner.

### Unlimited database connections

Use as many database connections as you want.

### Full-featured management UI

RS provides a full-featured and easy-to-use management user interface
(UI) for setting up, configuring and monitoring the cluster and each
database. In addition, RS provides configurable alert notifications for
important events at the single database level as well as the cluster
level.

### Cluster automation

RS's fully-managed solution takes care of all your database scaling,
data-persistence tuning, shards migration and auto-failover needs.

### 24/7 support

Paying customers enjoy our premium 24/7 support via Redis Labs' online
or phone helpdesk.
