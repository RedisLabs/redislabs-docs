---
Title: Redis Cloud Essentials plans
description: Provides detailed information on Redis Cloud Essentials plans
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: [ /rc/subscriptions/create-fixed-subscription/fixed-plan-details,
            /rc/subscriptions/view-fixed-subscription/fixed-plan-details ]

---

Redis Cloud Essentials is cost-efficient and designed for low-throughput scenarios. It support a range of availability, persistence, and backup options.  

Essentials plan [pricing](https://redis.com/cloud/pricing/) scales according to the memory size of the database defined in the subscription.  Additional limits also apply, as shown in the tables below.

The 30 MB Essentials plan is free; it's designed for learning and building test projects. It gives you enough space to learn Redis concepts and develop application prototypes.

Our paid plans start at 250 MB and offer extra features, like high availability and backups (both daily and instant). They are great for bigger projects or production environments that require increased storage, reliability, and other features to support your operational needs.

If you need additional resources, you can [upgrade your subscription]({{<relref "/rc/subscriptions/view-essentials-subscription#upgrade-subscription-plan">}}) at any time.

## Current plans

These plans are currently offered for all new and upgraded Essentials subscriptions (updated March 2024).

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