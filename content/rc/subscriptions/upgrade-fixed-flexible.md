---
Title: Upgrade subscription plan from Fixed to Flexible
LinkTitle: Upgrade from Fixed to Flexible
description: Upgrade your fixed subscription to a flexible subscription.
weight: 45
alwaysopen: false
categories: ["RC"]
aliases: 
---

Fixed subscription plans support low throughput workflows. They support a range of availability, persistence, and backup options, and can be great for testing and prototyping. However, if your databases need higher throughput, or you're missing features that are not available with fixed plans, you may want to upgrade your fixed plan to a flexible plan.

For more information about the different subscription plans, see [Subscription plans]({{<relref "/rc/subscriptions#subscription-plans">}}).

To upgrade your fixed plan to a higher subscription tier, see [Upgrade subscription plan]({{<relref "/rc/subscriptions/view-fixed-subscription#upgrade-subscription-plan">}}).

## Upgrade fixed subscription to flexible

To follow the steps in this guide, you must have a [fixed subscription]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) that you want to upgrade to a flexible subscription.

To upgrade your fixed subscription to a flexible subscription:

1. [Create a new flexible subscription](#create-flexible-subscription) with the right specifications to be able to migrate your databases.

1. [Migrate your databases](#migrate-databases) from your fixed subscription to your new flexible subscription.

1. [Delete your fixed subscription](#delete-fixed-subscription).

### Create flexible subscription

[Create a new flexible subscription]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) with the following specifications:

- Select the **Version** that matches the Redis version your fixed subscriptions use.
- In the [**Sizing tab**]({{<relref "/rc/subscriptions/create-fixed-subscription#sizing-tab">}}), create your databases with the following specifications:
    - Set the memory limit to comply with [Active-Passive memory requirements]({{<relref "/rc/databases/migrate-databases#active-passive-memory-requirements">}}) if you want to migrate your database using [Active-Passive]({{<relref "/rc/databases/migrate-databases#sync-using-active-passive">}}).
    - Select any advanced capabilities that your fixed database uses.

### Migrate databases

You can migrate the databases in your fixed subscription to your new flexible subscription using any method in the [Migrate databases]({{<relref "/rc/databases/migrate-databases">}}) guide. This guide uses [Active-Passive]({{<relref "/rc/databases/migrate-databases#sync-using-active-passive">}}) to migrate databases between subscriptions in the same account.

{{< note >}}
If one or more of the databases in your fixed subscription has [Transport Layer Security (TLS)]({{< relref  "/rc/security/database-security/tls-ssl" >}}) enabled, you won't be able to migrate your databases between subscriptions using this guide. Use the [Transfer via import]({{<relref "/rc/databases/migrate-databases#transfer-via-import">}}) method or [Contact support](https://redis.com/company/support/) if you want to migrate a TLS-enabled database using Active-Passive.
{{< /note >}}

{{< note >}}
This guide is for migrating databases between subscriptions in the same Redis Cloud console account. [Contact support](https://redis.com/company/support/) if you want to migrate a database between accounts using Active-Passive.
{{< /note >}}
    
1. In your flexible subscription, select the database you want to migrate your data to. This will be your target database.

1. From the **Configuration** tab of the target database, select **Edit database**.

    {{<image filename="images/rc/button-database-edit.png" alt="The Edit database button lets you change selected database properties." >}}{{< /image >}}

1. In the **Durability** section, enable **Active-Passive Redis** and then select **Add Account's Path**.

    {{<image filename="images/rc/button-database-add-account-path.png" alt="Use the Add Account's Path button to specify the source of the Active-Passive replica." >}}{{< /image >}}

1. Select the first database in your fixed subscription from the list. This will be your source database. You can type in the database's name to find it.

    {{<image filename="images/rc/database-add-account-path-list.png" alt="Select the Source database from the database list." >}}{{< /image >}}

1. Select **Save Database** to begin updating the database.

    {{<image filename="images/rc/button-database-save.png" alt="Use the **Save Database** button to save your changes, deploy the database, and to start data migration." >}}{{< /image >}}

    Initially, the database status is __Pending__, which means the update task is still running.  

    {{<image filename="images/rc/icon-database-update-status-pending.png" alt="When the status is 'Pending', your changes are still being deployed.">}}{{< /image >}}

    The sync process doesn't begin until the database becomes `Active`.  

    {{<image filename="images/rc/icon-database-update-status-active.png" alt="When the status becomes 'Active', data begins to sync." >}}{{< /image >}}

    When data has fully migrated to the target database, database status reports `Synced`.  

    {{<image filename="images/rc/migrate-data-status-synced.png" alt="When the data is migrated, the target database status displays `Synced`." >}}{{< /image >}}

    Active-Passive sync lets you migrate data while apps and other connections are using the source database. Once the data is migrated, you should migrate active connections to the target database before you move on.

1. After your data and connections are migrated, turn off **Active-Passive Redis** from the target database.

Repeat these steps until every database in your fixed subscription is migrated to the flexible subscription.

### Delete fixed subscription

After you've migrated your databases to the new flexible subscription, [delete the databases]({{<relref "/rc/databases/delete-database">}}) in your fixed subscription, and then [delete your fixed subscription]({{<relref "/rc/subscriptions/delete-subscription">}}).



