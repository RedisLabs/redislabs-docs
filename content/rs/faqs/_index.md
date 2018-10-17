---
Title: FAQs
description: 
weight: 70
alwaysopen: false
---
This section includes various frequently asked questions.

{{%expand "Can I keep my data safe and always available?" %}}
Redis Enterprise Software offers a comprehensive suite of
high-availability provisions, including in-memory replication,
persistent storage, and backups.
{{% /expand%}}

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

{{%expand "What do you mean by the term Shard?" %}}
A shard is any type of provisioned Redis instance, such as a master
copy, slave copy, database shard that is part of a clustered database,
etc.
{{% /expand%}}

{{%expand "I use open source Redis. Why should I switch to Redis Enterprise Software?" %}}
Redis Enterprise Software (RES) helps you overcome the limitations of
open source Redis. It provides scalable Redis databases, even for
datasets larger than the largest server. Moreover, it scales without the
hassle of setting up or dealing with nodes and clusters, while
maintaining the same endpoints.

Achieving true high-availability is very easy with RES. At the click of
a button, you can set up in-memory replication, data persistence, and
remote backups.

You get all of that, plus the code you already have works. The same
code, the same Redis client. We use them too.

And finally, it is fully automated, so you do not need to worry about
scaling or recovery from failures.
{{% /expand%}}

{{%expand "What am I allowed to do with the trial version?" %}}
You can use, experience and administer the full capabilities of Redis
Enterprise Software (RES), but you may not deploy it in a production
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
Redis Enterprise Software (RES) works with any standard Redis client.
Use your existing Redis client and code, as they work directly against a
RES cluster. You point your existing standard Redis client and code
connection string at the RES cluster, then scale on the RES cluster as
you need.
{{% /expand%}}

{{%expand "What happens when my database fills up?" %}}
As explained in the open source [Redis FAQ](http://redis.io/topics/faq),
under "What happens if Redis runs out of memory?":

<blockquote>...\[you\] can use the "maxmemory" option in the config file to put a
limit to the memory Redis can use. If this limit is reached Redis will
start to reply with an error to write commands (but will continue to
accept read-only commands), or you can configure it to evict keys when
the max memory limit is reached in the case you are using Redis for
caching.</blockquote>

You can set the **maxmemory** value of each Redis^e^ Pack database in
the management UI using the **Memory limit** property, as well as
configure an eviction policy by setting it to any of the standard Redis
behaviors, without interrupting database operations.
{{% /expand%}}