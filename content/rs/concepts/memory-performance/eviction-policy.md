---
Title: Eviction policies
description:
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/eviction-policy.md,
    /rs/administering/database-operations/eviction-policy/,
    /rs/concepts/memory-performance/eviction-policy.md,
    /rs/concepts/memory-performance/eviction-policy/
]
---
The eviction policy defines the methodology that Redis Enterprise Software uses when the database exceeds the memory limit.<!--more-->

The eviction policies are:

| **Policy** | **Description** |
|------------|-----------------|
|  noeviction | Returns an error if the memory limit has been reached when trying to insert more data |
|  allkeys-lru | Evicts the least recently used keys out of all keys |
|  allkeys-lfu | Evicts the least frequently used keys out of all keys |
|  allkeys-random | Randomly evicts keys out of all keys |
|  volatile-lru | Evicts the least recently used keys out of all keys with an "expire" field set |
|  volatile-lfu | Evicts the least frequently used keys out of all keys with an "expire" field set |
|  volatile-random | Randomly evicts keys with an "expire" field set |
|  volatile-ttl | Evicts the shortest time-to-live keys out of all keys with an "expire" field set. |

## Eviction policy defaults

`volatile-lru` is the default eviction policy for databases, with the exception of Active-Active databases. The default for [Active-Active databases]({{< relref "/rs/administering/designing-production/active-active.md" >}}) is `noeviction`. 

### Eviction for Active-Active Redis databases
The eviction policy mechanism for Active-Active databases kicks in earlier than for regular databases because it requires propagation to all participating clusters. The eviction policy starts to evict keys when one of the Active-Active instances reaches 80% of its memory limit. If memory usage continues to rise while the keys are being evicted, the rate of eviction will increase to prevent reaching the Out-of-Memory state.

In case of network issues between Active-Active instances, memory can only be freed when all instances are in sync. If there is no communication between participating clusters, it can result in eviction of all keys and the instance reaching an Out-of-Memory state.

{{< note >}}
Data eviction policies are not supported for Active-Active databases with Redis on Flash (RoF).
{{< /note >}}

### Avoid data eviction

If you want to avoid data eviction, we recommend that you use [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-performance/redis-flash.md" >}}).
Redis on Flash stores the hot data of your dataset in RAM and the rest of your dataset in Flash memory (SSD).
This lets you keep more data in your database while only the most critical data is stored in high-cost RAM.
