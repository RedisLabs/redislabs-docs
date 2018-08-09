---
Title: Developing with Sorted Sets in a CRDB
description: $description
weight: $weight
alwaysopen: false
---
[Similar to Redis Sets, Redis Sorted Sets are non-repeating collections
of Strings. The difference between the two is that every member of a
Sorted Set is associated with a score used to order the Sorted Set from
lowest to highest. While members are unique, they may have the same
score.]{style="font-weight: 400;"}

[With Sorted Sets, you can quickly add, remove or update elements as
well as get ranges by score or by rank (position). Sorted Sets in CRDBs
behave the same and maintain additional metadata to handle concurrent
conflicting writes. Conflict resolution is done in two
phases:]{style="font-weight: 400;"}

1.  [First, the database resolves conflict at the set level using "OR
    Set" (Observed-Remove Set). With OR-Set behavior, writes across
    multiple CRDB instances are typically unioned except in cases of
    conflicts. Conflicting writes can happen when a CRDB instance
    deletes an element while the other adds or updates the same element.
    In this case, an observed Remove rule is followed, and only
    instances it has already seen are removed. In all other cases, the
    Add / Update element wins.]{style="font-weight: 400;"}
2.  [Second, the database resolves conflict at the score level. In this
    case, the score is treated as a counter and applies the same
    conflict resolution as regular counters.]{style="font-weight: 400;"}

[Please see the following examples to get familiar with Sorted Sets'
behavior in CRDB:]{style="font-weight: 400;"}

 

[[Example of Simple Sorted Set with No
Conflict:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[ZADD Z 1.1 x]{style="font-weight: 400;"}

t2

[--- Sync ---]{style="font-family: courier;"}

 t3

[ZADD Z 1.2 y]{style="font-weight: 400;"}

t4

[--- Sync ---]{style="font-family: courier;"}

 t5

[ZRANGE Z 0 -1 =\> x y]{style="font-weight: 400;"}

[ZRANGE Z 0 -1 =\> x y]{style="font-weight: 400;"}

[*[Explanation]{style="font-weight: 400;"}*]{style="text-decoration: underline;"}*[:]{style="font-weight: 400;"}*[
When adding two different elements to a Sorted Set from different
replicas (in this example, x with score 1.1 was added by Instance 1 to
Sorted Set Z, and y with score 1.2 was added by Instance 2 to Sorted Set
Z) in a non-concurrent manner (i.e. each operation happened separately
and after both instances were in sync), the end result will be a Sorted
Set including both elements in each CRDB instance.
 ]{style="font-weight: 400;"}

 

[[Example of Sorted Set and Concurrent
Add:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[ZADD Z 1.1 x]{style="font-weight: 400;"}

 t2

[ZADD Z 2.1 x]{style="font-weight: 400;"}

 t3

[ZSCORE Z x =\> 1.1]{style="font-weight: 400;"}

[ZSCORE Z x =\> 2.1]{style="font-weight: 400;"}

t4

[--- Sync ---]{style="font-family: courier;"}

 t5

[ZSCORE Z x =\> 2.1]{style="font-weight: 400;"}

[ZSCORE Z x =\> 2.1]{style="font-weight: 400;"}

[*[Explanation]{style="font-weight: 400;"}*]{style="text-decoration: underline;"}*[:]{style="font-weight: 400;"}*[
When concurrently adding an element x to a Sorted Set Z by two different
CRDB instances (Instance 1 added score 1.1 and Instance 2 added score
2.1), the CRDB implements Last Write Win (LWW) to determine the score of
x. In this scenario, Instance 2 performed the ZADD operation at time
t2\>t1 and therefore the CRDB will set the score 2.1 to
x.]{style="font-weight: 400;"}

 

[[Example of Sorted Set with Concurrent Add Happening at the Exact Same
Time:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[ZADD Z 1.1 x]{style="font-weight: 400;"}

[ZADD Z 2.1 x]{style="font-weight: 400;"}

 t2

[ZSCORE Z x =\> 1.1]{style="font-weight: 400;"}

[ZSCORE Z x =\> 2.1]{style="font-weight: 400;"}

t3

[--- Sync ---]{style="font-family: courier;"}

 t4

[ZSCORE Z x =\> 1.1]{style="font-weight: 400;"}

[ZSCORE Z x =\> 1.1]{style="font-weight: 400;"}

*[Explanation]{style="font-weight: 400;"}[:]{style="font-weight: 400;"}*[
The example above shows a relatively rare situation, in which two CRDB
instances concurrently added the same element x to a Sorted Set at the
same exact time but with a different score, i.e. Instance 1 added x with
a 1.1 score and Instance 2 added x with a 2.1 score. After syncing, the
CRDB realized that both operations happened at the same time and
resolved the conflict by arbitrarily (but consistently across all CRDB
instances) giving precedence to Instance 1.
 ]{style="font-weight: 400;"}

 

[[Example of Sorted Set with Concurrent Counter
Increment:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[ZADD Z 1.1 x]{style="font-weight: 400;"}

t2

[--- Sync ---]{style="font-family: courier;"}

 t3

[ZINCRBY Z 1.0 x]{style="font-weight: 400;"}

[ZINCRBY Z 1.0 x]{style="font-weight: 400;"}

t4

[--- Sync ---]{style="font-family: courier;"}

 t5

[ZSCORE Z x =\> 3.1]{style="font-weight: 400;"}

[ZSCORE Z x =\> 3.1]{style="font-weight: 400;"}

[*[Explanation]{style="font-weight: 400;"}*]{style="text-decoration: underline;"}*[:]{style="font-weight: 400;"}*[
The result is the sum of all
]{style="font-weight: 400;"}[ZINCRBY]{style="font-weight: 400;"}[
operations performed by all CRDB instances.]{style="font-weight: 400;"}

 

[[Example of Removing an Element from a Sorted
Set:]{style="font-weight: 400;"}]{style="text-decoration: underline;"}

**Time**

**CRDB Instance 1**

**CRDB Instance 2**

t1

[ZADD Z 4.1 x]{style="font-weight: 400;"}

t2

[--- Sync ---]{style="font-family: courier;"}

 t3

[ZSCORE Z x =\> 4.1]{style="font-weight: 400;"}

[ZSCORE Z x =\> 4.1]{style="font-weight: 400;"}

 t4

[ZREM Z x]{style="font-weight: 400;"}

[ZINCRBY Z 2.0 x]{style="font-weight: 400;"}

 t5

[ZSCORE Z x =\> nill]{style="font-weight: 400;"}

[ZSCORE Z x =\> 6.1]{style="font-weight: 400;"}

t6

[--- Sync ---]{style="font-family: courier;"}

 t7

[ZSCORE Z x =\> 2.0]{style="font-weight: 400;"}

[ZSCORE Z x =\> 2.0]{style="font-weight: 400;"}

*[[Explanation]{style="text-decoration: underline;"}: ]{style="font-weight: 400;"}*[
At t4 -- t5, concurrent ZREM and ZINCRBY operations ran on Instance 1
and Instance 2 respectively. Before the instances were in sync, the ZREM
operation could only delete what had been seen by Instance 1, so
Instance 2 was not affected. Therefore, the ZSCORE operation shows the
local effect on x. At t7, after both instances were in-sync, the CRDB
resolved the conflict by subtracting 4.1 (the value of element x in
Instance 1) from 6.1 (the value of element x in Instance 2).
 ]{style="font-weight: 400;"}
