---
Title: Reclaim Expired Keys Memory Faster
date:  2018-03-26 16:49:29 +0530
weight: 140
categories: ["RI"]
path: memory-optimizations/reclaim-expired-keys-memory-faster/
altTag: Reclaim Expired Keys Memory Faster
---
When you set an expiry on a key, redis does not expire it at that instant. Instead, it uses a [randomized algorithm](https://redis.io/commands/expire) to find out keys that should be expired. Since this algorithm is random, there are chances that redis will not expire keys. This means that redis will consume memory to hold keys that have already expired. The moment the key is accessed, it will be deleted.

If there are only a few keys that have expired and redis hasn't deleted them - it is fine. It's only a problem when a large number of keys haven't expired.

## How to Detect if Memory is not Reclaimed After Expiry

1. Run the `INFO` command and find the total_memory_used and sum of all the keys for all the databases.
1. Then take a Redis Dump(RDB) and find out the total memory and total number of keys.

Looking at the difference you can clearly point out that lot of memory is still not reclaimed for the keys that have expired.

## How to Reclaim expired Keys Memory Faster

You can follow one of these three steps to reclaim the memory:

1. Restart your redis-server
1. Increase memorysamples in redis conf. (default is 5, max is 10) so that expired keys are reclaimed faster.
1. You can setup a cron job that will run scan command after an interval which will help in reclaiming the memory of the expired keys.
1. Alternatively, Increasing the expiry of keys will also help.

## Trade Offs

If we increase the memorysamples config, it will expire the keys faster, but it will cost more CPU cycles, which will increase latency of commands. Secondly, increasing the expiry of keys will help but that will require significant changes to application logic.
