---
Title: Database operations metrics
linkTitle: Database operations
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

## Evicted objects/sec

Number of objects evicted from the database per second.

Objects are evicted from the database according to the [eviction policy]({{< relref "/rs/databases/memory-performance/eviction-policy" >}}).

Object information is not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}).

**Components measured**: Database and Shard

## Expired objects/sec

Number of expired objects per second.

Object information is not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}).

**Components measured**: Database and Shard

## Hit ratio 

Ratio of the number of operations on existing keys out of the total number of operations. 

**Components measured**: Database and Shard

### Read misses/sec

The number of [read operations](#readssec) per second on keys that do not exist.

Read misses are not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}).

**Components measured**: Database

### Write misses/sec 

Number of [write operations](#writessec) per second on keys that do not exist.

Write misses are not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}).

**Components measured**: Database and Shard

## Latency 

The total amount of time between sending a Redis operation and receiving a response from the database.

The graph shows average, minimum, maximum, and last latency values for all latency metrics.

**Components measured**: Database

### Reads latency 

[Latency](#latency) of [read operations](#readssec).

**Components measured**: Database

### Writes latency 

[Latency](#latency) per [write operation](#writessec).

**Components measured**: Database

### Other commands latency 

[Latency](#latency) of [other operations](#other-commandssec).

**Components measured**: Database

## Ops/sec

Number of total operations per second, which includes [read operations](#readssec), [write operations](#writessec), and [other operations](#other-commandssec).

**Components measured**: Cluster, Node, Database, and Shard

### Reads/sec

Number of total read operations per second.

To find out which commands are read operations, run the following command with [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}):

```sh
ACL CAT read
```

**Components measured**: Database

### Writes/sec

Number of total write operations per second.

To find out which commands are write operations, run the following command with [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli">}}):

```sh
ACL CAT write
```

**Components measured**: Database

#### Pending writes min

Minimum number of write operations queued per [Active-Active]({{<relref "/rs/databases/active-active">}}) replica database. 

#### Pending writes max

Maximum number of write operations queued per [Active-Active]({{<relref "/rs/databases/active-active">}}) replica database. 

### Other commands/sec 

Number of operations per second that are not [read operations](#readssec) or [write operations](#writessec).

Examples of other operations include [PING](https://redis.io/commands/ping/), [AUTH](https://redis.io/commands/auth/), and [INFO](https://redis.io/commands/info/).

**Components measured**: Database

## Total keys 

Total number of keys in the dataset.
 
Does not include replicated keys, even if [replication]({{< relref "/rs/databases/durability-ha/replication" >}}) is enabled.

Total keys is not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}). 

**Components measured**: Database








