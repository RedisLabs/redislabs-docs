---
Title: Memory Mangement with Redis Enterprise Software (RES)
description: 
weight: $weight
alwaysopen: false
---
By default, RES manages node memory so that data is entirely in RAM for improved
database performance. RES is designed to handle memory management to optimize database 
performance - better than OS memory management. If not enough RAM is available, 
RES prevents adding more data into the databases. RES protects the existing data and
prevents the database from being able to store data into the shards. It 
can be configured to move the data to another node, or even discard it.
The behavior depends on the [eviction policy]({{< relref "/rs/administering/database-operations/eviction-policy.md" >}})
set on each database by the administrator.

RES [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
manages memory in a different way so that Flash memory (SSDs) can also be used 
to store data. 

## What happens when Redis Enterprise Software is low on RAM?

If free RAM is low, RES automatically tries to migrate shards to
other nodes (if there are any) in order to free RAM on this node. If that is not
possible, RES causes shards to release memory if the eviction policy allows it, 
which can cause data loss or out of memory (OOM) messages. If shards cannot
free memory, then RES depends on the OS processes to kill slaves (but
tries to avoid killing masters).

We still recommend that you have a monitoring platform that alerts you 
proactively before a system gets low on RAM. Maintaining a properly sized 
cluster is critical to a healthy RES installation and is a day-to-day 
responsibility, just as with most databases.
