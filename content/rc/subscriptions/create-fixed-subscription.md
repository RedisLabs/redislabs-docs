---
Title: Create a Fixed or Free subscription
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
Fixed Size subscription plans provide services designed for low throughput workflows.  Several tiers are available, each designed for different memory sizes and integration requirements.

Creating a Fixed (or Free) subscription is a two-step process:

1. Create a subscription
1. Create an initial database

When creating your subscription, you'll need to know which tier to choose.

## Fixed size subscription tiers

Fixed plan pricing scales according to the memory size of all databases defined in the subscription.  Additional limits also apply, as shown here (updated February 2021):

| Max DB Size | Number of<br/>Databases | Concurrent<br/>Connections | Security<br/> Groups | Max IP<br/> Auth rules |
|------------:|:---------:|:-----------:|:---------------:|:-------------:|
| 30 MB (free)     | 1 | 30 | N/A | N/A |
| 100 MB &nbsp;&nbsp;&nbsp;&nbsp; | 4 | 256 | 1 | 4 |
| 250 MB &nbsp;&nbsp;&nbsp;&nbsp; | 8 | 256 | 1 | 4 |
| 500 MB &nbsp;&nbsp;&nbsp;&nbsp; | 12 | 512 | 1 | 4 |
| 1 GB &nbsp;&nbsp;&nbsp;&nbsp; | 16 | 1024 | 2 | 8 |
| 2&half; GB &nbsp;&nbsp;&nbsp;&nbsp; | 24 | Unlimited | 2 | 8 |
| 5 GB &nbsp;&nbsp;&nbsp;&nbsp; | 32 | Unlimited | 4 | 16 |
| 10 GB &nbsp;&nbsp;&nbsp;&nbsp; | 64 | Unlimited | 4 | 32 |

The 30 MB Fixed plan is free; it's designed for training and prototype purposes.

If you need additional resources, you can update your subscription at any time.

## Step 1: Create a subscription

To create a Fixed (or Free) subscription:

1.  From the admin console menu, choose **Subscriptions**.

2.  Select the **New Subscription** button ({{<image filename="images/rc/icon-subscription-add-button.png" width="24px" alt="The Add Subscripton button" >}}{{< /image >}}) to display the **Create Subscription** screen.

    {{<image filename="images/rc/fixed-subscription-create.png" width="75%" alt="The Fixed Size Plan section of the Create Subscription screen." >}}{{< /image >}}

3.  When the **New Subscription** screen appears, enter your cloud provider details.

4.  Select your **High Availability** preferences.

5.  Select the desired plan size.   

    To create a Free subscription, select the 30 MB plan size.  

6.  Enter a subscription name and payment details (if prompted).

    {{<image filename="images/rc/fixed-subscription-paid-tier.png" width="75%" alt="Database name and payment details are needed for paid plans." >}}{{< /image >}}

7.  Select the **Create** button.

The steps can vary slightly:

- You aren't prompted for payment details when creating a Free subscription.

    {{<image filename="images/rc/fixed-subscription-free-tier.png" width="75%" alt="You aren't prompted for payment method when creating a free plan." >}}{{< /image >}}

- If you're creating a paid subscription and haven't previously entered a payment method, you'll enter payment details after clicking the **Create** button in Step 7.

    {{<image filename="images/rc/fixed-sub-add-credit-card.png" width="75%" alt="The Add Credit Card screen appears when you create a paid plan before adding a payment method." >}}{{< /image >}}

    If you cancel the **Add Credit Card** screen at this point, you return to the **Create Subscription** screen.

## Step 2: Create initial database

After creating your new subscription, the **Create Database** screen appears.

{{<image filename="images/rc/fixed-sub-create-database-paid.png" width="75%" alt="The Create Database screen appears when you create a new subscription." >}}{{< /image >}}

Here's what you can specify:

|Setting name|Description|
|:-----------|:----------|
|**Database Name** | A name for your database (_required_)|
|**Protocol** | Either _Redis_ (default) or _Memcached_ |
|**Replication** | Enable or disable according to your preferences (_paid only_)|
|**Data Persistence** | Controls when data is persisted to storage (_paid only_)|
|**Access Control & Security** | Defines security policies; free accounts limited to password only | 
|**Data Eviction Policy** | Determines what happens when you run out of space. | 
|**Periodic Backup** | When enabled, defines a path for backups (_paid only_) |
|**Modules** | Defines the module associated with the database, if any |
|**Alert Settings** | Identfies when to send alert emails regarding database conditions. |

For more info, see [Creating Databases]({{<relref "rc/databases/create-database.md">}}).