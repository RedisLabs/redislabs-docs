---
title: Manage node memory
linktitle: Node memory
description: Information about managing, monitoring, and freeing your node memory when RAM is low.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/concepts/memory-architecture/memory-management/,
    /rs/concepts/memory-architecture/memory-management.md,
    /rs/concepts/memory-performance/memory-management/,
    /rs/concepts/memory-performance/memory-management.md,
    /rs/clusters/optimize/node-memory.md,
    /rs/clusters/optimize/node-memory/,
]
---
Redis Enterprise Software manages node memory so that data is entirely in RAM for improved database performance.
RS is designed to handle memory management to optimize database performance - better than OS memory management.
If not enough RAM is available, RS prevents adding more data into the databases.

RS protects the existing data and prevents the database from being able to store data into the shards.
You can configure the cluster to move the data to another node, or even discard it according to the [eviction policy]({{< relref "/rs/databases/memory-performance/eviction-policy.md" >}}) set on each database by the administrator.

[Redis on Flash]({{< relref "/rs/databases/redis-on-flash/" >}})
manages memory so that you can also use flash memory (SSD) to store data.

