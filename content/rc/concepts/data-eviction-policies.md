---
Title: Data eviction policies
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rv/concepts/data-eviction-policies/
---
For each database, you can choose from these data eviction policies:

|  **Options** | **Description** |
|------------|-----------------|
|  allkeys-lru | Evicts the least recently used (LRU) keys out of all keys in the database |
|  allkeys-lfu | Evicts the least frequently used keys out of all keys
|  allkeys-random | Randomly evicts keys out of all keys in the database |
|  volatile-lru (**default**) | Evicts the least recently used (LRU) keys out of keys with an "expire" field set |
|  volatile-lfu | Evicts the least frequently used keys out of all keys with an "expire" field set
|  volatile-random | Randomly evicts keys with an "expire" field set |
|  volatile-ttl | Evicts the shortest time-to-live and least recently used keys out of keys with an "expire" field set |
|  no eviction | Returns an error if the memory limit has been reached when trying to insert more data |

Redis Cloud supports [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
to prevent data eviction but maintain high performance.
RoF can span your database across RAM and Flash Memory
and intelligently manage hot data in RAM and cold data in Flash memory (SSD).

{{< note >}}
[Active-Active Geo-Distributed CRDBs]({{< relref "/rs/administering/designing-production/active-active.md" >}}) always operates in noeviction mode.
{{< /note >}}
