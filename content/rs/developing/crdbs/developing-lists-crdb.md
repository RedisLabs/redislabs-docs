---
Title: Developing with Lists in a CRDB
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Lists are simply lists of strings, sorted by insertion order. It
is possible to add elements to a Redis List that push new elements to
the head (on the left) or to the tail (on the right) of the list. Redis
Lists can be used to easily implement queues (using LPUSH and RPOP, for
example) and stacks (using LPUSH and LPOP, for
example).

Lists in CRDBs are just the same as regular Redis Lists. Please see the
following examples to get familiar with Lists' behavior in a
CRDB.

Simple Lists
example:

|  **Time** | **CRDB Instance 1** | **CRDB Instance 2** |
|  ------: | :------: | :------: |
|  t1 | LPUSH mylist “hello” |  |
|  t2 | — Sync — | — Sync — |
|  t3 |  | LPUSH mylist “world” |
|  t4 | — Sync — | — Sync — |
|  t5 | LRANGE mylist 0 -1 =>“world” “hello” | LRANGE mylist 0 -1 => “world” “hello” |

**Explanation**:
The final list contains both the "world" and "hello" elements, in that
order (Instance 2 observed "hello" when it added
"world").

Example of Lists with Concurrent
Insertions:

|  **Time** | **CRDB Instance 1** | **CRDB Instance 2** |
|  ------: | :------: | :------: |
|  t1 | LPUSH L x |  |
|  t2 | — Sync — | — Sync — |
|  t3 | LINSERT L AFTER x y1 |  |
|  t4 |  | LINSERT L AFTER x y2 |
|  t5 | LRANGE L 0 -1 => x y1 | LRANGE L 0 -1 => x y2 |
|  t6 | — Sync — | — Sync — |
|  t7 | LRANGE L 0 -1 => x y1 y2 | LRANGE L 0 -1 => x y1 y2 |

**Explanation**:
Instance 1 added an element y1 after x, and then Instance 2 added
element y2 after x. The final List contains all three elements: x is the
first element, after it y1 and then y2, since Instance 2 performed the
LINSERT operation at time t4\>t3.

Example of Deleting a List while Pushing a New
Element:

|  **Time** | **CRDB Instance 1** | **CRDB Instance 2** |
|  ------: | :------: | :------: |
|  t1 | LPUSH L x |  |
|  t2 | — Sync — | — Sync — |
|  t3 | LRANGE L 0 -1 => x | LRANGE L 0 -1 => x |
|  t4 | LPUSH L y | DEL L |
|  t5 | — Sync — | — Sync — |
|  t6 | LRANGE L 0 -1 => y | LRANGE L 0 -1 => y |

**Explanation**
At t4 - t6, DEL deletes only observed elements. This is why L still
contains y.

Example of Popping Elements from a
List:

|  **Time** | **CRDB Instance 1** | **CRDB Instance 2** |
|  ------: | :------: | :------: |
|  t1 | LPUSH L x y z |  |
|  t2 | — Sync — | — Sync — |
|  t3 |  | RPOP L => x |
|  t4 | — Sync — | — Sync — |
|  t5 | RPOP L => y |  |
|  t6 | — Sync — | — Sync — |
|  t7 | RPOP L => z | RPOP L => z |

**Explanation**:
At t1, the operation pushes elements x, y, z to List L. At t3, the
sequential pops behave as expected from a queue. At t7, the concurrent
pop in both instances might show the same result. The instance was not
able to sync regarding the z removal so, from the point of view of each
instance, z is located in the List and can be popped. After syncing,
both lists are empty.

Be aware of the behavior of Lists in CRDBs when using List as a stack
or queue. As seen in the above example, two parallel RPOP operations
performed by two different CRDB instances can get the same element in
the case of a concurrent operation. Lists in CRDBs guarantee that each
element will be POP-ed at least once, but cannot guarantee that each
element will be POP-ed only once. Such behavior should be taken into
account when, for example, using Lists in CRDBs as building blocks for
inter-process communication systems.

In that case, if the same element cannot be handled twice by the
application(s), it's recommended that the POP operations be performed by
one CRDB instance, whereas the PUSH operations can be performed by
multiple CRDB instances.
