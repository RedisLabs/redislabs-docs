---
Title: FAQs
description: Answers frequently asked questions regarding Redis Enterprise Software.
weight: 70
alwaysopen: false
categories: ["RS"]
---
Here are some frequently asked questions about Redis Enterprise Software.

## Features and terminology

### What exactly is Redis Enterprise?

Redis Labs has enhanced open source Redis with a technology layer that encapsulates open source Redis, while fully supporting all its commands, data structures and modules. 

Redis Enterprise adds exceptional flexibility, stable high performance and unmatched resilience, as well as multiple deployment choices (public and private clouds, on-premises, hybrid, RAM-Flash combination), topology (active-active, active-passive, active-replica) and support for very large dataset sizes. 

This enhanced and exponentially more powerful database platform is Redis Enterprise.

Learn more about [Redis Enterprise](https://redislabs.com/why-redis/redis-enterprise/).

### Are you fully compatible with open source Redis?

Redis Enterprise Software is fully [compatible with open source Redis]({{<relref "rs/concepts/compatibility">}}).

### Can I keep my data safe and always available?
Redis Enterprise Software offers a comprehensive suite of
high-availability provisions, including in-memory replication,
persistent storage, and backups.

### What do you mean by the term shard?

A shard is any type of provisioned Redis instance, such as a master
copy, slave copy, database shard that is part of a clustered database,
etc.

To learn more, see [Database clustering]({{<relref "rs/concepts/high-availability/clustering.md">}}).

### What client can I use to connect to the databases in Redis Enterprise Software

Redis Enterprise Software works with all existing standard clients; it does not require you to use any special clients.

To learn more, see [Develop with Redis clients]({{<relref "rs/references/client_references/">}}).

If you're already using open-source Redis, you can use existing Redis client and code, as they work directly against a Redis Software cluster.  Simply point your existing standard Redis client and code
connection string to the new cluster and then scale as needed.

### What am I allowed to do with the trial version?

You can use, experience and administer the full capabilities of Redis
Enterprise Software, but you may not deploy it to a production
environment. 

In addition, the trial version allows a maximum of four
shards and is limited to thirty (30) days of use after initial
installation on the first server in the cluster. 

After the thirty day
trial, the cluster shifts to read-only status. 

The free version does
not provide the same support options as the paid version. 

Finally, no
service level agreement (SLA) is provided with the trial version. To continue operation of the
cluster with full capabilities, you must purchase a [subscription
cluster key from Redis Labs](https://redislabs.com/pricing).

### What is the payment schedule and terms?

General information about pricing and terms are available on our [main website](https://redislabs.com/redis-enterprise-software/pricing/).

For individual assistance, contact us at <sales@redislabs.com>.

## Technical capabilities

### How many Redis databases can I create and manage?

The number of databases is unlimited. The limiting factors are the
available memory in the cluster and the number of shards in the
subscription.

Note that the impact of the specific database configuration on the 
number of shards it consumes. For example:

- Enabling database replication, without enabling database clustering, 
  creates two shards: a primary (also called a _master_) shard and a replica shard.

- Enabling database clustering creates as many database shards as you 
  configure.

- Enabling both database replication and database clustering creates 
  double the number of database shards you configure.

### What happens when my database fills up?

This is explained in the _What happens if Redis runs out of memory?_ question of the open source [Redis FAQ](https://redis.io/topics/faq):

<blockquote>...[you] can use the "maxmemory" option in the config file to put a
limit to the memory Redis can use. If this limit is reached Redis
starts to reply with an error to write commands (but continues to
accept read-only commands), or you can configure it to evict keys when
the max memory limit is reached in the case you are using Redis for
caching.</blockquote>

The Redis Enterprise Software admin console lets you set `maxmemory` by controlling the **Memory limit** property.  You can also set the eviction policy by setting it to any of the standard Redis
behaviors, without interrupting database operations.
