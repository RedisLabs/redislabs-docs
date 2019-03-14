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

To backup to a local mount point for a node:

{{% note %}}
You must configure the mount point for each node that you want to backup.
{{% /note %}}

1. Connect to the terminal of the RS server that the node is running on.
1. Mount the remote storage to a local mount point.

    For example:

    ```src
    sudo mount -t nfs 192.168.10.204:/DataVolume/Public /mnt/Public
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
