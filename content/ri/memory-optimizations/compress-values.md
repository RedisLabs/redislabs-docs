---
Title: Compress Values
date: 2018-03-26 16:49:29 +0530
weight: 10
categories: ["RI"]
path: memory-optimizations/compress-values/
altTag: Compress Values
---
Redis and clients are typically IO bound and the IO costs are typically at least 2 orders of magnitude in respect to the rest of the request/reply sequence. Redis by default does not compress any value that is stored in it, hence it becomes important to compress your data before storing in Redis. This helps in reducing the payload which in return gives you higher throughput, lower latency and higher savings in your cost.

## How to Compress Strings

There are several compression algorithms to choose from, each with it's own tradeoffs.

1. Snappy by google aims for very high speeds and reasonable compression.
1. LZO compresses fast and decompresses faster.
1. Others such as Gzip are more widely available.

GZIP compression uses more CPU resources than Snappy or LZO, but provides a higher compression ratio. GZip is often a good choice for cold data, which is accessed infrequently. Snappy or LZO are a better choice for hot data, which is accessed frequently.

Compressing strings requires code changes. Some libraries can transparently compress objects, you would only need to configure your library. In other cases, you might have to compress the data manually.

## Advantages

Compressing strings can save you anywhere between 30-50% memory. By compressing strings, you also reduce the network bandwidth between your application and redis databases.

## Trade Offs

Compressing/Decompressing requires your application to do extra work. This tradeoff is usually worth it. If you are concerned about additional CPU load, switch to a faster algorithm like snappy or LZO.

## When to Avoid Compression

Compression should not be followed blindly, there are times when compression does not help you reduce your memory, rather increases your CPU utilization. There are few cases when compression should be avoided:

1. For shorter Strings it's likely a waste of time. Short strings generally don't compress much, so the gain would be too small.
1. When the data isn't well structured, compression should be avoided. JSON and XML are good at compression as they have repeated characters and tags.
