---
Title: Eviction policies
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When the total size of a database reaches its [memory limit]({{< relref "/rs/administering/database-operations/memory-limit.md" >}}), the database cannot accept new keys. You can select a data eviction policy that defines which keys to delete to make room for new keys.


## Eviction policy types

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
Since Active-Active eviction needs to get propagated to all participant clusters, its eviction mechanism kicks in earlier than in a regular Redis database. The eviction on Active-Active databases starts to evict keys once the memory has reached 80% of maxmemory. In case the used memory continues to rise although keys are being evicted, the eviction mechanism will get more aggressive to prevent getting to Out-Of-Memory.
Note that in case of network issues between Active-Active instances, keys will still get evicted, but memory can get freed only when all instances get synchronized about it. That means that in cases where there is no communication between participant clusters, eviction can end by all keys getting evicted and instance has reached Out-Of-Memory state.

### Eviction for modules

When using Redis modules, review the the documentation for each Redis module to see how it uses eviction.

### Avoid data eviction

If you want to avoid data eviction, we recommend that you use [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
Redis on Flash stores the hot data of your dataset in RAM and the rest of your dataset in Flash memory (SSD).
This lets you keep more data in your database while only the most critical data is stored in high-cost RAM.
