---
Title: Customizing a Subscription
description:
weight: 30
alwaysopen: false
categories: ["RC"]
---
When you [create a Redis Cloud subscription]({{< relref "/rc/administration/setup/create-subscription.md" >}}),
you can select **Build a Plan** to customize the subscription.

## Customizing a Subscription

To customize a subscription you must:

1. Setup - Configure the VPC:
    1. General - Configure the general settings of the new subscription:
        1. Subscription name
        1. Redis on RAM or [Redis on Flash (RoF)]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}})
    1. Cloud Details - Configure the cloud that you want the subscription on:
        1. The cloud provider: Amazon AWS, Microsoft Azure, Google Cloud Platform
        1. The cloud region
        1. 1. If you want to host your subscription on multiple availability zones (multi-AZ) for high availability, enable **Multi-AZ**.
            We recommend that you use a cloud region that has at least 3 availability zones.
    1. Networking - Select the VPC and IP address range for the subscription:
        1. If you want to deploy your subscription for an existing VPC, select **In existing VPC** and enter the **VPC ID**.
        1. Enter the IP range for the subscription in **Deployment CIDR**.
    1. Advanced Options - Set an availability zone preference and persistent storage encryption.
        1. If you know what availability zones you want the subscription to be in, select **Select zones** and the specific availability zones.
        1. If you want to attach encrypted EBS volumes to your instances so that your persistent data is encrypted, set **Persistent Storage Encryption** to **Yes**.
    1. Click **Next**.
1. Sizing - List the database sizes and quantities for the subscription.
    For each database size:
    1. Define the database:
        1. Enter the name of the database.
        1. Select either **Redis** or **Memcached** database.
        1. The estimated **Memory Limit** of your database.
            The minimum value is 0.1GB.
        1. For an RoF subscription, enter the average item size in bytes.
        1. [Replication]({{< relref "/rc/concepts/clustering.md" >}}) is enabled by default. To disable it, set Replication to **No**.
        1. [Data Persistence]({{< relref "/rc/concepts/data-persistence.md" >}}) is disabled by default. To enable it, select a data persistence level.
        1. [OSS Cluster API]({{< relref "/rs/concepts/data-access/oss-cluster-api.md" >}}) is disabled by default. To enable it, select **Yes**.
    1. Set the throughput limit as either:
        - **Ops/sec** - Set the maximum operations per second.
        - **Number of shards** - Set the maximum number of shards.
    1. Select the Redis Module for the database.
        For **RediSearch**, enter the estimated number of documents to index.
    1. Click **Save**.
    1. Set the quantity of each database size.
    1. Click **Next**.
    The system calculates the optimized cloud infrastructure based on your subscription settings.
1. Review and Create - Review all of the subscription settings.
    - Click ![Add](/images/rs/icon_add.png#no-click "Add") to change the Credit Card payment information.
1. Click **Continue**.

The subscription and database are created and a $100 credit is assigned to the new subscription for a free trial.

To see the new databases:

1. Go to **Databases**.
1. Click on your subscription in the list of subscriptions.

When the databases are created, you can see the database settings for each of them, including:

- Endpoint - The address you use to connect to the database
- Redis Password - The password you must use in your application connections to authenticate with the database

{{< embed-md "create-subscription-next-steps.md"  >}}
