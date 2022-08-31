---
Title: High availability and replication
linkTitle: High availability
description: Describes database replication and high availability as it affects Redis Enterprise Cloud.   
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

Redis Enterprise Cloud supports three levels of replication:

- _No replication_ means that you will have a single copy of your database.

- _Single-zone replication_ means that your database will have a primary and a replica located in the same cloud zone. If anything happens to the primary, the replica takes over and becomes the new primary.

- _Multi-zone replication_ means that the primary and its replicas are stored in different zones. This means that your database can remain online even if an entire zone becomes unavailable.

Your replication options depend on your [subscription plan]({{<relref "/rc/subscriptions/">}}):

- _Free_ plans do not support replication.
- _Fixed_ plans let you choose between no replication, single-zone replication, or multi-zone replication when creating a subscription.  
- _Flexible_ and _Annual_ plans allow multi-zone or single-zone subscriptions by default.  You can also disable replication.

## Performance impact 

Replication can affect performance as traffic increases to synchronize all copies. 

Database storage costs also increase:

- For Fixed plans, single-zone and multi-zone replication effectively doubles storage costs

- For Flexible and Annual plans, replication requires additional shards and can affect subscription costs

## Zone setting maintenance

Zone settings can only be defined when a subscription is created.  You cannot change these settings once the subscription becomes active.

This means you can't convert a multi-zone subscription to a single zone (or vice-versa).  

To use different zone settings, create a new subscription with the preferred settings and then migrate data from the original subscription.

## More info

To learn more about high availability and replication, see:
- [Highly Available Redis](https://redislabs.com/redis-enterprise/technology/highly-available-redis/)
- [Database replication]({{<relref "/rs/databases/durability-ha/replication.md">}})
