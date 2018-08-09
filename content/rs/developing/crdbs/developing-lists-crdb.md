---
Title: Developing with Lists in a CRDB
description: $description
weight: $weight
alwaysopen: false
---
[Redis Lists are simply lists of strings, sorted by insertion order. It
is possible to add elements to a Redis List that push new elements to
the head (on the left) or to the tail (on the right) of the list. Redis
Lists can be used to easily implement queues (using LPUSH and RPOP, for
example) and stacks (using LPUSH and LPOP, for
example).]{style="font-weight: 400;"}

[Lists in CRDBs are just the same as regular Redis Lists. Please see the
following examples to get familiar with Lists' behavior in a
CRDB.]{style="font-weight: 400;"}

 

[[Simple Lists
example:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[LPUSH mylist "hello"]{style="font-weight: 400;"}

t2

[--- Sync ---]{style="font-family: courier;"}

 t3

[LPUSH mylist "world"]{style="font-weight: 400;"}

t4

[--- Sync ---]{style="font-family: courier;"}

 t5

[LRANGE mylist 0 -1 =\>]{style="font-weight: 400;"}["world"
"hello"]{style="font-weight: 400;"}

[LRANGE mylist 0 -1 =\> ]{style="font-weight: 400;"}["world"
"hello"]{style="font-weight: 400;"}

[*[Explanation]{style="font-weight: 400;"}*]{style="text-decoration: underline;"}*[:]{style="font-weight: 400;"}*[
The final list contains both the "world" and "hello" elements, in that
order (Instance 2 observed "hello" when it added
"world").]{style="font-weight: 400;"}

 

[[Example of Lists with Concurrent
Insertions:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[LPUSH L x]{style="font-weight: 400;"}

t2

[--- Sync ---]{style="font-family: courier;"}

 t3

[LINSERT L AFTER x y1]{style="font-weight: 400;"}

 t4

[LINSERT L AFTER x y2]{style="font-weight: 400;"}

 t5

[LRANGE L 0 -1 =\> ]{style="font-weight: 400;"}[x
y1]{style="font-weight: 400;"}

[LRANGE L 0 -1 =\> ]{style="font-weight: 400;"}[x
y2]{style="font-weight: 400;"}

t6

[--- Sync ---]{style="font-family: courier;"}

 t7

[LRANGE L 0 -1 =\> ]{style="font-weight: 400;"}[x y1
y2]{style="font-weight: 400;"}

[LRANGE L 0 -1 =\> ]{style="font-weight: 400;"}[x y1
y2]{style="font-weight: 400;"}

[*[Explanation]{style="font-weight: 400;"}*]{style="text-decoration: underline;"}*[:]{style="font-weight: 400;"}*[
Instance 1 added an element y1 after x, and then Instance 2 added
element y2 after x. The final List contains all three elements: x is the
first element, after it y1 and then y2, since Instance 2 performed the
LINSERT operation at time t4\>t3.]{style="font-weight: 400;"}

 

[[Example of Deleting a List while Pushing a New
Element:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[LPUSH L x]{style="font-weight: 400;"}

t2

[--- Sync ---]{style="font-family: courier;"}

t3

[LRANGE L 0 -1 =\> x]{style="font-weight: 400;"}

[LRANGE L 0 -1 =\> x]{style="font-weight: 400;"}

 t4

[LPUSH L y]{style="font-weight: 400;"}

[DEL L]{style="font-weight: 400;"}

t5

[--- Sync ---]{style="font-family: courier;"}

 t6

[LRANGE L 0 -1 =\> y]{style="font-weight: 400;"}

[LRANGE L 0 -1 =\> y]{style="font-weight: 400;"}

[*[Explanation]{style="font-weight: 400;"}*]{style="text-decoration: underline;"}*[:]{style="font-weight: 400;"}*[
At t4 -- t6, DEL deletes only observed elements. This is why L still
contains y.]{style="font-weight: 400;"}

 

[[Example of Popping Elements from a
List:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[LPUSH L x y z]{style="font-weight: 400;"}

t2

[--- Sync ---]{style="font-family: courier;"}

t3

[RPOP L =\> x]{style="font-weight: 400;"}

t4

[--- Sync ---]{style="font-family: courier;"}

 t5

[RPOP L =\> y]{style="font-weight: 400;"}

t6

[--- Sync ---]{style="font-family: courier;"}

 t7

[RPOP L =\> z]{style="font-weight: 400;"}

[RPOP L =\> z]{style="font-weight: 400;"}

[*[Explanation]{style="font-weight: 400;"}*]{style="text-decoration: underline;"}*[:]{style="font-weight: 400;"}*[
At t1, the operation pushes elements x, y, z to List L. At3, the
sequential pops behaves as expected from a queue. At 7, the concurrent
pop in both instances might show the same result. The instance was not
able to sync regarding the z removal so, from the point of view of each
instance, z is located in the List and can be popped. After syncing,
both lists are empty.]{style="font-weight: 400;"}

[Be aware of the behavior of Lists in CRDBs when using List as a stack
or queue. As seen in the above example, two parallel RPOP operations
performed by two different CRDB instances can get the same element in
the case of a concurrent operation. Lists in CRDBs guarantee that each
element will be POP-ed at least once, but cannot guarantee that each
element will be POP-ed only once. Such behavior should be taken into
account when, for example, using Lists in CRDBs as building blocks for
inter-process communication systems.]{style="font-weight: 400;"}

[In that case, if the same element cannot be handled twice by the
application(s), it's recommended that the POP operations be performed by
one CRDB instance, whereas the PUSH operations can be performed by
multiple CRDB instances.]{style="font-weight: 400;"}
