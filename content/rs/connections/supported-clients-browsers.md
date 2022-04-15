---
Title: Supported connection clients
description:
weight: $weight
categories: ["RS"]
aliases: rs/administering/designing-production/supported-clients-browsers/
         rs/administering/designing-production/supported-clients-browsers.md
         rs/connections/supported-clients-browsers/
         rs/connections/supported-clients-browsers.md
---
You can connect to Redis Enterprise Software databases programmatically using client libraries.

## Redis client libraries

To connect an application to a Redis database hosted by Redis Enterprise Software, use a [client library](https://redis.io/clients) appropriate for your programming language.

You can also use the `redis-cli` utility to connect to a database from the command-line.

For examples of each approach, see Get started using [Redis Enterprise Software]({{< relref "/" >}})

Note: You cannot use client libraries to configure Redis Enterprise Software.  Instead, use:

- The Redis Software [admin console]({{< relref "/rs/installing-upgrading/get-started-redis-enterprise-software.md" >}})
- The [REST API]({{< relref "/rs/administering/" >}})
- Appropriate command-line utilities, such as [`rladmin`]({{< relref "/rs/references/rladmin.md" >}})

### Discovery service

We recommend the following clients when using a [discovery service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) based on the Redis Sentinel API:

{{< embed-md "discovery-clients.md" >}}

