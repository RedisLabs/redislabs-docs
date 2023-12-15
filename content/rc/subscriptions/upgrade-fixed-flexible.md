---
Title: Upgrade subscription plan from Fixed to Flexible
LinkTitle: Upgrade from Fixed to Flexible
description: Upgrade your Fixed subscription to a Flexible subscription.
weight: 45
alwaysopen: false
categories: ["RC"]
aliases: 
---

Fixed subscription plans support low throughput workflows. They support a range of availability, persistence, and backup options, and can be great for testing and prototyping. However, if your databases need higher throughput, or you're missing features that are not available with Fixed plans, you may want to upgrade your Fixed plan to a Flexible plan.

For more information about the different subscription plans, see [Subscription plans]({{<relref "/rc/subscriptions#subscription-plans">}}).

To upgrade your Fixed plan to a higher subscription tier, see [Upgrade subscription plan]({{<relref "/rc/subscriptions/view-fixed-subscription#upgrade-subscription-plan">}}).

## Upgrade Fixed subscription to Flexible

To follow the steps in this guide, you must have a [Fixed subscription]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) that you want to upgrade to a Flexible subscription.

To upgrade your Fixed subscription to a Flexible subscription:

1. [Create a new Flexible subscription](#create-flexible-subscription) with the right specifications to be able to migrate your databases.

1. [Migrate your databases](#migrate-databases) from your Fixed subscription to your new Flexible subscription.

1. [Delete your Fixed subscription](#delete-fixed-subscription).

### Create Flexible subscription

[Create a new Flexible subscription]({{<relref "/rc/subscriptions/create-fixed-subscription">}}) with the following specifications:

- Select the **Version** that matches the Redis version your Fixed subscriptions use.
- In the [**Sizing tab**]({{<relref "/rc/subscriptions/create-fixed-subscription#sizing-tab">}}), create your databases with the following specifications:
    - Set the memory limit to comply with [Active-Passive memory requirements]({{<relref "/rc/databases/migrate-databases#active-passive-memory-requirements">}}) if you want to migrate your database using [Active-Passive]({{<relref "/rc/databases/migrate-databases#sync-using-active-passive">}}).
    - Select any advanced capabilities that your Fixed database offers. You can find a list of enabled advanced capabilities in the [Configuration tab]({{< relref "/rc/databases/view-edit-database#configuration-details-tab" >}}) of your database.

        {{< note >}}
A preview of [Triggers and functions]({{<relref "/rc/changelog/june-2023#Triggers-and-functions-preview">}}) (previously known as RedisGears) is available for Fixed subscriptions in select regions. If you have a Fixed subscription in these regions and would like to continue to use Triggers and functions in your Flexible subscription, [contact support](https://redis.com/company/support/).
        {{< /note >}}

### Migrate databases

You can migrate the databases in your Fixed subscription to your new Flexible subscription using any method in the [Migrate databases]({{<relref "/rc/databases/migrate-databases">}}) guide. This guide uses [Active-Passive]({{<relref "/rc/databases/migrate-databases#sync-using-active-passive">}}) to migrate databases between subscriptions in the same account.

{{< note >}}
Before you follow this guide, be aware of the following limitations:

- If one or more of the databases in your Fixed subscription has [Transport Layer Security (TLS)]({{< relref  "/rc/security/database-security/tls-ssl" >}}) enabled, you won't be able to migrate your databases between subscriptions using this guide. Use the [Transfer via import]({{<relref "/rc/databases/migrate-databases#transfer-via-import">}}) method or [contact support](https://redis.com/company/support/) if you want to migrate a TLS-enabled database using Active-Passive.

- This guide is for migrating databases between subscriptions in the same Redis Cloud console account. [Contact support](https://redis.com/company/support/) if you want to migrate a database between accounts using Active-Passive.

- As long as Active-Passive is enabled, data in the target database will not expire and will not be evicted regardless of the set [data eviction policy]({{<relref "rc/databases/configuration/data-eviction-policies.md">}}). We recommend that you turn off Active-Passive after the databases are synced. 
{{< /note >}}

1. In your Flexible subscription, select the database you want to migrate your data to. This will be your target database.

1. From the **Configuration** tab of the target database, select **Edit database**.

    {{<image filename="images/rc/button-database-edit.png" alt="The Edit database button lets you change selected database properties." >}}{{< /image >}}

1. In the **Durability** section, enable **Active-Passive Redis** and then select **Add Account's Path**.

    {{<image filename="images/rc/button-database-add-account-path.png" alt="Use the Add Account's Path button to specify the source of the Active-Passive replica." >}}{{< /image >}}

1. Select the first database in your Fixed subscription from the list. This will be your source database. You can type in the database's name to find it.

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

Repeat these steps until every database in your Fixed subscription is migrated to the Flexible subscription.

### Delete Fixed subscription

After you've migrated your databases to the new Flexible subscription, [delete the databases]({{<relref "/rc/databases/delete-database">}}) in your Fixed subscription, and then [delete your Fixed subscription]({{<relref "/rc/subscriptions/delete-subscription">}}).



