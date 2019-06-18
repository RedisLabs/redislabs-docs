---
Title: Developing with HyperLogLog in a CRDB
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
**HyperLogLog** is an algorithm to address the [count-distinct problem](https://en.wikipedia.org/wiki/Count-distinct_problem).
To do this it approximates the numbers of items in a [multiset](https://en.wikipedia.org/wiki/Multiset).
Determining the _exact_ cardinality of a multiset requires memory according to the cardinality of the multiset.
Because it estimates the cardinality by probability, the HyperLogLog algorithm can run with more reasonable memory requirements.

## HyperLogLog in Redis

Open source Redis implements [HyperLogLog](https://redislabs.com/redis-best-practices/counting/hyperloglog/) (HLL) as a native data-structure.
It supports adding elements (PFADD) to an HLL, counting elements (PFCOUNT) of HLLs, and merging of (PFMERGE) HLLs.

## HLL in CRDBs versus HLL in Open Source Redis

In CRDBs, we implemented HLL within the CRDT on the basis of the Redis implementation with a few exceptions:

- Redis keeps the HLL data structure as an encoded string object
    such that you can potentially run any string request can on a key that contains an HLL. In CRDT, only get and set are supported for HLL.
- In CRDT, if you do SET on a key that contains a value encoded as an HLL, then the value will remain an HLL. If the value is not encoded as HLL, then it will be a register.

## The DEL-Wins approach

Other collections in the Redis-CRDT implementation use the observed remove method to resolve conflicts.
The CRDT-HLL uses the DEL-wins method.
If a DEL request is received at the same time as any other request (ADD/MERGE/EXPIRE) on the HLL-key
the replicas consistently converge to delete key.
In the observed remove method used by other collections (sets, lists, sorted-sets and hashes),
only the replica that received the DEL request removes the elements, but elements added concurrently in other replicas exist in the consistently converged collection.
We chose to use the DEL-wins method for the CRDT-HLL to maintain the original time and space complexity of the HLL in open source Redis.

Here is an example of a DEL-wins case:

| HLL  |                 |                 |  \|  | Set  |                     |                     |
| ---- | --------------- | --------------- | ---- | ---- | ------------------- | ------------------- |
|      |                 |                 |  \|  |      |                     |                     |
| Time | Replica 1       | Replica 2       |  \|  | Time | Replica 1           | Replica 2           |
|      |                 |                 |  \|  |      |                     |                     |
| t1   | PFADD h e1      |                 |  \|  | t1   | SADD s e1           |                     |
| t2   | --- sync ---    |                 |  \|  | t2   | --- sync ---        |                     |
| t3   | Pfcount h --> 1 | Pfcount h --> 1 |  \|  | t3   | SCARD s --> 1       | SCARD s --> 1       |
| t4   | PFADD h e2      | Del h           |  \|  | t4   | SADD s e2           | Del S               |
| t5   | Pfcount h --> 2 | Pfcount h --> 0 |  \|  | t5   | SCARD s --> 2       | SCARD s --> 0       |
| t6   | --- sync ---    |                 |  \|  | t6   | --- sync ---        |                     |
| t7   | Pfcount h --> 0 | Pfcount h --> 0 |  \|  | t7   | SCARD s --> 1       | SCARD s --> 1       |
| t8   | Exists h --> 0  | Exists h --> 0  |  \|  | t8   | Exists s --> 1      | Exists s --> 1      |
|      |                 |                 |  \|  | t9   | SMEMBERS s --> {e2} | SMEMBERS s --> {e2} |
