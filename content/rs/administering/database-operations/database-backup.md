---
Title: Scheduled Backups
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can manually [export your data]({{< relref "/rs/administering/database-operations/exporting-data.md" >}})
from a specific database at any time.
You can also schedule backups of your databases to make sure you always have valid backups.
The backup process can be scheduled for every 1, 4, 12 or 24 hours from the time that you save the backup configuration.

You can schedule backups to these locations:

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
- Make sure that you have enough space available in your storage location.
If there is not enough space in the backup location, the backup fails.
- The backup configuration only applies to the node it is configured on.
{{% /note %}}

## Scheduling Periodic Backups

To schedule periodic backups for a database:

1. In **databases**, click on the database that you want to configure backups for.
1. In **configuration**, select **Periodic backup**.
1. Select an interval for the backups to run either every **1**, **4**, **12** or **24** hours.
1. Select one of the available storage types.
1. Enter the details for the selected storage type.
1. To save the database configuration, click **Update**.

{{< embed-md "backup-locations.md" >}}