---
Title: Fixed plan details
description: Provides detailed information on Fixed plans
weight: $weight
alwaysopen: false
categories: ["RC"]
---

## Current plans

These plans are currently offered for all new and upgraded Fixed subscriptions as of February 2024.

There are some differences between plans for the different high availability options. See the tables for [No replication and single-zone replication](#cache-standard) and [Multi-zone replication](#multi-az) for more details.

### No replication and single-zone replication {#cache-standard}

| **DB&nbsp;size**<sup>[1](#table-note-1-cache-standard)</sup> | **30&nbsp;MB&nbsp;(Free)** | **250 MB** | **1 GB** | **2.5 GB** | **5 GB** | **12 GB** |
|---|---|---|---|---|---|---|
| **Concurrent<br/>connections<br/>per database** | 30 | 256 | 1024 | 2500 | 5000 | 10000 |
| **CIDR<br/> allow rules** | 1 | 4 | 4-8 | 4-8 | 4-16 | 4-32 |
| **Monthly<br/> total network<br/> bandwidth** | 5&nbsp;GB | 100&nbsp;GB | 200&nbsp;GB | 400&nbsp;GB | 800&nbsp;GB | 2000&nbsp;GB |
| **Maximum<br/> throughput<sup>[2](#table-note-2-cache-standard)</sup>** | 100&nbsp;ops/sec | 1000&nbsp;ops/sec | 2000&nbsp;ops/sec | 4000&nbsp;ops/sec | 8000&nbsp;ops/sec | 16000&nbsp;ops/sec |

1. <a name="table-note-1-cache-standard" style="display: block; height: 80px; margin-top: -80px;"></a> Database size includes replication where applicable. See [High availability cost impact]({{<relref "rc/databases/configuration/high-availability#performance-and-cost-impact">}}) for more information.

2. <a name="table-note-2-cache-standard" style="display: block; height: 80px; margin-top: -80px;"></a> Assumes request size of 1 KiB. Maximums are capped by actual MB/s reached. To find the MB/s limit, divide the Maximum throughput by 1024.

### Multi-zone replication {#multi-az}

| **DB&nbsp;size&nbsp;**<sup>[1](#table-note-1-multi-az)</sup> | **250 MB** | **1 GB** | **2.5 GB** | **5 GB** | **12 GB** |
|---|---|---|---|---|---|
| **Concurrent<br/>connections<br/>per database** | 256 | 1024 | 2500 | 5000 | 10000 |
| **CIDR<br/> allow rules** | 4 | 8 | 8 | 16 | 32 |
| **Monthly<br/> total network<br/> bandwidth** | 64&nbsp;GB | 200 GB | 400 GB | 800 GB | 2000 GB |
| **Maximum<br/> throughput<sup>[2](#table-note-2-multi-az)</sup>** | 1000 ops/sec | 2000 ops/sec | 4000 ops/sec | 8000 ops/sec | 16000 ops/sec |

1. <a name="table-note-1-multi-az" style="display: block; height: 80px; margin-top: -80px;"></a> Database size includes replication. See [High availability cost impact]({{<relref "rc/databases/configuration/high-availability#performance-and-cost-impact">}}) for more information.

2. <a name="table-note-2-multi-az" style="display: block; height: 80px; margin-top: -80px;"></a> Assumes request size of 1 KiB. Maximums are capped by actual MB/s reached. To find the MB/s limit, divide the Maximum throughput by 1024.

## Previous plans {#legacy}

These plans were available before November 2023.

| **Max&nbsp;DB&nbsp;size&nbsp;**<sup>[1](#table-note-1-legacy)</sup> | **100 MB** | **500 MB** | **10 GB** |
|---|---|---|---|
| **Concurrent<br/>connections<br/>per database** | 256 | 1024 | 10000 |
| **Monthly<br/> total network<br/> bandwidth**<sup>[2](#table-note-2-legacy)</sup> | 50&nbsp;GB | 150&nbsp;GB | 2000&nbsp;GB |
| **Maximum<br/> throughput** | 500&nbsp;ops/sec | 1500&nbsp;ops/sec | 16000&nbsp;ops/sec |

1. <a name="table-note-1-legacy" style="display: block; height: 80px; margin-top: -80px;"></a> Database size includes replication. See [High availability cost impact]({{<relref "rc/databases/configuration/high-availability#performance-and-cost-impact">}}) for more information.

2. <a name="table-note-2-legacy" style="display: block; height: 80px; margin-top: -80px;"></a> Assumes request size of 1 KiB. Maximums are capped by actual MB/s reached. To find the MB/s limit, divide the Maximum throughput by 1024.