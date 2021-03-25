---
Title: Importing Data into a Database
description:
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/database-operations/importing-data/
        /rs/administering/database-operations/administering-database-operations-importing-data/
---
You can import [export]({{< relref "/rs/administering/import-export/exporting-data.md" >}})
or [backup]({{< relref "/rs/administering/import-export/database-backup.md" >}})
files of a specific Redis Enterprise Software (RS) database to restore data.
You can either import from a single file or from multiple files,
such as when you want to import from a backup of a clustered database.

{{< warning >}}
Importing data erases all existing content in the database.
{{< /warning >}}

## Importing data into a database

To import data into a database:

1. In **databases**, click on the database that you want to import data to.
1. In **configuration**, at the bottom of the page click **Import**.
1. Select the location to import the data from and enter the connection details.
1. Select **Receive email notification on success/failure**, if you want to receive
    email notifications about the import process.
1. Click **Import**.

## Supported storage services

The storage services that are supported for import are:

### HTTP server

To import RDB files from an HTTP server, enter the path to the files. You must enter
each path on a separate line.

### FTP server

Before you specify to import from an FTP server, make sure that:

- The RS cluster has network connectivity to the FTP server.
- The user that you specify in the FTP server location has read privileges.

To import an RDB file from an FTP server, enter the FTP server location in the format:

```sh
ftp://user:password@host<:custom_port>/path/filename.rdb
```

For example: `ftp://username:password@10.1.1.1/home/backups/<filename>.rdb`

### SFTP server

Before you specify to import from an SFTP server, make sure that:

- The RS cluster has network connectivity to the SFTP server.
- The user that you specify in the SFTP server location has read privileges.
- The RS server and SFTP server have the correct TLS certificates. You can select either:
    - **Use the cluster auto generated key** - Go to **settings** and copy the **Cluster SSH Public Key**
        to the SFTP server.
    - **Use a custom key** - Generate a TLS key pair for the SFTP server, copy the private key to
        the **SSH Private Key** box, and copy the public key to the SFTP server.

To import from an SFTP server, enter the SFTP server location in the format:

```sh
sftp://user:password@host<:custom_port>/path/filename.rdb
```

For example: `sftp://username:password@10.1.1.1/home/backups/<filename>.rdb`

### AWS S3

Before you import from Amazon S3, make sure that you have:

- Path in the format: `s3://bucketname/path/<filename>.rdb`
- Access key ID
- Secret access key

You can also connect to a storage service that uses the S3 protocol but is not hosted by Amazon AWS. The storage service must have a valid SSL certificate. To connect to an S3-compatible storage location, run: `rladmin cluster config s3_url <url>`

### Local mount point

Before you specify to import from a local mount point, make sure that:

- The node has network connectivity to the destination server of the mount point.
- The `redislabs:redislabs` user has read privileges on the local mount point
and on the destination server.
- You must mount the storage in the same path on all cluster nodes.
    You can also use local storage but you must copy the imported files manually to all nodes
    because the import source folders on the nodes are not synchronized.

To specify to import from a local mount point on a node:

1. Create the mount point:
    1. Connect to the terminal of the RS server that the node is running on.
    1. Mount the remote storage to a local mount point.

        For example:

        ```sh
        sudo mount -t nfs 192.168.10.204:/DataVolume/Public /mnt/Public
        ```

1. In the path for the backup location, enter the mount point.

    For example: `/mnt/Public/<filename>.rdb`

### OpenStack Swift

{{< note >}}
Support for OpenStack Object Storage ("Swift") for backup, import and export location ends on November 30, 2020.
{{< /note >}}

Before you specify to import from OpenStack Swift, make sure that you have:

- Storage URL in the format: `https://<openstack_url>/v1/<filename>.rdb`
- Container
- Prefix (Optional)
- User
- Key

### Azure Blob Storage

Before you choose to import from Azure Blob Storage, make sure that you have:

- Storage location path in the format: `/container_name/[path/]/<filename>.rdb`
- Account name
- Account key

### Google Cloud Storage

Before you choose to import from Google Cloud Storage, make sure that you have:

- Storage location path in the format: `/bucket_name/[path/]/<filename>.rdb`
- Client ID
- Client email
- Private key ID
- Private key

## Importing into an Active-Active database

When importing data into an Active-Active database, there are two options:

- Perform a flushall to the database, thus deleting all data.
    Then import the data into the Active-Active database.
- Import data but merge it into the existing or add new data from the import file.

Because Active-Active databases have a numeric counter data type,
when you merge the imported data into the existing data RS increments counters by the value that is in the imported data.
The import through the Redis Enterprise admin console handles these data types for you.

You can import data into an Active-Active database [from the admin console]({{< relref "/rs/administering/import-export/importing-data.md" >}}).
When you import data into an Active-Active database, there is a special prompt.

![Import into an Active-Active database](/images/rs/import-to-active-active-warning.png)
