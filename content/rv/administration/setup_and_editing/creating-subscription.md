---
Title: Creating a Subscription
description: 
weight: 30
alwaysopen: false
categories: ["RV"]
---
A Redis Enterprise VPC (RV) subscription consists of a selected cloud
provider (and respective region, e.g. "AWS - US-West-2"), architectural
model, memory limit and feature set. You can have multiple subscriptions
in different providers and regions, all easily managed from a single
console.

Prerequisites:

- AWS Account - RV is deployed into your AWS environment under a
    special account you create specifically for it.
- Cloud Account - RV relies on a user in AWS' Identity and Account
    Management (IAM) with specific privileges in order to create,
    maintain, and manage your RV cluster and databases. See "[Creating
    an AWS user for Redis Enterprise
    VPC]({{< relref "/rv/how-to/creating-aws-user-redis-enterprise-vpc.md" >}})"
    for help creating this user and the necessary roles, policies, etc.

## Create a New Subscription

Creating a subscription is a four-step process:

1. Setup - Select the general settings and input the required
    credentials for the cloud user account.
2. Sizing - Describe the specification of the databases you want to
    provision. After this step, RV will calculate the optimal
    configuration and required infrastructure.
3. Review and Create - You will be presented with the required
    infrastructure and the subscription price. Enter your payment method
    and you are pretty much done.
4. Provisioning - Automatically set up the relevant infrastructure and
    provision the databases.

### Setup

For a new subscription, you will need to provide the following:

1. A subscription name
1. Your cloud provider (currently only AWS is supported; other cloud
    providers will be added in the future)
1. The cloud region (e.g. "us-west-2") you want your databases to be
    created in. This should be in the same region as the applications
    that will be connecting as you will be using AWS' [VPC
    Peering](https://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/Welcome.html).
1. Multi-AZ - Select whether or not the cluster should span
    Availability Zones for better high availability. To work optimally,
    make sure the selected region contains at least three availability
    zones.
1. Select whether you want the subscription to support databases with
    the ability to span RAM only or [RAM + Flash
    Memory]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}).
1. Select an existing or [Create a new Cloud
    Account]({{< relref "/rv/administration/setup_and_editing/creating-cloud-account.md" >}})
    for RV to use. Hide this item for Unification
1. Select your subscription networking options: Hide this item for Unification
   - **New VPC** - this will create a new VPC and provision your
        subscription in it. Please provide the required Deployment CIDR
        - This is an IPv4 subnet, in[CIDR
        notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)[,
        that you would like RV to use. The subnet should be /24 in size.
        Later on, you will have to create a VPC peering link to your
        application, therefore, please make sure that the CIDR you
        provide does not conflict with your application VPC
        CIDR.
   - **Existing VPC** - this will provision your subscription in an
        already existing VPC. With this option, you can provision your
        subscription in the VPC as your application and in that way save
        on the cost and latency that comes with VPC peering.
        Please provide the required
        Deployment CIDR and the VPC ID in which the subscription should
        be deployed.
1. Advanced Options
    1. You can select the exact Availability Zone(s) in which your
        subscription will be deployed. Select one for single AZ or three
        for multi-AZ.
    1. You can enable data at rest encryption. This will attach
        encrypted EBS volumes to your instances.

Once you have made your selections, click **Continue** to finalize your
subscription.  Hide the following sentence for Unification: RV will authenticate the credentials with AWS and proceed
to the next step.

### Sizing

Now you will have to define the databases you want to provision. Each
row in the table represents a group of databases that share the same
specifications.

For each row, select the following:

1. Name - Give the database a name
1. Protocol - Select the relevant database type, either Redis or
    Memcached
1. The estimated **Memory Limit** of your database. The minimum value
    is 0.1GB.
1. If you selected to have a Redis on Flash subscription,
    provide your data average item size if you know it.
1. Replication - Enables instant failover by keeping a standby,
    in-memory slave replica (note: by checking this option, your dataset
    will consume twice the amount of memory)
1. Data persistence - Select the relevant data persistence policy for
    your database.
1. Throughput - You can define your estimated **total throughput** you
    expect from your database by either specifying the required ops/sec
    or number of shards needed.
1. Data persistence - Select the relevant data persistence policy for
    your database.
1. Modules - You can select which Redis Module you want to load to
    your database. In case you select 'RediSearch' please provide the
    estimated number of documents you are going to index.
1. Enter the number of databases with these settings that you would
    like to provision.

Once complete, save the settings by clicking the **Add** button. Add
more rows by clicking the **+** button.

Once done, click the **Continue** button. The system may take a moment
to calculate the optimized cloud infrastructure based on your inputs.

### Review and Create

Once planning is complete, please review the subscription and database
information presented. Then select an existing payment method or click
on the **+** button to add a new payment method or select our 14-days
unlimited free trial option.

### Provisioning

Select the "Continue" button to create the subscription and deploy the
database(s). The subscription will show a "Pending" status and take
approximately ten to fifteen minutes to create. You will receive an
email once your databases are ready to use.

Once provisioning is complete, Hide the following sentence for Unification (in curly beackets): {if it was deployed in a new VPC,} please
set up a peer between your **application VPC** and **RV VPC**. To find
out what your RV VPC is, either go to **View subscription** Hide the following sentence for Unification (in curly beackets): {or check the
**AWS console**}. To better understand how to set up VPC peering see [View and Edit a Subscription]
({{< relref "/rv/administration/setup_and_editing/view-edit-subscription.md" >}}).

Once the peering was established please define the relevant routing
groups on your application account and RV account.

For more information and pricing, please go
[here](https://redislabs.com/pricing/redis-cloud-private/).

If you'd rather watch an overview of Redis Cloud VPC, watch the below
video:

{{< youtube_start y3tvS2kCl5I 76 >}}
