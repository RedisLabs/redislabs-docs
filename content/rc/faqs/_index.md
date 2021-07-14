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

Redis Labs has enhanced open source Redis with a technology layer that encapsulates open source Redis, while fully supporting all its commands, data structures and modules. 

It adds exceptional flexibility, stable high performance and unmatched resilience, as well as multiple deployment choices (public and private clouds, on-premises, hybrid, RAM-Flash combination), topology (active-active, active-passive, active-replica) and support for very large dataset sizes. 

This enhanced and exponentially more powerful database platform is Redis Enterprise.  

To learn more, see [Redis Enterprise](https://redislabs.com/why-redis/redis-enterprise/) on our main site.

## Are you fully compatible with open source Redis?

Every effort is made to adhere, where possible, to the specifications of open source Redis (also known as _core Redis_).  However, some features are not applicable in the context of our service, including (but not limited to):

- Shared databases aren’t supported in our service given their potential negative impact on performance. We recommend using [dedicated databases instead](https://redislabs.com/blog/benchmark-shared-vs-dedicated-redis-instances/). 

    Therefore, the following Redis commands are blocked and show an error when used:

    - [MOVE](http://redis.io/commands/move)
    - [SELECT](http://redis.io/commands/select)
- Data persistence and backups are managed from the service’s web interface, so the following commands are blocked:
    - [BGREWRITEAOF](http://redis.io/commands/BGREWRITEAOF)
    - [BGSAVE](http://redis.io/commands/bgsave)
    - [LASTSAVE](http://redis.io/commands/LASTSAVE)
    - [SAVE](http://redis.io/commands/SAVE)

- Since replication is managed automatically by the service and since it could present a security risk, the following commands are blocked:
    - [MIGRATE](http://redis.io/commands/MIGRATE)
    - [REPLICAOF](http://redis.io/commands/REPLICAOF)
    - [SLAVEOF](http://redis.io/commands/SLAVEOF)
    - [SYNC](http://redis.io/commands/SYNC)/[PSYNC](http://redis.io/commands/PSYNC)

- Redis Labs clustering technology is different than the open source Redis Cluster and supports clustering in a seamless manner that works with all standard Redis clients. As a result, [all Cluster related commands](http://redis.io/commands#cluster) are blocked and show an error when used.

- Redis Labs clustering technology allows [multiple active proxies]({{<relref "rs/administering/designing-production/networking/multiple-active-proxy.md">}}). As a result, the CLIENT ID command cannot guarantee incremental IDs between clients who connect to different nodes under multi proxy policies.

- Commands that aren’t relevant for a hosted Redis service are blocked:
    - [CONFIG RESETSTAT](http://redis.io/commands/CONFIG-RESETSTAT)
    - [DEBUG OBJECT](http://redis.io/commands/DEBUG-OBJECT)/[SEGFAULT](http://redis.io/commands/DEBUG-SEGFAULT)
    - [OBJECT](http://redis.io/commands/OBJECT)
    - [SHUTDOWN](http://redis.io/commands/SHUTDOWN)
    - [CLIENT PAUSE](http://redis.io/commands/CLIENT-PAUSE)
    - [COMMAND INFO](http://redis.io/commands/COMMAND-INFO)
    - [COMMAND COUNT](http://redis.io/commands/COMMAND-COUNT)
    - [COMMAND GETKEYS](http://redis.io/commands/COMMAND-GETKEYS)
    - [LATENCY LATEST](http://redis.io/commands/LATENCY-LATEST)
    - [LATENCY HISTORY](http://redis.io/commands/LATENCY-HISTORY)
    - [LATENCY RESET](http://redis.io/commands/LATENCY-RESET)
    - [LATENCY GRAPH](http://redis.io/commands/LATENCY-GRAPH)
    - [LATENCY DOCTOR](http://redis.io/commands/LATENCY-DOCTOR)
    - [MEMORY STATS](https://redis.io/commands/memory-stats)
    - [MEMORY DOCTOR](https://redis.io/commands/memory-doctor)
    - [MEMORY MALLOC-STATS](https://redis.io/commands/memory-malloc-stats)
    - [MEMORY PURGE](https://redis.io/commands/memory-purge)
    - [MODULE LOAD](https://redis.io/commands/module-load)
    - [MODULE UNLOAD](https://redis.io/commands/module-unload)
    - [MODULE LIST](https://redis.io/commands/module-list)

- Additionally, only a subset of Redis’ configuration settings (via CONFIG GET/SET) is applicable to Redis Cloud. Attempts to get or set a configuration parameter that isn’t included in the following list show an error when used:
    - hash-max-ziplist-entries
    - hash-max-ziplist-value
    - list-max-ziplist-entries
    - list-max-ziplist-value
    - notify-keyspace-events
    - set-max-intset-entries
    - slowlog-log-slower-than (value must be larger than 1000)
    - slowlog-max-len (value must be between 128 and 1024)
    - zset-max-ziplist-entries
    - zset-max-ziplist-value

- Open source Redis supports key names up to 512MB.  Redis Enterprise Software and Redis Enterprise Cloud each limit key names to 64KB.  Key values can reach up to 512MB in all three services.

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

Our proxy-based architecture and Dynamic Clustering technology were built from the ground up to provide scalable Redis,
and to support its commands and data types at any dataset size.
All you need to do is select a plan that fits your dataset size.
If your dataset is expected to grow or occasionally varies in size, we recommend using a Flexible plan, which charges according to the number of shards or the throughput.

## Why should I map availability zones (AWS)

While different AWS accounts may refer to the same AWS availability zone resource names, the underlying resources can be deployed to different physical infrastructure.  

When different accounts refer to resources located on different physical infrastructure, communication latency  occurs as resources locations are resolved.

The mapping process lets us unambiguously identify your availability zone, so we can serve your Redis data from the same physical zone, minimizing inter-zone latencies.

## Are dataset setup or endpoints affected by subscription changes?

If your subscription change is a simple upgrade or downgrading, it won't impact your databases or our configuration.

For example, you can:

- Upgrade a free account to a paid Fixed account
- Reduce the maximum database size of a paid Fixed account

Switching to a new subscription plan results in a new deployment.  In such case, you'll need to migrate resources from the original plan to the new one.

Subscription downgrades fail if the new plan cannot support the data.

## What is the difference between Flexible and Fixed plans?

Briefly, Redis Enterprise Cloud Flexible and Fixed plans are fully-managed Redis services operated by Redis Labs.

Flexible plans run in dedicated VPCs and offer:

- [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) - Recommended for datasets larger than 500GB
- [Active-Active]({{< relref "/rs/administering/designing-production/active-active.md" >}}) and [Active-Passive]({{< relref "/rs/administering/designing-production/active-passive.md" >}}) Geo Distribution
- Integration with [modules]({{< relref "/modules/_index.md" >}})
- Encryption of [persistence data]({{< relref "/rs/concepts/data-access/persistence.md" >}})
- Redis Enterprise Cloud [REST API]({{< relref "/rc/api/_index.md" >}})

Running Redis in a fully-automated manner with 24/7 expert support over Redis Enterprise Cloud is more cost effective than managing your own Redis instances on the cloud.

## Why should I run Redis Cloud on Flash?

Redis on Flash (RoF) enables you to run Redis on high IOPS SSD instances with high throughput and the same sub-millisecond latencies as RAM-based Redis.

The economic benefit is dramatic:

- The cost of cloud instances required to support your database can be slashed by up to 70%, while maintaining the same blazing fast performance.
- As your data grows, and your processing needs increase, you can achieve cost-effective high speed operational and analytic processing with the versatility of Redis and the cost efficiency of Flash memory.
- If your dataset is larger than 500GB, running Redis in a fully-automated manner with 24/7 expert support over Redis Enterprise Cloud is lower in cost than managing your own Redis instances on the cloud.



