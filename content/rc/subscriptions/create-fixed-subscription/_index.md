---
Title: Create a Fixed subscription
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/setup_and_editing/create-subscription/
         /rv/administration/setup_and_editing/creating-subscription/
         /rc/administration/setup_and_editing/create-subscription/
         /rc/administration/setup-and-editing/create-subscription/
         /rc/administration/setup/create-subscription/
---
Fixed plans support low throughput workflows.  Several plans are available, each designed for different memory sizes.

When creating your subscription, you'll need to choose the plan that suits your needs.

If you're new to Redis Cloud, the [quick start]({{<relref "/rc/rc-quickstart.md">}}) helps you create an account with a free subscription and an initial database.  You also learn how to connect to your database.

## Fixed plans

Fixed plan [pricing](https://redis.com/cloud/pricing/) scales according to the memory size of the database defined in the subscription.  Additional limits also apply, as shown in [Fixed plan details]({{<relref "rc/subscriptions/create-fixed-subscription/fixed-plan-details">}}).

The 30 MB Fixed plan is free; it's designed for learning and building test projects. It gives you enough space to learn Redis concepts and develop application prototypes.

Our paid plans start at 250 MB and offer extra features, like high availability and backups (both daily and instant). They are great for bigger projects or production environments that require increased storage, reliability, and other features to support your operational needs.

If you need additional resources, you can [upgrade your subscription]({{<relref "/rc/subscriptions/view-fixed-subscription#upgrade-subscription-plan">}}) at any time.

There are some differences between plans for the different high availability options. See [Fixed plan details]({{<relref "/rc/subscriptions/create-fixed-subscription/fixed-plan-details">}}) for more information.

## Create a Fixed subscription

To create a Fixed subscription:

1.  From the Redis Cloud subscriptions list, select the **Add new subscription** button.  

    {{<image filename="images/rc/button-subscription-new.png" alt="The New subscriptions button in the admin console menu." >}}{{< /image >}}

2. When the **New subscription** page appears, select **Fixed plan** and then scroll to the cloud vendor options.

    {{<image filename="images/rc/subscription-new-plan-options.png" alt="Available subscription plan options." >}}{{< /image >}}

3.  Choose a **Cloud Provider** and a **Region**.

    {{<image filename="images/rc/subscription-new-cloud-vendor-options-redis-7-preview.png" alt="Available cloud vendor options and Redis 7.2 regions." >}}{{</image>}}

    [Redis 7.2]({{<relref "/rc/changelog/june-2023#redis-72-preview">}}) is available for selected regions in AWS and GCP. Redis 7.2 introduces several changes to existing Redis commands; see the list of [breaking changes]({{<relref "/rc/changelog/june-2023#redis-72-breaking-changes">}}) for more details.
    
    If you want to try out Redis 7.2, turn on the **Redis 7.2 regions** toggle to show the regions where it is available:

    {{<image filename="images/rc/subscription-new-redis-7-preview-toggle.png" width="200px" alt="Turn on the Redis 7.2 regions toggle." >}}{{< /image >}}

4.  In the **Availability Settings** panel, select your replication settings.  

    - **No-replication** means that you will have a single copy of your database.
    - **Single-zone replication** means that your database will have a primary and a replica located in the same cloud region.  If anything happens to the primary, the replica takes over and becomes the new primary.
    - **Multi-zone replication** means that the primary and the replicas are stored in different region zones, which provides additional protection by distributing the replicas.

5.  Select the desired plan size.   

    To create a Free subscription, select the 30 MB plan size.  

    {{<image filename="images/rc/subscription-new-fixed-tiers.png" alt="Available Fixed subscription plans." >}}{{< /image >}}

6.  Enter a subscription name and payment details.

7.  Select the **Create Subscription** button.

    {{<image filename="images/rc/button-subscription-create.png" alt="The Create Subscription button." >}}{{< /image >}}

Here are few details to keep in mind:

- You can create a Free subscription without being prompted for payment details.

- You can only have one free subscription at a time.

- If you're creating a paid subscription and haven't previously entered a payment method, use the **Add Credit Card** button to add one.

    {{<image filename="images/rc/icon-add-credit-card.png" alt="The Add credit card icon." >}}{{< /image >}}

When you create your subscription, there's a brief pause while your request is processed and then you're taken to the **Subscription details** page.

{{<image filename="images/rc/subscription-fixed-databases-none.png" alt="The Subscription details screen with no databases." >}}{{< /image >}}

To create your database, select the **New Database** button and then fill in the appropriate details.

To learn more, see [Create a database]({{<relref "rc/databases/create-database.md">}}).