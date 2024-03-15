---
title: Manage subscriptions
description: 
weight: 35
alwaysopen: false
categories: ["RC"]
linktitle: Subscriptions
aliases: /rv/administration/setup_and_editing/
         /rc/administration/setup-and-editing/
         /rc/administration/setup-editing/
         /rc/administration/setup/
         /rc/administration/setup/_index.md              
         /rv/administration/setup_and_editing/create-subscription/
         /rv/administration/setup_and_editing/creating-subscription/
         /rc/administration/setup/create-subscription/
         
---

This page helps you manage your Redis Cloud subscriptions; it briefly compares available plans and shows where to find help with common tasks.

## Subscription plans

As of November 2022, Redis Cloud supports the following subscription plans:

- [Free Redis Cloud Essentials](#free-rce)
- [Paid Redis Cloud Essentials](#paid-rce)
- [Redis Cloud Pro](#redis-cloud-pro)

Here's a quick comparison of each plan:

| Feature | Redis Cloud Essentials (free) | Redis Cloud Essentials (paid) | Redis Cloud Pro |
|:-----|:-------:|:----:|:-----:|
| Memory size | 30 MB | 250 MB-12 GB | 50 TB |
| Concurrent connections | 30 | 256-Unlimited | Unlimited |
| Security | role-based auth<br/>password protection<br/>encryption in transit | role-based auth<br/>password protection<br/>SSL & SIP auth<br/>encryption in transit | role-based auth<br/>password protection<br/>SSL & SAIP auth<br/>encryption in transit<br/>encryption at rest |
| Admin REST API | No | No | Yes |  
| Support | Basic | Standard | Hourly: Enhanced<br/>Annual: Premium |
| Selected additional features<br/> <br/> <br/>|| Replication<br/>Auto-failover<br /> | Dedicated accounts<br>Auto Tiering<br/>Active/Active<br/> |   

To learn more, see [Redis Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing/).

### Free Redis Cloud Essentials {#free-rce}

Free plans are a type of Redis Cloud Essentials plans designed for training purposes and prototyping. They can be seamlessly upgraded to other Redis Cloud Essentials plans with no data loss.

### Paid Redis Cloud Essentials {#paid-rce}
Redis Cloud Essentials is cost-efficient and designed for low-throughput scenarios. It support a range of availability, persistence, and backup options.  Pricing supports low throughput workloads.

### Redis Cloud Pro
Redis Cloud Pro supports more databases, larger databases, greater throughput, and unlimited connections compared to Redis Cloud Essentials. Hosted in dedicated VPCs, they feature high-availability in a single or multi-AZ, Active-Active, Auto-Tiering, clustering, data persistence, and configurable backups.  Pricing is "pay as you go" to support any dataset size or throughput.

Redis Cloud Pro annual plans support the same features as Redis Cloud Pro but at significant savings. Annual plans also provide Premium support. The underlying commitment applies to all workloads across multiple providers and regions.


