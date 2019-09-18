---
Title: FAQs
description:
weight: 70
alwaysopen: false
categories: ["RC Essentials"]
---
Here are some frequently asked questions about Redis Cloud Essentials.

{{% expand "What exactly is Redis Enterprise?" %}}
{{< embed-md "what-is-redis-enterprise.md"  >}}
{{% /expand %}}

{{%expand "Are you fully compatible with open source Redis?" %}}
{{< embed-md "compatible-with-oss.md"  >}}
{{% /expand %}}

{{%expand "How many Redis databases can I create and manage?" %}}
{{< embed-md "how-many-databases-cloud.md"  >}}
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
Absolutely! Redis Cloud Essentials offers a comprehensive suite of [high-availability](https://redislabs.com/blog/high-availability-for-in-memory-cloud-datastores) provisions, including in-memory replication (within the same data center or across data centers), persistent storage and backups.
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
