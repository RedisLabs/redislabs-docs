---
Title: Create a database
linkTitle: Create database
description:
weight: 10
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/setup_and_editing/create-databases/
         /rv/administration/setup_and_editing/creating-databases/
         /rc/administration/setup_and_editing/create-databases/
         /rc/administration/setup-and-editing/creating-databases/
---
To create a database in your Redis Enterprise Cloud [subscription]({{< relref "rc/subscriptions/" >}}):

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/new/).  (Create an account if you don't already have one.)

2. If you have more than one subscription, select the target subscription from the list.  This displays the **Databases** tab for the selected subscription.

    {{<image filename="images/rc/subscription-flexible-databases-tab-pending.png" alt="The Databases tab summarizes databases created for a given subscription." >}}{{< /image >}}

3. Select the **New database** button.

    {{<image filename="images/rc/button-database-new.png" alt="The New Database button creates a new database for your subscription." >}}{{< /image >}}

This displays the **Create database** screen, which varies according to your subscription plan.

{{<image filename="images/rc/database-create-general-flexible.png" alt="Use the New Database screen to create a new database for your subscription." >}}{{< /image >}}

The **Create database** screen is divided into sections, each dedicated to a specific category of settings.  Note that not every section or setting is available to every [subscription plan]({{< relref "rc/subscriptions/" >}}).

## General section

The **General** section defines basic properties about your database.

The available settings vary according to your subscription plan:

|Setting name|Description|
|:-----------|:----------|
| **Subscription** | Read-only description of your subscription plan, including cloud provider and region |
| **Active-Active Redis** | Checked when the subscription supports Active-Active databases (_coming soon; Flexible or Annual subscriptions only_) |
| **Redis on Flash** | Checked when the subscription supports Redis on Flash (_Flexible or Annual subscriptions only_) |
| **Database Name** | A name for your database (_required_) |
| **Protocol**  | Set to _Redis_ unless you need to support legacy memcached databases |
| **Modules** | Extend core Redis functionality using [modules]({{< relref "modules/" >}}) |

## Scalability section

The **Scalability** section lets you manage the maximum size, throughput, and hashing policy for a database.

{{<image filename="images/rc/database-create-scalability-flexible.png" alt="Use the Scalability section to control the size, throughput, and hashing policy for a database." >}}{{< /image >}}

The **Scalability** section is available only for Flexible and Annual plans.

|Setting name|Description|
|:-----------|:----------|
| **Memory size** | Maximum size (in GB) for your database |
| **Throughput** | Defines throughput in terms of maximum operations per second for the database
| **Shards** | Defines the throughput in terms of shards dedicated to the database
| **Hashing policy** | Defines the [hashing policy]({{< relref "/rs/concepts/high-availability/clustering.md#changing-the-hashing-policy" >}}) |
| **Cluster OSS** | Enables the [OSS Cluster API]({{< relref "/rs/administering/designing-production/networking/using-oss-cluster-api.md" >}}) for a database<br/><br/>When this option is enabled, you cannot define a custom hashing policy|

To learn more about these settings and when to use them, see [Database clustering]({{< relref "/rs/concepts/high-availability/clustering.md" >}}).

### Memory size

Memory size represents the maximum amount of memory for the database, which includes data values, keys, module data, and overhead for specific features.  High availability features, such as replication and Active-Active, dramatically increase memory consumption.  

Here are some general guidelines:

- Memory size represents an upper limit.  You cannot store more data than the memory size.  Depending on your other selections, available memory for data may be much less than expected.

- Replication doubles memory consumption; that is, 512MB of data requires at least 1GB of memory size when replication is enabled.

- Active-Active replication also doubles memory consumption.  The effect is cumulative; that is, if you enable Active-Active and replication, the memory size impact can be as large as four times (4x) the original data size.  (This is significantly reduced when [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) is enabled.)

- Modules also consumes memory.

Memory limits in Redis Enterprise Cloud are subject to the same considerations as Redis Enterprise Software; to learn more, see [Database memory limits]({{< relref "/rs/administering/database-operations/memory-limit.md" >}})

## Durability section

The **Durability** section helps you keep your database (and your data) available when problems occur.

{{<image filename="images/rc/database-create-durability-flexible.png" alt="Use the Durability settings to keep your database (and data) available when problems occur." >}}{{< /image >}}


|Setting name|Description|
|:-----------|:----------|
| **High availability** | Replicates your data across multiple nodes, as allowed by your subscription plan |
| **Data persistence** | Defines whether (and how) data is saved to disk; [available options]({{< relref "/rc/concepts/data-persistence.md" >}}) depend on your plan type |
| **Data eviction policy** | Defines what happens when your database reaches its [memory size limit]({{< relref "/rc/concepts/data-eviction-policies.md" >}}) |
| **Remote backup** | (_paid Fixed, Flexible, or Annual subscriptions only_) When enabled, identifies a location and interval for [data backups]({{< relref "/rc/databases/back-up-data.md" >}}). |
| **Active-passive Redis** | (_Flexible or Annual subscriptions only_) When enabled, identifies a path to the linked database. |

## Security section

The **Security** section helps you control access to your database.

{{<image filename="images/rc/database-create-security-flexible.png" alt="Use the Security settings to control access to your database." >}}{{< /image >}}


|Setting name|Description|
|:-----------|:----------|
| **Default user** | When enabled, permits access using a simple password |
| **Redis password** | Password assigned to the database when created |  
| **CIDR allow list** | (_paid Fixed, Flexible, or Annual subscriptions only_) Range of IP addresses/security groups allowed to [access the database]({{< relref "/rc/security/cidr-whitelist.md" >}})|
| **Transport layer security (TLS)** | (_Flexible or Annual subscriptions only_) Enables [transport security layer]({{< relref "/rc/security/database-security/tls-ssl.md" >}})(TLS) encryption for database access.|


## Alerts section

The **Alerts** section defines notification emails sent to your account and the conditions that trigger them.

{{<image filename="images/rc/database-create-alerts-flexible.png" alt="The Alerts section defines the notification emails and their triggering conditions." >}}{{< /image >}}

The available alerts vary according to the subscription type.

|Setting name|Description|
|:-----------|:----------|
| **Dataset size has reached** | When enabled, sends an an email when the database reaches the defined memory size _(Free, Flexible, or Annuals plans only_)|
| **Total size of datasets under this plan reached** | When enabled, sends an an email when the database reaches the defined memory size _(paid Fixed plans only_)|
| **Throughput is higher than** | When enabled, sends an email when the operations per second exceed the defined threshold _(paid Fixed, Flexible, or Annuals plans only_)|
| **Throughput is lower than** | When enabled, sends an email when the operations per second falls below the defined threshold _(paid Fixed, Flexible, or Annuals plans only_)|
| **Latency is higher than** | When enabled, sends an an email when the latency exceeds the defined memory size _(paid Fixed plans only_)|
| **Number of connections** | When enabled, sends an email when the connections exceeds the defined limit.  _(Free and Fixed plans only)_|
| **Replica Of - database unable to sync with source** | When enabled, sends email when the replica database cannot sync with the primary (source) database _(Flexible or Annuals plans only_) |
| **Replica Of - sync lag is higher than** | When enabled, sends email when the sync lag exceeds the defined threshold _(Flexible or Annuals plans only_) |
