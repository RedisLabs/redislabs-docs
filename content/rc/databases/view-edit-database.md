---
Title: View and edit databases
description:
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rc/administration/setup-and-editing/viewing-editing-database/
        /rv/administration/setup_and_editing/viewing-editing-databases/
        /rc/administration/setup/edit-database/
        /rc/administration/setup/edit-database.md
---

Use the **Databases** menu of the admin console to manage your subscription databases.

To view the details of a database:

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/new/).  (Create an account if you don't already have one.)

2.  Locate the database in the list.

3.  Select the database name to open the **Database** page.

    {{<image filename="images/rc/database-details-configuration-tab-general-flexible.png" width="75%" alt="The Configuration tab of the Database details screen." >}}{{< /image >}}

The **Database** screen lets you review:
- Configuration details of a database
- Graphs showing performance metrics
- Recent activity via a "slowlog," which lists queries that exceed a certain [execution time](https://redis.io/commands/slowlog).

To change database settings, see [Edit database details](#edit-database-details),

## Configuration details tab

The **Configuration details** screen is divided into sections, each dedicated to a specific category.  Note that not every section or setting is available to every [subscription plan]({{< relref "rc/subscriptions/" >}}).

### General settings

The **General** section defines basic properties about your database.

The available settings vary according to your subscription plan, cloud provider, and design choices.  For example, if you do not select a module when crating a database, the **Module** setting is not displayed when you view its configuration details.

|Setting name|Description|
|:-----------|:----------|
| **Database Name** | The name given to your database |
| **Public endpoint** | Public URI used by any application or client to access the database. |
| **Private endpoint** | Private endpoint URI available to approved clients; use CIDR allow list and VPC peering to enabled access (_Flexible or Annual subscriptions only_)|
| **Protocol** | Either 'redis' or 'memcached' based on the value selected when the database was created |
| **Redis version** | Redis version used to create the database |
| **Redis on Flash** | Checked when the subscription supports Redis on Flash (_Flexible or Annual subscriptions only_) |
| **Activated on** | Date and time the database was created |
| **Active-Active Redis** | Checked when the database is part of an Active-Active relationship (_coming soon; Flexible or Annual subscriptions only_) |
| **Last changed** | Date and time of last update |
| **Protocol**  | Describes the protocol of the database, typically _Redis_ |
| **Module** | This setting appears when when a [module]({{< relref "modules/" >}}) is enabled for a database  |

### Scalability section

The **Scalability** section describes the memory size, throughput, and hashing policy for a database.

{{<image filename="images/rc/database-details-configuration-tab-scalability-flexible.png" alt="Use the Scalability section to control the size, throughput, and hashing policy for a database." >}}{{< /image >}}

The **Scalability** section is available only for Flexible and Annual plans.

|Setting name|Description|
|:-----------|:----------|
| **Memory limit** | Maximum size (in GB) for your database |
| **Memory used** | Memory currently used for your database  |
| **Throughput** | Defines throughput in terms of maximum operations per second for the database
| **Shards** | Defines the throughput in terms of shards dedicated to the database
| **Hashing policy** | Defines the [hashing policy]({{< relref "/rs/concepts/high-availability/clustering.md#changing-the-hashing-policy" >}}) |
| **Cluster OSS** | Enables the [OSS Cluster API]({{< relref "/rs/administering/designing-production/networking/using-oss-cluster-api.md" >}}) for a database<br/><br/>When this option is enabled, you cannot define a custom hashing policy|

To learn more about these settings and when to use them, see [Database clustering]({{< relref "/rs/concepts/high-availability/clustering.md" >}}).

### Durability section

The Durability section helps protect your data when problems occur.  These settings define replication, persistence, backup, and eviction policies.

{{<image filename="images/rc/database-details-configuration-tab-durability-flexible.png" alt="Use the Durability  section to protect your data from unexpected problems." >}}{{< /image >}}

|Setting name|Description|
|:-----------|:----------|
| **High availability** | Replicates your data across multiple nodes, as allowed by your subscription plan |
| **Data persistence** | Defines whether (and how) data is saved to disk; [available options]({{< relref "/rc/databases/configuration/data-persistence.md" >}}) depend on your plan type |
| **Data eviction policy** | Defines what happens when your database reaches its [memory size limit]({{< relref "/rc/databases/configuration/data-eviction-policies.md" >}}) |
| **Remote backup** | (_paid Fixed, Flexible, or Annual subscriptions only_) When enabled, identifies a location and interval for [data backups]({{< relref "/rc/databases/back-up-data.md" >}}). |
| **Active-passive Redis** | (_Flexible or Annual subscriptions only_) When enabled, identifies a path to the linked database. |

### Security section

The **Security** section helps you control access to your database.

{{<image filename="images/rc/database-details-configuration-tab-security-flexible.png" alt="Use the Security settings to control access to your database." >}}{{< /image >}}


|Setting name|Description|
|:-----------|:----------|
| **Default user** | When enabled, permits access using a simple password |
| **Redis password** | Password assigned to the database when created |  
| **CIDR allow list** | (_paid Fixed, Flexible, or Annual subscriptions only_) Range of IP addresses/security groups allowed to [access the database]({{< relref "/rc/security/cidr-whitelist.md" >}})|
| **Transport layer security (TLS)** | (_Flexible or Annual subscriptions only_) Enables [transport security layer]({{< relref "/rc/security/database-security/tls-ssl.md" >}})(TLS) encryption for database access.|

### Alerts section


The **Alerts** section defines notification emails sent to your account and the conditions that trigger them.

{{<image filename="images/rc/database-details-configuration-tab-alerts-flexible.png" alt="The Alerts section defines the notification emails and their triggering conditions." >}}{{< /image >}}

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

### Danger zone 

Actions in the **Danger Zone** are permanent and should not be taken lightly.

{{<image filename="images/rc/database-details-configuration-tab-danger-flexible.png" alt="The Danger Zone includes activities that impact data, such as deleting a database.  Use with care." >}}{{< /image >}}

Here, you can:

- Delete the database.

    When you choose this action, you're asked to confirm.

    {{<image filename="images/rc/database-delete-confirm-dialog.png" alt="The Delete database confirmation dialog confirms your decision to delete a database." >}}{{< /image >}}

    Databases must be active and empty before they can be deleted.  To learn more, see [Delete a database]({{< relref "/rc/databases/delete-database.md" >}}).

- Import data into the database.

    When you choose this action, you're asked to specify the source and location of the data to import

    {{<image filename="images/rc/database-import-dialog.png" alt="The Import data dialog helps you import data into a database." >}}{{< /image >}}

    To learn more, see [Import data]({{< relref "/rc/databases/import-data.md" >}}).

For best results, we recommend backing up data before starting any **Danger Zone** actions.

## Other actions and info

The **View Database** screen also has tabs that let you view:

- **Metrics**: a series of graphs showing database performance over time.  See [Monitor performance]({{< relref "/rc/databases/monitor-performance.md" >}})

- **Slowlog**: a log showing recent [slow queries](https://redis.io/commands/slowlog) run against your database.  The log displays when the action started, the duration, the complexity of the operation, and any parameters passed to the operation.

## Edit database details

Use the **Edit database** button to edit database details.

{{<image filename="images/rc/button-database-edit.png" alt="The Edit database button lets you change selected database properties." >}}{{< /image >}}

Because databases exist within the context of a deployment, certain fields cannot be updated, especially those that might lead to data loss.

Here's what you can change: 

| Section | Setting | Comments |
|:-----------|:----------|:---------|
| General | Database name ||
| Scalability | Memory limit | _Flexible and Annual subscriptions only)_ |
| | Throughput | _Flexible and Annual subscriptions only)_ |
| | Hashing policy | _Flexible and Annual subscriptions only)_ |
| | Cluster OSS | _Flexible and Annual subscriptions only)_ |
| Durability | High-availability | _paid Fixed, Flexible, and Annual subscriptions only)_ |
| | Data persistence | _paid Fixed, Flexible, and Annual subscriptions only)_ |
| | Data eviction policy | |
| | Remote backup | _paid Fixed, Flexible,  Annual subscriptions only)_ |
| | Active-passive Redis | _Flexible and Annual subscriptions only)_ |
| Security | Default user |
| | Default user password |
| | CIDR allow list | _paid Fixed, Flexible, and Annual subscriptions only)_ |
| | Transport layer security (TLS) | _Flexible and Annual subscriptions only)_ |
| Alerts | all available for subscription |

Choose **Save database** to save your changes.

{{<image filename="images/rc/button-database-save.png" alt="Use the Save database button to save database changes." >}}{{< /image >}}

If you need to change other details, create a new database and then migrate existing data.

