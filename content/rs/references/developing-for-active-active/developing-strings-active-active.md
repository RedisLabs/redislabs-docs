---
Title: Developing with Strings in an Active-Active database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/developing-for-active-active/developing-strings-active-active.md/
        /rs/developing/crdbs/strings/
---
Strings have particular unique characteristics in an Active-Active database. First off,
they are the only data type that Last Write Wins (LWW) applies to. As
part of that, a wall-clock timestamp (OS Time) is in the metadata of any
operation on a String. If Redis Enterprise Software cannot determine the order of operations,
the value with the higher timestamp wins. This is the only case where OS
time is used to resolve a conflict.

Here is an example where an update happening to the same key at a later
time (t2) wins over the update at t1.

|  **Time** | **Member CRDB1** | **Member CRDB2** |
|  ------: | :------: | :------: |
|  t1 | SET key1 “a” |  |
|  t2 |  | SET key1 “b” |
|  t3 | — Sync — | — Sync — |
|  t4 | SET key1 “c” |  |
|  t5 | — Sync — | — Sync — |
|  t6 |  | SET key1 “d” |

Bitfield methods like SETBIT are not supported in Active-Active databases.

### String data type with counter value in Active-Active databases

Counters can be used to implement distributed counters. This can be useful when counting total views of an
article or image, or when counting social interactions like "retweets"
or "likes" of an article in an Active-Active database distributed to multiple geographies.

On conflicting writes, counters accumulate the total counter operations
across all member Active-Active databases in each sync. Here is an example of how counter
values can be initialized and maintained across two member Active-Active databases. With
each sync, the counter value accumulates the private increment and
decrements of each site and maintain an accurate counter across
concurrent writes.

|  **Time** | **Member CRDB1** | **Member CRDB2** |
|  ------: | :------: | :------: |
|  t1 | INCRBY key1 7 |  |
|  t2 |  | INCRBY key1 3 |
|  t3 | GET key1<br/>7 | GET key1<br/>3 |
|  t4 | — Sync — | — Sync — |
|  t5 | GET key1<br/>10 | GET key1<br/>10 |
|  t6 | DECRBY key1 3 |  |
|  t7 |  | INCRBY key1 6 |
|  t8 | — Sync — | — Sync — |
|  t9 | GET key1<br/>13 | GET key1<br/>13 |

{{< note >}}
Active-Active databases support 59-bit counters.
This limitation is to protect from overflowing a counter in a concurrent operation.
{{< /note >}}
