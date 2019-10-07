---
Title: Convert Hashtable to Ziplist for Hashes
date: 2018-03-26 16:49:29 +0530
weight: 100
categories: ["RI"]
path: memory-optimizations/convert-hashtable-to-ziplist-for-hashes/
altTag: Convert Hashtable to Ziplist for Hashes
---
Hashes have two types of encoding- HashTable and Ziplist. The decision of storing in which of the data structures in done based on the two configurations Redis provides - `hash-max-ziplist-entries` and `hash-max-ziplist-values`.

By default the redis conf has these settings as:

- hash-max-ziplist-entries = 512
- hash-max-ziplist-values = 64

So if any value for a key exceeds the two configurations it is stored automatically as a Hashtable instead of a Ziplist. It is observed that HashTable consumes almost double the memory as compared to Ziplist so in order to save your memory you can increase the two configurations and convert your hashtables to ziplist.

## Why Ziplist Uses Less Memory

The ziplist implementation in Redis achieves itssmall memory size by storing only three pieces of data per entry; the first is the length of the previous entry, second is the length of current entry and third is the stored data. Therefore, ziplists consumes less memory.

## Trade Offs

This brevity comes at a cost because more time is required for changing the size and retrieving the entry. Hence, there is an increase in latency and possibly increase in CPU utilization on your redis server.

{{% note %}}
Similarly, for sorted sets can also be converted to ziplist, but the only differnce is that zset-max-ziplist-entries is 128 which is less that what is there for hashes.
{{% /note %}}
