---
Title: High availability and replication
linkTitle: High availability
description: Describes database replication and high availability as it affects Redis Enterprise Cloud.   
weight: 90
alwaysopen: false
categories: ["RC"]
aliases: /rc/databases/high-availability/
         /rc/databases/high-availability.md
---

Database replication helps ensure high availability. 

When replication is enabled, database data is stored in two locations: a _primary_ (also known as a _master_) and a _replica_ are automatically synchronized as data changes.  

Should anything happen to the primary copy, such as a network communication spike or hardware failure, the replica becomes the new primary and customer connectivity continues as normal.  This automatic failover provides greater fault tolerance; it helps prevent data loss in the event of hardware, communication, or other network failures. 

Redis Enterprise Cloud supports three levels of replication:

- _No replication_ means that you will have a single copy of your database.

- _Single-zone replication_ means that your database will have a primary and a replica located in the same cloud region. If anything happens to the primary, the replica takes over and becomes the new primary.

- _Multi-zone replication_ means that the primary and its replicas are stored in different regions. This means that your database can remain online even if an entire region becomes unavailable.

Your replication options depend on your subscription plan:

- _Free_ plans do not support replication.
- _Fixed_ plans let you choose between single-zone replication and no replication.  
- _Flexible_ plans enable single-zone replication by default and permit upgrading to multi-zone replication. (Support varies between cloud providers and their regions.) 

To learn more about Redis Enterprise Cloud subscriptions, see [Manage subscriptions]({{<relref "/rc/subscriptions/_index.md">}}).

To learn more about high availability and replication, see:
- [Highly Available Redis](https://redislabs.com/redis-enterprise/technology/highly-available-redis/)
- [Database replication]({{<relref "/rs/concepts/high-availability/replication.md">}})
