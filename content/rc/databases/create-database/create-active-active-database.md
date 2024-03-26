---
Title: Create an Active-Active database
linkTitle: Create Active-Active database
description: Shows how to create an Active-Active database
weight: 20
Title: Create an Active-Active database
linkTitle: Create Active-Active database
description: Shows how to create an Active-Active database
weight: 20
alwaysopen: false
categories: ["RC"]
aliases: /rc/subscriptions/create-active-active-subscription/
---

Active-Active databases store data across multiple regions and availability zones.  This improves scalability, performance, and availability, especially when compared to standalone databases. See [Active-Active Redis]({{<relref "rc/databases/configuration/active-active-redis">}}) for more information.

To deploy Active-Active databases in Redis Cloud, you need a Redis Cloud Pro plan that enables Active-Active Redis and defines the regions for each copy of your databases.

Overall, the process is similar to [creating a Pro database with a new subscription]({{<relref "/rc/databases/create-database/create-pro-database-new">}}).  However, there are some additional requirements listed below:

- Enable Active-Active Redis
- [Define the regions](#define-regions) for each database instance
- Define unique [CIDR addresses](#define-cidr-addresses) for each instance
- [Define throughput](#define-throughput) (read and write operations) for each region

Active-Active databases consist of multiple copies (also called _instances_) deployed to different regions throughout the world.

This reduces latency for local users and improves availability should a region fail.

Consistency between each instance is maintained in the background; that is, each copy eventually includes updates from every region.  As a result, [memory limit]({{<relref "/rc/databases/create-database#memory-limit">}}) and throughput increase.


## Define regions

When you create a new Pro database, the Active-Active Redis option appears to the right of the cloud providers.

{{<image filename="images/rc/create-flexible-sub-active-active-on.png" width="75%" alt="When you enable Active-Actve, you need to specify the regions for each database instance." >}}{{< /image >}}


When you enable Active-Active Redis, two regions are selected by default.  Select the drop-down arrow to display a list of provider regions that support Active-Active databases.

{{<image filename="images/rc/create-sub-active-active-regions.png" width="50%" alt="Use the Region drop-down to select the regions for your Active-Active database." >}}{{< /image >}}

Use the checkboxes in the list to select or remove regions.  The Search box lets you locate specific regions.

You can use a region's Remove button to remove it from the list.

{{<image filename="images/rc/icon-region-delete.png" width="30px" alt="Select the Delete button to remove a region from the list." >}}{{< /image >}}


## Define CIDR addresses

To properly route network traffic between each Active-Active database instance and your consumer VPCs, use care to specify unique CIDR address blocks when using VPC peering.  The block regions should _not_ overlap between the Redis server and your app consumer VPCs.

In addition, CIDR blocks should not overlap between cluster instances.  Every CIDR block should be unique.

Use the **VPC configuration** section of the **Advanced options** to define unique address blocks for each region.

{{<image filename="images/rc/create-sub-active-active-cidr.png" width="75%" alt="Each region needs a unique CIDR address block to communicate securely with other instances." >}}{{< /image >}}

When all **Deployment CIDR** regions display a green checkmark, you're ready to continue.  

{{<image filename="images/rc/icon-cidr-address-ok.png" width="30px" alt="Greem chackmarks indicate valid CIDR address values." >}}{{< /image >}}

Red exclamation marks indicate error conditions; the tooltip provides additional details.

{{<image filename="images/rc/icon-cidr-address-error.png" width="30px" alt="Red exclamation points indicate CIDR address problems." >}}{{< /image >}}

## Select capabilities

Active-Active databases support the [JSON]({{< relref "/stack/json" >}}) data type. 

{{<image filename="images/rc/active-active-json-detail.png" width="75%" alt="When you create an Active-Active database, you can select the JSON advanced capability." >}}{{< /image >}}

We select JSON for you when you create an Active-Active database. Select it again to remove it.

## Define throughput

Each Active-Active instance coordinates changes with every other instance, which increases memory use and throughput.

When you create an Active-Active database, you define the throughput for each instance.  

{{<image filename="images/rc/create-database-active-active.png" width="75%" alt="When you create an Active-Active database, you define throughput for each region." >}}{{< /image >}}

Read and write operations are factored into the total throughput.  Because each instance needs the ability to write to every other instance, write operations significantly affect the total, as shown in the following table:

| Number of regions | Read operations | Write operations | Total operations |
|:-----------------:|:---------------:|:----------------:|:----------------:|
| Two | 1,000 each | 1,000 each | 6,000<br/>(2,000 reads; 4,000 writes) |
| Two | 1,500 each | 1,000 each | 7,000<br/>(3,000 reads; 4,000 writes) |
| Two | 1,000 each | 1,500 each | 8,000<br/>(2,000 reads; 6,000 writes) |
| Three | 1,000 each | 1,000 each | 12,000<br/>(3,000 reads; 9,000 writes) |

The total operations per second:

- Combines the total read ops/sec for each region
- Applies the write ops/sec for each region across every region.

Throughput requirements grow dramatically as regions increase.  As a result, consider your requirements carefully.

## More info

- [Create a Pro database with a new subscription]({{<relref "/rc/databases/create-database/create-pro-database-new">}})
- [Active-Active Redis]({{<relref "rc/databases/configuration/active-active-redis">}})
- Database [memory limit]({{<relref "/rc/databases/create-database#memory-limit">}})
- Redis Cloud [subscription plans]({{<relref "/rc/subscriptions/">}})
- [Redis Cloud pricing](https://redis.com/redis-enterprise-cloud/pricing/)