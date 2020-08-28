---
Title: FAQs
description:
weight: 80
alwaysopen: false
categories: ["RI"]
---
Here are some frequently asked questions about Redis Enterprise Software.

## General

{{< expand-control >}}
{{% expand "What is RedisInsight?" %}}
RedisInsight is a browser based GUI for Redis. It lets you do the following -

- Browse
    - View real time metrics from redis
    - Create tabular views from your redis keys and export data in different formats
    - Perform CRUD operations using the web based CLI
    - Visualize and update data from [Streams](https://redis.io/topics/streams-intro), [RedisGraph](https://redisgraph.io), [RediSearch](https://redisearch.io) and [RedisTimeSeries](https://redistimeseries.io).
- Analyse
    - Analyze memory used by redis by keys or key patterns, by expiry, by data types or or the internal encoding
    - Filter keys by number of elements or by memory, and identify top keys
    - Profile redis to list keys or commands redis is executing
- Bulk Actions
- Configure
    - View and modify redis configuration
    - View list of clients and kill specific clients
{{% /expand %}}

{{% expand "What problem does RedisInsight solve?" %}}
RedisInsight lets you reduce memory used by redis, which usually translates to a proportional cost reduction. It also helps you identify common latency issues, and perform routine administrative tasks on your redis server.
{{% /expand %}}

{{% expand "How does RedisInsight compare with the open source redis-rdb-tools?" %}}
We open sourced redis-rdb-tools in 2012 as a way to analyze the RDB file, and we continue to support the open source version. The open source version is meant to be a library and command line utility. It is a fundamental building block for RedisInsight. RedisInsight is free to use but is closed source.
{{% /expand %}}

{{% expand "What versions of Redis does RedisInsight support?" %}}
Currently, RedisInsight supports single node redis instances. Redis Cluster support is experimental, but not all features work. If you want to use RedisInsight for Redis Cluster, send us an [email](mailto:redisinsight@redislabs.com) and we can try to accommodate your use case.
{{% /expand %}}

{{% expand "Do you support Redis Labs Enterprise Version?" %}}
Yes, RedisInsight is fully compatible with Redis Labs Enterprise version.
{{% /expand %}}

{{% expand "What cloud providers do you support?" %}}
We support Redis Cloud, Redis Cloud Pro, AWS Elasticache and Azure Redis Cache. That said, RedisInsight should work with any cloud provider as long as you run it on a host that has network access to your cloud based redis server. Send us an [email](mailto:redisinsight@redislabs.com) if you would like to use RedisInsight on a cloud provider that we haven't listed.
{{% /expand %}}

{{< /expand-control >}}

## Memory analysis

{{< expand-control >}}
{{% expand "How long does the memory analysis take?" %}}
This depends on how large your dataset and the host on which you are running your docker container. Empirically, expect 30s per GB of RAM analyzed.
{{% /expand %}}

{{% expand "What is the online mode of memory analysis?" %}}
In online mode, RedisInsight connects to your redis server, downloads the entire data set, and then analyzes it in a background process. To download the data set from redis server, one of two approaches is used. If the server allows it, we use the SYNC command to download a RDB file. If the server blocks SYNC, we use SCAN + DUMP in an loop.
{{% /expand %}}

{{% expand "What is the overhead of online memory analysis on redis server?" %}}
The overhead is minimal. If SYNC command is supported, the overhead is the same as connecting a slave for a short duration. If SYNC command is disabled, we run the  SCAN command followed by DUMP in a pipeline. Neither approach blocks your redis server.
{{% /expand %}}

{{% expand "What is offline mode of memory analysis?" %}}
In the offline mode, RedisInsight downloads a RDB file from a S3 bucket you specify. This RDB file is then analyzed in a background process.
{{% /expand %}}

{{% expand "What is the overhead of offline memory analysis on redis server?" %}}
Zero overhead, since we do not need to connect to your redis server
{{% /expand %}}

{{% expand "How is memory used by a key calculated?" %}}
We look at the internal structures redis needs to allocate to store the key and determine the memory consumption. We also account for allocator overheads, as well as differences between redis versions.
{{% /expand %}}

{{% expand "How accurate is the memory analysis?" %}}
The memory used by a key is based on heuristics, and is usually within 10% of the actual consumption.
{{% /expand %}}

{{% expand "What are key patterns?" %}}
Key pattern is a grouping of related keys, for example users:*. RedisInsight can show you total memory consumption by key pattern, and also the biggest keys within that key pattern.
{{% /expand %}}

{{% expand "How are key patterns generated?" %}}
We assume that you use colon as a separator. If you use a non-standard separator, you have to add key patterns manually.
{{% /expand %}}

{{< /expand-control >}}

## Connecting to Redis

{{< expand-control >}}

{{% expand "How do I connect to redis-server running on localhost?" %}}
First, this works only if you have RedisInsight running on your local computer. Depending on your docker version, you can use one of these host names instead of localhost - docker.for.mac.localhost, docker.for.win.localhost or host.docker.internal. If none of those host names work, find the ip address of your computer (usually starts with 192.x.x.x), and use that ip address instead of localhost.
{{% /expand %}}

{{% expand "How do I connect to AWS Elasticache?" %}}
You must install RedisInsight inside your VPC, either on an EC2 instance, or using ECS or Fargate. See [EC2 Installation Instructions]({{< relref "/ri/installing/install-ec2.md" >}})
{{% /expand %}}

{{% expand "What are the memory limits on your license terms?" %}}
Our licensing works on the sum of used memory on the redis instances you have added to RedisInsight. So if your license allows 15GB, you can add 5 redis instances using 3 GB RAM, or 1 redis server using 15 GB.
{{% /expand %}}

{{< /expand-control >}}

## License and support

{{< expand-control >}}

{{% expand "Is RedisInsight a free tool?" %}}
Yes, RedisInsight is available as a non-commercial, free of charge tool. You can review the terms of use in the [RedisInsight Licence Terms](https://redislabs.com/wp-content/uploads/2019/10/RedisInsight-EULA-terms.pdf) document.
{{% /expand %}}

{{% expand "Where can I find the licence terms of RedisInsight?" %}}
See the official [RedisInsight Licence Terms](https://redislabs.com/wp-content/uploads/2019/10/RedisInsight-EULA-terms.pdf) document. 
{{% /expand %}}

{{< /expand-control >}}

## Privacy and security

{{< expand-control >}}

{{% expand "Who has access to my redis servers?" %}}
We provide RedisInsight as a docker container that you install and run on your hardware or cloud account. We do not have any ability to connect to your installation of RedisInsight or look at data within your redis servers.
{{% /expand %}}

{{% expand "How can I secure my RedisInsight installation?" %}}
We recommend installing HTTPS, whitelisting IP addresses that have access to RedisInsight and/or making it available within your VPN/internal network. Additionally, make sure you use a strong admin password for your database.
{{% /expand %}}

{{% expand "What information do you collect about my installation?" %}}
We use google analytics so that we can understand how customers use the software. Per google analytics terms and conditions, we do not track any personally identifiable information.
{{% /expand %}}

{{< /expand-control >}}
