---
Title: Switch to bloom filter or hyperloglog
date: 2018-03-26 16:49:29 +0530
weight: 80
categories: ["RI"]
path: memory-optimizations/switch-to-bloom-filter-or-hyperloglog/
altTag: Switch to bloom filter or hyperloglog
---
Unique items can be difficult to count. Usually this means storing every unique item then recalling this information somehow. With Redis, this can be accomplished by using a set and a single command, however both the storage and time complexity of this with very large sets is prohibitive. HyperLogLog provides a probabilistic alternative.

If your set contains a very large number of elements, and you are only using the set for existence checks or to eliminate duplicates - then you benefit by using a bloom filter.

Bloom filters aren't natively supported, but you can find several solutions on top of redis. If you are only using the set to count number of unique elements - like unique ip addresses, unique pages visited by a user etc - then switching to hyperloglog saves significant memory.

## Trade Offs

Following are the Trade Offs of using HyperLogLog:

1. The results that are achieved from HyperLogLog are not 100% accurate, they have an approximate standard error of 0.81%.
1. Hyperloglog only tells you the unique count. It cannot tell you the elements in the set.

For example, if you want to maintain how many unique ipaddresses made an API call today. HyperLogLog tells you
`46966 unique IPs for today`.

But if you want `Show me those 46966 IP Addresses` — it cannot show you. For that, you need to maintain all the IP Addresses in a set
