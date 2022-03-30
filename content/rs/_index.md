---
Title: Redis Enterprise Software
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: /rs/
         /redissoftware/
         /redis-software/
         /redis_software/
         /redisenterprisesoftware/
         /redis-enterprise-software/
         /redis_enterprise_software/
---

[Redis Enterprise](https://redislabs.com/redis-enterprise/) is a robust, in-memory database platform built by the same people who develop open source Redis.
It maintains the simplicity and high performance of Redis and adds many enterprise-grade capabilities, including:

- Linear scaling to hundreds of millions of operations per second
- Active-Active global distribution with local latency
- Redis on Flash to support large datasets while minimizing infrastructure costs
- 99.999% uptime

## Software vs. Cloud

Redis Enterprise is available as software and as a hosted [cloud service]({{< relref "/rc/_index.md" >}}).

You can run Redis Enterprise Software in an on-premises data center or on your preferred cloud platform. 

Redis Enterprise also works with [various container orchestrations systems]({{< relref "/platforms/_index.md" >}}), such as Kubernetes. See our docs on [Kubernetes]({{< relref "/platforms/kubernetes/_index.md" >}}), [Openshift]({{< relref "/platforms/openshift/_index.md" >}}), [PKS]({{< relref "/platforms/pks/_index.md" >}}), and [PCF]({{< relref "/platforms/pcf/_index.md" >}}) for more details.

For development and testing, you can also run Redis Enterprise using [Docker containers]({{< relref "/rs/installing-upgrading/get-started-docker.md" >}}).

If you prefer a managed version of Redis Enterprise, [Redis Enterprise Cloud]({{< relref "/rc/_index.md" >}}) provides all of the benfits of Redis Enterprise Software on all major public clouds.

## Why Redis Enterprise Software?

Redis Enterprise makes it easy to run Redis at scale.
You can use a single Redis Enterprise Cluster to provision as many Redis databases as you need for your organization, and each of these databases can be tuned and scaled independently.
In addition, Redis Enterprise supports many enterprise security features, including role-based access control.

For more on scaling, high availability, and durability, see the [the Redis Enterprise Software architecture.]({{< relref "/rs/concepts/_index.md" >}})

## Active-Active replicated Redis databases (CRDB) {#activeactive-replicated-redis-databases-crdb}

[Active-Active databases]({{< relref "/rs/concepts/intercluster-replication.md" >}}) provide global, geo-distributed database replication with conflict-free local writes.
This greatly simplifies the development of globally distributed applications.
Geo-distributed Active-Active databases combine [conflict-free replicated data types](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) with Redis data types to provide automatic conflict resolution based on each data type's semantics.

## Redis on Flash

[Redis on Flash]({{< relref "/rs/concepts/memory-performance/redis-flash.md" >}}) offers dramatic cost savings for extra large Redis databases.
Standard Redis databases keep all of their data in RAM; Redis on Flash databases distribute data across RAM and dedicated flash memory (SSD).
This lowers costs while maintaining similar performance to completely RAM-based databases.

## Additional features

{{< tabs tabTotal="7" tabID="1" tabName1="Linear Scalability" tabName2="High Availability" tabName3="Data Durability" tabName4="High Performance" tabName5="Dedicated Databases" tabName6="User Interface" tabName7="24/7 Support">}}
{{< tab tabNum="1" >}}

With Redis Enterprise, a dataset can grow beyond the size of the largest node in the cluster and be processed by any number of cores.

By partitioning your dataset across multiple nodes using a hashing policy, you overcome the memory limitations of a single node and the performance limitations of a single core.

You can dynamically scale your Redis databases increasing their memory limits or increasing the number of shards, all using the built-in UI.

{{< /tab >}}
{{< tab tabNum="2" >}}

In addition to replicating a database within the same data center, you can also replicate a dataset across data centers and across regions.
This provides high availability, disaster recovery, and performance improvements for globally-distributed applications.

If a node fails, the data is seamlessly served from a replacement node in the cluster without human intervention.

Redis Enterprise can automatically handle node failures, Redis process failures, and proxy failures.
Failover typically completes within a few seconds.

[Learn more about High Availability]({{< relref "/rs/concepts/high-availability/_index.md" >}}).

{{< youtube qIZuW_8bPtQ >}}

{{< /tab >}}
{{< tab tabNum="3" >}}

Redis Enterprise enables the use of Redis AOF (Append-Only File) every second or on
every write, or (RDB) snapshots of your dataset every 1, 6, or 12 hours
to persistent storage. In addition, you can back up your dataset
periodically or on-demand to an FTP server, network storage or cloud storage service.

{{< /tab >}}
{{< tab tabNum="4" >}}

Requests are processed by multiple cores to guarantee the best performance.

{{< /tab >}}
{{< tab tabNum="5" >}}

You can run multiple databases on a single Redis Enterprise Cluster.
Each database runs with its own dedicated processes in a non-blocking manner.

{{< /tab >}}
{{< tab tabNum="6" >}}

Redis Enterprise provides a full-featured UI for setting up, configuring, and monitoring the cluster and its databases.
The UI also allows you configure alerts for events at the database and cluster levels.

{{< /tab >}}
{{< tab tabNum="7" >}}

Redis provides [24/7 support](https://redislabs.com/redis-enterprise-deployment/support/) to users of Redis Enterprise Software and Redis Enterprise Cloud.

{{< /tab >}}
{{< /tabs >}}
