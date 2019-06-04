---
Title: Disk Sizing for Heavy Write Scenarios
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
In extreme write scenarios, when AOF is enabled, the AOF rewrite process
may require considerably more disk space for database persistence.

To estimate the required persistent disk space in such cases, use the
formula described below.

**The required persistent disk space for AOF rewrite purposes in extreme
write scenarios, assuming identical shard sizes:**

**X (1 + 3Y +Y²)**

      where:
**X** = each shard size
**Y** = number of shards

Following are examples of database configurations and the persistence
disk space they would require in this scenario:

|   | Example 1 | Example 2 | Example 3 | Example 4 |
|---|------------|-----------------|------------|-----------------|
| Database size (GB) | 10 | 10 | 40 | 40 |
| Number of shards | 4 | 16 | 5 | 15 |
| Shard size (GB) | 2.5 | 0.625 | 8 | 2.67 |
| Required disk space (GB) | 73 | 191 | 328 | 723 |

For disk size requirements in standard usage scenarios, refer to the
[Hardware
requirements]({{< relref "/rs/administering/designing-production/hardware-requirements.md" >}})
section.
