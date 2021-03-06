
---
Title: High availability and replication
linkTitle: High availability
description: Describes database replication and high availability as it affects Redis Enterprise Cloud.   
weight: 90
alwaysopen: false
categories: ["RC"]
aliases: 
---

Database replication helps ensure high availability. When replication is enabled, your dataset is duplicated to create a replica, which stays in sync with the primary dataset. Replication allows for automatic failover and greater fault tolerance. This can prevent data loss in the event of a hardware or zone failure. 

Redis Enterprise Cloud supports three levels of replication:

- _No replication_ means that you will have a single copy of your database.
- _Single-zone replication_ means that your database will have a primary and a replica located in the same zone of a cloud region. 
- _Multi-zone replication_ means that the primary and its replicas are stored in different zones of a cloud region. This means that your database can remain online even if an entire zone becomes unavailable.

Your replication options depend on which subscription plan you're using:

- _Free_ plans do not support replication.
- _Fixed_ plans let you choose between no replication, single-zone replication, or multi-zone replication when creating a subscription.  

Zone settings cannot be changed once a subscription has been created.  This means you can't convert a multi-zone subscription to a single zone (or vice-versa).

If this becomes necessary, create a new subscription with the preferred settings and then migrate data from the original subscription.```
- _Flexible_ plans allow multi-zone or single-zone subscriptions by default.  Each type allows replication to be disabled entirely.  

   Once the subscription is created, though, you cannot switch zone settings. 

To learn more about Redis Enterprise Cloud subscriptions, see [Manage subscriptions]({{<relref "/rc/subscriptions/_index.md">}}).

To learn more about high availability and replication, see:
- [Highly Available Redis](https://redislabs.com/redis-enterprise/technology/highly-available-redis/)
- [Database replication]({{<relref "/rs/concepts/high-availability/replication.md">}})
