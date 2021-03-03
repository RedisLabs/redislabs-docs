---
title: Create and manage subscriptions
description:
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/setup_and_editing/
         /rc/administration/setup-and-editing/
         /rc/administration/setup-editing/
         /rv/administration/setup_and_editing/create-subscription/
         /rv/administration/setup_and_editing/creating-subscription/
         /rc/administration/setup/create-subscription/
---

Redis Enterprise Cloud subscriptions support Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure.

When you create a subscription, you need at least three pieces of info:

1. Your cloud provider, either Amazon Web Services (AWS), Google Cloud Platform (GCP), or Microsoft Azure.

1. The deployment region (varies by provider and location)

1. The subscription plan type

These articles provide the details to help you create and manage your subscriptions.

## Subscription plans

As of February 2021, Redis Enterprise Cloud suppports the following subscription plans:

- _Free plans_ are designed for training purposes and prototyping.  They can be seamlessly upgraded to Fixed plans with no data loss.

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

For details, see [Redis Enterprise Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing/).

## Create a new subscription

To create a new subscription:

1. In the Redis Cloud menu, select **Subscriptions**.

1. At the bottom of the page, select the **Add Subscription** button (![Add Subscription button](/images/rs/icon-subscription-add.png#no-click)).

1. Select your subscription configuration:

    1. Select a cloud provider: **Amazon AWS**, **Microsoft Azure**, **Google Cloud Platform**.

    1. Select the region that you want the subscription to use, for example: `us-central1`.

    1. Select the plan that best reflects your needs.

        - For help creating a Fixed or Free subscriptions, see [Create a Fixed or Free subscription]({{< relref "customize-flexible-plan.md" >]]).creating-fixed-subscription.

        - For help creating a Flexible subscription, see [Create a Flexible subscription]({{< relref "customize-flexible-plan.md" >}})
    
