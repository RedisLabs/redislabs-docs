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

Other cloud storage options, such as Azure Geo-Redundant Storage,
SoftLayer Object Storage and Google Cloud Storage are planned for a
future release.

The backup process creates compressed (.gz) RDB files that you can [import into a database]
({{< relref "/rs/administering/database-operations/importing-data.md" >}}).
If you backup a database configured for database clustering,
RS copies a backup file for each shard to the specified backup location.

{{% note %}}
Make sure that you have enough space available in your storage location.
If there is not enough space in the backup location, the backup fails.
{{% /note %}}

## Configuring Scheduled Backups

To schedule backups for a database:

1. Go to: **databases**
1. Click on the database that you want to configure backups for.
1. In **configuration**, select **Periodic backup**.
1. Select an interval for the backups to run either every **1**, **4**, **12** or **24** hours.
1. Select one of the available storage types.
1. Enter the details for the selected storage type.

### FTP server

Before you configure backups to an FTP server, make sure that:

- The RS instance has network connectivity to the FTP server.
- The user that you specify in the FTP server location has read and write priviledges.

To backup to an FTP server, enter the FTP server location in the format:

```src
ftp://user:password@host:port/path/
```

For example: `ftp://username:password@10.1.1.1:22/home/backups/

### SFTP server

Before you configure backups to an SFTP server, make sure that:

- The RS instance has network connectivity to the SFTP server.
- The user that you specify in the SFTP server location has read and write priviledges.
- The RS server and SFTP server have the correct TLS certificates. You can select either:
    - **Use the cluster auto generated key** - Go to settings and copy the **Cluster SSH Public Key**
        to the SFTP server.
    - **Use a custom key** - Generate a TLS key pair for the SFTP server and copy the private key to
        the **SSH Private Key** box.

To backup to an FTP server, enter the FTP server location in the format:

```src
sftp://user:password@host:port/path/
```

For example: `ftp://username:password@10.1.1.1:22/home/backups/

### Amazon S3

Before you configure backups to OpenStack Swift, make sure that you have:

- Path in the format: `s3://bucketname/foldername/`
- Access key ID
- Secret access key

### Local mount point

To backup to a local mount point:

1. Connect to the terminal of the RS server.
1. Mount the remote storage to a local mount point.

    For example:

    ```src
    sudo mount fs.efs.us-east-1.amazonaws.com:/ /home/efs
    ```

1. In the path for the backup location, enter the mount point.

    For example:

    ```src
    `/home/efs`
    ```

### OpenStack Swift

Before you configure backups to OpenStack Swift, make sure that you have:

- Storage URL in the format: `https://openstack_url/v1`
- Container
- Prefix (Optional)
- User
- Key
