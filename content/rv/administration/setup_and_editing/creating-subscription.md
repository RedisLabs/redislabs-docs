---
Title: Creating a Subscription
description:
weight: 30
alwaysopen: false
categories: ["RC Pro"]
---
A Redis Cloud Pro subscription consists of a selected cloud
provider (and respective region, e.g. "AWS - US-West-2"), architectural
model, memory limit and feature set. You can have multiple subscriptions
in different providers and regions, all easily managed from a single
console.

## Create a New Subscription

Creating a subscription is a four-step process:

1. Setup - Configure the general settings of the new subscription.
2. Sizing - Describe the specification of the databases you want to
    provision. After this step, Redis Cloud Pro will calculate the optimal
    configuration and required infrastructure.
3. Review and Create - You will be presented with the required
    infrastructure and the subscription price. Enter your payment method
    and you are pretty much done.
4. Provisioning - Automatically set up the relevant infrastructure and
    provision the databases.

### Setup

For a new subscription, you will need to provide the following:

1. A subscription name.
1. Select whether you want the subscription to support databases with
    RAM only or [RAM + Flash Memory]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
1. The cloud region (e.g. "us-west-2") you want your databases to be
    created in. This should be in the same region as the applications
    that will be connecting as you will be using AWS' [VPC
    Peering](https://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/Welcome.html).
1. Multi-AZ - Select whether or not the cluster should span
    Availability Zones for better high availability. To work optimally,
    make sure the selected region contains at least three availability
    zones.
1. Advanced Options
    1. You can enter the required Deployment CIDR.
    The [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)
    an IPv4 subnet that you want Redis Cloud Pro to use for this subscription.
    For a standard deployment, you can specify 10.0.1.0/24. Make sure that the CIDR
    you provide does not conflict with your application VPC CIDR to avoid problems
    when you peer the VPC to your.
    1. You can enable Persistent Storage Encryption. This will attach
        encrypted EBS volumes to your instances.

After you select the options that you want, click **Next**.

### Sizing

Now you will have to define the databases you want to provision. Each
row in the table represents a group of databases that share the same
specifications.

For each row, select the following:

1. Name - Give the database a name.
1. Protocol - Select the relevant database type, either Redis or
    Memcached.
1. The estimated **Memory Limit** of your database. The minimum value
    is 0.1GB.
1. If you selected to have a Redis on Flash subscription,
    provide your data average item size if you know it.
1. Replication - Enables instant failover by keeping a standby,
    in-memory slave replica (note: by checking this option, your dataset
    will consume twice the amount of memory).
1. Data persistence - Select the relevant data persistence policy for
    your database.
1. Define if the database will support [OSS Cluster API] (/rs/concepts/data-access/oss-cluster-api/).
1. Throughput - You can define your estimated **total throughput** you
    expect from your database by either specifying the required ops/sec
    or number of shards needed.
1. Modules - You can select which Redis Module you want to load to
    your database. In case you select 'RediSearch' please provide the
    estimated number of documents you are going to index.
1. Click **Save** and enter the number of databases with these settings that you would
    like to provision.

Once complete, you can add more rows by clicking the **+** button.

Once done, click the **Next** button. The system may take a moment
to calculate the optimized cloud infrastructure based on your inputs.

### Review and Create

Once planning is complete, please review the subscription and database
information presented, which includes the expected infrastructure and shard prices. Then select an existing payment method or click on the **+** button to add a new payment method. A $100 credit will be assigned to the new subscription for a free trial.

### Provisioning

Select the "Continue" button to create the subscription and deploy the
database(s). The subscription will show a "Pending" status and take
approximately ten to fifteen minutes to create. You will receive an
email once your databases are ready to use.

Once provisioning is complete, please set up a peer between your **application VPC** and **Redis Cloud Pro VPC**. To better understand how to set up VPC peering see [View and Edit a Subscription]({{< relref "/rv/administration/setup_and_editing/view-edit-subscription.md" >}}).

Once the peering was established please define the relevant routing
groups on your application account and Redis Cloud Pro account.

For more information and pricing, please go
[here](https://redislabs.com/redis-enterprise/pro/pricing/).

<!-- If you'd rather watch an overview of Redis Cloud Pro, watch the below
video: -->

<!-- This video is out of date
{{< youtube_start y3tvS2kCl5I 76 >}} -->
