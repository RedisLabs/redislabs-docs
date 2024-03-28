---
Title: Redis Cloud changelog (April 2024)
linktitle: April 2024
description: New features, enhancements, and other changes added to Redis Cloud during April 2024.
highlights: Search and query throughput in ops/sec
weight: 55
alwaysopen: false
categories: ["RC"]
aliases: []
---

## Enhancements

### Search and query throughput in ops/sec

You can now set the throughput for databases with Search and query in operations per second (ops/sec), like all other Redis databases. This will let you seamlessly scale your query workload in and out as needed. 

## Deprecations

- Setting throughput by `number-of-shards` is now deprecated for the `POST /v1/subscriptions/{subscriptionId}/databases` REST API endpoint and will be removed soon. We recommend changing the throughput measurement to `operations-per-second` when you create databases using the Redis Cloud API.