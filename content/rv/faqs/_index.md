---
Title: FAQs
description: 
weight: 90
alwaysopen: false
categories: ["RV"]
---
Here are some frequently asked questions about Redis Cloud Pro.

<!-- Also in RS and RC -->
{{%expand "What exactly is Redis Enterprise?" %}}
Redis Labs has enhanced open source Redis with a technology layer that encapsulates open source Redis, while fully supporting all its commands, data structures and modules. It adds exceptional flexibility, stable high performance and unmatched resilience, as well as multiple deployment choices (public and private clouds, on-premises, hybrid, RAM-Flash combination), topology (active-active, active-passive, active-replica) and support for very large dataset sizes. This enhanced and exponentially more powerful database platform is Redis Enterprise.

Learn more about [Redis Enterprise](https://redislabs.com/why-redis/redis-enterprise/).
{{% /expand%}}

<!-- Also in RS and RC -->
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
- Additionally, only a subset of Redis’ configuration settings (via CONFIG GET/SET) is applicable to Redis Cloud. Attempts to get or set a configuration parameter that isn’t included in the following list will result in an error:
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

<!-- Also in RC -->
{{%expand "How can I control access to my resources?" %}}
Redis Cloud Pro features the following access control mechanisms:

- Password authentication
- Source IP/Subnet ACL
- Security Group ACL

If you are using Redis Cloud Pro on your own AWS infrastructure and deploying it on the same VPC as your application servers, we use a special set of AWS security permissions to limit access to only the instances required for running the RCP clusters. When deploying Redis Cloud Pro on a different VPC from your application servers or under a different AWS account of yours, all the operational aspects of managing Redis Cloud Pro are completely isolated from your application.
{{% /expand%}}

<!-- Also in RC -->
{{%expand "Is my data safe and always available?" %}}
Absolutely! Redis Cloud Pro offers a comprehensive suite of [high-availability](https://redislabs.com/blog/high-availability-for-in-memory-cloud-datastores) provisions, including in-memory replication (within the same data center or across data centers), persistent storage on EBS and backups to S3 or any file server.
{{% /expand%}}

{{%expand "Can I export my Redis data from Redis Cloud Pro and Redis Cloud Essentials?" %}}
Absolutely! There is no lock-in with Redis Cloud. With a click of button, you can export your latest RDB backup file from your cloud storage, FTP or HTTP server to any Redis server of your choice. Free plans do not include this capability.
{{% /expand%}}

{{%expand "What is the difference between Redis Cloud Pro and Redis Cloud Essentials?" %}}
Redis Cloud Pro and Redis Cloud Essentials are both fully-managed Redis services operated by Redis Labs, however Redis Cloud Pro runs on a dedicated VPC and offers Redis on Flash, the most cost effective and high performance choice for datasets larger than 500GB, as well as Active-Active Geo Distribution, Active-Passive Geo Distribution, Modules integration and more enterprise features. Running Redis in a fully-automated manner with 24/7 expert support over Redis Cloud Pro is lower in cost than managing your own Redis instances on the cloud.
{{% /expand%}}

{{%expand "Why should I run Redis Cloud Pro on Flash?" %}}
Redis Labs’ Redis on Flash technology enables you to run Redis on high IOPS SSD instances with high throughput and the same sub-millisecond latencies as RAM-based Redis. The economic benefit is dramatic: the cost of cloud instances required to support your database can be slashed by up to 70%, while maintaining the same blazing fast performance. As your data grows, and your processing needs increase, you can achieve cost-effective high speed operational and analytic processing with the versatility of Redis and the cost efficiency of Flash memory. If your dataset is larger than 500GB, running Redis in a fully-automated manner with 24/7 expert support over Redis Cloud Pro is lower in cost than managing your own Redis instances on the cloud.
>>>>>>> f776a90... Update _index.md
{{% /expand%}}
