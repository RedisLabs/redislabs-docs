---
Title: Database and Shard Metrics
linkTitle: Databases and Shards
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

## Evicted objects/sec

Number of objects evicted from the database per second.

Objects are evicted from the database if:

1. The database reaches its memory_limit
1. The [eviction policy]({{< relref "/rs/databases/memory-performance/eviction-policy" >}}) is not configured to `no-eviction`
1. The dataset keys are compliant with the selected eviction policy. For example, with the `volatile-lru` eviction policy, Redis evicts expired keys.

Object information is not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph is blank.

**Components measured**: Database and Shard

## Expired objects/sec

Number of expired objects per second.

Object information is not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph is blank.

**Components measured**: Database and Shard

## Fork CPU Usage

CPU usage of Redis child forks.

**Components measured**: Database and Shard

## Hit Ratio

Ratio of the number of operations on existing keys out of the total number of operations. 

**Components measured**: Database and Shard

## Incoming traffic

Total incoming traffic to the database in bytes per second.

Incoming traffic is not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph is blank.

**Components measured**: [Cluster, Node]({{<relref "/rs/references/metrics/cluster">}}) and Database

## Latency



The graph shows average, minimum, maximum, and last latency values.

**Components measured**: Database

## Main thread CPU usage

Percent of the CPU used by the main thread.

**Components measured**: Database and Shard

## Memory limit

Memory size limit of the database, enforced on the used memory.

Used memory does not include:

1. Fragmentation Ratio - the ratio of memory seen by the operating system to memory allocated by Redis
2. Replication buffer - set to 10% of used memory and is between 64 MB and 2048 MB
3. Lua memory limit - does not exceed 1 MB.

## Memory usage

Percent of memory used by redis out of the [memory limit](#memory-limit).

**Components measured**: Database

## Ops/Sec

Number of total operations per second, which includes [read operations](#readssec), [write operations](#writessec), and [other operations](#other-commandssec).

**Components measured**: [Cluster, Node]({{<relref "/rs/references/metrics/cluster">}}), Database, and Shard

## Other commands/sec

Number of operations per second that are not [read operations](#readssec) or [write operations](#writessec).

Examples of other operations include [PING](https://redis.io/commands/ping/), [AUTH](https://redis.io/commands/auth/), and [INFO](https://redis.io/commands/info/).

**Components measured**: Database

## Other commands latency

[Latency](#latency) of [other operations](#other-commandssec).

The graph shows average, minimum, maximum, and last latency values.

**Components measured**: Database

## Outgoing traffic

Total outgoing traffic from the database in bytes per second.

Outgoing traffic is not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph is blank.

**Components measured**: [Cluster, Node]({{<relref "/rs/references/metrics/cluster">}}) and Database

## Read misses/sec

The number of [read operations](#readssec) per second on keys that do not exist.

Read misses are not collected during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). If you view the database or shard metrics while resharding, the graph is blank.

**Components measured**: Database

## Reads latency

[Latency](#latency) of [read operations](#readssec).

The graph shows average, minimum, maximum, and last latency values.

**Components measured**: Database

## Reads/sec

Number of total read operations per second.

To find out what operations are considered read operations, run this 

**Components measured**: Database

## Total CPU usage
## Total keys
## Used memory
## Write misses/sec
## Writes latency
## Writes/sec