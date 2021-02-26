---
Title: Customize a Flexible plan
description:
weight: 30
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/customize-pro/ 
         /rc/administration/customize-pro.md 
         /rc/administration/customize-flexible-plan/
---

When you create a subscription with a Flexible plan, you customize it to your business needs.

This means you:

- Define deployment settings for your subscription, such as cloud provider, network settings, and so on.

- Create at least one database in order to determine cluster size.

- Review the cost estimate for your selections and define payment before creating the subscription.

This article describes the Create Custom Subscription screen, which uses tabs to break the process into three step.  Here, you'll find a description of the settings and options for each tab.



## Setup tab

The Setup tab specifies general settings for the deployment of your subscription.

{{<image filename="/images/rc/flexible-create-setup.png" width="75%" alt="The Setup tab of the Create Custom Subscription screen." >}}{{< /image >}}

There are three sections on this tab:

- [General settings](#general-settings)
- [Cloud details](#cloud-details)
- [Advanced options](#advanced-options)

### General settings {#general-settings}

| General setting | Description |
|:---------|:-----------|
| **Subscription&nbsp;Name** | A custom name for your subscription (_required_) |
| **Runs On**| Defines whether your databases are stored only in memory (RAM) or are split between memory and Flash storage (RAM+Flash).  See [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})|

### Cloud details {#cloud-details}

| Cloud detail | Description |
|:---------|:-----------|
| **Cloud Vendor** | The public cloud provider |
| **Region(s)** | The cloud region for your subscription |
| **Multi-AZ** | Whether in-memory data is replicated to another zone within the deployment region. For best results, choose a region with at least three availability zones.|

### Advanced options {#advanced-options}

| Advanced option | Description |
|:---------|:-----------|
| **Deployment CIDR** | The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) subnet address for your deployment. Must not overlap other addresses used with your subscription.|
| **Preferred Availability Zone(s)** | (_GCP only_) The [availability zone](https://cloud.google.com/compute/docs/regions-zones/#available) for your selected region.<br/><br/>If you choose *Select zone(s)*, you must choose at least one zone from **Zone Suffix**.  You can choose up to three preferred zones. |
| **Persistent Storage Encryption** | (_AWS only_) Whether data is encrypted when stored to disk.  When selected, this mounts [encrypted EBS volumes](https://aws.amazon.com/ebs/faqs/#Encryption) to your instance. |

When finished, choose **Next** to determine your size requirements.

## Size tab

The **Sizing** tab helps you specify the database, memory, and throughput for your subscription.

When you first visit the **Sizing** tab, you define a database:

{{<image filename="/images/rc/flexible-create-sizing-first.png" width="75%" alt="Defining a database on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}}

| New database setting | Description |
|:---------|:-----------|
| **Name** | A custom name for your database (_required_) |
| **Protocol** | _Redis_ or _Memcached_ |
| **Memory Limit (GB)** | The size limit for the database, Specify small sizes as decimals of 1.0&nbsp;GB; example: `0.1` GB (minimum).| 
| **Throughput By** | Identifies how throughput is measured for the database, either operations per second (_Ops/sec_) or _Number of shards_. |
| **Modules** | Identifies a module used by the database.  Choose from [RedisSearch&nbsp;2](#), [RedisGraph](#), [RedisBloom](#), or [RedisTimeSeries](#).<br/><br/>If you select RedisSearch 2, you also need to specify a value for **Number of Documents**.  This defines the maximum internal array size ([MAXDOCTABLESIZE](https://oss.redislabs.com/redisearch/Configuring/?_ga=2.155176508.524468484.1612194154-499260268.1607530891#maxdoctablesize)).|
| **Replication** | Enables an in-memeory replica, which in turn enables real-time failover, but doubles memory consumption. |
| **Data Persistence** | Defines the data persistence policy, if any. See [Database Persistence]({{< relref "/rs/concepts/data-access/persistence.md" >}}) |
| **OSS Cluster API support** | Allows client to use the OSS Cluster API to access the database. |
| **Ops/sec** | The operations required per second (when **Throughput By** is set to _Ops/sec_) |
| **Number of Shards** | The number of shards set aside for the database (when **Throughput By** is set to _Number of Shards_) |

When finished, click the **Save** button to add the database to your subscription.

When you have at least one defined database, the **Sizing** tab shows a list of your defined databases and provides to maintain them.

{{<image filename="/images/rc/flexible-create-sizing-list.png" width="75%" alt="The database list shown on the Sizing tab of the Create Custom Subscription screen." >}}{{< /image >}}

When the database list is displayed, you can:

- Use the **Delete** icon (displayed on the right side of the database entry in the list0 to remove a database.

- Create multiple copies of a database by updating the **Quantity** field.

- Create a new database by clicking the **Add** button above the Back button.

- Return to the **Setup** tab using the **Back** button.

- **Cancel** the subscription (&lt;Cancel button image>)

When you've defined the databases for your subscription, select the **Next** button to review the cost estimate.

## Review &amp; Create tab

The **Review & Create** tab provides a cost estimate for your Flexible plan and provides a place to enter payment details:

{{<image filename="/images/rc/flexible-create-review.png" width="75%" alt="The **Review & Create** tab of the Create Custom Subscription screen." >}}{{< /image >}}

To update **Payment Method**, choose an existing method from the list or add a new one.

When available, special offers are displayed below the payment methods.

Use the:

- **Back** button to change your selections
- **Cancel** button to cancel the subscription
- **Continue** button to create the subscription

Note that subscriptions are created in the background.  While they are provisioning, you will not be able to change any details.

To check the status of a subscription, choose **Subscriptions** from the admin console menu.  The **Subscriptions** list displays the status for each subscription.  You will also receive an email when your subscription is ready to use.

When your subscription is fully provisioned, use the **Databases** command from the admin console menu to determine the connection details.  You can also define access controls. 
