---
Title: Eviction policy
linkTitle: eviction_policy
description: Determines what happens when a database reaches its memory limit.
weight: $weight
alwaysOpen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/eviction-policy.md,
    /rs/administering/database-operations/eviction-policy/,
    /rs/concepts/memory-performance/eviction-policy.md,
    /rs/concepts/memory-performance/eviction-policy/,
    /rs/databases/configure/eviction-policy.md,
    /rs/databases/configure/eviction-policy/,
    /rs/databases/memory-performance/eviction-policy.md,
    /rs/databases/memory-performance/eviction-policy/,
]
---

The eviction policy determines what happens when a database reaches its memory limit. To make room for new data, older data is _evicted_ (removed) according to the selected policy.

To prevent data eviction, make sure your database is large enough to hold all desired keys.  

## Policy values

| Value | Description |
|-------|-------------|
| noeviction | New values aren't saved when memory limit is reached (default eviction policy for [Active-Active databases]({{<relref "/rs/databases/active-active">}}))<br/><br/>When a database uses replication, this applies to the primary database |
| allkeys-lru | Keeps most recently used keys; removes least recently used (LRU) keys |
| allkeys-lfu | Keeps frequently used keys; removes least frequently used (LFU) keys |
| allkeys-random | Randomly removes keys |
| volatile-lru | Removes least recently used keys with `expire` field set to true (default for most databases, excluding Active-Active databases) |
| volatile-lfu | Removes least frequently used keys with `expire` field set to true |
| <nobr>volatile-random</nobr> | Randomly removes keys with `expire` field set to true |
| volatile-ttl | Removes least frequently used keys with `expire` field set to true and the shortest remaining time-to-live (TTL) value |

## Active-Active database eviction

Active-Active databases have a lower threshold for data eviction than standalone databases because it requires propagation to all participating clusters. The eviction policy starts to evict keys when one of the Active-Active instances reaches 80% of its memory limit.

If memory usage continues to increase during data eviction, the rate of eviction will increase to prevent reaching the Out-of-Memory state.

As with standalone Redis Enterprise databases, Active-Active eviction is calculated per shard.
To prevent over eviction, internal heuristics might prevent keys from being evicted when the shard reaches the 80% memory limit.  In such cases, keys are evicted only when the shard's memory reaches 100%.

In case of network issues between Active-Active instances, memory can be freed only when all instances are in sync. If there is no communication between participating clusters, this can cause the eviction of all keys and an Out-of-Memory state in the instance.

{{< note >}}
Data eviction policies are not supported for Active-Active databases with Redis on Flash (RoF).
{{< /note >}}

## Avoid data eviction

To avoid data eviction, make sure your database is large enough to hold required values.  

For larger databases, consider using [Redis on Flash (RoF)]({{< relref "/rs/databases/redis-on-flash/" >}}).

Redis on Flash stores actively-used data (also known as _hot data_) in RAM and the remaining data in flash memory (SSD).
This lets you retain more data while ensuring the fastest access to the most critical data.
