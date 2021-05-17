---
title: Manage subscriptions
description: 
weight: 20
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

As of February 2021, Redis Enterprise Cloud supports the following subscription plans:

- _Free plans_ are designed for training purposes and prototyping.  They can be seamlessly upgraded to Fixed plans with no data loss.  (Free plans are a tier of Fixed plans.)

- _Fixed plans_ are cost-efficient and designed for low-throughput scenarios.  They support a range of availability, persistence, and backup options.  Pricing supports low throughput workloads.

- _Flexible plans_ support more databases (and larger sizes), unlimited connections, and greater throughput.  Hosted in dedicated VPCs, they feature high-availability in a single or multi-AZ, active-active geo distribution, Redis-on-Flash (RoF), clustering, data persistence, and configurable backups.  Pricing is "pay as you go" to support any dataset size or throughput.

- _Annual plans_ support the same features as Flexible plans, but at significant savings.  Annual plans also provide Premium support.  Further, the underlying commitment applies to all workloads across multiple providers and regions.

Here's a quick comparison:

| Feature | Free plan | Fixed plan | Flexible/<br/>Annual plan |
|:-----|:-------:|:----:|:-----:|
| Number of databases | 1 | 4 | Unlimited |
| Memory size (max) | 30 MB | 10 GB | 50 TB |
| Concurrent connections | 30 | 256 | Unlimited |
| Security | role-based auth<br/>password protection<br/>encryption in transit | role-based auth<br/>password protection<br/>SSL & SIP auth<br/>encryption in transit | role-based auth<br/>password protection<br/>SSL & SAIP auth<br/>encryption in transit<br/>encryption at rest |
| Admin REST API | No | No | Yes |  
| Support | Best effort | Basic | Flexible: Standard<br/>Annual: Premium |
| Selected additional features<br/> <br/> <br/>|| Replication<br/>Auto-failover<br /> | Dedicated accounts<br>Redis on Flash<br/>Active/Active<br/> |   

To learn more, see [Redis Enterprise Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing/).

## Common tasks

Create a new subscription:

- The Redis Cloud [quick start]({{<relref "rc/rc-quickstart.md">}}) helps you create a free subscription and your first database.  (Start here if you're new.)

- [Create a Fixed subscription]({{<relref "rc/subscriptions/create-fixed-subscription.md">}})

- [Create a Flexible subscription]({{<relref "rc/subscriptions/create-flexible-subscription.md">}})

- To create an Annual subscription, contact support.

View subscription details:

- View or update a [Fixed subscription]({{<relref "/rc/subscriptions/view-fixed-subscription.md">}})

- View [Flexible subscription]({{<relref "/rc/subscriptions/view-flexible-subscription.md">}})

- [Delete a subscription]({{<relref "/rc/subscriptions/delete-subscription.md">}})


