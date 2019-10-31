---
Title: Enable Compression for List
date: 2018-03-26 16:49:29 +0530
weight: 130
categories: ["RI"]
path: memory-optimizations/enable-compression-for-list/
altTag: Enable Compression for Internal Nodes within a List
---
List is just a link list of arrays, where none of the arrays are compressed. By default, redis does not compress elements inside a list. However, if you use long lists, and mostly access elements from the head and tail only, then you can enable compression.

We have two configurations:
List-max-ziplist-size: 8kb(default)
List-compression-depth: 0,1,2 (0 by default)

A configuration change in redis.conf `list-compression-depth=1` helps you achieve compression.

## What is compression-depth

Compression depth is the number of list nodes from each end of the list to leave untouched before we start compressing inner nodes.

Example:

1. a depth=1 means compress every list node except the head and tail of the list.
1. A depth=2 means never compress head or head->next or tail or tail->prev.
1. A depth=3 starts compression after head->next->next and before tail->prev->prev, etc.

## Trade Offs

For small values (for example 40 bytes per list entry here), compression has very little performance impact. When using 40 byte values with a max ziplist size of 8k, that's around 200 individual elements per ziplist. You only pay the extra "compression overhead" cost when a new ziplist gets created (in this case, once every 200 inserts).

For larger values (for example 1024 bytes per list entry here), compression does have a noticeable performance impact, but Redis is still operating at over 150,000 operations per second for all good values of ziplist size (-2). When using 1024 byte values with a max ziplist size of 8k, that works out to 7 elements per ziplist. In this case, you pay the extra compression overhead once every seven inserts. That's why the performance is slightly less in the 1024 byte element case.
