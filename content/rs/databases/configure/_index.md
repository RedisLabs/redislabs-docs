---
title: Configure database settings
linktitle: Configure database settings
description: Configure and learn about settings specific to each database.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: [
   /rs/databases/configure/_index.md,
   /rs/databases/configure/_index/,
]
---

You can manage your Redis Enterprise Software databases with several different tools:

- Admin console (the web-based user interface)
- Command-line tools ([rladmin]({{<relref "/rs/references/rladmin.md">}}), [redis-cli](https://redis.io/docs/manual/cli/), [crdb-cli]({{<relref "/rs/references/crdb-cli-reference.md">}}))
- [REST API]({{<relref "/rs/references/rest-api/_index.md">}})

## Database settings

The following are database settings configured specifically for each database:

- [Memory limits]({{<relref "/rs/databases/configure/memory-limit.md">}})
- [Data eviction]({{<relref "/rs/databases/configure/eviction-policy.md">}})
- [Database persistence]({{<relref "/rs/databases/configure/database-persistence.md">}})
- Geo-distribution ([Active-Active]({{<relref "/rs/databases/active-active/_index.md">}}) or [ReplicaOf]({{<relref "/rs/databases/replica-of.md">}}))
- [Client connection TLS encryption]({{<relref "/rs/security/tls-ssl#client">}})

Other settings are managed on the [cluster level]({{<relref "/rs/administering/cluster-operations">}}).
