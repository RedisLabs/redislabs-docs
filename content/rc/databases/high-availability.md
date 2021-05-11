Title: High Availability
linkTitle: High availability
description: Describes database replication and high availability as it affects Redis Enterprise Cloud.   
weight: 90
alwaysopen: false
categories: ["RC"]
aliases: 

---

Database replication helps ensure high availability. When replication is enabled, your dataset is duplicated to create a replica, which stays in sync with the primary dataset. Replication allows for automatic failover and greater fault tolerance. This can prevent data loss in the event of a hardware, zone, or regional failure. 

Redis Enterprise Cloud supports three levels of replication:

- _No replication_ means that you will have a single copy of your database.
- _Single-zone replication_ means that your database will have a primary and a replica located in the same cloud region. If anything happens to the primary, the replica takes over and becomes the new primary.
- _Multi-zone replication_ means that the primary and its replicas are stored in different regions. This means that your database can remain online even if an entire region becomes unavailable.

Your replication options depend on which subscription plan you're using:

- _Free_ plans do not support replication.
- _Fixed_ plans allow you to choose between no replication or single-zone replication.
- _Flexible_ plans enable single-zone replication by default and allow you to upgrade to multi-zone replication. 

To learn more about Redis Enterprise Cloud subscriptions, see [Manage subscriptions]({{<relref "/rc/subscriptions/_index.md">}}).

To learn more about high availability and replication, see:
- [Highly Available Redis](https://redislabs.com/redis-enterprise/technology/highly-available-redis/)
- [Database replication]({{<relref "/rs/concepts/high-availability/replication.md">}})
