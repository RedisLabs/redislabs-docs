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
You can [import]({{< relref "/rs/installing-upgrading/customize-user-and-group.md" >}}), [export]({{< relref "/rs/databases/import-export/export-data.md" >}}),
or [backup]({{< relref "/rs/databases/import-export/schedule-backups.md" >}})
files of a specific Redis Enterprise Software database to restore data.

## [Import data]({{< relref "/rs/installing-upgrading/customize-user-and-group.md" >}})

Import export or backup files of a specific Redis Enterprise Software database to restore data. You can either import from a single file or from multiple files, such as when you want to import from a backup of a clustered database.

## [Export data]({{< relref "/rs/databases/import-export/export-data.md" >}})

Export data to import it into a new database or to make a backup. Export to a local mount point, to [a URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) using FTP/SFTP, or on cloud provider storage.

## [Schedule automatic backups]({{< relref "/rs/databases/import-export/schedule-backups.md" >}})

Schedule backups of your databases to make sure you always have valid backups.

## [Migrate to Active-Active]({{< relref "/rs/databases/import-export/migrate-to-active-active.md" >}})

Migrate a database to an [Active-Active]({{< relref "/rs/databases/active-active/_index.md" >}}) database using [Replica Of]({{<relref "/rs/databases/import-export/replica-of/">}}).
