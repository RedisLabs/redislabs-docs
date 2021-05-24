---
Title: Create a database
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

    {{<image filename="images/rc/button-subscription-add.png" alt="The Add subscriptions button appears when there are no other subscriptions." >}}{{< /image >}}

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
| **Active-Active Redis** | Checked when the subscription supports Active-Active databases (_coming soon; Flexible only_) |
| **Redis on Flash** | Checked when the subscription supports Redis on Flash (_Flexible only_) |
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

## Durability section

The **Durability** section helps you keep your database (and your data) available when problems occur.

{{<image filename="images/rc/database-create-durability-flexible.png" alt="Use the Durability settings to keep your database (and data) available when problems occur." >}}{{< /image >}}


|Setting name|Description|
|:-----------|:----------|
| **High availability** | Replicates your data across multiple nodes, as allowed by your subscription plan |
| **Data persistence** | Defines whether (and how) data is saved to disk; [available options]({{< relref "/rc/concepts/data-persistence.md" >}}) depend on your plan type |
| **Data eviction policy** | Defines what happens when your database reaches its [memory size limit]({{< relref "/rc/concepts/data-eviction-policies.md" >}}) |
|

## Security section

## Alerts section


*snip*


1. In the Redis Cloud menu, click **Databases**.
1. In the subscription where you want to add the database, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Configure the database:
    - **Name** - Enter a name for the database. (Up to 40 characters long)
    - **Protocol** - Select whether the database uses **Redis** or **Memcached**.
    - **Memory** - Enter a memory limit for the database. If replication is on, the database limit includes the memory of the slave shards.
    - **Redis on Flash** - If your database uses [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}),
        enter the average data structure size (in bytes). This helps us optimize your database.
    - **Throughput** - In **Throughput by**, select the definition of throughput as:
        - Ops/sec - Enter the required **Max Throughput** between 1000 and 10000000.
        - Shards - Enter the number of **Shards** you require for the database.
    - **Replication** - By default, each shard has a slave shard.
        If you do not require slave shards, disable replication.
    - **Data Persistence** - Select when and how the data is saved to [persistent storage]({{< relref "rc/concepts/data-persistence.md" >}}) :
        - None - Data is not persisted to disk at all.
        - Append Only File (AoF) one second - Data is fsynced to disk every second.
        - Snapshot every 1 hour - A snapshot of the database is created every hour.
        - Snapshot every 6 hours - A snapshot of the database is created every 6 hours.
        - Snapshot every 12 hours - A snapshot of the database is created every 12 hours.
    - **OSS Cluster API** - You can:
        - Enable [OSS Cluster API]({{< relref "/rs/concepts/data-access/oss-cluster-api.md" >}})
            to expose the cluster topology to your application.
        - Select **Use external endpoint** to let clients connect to the OSS cluster API throught the external endpoint.
    - **Replica Of** - You can enable [Replica Of]({{< relref "/rs/administering/designing-production/active-passive.md" >}})
        and select the endpoint of a database to hold a copy of the data.

        {{< note >}}
You must configure [VPC Peering]({{< relref "/rc/security/vpc-peering.md" >}})
between the VPC that this database is on and the VPC that the destination database is on.
        {{< /note >}}

    - [**Access Control & Security**]({{< relref "/rs/security/tls-ssl.md" >}}) - You can:
        - Enable the **Default User** for the database.
            We recommend that you use a complex password between 8 and 128 characters, and with at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character.
        - Specify the **Source IP/Subnet** addresses that your database receives
            traffic from, for example your application server.
        - Enable **SSL Client Authentication**, and either:
            - **Generate Client Certificate** and configure your client to use
                the generated certificate.
            - Paste the certificate for your client.
    - **Data Eviction Policy** - Select a policy for evicting data when the memory limit is reached.
    - **Periodic Backups** - Enable backups and specify the [database backup]({{< relref "/rc/databases/back-up-data.md" >}}) location.
    - **Modules** - Enable modules and select the module to use with the database.

        - For applications that require high-throughput, use a Redis Cloud Pro subscription.
        - For RedisGraph, use the [sizing calculator](https://redislabs.com/redis-enterprise/redis-graph/redisgraph-calculator/)
            to calculate the required resources.
        - For RediSearch on a Redis Cloud Pro subscription, enter the estimated number of documents you want to index.

    - **Alert Settings** - Select the alerts that you want sent to you and your team when the specified threshold is exceeded.
1. Click **Activate**.

After you click **Activate**, Redis Cloud:

- Calculates the number of shards needed for this database.
- Calculate if is enough space to fit the database in the current infrastructure
    or if you must increase the cloud resources.
- Checks that you have enough unused shards in your subscription.

If a new infrastructure needs to be deployed, or more shards need to be
purchased, Redis Cloud shows you the additional instances/shards that you need for this
database and the cost of the additional resources. You can review this information
and approve the additional resources. After you approve, Redis Cloud activates the resources.

When activation is completed, creates the database. During this process you can see:

- An orange spinning icon on the top right to turn to a green checkmark
- The **Endpoint** of the new database

<!-- Video out of date
Here is a video tutorial that shows this process: -->

<!-- {{< youtube Z8KgtMsyNx0 >}} -->
