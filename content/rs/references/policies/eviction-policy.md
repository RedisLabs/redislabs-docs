---
Title: Data eviction policy
linkTitle: eviction_policy
description: Determines how to handle data when a database reaches its memory limit.
weight: $weight
alwaysOpen: false
toc: "true"
categories: ["RS"]
aliases: 
---

The data eviction policy determines what happens when a database reaches its [memory limit]({{<relref "/rs/databases/memory-performance/memory-limit">}}). To make room for new data, older data is [_evicted_]({{<relref "/rs/databases/memory-performance/data-eviction">}}) according to the selected policy.

To prevent data eviction, make sure your database is large enough to hold all keys.

## Policy values

| Value | Description |
|-------|-------------|
| noeviction | New values aren't saved when the memory limit is reached (default eviction policy for [Active-Active databases]({{<relref "/rs/databases/active-active">}})).<br/><br/>When a database uses replication, this applies to the primary database. |
| allkeys-lru | Keeps most recently used keys; removes least recently used (LRU) keys. |
| allkeys-lfu | Keeps frequently used keys; removes least frequently used (LFU) keys. |
| allkeys-random | Randomly removes keys. |
| volatile-lru | Removes least recently used keys with `expire` set to `true` (default for most databases, excluding Active-Active databases). |
| volatile-lfu | Removes least frequently used keys with `expire` set to `true`. |
| <nobr>volatile-random</nobr> | Randomly removes keys with `expire` set to `true`. |
| volatile-ttl | Removes least frequently used keys with `expire` set to `true` and the shortest remaining time-to-live (TTL) value. |

## Examples

To change a database's eviction policy, use one of the following methods:

- Admin console: edit the **Data eviction policy** on the database configuration screen.

- [REST API request]({{<relref "/rs/references/rest-api/requests/bdbs#put-bdbs">}}):

    ```sh
    PUT /v1/bdbs/<ID>
    { "eviction_policy": "volatile-ttl" }
    ```