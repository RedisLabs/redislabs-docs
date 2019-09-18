---
Title: FAQs
description:
weight: 90
alwaysopen: false
categories: ["RC Pro"]
---
Here are some frequently asked questions about Redis Cloud Pro.

{{% expand "What exactly is Redis Enterprise?" %}}
{{< embed-md "what-is-redis-enterprise.md"  >}}
{{% /expand %}}

{{%expand "Are you fully compatible with open source Redis?" %}}
{{< embed-md "compatible-with-oss.md"  >}}
{{% /expand %}}

<!-- Also in RC -->
{{%expand "How can I control access to my resources?" %}}
Redis Cloud Pro features the following access control mechanisms:

- Password authentication
- Source IP/Subnet ACL
- Security Group ACL

If you are using Redis Cloud Pro on your own AWS infrastructure and deploying it on the same VPC as your application servers, we use a special set of AWS security permissions to limit access to only the instances required for running the Redis Cloud Pro clusters. When deploying Redis Cloud Pro on a different VPC from your application servers or under a different AWS account of yours, all the operational aspects of managing Redis Cloud Pro are completely isolated from your application.
{{% /expand%}}

<!-- Also in RC -->
{{%expand "Is my data safe and always available?" %}}
Absolutely! Redis Cloud Pro offers a comprehensive suite of [high-availability](https://redislabs.com/blog/high-availability-for-in-memory-cloud-datastores) provisions, including in-memory replication (within the same data center or across data centers), persistent storage on EBS and backups to S3 or any file server.
{{% /expand%}}

{{%expand "Can I export my Redis data from Redis Cloud Pro?" %}}
Absolutely! There is no lock-in with Redis Cloud Pro. With a click of button, you can export your latest RDB backup file from your cloud storage, FTP or HTTP server to any Redis server of your choice. Free plans do not include this capability.
{{% /expand%}}

{{%expand "What is the difference between Redis Cloud Pro and Redis Cloud Essentials?" %}}
Redis Cloud Pro and Redis Cloud Essentials are both fully-managed Redis services operated by Redis Labs, however Redis Cloud Pro runs on a dedicated VPC and offers Redis on Flash, the most cost effective and high performance choice for datasets larger than 500GB, as well as Active-Active Geo Distribution, Active-Passive Geo Distribution, Modules integration and more enterprise features. Running Redis in a fully-automated manner with 24/7 expert support over Redis Cloud Pro is lower in cost than managing your own Redis instances on the cloud.
{{% /expand%}}

{{%expand "Why should I run Redis Cloud Pro on Flash?" %}}
Redis Labs’ Redis on Flash technology enables you to run Redis on high IOPS SSD instances with high throughput and the same sub-millisecond latencies as RAM-based Redis. The economic benefit is dramatic: the cost of cloud instances required to support your database can be slashed by up to 70%, while maintaining the same blazing fast performance. As your data grows, and your processing needs increase, you can achieve cost-effective high speed operational and analytic processing with the versatility of Redis and the cost efficiency of Flash memory. If your dataset is larger than 500GB, running Redis in a fully-automated manner with 24/7 expert support over Redis Cloud Pro is lower in cost than managing your own Redis instances on the cloud.
{{% /expand%}}
