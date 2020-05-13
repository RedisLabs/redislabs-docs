---
Title: Streams with Active-Active databases
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
A [Redis Stream](https://redis.io/topics/streams-intro) is a data structure that acts like an append-only log.
Each stream entry consists of:

- A unique, monotonically increasing ID
- A payload consisting of a series key-value pairs

You add entries to a stream with the XADD command. You access stream entries using the XRANGE, XREADGROUP, and XREAD commands (however, see the caveat about XREAD below).

## Streams and Active-Active

Streams are synchronized across the instances of an Active-Active database. In the example below, we write to a stream from two regions. Notice that after syncing, both database instances have identical streams:

| Time | Region 1                      | Region 2                      |
| ---- | ------------------------------- | ------------------------------- |
| _t1_   | `XADD x 100-1 f1 v1`              |                                 |
| _t2_  | _— Sync —_                    | _— Sync —_                    |
| _t3_   |                                 | `XADD x 100-2 f1 v1`              |
| _t4_   | _— Sync —_                    | _— Sync —_                    |
| _t5_   | `XRANGE x - +` <br/>**→ [100-1, 100-2]** | `XRANGE x - +` <br/>**→ [100-1, 100-2]** |

The same is true for concurrent writes to the same stream across regions:

| Time | Region 1                      | Region 2                      |
| ---- | ------------------------------- | ------------------------------- |
| _t1_   | `XADD x 100-1 f1 v1`              | `XADD x 100-2 f1 v1`              |
| _t2_   | `XRANGE x - +` <br/>**→ [100-1]**        | `XRANGE x - +` <br/>**→ [100-2]**        |
| _t3_   | _— Sync —_                    | _— Sync —_                    |
| _t4_   | `XRANGE x - +` <br/>**→ [100-1, 100-2]** | `XRANGE x - + <br/>**→ [100-1, 100-2]** |


{{% note %}}
Open source Redis uses one radix tree (referred to as `rax` in the code base) to implement each stream. However, Active-Active databases implement a single logical stream using one `rax` per region.
Each region adds entries only to its associated `rax` (but can remove entries from all `rax` trees).
This means that XREAD and XREADGROUP iterate simultaneously over all `rax` trees and return the appropriate entry by comparing the entry IDs from each `rax`.
{{% /note %}}

### The observed-remove approach

The observed-remove approach is a way to automatically resolve conflicts in Active-Active databases.
With this approach, a delete only affects the locally observable data.

In the example below, a stream, `x`, is created at _t1_. At _t3_, the stream exists in two regions.

| Time | Region 1               | Region 2               |
| ---- | ------------------------ | ------------------------ |
| _t1_   | `XADD x 100-1 f1 v1`       |                          |
| _t2_   | _— Sync —_             | _— Sync —_             |
| _t3_   | `XRANGE x - +` <br/>**→ [100-1]** | `XRANGE x - +` <br/>**→ [100-1]** |
| _t4_   | `DEL x`                    | `XADD x 100-2 f1 v1`       |
| _t5_   | _— Sync —_             | _— Sync —_             |
| _t6_   | `XRANGE x - +`<br/> **→ [100-2]** | `XRANGE x - +` <br/>**→ [100-2]** |

At _t4_, the stream is deleted from Region 1. At the same time, the entry `100-2` is added to the same stream at Region 2. After the sync, at _t6_, the entry `100-2` exists in both regions. This is because that entry was not visible when the local stream was deleted at _t4_.

### Preserving ID uniqueness

Because Active-Active databases replicate asynchronously, it's possible to create streams with duplicate IDs:

| Time | Region 1                      | Region 2                      |
| ---- | ------------------------------- | ------------------------------- |
| _t1_   | `XADD x 100-1 f1 v1`              | `XADD x 100-1 f1 v1`              |
| _t2_   | _— Sync —_                    | _— Sync —_                    |
| _t3_   | `XRANGE x - +`<br/> **→ [100-1, 100-1]** | `XRANGE x - +`<br/> **→ [100-1, 100-1]** |

In this scenario, two entries with the ID `100-1` are added at _t1_. After syncing, the streams contains two entries with the same ID.

To prevent duplicate IDs and to comply with the original Redis streams design, Active-Active databases provide three ID generation modes for XADD:

1. **Strict**: In _strict_ mode, XADD allows server-generated IDs (using the '`*`' ID specifier) or IDs consisting only of the millisecond (MS) portion. In this second case, the ID's sequence number will be calculated using the database's location ID to prevent duplicate IDs in the stream. Strict mode rejects full IDs (that is, IDs containing both milliseconds and a sequence number).
1. **Semi-strict**: In _semi-strict_ mode, XADD permits everything from _strict_ mode but also allows full IDs. This means that duplicate IDs are possible.
1. **Liberal**: XADD has no syntax limitations.
    This mode can lead to duplicate IDs and is not recommended.

The default and recommended mode is _strict_, which prevents duplicate IDs. A stream with duplicate IDs can cause:

1. XDEL, XCLAIM, and other commands to affect more than one entry
1. Removal of duplicate entries if a database is exported or renamed

### Iterating a stream with XREAD

Normally, you can use XREAD to iterate over the entries in a Redis Stream. However, with an Active-Active database, XREAD may skip entries. This can happen when multiple regions write to the same stream.

In the example below, XREAD skips entry `115-0`.

| Time | Region 1                                         | Region 2                                         |
| ---- | -------------------------------------------------- | -------------------------------------------------- |
| _t1_   | `XADD x 110 f1 v1`                                   | `XADD x 115 f1 v1`                                   |
| _t2_   | `XADD x 120 f1 v1`                                   |                                                    |
| _t3_   | `XADD x 130 f1 v1`                                   |                                                    |
| _t4_   | `XREAD COUNT 2 STREAMS x 0` <br/>**→ [110-0, 120-0]**       |                                                    |
| _t5_   | _— Sync —_                                       | _— Sync —_                                       |
| _t6_   | `XREAD COUNT 2 STREAMS x 120` <br/>**→ [130-0]**            |                                                    |
| _t7_   | `XREAD STREAMS x 0` <br/>**→[110-0, 115-0, 120-0, 130-0]** | `XREAD STREAMS x 0` <br/>**→[110-0, 115-0, 120-0, 130-0]** |


You can use XREAD to reliably consume a stream only if all writes to the stream originate from a single region. Otherwise, you should use XREADGROUP, which always guarantees reliable stream consumption.

## Consumer groups in Active-Active databases

Active-Active databases fully support consumer groups with Redis Streams.

Here is an example of a using XGROUP with an active-active database:

| Time | Region 1                  | Region 2                  |
| ---- | --------------------------- | --------------------------- |
| _t1_   | `XGROUP CREATE x g1 0`        |                             |
| _t2_   | _— Sync —_                | _— Sync —_                |
| _t3_   |                             | `XGROUP CREATE x g2 0`        |
| _t4_   | _— Sync —_                | _— Sync —_                |
| _t5_   | `XINFO GROUPS x` <br/>**→ [g1, g2]** | `XINFO GROUPS x` <br/>**→ [g1, g2]** |

Here is an example of creating two consumer groups concurrently:

| Time | Region 1                  | Region 2                  |
| ---- | --------------------------- | --------------------------- |
| _t1_   | `XGROUP CREATE x g1 0`        | `XGROUP CREATE x g2 0`        |
| _t2_   | _— Sync —_                | — Sync —                |
| _t3_   | `XINFO GROUPS x` <br/>**→ [g1]**     | `XINFO GROUPS x` <br/>**→ [g2]**     |
| _t4_   | _— Sync —_                | — Sync —                |
| _t5_   | `XINFO GROUPS x` <br/>**→ [g1, g2]** | `XINFO GROUPS x` <br/>**→ [g1, g2]** |


{{% note %}}
OSS Redis uses one radix tree (`rax`) to hold the global pending entries list and another `rax` for each consumer's PEL.
The global PEL is a unification of all consumer PELs, which are disjoint.

An Active-Active database stream maintains a global PEL and a per-consumer PEL for each region.

XREADGROUP, when given an ID different from the special ">" ID, iterates simultaneously over all of the PELs for all consumers.
It returns the next entry by comparing entry IDs from the different PELs.
{{% /note %}}

### The DEL-wins approach

The DEL-wins approach is a way to auto-resolve conflicts.
In case of concurrent operations, the delete operations "win" over the concurrent operation.

In this example, the DEL at _t4_ deletes both the observed g1 and the non-observed g2:

| Time | Region 1              | Region 2              |
| ---- | ----------------------- | ----------------------- |
| _t1_   | `XGROUP CREATE x g1 0`    |                         |
| _t2_   | _— Sync —_            | _— Sync —_            |
| _t3_   | `XINFO GROUPS x` <br/>**→ [g1]** | `XINFO GROUPS x` <br/>**→ [g1]** |
| _t4_   | `DEL x                   | `XGROUP CREATE x g2 0`    |
| _t5_   | _— Sync —_            | _— Sync —_            |
| _t6_   | `EXISTS x` <br/>**→ 0** | `EXISTS x` <br/>**→  0**          |

In this example, the XGROUP DESTROY at _t4_ affects both the observed `g1` created in Region 1 and the non-observed `g1` created in Region 3:

| time | Region 1              | Region 2              | Region 3            |
| ---- | ----------------------- | ----------------------- | --------------------- |
| _t1_   | `XGROUP CREATE x g1 0`    |                         |                       |
| _t2_   | _— Sync —_            | _— Sync —_            |                       |
| _t3_   | `XINFO GROUPS x` <br/>**→ [g1]** | `XINFO GROUPS x` <br/>**→  [g1]** | `XINFO GROUPS x` <br/>**→  []** |
| _t4_   |                         | `XGROUP DESTROY x g1`     | `XGROUP CREATE x g1 0` |
| _t5_   | _— Sync —_            | _— Sync —            | — Sync —          |
| _t6_   | `EXISTS x` <br/>**→  0**          | `EXISTS x` <br/>**→ 0**          | `EXISTS x` <br/>**→  0**    |

### Consumer groups issues

Calls to XREADGROUP and XACK change the state of a group or consumer. However, it is not efficient to replicate every change to a consumer or group.

To maintain consumer groups in Active-Active databases with optimal performance:

1. Group existence (CREATE/DESTROY) is replicated.
1. Most XACK operations are replicated.
1. Other operations, such as XGROUP, SETID, DELCONSUMER, are not replicated.

For example:

| Time | Region 1                                        | Region 2               |
| ---- | ------------------------------------------------- | ------------------------ |
| _t1_   | `XADD x 110-0 f1 v1`                                |                          |
| _t2_   | `XGROUP CREATE x g1 0`                              |                          |
| _t3_   | `XREADGROUP GROUP g1 Alice STREAMS x >` <br/>**→ [110-0]** |                          |
| _t4_   | _— Sync —_                                      | _— Sync —_             |
| _t5_   | `XRANGE x - +` <br/>**→ [110-0]**                          | XRANGE x - + <br/>**→ [110-0]** |
| _t6_   | `XINFO GROUPS x` <br/>**→ [g1]**                            | XINFO GROUPS x <br/>**→ [g1]**   |
| _t7_   | `XINFO CONSUMERS x` <br/>**→ [Alice]**                      | XINFO CONSUMERS x <br/>**→ []**  |
| _t8_   | `XPENDING x g1 - +` <br/>**→ [110-0]**                     | XPENDING x g1 - + <br/>**→ []** |

Using XREADGROUP across instances can result in instances reading the same entries.
This is due to the fact that Active-Active Streams is designed for at-least-once reads or a single consumer.
As shown in the previous example, Region 2 is not aware of any group-related activity, so redirecting the XREADGROUP traffic from Region 1 to Region 2 results in reading entries that have already been read.

### XREADGROUP redirection

If every stream entry read using XREADGROUP is acknowledged with XACK after processing it,
we can limit the number of messages that are re-read while maintaining a low rate of the cross-location traffic.
To do this, we replicate XACK messages only when all of the read entries are acknowledged.

For example:

| Time | Region 1                                                      | Region 2   | Explanation                                                                                                     |
| ---- | --------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| _t1_   | `XADD x 110-0 f1 v1`                                              |              |                                                                                                                 |
| _t2_   | `XADD x 120-0 f1 v1`                                              |              |                                                                                                                 |
| _t3_   | `XADD x 130-0 f1 v1`                                              |              |                                                                                                                 |
| _t4_   | `XGROUP CREATE x g1 0`                                            |              |                                                                                                                 |
| _t5_   | `XREADGROUP GROUP g1 Alice STREAMS x >` <br/>**→ [110-0, 120-0, 130-0]** |              |                                                                                                                 |
| _t6_   | `XACK g1 110-0`                                                   |              |                                                                                                                 |
| _t7_   | _— Sync —_                                                    | _— Sync —_ | 110-0 and its preceding entries (none) were acknowledged. We replicate an XACK effect for 110-0.                |
| _t8_   | `XACK g1 130-0`                                                   |              |                                                                                                                 |
| _t9_   | _— Sync —_                                                    | _— Sync —_ | 130-0 was acknowledged, but not its preceding entries (120-0). We DO NOT replicate an XACK effect for 130-0     |
| _t10_  | `XACK g1 130-0`                                                   |              |                                                                                                                 |
| _t11_  | _— Sync —_                                                    | _— Sync —_ | 120-0 and its preceding entries (110-0 through 130-0) were acknowledged. We replicate an XACK effect for 130-0. |

In this scenario, if we redirect the XREADGROUP traffic from Region 1 to Region 2 we do not re-read entries 110-0, 120-0 and 130-0.
This means that the XREADGROUP does not return already-acknowledged entries.

### Consumer group guarantees

Unlike XREAD, XREADGOUP will never skip stream entries.
In traffic redirection, XREADGROUP may return entries that have been read but not acknowledged.

## Comparing Streams in Active-Active Databases and Streams in Open Source Redis

### Stream entries limitations

In Active-Active databases:

1. XADD with a full ID can fail in default strict mode.
1. When used as an iterator, XREAD may skip entries.
1. XSETID fails when the new ID is less than current ID.

### Consumer groups limitations

Consumer groups are not replicated with the exception of:

1. Consecutive XACK operations
1. XGROUP CREATE and XGROUP DESTROY

Other limitations are:

1. XGROUP SETID, DELCONSUMER are not replicated.
1. Consumers exist locally (XREADGROUP creates a consumer implicitly).
1. RENAME of a stream deletes all consumer group information.
