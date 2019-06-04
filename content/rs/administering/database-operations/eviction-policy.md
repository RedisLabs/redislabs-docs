---
Title: Eviction policies
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The eviction policy designates a data eviction method for Redis
Enterprise Software (RS) to use when the database size reaches its
limit. You can select any of the following:

| **Policy** | **Description** |
|------------|-----------------|
|  noeviction | Returns an error if the memory limit has been reached when trying to insert more data |
|  allkeys-lru | Evicts the least recently used keys out of all keys |
|  allkeys-lfu | Evicts the least frequently used keys out of all keys |
|  allkeys-random | Randomly evicts keys out of all keys |
|  volatile-lru | Evicts the least recently used keys out of all keys with an "expire" field set |
|  volatile-lfu | Evicts the least frequently used keys out of all keys with an "expire" field set |
|  volatile-random | Randomly evicts keys with an "expire" field set |
|  volatile-ttl | Evicts the shortest time-to-live and least recently used keys out of all keys with an "expire" field set. |

One mechanism to avoid this, but still keep performance is to use [Redis
on
Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
It can span your database across RAM + Flash Memory and intelligently
manage what data is hot and should be in RAM and what data is not and
can be on Flash memory (SSD).

Note: [Geo-Replicated
CRDBs]({{< relref "/rs/administering/intercluster-replication/crdbs.md" >}})
will always operate in noeviction mode.

Warning: Some redis Modules do not fully support eviction or all
eviction types. Please see each module's documentation for more
information on this topic.
