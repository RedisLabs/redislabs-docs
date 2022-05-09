---
Title: Create an Active-Active subscription
linkTitle: Create Active-Active subscription
description: Shows what changes when you create an Active-Active subscription (Flexible or Annual)
weight: 31
alwaysopen: false
categories: ["RC"]
aliases: /rc/subscriptions/create-active-active-subscription/
---

To deploy Active-Active databases in Redis Enterprise Cloud, you need to create a Flexible or Annual subscription with Active-Active enabled.

Overall, the process is similar to [creating a traditional subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}}).  However, there are some differences; you need to:

- [Define the regions](#define-regions) for each database instance
- Define unique [CIDR addresses](#define-cidr-addresses) for each instance
- [Define throughput](#define-throughput) (read and write operations) for each region

Active-Active databases consist of multiple copies (also called _instances_) deployed to different regions throughout the world.

This reduces latency for local users and improves availability should a region fail.

Consistency between each instance is maintained in the background; that is, each copy eventually includes updates from every region.  As a result, [memory size]({{<relref "/rc/databases/create-database#memory-size">}}) and throughput increase.


## Define regions

When you create a new Flexible subscription, the Active-Active Redis option appears to the right of the cloud providers.

{{<image filename="images/rc/create-flexible-sub-active-active-on.png" width="75%" alt="When you enable Active-Actve, you need to specify the regions for each database instance." >}}{{< /image >}}


When you enable Active-Active Redis, the region control changes to a default showing two regions.  Select the drop-down arrow to display a list of provider regions that support Active-Active databases.

{{<image filename="images/rc/create-sub-active-active-regions.png" width="50%" alt="Use the Region drop-down to select the regions for your Active-Active database." >}}{{< /image >}}

Use the checkboxes in the list to select or remove regions.  The Search box lets you locate specific regions.

You can use a region's Remove button to remove it from the list.

{{<image filename="images/rc/icon-region-delete.png" width="30px" alt="Select the Delete button to remove a region from the list." >}}{{< /image >}}


## Define CIDR addresses

To allow proper routing of network traffic between each of the Active-Active database instances as well as to your consumer VPC should you choose to conect over VPC peering, you should specify unique CIDR address blocks. Make sure that the CIDR blocks dont overlap between the regions on the  for the Redis producer side nor with those of your application consumer VPCs.

Use the **VPC configuration** section of the **Advanced options** to define unique address blocks for each region.

{{<image filename="images/rc/create-sub-active-active-cidr.png" width="75%" alt="Each region needs a unique CIDR address block to communicate securely with other instances." >}}{{< /image >}}

When all **Deployment CIDR** regions display a green checkmark, you're ready to continue.  

{{<image filename="images/rc/icon-cidr-address-ok.png" width="30px" alt="Greem chackmarks indicate valid CIDR address values." >}}{{< /image >}}

Red exclamation marks indicate error conditions; the tool tip provides additional details.

{{<image filename="images/rc/icon-cidr-address-error.png" width="30px" alt="Red exclamation points indicate CIDR address problems." >}}{{< /image >}}


## Define throughput

Each Active-Active instance coordinates changes with every other instance, which increases memory use and throughput.

When create an Active-Active database, you define the throughput for each instance.  

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

- [Create a Flexible subscription]({{<relref "/rc/subscriptions/create-flexible-subscription">}})
- Database [memory size]({{<relref "/rc/databases/create-database#memory-size">}})
- Redis Enterprise Cloud [subscription plans]({{<relref "/rc/subscriptions/">}})
- [Redis Enterprise Cloud pricing](https://redis.com/redis-enterprise-cloud/pricing/)
