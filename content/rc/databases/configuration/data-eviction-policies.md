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

| **Available&nbsp;policies** | **Description** |
|:------------|:-----------------|
| allkeys-lru | Keeps most recently used keys; removes least recently used (LRU) keys |
| allkeys-lfu | Keeps frequently used keys; removes least frequently used (LFU) keys |
| allkeys-random | Randomly removes keys |
| volatile-lru | Removes least recently used keys with `expire` field set to true (*Default*) |
| volatile-lfu | Removes least frequently used keys with `expire` field set to true |
| volatile-random | Randomly removes keys with `expire` field set to true |
| volatile-ttl | Removes least frequently used keys with `expire` field set to true and the shortest remaining time-to-live (TTL) value |
| no eviction | New values aren't saved when memory limit is reached<br/><br/>When a database uses replication, this applies to the primary database |

Redis Cloud supports [Redis on Flash]({{< relref "/rs/databases/redis-on-flash/" >}}) (RoF)
to prevent data eviction but maintain high performance.

RoF can extend your database across RAM and Flash Memory and intelligently manage "hot" (active) data in RAM and "cold" (less active) data in Flash memory (SSD).

{{< note >}}
[Active-Active databases]({{< relref "/rs/databases/active-active/_index.md" >}}) always operates in noeviction mode.
{{< /note >}}
