---
Title: Create a Pro database with a new subscription
linkTitle: Create Pro database (new subscription)
description: Shows how to create a Pro database with a new subscription
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: 
---

{{< embed-md "rc-create-db-first-steps.md" >}}

4. Select the type of [subscription]({{<relref "/rc/subscriptions">}}) you need. For this guide, select **Pro**. 

    {{< note >}}
This guide shows how to create a Pro database with a new subscription.
- If you already have a Pro subscription and want to add a database to it, see [Create a Pro database in an existing subscription]({{<relref "/rc/databases/create-database/create-pro-database-existing">}}).
- If you'd rather create an Essentials database, see [Create an Essentials database]({{<relref "/rc/databases/create-database/create-essentials-database">}}).
    {{< /note >}}
    

Once you select **Pro**, you need to: 

1. Set up the deployment options, including cloud vendor details, high availability settings, and advanced options.

2. Define the database size requirements.

3. Review your choices, provide payment details, and then create your databases.

The following sections provide more information.

## Set up deployment details

The **Setup** tab specifies general settings for your Redis deployment.

{{<image filename="images/rc/subscription-new-flexible-tabs-setup.png" width="75%" alt="The Setup tab of the new Pro Database process." >}}{{< /image >}}

The three sections to this tab:

- [General settings](#general-settings) include the cloud provider details, the subscription name, and specific configuration options.
- [Version](#version) lets you choose the Redis version of your databases.
- [Advanced options](#advanced-options) define settings for high availability and security. Configurable settings vary according to cloud provider.

### General settings {#general-settings}

{{<image filename="images/rc/subscription-new-flexible-setup-general.png" width="75%" alt="The General settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **General settings** of the **Setup** tab:

| General setting | Description |
|:---------|:-----------|
| **Cloud vendor** | The public cloud vendor to deploy your subscription. (_required_) |
| **Region** | The vendor region where you wish to deploy your subscription.  (_required_)|
| **Active-Active Redis** | Hosts your datasets in multiple read-write locations to support distributed applications and disaster recovery. See [Create an Active-Active database]() for specific steps and configuration options exclusive to Active-Active. |
| **Auto Tiering**| Determines if your databases are stored only in memory (RAM) or are split between memory and Flash storage (RAM+Flash).  See [Auto Tiering]({{< relref "/rs/databases/auto-tiering/" >}})|

### Version {#version}

{{<image filename="images/rc/subscription-new-flexible-version-section.png" width="75%" alt="Version selection between Redis 6.2 and 7.2" >}}{{< /image >}}

The **Version** section lets you choose the Redis version of your database. Choose **Redis 7.2** if you want to use the latest advanced features of Redis.

### Advanced options {#advanced-options}

{{<image filename="images/rc/subscription-new-flexible-setup-advanced.png" width="75%" alt="The Advanced settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **Advanced options** of the **Setup** tab:

| Advanced option | Description |
|---|---|
| **Multi-AZ** | Determines if replication spans multiple Availability Zones, which provides automatic failover when problems occur. |
| **Allowed Availability Zones** | The availability zones for your selected region.<br/><br/>If you choose **Manual selection**, you must select at least one zone ID from the **Zone IDs** list.  For more information, see [Availability zones]({{<relref "rc/databases/configuration/high-availability">}}). |
| **Cloud account** | To deploy this subscription to an existing cloud account, select it here.  Use the **Add** button to add a new cloud account.<br/><br/>(Available only if [self-managed cloud vendor accounts]({{<relref "/rc/cloud-integrations/aws-cloud-accounts">}}) are enabled) |
| **VPC configuration** | Select **In a new VPC** to deploy to a new [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC).<br/><br/>To deploy this subscription to an existing virtual private cloud, select **In existing VPC** and then set VPC ID to the appropriate ID value.<br/><br/>(Available only if [self-managed cloud vendor accounts]({{<relref "/rc/cloud-integrations/aws-cloud-accounts">}}) are enabled) |
| **Deployment CIDR** | The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) range of IP addresses for your deployment. Redis creates a new [subnet](https://en.wikipedia.org/wiki/Subnetwork) for the **Deployment CIDR** in your [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC). It cannot overlap with the CIDR ranges of other subnets used by your subscription.<br/><br/>For deployments in an existing VPC, the **Deployment CIDR** must be within your VPC's **primary** CIDR range (secondary CIDRs are not supported). |
| **Maintenance windows** | Determines when Redis can perform [maintenance]({{<relref "/rc/subscriptions/maintenance">}}) on your databases. Select **Manual** if you want to set [manual maintenance windows]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}). |

When finished, choose **Continue** to determine your size requirements.

{{<image filename="images/rc/button-subscription-continue.png" width="100px" alt="Select the Continue button to continue to the next step." >}}{{< /image >}}

## Sizing tab

The **Sizing** tab helps you specify the database, memory, and throughput requirements for your subscription.

{{<image filename="images/rc/subscription-new-flexible-sizing-tab.png" width="75%" alt="The Sizing tab when creating a new Flexible subscription." >}}{{< /image >}}

When you first visit the **Sizing** tab, there are no databases defined.  Select the **Add** button to create one.

{{<image filename="images/rc/icon-add-database.png" width="30px" alt="Use the Add button to define a new database for your subscription." >}}{{< /image >}}

This opens the **New Database** dialog, which lets you define the requirements for your new database.

{{<image filename="images/rc/flexible-add-database-basic.png" width="75%" alt="The New Database dialog with basic settings." >}}{{< /image >}}

By default, you're shown basic settings, which include:

| Database&nbsp;setting | Description |
|:---------|:-----------|
| **Name** | A custom name for your database (_required_) |
| **Advanced Capabilities** | Advanced data types used by the database. Choose from [Search and query]({{< relref "/stack/search" >}}), [JSON]({{< relref "/stack/json" >}}), [Time series]({{< relref "/stack/timeseries" >}}), [Probabilistic]({{< relref "/stack/bloom" >}}), or [Graph (EOL)]({{< relref "/stack/deprecated-features/graph" >}}). |
| **Throughput/Shards** | Identifies maximum throughput for the database, which can be specified in terms of operations per second (**Ops/sec**) or number of shards dedicated to the database (**Shards**). See [Throughput]({{< relref "/rc/databases/configuration/clustering#throughput" >}}) for more information. |
| **Memory Limit (GB)** | The size limit for the database. Specify small sizes as decimals of 1.0&nbsp;GB; example: `0.1` GB (minimum).|
| **High Availability** | Indicates whether a replica copy of the database is maintained in case the primary database becomes unavailable.  (Warning: Doubles memory consumption). |
| **Data Persistence** | Defines the data persistence policy, if any. See [Database persistence]({{< relref "/rs/databases/configure/database-persistence.md" >}}) |

Select **More options** to specify values for the following settings.

{{<image filename="images/rc/flexible-add-database-advanced.png" width="75%" alt="The New Database dialog with advanced settings." >}}{{< /image >}}

| Database&nbsp;option | Description                                                                                                                                                     |
|:---------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **OSS Cluster API** | Enable to use the [Redis OSS Cluster API]({{< relref "/rc/databases/configuration/clustering#oss-cluster-api" >}}).                                                                                                                |
| **Type** | Set to **Redis**, otherwise **Memcached** database for legacy database support.                                                                                     |
| **Supported Protocol(s)** | Choose between RESP2 and RESP3 _(Redis 7.2 only)_. See [Redis serialization protocol](https://redis.io/docs/reference/protocol-spec/#resp-versions) for details |
| **Quantity** | Number of databases to create with these settings.                                                                                                              |

When finished, select **Save database** to create your database.

{{<image filename="images/rc/button-database-save.png" width="140px" alt="Select the Save Database button to define your new database." >}}{{< /image >}}

Use the **Add database** button to define additional databases or select the **Continue button** to display the **Review and create** tab.

Hover over a database to see the **Edit** and **Delete** icons. You can use the **Edit** icon to change a database or the **Delete** icon to remove a database from the list.

{{<image filename="images/rc/icon-database-edit.png" width="30px" alt="Use the Edit button to change database settings." >}}{{< /image >}}&nbsp;{{<image filename="images/rc/icon-database-delete.png" width="30px" alt="Use the Delete button to remove a database." >}}{{< /image >}}


## Review and Create tab

The **Review & Create** tab provides a cost estimate for your Redis Cloud Pro plan:

{{<image filename="images/rc/subscription-new-flexible-review.png" width="75%" alt="The Review & Create tab of the New Flexible subscription screen." >}}{{< /image >}}

Redis breaks down your databases to Redis Billing Units (RBUs), each with their own size and throughput requirements. For more info, see [Billing unit types](#billing-unit-types).

Select **Back to Sizing** to make changes or **Confirm & Pay** to create your databases.

{{<image filename="images/rc/button-subscription-create.png" width="140px" alt="Select Create subscription to create your new subscription." >}}{{< /image >}}

Note that databases are created in the background.  While they are provisioning, you aren't allowed to make changes. This process generally takes 10-15 minutes.

Use the **Database list** to check the status of your databases.



{{< embed-md "rc-pro-use-cases-billing-units.md" >}}


