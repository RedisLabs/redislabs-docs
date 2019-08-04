---
Title: Memory Mangement with Redis Enterprise Software (RS)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
By default, RS manages node memory so that data is entirely in RAM for improved
database performance. RS is designed to handle memory management to optimize database
performance - better than OS memory management. If not enough RAM is available,
RS prevents adding more data into the databases. RS protects the existing data and
prevents the database from being able to store data into the shards. It
can be configured to move the data to another node, or even discard it.
The behavior depends on the [eviction policy]({{< relref "/rs/administering/database-operations/eviction-policy.md" >}})
set on each database by the administrator.

RoF [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
manages memory in a different way so that Flash memory (SSDs) can also be used
to store data.

## What happens when Redis Enterprise Software is low on RAM?

If a node is low on RAM, RS follows this order of priority:

1. If there are other nodes available, RS migrates shards to other nodes.
2. If the eviction policy allows eviction, RS causes shards to release memory,
which can result in data loss.
3. If the eviction poilcy does not allow eviction, RS sends
out of memory (OOM) responses.
4. If shards cannot free memory, RS relies on the OS processes to kill slaves,
but tries to avoid killing masters.

We still recommend that you have a monitoring platform that alerts you
proactively before a system gets low on RAM. Maintaining a properly sized
cluster is critical to a healthy RS installation and is a day-to-day
responsibility, just as with most databases.
