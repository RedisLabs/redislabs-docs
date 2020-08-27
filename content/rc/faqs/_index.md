---
Title: FAQs
description:
weight: 90
alwaysopen: false
categories: ["RC"]
aliases: /rv/faqs/
---
Here are some frequently asked questions about Redis Cloud.

{{< expand-control >}}

{{< expand "What exactly is Redis Enterprise?" >}}
{{< embed-md "what-is-redis-enterprise.md"  >}}
{{< /expand >}}

{{< expand "Are you fully compatible with open source Redis?" >}}
{{< embed-md "compatible-with-oss.md"  >}}
{{< /expand >}}

{{< expand "How many Redis databases can I create and manage?" >}}
{{< embed-md "how-many-databases-cloud.md"  >}}
{{< /expand >}}

{{% expand "How can I control access to my resources?" %}}
Redis Cloud features the following access control mechanisms:

- Password authentication
- Source IP/Subnet ACL
- Security Group ACL (on AWS cloud)

If you use Redis Cloud on your own AWS infrastructure and deploy it on the same VPC as your application servers,
we use a special set of AWS security permissions to limit access to only the instances required for running the Redis Cloud clusters.
When deploying Redis Cloud on a different VPC from your application servers or under a different AWS account of yours,
all the operational aspects of managing Redis Cloud are completely isolated from your application.
{{% /expand %}}

{{% expand "Is my data safe and always available?" %}}
Absolutely! Redis Cloud offers a comprehensive suite of [high-availability](https://redislabs.com/blog/high-availability-for-in-memory-cloud-datastores) provisions,
including in-memory replication (within the same data center or across data centers), persistent storage on EBS and backups to S3 or any file server.
{{% /expand %}}

{{< expand "Can I export my Redis data from Redis Cloud?" >}}
Absolutely! There is no lock-in with Redis Cloud. With a click of button, you can export your latest RDB backup file from your cloud storage, FTP or HTTP server to any Redis server of your choice. Free plans do not include this capability.
{{< /expand >}}

{{< expand "Can my Redis database grow infinitely?" >}}
Our proxy-based architecture and Dynamic Clustering technology were built from the ground up to provide scalable Redis,
and to support its commands and data types at any dataset size.
All you need to do is select a plan that fits your dataset’s size.
If your dataset is expected to grow or occasionally varies in size, we recommend you select our Pay-As-You-Go plan,
for which we charge according to your actual consumption of memory in GB/hr.
{{< /expand >}}

{{< expand "Why do you recommend mapping my availability zone on AWS?" >}}
The same AWS availability zone name, when shown in different AWS accounts, does not always refer to the same underlying physical infrastructure.
The mapping process lets us unambiguously identify your availability zone, so we can serve your Redis data from the same physical zone, minimizing inter-zone latencies.
{{< /expand >}}

{{< expand "Will my dataset/setup/endpoints be affected if I upgrade or downgrade my subscription?" >}}
No. Any changes you make to your Redis Cloud subscription are purely administrative and do not affect service to your application in any way.
You can downgrade or upgrade your subscription at any time with no downtime or performance impact.
{{< /expand >}}

{{% expand "What is the difference between Redis Cloud Pro and Redis Cloud Essentials?" %}}
Redis Cloud Pro and Redis Cloud Essentials are both fully-managed Redis services operated by Redis Labs, however Redis Cloud Pro runs on a dedicated VPC and offers:

- [Redis on Flash]({{< relref "/rs/concepts/memory-architecture/redis-flash.md" >}}) - Recommended for datasets larger than 500GB
- [Active-Active]({{< relref "/rs/administering/designing-production/active-active.md" >}}) and [Active-Passive]({{< relref "/rs/administering/designing-production/active-passive.md" >}}) Geo Distribution
- Integration with [modules]({{< relref "/modules/_index.md" >}})
- Encryption of [persistence data]({{< relref "/rs/concepts/data-access/persistence.md" >}})
- [Cloud API]({{< relref "/rc/api/_index.md" >}})

Running Redis in a fully-automated manner with 24/7 expert support over Redis Cloud is lower in cost than managing your own Redis instances on the cloud.
{{% /expand %}}

{{% expand "Why should I run Redis Cloud on Flash?" %}}
Redis Labs’ Redis on Flash technology enables you to run Redis on high IOPS SSD instances with high throughput and the same sub-millisecond latencies as RAM-based Redis.
The economic benefit is dramatic:

- The cost of cloud instances required to support your database can be slashed by up to 70%, while maintaining the same blazing fast performance.
- As your data grows, and your processing needs increase, you can achieve cost-effective high speed operational and analytic processing with the versatility of Redis and the cost efficiency of Flash memory.
- If your dataset is larger than 500GB, running Redis in a fully-automated manner with 24/7 expert support over Redis Cloud is lower in cost than managing your own Redis instances on the cloud.
{{< /expand >}}

{{< /expand-control >}}
