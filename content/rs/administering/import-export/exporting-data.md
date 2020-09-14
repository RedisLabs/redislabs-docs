---
Title: Exporting Data From a Database
description:
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/import-export/exporting-data/
        /rs/administering/database-operations/exporting-data/
---
You can [schedule backups]({{< relref "/rs/administering/import-export/exporting-data.md" >}})
of a specific Redis Enterprise Software (RS) database to make sure you always have valid backups.
You can also export the data from a specific database at any time.

You can export a database to these locations:

- FTP server
- SFTP server
- Amazon AWS S3
- Local mount point
- OpenStack Swift (Object Storage)
- Azure Blob Storage
- Google Cloud Storage

The backup process creates compressed (.gz) RDB files that you can [import into a database]({{< relref "/rs/administering/import-export/importing-data.md" >}}).
If you backup a database configured for database clustering,
RS copies a backup file for each shard to the specified backup location.

{{< note >}}
Make sure that you have enough space available in your storage location.
If there is not enough space in the backup location, the backup fails.
{{< /note >}}

## Exporting data from a database

To export data from a database:

1. In **databases**, click on the database that you want to export data from.
1. In **configuration**, at the bottom of the page click **Export**.
1. Select the location type to export the data to and enter the connection details.
1. Select **Receive email notification on success/failure**, if you want to receive
    email notifications about the import process.
1. Click **Export**.

{{< embed-md "backup-locations.md" >}}
