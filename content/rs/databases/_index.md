---
title: Manage databases
linktitle: Databases
description: This page will help you find database management information in the Databases section. 
weight: 37
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/databases/_index.md,
    /rs/databases/,
]
---

You can manage your Redis Enterprise Software databases with several different tools:

- admin console (the web-based user interface)
- CLI tools ([rladmin]({{<relref "/rs/references/rladmin.md">}}), [redis-cli](https://redis.io/docs/manual/cli/), [crdb-cli]({{<relref "/rs/references/crdb-cli-reference.md">}}))
- [REST API]({{<relref "/rs/references/rest-api/_index.md">}})

## Database settings

The following are database settings configured specifically for each database:

- [memory limits]({{<relref "/rs/databases/configure/memory-limit.md">}})
- [data eviction]({{<relref "/rs/databases/configure/eviction-policy.md">}})
- [database persistence]({{<relref "/rs/databases/configure/database-persistence.md">}})
- geo-distribution ([Active-Active]({{<relref "/rs/databases/active-active/_index.md">}}) or [ReplicaOf]({{<relref "/rs/databases/replica-of.md">}}))
- [client connection TLS encryption]({{<relref "/rs/security/tls-ssl#client">}})

Other settings are managed on the [cluster level]({{<relref "/rs/administering/cluster-operations">}}).

## Active-Active databases

How you create, manage, and develop for Active-Active geo-distributed databases is different in several ways from standalone Redis Enterprise databases. For Active-Active specific articles, see [Active-Active databases]({{<relref "/rs/databases/active-active/_index.md">}}):

- [Get started with Active-Active]({{<relref "/rs/databases/active-active/get-started-active-active.md">}})
- [Create Active-Active databases]({{<relref "/rs/databases/active-active/create-active-active.md">}})
- [Edit Active-Active database settings]({{<relref "/rs/databases/active-active/edit-aa-database.md">}})
- [Develop applications for Active-Active]({{<relref "/rs/databases/active-active/develop-aa-apps.md">}})
- [Active-Active data types]({{<relref "/rs/databases/active-active/data-types/_index.md">}})
- [Delete Active-Active databases]({{<relref "/rs/databases/active-active/delete-aa-database.md">}})

## Import and export data

You can also move data for your databases:

- [export]({{<relref "/rs/databases/import-export/export-data.md">}})
- [import]({{<relref "/rs/databases/import-export/import-data.md">}})
- [backup]({{<relref "/rs/databases/import-export/database-backup.md">}})
- [flush]({{<relref "/rs/databases/import-export/flush-db-crdb.md">}})
- [migrate to Active-Active]({{<relref "/rs/databases/import-export/migrate-to-active-active.md">}})
