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

When you create a Flexible subscription, a cost estimate is provided to help you understand the impct of your requirements.  

## Create a Flexible subscription

To create a [Flexible subscription]({{< relref "/rc/subscriptions/#subscription-plans" >}}):

1.  From the admin console menu, select the **New Subscription** button.  

    {{<image filename="images/rc/button-subscription-new.png" alt="The New subscriptions button in the admin console menu." >}}{{< /image >}}

2. When the **New subscription** page appears, select **Flexible plans** and then scroll to the cloud vendor options.

    {{<image filename="images/rc/subscription-new-plan-options.png" alt="Available subscription plan options." >}}{{< /image >}}

3. From here, three steps remain:

    1. Set up the deployment options for your subscription, include cloud vendor details, replication settings, and advanced options.

    2. Define the size requirements for your subscription.

    3. Review your choices, provide payment details, and then create the subscription.

The following sections provide more information.

## Set up deployment details


The **Setup** tab specifies general settings for the deployment of your subscription.

{{<image filename="images/rc/flexible-create-setup.png" width="75%" alt="The Setup tab of the Create Custom Subscription screen." >}}{{< /image >}}

The two sections to this tab:

- [General settings](#general-settings) include the cloud provider details, the subscription name, and specific configuration options.
- [Advanced options](#advanced-options) define settings for replication and security.vary according to cloud provider.

To continue to the Sizing tag, locate and select the **Continue** button, which appears below the **Advanced options** section


### General settings {#general-settings}

{{<image filename="images/rc/flexible-create-setup.png" width="75%" alt="The Setup tab of the Create Custom Subscription screen." >}}{{< /image >}}

The following settings are defined in the **General settings** of the **Setup** tab:

| _General setting_ | _Description_ |
|:---------|:-----------|
| **Cloud vendor** | The public cloud vendor to deploy your subscription. (_required_) |
| **Region** | The vendor region where you wish to deploy your subscription.  (_required_)|
| **Subscription&nbsp;Name** | A custom name for your subscription (_required_) |
| **Active-Active Redis** | (_Coming soon_) |
| **Redis on Flash**| Determines if your databases are stored only in memory (RAM) or are split between memory and Flash storage (RAM+Flash).  See [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})|

### Advanced options {#advanced-options}

{{<image filename="images/rc/flexible-create-setup.png" width="75%" alt="The Setup tab of the Create Custom Subscription screen." >}}{{< /image >}}

The following settings are defined in the **Advanced options** of the **Setup** tab:

| _Advanced option_ | _Description_ |
|:---------|:-----------|
| **Multi-AZ** | Determines if replication spans multiple Availablity Zones, which provides automatic failover when problems occur. |
| **Cloud account** | To deploy this subscription to a specific cloud account, select it here.  Use the Add button to add a new cloud account. |
| **VPC configuration** | Select _In a new VPC_ to deploy to a new virtual PC.<br/><br/>To deploy this subscription to an existing virtual PC, select _In existing VCP_ and then set VPC ID to the appropriate ID value.   |
| **Deployment CIDR** | The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) subnet address for your deployment. Must not overlap other addresses used with your subscription.|
| **Preferred Availability Zone(s)** | The [availability zone](https://cloud.google.com/compute/docs/regions-zones/#available) for your selected region.<br/><br/>If you choose *Select zone(s)*, you must choose at least one zone from **Zone Suffix**.  You can choose up to three preferred zones. |

When finished, choose **Continue** to determine your subscription size requirements.

## Sizing tab

The **Sizing** tab helps you specify the database, memory, and throughput requirements for your subscription.

{{<image filename="images/rc/flexible-create-sizing-first.png" width="75%" alt="Defining a database on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}}

When you first visit the **Sizing** tab, there are no databases defined.  Select the **Add** button to create one.

{{<image filename="images/rc/icon-subscription-flexible-add-database.png" width="75%" alt="Defining a database on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}}

This opens the **New Database** dialog, which lets you define the requirements for your new database.

By default, you're shown basic settings, which include:

| New database setting | Description |
|:---------|:-----------|
| **Name** | A custom name for your database (_required_) |
| **Throughput/Shards** | Identifies maximum throughput for the database, which can be specified in terms of operations per second (**Ops/sec**) or number of shards dedicated to the database (**Shards**).throughput is measured for the database, either operations per second (_Ops/sec_) or _Number of shards_. |
| **Memory Limit (GB)** | The size limit for the database. Specify small sizes as decimals of 1.0&nbsp;GB; example: `0.1` GB (minimum).|
| **Replication** | Indicates whether a replica copy of the database is maintained in case the primary database becomes unavailable.  (Warning: Doubles memory consumption). |
| **Quantity** | Identifies the number of databases to create with the selected settings. |

Select **Advanced options** to specify values for the following settings:

| New database<br/>advanced option | Description |
|:---------|:-----------|
| **OSS Cluster API** | Enable to use the open-source Redis Cluster API. |
| **Protocol** | Set to _Memcached_ database to support the legacy database; otherwise leave at _Redis_ |
| **Data Persistence** | Defines the data persistence policy, if any. See [Database Persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}}) |
| **Modules** | Identifies a module used by the database.  Choose from [RedisSearch&nbsp;2](#), [RedisGraph](#), [RedisBloom](#), or [RedisTimeSeries](#).<br/><br/>If you select RedisSearch 2, you also need to specify a value for **Number of Documents**.  This defines the maximum internal array size ([MAXDOCTABLESIZE](https://oss.redislabs.com/redisearch/Configuring/?_ga=2.155176508.524468484.1612194154-499260268.1607530891#maxdoctablesize)).|

When finished, select **Save Database** to create your database.

{{<image filename="images/rc/icon-subscription-flexible-add-database.png" width="75%" alt="Defining a database on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}}

When you have at least one defined database, select the **Continue button** to display the Review and create tab.

{{<image filename="images/rc/flexible-create-sizing-list.png" width="75%" alt="The database list shown on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}}

Use the Edit icon to change database properties or the Delete icon to remove a database from the list.

{{<image filename="images/rc/flexible-create-sizing-list.png" width="75%" alt="The database list shown on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}} &nbsp; 
{{<image filename="images/rc/flexible-create-sizing-list.png" width="75%" alt="The database list shown on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}}

## Review and Create tab

The **Review & Create** tab provides a cost estimate for your Flexible plan and lets you enter payment details:

{{<image filename="images/rc/flexible-create-review.png" width="75%" alt="The **Review & Create** tab of the Create Custom Subscription screen." >}}{{< /image >}}

To update **Payment Method**, choose an existing method from the list or add a new one.

When available, special offers are displayed below the payment methods.

Use the:

- **Back** button to change your selections
- **Cancel** button to cancel the subscription
- **Continue** button to create the subscription

Note that subscriptions are created in the background.  While they are provisioning, you aren't allowed make changes.  (The process generally takes 10-15 minutes.)

To check the status of a subscription, choose **Subscriptions** from the admin console menu.  The **Subscriptions** list displays the status for each subscription.  You will also receive an email when your subscription is ready to use.