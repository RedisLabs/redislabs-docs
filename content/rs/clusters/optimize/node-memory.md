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
You can configure the cluster to move the data to another node, or even discard it according to the [eviction policy]({{< relref "/rs/databases/configure/eviction-policy.md" >}}) set on each database by the administrator.

[Redis on Flash]({{< relref "/rs/concepts/memory-performance/redis-flash.md" >}})
manages memory so that you can also use flash memory (SSD) to store data.

## What happens when Redis Enterprise Software is low on RAM?

If a node is low on RAM, RS follows this order of priority:

1. If there are other nodes available, RS migrates shards to other nodes.
2. If the eviction policy allows eviction, RS causes shards to release memory,
which can result in data loss.
3. If the eviction policy does not allow eviction, RS sends
out of memory (OOM) responses.
4. If shards cannot free memory, RS relies on the OS processes to kill slaves,
but tries to avoid killing masters.

In addition to cluster memory management,
we recommend that you have a monitoring platform that alerts you proactively before a system gets low on RAM.
You must maintain sufficient free memory to make sure that you have a healthy RS installation.

## Memory statistics

You can see the status of the cluster memory with these statistics:

- Free_RAM - The amount of RAM that is available for system use out of the total RAM on the host.
    Used Free_RAM includes RAM used by the operating system and other administrative processes.
    Low Free_RAM can cause unexpected system behavior.

    This statistic is shown:
    - rladmin status - Cluster
    - admin console metrics - Cluster
- Provisional_RAM - The amount of RAM that is available for provisioning to databases out of the total RAM allocated for databases.
    Used Provisional_RAM can include memory allocated for replication or other database features.

    This statistic is shown in: rladmin status - Cluster
- Used memory - The amount of memory currently used for data.

    This statistic is shown in:
    - rladmin status - Shards
    - admin console metrics - Database
- Memory limit - The maximum amount of memory that the database can use for data.

    This statistic is shown in: admin console metrics - Database
- Memory usage - The percent of used memory out of memory limit.

    This statistic is shown in: admin console metrics - Database
