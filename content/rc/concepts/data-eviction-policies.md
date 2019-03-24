---
Title: Data Eviction Policies
description: 
weight: $weight
alwaysopen: false
categories: ["RC Essentials"]
---
There are six supported data eviction policies to choose from for each
database. They are:

| **Options** | **Description** |
|------------|-----------------|
| allkeys-lru | Evicts the least recently used keys out of all keys |
| allkeys-random | Randomly evicts keys out of all keys |
| volatile-lru (**default**) | Evicts the least recently used keys out of keys with an "expire" field set |
| volatile-random | Randomly evicts keys with an "expire" field set |
| volatile-ttl | Evicts the shortest time-to-live and least recently used keys out of keys with an "expire" field set |
| no eviction | Returns error if memory limit has been reached when trying to insert more data |
