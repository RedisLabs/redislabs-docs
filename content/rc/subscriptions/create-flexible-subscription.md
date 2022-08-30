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
Flexible subscriptions support any dataset size or throughput.  Pricing is based on your [workload requirements](https://redislabs.com/redis-enterprise-cloud/pricing/) (database size and throughput.)  

When you create a Flexible subscription, a cost estimate is provided to help you understand the impact of your requirements.  

## Create a Flexible subscription

To create a [Flexible subscription]({{< relref "/rc/subscriptions/#subscription-plans" >}}):

1.  From the admin console menu, select the **New Subscription** button.  

    {{<image filename="images/rc/button-subscription-new.png" width="20%" alt="The New subscriptions button in the admin console menu." >}}{{< /image >}}

2. When the **New subscription** page appears, select **Flexible plans** and then scroll to the cloud vendor options.

    {{<image filename="images/rc/new-subscription-plans-flexible.png" alt="Available subscription plans; Flexible plan is selected." >}}{{< /image >}}

3. From here, you need to:

    1. Set up the deployment options for your subscription, include cloud vendor details, replication settings, and advanced options.

    2. Define the database size requirements for your subscription.

    3. Review your choices, provide payment details, and then create the subscription.

The following sections provide more information.

## Set up deployment details


The **Setup** tab specifies general settings for the deployment of your subscription.

{{<image filename="images/rc/subscription-new-flexible-tabs-setup.png" width="75%" alt="The Setup tab of the new Fixed subscription process." >}}{{< /image >}}

The two sections to this tab:

- [General settings](#general-settings) include the cloud provider details, the subscription name, and specific configuration options.
- [Advanced options](#advanced-options) define settings for replication and security.vary according to cloud provider.

To continue to the Sizing tag, locate and select the **Continue** button, which appears below the **Advanced options** section


### General settings {#general-settings}

{{<image filename="images/rc/subscription-new-flexible-setup-general.png" width="75%" alt="The General settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **General settings** of the **Setup** tab:

| _General setting_ | _Description_ |
|:---------|:-----------|
| **Cloud vendor** | The public cloud vendor to deploy your subscription. (_required_) |
| **Region** | The vendor region where you wish to deploy your subscription.  (_required_)|
| **Subscription&nbsp;Name** | A custom name for your subscription (_required_) |
| **Active-Active Redis** | (_Coming soon_) |
| **Redis on Flash**| Determines if your databases are stored only in memory (RAM) or are split between memory and Flash storage (RAM+Flash).  See [Redis on Flash]({{< relref "/rs/databases/redis-on-flash/.md" >}})|

### Advanced options {#advanced-options}

{{<image filename="images/rc/subscription-new-flexible-setup-advanced.png" width="75%" alt="The Advanced settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **Advanced options** of the **Setup** tab:

| _Advanced option_ | _Description_ |
|:---------|:-----------|
| **Multi-AZ** | Determines if replication spans multiple Availablity Zones, which provides automatic failover when problems occur. |
| **Cloud account** | To deploy this subscription to a specific cloud account, select it here.  Use the Add button to add a new cloud account. |
| **VPC configuration** | Select _In a new VPC_ to deploy to a new Virtual Private Cloud.<br/><br/>To deploy this subscription to an existing Virtual Private Cloud , select _In existing VCP_ and then set VPC ID to the appropriate ID value.   |
| **Deployment CIDR** | The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) subnet address for your deployment. Must not overlap other addresses used with your subscription.|
| **Preferred Availability Zone(s)** | The [availability zone](https://cloud.google.com/compute/docs/regions-zones/#available) for your selected region.<br/><br/>If you choose *Select zone(s)*, you must choose at least one zone from **Zone Suffix**.  You can choose up to three preferred zones. |

When finished, choose **Continue** to determine your subscription size requirements.

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
| **Throughput/Shards** | Identifies maximum throughput for the database, which can be specified in terms of operations per second (**Ops/sec**) or number of shards dedicated to the database (**Shards**).throughput is measured for the database, either operations per second (_Ops/sec_) or _Number of shards_. |
| **Memory Limit (GB)** | The size limit for the database. Specify small sizes as decimals of 1.0&nbsp;GB; example: `0.1` GB (minimum).|
| **Replication** | Indicates whether a replica copy of the database is maintained in case the primary database becomes unavailable.  (Warning: Doubles memory consumption). |
| **Quantity** | Identifies the number of databases to create with the selected settings. |

Advanced options are also available.

{{<image filename="images/rc/flexible-add-database-advanced.png" width="75%" alt="The New Database dialog with advanced settings." >}}{{< /image >}}

Select **Advanced options** to specify values for the following settings:

| Advanced&nbsp;option | Description |
|:---------|:-----------|
| **OSS Cluster API** | Enable to use the open-source Redis Cluster API. |
| **Protocol** | Set to _Memcached_ database to support the legacy database; otherwise leave at _Redis_ |
| **Data Persistence** | Defines the data persistence policy, if any. See [Database persistence]({{< relref "/rs/databases/configure/database-persistence.md" >}}) |
| **Modules** | Identifies a module used by the database.  Choose from [RedisSearch&nbsp;2]({{< relref "/modules/redisearch/_index.md" >}}), [RedisGraph]({{< relref "/modules/redisgraph/_index.md" >}}), [RedisBloom]({{< relref "/modules/redisbloom/_index.md" >}}), or [RedisTimeSeries]({{< relref "/modules/redistimeseries/_index.md" >}}).<br/><br/>If you select RedisSearch 2, you also need to specify a value for **Number of Documents**.  This defines the maximum internal array size ([MAXDOCTABLESIZE](https://oss.redislabs.com/redisearch/Configuring/?_ga=2.155176508.524468484.1612194154-499260268.1607530891#maxdoctablesize)).|

When finished, select **Save Database** to create your database.

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
| Very large | 50GB / 5.0K ops/sec |

Prices vary according to the cloud provider and region.  Minimum prices apply.  To learn more, see [Cloud pricing](https://redis.com/redis-enterprise-cloud/pricing/).