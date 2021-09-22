---
Title: Schedule periodic backups
description: You can manually export your data from a specific Redis Enterprise Software database at any time. You can also schedule backups of your databases to make sure you always have valid backups.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/database-operations/database-backup/
---
You can manually [export your data]({{< relref "/rs/administering/import-export/exporting-data.md" >}})
from a specific Redis Enterprise Software database at any time.

You can also schedule backups of your databases to make sure you always have valid backups.
The backup process can be scheduled for every 1, 4, 12 or 24 hours from the time that you save the backup configuration.

You can schedule backups to these locations:

- FTP server
- SFTP server
- Amazon S3
- Local mount point
- Azure Blob Storage
- Google Cloud Storage

The backup process creates compressed (.gz) RDB files that you can [import into a database]({{< relref "/rs/administering/import-export/importing-data.md" >}}). 

When you back up a database configured for database clustering,
Redis Enterprise Software creates a backup file for each shard in the configuration.  All backup files are copied to the storage location.

{{< note >}}

- Make sure that you have enough space available in your storage location.
    If there is not enough space in the backup location, the backup fails.
- The backup configuration only applies to the node it is configured on.

{{< /note >}}

## Schedule periodic backups

To schedule periodic backups for a database:

1.  Sign in to the Redis Enterprise Software admin console using admin credentials.
2.  From the admin menu, choose **Databases** and then select the database.
3.  Select the **Edit** button.
4.  Locate the **Periodic backup** checkbox and then select it.

    {{<image filename="images/rs/database-configuration-periodic-backup.png" alt="In the admin console, the Periodic backup settings can be found on the Configuration details tab of the database." >}}{{< /image >}}
    

5.  Set **Interval** to the desired backup frequency.  Backups can be scheduled to occur _every 24 hours_, _every 12 hours_, _every 4 hours_ or _every hour_.

6.  Choose the **Storage location** for the backup file.  See [storage locations](#storage-locations) for details.

    Note that the storage location must be accessible before enabling periodic backups.

7.  Enter the access details for the selected storage location. 


{{< embed-md "backup-locations.md" >}}
