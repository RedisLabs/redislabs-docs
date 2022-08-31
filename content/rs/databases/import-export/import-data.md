---
Title: Import data into a database
description: You can import export or backup files of a specific Redis Enterprise Software database to restore data. You can either import from a single file or from multiple files, such as when you want to import from a backup of a clustered database.
weight: 10
alwaysopen: false
categories: ["RS"]
linktitle: Import data
aliases: [ 
    /rs/administering/database-operations/importing-data/,
    /rs/administering/database-operations/administering-database-operations-importing-data/,
    /rs/databases/import-export/import-data.md,
    /rs/databases/import-export/importing-data/,
    /rs/databases/import-export/import-data.md,
    /rs/databases/import-export/import-data/,
]
---
You can import, [export]({{< relref "/rs/databases/import-export/export-data.md" >}}),
or [backup]({{< relref "/rs/databases/import-export/schedule-backups.md" >}})
files of a specific Redis Enterprise Software database to restore data.
You can either import from a single file or from multiple files,
such as when you want to import from a backup of a clustered database.

{{< warning >}}
Importing data erases all existing content in the database.
{{< /warning >}}

## Import data into a database

To import data into a database:

1. Sign in to the admin console and then select **Databases** from the main menu.
1. Select the target database from the list.
1. From the **Configuration** tab, locate and then select the **Import** button.
1. Acknowledge the warning to continue the operation.
1. From the **Import** dialog, enter the details for the import data.  These vary according to the storage location.
1. To receive email notifications, place a checkmark in the **Receive email notification on success/failure** option.
1. Select **Import**.

## Supported storage services

You can import data from a variety of services, ranging from local servers to cloud services.

Earlier versions of Redis Enterprise Software supported OpenStack Swift a storage location; however, that support ended [30 November 2020]({{< relref "/rs/release-notes/rs-5-6-0-april-2020#end-of-life" >}}).  As a result, that option is no longer available.

### HTTP server

To import RDB files from an HTTP server, enter the path to the files. You must enter
each path on a separate line.

### FTP server

Before you specify to import from an FTP server, make sure that:

- The Redis Enterprise cluster has network connectivity to the FTP server.
- The user that you specify in the FTP server location has read privileges.

To import an RDB file from an FTP server, enter the FTP server location in the format:

```sh
ftp://user:password@host<:custom_port>/path/filename.rdb
```

For example: `ftp://username:password@10.1.1.1/home/backups/<filename>.rdb`

### SFTP server

Before you specify to import from an SFTP server, make sure that:

- The Redis Enterprise cluster has network connectivity to the SFTP server.
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

### Azure Blob Storage

Before you choose to import from Azure Blob Storage, make sure that you have:

- Storage location path in the format: `/container_name/[path/]/<filename>.rdb`
- Account name
- An authentication token, either an account key or an Azure [shared access signature](https://docs.microsoft.com/en-us/rest/api/storageservices/delegate-access-with-shared-access-signature) (SAS).

Azure SAS support requires Redis Software version 6.0.20.  To learn more about Azure SAS, see [Grant limited access to Azure Storage resources using shared access signatures](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview).

### Google Cloud Storage

Before you choose to import from Google Cloud Storage, make sure that you have:

- Storage location path in the format: `/bucket_name/[path/]/<filename>.rdb`
- Client ID
- Client email
- Private key ID
- Private key

## Importing into an Active-Active database

When importing data into an Active-Active database, there are two options:

- Use `flushall` to delete all data from the Active-Active database, then import the data into the database.
- Import data but merge it into the existing data or add new data from the import file.

Because Active-Active databases have a numeric counter data type,
when you merge the imported data into the existing data RS increments counters by the value that is in the imported data.
The import through the Redis Enterprise admin console handles these data types for you.

You can import data into an Active-Active database [from the admin console]({{< relref "/rs/databases/import-export/import-data.md" >}}).
When you import data into an Active-Active database, there is a special prompt.

![Import into an Active-Active database](/images/rs/import-to-active-active-warning.png)
