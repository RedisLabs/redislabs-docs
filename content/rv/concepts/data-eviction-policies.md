---
Title: Data Eviction Policies
description: 
weight: $weight
alwaysopen: false
categories: ["RC Pro"]
---
For each database, you can choose from these six supported data eviction
policies:

|  **Options** | **Description** |
|------------|-----------------|
|  allkeys-lru | Evicts the least recently used (LRU) keys out of all keys in the database |
|  allkeys-random | Randomly evicts keys out of all keys in the database |
|  volatile-lru (**default**) | Evicts the least recently used (LRU) keys out of keys with an "expire" field set |
|  volatile-random | Randomly evicts keys with an "expire" field set |
|  volatile-ttl | Evicts the shortest time-to-live and least recently used keys out of keys with an "expire" field set |
|  no eviction | Returns error if memory limit has been reached when trying to insert more data |

One mechanism to avoid this, but still keep performance is to use [Redis
on
Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
It can span your database across RAM + Flash Memory and intelligently
manage what data is hot and should be in RAM and what data is not and
can be on Flash memory (SSD).

Note: [Active-Active Geo-Replicated
CRDBs]({{< relref "/rs/administering/intercluster-replication/crdbs.md" >}})
will always operate in noeviction mode.
