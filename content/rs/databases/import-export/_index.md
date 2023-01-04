---
Title: Import and export data
linkTitle: Import and export
description: How to import, export, flush, and migrate your data.
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/import-export/,
    /rs/administering/import-export/_index.md,
    /rs/databases/import-export/_index.md,
    /rs/databases/import-export/,
]
---
You can [import]({{< relref "/rs/databases/import-export/import-data" >}}), [export]({{< relref "/rs/databases/import-export/export-data" >}}),
or [back up]({{< relref "/rs/databases/import-export/schedule-backups.md" >}})
 a Redis Enterprise database.

## [Import data]({{< relref "/rs/databases/import-export/import-data" >}})

Import data from a backup or another Redis database. You can import from a single file or multiple files, such as when you want to import a backup of a clustered database.

## [Export data]({{< relref "/rs/databases/import-export/export-data.md" >}})

Export data from a Redis Enterprise database to a local mount point, an FTP or SFTP server, or cloud provider storage.

## [Schedule automatic backups]({{< relref "/rs/databases/import-export/schedule-backups.md" >}})

Schedule backups of your databases to make sure you always have valid backups.

## [Migrate to Active-Active]({{< relref "/rs/databases/import-export/migrate-to-active-active.md" >}})

Migrate a database to an [Active-Active]({{< relref "/rs/databases/active-active/_index.md" >}}) database using [Replica Of]({{<relref "/rs/databases/import-export/replica-of/">}}).
