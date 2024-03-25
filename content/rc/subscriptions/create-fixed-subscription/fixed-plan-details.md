---
Title: Fixed plan details
description: Provides detailed information on Fixed plans
weight: $weight
alwaysopen: false
categories: ["RC"]
---

## Current Fixed plans

These plans are currently offered for all new and upgraded Fixed subscriptions (updated March 2024).

| **DB&nbsp;size**<sup>[1](#table-note-1)</sup> | **30&nbsp;MB&nbsp;(Free)** | **250 MB** | **1 GB** | **2.5 GB** | **5 GB** | **12 GB** |
|---|---|---|---|---|---|---|
| **Concurrent<br/>connections<br/>per database** | 30 | 256 | 1024 | 2500 | 5000 | 10000 |
| **CIDR<br/> allow rules** | 1 | 4 | 4-8 | 4-8 | 4-16 | 4-32 |
| **Monthly<br/> total network<br/> bandwidth** | 5&nbsp;GB | 100&nbsp;GB | 200&nbsp;GB | 400&nbsp;GB | 800&nbsp;GB | 2000&nbsp;GB |
| **Maximum<br/> throughput<sup>[2](#table-note-2)</sup>** | 100&nbsp;ops/sec | 1000&nbsp;ops/sec | 2000&nbsp;ops/sec | 4000&nbsp;ops/sec | 8000&nbsp;ops/sec | 16000&nbsp;ops/sec |

1. <a name="table-note-1" style="display: block; height: 80px; margin-top: -80px;"></a> Database size includes replication where applicable. See [High availability cost impact]({{<relref "rc/databases/configuration/high-availability#performance-and-cost-impact">}}) for more information.

2. <a name="table-note-2" style="display: block; height: 80px; margin-top: -80px;"></a> Assumes request size of 1 KiB. Maximums are capped by actual MB/s reached. To find the MB/s limit, divide the Maximum throughput by 1024.

## Previous plans {#legacy}

These plans were available before November 2023.

{{<table-scrollable>}}
| **Max&nbsp;DB&nbsp;size&nbsp;**<sup>[1](#table-note-1-legacy)</sup>               | **30 MB**        | **100 MB**       | **250 MB**        | **500 MB**        | **1 GB**          | **2.5 GB**        | **5 GB**          | **10 GB**          |
|-----------------------------------------------------------------------------------|------------------|------------------|-------------------|-------------------|-------------------|-------------------|-------------------|--------------------|
| **Concurrent<br/>connections<br/>per database**                                   | 30               | 256              | 256               | 512               | 1024              | 2500              | 5000              | 10000              |
| **Monthly<br/> total network<br/> bandwidth**<sup>[2](#table-note-2-legacy)</sup> | 5&nbsp;GB        | 50&nbsp;GB       | 100&nbsp;GB       | 150&nbsp;GB       | 200&nbsp;GB       | 400&nbsp;GB       | 800&nbsp;GB       | 2000&nbsp;GB       |
| **Maximum<br/> throughput**                                                       | 100&nbsp;ops/sec | 500&nbsp;ops/sec | 1000&nbsp;ops/sec | 1500&nbsp;ops/sec | 2000&nbsp;ops/sec | 4000&nbsp;ops/sec | 8000&nbsp;ops/sec | 16000&nbsp;ops/sec |
{{</table-scrollable>}}

1. <a name="table-note-1-legacy" style="display: block; height: 80px; margin-top: -80px;"></a> Database size includes replication. See [High availability cost impact]({{<relref "rc/databases/configuration/high-availability#performance-and-cost-impact">}}) for more information.

2. <a name="table-note-2-legacy" style="display: block; height: 80px; margin-top: -80px;"></a> Assumes request size of 1 KiB. Maximums are capped by actual MB/s reached. To find the MB/s limit, divide the Maximum throughput by 1024.