---
Title: Creating a Database
description: 
weight: 50
alwaysopen: false
categories: ["RV"]
---
Once you have a subscription, you can easily create a database in Redis Cloud Pro by following these steps:

1. In the Redis Cloud Pro menu, click **Databases**.
1. In the subscription where you want to add the database, click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Configure the database:
    1. Enter a **Database Name** that is up to 40 characters long.
    1. Protocol - Select whether the database uses **Redis** or **Memcached**.
    1. Enter a **Memory Limit**. Please take in mind that replication is
        on.
    1. If your database uses [Redis on
        Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}),
        enter the average item size(in bytes). This helps us optimaize your database.
    1. In **Throughput by**, select the definition of thoughput as:
    1. Ops/sec - Enter the required **Max Throughput** between 1000 and 10000000.
    1. Shards - Enter the number of **Shards** you require for the database.
    1. **Replication** is enabled by default so that each shard has a slave shard.
        If you do not require slave shards, for example in a caching database,
        disable replication.
    1. In **Data Persistence**, select when the data is saved to [persistent storage]
        ({{< relref "/rv/concepts/data-persistence.md" >}}) :
        - None - Data is not persisted to disk at all.
        - Append Only File (AoF) one second - Data is fsynced to disk every second.
        - Snapshot every 1 hour - A snapshot of the database is created every hour.
        - Snapshot every 6 hours - A snapshot of the database is created every 6 hours.
        - Snapshot every 12 hours - A snapshot of the database is created every 12 hours.
    1. By default, **OSS Cluster API** is disabled. You can:
        - Enable [OSS Cluster API]({{< relref "/rs/concepts/data-access/oss-cluster-api.md" >}})
            to expose the cluster topology to your application.
        - Select **Use external endpoint** to let clients connect to the OSS cluster
            API throught the external endpoint.
    1. By default, **Replica Of** is disabled. You can enable [Replica Of]
        ({{< relref "/rs/administering/intercluster-replication/replica-of.md" >}})
        and select the endpoint of a database to hold a copy of the data.

        {{% note %}}You must configure [VPC Peering]
        ({{< relref "/rv/administration/setup_and_editing/view-edit-subscription.md#vpc-peering" >}})
        between the VPC that this database is on and the VPC that the destination
        database is on.{{% /note %}}

    1. In **Access Control & Security**, you can:
        - Set the **Redis Password** for the database.
            We recommend that you use a complex password and not leave the password blank.
        - Specify the **Source IP/Subnet** addresses that your database receives
            traffic from, for example your application server.
        - Enable **SSL Client Authentication**, and either:
            - **Generate Client Certificate** and configure your client to use
                the generated certificate.
            - Paste the certificate for your client.
            For more information, see [Securing Redis Client Connections]
            ({{< relref "/rs/administering/security/client-connections.md" >}})
    1. Choose a **Data Eviction Policy** or accept the default. For more information,
        see [Data Eviction Policies]({{< relref "/rv/concepts/data-eviction-policies.md" >}}).
    1. Enable **Periodic Backups** and specify the [database backup]
        ({{< relref "/rv/administration/configuration/backups.md" >}}) location.
    1. Choose a **Module** to use with the database. If you
        select 'RediSearch', enter the estimated number of documents
        you want to index. If you select 'RedisGraph', calculate the
        required resources with the [sizing calculator](https://redislabs.com/redis-enterprise/redis-modules/redis-enterprise-modules/redisgraph/redisgraph-calculator/).
    1. In **Alert Settings**, select the alerts that you want sent to you and
        your team when the specified threshold is passed.
1. Click **Activate**.

After you click **Activate**, Redis Cloud Pro:

- Calculates the number of shards needed for this database.
- Calculate if is enough space to fit the database in the current infrastructure
    or if you must increase the cloud resources.
- Checks that you have enough unused shards in your subscription.

If a new infrastructure needs to be deployed, or more shards need to be
purchased, Redis Cloud Pro shows you the additional instances/shards that you need for this
database and the cost of the additional resources. You can review this information
and approve the additional resources. After you approve, Redis Cloud Pro activates the resources.

When activation is completed, creates the database. During this process you can see:

- An orange spinning icon on the top right to turn to a green checkmark
- The **Endpoint** of the new database

Here is a video tutorial that shows this process:

{{< youtube Z8KgtMsyNx0 >}}
