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
         /rs/administering/troubleshooting/
         /rs/administering/
---

[Redis Enterprise](https://redis.com/redis-enterprise/advantages/) is a self-managed, enterprise-grade version of Redis.

With Redis Enterprise, you get many enterprise-grade capabilities, including:
- Linear scalability
- High availability, backups, and recovery
- Predictable performance
- 24/7 suppport

You can run Redis Enterprise Software in an on-premises data center or on your preferred cloud platform.

## Get started
Build a small-scale cluster with the Redis Enterprise Software container image.
- [Get started]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software" >}})
- [Docker]({{<relref "/rs/installing-upgrading/get-started-docker">}})
- [Get started with Active-Active]({{<relref "/rs/databases/active-active/get-started-active-active">}})

## Install & setup
[Install & set up]({{<relref "/rs/installing-upgrading">}}) a Redis Enterprise Software cluster.
- [Networking]({{<relref "/rs/networking">}})
- [Set up]({{<relref "/rs/clusters/new-cluster-setup">}}) & [configure]({{<relref "/rs/clusters/configure">}}) a [cluster]({{<relref "/rs/clusters">}})
- [Release notes]({{<relref "/rs/release-notes">}})

## Databases
Create and manage a [Redis database]({{<relref "/rs/databases">}}) on a cluster.
- [Create a Redis Enterprise Software database]({{<relref "/rs/databases/create-database">}})
- [Configure database]({{<relref "/rs/databases/configure">}})
- [Create Active-Active database]({{<relref "/rs/databases/active-active/create-active-active">}})
- [Edit Active-Active database]({{<relref "/rs/databases/active-active/edit-aa-database">}})

## Security
[Manage secure connections]({{<relref "/rs/security">}}) to the cluster and databases.
- [Access control]({{<relref "/rs/security/access-control">}})
- [Users]({{<relref "/rs/security/access-control/manage-users">}}) & [roles]({{<relref "/rs/security/access-control/create-roles">}})
- [Certificates]({{<relref "/rs/security/certificates">}})
- [TLS]({{<relref "/rs/security/tls">}}) & [Encryption]({{<relref "/rs/security/internode-encryption">}})

## Reference
Use command-line utilities and the REST API to manage the cluster and databases.
- [rladmin]({{<relref "/rs/references/cli-utilities/rladmin">}}), [crdb-cli]({{<relref "/rs/references/cli-utilities/crdb-cli">}}), & [other utilities]({{<relref "/rs/references/cli-utilities">}})
- [REST API reference]({{<relref "/rs/references/rest-api">}}) & [examples]({{<relref "/rs/references/rest-api/quick-start">}})
- [Redis commands](https://redis.io/commands/) (redis.io)

## Related info
- [Redis Enterprise Cloud]({{<relref "/rc">}})
- [Open source Redis](https://redis.io/) (redis.io)
- [Redis Stack]({{<relref "/modules">}})
- [Glossary]({{<relref "/glossary">}})
