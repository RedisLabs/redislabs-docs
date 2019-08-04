---
Title: Developing with Strings in a CRDB
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Strings have particular unique characteristics in a CRDB. First off,
they are the only data type that Last Write Wins (LWW) applies to. As
part of that, a wall-clock timestamp (OS Time) is in the metadata of any
operation on a String. If RS cannot determine the order of operations,
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

String type in Redis is implicitly and dynamically typed. Besides string
command like APPEND, It is overloaded with numeric and bitfield command
as well like INCR and SETBIT. However, bitfield, numeric, float vs pure
string data behave differently in CRDBs. In standard Redis, string type
checks the stored value dynamically to decide which commands can operate
on the value. For example, you can first set a string key to "abc" use
the APPEND command and SET the same key to 7 and use INCR to update it
to 8.

In CRDTs the initial type of the value is identified by the method used
to create the value. To create a counter value, you can use INCR, DECR,
INCRBY, DECRBY. However, in CRDTs the type of the value does not
dynamically change after creation. So if a string key is initialized
using the SET or MSET method, even if the value is set to a numeric
value, numeric commands like INCR return an error.

Please note that bitfield methods like SETBIT are not supported in CRDBs
in this version.

To initialize a key as pure string, simply use the SET command. With the
value, you can use APPEND, GET, GETRANGE, GETSET, MGET, MSET, MSETNX,
PSETEX, SET, SETEX, SETNX, SETRANGE, STRLEN methods. Once a string value
is initialized using SET command, bitfield or numeric commands no longer
work on the string data and return the following generic type mismatch
error

*(error) WRONGTYPE Operation against a key holding the wrong kind of
value*

### String Data Type with Counter Value in CRDBs

While traditional Redis does not have an explicit counter type, Redis
Enterprise Software's CRDBs does. Counters can be used to implement
distributed counters. This can be useful when counting total views of an
article or image, or when counting social interactions like "retweets"
or "likes" of an article in a CRDB distributed to multiple geographies.

On conflicting writes, counters accumulate the total counter operations
across all member CRDBs in each sync. Here is an example of how counter
values can be initialized and maintained across two member CRDBs. With
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

It is important to note that counter values are created through the
INCR, INCRBY, DECR and DECRBY commands and only these commands can be
used to change counter values. Using other string commands return the
following generic type mismatch error

*(error) WRONGTYPE Operation against a key holding the wrong kind of
value*

Note: CRDB supports 59-bit counters. This limitation is to protect from
overflowing a counter in a concurrent operation.
