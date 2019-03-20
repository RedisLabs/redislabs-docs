---
Title: Exporting Data from Redis Enterprise
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can [schedule backups]({{< relref "/rs/administering/database-operations/exporting-data.md" >}})
of a specific database to make sure you always have valid backups.
You can also export the data from a specific database at any time.

You can export a database to these locations:

- FTP server
- SFTP server
- Amazon S3
- Local mount point
- OpenStack Swift (Object Storage)

Other cloud storage options, including Azure Geo-Redundant Storage and Google Cloud Storage,
are planned for a future release.

The backup process creates compressed (.gz) RDB files that you can [import into a database]
({{< relref "/rs/administering/database-operations/importing-data.md" >}}).
If you backup a database configured for database clustering,
RS copies a backup file for each shard to the specified backup location.

{{% note %}}
Make sure that you have enough space available in your storage location.
If there is not enough space in the backup location, the backup fails.
{{% /note %}}

## Exporting Data From a Database

To export data from a database:

1. In **databases**, click on the database that you want to export data from.
1. In **configuration**, at the bottom of the page click **Export**.
1. Select the location type to export the data to and enter the connection details.
1. Select **Receive email notification on success/failure**, if you want to receive
    email notifications about the import process.
1. Click **Export**.

{{< embed-md "backup-locations.md" >}}