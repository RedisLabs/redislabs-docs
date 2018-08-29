---
Title: Periodic Backups
description: 
weight: $weight
alwaysopen: false
---
You can back up your dataset to an FTP server, Amazon S3, or OpenStack
Object Storage ("Swift"), periodically, or ad-hoc. You cannot back up to
the local machine.

Other cloud storage options, such as Azure Geo-Redundant Storage,
SoftLayer Object Storage and Google Cloud Storage will be added in a
future release.

The backup process creates compressed (.gz) RDB files.

**Note**: It is your responsibility to manage the backup location; Redis
Enterprise Software does not delete old backups or monitor the amount of
space left in the folder.

### FTP location

Backing up to FTP requires permissions to read and write to the FTP
location. If needed, you can specify the username and password for the
FTP location as part of the path with the following structure:
ftp://user:password\@host:port/path/

### Amazon S3 or OpenStack Swift location

To backup to Amazon S3 or OpenStack Swift, select the location type and
enter the details in relevant fields. Ensure first that you have all
these details from your selected platform.

### Periodic backup

You can configure the database to be periodically backed up to a chosen
location. If you do so, specify the interval of how often to back up the
database: every 4, 12, or 24 hours.

### Ad-hoc backup - Export

You can, at any time, backup any database as described in [Exporting
data from a
database]({{< relref "/rs/administering/database-operations/exporting-data.md" >}}).

### Backup of a sharded database

If you backup a database configured for database clustering, the system
creates a backup file for each shard, and places all these backup files
in the specified backup location.
