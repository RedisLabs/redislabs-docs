---
Title: FAQs
description:
weight: 70
alwaysopen: false
categories: ["RS"]
---
Here are some frequently asked questions about Redis Enterprise Software.

## Features and Terminology

<!-- Also in RC -->
{{%expand "What exactly is Redis Enterprise?" %}}
Redis Labs has enhanced open source Redis with a technology layer that encapsulates open source Redis, while fully supporting all its commands, data structures and modules. It adds exceptional flexibility, stable high performance and unmatched resilience, as well as multiple deployment choices (public and private clouds, on-premises, hybrid, RAM-Flash combination), topology (active-active, active-passive, active-replica) and support for very large dataset sizes. This enhanced and exponentially more powerful database platform is Redis Enterprise.

Learn more about [Redis Enterprise](https://redislabs.com/why-redis/redis-enterprise/).
{{% /expand%}}

{{%expand "Are you fully compatible with open source Redis?" %}}
Yes we are. Not only are we are the home of Redis, but most of Redis’ core engineers also work for Redis Labs! We contribute extensively to the open source Redis project. As a rule, we adhere to the open source’s specifications and make every effort to update our service with its latest versions.

That said, the following Redis features are not applicable in the context of our service:

- Shared databases aren’t supported in our service given their potential negative impact on performance. We recommend using dedicated databases instead ([read this post for more information](https://redislabs.com/blog/benchmark-shared-vs-dedicated-redis-instances/)). Therefore, the following commands are blocked and will produce an error when invoked:
    - [MOVE](http://redis.io/commands/move)
    - [SELECT](http://redis.io/commands/select)
- Data persistence and backups are managed from the service’s web interface, so the following commands are blocked:
    - [BGREWRITEAOF](http://redis.io/commands/BGREWRITEAOF)
    - [BGSAVE](http://redis.io/commands/bgsave)
    - [LASTSAVE](http://redis.io/commands/LASTSAVE)
    - [SAVE](http://redis.io/commands/SAVE)
- Since replication is managed automatically by the service and since it could present a security risk, the following commands are blocked:
    - [MIGRATE](http://redis.io/commands/MIGRATE)
    - [REPLCONF](http://redis.io/commands/REPLCONF)
    - [SLAVEOF](http://redis.io/commands/SLAVEOF)
    - [SYNC](http://redis.io/commands/SYNC)/[PSYNC](http://redis.io/commands/PSYNC)
- Redis Labs clustering technology is different than the open source Redis Cluster and supports clustering in a seamless manner that works with all standard Redis clients. As a result, [all Cluster related commands](http://redis.io/commands#cluster) are blocked and will produce an error when invoked.
- Redis Labs clustering technology allows [multiple active proxies]({{< relref "/rs/administering/designing-production/networking/multiple-active-proxy.md" >}}). As a result, the CLIENT ID command cannot guarantee incremental IDs between clients who connect to different nodes under multi proxy policies.
- Commands that aren’t relevant for a hosted Redis service are blocked:
    - [CONFIG RESETSTAT](http://redis.io/commands/CONFIG-RESETSTAT)
    - [DEBUG OBJECT](http://redis.io/commands/DEBUG-OBJECT)/[SEGFAULT](http://redis.io/commands/DEBUG-SEGFAULT)
    - [OBJECT](http://redis.io/commands/OBJECT)
    - [SHUTDOWN](http://redis.io/commands/SHUTDOWN)
    - [CLIENT PAUSE](http://redis.io/commands/CLIENT-PAUSE)
    - [WAIT](http://redis.io/commands/WAIT)
    - [COMMAND INFO](http://redis.io/commands/COMMAND-INFO)
    - [COMMAND COUNT](http://redis.io/commands/COMMAND-COUNT)
    - [COMMAND GETKEYS](http://redis.io/commands/COMMAND-GETKEYS)
    - [LATENCY LATEST](http://redis.io/commands/LATENCY-LATEST)
    - [LATENCY HISTORY](http://redis.io/commands/LATENCY-HISTORY)
    - [LATENCY RESET](http://redis.io/commands/LATENCY-RESET)
    - [LATENCY GRAPH](http://redis.io/commands/LATENCY-GRAPH)
    - [LATENCY DOCTOR](http://redis.io/commands/LATENCY-DOCTOR)
- Additionally, only a subset of Redis’ configuration settings (via CONFIG GET/SET) is applicable to Redis Enterprise Cloud. Attempts to get or set a configuration parameter that isn’t included in the following list will result in an error:
    - hash-max-ziplist-entries
    - hash-max-ziplist-value
    - list-max-ziplist-entries
    - list-max-ziplist-value
    - notify-keyspace-events
    - set-max-intset-entries
    - slowlog-log-slower-than (value must be larger than 1000)
    - slowlog-max-len (value must be between 128 and 1024)
    - zset-max-ziplist-entries
    - zset-max-ziplist-value
- Lastly, unlike Redis’ 512MB limit, the maximum size of key names in our service is 64KB (key values, however, can have sizes up to 512MB).
{{% /expand%}}

{{%expand "Can I keep my data safe and always available?" %}}
Redis Enterprise Software offers a comprehensive suite of
high-availability provisions, including in-memory replication,
persistent storage, and backups.
{{% /expand%}}

{{%expand "What do you mean by the term Shard?" %}}
A shard is any type of provisioned Redis instance, such as a master
copy, slave copy, database shard that is part of a clustered database,
etc.
{{% /expand%}}

{{%expand "What client can I use to connect to the databases in Redis Enterprise?" %}}
Redis Enterprise works with all existing standard clients; it does not require you to use any special clients.
{{% /expand%}}

{{%expand "What am I allowed to do with the trial version?" %}}
You can use, experience and administer the full capabilities of Redis
Enterprise Software (RS), but you may not deploy it in a production
environment. In addition, the trial version allows a maximum of four
shards and is limited to thirty (30) days of use after initial
installation on the first server in the cluster. After the thirty day
trial, the cluster will shift to read-only status. The free version does
not provide the same support options as the paid version. Finally, no
SLA is provided with the trial version. To continue operation of the
cluster with full capabilities, you must purchase a [subscription
cluster key from Redis Labs](https://redislabs.com/pricing).
{{% /expand%}}

{{%expand "What are the Redis Enterprise Software (RS) payment schedule and terms?" %}}
Contact us at <sales@redislabs.com> to learn about RS pricing.
{{% /expand%}}

{{%expand "What client can I use to connect to the databases in Redis Enterprise Software?" %}}
Redis Enterprise Software (RS) works with any standard Redis client.
Use your existing Redis client and code, as they work directly against a
RS cluster. You point your existing standard Redis client and code
connection string at the RS cluster, then scale on the RS cluster as
you need.
{{% /expand%}}

## Technical Capabilities

<!-- Also in RC -->
{{%expand "How many Redis databases can I create and manage?" %}}
The number of databases is unlimited. The limiting factor is the
available memory in the cluster, and the number of shards in the
subscription.

Note that the impact of the specific database configuration on the
number of shards it consumes. For example:

- Enabling database replication, without enabling database clustering,
  creates two shards: a master shard and a slave shard.
- Enabling database clustering creates as many database shards as you
  configure.
- Enabling both database replication and database clustering creates
  double the number of database shards you configure.
{{% /expand%}}

{{%expand "What happens when my database fills up?" %}}
As explained in the open source [Redis FAQ](https://redis.io/topics/faq),
under "What happens if Redis runs out of memory?":

<blockquote>...[you] can use the "maxmemory" option in the config file to put a
limit to the memory Redis can use. If this limit is reached Redis will
start to reply with an error to write commands (but will continue to
accept read-only commands), or you can configure it to evict keys when
the max memory limit is reached in the case you are using Redis for
caching.</blockquote>

You can set the **maxmemory** value of each Redis Enterprise Software database in
the management UI using the **Memory limit** property, as well as
configure an eviction policy by setting it to any of the standard Redis
behaviors, without interrupting database operations.
{{% /expand%}}
