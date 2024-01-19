---
Title: Connect to a database
linkTitle: Connect
description: Learn how to connect your application to a Redis database hosted by Redis Enterprise Software and test your connection.
weight: 20
categories: ["RS"]
aliases: [
    /rs/connections/_index.md,
    /rs/connections/,
    /rs/databases/connections/_index.md,
    /rs/databases/connections/,
    /rs/databases/connect/,

]
---

After you [set up a cluster]({{< relref "/rs/clusters/new-cluster-setup" >}}) and [create a Redis database]({{< relref "/rs/databases/create" >}}), you can connect to your database.

To connect to your database, you need the database endpoint, which includes the cluster name (FQDN) and the database port. To view and copy public and private endpoints for a database in the cluster, see the database’s **Configuration > General** section in the Cluster Manager UI.

{{<image filename="images/rs/screenshots/databases/config-general-endpoints.png" width="75%" alt="View public and private endpoints from the General section of the database's Configuration screen." >}}{{</image>}}

If you try to connect with the FQDN, and the database does not respond, try connecting with the IP address. If this succeeds, DNS is not properly configured. To set up DNS, see [Configure cluster DNS]({{<relref "/rs/networking/cluster-dns">}}).

If you want to secure your connection, set up [TLS]({{< relref "/rs/security/encryption/tls/" >}}).

## Connect to a database

Use one of the following connection methods to connect to your database:

- [`redis-cli`]({{<relref "/rs/references/cli-utilities/redis-cli/">}}) utility

- [RedisInsight](https://redis.com/redis-enterprise/redis-insight/)

- [Redis client](https://redis.io/docs/connect/clients/) for your preferred programming language

For examples, see [Test client connection]({{<relref "/rs/databases/connect/test-client-connectivity">}}).