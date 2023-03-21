---
Title: Data eviction
linkTitle: Data eviction
description: Data is evicted according to the eviction policy when a database reaches its memory limit.
weight: 10
alwaysOpen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/eviction-policy.md,
    /rs/administering/database-operations/eviction-policy/,
    /rs/concepts/memory-performance/eviction-policy.md,
    /rs/concepts/memory-performance/eviction-policy/,
    /rs/databases/configure/eviction-policy.md,
    /rs/databases/configure/eviction-policy/,
    /rs/databases/memory-performance/eviction-policy.md,
    /rs/databases/memory-performance/eviction-policy/,
]
---

The [eviction policy]({{<relref "/rs/references/policies/eviction-policy">}}) determines what happens when a database reaches its [memory limit]({{<relref "/rs/databases/memory-performance/memory-limit">}}). To make room for new data, older data is _evicted_ (removed) according to the selected policy.

To prevent data eviction, make sure your database is large enough to hold all keys.

## Active-Active database eviction

[Active-Active databases]({{<relref "/rs/databases/active-active">}}) have a lower threshold for data eviction than standalone databases because it requires propagation to all participating clusters. The eviction policy starts to evict keys when one of the Active-Active instances reaches 80% of its memory limit.

If memory usage continues to increase during data eviction, the rate of eviction will increase to avoid running out of memory.

As with standalone Redis Enterprise databases, Active-Active eviction is calculated per shard.
To prevent over eviction, internal heuristics might prevent keys from being evicted when the shard reaches the 80% memory limit.  In such cases, keys are evicted only when the shard's memory reaches 100%.

In case of network issues between Active-Active instances, memory can be freed only when all instances are in sync. If there is no communication between participating clusters, this can cause the eviction of all keys and an Out of Memory (OOM) state in the instance.

{{< note >}}
Data eviction policies are not supported for Active-Active databases with [Redis on Flash]({{<relref "/rs/databases/redis-on-flash">}}).
{{< /note >}}

## Avoid data eviction

To avoid data eviction, make sure your database is large enough to hold all required data.

For large datasets, consider using [Redis on Flash]({{<relref "/rs/databases/redis-on-flash/">}}), which stores actively used data (also known as _hot data_) in RAM and the remaining data in flash memory (SSD).
This lets you retain more data while ensuring fast access to the most critical data.

## More info

- [Eviction policy reference]({{<relref "/rs/references/policies/eviction-policy">}})

- [Memory limits]({{<relref "/rs/databases/memory-performance/memory-limit">}})

- [Redis on Flash]({{<relref "/rs/databases/redis-on-flash">}})