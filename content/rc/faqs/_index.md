---
Title: FAQs
description:
weight: 90
alwaysopen: false
categories: ["RC"]
aliases: /rv/faqs/
---
Here are some frequently asked questions about Redis Enterprise Cloud.

## What is Redis Enterprise?

Redis Enterprise is a technology layer that encapsulates open source Redis while fully supporting its commands, data structures, and modules. 

This layer adds exceptional flexibility, stable high performance, and unmatched resilience, as well as multiple deployment choices (public and private clouds, on-premises, hybrid, RAM-Flash combination), topology (active-active, active-passive, active-replica), and support for very large dataset sizes. 

This enhanced and exponentially more powerful database platform is Redis Enterprise.  

To learn more, see [Redis Enterprise](https://redislabs.com/why-redis/redis-enterprise/) on our main site.

## Is Redis Cloud fully compatible with open source Redis?

Although Redis Cloud follows open source Redis specifications, it does not support certain commands. Instead of using these commands, Redis Cloud automatically handles features like replication and lets you [manage your database]({{<relref "/rc/databases">}}) from the [admin console](https://app.redislabs.com/) or [REST API]({{<relref "/rc/api">}}).

For more details, see:

- [Redis Enterprise compatibility with open source Redis]({{<relref "/rs/references/compatibility">}})

- [Command compatibility]({{<relref "/rs/references/compatibility/commands">}})

- [Configuration compatibility]({{<relref "/rs/references/compatibility/config-settings">}})

## How many databases can I create and manage?

With Redis Enterprise Cloud, the number of databases depends on the subscription plan:

- Free plans support a single database
- Fixed plans range from 4 databases to 64, depending on the total database size of the plan.
- Flexible and Annual plans allow unlimited databases.

For details, see [Manage subscriptions]({{< relref "/rc/subscriptions/" >}}) or [Redis Enterprise Cloud Pricing](https://redislabs.com/redis-enterprise-cloud/pricing/).

## How can I limit access to my resources?

Redis Enterprise Cloud features the following access control mechanisms:

- Password authentication
- Source IP/Subnet ACL
- Security Group ACL (on AWS cloud)
- Role-based access controls (RBAC)

If you use Redis Cloud on your own AWS infrastructure and deploy it on the same VPC as your application servers,
we use a special set of AWS security permissions to limit access to only the instances required for running the Redis Cloud clusters.

When deploying Redis Cloud on a different VPC from your application servers or under a different AWS account of yours, all the operational aspects of managing Redis Cloud are completely isolated from your application.

## Is my data safe and always available?

Absolutely! Redis Cloud offers a comprehensive suite of [high availability](https://redislabs.com/blog/high-availability-for-in-memory-cloud-datastores) provisions,
including in-memory replication (within the same data center or across data centers), persistent storage on EBS, and backups to S3 or any file server.

## Can I export my Redis data?

There is no lock-in with Redis Enterprise Cloud. With a click of a button, you can export your latest RDB backup file from your cloud storage, FTP, or HTTP server to any Redis server of your choice.

Free plans do not include this capability.

## Can my Redis database grow infinitely?

Our proxy-based architecture and Dynamic Clustering technology were built from the ground up to provide scalable Redis 
and to support its commands and data types at any dataset size.
All you need to do is select a plan that fits your dataset size.
If your dataset is expected to grow or occasionally varies in size, we recommend using a Flexible plan, which charges according to the number of shards or the throughput.

## Are dataset setup or endpoints affected by subscription changes?

If your subscription change is a simple upgrade or downgrading, it won't impact your databases or our configuration.

For example, you can:

- Upgrade a free account to a paid Fixed account
- Reduce the maximum database size of a paid Fixed account

Switching to a new subscription plan results in a new deployment.  In such case, you'll need to migrate resources from the original plan to the new one.

Subscription downgrades fail if the new plan cannot support the data.

## What is the difference between Flexible and Fixed plans?

Briefly, Redis Enterprise Cloud Flexible and Fixed plans are fully-managed Redis services operated by Redis.

Flexible plans run in dedicated VPCs and offer:

- [Redis on Flash]({{< relref "/rs/databases/redis-on-flash/" >}}) - Recommended for datasets larger than 500GB
- [Active-Active]({{< relref "/rs/databases/active-active/_index.md" >}}) and [Replica Of]({{< relref "/rs/databases/import-export/replica-of/" >}}) Geo Distribution
- Integration with [modules]({{< relref "/modules/_index.md" >}})
- Encryption of [persistence data]({{< relref "/rs/databases/configure/database-persistence.md" >}})
- Redis Enterprise Cloud [REST API]({{< relref "/rc/api/_index.md" >}})

Running Redis in a fully-automated manner with 24/7 expert support over Redis Enterprise Cloud is more cost effective than managing your own Redis instances on the cloud.

## Why should I run Redis Cloud on Flash?

Redis on Flash (RoF) enables you to run Redis on high IOPS SSD instances with high throughput and the same sub-millisecond latencies as RAM-based Redis.

The economic benefit is dramatic:

- The cost of cloud instances required to support your database can be slashed by up to 70%, while maintaining the same blazing fast performance.
- As your data grows, and your processing needs increase, you can achieve cost-effective high speed operational and analytic processing with the versatility of Redis and the cost efficiency of Flash memory.
- If your dataset is larger than 500GB, running Redis in a fully-automated manner with 24/7 expert support over Redis Enterprise Cloud is lower in cost than managing your own Redis instances on the cloud.



