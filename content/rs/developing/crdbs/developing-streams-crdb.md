---
Title: Developing with Streams in a Active-Active databases
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
A [Redis Stream](https://redis.io/topics/streams-intro) is a data structure that acts like an append-only log.
Each entry consists of:

- An ID that is unique and monotonically increasing ID
- The data that is a list of key-value pairs, but not a hash because there may be several pairs with the same "key"

You can access the data ("read") using XREAD or using consumer-groups and XREADGROUP.

## Streams and Active-Active

In Active-Active databases, the data in the stream is synchronized between the Active-Active instances in each location.

For example, in a simple XADD case:

| Time | Location 1                      | Location 2                      |
| ---- | ------------------------------- | ------------------------------- |
| t1   | XADD x 100-1 f1 v1              |                                 |
| t2   | --- sync ---                    | --- sync ---                    |
| t3   |                                 | XADD x 100-2 f1 v1              |
| t4   | --- sync ---                    | --- sync ---                    |
| t5   | XRANGE x - + --> [100-1, 100-2] | XRANGE x - + --> [100-1, 100-2] |

In a concurrent add case:

| Time | Location 1                      | Location 2                      |
| ---- | ------------------------------- | ------------------------------- |
| t1   | XADD x 100-1 f1 v1              | XADD x 100-2 f1 v1              |
| t2   | XRANGE x - + --> [100-1]        | XRANGE x - + --> [100-2]        |
| t3   | --- sync ---                    | --- sync ---                    |
| t4   | XRANGE x - + --> [100-1, 100-2] | XRANGE x - + --> [100-1, 100-2] |

### Implementation notes

OSS Redis uses one radix tree (rax) to hold the entries, but an Active-Active stream holds a radix tree per-writing location.
Every location can add entries only to its rax but can remove entries from all rax trees.
XREAD iterates simultaneously on all rax trees and returns the appropriate entry in each loop by comparing entry-IDs from the different rax trees.

### The observed-remove approach

In Active-Active databases, the observed-remove approach is a way to auto-resolve conflicts.
For stream data operations, we use the observed-remove approach.
It means that in case of a concurrent operation to DEL, DEL only affects data that currently exists.

For example:

| Time | Location 1               | Location 2               |
| ---- | ------------------------ | ------------------------ |
| t1   | XADD x 100-1 f1 v1       |                          |
| t2   | --- sync ---             | --- sync ---             |
| t3   | XRANGE x - + --> [100-1] | XRANGE x - + --> [100-1] |
| t4   | DEL x                    | XADD x 100-2 f1 v1       |
| t5   | --- sync ---             | --- sync ---             |
| t6   | XRANGE x - + --> [100-2] | XRANGE x - + --> [100-2] |

Notice that the DEL in t4 only removes 100-1, which is an entry that already exists at the t4.
It does not remove 100-2 because this entry was not yet "observed" in that location.

### ID uniqueness

Because of the asynchronous nature of Active-Active databases, the following scenario is possible:

| Time | Location 1                      | Location 2                      |
| ---- | ------------------------------- | ------------------------------- |
| t1   | XADD x 100-1 f1 v1              | XADD x 100-1 f1 v1              |
| t2   | --- sync ---                    | --- sync ---                    |
| t3   | XRANGE x - + --> [100-1, 100-1] | XRANGE x - + --> [100-1, 100-1] |

In this scenario there are 2 entries with the same ID, which is against the ID uniqueness assumption of Redis streams.
There are 3 modes for XADD to help resolve this issue while being as compliant with Redis as possible:

1. Liberal: XADD has no syntax limitations.
    This mode can lead to duplicate IDs and is not recommended.
1. Strict: XADD using "\*" or only MS generates an ID with SEQ calculated using the location-ID to prevent duplicate IDs, but XADD with full-ID (MS-SEQ) fails.
1. Semi-strict: Similar to strict. XADD allows full-ID, but can create duplicate IDs.

The default and recommended mode is strict to prevent duplicate IDs. A stream with duplicate IDs can cause:

1. XDEL, XCLAIM and other commands to affect more than one entry
1. Trimmed duplicate entries in case of DB export and RENAME

### Iterating a stream with XREAD

Using XREAD to iterate through stream entries is a popular pattern and is similar to SCAN:

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

Using XREAD is not recommended as an iterator in Active-Active databases because entries can be skipped:

| Time | Location 1                                         | Location 2                                         |
| ---- | -------------------------------------------------- | -------------------------------------------------- |
| t1   | XADD x 110 f1 v1                                   | XADD x 115 f1 v1                                   |
| t2   | XADD x 120 f1 v1                                   |                                                    |
| t3   | XADD x 130 f1 v1                                   |                                                    |
| t4   | XREAD COUNT 2 STREAMS x 0 --> [110-0, 120-0]       |                                                    |
| t5   | --- sync ---                                       | --- sync ---                                       |
| t6   | XREAD COUNT 2 STREAMS x 120 --> [130-0]            |                                                    |
| t7   | XREAD STREAMS x 0 --> [110-0, 115-0, 120-0, 130-0] | XREAD STREAMS x 0 --> [110-0, 115-0, 120-0, 130-0] |

As you can see, XREAD skipped entry 115-0.

## Stream consumer-groups in Active-Active databases

You can use consumer groups in Active-Active databases.

Here is an example of a simple XGROUP case:

| Time | Location 1                  | Location 2                  |
| ---- | --------------------------- | --------------------------- |
| t1   | XGROUP CREATE x g1 0        |                             |
| t2   | --- sync ---                | --- sync ---                |
| t3   |                             | XGROUP CREATE x g2 0        |
| t4   | --- sync ---                | --- sync ---                |
| t5   | XINFO GROUPS x --> [g1, g2] | XINFO GROUPS x --> [g1, g2] |

Here is an example of a concurrent XADD case:

| Time | Location 1                  | Location 2                  |
| ---- | --------------------------- | --------------------------- |
| t1   | XGROUP CREATE x g1 0        | XGROUP CREATE x g2 0        |
| t2   | --- sync ---                | --- sync ---                |
| t3   | XINFO GROUPS x --> [g1]     | XINFO GROUPS x --> [g2]     |
| t4   | --- sync ---                | --- sync ---                |
| t5   | XINFO GROUPS x --> [g1, g2] | XINFO GROUPS x --> [g1, g2] |

### Implementation notes

OSS Redis uses one radix tree (rax) to hold the PEL (pending entries list) per group (global PEL) and one rax for each consumer (consumer PEL).
The global PEL is a unification of all consumer PELs, which are disjointed.
A Active-Active databases stream holds a radix tree per-writing location, both for global PEL and per-consumer PEL.
XREADGROUP, with an ID different from the special ">", iterates simultaneously on all of the PEL rax trees for the consumers.
It returns the appropriate entry in each loop by comparing entry-IDs from the different rax trees.

### The DEL-wins approach

In Active-Active databases, the DEL-wins approach is a way to auto-resolve conflicts.
In case of concurrent operations, the delete operations "win" over the concurrent operation.

In this example, the DEL in t4 deletes both the observed g1 and the non-observed g2:

| time | Location 1              | Location 2              |
| ---- | ----------------------- | ----------------------- |
| t1   | XGROUP CREATE x g1 0    |                         |
| t2   | --- sync ---            | --- sync ---            |
| t3   | XINFO GROUPS x --> [g1] | XINFO GROUPS x --> [g1] |
| t4   | DEL x                   | XGROUP CREATE x g2 0    |
| t5   | --- sync ---            | --- sync ---            |
| t6   | EXISTS x --> 0          | EXISTS x --> 0          |

In this example, the XGROUP DESTROY in t4 affects both the observed g1 created in Location 1 and the non-observed g1 created in Location 3:

| time | Location 1              | Location 2              | Location 3            |
| ---- | ----------------------- | ----------------------- | --------------------- |
| t1   | XGROUP CREATE x g1 0    |                         |                       |
| t2   | --- sync ---            | --- sync ---            |                       |
| t3   | XINFO GROUPS x --> [g1] | XINFO GROUPS x --> [g1] | XINFO GROUPS x --> [] |
| t4   |                         | XGROUP DESTROY x g1     | XGROUP CREATE x g1 0  |
| t5   | --- sync ---            | --- sync ---            | --- sync ---          |
| t6   | EXISTS x --> 0          | EXISTS x --> 0          | EXISTS x --> 0        |

### Consumer groups issues

In consumer groups, every XREADGROUP and every XACK can change the state of a group or consumer,
but this cross-location replication is slow and bandwidth is limited.

To maintain consumer groups in Active-Active databases with optimal performance:

1. Group existence (CREATE/DESTROY) is replicated.
1. Most XACK operations are replicated.
1. Other operations are local, such as: XGROUP, SETID, DELCONSUMER

For example:

| time | Location 1                                        | Location 2               |
| ---- | ------------------------------------------------- | ------------------------ |
| t1   | XADD x 110-0 f1 v1                                |                          |
| t2   | XGROUP CREATE x g1 0                              |                          |
| t3   | XREADGROUP GROUP g1 Alice STREAMS x > --> [110-0] |                          |
| t4   | --- sync ---                                      | --- sync ---             |
| t5   | XRANGE x - + --> [110-0]                          | XRANGE x - + --> [110-0] |
| t6   | XINFO GROUPS x -> [g1]                            | XINFO GROUPS x -> [g1]   |
| t7   | XINFO CONSUMERS x -> [Alice]                      | XINFO CONSUMERS x -> []  |
| t8   | XPENDING x g1 - + --> [110-0]                     | XPENDING x g1 - + --> [] |

Using XREADGROUP across instances can result in instances reading the same entries
because CRDT Streams is designed to either handle "at least once" reads or have only one reader at a time.
As shown in the previous example, Location 2 is not aware of any group-related activity and it seems that redirecting the XREADGROUP traffic from Location 1 to Location 2 results in reading the same entries that were already read.

### XREADGROUP redirection

If the usage pattern is such that every entry that was read using XREADGROUP is acknowledged with XACK after processing it,
we can limit the number of messages that are re-read while maintaining a low-rate of the cross-location traffic.
To do this, we replicate XACK messages only when all of the read entries are acknowledged.

For example:

| time | Location 1                                                      | Location 2   | Explanation                                                                                                     |
| ---- | --------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| t1   | XADD x 110-0 f1 v1                                              |              |                                                                                                                 |
| t2   | XADD x 120-0 f1 v1                                              |              |                                                                                                                 |
| t3   | XADD x 130-0 f1 v1                                              |              |                                                                                                                 |
| t4   | XGROUP CREATE x g1 0                                            |              |                                                                                                                 |
| t5   | XREADGROUP GROUP g1 Alice STREAMS x > --> [110-0, 120-0, 130-0] |              |                                                                                                                 |
| t6   | XACK g1 110-0                                                   |              |                                                                                                                 |
| t7   | --- sync ---                                                    | --- sync --- | 110-0 and its preceding entries (none) were acknowledged. We replicate an XACK effect for 110-0.                |
| t8   | XACK g1 130-0                                                   |              |                                                                                                                 |
| t9   | --- sync ---                                                    | --- sync --- | 130-0 was acknowledged, but not its preceding entries (120-0). We DO NOT replicate an XACK effect for 130-0     |
| t10  | XACK g1 130-0                                                   |              |                                                                                                                 |
| t11  | --- sync ---                                                    | --- sync --- | 120-0 and its preceding entries (110-0 through 130-0) were acknowledged. We replicate an XACK effect for 130-0. |

In this scenario, if we redirect the XREADGROUP traffic from Location 1 to Location 2 we do not re-read entries 110-0, 120-0 and 130-0.
This means that the XREADGROUP does not return already-acknowledged entries.

### Consumer groups SLA

XREADGOUP does not "miss" entries, whereas XREAD can "miss" entries when used in a SCAN-like pattern with concurrent XADD operations.
In traffic redirection, XREADGOUP can return entries that were read but not acknowledged.

## Comparing Streams in Active-Active Databases and Streams in OSS Redis

### Stream entries limitations

In Active-Active databases:

1. XADD with a full-ID can fail in default strict mode.
1. When used as an iterator, XREAD can miss entries.
1. XSETID fails when the new-ID is less than current-ID.

### Consumer groups limitations

Consumer groups are not replicated with the exception of:

1. Consecutive XACK operations
1. XGROUP CREATE and XGROUP DESTROY

Other limitations are:

1. XGROUP SETID, DELCONSUMER are not replicated.
1. Consumers exist locally (XREADGROUP creates a consumer implicitly).
1. RENAME of a stream deletes all consumer group information.
