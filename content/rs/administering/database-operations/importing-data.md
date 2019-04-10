---
Title: Importing Data into Redis Enterprise
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can import [export]({{< relref "/rs/administering/database-operations/exporting-data.md" >}})
or [backup]({{< relref "/rs/administering/database-operations/database-backup.md" >}})
files of a specific database to restore data.
You can either import from a single file or from multiple files,
such as when you want to import from a backup of a sharded database.

You can import data from these locations:

- HTTP server
- FTP server
- SFTP server
- Amazon S3
- Local mount point
- OpenStack Swift (Object Storage)

{{% warning %}}
Importing data erases all existing content in the database.
{{% /warning %}}

## Importing data into a database

To import data into a database:

1. In **databases**, click on the database that you want to import data to.
1. In **configuration**, at the bottom of the page click **Import**.
1. Select the location to import the data from and enter the connection details.
1. Select **Receive email notification on success/failure**, if you want to receive
    email notifications about the import process.
1. Click **Import**.

### HTTP server

To import RDB files from an HTTP server, enter the path to the files. You must enter
each path on a separate line.

### FTP server

Before you specify to import from an FTP server, make sure that:

- The RS cluster has network connectivity to the FTP server.
- The user that you specify in the FTP server location has read priviledges.

To import an RDB file from an FTP server, enter the FTP server location in the format:

```src
ftp://user:password@host<:custom_port>/path/filename.rdb
```

For example: `ftp://username:password@10.1.1.1/home/backups/backup.rdb`

### SFTP server

Before you specify to import from an SFTP server, make sure that:

- The RS cluster has network connectivity to the SFTP server.
- The user that you specify in the SFTP server location has read priviledges.
- The RS server and SFTP server have the correct TLS certificates. You can select either:
    - **Use the cluster auto generated key** - Go to **settings** and copy the **Cluster SSH Public Key**
        to the SFTP server.
    - **Use a custom key** - Generate a TLS key pair for the SFTP server, copy the private key to
        the **SSH Private Key** box, and copy the public key to the SFTP server.

To import from an SFTP server, enter the SFTP server location in the format:

```src
sftp://user:password@host:<:custom_port>/path/filename.rdb
```

For example: `sftp://username:password@10.1.1.1/home/backups/backup.rdb`

### AWS S3

Before you import from Amazon S3, make sure that you have:

- Path in the format: `s3://bucketname/path/filename.rdb`
- Access key ID
- Secret access key

### Local mount point

Before you specify to import from a local mount point, make sure that:

- The node has network connectivity to the destination server of the mount point.
- The `redislabs:redislabs` user has read priviledges on the local mount point
and on the destination server.

To specify to import from a local mount point on a node:

1. Create the mount point:
    1. Connect to the terminal of the RS server that the node is running on.
    1. Mount the remote storage to a local mount point.

        For example:

        ```src
        sudo mount -t nfs 192.168.10.204:/DataVolume/Public /mnt/Public
        ```

1. In the path for the backup location, enter the mount point.

    For example: `/mnt/Public/backup.rbd`

### OpenStack Swift

Before you specify to import from OpenStack Swift, make sure that you have:

- Storage URL in the format: `https://<openstack_url>/v1`
- Container
- Prefix (Optional)
- User
- Key
