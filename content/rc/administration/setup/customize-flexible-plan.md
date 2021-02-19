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

- Define deployment settings for your subscription, such as cloud provider, network settings, and so on

- Create at least one database in order to determine cluster size.

- Review the cost estimate for your selections before creating the subscription.

Here's what the process looks like when you start:

&lt;image here>

## Setup settings

The Setup tab specifies general settings for the deployment of your subscription.

Here's what's available:

| Setting | Description |
|:---------|:-----------|
| _General settings:_|
| **Subscription&nbsp;Name** | A custom name for your subscription (_required_) |
| **Runs On**| Defines whether your databases are stored only in memory (RAM) or are split between memory and Flash storage (RAM+Flash).  See [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})|
| _Cloud details:_|
| **Cloud Vendor** | The public cloud provider |
| **Region(s)** | The cloud region for your sunscription |
| **Multi-AZ** | Whether in-memory data is replicated to another zone within the deployment region. We recommend choosing a region with at least three availability zones.|
| _Advanced options:_|
| **Deployment CIDR** | The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) subnet address for your deployment. Must not overlap other addresses used with your subscription.|
| **Preferred Availability Zone(s)** | (_GCP only_) The [availability zone](https://cloud.google.com/compute/docs/regions-zones/#available) for your selected region.<br/><br/>If you choose *Select zone(s)*, you must choose at least one zone from **Zone Suffix**.  You can choose up to three preferred zones. |
| **Persistent Storage Encryption** | (_AWS only_) Whether data is encrypted when stored to disk.  When selected, this mounts [encrypted EBS volumes](https://aws.amazon.com/ebs/faqs/#Encryption) to your instance. |

After selecting your preferences, choose **Next** to determine your size requirements.

## Size settings

The Sizing tab determines your subscription cluster requirements, which are determined by databases in your subscription and their requirement.

When the Sizing tab first opens, it lets you enter your database details.

| Setting | Description |
|:---------|:-----------|
| _New database settings:_|
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

{{</* note */>}}Make sure you have enough disk space.{{</* /note */>}}

Once a database has been saved to your subscription, you cannot change it here.  If you make a mistake, either:

- Delete it from this list and create a new one

- Edit the database after creating the subscription.

After saving your database, you can:

- Increase the Quantity of databases matching your selected settings (&lt;plus/minus buttons from quantity field).

- Add another set of database choices (&lt;image of blue plus button>).

- **Cancel** the subscription (&lt;Cancel button image>)

- Choose Next to continue creating the subscription. (&lt;Next button image>)

## Review and create the subscription

The Review & Create tab 

- summarizes your custom subscription settings
- provides a cost estimate
- lets you enter payment info
- creates or cancels the subscription

To update **Payment Method**, choose an existing method from the list or add a new one.

When available, special offers are displayed below the payment methods.

Use the:

- **Back** button to change your selections
- **Cancel** button to cancel the subscription
- **Continue** button to create the subscription.

Note that subscriptions are created in the background.  While they are provisioning, you will not be able to change any details.

The check the status of a subscription, choose Subscriptions from the dashboard menu.  The Subscriptions list displays the status for each subscription.
