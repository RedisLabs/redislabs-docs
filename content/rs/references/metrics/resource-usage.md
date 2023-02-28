---
Title: Resource usage metrics
linkTitle: Resource usage
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

## Connections

Number of connections to the database.

**Components measured**: Cluster, Node, and Database

## CPU usage

Percent of the node CPU used. 

**Components measured**:  Cluster and Node

### Main thread CPU usage 

Percent of the CPU used by the main thread.

**Components measured**: Database and Shard

### Fork CPU usage

CPU usage of Redis child forks.

**Components measured**: Database and Shard

### Total CPU usage 

Percent usage of the CPU for all nodes.

**Components measured**: Database



## Free disk space

Remaining unused disk space.

**Components measured**:  Cluster and Node

## Free RAM

Available RAM for System use.

**Components measured**:  Cluster and Node

## Traffic

### Incoming traffic 

Total incoming traffic to the database in bytes per second.

Incoming traffic is not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}).

**Components measured**: Cluster, Node and Database

### Outgoing traffic 

Total outgoing traffic from the database in bytes per second.

Outgoing traffic is not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}).

**Components measured**: Cluster, Node and Database

## Used memory 

Total memory used by the database, including RAM, [Flash]({{< relref "/rs/databases/redis-on-flash" >}}) (if enabled), and [replication]({{< relref "/rs/databases/durability-ha/replication" >}}) (if enabled).

Used memory does not include:

1. Fragmentation overhead - the ratio of memory seen by the operating system to memory allocated by Redis
2. Replication buffers at the primary nodes - set to 10% of used memory and is between 64 MB and 2048 MB
3. Memory used by Lua scripts - does not exceed 1 MB.
4. Copy on Write (COW) operation that can be triggered by:
    - A full replication process
    - A database snapshot process
    - AOF rewrite process

Used memory is not measured during [shard migration]({{< relref "/rs/databases/configure/replica-ha" >}}).

### Memory limit 

Memory size limit of the database, enforced on the [used memory](#used-memory).

**Components measured**: Database

### Memory usage 

Percent of memory used by Redis out of the [memory limit](#memory-limit).

**Components measured**: Database





 