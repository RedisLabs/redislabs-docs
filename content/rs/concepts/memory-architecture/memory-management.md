---
Title: Memory Mangement with Redis Enterprise Software (RES)
description: $description
weight: $weight
alwaysopen: false
---
By default, RES manages a node's memory so data is entirely in RAM for
performance reasons. The exception to this is RES's [Redis on
Flash](/redis-enterprise-documentation/concepts-architecture/memory-architecture/redis-enterprise-flash/)
feature where Flash memory (SSDs) can be used to store data too. If
there's not enough RAM available, RES does not allow inserting of more
data into databases. This limitation is intentional and ultimately
beneficial. It is detrimental to RES for the OS to take control of
allocating memory and spill some data to the swap, thus managing memory
on RES's behalf. RES has been designed to know better than the OS what
it needs and when it needs it. RES protects the existing data and
prevents the database from being able to store data into the shards. It
can be configured to move the data to another node, or even discard it.
This depends on [eviction
policy](/redis-enterprise-documentation/database-configuration/database-eviction-policy/)
set on a database by the administrator.

With this memory management style, comes the responsibility to monitor
the nodes, clusters, databases, etc., but you are already doing that,
right?

What happens when Redis Enterprise Software is low on RAM?
----------------------------------------------------------

If free RAM is low, RES will automatically attempt to migrate shards to
other nodes, (if there are any) to free RAM on this node. If that is not
possible, RES instructs shards to release memory (which can cause data
loss if eviction policy allows it, or OOM replies). If shards cannot
free memory, then RES depends on the OS's OOM killer to kill slaves (but
tries to avoid killing masters).

All that said, as always it is best practice to have a proper monitoring
platform that will alert you proactively well before a system gets to
this point. Maintaining a properly sized cluster is critical to a
healthy RES installation and is a day to day responsibility like most
databases.
