---
Title: Developing with Streams in a CRDB
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
A Redis Stream is a data structure that acts like an append-only log. Each entry consists of a unique, monotonically increasing ID, and the data, which is a list of key-value pairs (not a hash, because there may be several pairs with the same “key”).
One can access the data (“read”) using XREAD or using consumer-groups and XREADGROUP.
For more information about streams in Redis please visit https://redis.io/topics/streams-intro
From here on, it is assumed the reader has basic knowledge on how streams work.

## Streams and Active-Active

This section describes how the data part of a stream (i.e. the entries themselves) is handled in CRDB.

Here is an example of a simple XADD case:

| Time | Replica 1                       | Replica 2                       |
| ---- | ------------------------------- | ------------------------------- |
| t1   | XADD x 100-1 f1 v1              |                                 |
| t2   | --- sync ---                    |                                 |
| t3   |                                 | XADD x 100-2 f1 v1              |
| t4   | --- sync ---                    |                                 |
| t5   | XRANGE x - + --> [100-1, 100-2] | XRANGE x - + --> [100-1, 100-2] |

Here is an example of a concurrent add case:

| Time | Replica 1                       | Replica 2                       |
| ---- | ------------------------------- | ------------------------------- |
| t1   | XADD x 100-1 f1 v1              | XADD x 100-2 f1 v1              |
| t2   | XRANGE x - + --> [100-1]        | XRANGE x - + --> [100-2]        |
| t3   | --- sync ---                    |                                 |
| t4   | XRANGE x - + --> [100-1, 100-2] | XRANGE x - + --> [100-1, 100-2] |

### Implementation notes

OSS Redis uses one radix tree (rax) to hold the entries while a CRDB stream holds a radix tree per-writing region.
Every region can add entries only to its rax but may remove entries from all rax trees.
XREAD will iterate simultaneously on all rax trees, returning the appropriate entry in each loop by comparing entry-IDs from different rax trees.

### The observed-remove approach

In the world of CRDB the observed-remove approach is a way to auto-resolve conflicts. Basically, it means that in case of a concurrent operation to DEL, DEL will only affect data that currently exist. Consider this example:

| Time | Replica 1                | Replica 2                |
| ---- | ------------------------ | ------------------------ |
| t1   | XADD x 100-1 f1 v1       |                          |
| t2   | --- sync ---             |                          |
| t3   | XRANGE x - + --> [100-1] | XRANGE x - + --> [100-1] |
| t4   | DEL x                    | XADD x 100-2 f1 v1       |
| t5   | --- sync ---             |                          |
| t6   | XRANGE x - + --> [100-2] | XRANGE x - + --> [100-2] |

Notice that the DEL in t4 only affects 100-1 (an entry that already exists at the t4) but it doesn’t affect 100-2 (because this entry was not yet “observed”)
For stream data operations, we use the observed-remove approach.

### ID uniqueness
Because of the asynchronous nature of CRDB, the following scenario is possible:

| Time | Replica 1                       | Replica 2                       |
| ---- | ------------------------------- | ------------------------------- |
| t1   | XADD x 100-1 f1 v1              | XADD x 100-1 f1 v1              |
| t2   | --- sync ---                    |                                 |
| t3   | XRANGE x - + --> [100-1, 100-1] | XRANGE x - + --> [100-1, 100-1] |

In this scenario there are 2 entries with the same ID, which is against the assumptions of Redis streams (namely, the ID uniqueness assumption). There are 3 modes for XADD to help resolve this issue while being compliant with Redis (as much as possible):

1. Liberal: XADD has no syntax limitations. This mode may lead to duplicate IDs (As you can see in the scenario above) and is not recommended
1. Strict: XADD with full-ID (MS-SEQ) will fail, using “*” or only MS will generate an ID with SEQ calculated using the region-ID, making sure there are no duplicate IDs
1. Semi-strict: Similar to strict, but will not fail the command if a full-ID was given (And has the potential to create duplicate IDs, as you can see in the scenario above)

The default (and most recommended) mode is strict. (XADD with full-ID will fail, but there will never be duplicate IDs)

A stream with duplicate IDs can cause:

1. XDEL, XCLAIM and other commands to affect more than one entry
1. Trimmed duplicate entries in case of DB export and RENAME

### Iterating a stream with XREAD

Using XREAD to iterate through stream entries is a popular pattern (Very similar to SCAN):

```src
127.0.0.1:6379> XADD x 110 f v
"110-0"
127.0.0.1:6379> XADD x 120 f v
"120-0"
127.0.0.1:6379> XADD x 130 f v
"130-0"
127.0.0.1:6379> XADD x 140 f v
"140-0"
127.0.0.1:6379> XADD x 150 f v
"150-0"
127.0.0.1:6379> XREAD COUNT 2 STREAMS x 0
1) 1) "x"
   2) 1) 1) "110-0"
         2) 1) "f"
            2) "v"
      2) 1) "120-0"
         2) 1) "f"
            2) "v"
127.0.0.1:6379> XREAD COUNT 2 STREAMS x 120
1) 1) "x"
   2) 1) 1) "130-0"
         2) 1) "f"
            2) "v"
      2) 1) "140-0"
         2) 1) "f"
            2) "v"
127.0.0.1:6379> XREAD COUNT 2 STREAMS x 140
1) 1) "x"
   2) 1) 1) "150-0"
         2) 1) "f"
            2) "v"
```

This pattern is not very useful in CRDB:

| Time | Replica 1                | Replica 2                |
| ---- | ------------------------ | ------------------------ |
| t1   | XADD x 100-1 f1 v1       |                          |
| t2   | --- sync ---             |                          |
| t3   | XRANGE x - + --> [100-1] | XRANGE x - + --> [100-1] |
| t4   | DEL x                    | XADD x 100-2 f1 v1       |
| t5   | --- sync ---             |                          |
| t6   | XRANGE x - + --> [100-2] | XRANGE x - + --> [100-2] |

| Time | Replica 1                                        | Replica 2                                        |
| ---- | ------------------------------------------------ | ------------------------------------------------ |
| t1   | XADD x 110 f1 v1                                 | XADD x 115 f1 v1                                 |
| t2   | XADD x 120 f1 v1                                 |                                                  |
| t3   | XADD x 130 f1 v1                                 |                                                  |
| t4   | XREAD COUNT 2 STREAMS x 0 → [110-0, 120-0]       |                                                  |
| t5   | --- sync ---                                     |                                                  |
| t6   | XREAD COUNT 2 STREAMS x 120 → [130-0]            |                                                  |
| t7   | XREAD STREAMS x 0 → [110-0, 115-0, 120-0, 130-0] | XREAD STREAMS x 0 → [110-0, 115-0, 120-0, 130-0] |

As you can see, entry 115-0 was “skipped” by XREAD.

There is no lock-free solution for this problem and therefore using XREAD as an iterator in CRDB is not recommended.

## Stream consumer-groups in CRDB

This section describes how consumer groups are handled in CRDB.

Here is an example of a simple XGROUP case:

This pattern is not very useful in CRDB:

| Time | Replica 1                 | Replica 2                 |
| ---- | ------------------------- | ------------------------- |
| t1   | XGROUP CREATE x g1 0      |                           |
| t2   | --- sync ---              |                           |
| t3   |                           | XGROUP CREATE x g2 0      |
| t4   | --- sync ---              |                           |
| t5   | XINFO GROUPS x → [g1, g2] | XINFO GROUPS x → [g1, g2] |

Here is an example of a concurrent XADD case:

| Time | Replica 1                 | Replica 2                 |
| ---- | ------------------------- | ------------------------- |
| t1   | XGROUP CREATE x g1 0      | XGROUP CREATE x g2 0      |
| t2   | --- sync ---              |                           |
| t3   | XINFO GROUPS x → [g1]     | XINFO GROUPS x → [g2]     |
| t4   | --- sync ---              |                           |
| t5   | XINFO GROUPS x → [g1, g2] | XINFO GROUPS x → [g1, g2] |

### Implementation notes

OSS Redis uses one radix tree (rax) to hold the PEL (pending entries list) per group (global PEL) + one rax for each consumer (consumer PEL). The global PEL is a unification of all consumer PELs (which are disjoint).
A CRDB stream holds a radix tree per-writing region (both for global PEL and per-consumer PEL).
XREADGROUP (with an id different from the special “>”) will iterate simultaneously on all of the consumer’s PEL rax trees, returning the appropriate entry in each loop by comparing entry-IDs from different rax trees.
### The del-wins approach

In the world of CRDB the del-wins approach is a way to auto-resolve conflicts. Basically, it means that in case of a concurrent operation to DEL, DEL will “win” over the concurrent operation. Consider ths examples:

| time | Region 1              | Region 2              |
| ---- | --------------------- | --------------------- |
| t1   | XGROUP CREATE x g1 0  |                       |
| t2   | sync                  |                       |
| t3   | XINFO GROUPS x → [g1] | XINFO GROUPS x → [g1] |
| t4   | DEL x                 | XGROUP CREATE x g2 0  |
| t5   | sync                  |                       |
| t6   | EXISTS x → 0          | EXISTS x → 0          |

Notice that the DEL in t4 affects both g1 (which was “observed”) and g2 (not yet “observed”)
Another example:

| time | Region 1              | Region 2              | Region 3             |
| ---- | --------------------- | --------------------- | -------------------- |
| t1   | XGROUP CREATE x g1 0  |                       |                      |
| t2   | sync                  | sync                  |                      |
| t3   | XINFO GROUPS x → [g1] | XINFO GROUPS x → [g1] | XINFO GROUPS x → []  |
| t4   |                       | XGROUP DESTROY x g1   | XGROUP CREATE x g1 0 |
| t5   | sync                  | sync                  | sync                 |
| t6   | EXISTS x → 0          | EXISTS x → 0          | EXISTS x → 0         |

Notice that the XGROUP DESTROY in t4 affects both g1 that was created by Region 1 (which was “observed”) and g1 that was created by Region 3 (not yet “observed”)
For consumer-groups operations we use the del-wins approach

### Consumer groups issues

In order to perfectly maintain consumer groups in CRDB we would have to replicate every XREADGROUP and every XACK (because they affect the state of a group/consumer)
Cross-region replication is slow and bandwidth is limited so we chose to go with a different approach:

1. Group existence (CREATE/DESTROY) is replicated
1. XACk is replicated, but not every XACK (will be explained later)
1. Everything else is local (XGROUP SETID, DELCONSUMER , etc.)

For example:

| time | Region 1              | Region 2              |
| ---- | --------------------- | --------------------- |
| t1 |XADD x 110-0 f1 v1 |
| t2 | XGROUP CREATE x g1 0 | 
| t3 | XREADGROUP GROUP g1 Alice STREAMS x > → [110-0] | 
| t4 | sync
| t5 | XRANGE x - + → [110-0] | XRANGE x - + → [110-0]
| t6 | XINFO GROUPS x -> [g1] | XINFO GROUPS x -> [g1]
| t7 | XINFO CONSUMERS x -> [Alice] | XINFO CONSUMERS x -> []
| t8 | XPENDING x g1 - + → [110-0] | XPENDING x g1 - + → []

As you can see, Region 2 seems to be completely unaware of any group-related activity and it seems that redirecting the XREADGROUP traffic from Region 1 to Region 2 will result in reading the same entries that were already read.
Given that the usage pattern is standard (Every entry that was read using XREADGROUP is acknowledged with XACK after processing it) we have a way to tackle this issue.

Note that using XREADGROUP across instances can result in instances reading the same entries because CRDT Streams is designed to handle “at least once” reads (or have only one reader at a time).

### XREADGROUP redirection

In order to prevent re-reading already-read entries (as much as possible) while still minimizing cross-region traffic, we decided to replicate XACK messages only when all the entries that were read before were already acknowledged. Example:

| time | Region 1              | Region 2              |
| ---- | --------------------- | --------------------- |
| t1 | XADD x 110-0 f1 v1 | 
| t2 | XADD x 120-0 f1 v1 | 
| t3 | XADD x 130-0 f1 v1 | 
| t4 | XGROUP CREATE x g1 0 | 
| t5 | XREADGROUP GROUP g1 Alice STREAMS x > → [110-0, 120-0, 130-0] | 
| t6 | XACK g1 110-0 | 
| t7 | sync -- 110-0 was acknowledged, and so were all the entries that preceded it (in this case, zero entries). We replicate an XACK effect for 110-0
| t8 | XACK g1 130-0 | 
| t9 | sync -- 130-0 was acknowledged, but that’s not the case for all entries that preceded it (120-0 was never acknowledged). We DO NOT replicate an XACK effect for 130-0
| t10 | XACK g1 130-0 | 
| t11 | sync -- 120-0 was acknowledged, so now all entries from 110-0 till 130-0 were acknowledged. We replicate an XACK effect for 130-0

If we currently decide to redirect the XREADGROUP traffic from Region 1 to Region 2 we will not re-read entries 110-0, 120-0 and 130-0 (XREADGROUP will never return already-acknowledged entries)

### Consumer groups SLA

While XREAD may “miss” entries (when used in a SCAN-like pattern, with concurrent XADD operations) we guarantee that XREADGOUP will never “miss” entries (however, it could return entries that were already read but never acknowledged - only in case of XREADGROUP traffic redirection)

## Streams in CRDB versus streams in OSS Redis

### Stream entries limitations

1. XADD with full-id may fail (when using the default strict mode)
1. XREAD, when used as an iterator, might miss entries
1. XSETID will fail in case new-id is less than current-id

### Consumer groups limitations

Consumer groups are local (not replicated) with the exception of:

1. XACK (only when consecutive)
1. XGROUP CREATE/DESTROY

Other limitations:

1. XGROUP SETID, DELCONSUMER areis local
1. Consumers exist locally (XREADGROUP creates a consumer implicitly)
1. RENAME of a stream deletes all consumer group information
