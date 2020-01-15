---
Title: Switch to 32 Bits
date: 2018-03-26 16:49:29 +0530
weight: 30
categories: ["RI"]
path: memory-optimizations/switch-to-32-bits/
altTag: Switch to 32 bits
---
Redis gives you the following statistics for a 64-bit machine.

1. An empty instance uses ~ 3MB of memory.
1. 1 Million small Keys -> String Value pairs use ~ 85MB of memory.
1. 1 Million Keys -> Hash value, representing an object with 5 fields, use ~ 160 MB of memory.

64-bit has more memory available as compared to a 32-bit machine. But if you are sure that your data size does not exceed 3 GB then storing in 32 bits is a good option.

64-bit systems use considerably more memory than 32-bit systems to store the same keys, especially if the keys and values are small. This is because small keys are allocated full 64 bits resulting in the wastage of the unused bits.

## Advantages

Switching to 32-bit from 64-bit machine can substantialy reduce the cost of the machine used and can optimize the usage of memory.

## Trade Offs

For the 32-bit Redis variant, any key name larger than 32 bits requires the key to span to multiple bytes, thereby increasing the memory usage.

## When to Avoid Switching to 32 bit

If your data size is expected to increase more than 3 GB then you should avoid switching.
