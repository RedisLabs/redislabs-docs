---
Title: Data eviction policies
linkTitle: Data eviction
description: Data eviction policies control what happens when new data exceeds the memory limits of a database.  Here, you'll learn the available policies and how to change which one is used for a database.
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rv/concepts/data-eviction-policies/
         /rc/concepts/data-eviction-policies/
         /rc/concepts/data-eviction-policies.md 
---

The data eviction policy of a database controls what happens when new data exceeds the memory size of a database.  Typically, such situations require _evicting_ (or deleting) data previously added to the database.  

To control this behavior, [change the]({{< relref "/rc/databases/view-edit-database.md" >}}) **Data eviction policy** setting for a database.

## Available policies

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

Redis Cloud supports [Redis on Flash]({{< relref "/rs/concepts/memory-performance/redis-flash.md" >}}) (RoF)
to prevent data eviction but maintain high performance.

RoF can extend your database across RAM and Flash Memory and intelligently manage "hot" (active) data in RAM and "cold" (less active) data in Flash memory (SSD).

{{< note >}}
[Active-Active Geo-Distributed CRDBs]({{< relref "/rs/administering/designing-production/active-active.md" >}}) always operates in noeviction mode.
{{< /note >}}
