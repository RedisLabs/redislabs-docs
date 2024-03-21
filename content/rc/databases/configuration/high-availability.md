---
Title: High availability and replication
linkTitle: High availability
description: Describes database replication and high availability as it affects Redis Cloud.   
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rc/databases/high-availability/
         /rc/databases/high-availability.md
         /rc/databases/configuration/high-availability/
         /rc/databases/configuration/high-availability.md
---

Database replication helps ensure high availability. 

When replication is enabled, your dataset is duplicated to create a replica that is synchronized with the primary dataset.  

Replication allows for automatic failover and greater fault tolerance.  It can prevent data loss in the event of a hardware or zone failure. 

## Options and plan support

Redis Cloud supports three levels of replication:

- _No replication_ means that you will have a single copy of your database.

- _Single-zone replication_ means that your database will have a primary and a replica located in the same cloud zone. If anything happens to the primary, the replica takes over and becomes the new primary.

- _Multi-zone replication_ means that the primary and its replicas are stored in different zones. This means that your database can remain online even if an entire zone becomes unavailable.

Your replication options depend on your [subscription plan]({{<relref "/rc/subscriptions/_index.md">}}):

- Free Redis Cloud Essentials plans support No replication and single-zone replication.
- Paid Redis Cloud Essentials plans and Redis Cloud Pro plans let you choose between multi-zone or single-zone replication when creating a subscription. You can also turn off replication.

After database creation, you can still enable or turn off replication.  However, [zone settings]({{<relref "/rc/databases/configuration/high-availability#zone-setting-maintenance">}}) are only configurable during database creation.  

## Performance impact 

Replication can affect performance as traffic increases to synchronize all copies. 

## Dataset size

For both Redis Cloud Essentials and Redis Cloud Pro, replication doubles the dataset size you need for your database. 

For Redis Cloud Essentials, the size of the plan you choose includes replication. Therefore, if you choose replication, the dataset size you can use is half of the stated plan size. For example, if you choose a 1GB plan, Redis allocates 512 GB for the memory limit, and the other 512 MB for Replication.

For Redis Cloud Pro, you also need to double the amount of memory needed if you choose replication.

## Zone setting maintenance

Zone settings can only be defined when a subscription is created.  You cannot change these settings once the subscription becomes active.

This means you can't convert a multi-zone subscription to a single zone (or vice-versa).  

To use different zone settings, create a new subscription with the preferred settings and then [migrate data]({{<relref "/rc/databases/migrate-databases.md">}}) from the original subscription.

## Availability zones

You can reduce network transfer costs and network latency by ensuring your Redis Cloud cluster and your application are located in the same availability zone. 

To specify the availability zone for your cluster, select *Manual Selection* under **Allowed Availability Zones**. 

For Google Cloud clusters and [self-managed AWS cloud accounts]({{< relref "/rc/cloud-integrations/aws-cloud-accounts/" >}}), select an availability zone from the **Zone name** list.

{{<image filename="images/rc/availability-zones-no-multi-az.png" width="95%" alt="Select one availability zone when Multi-AZ is turned off." >}}{{< /image >}}

For all other AWS clusters, select an availability zone ID from the **Zone IDs** list. For more information on how to find an availability zone ID, see the [AWS docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones).

{{<image filename="images/rc/availability-zones-aws-hosted-no-multi-az.png" width="80%" alt="For hosted AWS clusters, select availability zone IDs from the Zone IDs list." >}}{{< /image >}}

If **Multi-AZ** is enabled, you must select three availability zones from the list.

{{<image filename="images/rc/availability-zones-multi-az.png" width="80%" alt="Select Manual selection to select three availability zones when Multi-AZ is enabled." >}}{{< /image >}}

For more information on availability zones, see the [Google Cloud docs](https://cloud.google.com/compute/docs/regions-zones/#available) or the [AWS docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones).

## More info

To learn more about high availability and replication, see:
- [Highly Available Redis](https://redislabs.com/redis-enterprise/technology/highly-available-redis/)
- [Database replication]({{<relref "/rs/databases/durability-ha/replication.md">}})
