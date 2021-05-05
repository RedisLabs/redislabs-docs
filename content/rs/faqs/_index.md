---
Title: FAQs
description:
weight: 70
alwaysopen: false
categories: ["RS"]
---
Here are some frequently asked questions about Redis Enterprise Software (RS).

## Features and terminology

{{< expand-control >}}
<!-- Also in RC -->
{{< expand "What exactly is Redis Enterprise?" >}}
{{< embed-md "what-is-redis-enterprise.md"  >}}
{{< /expand >}}

{{< expand "Are you fully compatible with open source Redis?" >}} Redis Enterprise Software is fully [compatible with open source Redis]]{{< relref "/rs/concepts/compatibility.md"  >}}
{{< /expand >}}

{{< expand "Can I keep my data safe and always available?" >}}
Redis Enterprise Software offers a comprehensive suite of
high-availability provisions, including in-memory replication,
persistent storage, and backups.
{{< /expand>}}

{{< expand "What do you mean by the term shard?" >}}
A shard is any type of provisioned Redis instance, such as a master
copy, slave copy, database shard that is part of a clustered database,
etc.
{{< /expand>}}

{{< expand "What client can I use to connect to the databases in Redis Enterprise?" >}}
Redis Enterprise works with all existing standard clients; it does not require you to use any special clients.
{{< /expand>}}

{{% expand "What am I allowed to do with the trial version?" %}}
You can use, experience and administer the full capabilities of Redis
Enterprise Software (RS), but you may not deploy it in a production
environment. In addition, the trial version allows a maximum of four
shards and is limited to thirty (30) days of use after initial
installation on the first server in the cluster. After the thirty day
trial, the cluster shifts to read-only status. The free version does
not provide the same support options as the paid version. Finally, no
SLA is provided with the trial version. To continue operation of the
cluster with full capabilities, you must purchase a [subscription
cluster key from Redis Labs](https://redislabs.com/pricing).
{{% /expand %}}

{{< expand "What are the RS payment schedule and terms?" >}}
Contact us at <sales@redislabs.com> to learn about RS pricing.
{{< /expand>}}

{{< expand "What client can I use to connect to the databases in Redis Enterprise Software?" >}}
RS works with any standard Redis client.
Use your existing Redis client and code, as they work directly against a
RS cluster. You point your existing standard Redis client and code
connection string at the RS cluster, then scale on the RS cluster as
you need.
{{< /expand>}}
{{< /expand-control >}}

## Technical capabilities

{{< expand-control >}}
{{< expand "How many Redis databases can I create and manage?" >}}
{{< embed-md "how-many-databases-software.md"  >}}
{{< /expand >}}

{{% expand "What happens when my database fills up?" %}}
As explained in the open source [Redis FAQ](https://redis.io/topics/faq),
under "What happens if Redis runs out of memory?":

<blockquote>...[you] can use the "maxmemory" option in the config file to put a
limit to the memory Redis can use. If this limit is reached Redis
starts to reply with an error to write commands (but continues to
accept read-only commands), or you can configure it to evict keys when
the max memory limit is reached in the case you are using Redis for
caching.</blockquote>

You can set the **maxmemory** value of each Redis Enterprise Software database in
the management UI using the **Memory limit** property, as well as
configure an eviction policy by setting it to any of the standard Redis
behaviors, without interrupting database operations.
{{< /expand>}}
{{< /expand-control >}}
