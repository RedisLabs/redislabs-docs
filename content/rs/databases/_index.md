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

- Admin console (the web-based user interface)
- Command-line tools ([rladmin]({{<relref "/rs/references/rladmin.md">}}), [redis-cli](https://redis.io/docs/manual/cli/), [crdb-cli]({{<relref "/rs/references/crdb-cli-reference.md">}}))
- [REST API]({{<relref "/rs/references/rest-api/_index.md">}})

## Database settings

The following are database settings configured specifically for each database:

- [Memory limits]({{<relref "/rs/databases/configure/memory-limit.md">}})
- [Data eviction]({{<relref "/rs/databases/configure/eviction-policy.md">}})
- [Database persistence]({{<relref "/rs/databases/configure/database-persistence.md">}})
- Geo-distribution ([Active-Active]({{<relref "/rs/databases/active-active/_index.md">}}) or [ReplicaOf]({{<relref "/rs/databases/replica-of.md">}}))
- [Client connection TLS encryption]({{<relref "/rs/security/tls/enable-tls#enable-tls-for-client-connections">}})

Other settings are managed on the [cluster level]({{<relref "/rs/clusters/">}}).

## Active-Active databases

How you create, manage, and develop for Active-Active geo-distributed databases is different from standalone Redis Enterprise databases in several ways. For Active-Active specific articles, see [Active-Active databases]({{<relref "/rs/databases/active-active/_index.md">}}):

- [Get started with Active-Active]({{<relref "/rs/databases/active-active/get-started-active-active.md">}})
- [Create Active-Active databases]({{<relref "/rs/databases/active-active/create-active-active.md">}})
- [Edit Active-Active database settings]({{<relref "/rs/databases/active-active/edit-aa-database.md">}})
- [Develop applications for Active-Active]({{<relref "/rs/databases/active-active/develop-aa-apps.md">}})
- [Active-Active data types]({{<relref "/rs/databases/active-active/data-types/_index.md">}})
- [Delete Active-Active databases]({{<relref "/rs/databases/active-active/delete-aa-database.md">}})

## Import and export data

You can also move data for your databases:

- [Export]({{<relref "/rs/databases/import-export/export-data.md">}})
- [Import]({{<relref "/rs/databases/import-export/import-data.md">}})
- [Backup]({{<relref "/rs/databases/import-export/database-backup.md">}})
- [Flush]({{<relref "/rs/databases/import-export/flush-db-crdb.md">}})
- [Migrate to Active-Active]({{<relref "/rs/databases/import-export/migrate-to-active-active.md">}})
