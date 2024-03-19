---
Title: Create an Essentials database
linkTitle: Create Essentials database
description: Shows how to create an Essentials database.
weight: 5
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/setup_and_editing/create-databases/
         /rv/administration/setup_and_editing/creating-databases/
         /rc/administration/setup_and_editing/create-databases/
         /rc/administration/setup-and-editing/creating-databases/
---

{{< embed-md "rc-create-db-first-steps.md" >}}

4. Select the type of [subscription]({{<relref "/rc/subscriptions">}}) you need. For this guide, select **Essentials**.

    {{<image filename="images/rc/create-database-subscription-essentials.png" alt="The Subscription selection panel with Essentials selected.">}}{{< /image >}}

    {{< note >}}
This guide shows how to create an Essentials database.
- If you'd rather create a Pro database, see [Create a Pro database with a new subscription]({{<relref "/rc/databases/create-database/create-pro-database-new">}}).
- If you already have a Pro subscription and want to add a database to it, see [Create a Pro database in an existing subscription]({{<relref "/rc/databases/create-database/create-pro-database-existing">}}).
    {{< /note >}}
    
    Once you select **Essentials**, the rest of the database details will appear.

    {{<image filename="images/rc/create-database-essentials-cloud-vendor.png" alt="The database name, cloud vendor, region, and type settings.">}}{{< /image >}}

1. Redis will generate a database name for you. If you want to change it, you can do so in the **Database name** field.  

1. Choose a **Cloud Provider** and a **Region**.

1. The **Type** of database controls the protocol and advanced capabilities. Leave this as **Redis Stack** unless you have a legacy application that uses **Memcached**.

    A Redis Stack database gives access to a set of advanced capabilities. For more information, see [Advanced capabilities]({{<relref "rc/databases/configuration/advanced-capabilities#essentials">}}).

1. In the **Durability settings** panel, choose your **High availability settings** and **Data persistence** settings from the list. 

    {{<image filename="images/rc/create-database-essentials-durability.png" alt="The durability settings allow you to choose High availability and Data persistence.">}}{{< /image >}}

    IMAGE HERE: durability settings panel

    Redis Cloud supports the following high availability settings:

    - **None**: You will have a single copy of your database without replication.
    - **Single-Zone**: Your database will have a primary and a replica located in the same cloud zone. If anything happens to the primary, the replica takes over and becomes the new primary.
    - **Multi-Zone**: The primary and its replicas are stored in different zones. This means that your database can remain online even if an entire zone becomes unavailable.

    See [High availability]({{<relref "rc/databases/configuration/high-availability">}}) for more information about these settings.

    Redis Cloud supports the following Data persistence options:

    - An **Append-Only File** maintains a record (sometimes called a _redo log_ or _journal_) of write operations.  This allows the data to be restored by using the record to reconstruct the database up to the point of failure. For Essentials databases, Redis updates the Append-Only file every second.

    - A **Snapshot** is a copy of the in-memory database, taken at periodic intervals (one, six, or twelve hours). You can restore data to the snapshot's point in time. 
    
    See [Data persistence]({{<relref "rc/databases/configuration/data-persistence">}}) for more information about these settings.

    These settings may already be set based on the use case you selected. you can change them now if you like.
    
1. Select the desired dataset size. To create a free database, select the 30 MB dataset size. You can only have one free database at a time.

    {{<image filename="images/rc/subscription-new-fixed-tiers.png" alt="Available Essentials plans." >}}{{< /image >}}

1.  Enter your payment details if you chose a paid plan.

    If you chose a paid plan and haven't previously entered a payment method, use the **Add Credit Card** button to add one.

    {{<image filename="images/rc/icon-add-credit-card.png" alt="The Add credit card icon." >}}{{< /image >}}

1. Select **Create database** or **Confirm & pay** to create your database.

When you create your database, there's a brief pause while your request is processed and then you're taken to the **Database details** page.


## Use case settings

The following table shows the default use case settings for an Essentials database.

| **Type** | High Availability | Data Persistence | Size | Eviction Policy |
|---|---|---|---|---|
| **Cache** | None | None | 30 MB - 12 GB | `volatile-lru` |
| **Database** | Multi-zone | Append-only file every 1 sec | 250 MB - 12 GB | None |
| **Vector Search** | Multi-zone | Append-only file every 1 sec | 250 MB - 12 GB | None |
| **Custom** | Single-zone | Append-only file every 1 sec | 250 MB - 12 GB | None |

