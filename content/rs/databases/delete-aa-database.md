---
Title: Delete an Active-Active database
description: Delete Active-Active database
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/database-operations/delete-crdb/
---

When you delete an Active-Active database (formerly known as CRDB),
all instance of the Active-Active database are deleted from all participating clusters.

{{% warning %}}
This action is an immediate, non-reversible, and has no rollback.
{{% /warning %}}

Because Active-Active databases are made up of instances on multiple participating clusters,
to restore a deleted Active-Active database you must create the database again with all of its instances
and then restore the data to the database from backup.

We recommended that you:

- Backup your data and test the restore on another database before you delete an Active-Active database.
- Consider [flushing the data]({{< relref "/rs/databases/import-export/flush-db-crdb.md" >}}) from the database
    so that you can keep the Active-Active database configuration and restore the data to it if necessary.
