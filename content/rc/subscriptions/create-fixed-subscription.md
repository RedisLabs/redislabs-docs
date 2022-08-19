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
Fixed Size subscription plans support low throughput workflows.  Several tiers are available, each designed for different memory sizes and integration requirements.

When creating your subscription, you'll need to know which tier to choose.

(If you're new to Redis Enterprise Cloud, the [quick start]({{<relref "/rc/rc-quickstart.md">}}) helps you create a free subscription and an initial database.  You also learn how to connect to your database.)


## Fixed plan subscription tiers

Fixed plan pricing scales according to the memory size of all databases defined in the subscription.  Additional limits also apply, as shown here (updated February 2021):

| Max DB Size &nbsp; | Number of<br/>Databases | Concurrent<br/>Connections | Security<br/> Groups | Max IP<br/> Auth rules |
|------------:|:---------:|:-----------:|:---------------:|:-------------:|
| (Free) 30 MB &nbsp;&nbsp;&nbsp;&nbsp; | 1 | 30 | N/A | N/A |
| 100 MB &nbsp;&nbsp;&nbsp;&nbsp; | 4 | 256 | 1 | 4 |
| 250 MB &nbsp;&nbsp;&nbsp;&nbsp; | 8 | 256 | 1 | 4 |
| 500 MB &nbsp;&nbsp;&nbsp;&nbsp; | 12 | 512 | 1 | 4 |
| 1 GB &nbsp;&nbsp;&nbsp;&nbsp; | 16 | 1024 | 2 | 8 |
| 2&half; GB &nbsp;&nbsp;&nbsp;&nbsp; | 24 | 2500 | 2 | 8 |
| 5 GB &nbsp;&nbsp;&nbsp;&nbsp; | 32 | 5000 | 4 | 16 |
| 10 GB &nbsp;&nbsp;&nbsp;&nbsp; | 64 | 10000 | 4 | 32 |

The 30 MB Fixed plan is free; it's designed for training and prototype purposes.

All paid (100 MB and above) fixed plans support replication and backups (daily and instant).

If you need additional resources, you can update your subscription at any time.

## Create a Fixed subscription

To create a [Fixed subscription]({{< relref "/rc/subscriptions/#subscription-plans" >}}):

1.  From the admin console menu, select the **New Subscription** button.  

    {{<image filename="images/rc/button-subscription-new.png" alt="The New subscriptions button in the admin console menu." >}}{{< /image >}}

2. When the **New subscription** page appears, select **Fixed plans** and then scroll to the cloud vendor options.

    {{<image filename="images/rc/subscription-new-plan-options.png" alt="Available subscription plan options." >}}{{< /image >}}

3.  Choose a **Cloud Provider** and a **Region**.

    {{<image filename="images/rc/subscription-new-cloud-vendor-options.png" alt="Available cloud vendor options." >}}{{< /image >}}

4.  In the **High-availability** panel, select your replication settings.  

    - _No-replication_ means that you will have a single copy of your database.
    - _Single-zone replication_ means that your database will have a primary and a replica located in the same cloud region.  If anything happens to the primary, the replica takes over and becomes the new primary.
    - _Multi-zone replication_ means that the primary and the replicas are stored in different region zones, which provides additional protection by distributing the replicas.

5.  Select the desired plan size.   

    To create a Free subscription, select the 30 MB plan size.  

    {{<image filename="images/rc/subscription-new-fixed-tiers.png" alt="Available tiers for Fixed size subscription plans." >}}{{< /image >}}

6.  Enter a subscription name and payment details.

7.  Locate and then select the **Create Subscription** button, which is located below the **Credit card** details.

    {{<image filename="images/rc/button-subscription-create.png" alt="The Create Subscription button." >}}{{< /image >}}

Here are few details to keep in mind:

- You aren't prompted for payment details when creating a Free subscription. 

- You can only have one free subscription at a time.

- If you're creating a paid subscription and haven't previously entered a payment method, use the **Add Credit Card** button to add one.

    {{<image filename="images/rc/icon-add-credit-card.png" alt="The Add credit card icon." >}}{{< /image >}}

When you create your subscription, there's a brief pause while your request is processed and then you're taken to the **Subscription details** page.

{{<image filename="images/rc/subscription-fixed-databases-none.png" alt="The Subscription details screen with no databases." >}}{{< /image >}}

To create your first database, select the **New Database** button and then fill in the appropriate details.

To learn more, see [Create a database]({{<relref "rc/databases/create-database.md">}}).

