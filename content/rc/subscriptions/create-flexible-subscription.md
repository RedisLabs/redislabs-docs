---
Title: Create a Flexible subscription
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/customize-pro/
         /rc/administration/customize-pro.md          
         /rc/administration/setup/customize-pro/
         /rc/administration/setup/customize-pro.md
         /rc/administration/setup/customize-flexible-plan/
---
Flexible subscriptions support any dataset size or throughput.  Pricing is based on your [workload requirements](https://redis.com/redis-enterprise-cloud/pricing/) (database size and throughput.)  

When you create a Flexible subscription, a cost estimate is provided to help you understand the impact of your requirements.  

## Create a Flexible subscription

To create a [Flexible subscription]({{< relref "/rc/subscriptions/#subscription-plans" >}}):

1.  From the admin console menu, select the **New Subscription** button.  

    {{<image filename="images/rc/button-subscription-new.png" width="20%" alt="The New subscriptions button in the admin console menu." >}}{{< /image >}}

2. When the **New subscription** page appears, select **Flexible plans** and then scroll to the cloud vendor options.

    {{<image filename="images/rc/new-subscription-plans-flexible.png" alt="Available subscription plans; Flexible plan is selected." >}}{{< /image >}}

3. From here, you need to:

    1. Set up the deployment options for your subscription, include cloud vendor details, high availability settings, and advanced options.

    2. Define the database size requirements for your subscription.

    3. Review your choices, provide payment details, and then create the subscription.

The following sections provide more information.

## Set up deployment details


The **Setup** tab specifies general settings for the deployment of your subscription.

{{<image filename="images/rc/subscription-new-flexible-tabs-setup.png" width="75%" alt="The Setup tab of the new Fixed subscription process." >}}{{< /image >}}

The two sections to this tab:

- [General settings](#general-settings) include the cloud provider details, the subscription name, and specific configuration options.
- [Advanced options](#advanced-options) define settings for high availability and security. Configurable settings vary according to cloud provider.

To continue to the Sizing tag, locate and select the **Continue** button, which appears below the **Advanced options** section


### General settings {#general-settings}

{{<image filename="images/rc/subscription-new-flexible-setup-general.png" width="75%" alt="The General settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **General settings** of the **Setup** tab:

| _General setting_ | _Description_ |
|:---------|:-----------|
| **Cloud vendor** | The public cloud vendor to deploy your subscription. (_required_) |
| **Region** | The vendor region where you wish to deploy your subscription.  (_required_)|
| **Subscription&nbsp;Name** | A custom name for your subscription (_required_) |
| **Active-Active Redis** | Hosts your datasets in multiple read-write locations to support distributed applications and disaster recovery. See [Active-Active geo-distributed Redis]({{< relref "/rs/databases/active-active" >}}) |
| **Auto Tiering**| Determines if your databases are stored only in memory (RAM) or are split between memory and Flash storage (RAM+Flash).  See [Auto Tiering]({{< relref "/rs/databases/redis-on-flash/" >}})|

### Advanced options {#advanced-options}

{{<image filename="images/rc/subscription-new-flexible-setup-advanced.png" width="75%" alt="The Advanced settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **Advanced options** of the **Setup** tab:

| _Advanced option_ | _Description_ |
|:---------|:-----------|
| **Multi-AZ** | Determines if replication spans multiple Availability Zones, which provides automatic failover when problems occur. |
| **Cloud account** | To deploy this subscription to an existing cloud account, select it here.  Use the Add button to add a new cloud account.<br/><br/>(Available only if [self-managed cloud vendor accounts]({{<relref "/rc/cloud-integrations/aws-cloud-accounts">}}) are enabled) |
| **VPC configuration** | Select _In a new VPC_ to deploy to a new [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC).<br/><br/>To deploy this subscription to an existing virtual private cloud, select _In existing VPC_ and then set VPC ID to the appropriate ID value.<br/><br/>(Available only if [self-managed cloud vendor accounts]({{<relref "/rc/cloud-integrations/aws-cloud-accounts">}}) are enabled) |
| **Deployment CIDR** | The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) range of IP addresses for your deployment. Because Redis creates a new [subnet](https://en.wikipedia.org/wiki/Subnetwork) for the _Deployment CIDR_ in your [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC), it cannot overlap with the CIDR ranges of other subnets used by your subscription.<br/><br/>For deployments in an existing VPC, the _Deployment CIDR_ must be within your VPC's **primary** CIDR range (secondary CIDRs are not supported). |
| **Allowed Availability Zones** | The availability zones for your selected region.<br/><br/>If you choose *Manual selection*, you must select at least one zone ID from the **Zone IDs** list.  For more information, see [Availability zones](#availability-zones). |

When finished, choose **Continue** to determine your subscription size requirements.

{{<image filename="images/rc/button-subscription-continue.png" width="100px" alt="Select the Continue button to continue to the next step." >}}{{< /image >}}

#### Availability zones

You can reduce network transfer costs and network latency by ensuring your Redis Cloud cluster and your application are located in the same availability zone. 

To specify the availability zone for your cluster, select *Manual Selection* under **Allowed Availability Zones**. 

For Google Cloud clusters and [self-managed AWS cloud accounts]({{< relref "/rc/cloud-integrations/aws-cloud-accounts/" >}}), select an availability zone from the **Zone name** list.

{{<image filename="images/rc/availability-zones-no-multi-az.png" width="95%" alt="Select one availability zone when Multi-AZ is turned off." >}}{{< /image >}}

For all other AWS clusters, select an availability zone ID from the **Zone IDs** list. For more information on how to find an availability zone ID, see the [AWS docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones).

{{<image filename="images/rc/availability-zones-aws-hosted-no-multi-az.png" width="80%" alt="For hosted AWS clusters, select availability zone IDs from the Zone IDs list." >}}{{< /image >}}

If **Multi-AZ** is enabled, you must select three availability zones from the list.

{{<image filename="images/rc/availability-zones-multi-az.png" width="80%" alt="Select Manual selection to select three availability zones when Multi-AZ is enabled." >}}{{< /image >}}

For more information on availability zones, see the [Google Cloud docs](https://cloud.google.com/compute/docs/regions-zones/#available) or the [AWS docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones).
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
| **Advanced Capabilities** | Modules used by the database. Choose from [RedisSearch]({{< relref "/stack/search" >}}), [RedisJSON]({{< relref "/stack/json" >}}), [RedisTimeSeries]({{< relref "/stack/timeseries" >}}), [RedisBloom]({{< relref "/stack/bloom" >}}), or [RedisGraph]({{< relref "/stack/deprecated-features/graph" >}}). |
| **Throughput/Shards** | Identifies maximum throughput for the database, which can be specified in terms of operations per second (**Ops/sec**) or number of shards dedicated to the database (**Shards**). |
| **Memory Limit (GB)** | The size limit for the database. Specify small sizes as decimals of 1.0&nbsp;GB; example: `0.1` GB (minimum).|
| **High Availability** | Indicates whether a replica copy of the database is maintained in case the primary database becomes unavailable.  (Warning: Doubles memory consumption). |
| **Quantity** | Identifies the number of databases to create with the selected settings. |

Select **More options** to specify values for the following settings.

{{<image filename="images/rc/flexible-add-database-advanced.png" width="75%" alt="The New Database dialog with advanced settings." >}}{{< /image >}}

| Database&nbsp;option | Description |
|:---------|:-----------|
| **OSS Cluster API** | Enable to use the open-source Redis Cluster API. |
| **Type** | Set to _Memcached_ database to support the legacy database; otherwise leave as _Redis_ |
| **Data Persistence** | Defines the data persistence policy, if any. See [Database persistence]({{< relref "/rs/databases/configure/database-persistence.md" >}}) |
| **Quantity** | Number of databases to create with these settings. |

When finished, select **Save database** to create your database.

{{<image filename="images/rc/button-database-save.png" width="140px" alt="Select the Save Database button to define your new database." >}}{{< /image >}}

Use the **Add database** button to define additional databases or select the **Continue button** to display the **Review and create** tab.

Use the **Edit** icon to change a database or the **Delete** icon to remove a database from the list.

{{<image filename="images/rc/icon-database-edit.png" width="30px" alt="Use the Edit button to change database settings." >}}{{< /image >}}&nbsp;{{<image filename="images/rc/icon-database-delete.png" width="30px" alt="Use the Delete button to remove a database." >}}{{< /image >}}


## Review and Create tab

The **Review & Create** tab provides a cost estimate for your Flexible plan:

{{<image filename="images/rc/subscription-new-flexible-review.png" width="75%" alt="The Review & Create tab of the New Flexible subscription screen." >}}{{< /image >}}

Select **Back to Sizing** to make changes or **Create subscription** to create your new Flexible subscription.

{{<image filename="images/rc/button-subscription-create.png" width="140px" alt="Select Create subscription to create your new subscription." >}}{{< /image >}}

Note that subscriptions are created in the background.  While they are provisioning, you aren't allowed to make changes.  (The process generally takes 10-15 minutes.)

Use the **Subscriptions list** to check the status of your subscription.  You will also receive an email when your subscription is ready to use.

### Shard types

The shard types associated with your subscription depend on your database memory size and throughput requirements.  

| Shard type | Capacity (Memory/Throughput) |
|:------------|:----------|
| Micro | 1GB / 1K ops/sec |
| High-throughput | 2.5GB / 25K ops/sec |
| Small | 12.5GB / 12.5K ops/sec |
| Large | 25GB  / 25K ops/sec |
| Very large | 50GB / 50K ops/sec |

Prices vary according to the cloud provider and region.  Minimum prices apply.  To learn more, see [Cloud pricing](https://redis.com/redis-enterprise-cloud/pricing/).
