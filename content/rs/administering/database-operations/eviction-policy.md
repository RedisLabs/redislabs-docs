---
Title: Eviction policies
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
The eviction policy defines the methodology that Redis Enterprise Software uses when the database exceeds the memory limit.
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

{{% note %}}
- [Active-Active databases]({{< relref "/rs/administering/designing-production/active-active.md" >}}) always operate in noeviction mode.
- Review the documentation for each Redis module to see how it uses eviction.
{{% /note %}}

If you want to avoid data eviction, we recommend that you use [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
RoF stores the hot data of your dataset in RAM and the rest of your dataset in Flash memory (SSD).
This lets you kept more data in your database while keeping only the most critical data in high-cost RAM.
