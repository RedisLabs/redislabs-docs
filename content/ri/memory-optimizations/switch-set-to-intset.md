---
Title: Switch from Set to Intset
date: 2018-03-26 16:49:29 +0530
weight: 70
categories: ["RI"]
path: memory-optimizations/switch-from-set-to-intset/
altTag: Switch from Set to Intset for Numeric IDs
---
Sets that contain only integers are extremely efficient memory wise. If your set contains strings, try to use integers by mapping string identifiers to integers.

You can either use enums in your programming language, or you can use a redis hash data structure to map values to integers. Once you switch to integers, Redis uses the IntSet encoding internally.

This encoding is extremely memory efficient. By default, the value of set-max-intset-entries is 512, but you can set this value in redis.conf.

## Trade Offs

By increasing the value of set-max-intset-entries, latency increases in set operations, and CPU utilization is also increased on your redis server. You can check this by running this command before and after making this change.

```bash
Run `info commandstats`
```
