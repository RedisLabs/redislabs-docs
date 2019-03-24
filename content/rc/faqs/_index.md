---
Title: FAQs
description: 
weight: 70
alwaysopen: false
categories: ["RC Essentials"]
---
Here are some frequently asked questions about Redis Cloud Essentials.

<!-- Also in RS and RV -->
{{%expand "What exactly is Redis Enterprise?" %}}
Redis Labs has enhanced open source Redis with a technology layer that encapsulates open source Redis, while fully supporting all its commands, data structures and modules. It adds exceptional flexibility, stable high performance and unmatched resilience, as well as multiple deployment choices (public and private clouds, on-premises, hybrid, RAM-Flash combination), topology (active-active, active-passive, active-replica) and support for very large dataset sizes. This enhanced and exponentially more powerful database platform is Redis Enterprise.

Learn more about [Redis Enterprise](https://redislabs.com/why-redis/redis-enterprise/).
{{% /expand%}}

<!-- Also in RS and RV -->
{{%expand "Are you fully compatible with open source Redis?" %}}
Yes we are. Not only are we are the home of Redis, but most of Redis’ core engineers also work for Redis Labs! We contribute extensively to the open source Redis project. As a rule, we adhere to the open source’s specifications and make every effort to update our service with its latest versions.

That said, the following Redis features are not applicable in the context of our service:

- Shared databases aren’t supported in our service given their potential negative impact on performance. We recommend using dedicated databases instead ([read this post for more information](https://redislabs.com/blog/benchmark-shared-vs-dedicated-redis-instances/)). Therefore, the following commands are blocked and will produce an error when invoked:
    - [MOVE](http://redis.io/commands/move)
    - [SELECT](http://redis.io/commands/select)
- Data persistence and backups are managed from the service’s web interface, so the following commands are blocked:
    - [BGREWRITEAOF](http://redis.io/commands/BGREWRITEAOF)
    - [BGSAVE](http://redis.io/commands/bgsave)
    - [LASTSAVE](http://redis.io/commands/LASTSAVE)
    - [SAVE](http://redis.io/commands/SAVE)
- Since replication is managed automatically by the service and since it could present a security risk, the following commands are blocked:
    - [MIGRATE](http://redis.io/commands/MIGRATE)
    - [REPLCONF](http://redis.io/commands/REPLCONF)
    - [SLAVEOF](http://redis.io/commands/SLAVEOF)
    - [SYNC](http://redis.io/commands/SYNC)/[PSYNC](http://redis.io/commands/PSYNC)
- Redis Labs clustering technology is different than the open source Redis Cluster and supports clustering in a seamless manner that works with all standard Redis clients. As a result [all Cluster related commands](http://redis.io/commands#cluster) are blocked and will produce an error when invoked.
- Commands that aren’t relevant for a hosted Redis service are blocked:
    - [CONFIG RESETSTAT](http://redis.io/commands/CONFIG-RESETSTAT)
    - [DEBUG OBJECT](http://redis.io/commands/DEBUG-OBJECT)/[SEGFAULT](http://redis.io/commands/DEBUG-SEGFAULT)
    - [OBJECT](http://redis.io/commands/OBJECT)
    - [SHUTDOWN](http://redis.io/commands/SHUTDOWN)
    - [CLIENT PAUSE](http://redis.io/commands/CLIENT-PAUSE)
    - [WAIT](http://redis.io/commands/WAIT)
    - [COMMAND INFO](http://redis.io/commands/COMMAND-INFO)
    - [COMMAND COUNT](http://redis.io/commands/COMMAND-COUNT)
    - [COMMAND GETKEYS](http://redis.io/commands/COMMAND-GETKEYS)
    - [LATENCY LATEST](http://redis.io/commands/LATENCY-LATEST)
    - [LATENCY HISTORY](http://redis.io/commands/LATENCY-HISTORY)
    - [LATENCY RESET](http://redis.io/commands/LATENCY-RESET)
    - [LATENCY GRAPH](http://redis.io/commands/LATENCY-GRAPH)
    - [LATENCY DOCTOR](http://redis.io/commands/LATENCY-DOCTOR)
- Additionally, only a subset of Redis’ configuration settings (via CONFIG GET/SET) is applicable to Redis Cloud Essentials. Attempts to get or set a configuration parameter that isn’t included in the following list will result in an error:
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
- Lastly, unlike Redis’ 512MB limit, the maximum size of key names in our service is 64KB (key values, however, can have sizes up to 512MB).
{{% /expand%}}

<!-- Also in RS -->
{{%expand "How many Redis databases can I create and manage?" %}}
Each subscription plan (except for our free plans) enables multiple dedicated databases, each running in a dedicated process and in a non-blocking manner.

A 1GB plan for example, enables 16 [dedicated databases](https://redislabs.com/blog/benchmark-shared-vs-dedicated-redis-instances).
{{% /expand%}}

<!-- Also in RV -->
{{%expand "How can I control access to my resources?" %}}
Our premium plans feature the following access control mechanisms:

- Password authentication
- Source IP/Subnet ACL
- Security Group ACL (on AWS cloud)

We also offer custom plans with SSL authentication and encryption — [contact us](mailto:info@redislabs.com) if you require extra security measures.
{{% /expand%}}

<!-- Also in RV -->
{{%expand "Is my data safe and always available?" %}}
Absolutely! Redis Cloud Essentials offers a comprehensive suite of [high-availability](https://redislabs.com/blog/high-availability-for-in-memory-cloud-datastores) provisions, including in-memory replication (within the same data center or across data centers), persistent storage and backups. Read here for more info.
{{% /expand%}}

{{%expand "Can I export my Redis data from Redis Cloud Essentials?" %}}
Absolutely! There is no lock-in with Redis Cloud Essentials. With a click of button, you can export your latest RDB backup file from your cloud storage, FTP or HTTP server to any Redis server of your choice. Free plans do not include this capability.
{{% /expand%}}

{{%expand "Can my Redis database grow infinitely?" %}}
Our proxy-based architecture and Dynamic Clustering technology were built from the ground up to provide scalable Redis, and to support its commands and data types at any dataset size. All you need to do is select a plan that fits your dataset’s size. If your dataset is expected to grow or occasionally varies in size, we recommend you select our Pay-As-You-Go plan, for which we charge according to your actual consumption of memory in GB/hr.
{{% /expand%}}

{{%expand "Why do you recommend mapping my availability zone on AWS?" %}}
The same AWS availability zone name, when shown in different AWS accounts, does not always refer to the same underlying physical infrastructure.

The mapping process lets us unambiguously identify your availability zone, so we can serve your Redis data from the same physical zone, minimizing inter-zone latencies.
{{% /expand%}}

{{%expand "Will my dataset/setup/endpoints be affected if I upgrade or downgrade my subscription?" %}}
No. Any changes you make to your Redis Cloud Essentials subscription are purely administrative and do not affect service to your application in any way. You can downgrade or upgrade your subscription at any time with no downtime or performance impact.
{{% /expand%}}
