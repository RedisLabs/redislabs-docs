---
Title: Shard Big Hashes to Small Hashes
date: 2018-03-26 16:49:29 +0530
weight: 90
categories: ["RI"]
path: memory-optimizations/shard-big-hashes-to-small-hashes/
altTag: Shard Big Hashes to Small Hashes
---
If you have a hash with large number of key, value pairs, and if each key, value pair is small enough - break it into smaller hashes to save memory. To shard a HASH table, we need to choose a method of partitioning our data.

Hashes themselves have keys which can be used for partitioning the keys into different shards. The number of shards are determined by the total number of keys we want to store and the shard size. Using this and the hash value we can determine the shard ID in which the key resides.

## How Sharding Happens

- **Numeric Keys** - For Numeric keys, keys are assigned to a shard ID based on their numeric key value (keeping numerically similar keys in the same shard).

- **Non-Numeric Keys** - For Non-Numeric keys, CRC32 checksum is used. CRC32 is used in this case because it returns a simple integer without additional work and is fast to calculate (much faster than MD5 or SHA1 hashes).

## Things to Keep in Mind

You should be consistent about the `total no. of expected elements` and the `shard size` while sharding because these two information are required to keep the number of shards down. Ideally, you should not change the values as this changes the number of shards.

If you were to change any one the values, you should have a process for moving your data from the old datashards to the new data shards (this is generally known as resharding).

## Trade Off

The only trade off of converting big hashes to small hashes is that it increase the complexity in your code.
