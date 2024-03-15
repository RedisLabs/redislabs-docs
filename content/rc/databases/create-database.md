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
Before creating a Redis Cloud database, you need to [create an account]({{< relref "rc/rc-quickstart.md" >}}).

To create a database in your Redis Cloud account:

1. Sign in to the [Redis Cloud console](https://app.redislabs.com).

2. Select the **New database** button.

    {{<image filename="images/rc/button-database-new.png" alt="The New Database button creates a new database." width="120px">}}{{< /image >}}

    This displays the **New database** screen.

    {{<image filename="images/rc/database-new-flexible.png" alt="Use the New Database screen to create a new database for your subscription." >}}{{< /image >}}

3. Select your Redis use case. There are four pre-defined use cases:

    IMAGE HERE: use case panel

    - **Cache**: Stores short-term or volatile data. Can be used for session management, semantic cache, session store, and other uses where data is short-lived.
    - **Database**: Stores durable and consistent data. Can be used for document databases, feature storage, gaming leaderboards, durable caches, and other uses where your data needs to be highly available and persistent.
    - **Vector search**: Manages and manipulates vector data. Can be used for Generative AI, recommendation systems, visual search, and other uses where you can search and query your data.
    - **Custom**: If your Redis use case doesn't match any of the other use cases, you can choose this option to choose all of your settings.

    Select the use case that best matches your Redis use case. You can always change the settings later. See [Use case settings](#use-case-settings) to view the settings for each use case.

4. Select the type of [subscription]({{<relref "/rc/subscriptions">}}) you need. 

    IMAGE HERE: what type of subscription do you need panel

    - An **Essentials** subscription is a fixed monthly price for a single database. It is cost-efficient and designed for low-throughput scenarios. It supports a range of availability, persistence, and backup options. Pricing supports low throughput workloads.
    - A **Pro** subscription is an hourly price based on capacity. It supports more databases, larger databases, greater throughput, and unlimited connections. Select **Pro** to create a new Pro subscription.
    - If you want to add your database to an existing Pro subscription, select **Existing Subscription** and select an existing Pro subscription from the list.
    
        IMAGE HERE: existing subscription selected
    
The rest of the database creation process depends on which subscription type you chose. Select your subscription type to view that section of the instructions:
    - [Create Essentials database](#essentials)
    - [Create Pro database - new subscription](#pro-new-sub)
    - [Create Pro database - existing subscription](#pro-existing-sub)
    
## Create Essentials database {#essentials}

Once you select **Essentials**, the rest of the database details will appear.

IMAGE HERE: db name, cloud vendor, region, type

1. Redis will generate a database name for you. If you want to change it, you can do so in the **Database name** field.  

1. Choose a **Cloud Provider** and a **Region**.

1. The **Type** of database controls the protocol and advanced capabilities. Leave this as **Redis Stack** unless you have a legacy application that uses **Memcached**.

    A Redis Stack database gives access to a set of advanced capabilities. For more information, see [Advanced capabilities]().

1. In the **Durability settings** panel, choose your **High availability settings** and **Data persistence** settings from the list. 

    IMAGE HERE: durability settings panel

    Redis Cloud supports the following high availability settings:

    - **None**: You will have a single copy of your database without replication.
    - **Single-Zone**: Your database will have a primary and a replica located in the same cloud zone. If anything happens to the primary, the replica takes over and becomes the new primary.
    - **Multi-Zone**: The primary and its replicas are stored in different zones. This means that your database can remain online even if an entire zone becomes unavailable.

    See [High availability]({{<relref "rc/databases/configuration/high-availability">}}) for more information about these settings.

    Redis Cloud supports the following Data persistence options:

    - An **Append-Only File** maintains a record (sometimes called a _redo log_ or _journal_) of write operations.  This allows the data to be restored by using the record to reconstruct the database up to the point of failure. For Essentials databases, Redis updates the Append-Only file every second.

    - A **Snapshot** are copies of the in-memory database, taken at periodic intervals (one, six, or twelve hours). You can restore data to the snapshot's point in time. 
    
    See [Data persistence]({{<relref "rc/databases/configuration/data-persistence">}}) for more information about these settings.

    These settings may already be set based on the use case you selected. you can change them now if you like.
    
1. Select the desired dataset size. To create a free database, select the 30 MB dataset size. You can only have one free database at a time.

    IMAGE HERE: Essentials plans

1.  Enter your payment details if you chose a paid plan.

    If you chose a paid plan and haven't previously entered a payment method, use the **Add Credit Card** button to add one.

    {{<image filename="images/rc/icon-add-credit-card.png" alt="The Add credit card icon." >}}{{< /image >}}

1. Select **Create database** or **Confirm & pay** to create your database.

When you create your database, there's a brief pause while your request is processed and then you're taken to the **Database details** page.

## Create Pro database - new subscription {#pro-new-sub}

Once you select **Pro**, you need to: 

1. Set up the deployment options, including cloud vendor details, high availability settings, and advanced options.

2. Define the database size requirements.

3. Review your choices, provide payment details, and then create your databases.

The following sections provide more information.

### Set up deployment details

The **Setup** tab specifies general settings for your Redis deployment.

{{<image filename="images/rc/subscription-new-flexible-tabs-setup.png" width="75%" alt="The Setup tab of the new Pro Database process." >}}{{< /image >}}

The three sections to this tab:

- [General settings](#general-settings) include the cloud provider details, the subscription name, and specific configuration options.
- [Version](#version) lets you choose the Redis version of your databases.
- [Advanced options](#advanced-options) define settings for high availability and security. Configurable settings vary according to cloud provider.

#### General settings {#general-settings}

{{<image filename="images/rc/subscription-new-flexible-setup-general.png" width="75%" alt="The General settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **General settings** of the **Setup** tab:

| General setting | Description |
|:---------|:-----------|
| **Cloud vendor** | The public cloud vendor to deploy your subscription. (_required_) |
| **Region** | The vendor region where you wish to deploy your subscription.  (_required_)|
| **Active-Active Redis** | Hosts your datasets in multiple read-write locations to support distributed applications and disaster recovery. See [Create an Active-Active database]() for specific steps and configuration options exclusive to Active-Active. |
| **Auto Tiering**| Determines if your databases are stored only in memory (RAM) or are split between memory and Flash storage (RAM+Flash).  See [Auto Tiering]({{< relref "/rs/databases/auto-tiering/" >}})|

#### Version {#version}

{{<image filename="images/rc/subscription-new-flexible-version-section.png" width="75%" alt="Version selection between Redis 6.2 and 7.2" >}}{{< /image >}}

The **Version** section lets you choose the Redis version of your database. Choose **Redis 7.2** if you want to use the latest advanced features of Redis.

#### Advanced options {#advanced-options}

{{<image filename="images/rc/subscription-new-flexible-setup-advanced.png" width="75%" alt="The Advanced settings of the Setup tab." >}}{{< /image >}}

The following settings are defined in the **Advanced options** of the **Setup** tab:

| Advanced option | Description |
|---|---|
| **Multi-AZ** | Determines if replication spans multiple Availability Zones, which provides automatic failover when problems occur. |
| **Allowed Availability Zones** | The availability zones for your selected region.<br/><br/>If you choose **Manual selection**, you must select at least one zone ID from the **Zone IDs** list.  For more information, see [Availability zones](FIX LINK - HA). |
| **Cloud account** | To deploy this subscription to an existing cloud account, select it here.  Use the **Add** button to add a new cloud account.<br/><br/>(Available only if [self-managed cloud vendor accounts]({{<relref "/rc/cloud-integrations/aws-cloud-accounts">}}) are enabled) |
| **VPC configuration** | Select **In a new VPC** to deploy to a new [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC).<br/><br/>To deploy this subscription to an existing virtual private cloud, select **In existing VPC** and then set VPC ID to the appropriate ID value.<br/><br/>(Available only if [self-managed cloud vendor accounts]({{<relref "/rc/cloud-integrations/aws-cloud-accounts">}}) are enabled) |
| **Deployment CIDR** | The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) range of IP addresses for your deployment. Redis creates a new [subnet](https://en.wikipedia.org/wiki/Subnetwork) for the **Deployment CIDR** in your [virtual private cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC). It cannot overlap with the CIDR ranges of other subnets used by your subscription.<br/><br/>For deployments in an existing VPC, the **Deployment CIDR** must be within your VPC's **primary** CIDR range (secondary CIDRs are not supported). |
| **Maintenance windows** | Determines when Redis can perform [maintenance]({{<relref "/rc/subscriptions/maintenance">}}) on your databases. Select **Manual** if you want to set [manual maintenance windows]({{<relref "/rc/subscriptions/maintenance/set-maintenance-windows">}}). |

When finished, choose **Continue** to determine your size requirements.

{{<image filename="images/rc/button-subscription-continue.png" width="100px" alt="Select the Continue button to continue to the next step." >}}{{< /image >}}

### Sizing tab

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


### Review and Create tab

The **Review & Create** tab provides a cost estimate for your Redis Cloud Pro plan:

{{<image filename="images/rc/subscription-new-flexible-review.png" width="75%" alt="The Review & Create tab of the New Flexible subscription screen." >}}{{< /image >}}

Redis breaks down your databases to Redis Billing Units (RBUs), each with their own size and throughput requirements. For more info, see [Billing unit types](#billing-unit-types).

Select **Back to Sizing** to make changes or **Confirm & Pay** to create your databases.

{{<image filename="images/rc/button-subscription-create.png" width="140px" alt="Select Create subscription to create your new subscription." >}}{{< /image >}}

Note that databases are created in the background.  While they are provisioning, you aren't allowed to make changes. This process generally takes 10-15 minutes.

Use the **Database list** to check the status of your databases.

## Create Pro database - existing subscription {#pro-existing-sub}

After you select **Pro** and then select your subscription from the list, you're taken to the **Create database page**.

The **Create database** screen is divided into sections, each dedicated to a specific category of settings.

When you've configured your new database, use the **Activate database** button to create and activate it.

{{<image filename="images/rc/button-database-activate.png" alt="Use the Activate database button to create and activate your database." width="150px">}}{{< /image >}}

### General section

The **General** section defines basic properties about your database.

The available settings vary according to your subscription plan:

| Setting name              | Description                                                                                                                                                                                                                                                                                                       |
|:--------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Subscription**          | Read-only description of your Pro subscription, including cloud provider and region                                                                                                                                                                                                                              |
| **Active-Active Redis**   | Checked when the subscription supports Active-Active databases                                                                                                                                                                                         |
| **Auto Tiering**          | Checked when the subscription supports Auto Tiering                                                                                                                                                                                     |
| **Database name**         | A name for your database (_required_)                                                                                                                                                                                                                                                                             |
| **Database port**         | Automatically or manually assigns a database port (range: 10000-19999).  You cannot assign a port that is reserved or already in use.                                                                                                                                                                                      |
| **Type**                  | Controls advanced database capabilities and protocol.  Supported values include _Redis_ and _Memcached_                                                                       |
| **Advanced capabilities** | Extend core Redis functionality using [advanced capabilities]({{<relref "/stack">}}).  Redis Cloud supports selected advanced capabilities; for details, see [Redis Enterprise and Redis Stack feature compatibility]({{<relref "/stack/enterprise-capabilities#redis-enterprise-module-support">}})   |
| **Supported Protocol(s)** | Choose between RESP2 and RESP3 _(Redis 7.2 only)_. See [Redis serialization protocol](https://redis.io/docs/reference/protocol-spec/#resp-versions) for details                                                                                                                                                   |

### Scalability section

The **Scalability** section lets you manage the maximum size, throughput, and hashing policy for a database.

{{<image filename="images/rc/database-new-flexible-scalability.png" alt="Use the Scalability section to control the size, throughput, and hashing policy for a database." >}}{{< /image >}}

| Setting name        | Description                                                                                                                                                                                                                                                                                                                                   |
|:--------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Memory limit**    | Maximum size (in GB) for your database. See [Memory limit]({{< relref "/rs/databases/durability-ha/clustering#dataset-size" >}}) for sizing considerations. |
| **Throughput**      | Defines throughput in terms of maximum operations per second for the database. See [Throughput]({{< relref "/rs/databases/durability-ha/clustering#throughput" >}}) for more information. |
| **Hashing policy**  | Defines the [hashing policy]({{< relref "/rc/databases/configuration/clustering#manage-the-hashing-policy" >}}).  |
| **OSS Cluster API** | Enables the [OSS Cluster API]({{< relref "/rc/databases/configuration/clustering#oss-cluster-api" >}}) for a database<br/><br/>When this option is enabled, you cannot define a custom hashing policy.  |

To learn more about these settings and when to use them, see [Database clustering]({{< relref "/rs/databases/durability-ha/clustering.md" >}}).

### Durability section

The **Durability** section helps you keep your database (and your data) available when problems occur.

{{<image filename="images/rc/database-new-flexible-durability.png" alt="Use the Durability settings to keep your database (and data) available when problems occur." >}}{{< /image >}}


| Setting name             | Description                                                                                                                                                                |
|:-------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **High availability**    | Replicates your data across multiple nodes, as allowed by your subscription plan                                                                                           |
| **Data persistence**     | Defines whether (and how) data is saved to disk; [available options]({{< relref "/rc/databases/configuration/data-persistence.md" >}}) depend on your plan type            |
| **Data eviction policy** | Configures which [policy]({{< relref "/rc/databases/configuration/data-eviction-policies.md" >}}) is applied when your database reaches its memory limit              |
| **Remote backup**        | When enabled, identifies a location and interval for [data backups]({{< relref "/rc/databases/back-up-data" >}}) |
| **Active-Passive Redis** | When enabled, identifies a path to the linked database. See [Migrate data]({{<relref "/rc/databases/migrate-databases">}}) for more information.           |

### Tags section

The **Tags** section lets you add [tags]({{< relref "/rc/databases/tag-database" >}}) to the database.

{{<image filename="images/rc/database-new-tags.png" alt="Use the Tag settings to add tags to the database." >}}{{< /image >}}

{{< embed-md "rc-tags-tag-module.md" >}}

### Security section

The **Security** section helps you control access to your database.

{{<image filename="images/rc/database-new-flexible-security.png" alt="Use the Security settings to control access to your database." >}}{{< /image >}}


| Setting name                       | Description                                                                                                                                                                           |
|:-----------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Default user**                   | When enabled, permits access using a simple password                                                                                                                                  |
| **Redis password**                 | Password assigned to the database when created                                                                                                                                        |  
| **CIDR allow list**                | [Allow list]({{< relref "/rc/security/cidr-whitelist.md" >}}) of IP addresses/security groups permitted to access the database |
| **Transport layer security (TLS)** | Enables [transport layer security]({{< relref "/rc/security/database-security/tls-ssl.md" >}}) (TLS) encryption for database access          |


### Alerts section

The **Alerts** section defines notification emails sent to your account and the conditions that trigger them.

{{<image filename="images/rc/database-new-flexible-alerts.png" alt="The Alerts section defines the notification emails and their triggering conditions." >}}{{< /image >}}

The available alerts vary according to the subscription type.

|Setting name| Description                                                                                                                                              |
|:-----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Dataset size has reached** | When enabled, sends an an email when the database reaches the defined memory limit                                 |
| **Latency is higher than** | When enabled, sends an an email when the latency exceeds the defined limit                                  |
| **Replica Of - database unable to sync with source** | When enabled, sends email when the replica database cannot sync with the primary (source) database                      |
| **Replica Of - sync lag is higher than** | When enabled, sends email when the sync lag exceeds the defined threshold                                              |
| **Throughput is higher than** | When enabled, sends an email when the operations per second exceed the defined threshold                   |
| **Throughput is lower than** | When enabled, sends an email when the operations per second falls below the defined threshold             |

## Use case settings

The default settings for each use case depend on the subscription type you chose. You can change them anytime during database creation.

### Essentials

| **Type** | High Availability | Data Persistence | Size | Eviction Policy |
|---|---|---|---|---|
| **Cache** | None | None | 30 MB - 12 GB | `volatile-lru` |
| **Database** | Multi-zone | Append-only file every 1 sec | 250 MB - 12 GB | None |
| **Vector Search** | Multi-zone | Append-only file every 1 sec | 250 MB - 12 GB | None |
| **Custom** | Single-zone | Append-only file every 1 sec | 250 MB - 12 GB | None |

### Pro

| **Type** | High Availability | Data Persistence | Capabilities | Eviction Policy |
|---|---|---|---|---|
| **Cache** | Single-zone | None | None | `volatile-lru` |
| **Database** | Multi-zone | Append-only file every 1 sec | Search & query, JSON, Probabilistic, Time Series | None |
| **Vector Search** | Multi-zone | Append-only file every 1 sec | Search & query, JSON | None |
| **Custom** | Single-zone | Append-only file every 1 sec | None | None |

## Billing Unit types

The Redis Billing Unit types associated with your Pro subscription depend on your database memory size and throughput requirements.  

| Shard type | Capacity (Memory/Throughput) |
|:------------|:----------|
| Micro | 1GB / 1K ops/sec |
| High-throughput | 2.5GB / 25K ops/sec |
| Small | 12.5GB / 12.5K ops/sec |
| Large | 25GB  / 25K ops/sec |
| Very large<sup>[1](#table-note-1)</sup> | 50GB / 5K ops/sec |
| XLarge<sup>[2](#table-note-2)</sup> | 50GB / 10K ops/sec |

1. <a name="table-note-1" style="display: block; height: 80px; margin-top: -80px;"></a>Used for databases with Auto Tiering before Redis 7.2.

2. <a name="table-note-2" style="display: block; height: 80px; margin-top: -80px;"></a>Used for hosted databases with Auto Tiering for Redis 7.2 and later.

Prices vary according to the cloud provider and region.  Minimum prices apply.  To learn more, see [Cloud pricing](https://redis.com/redis-enterprise-cloud/pricing/).


