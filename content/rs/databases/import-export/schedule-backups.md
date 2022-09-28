---
Title: Schedule periodic backups
linktitle: Schedule backups
description: You can manually export your data from a specific Redis Enterprise Software database at any time. You can also schedule backups of your databases to make sure you always have valid backups.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/database-backup/,
    /rs/administering/database-operations/database-backup.md,
    /rs/databases/import-export/database-backup.md,
    /rs/databases/import-export/database-backup/,
    /rs/databases/import-export/schedule-backups.md,
    /rs/databases/import-export/schedule-backups/,
]
---

Periodic backups provide a way to restore data with minimal data loss.  With Redis Enterprise Software, you can schedule periodic backups to occur once a day (every 24 hours), twice a day (every twelve hours), every four hours, or every hour.

As of v6.2.8, you can specify the start time for twenty-four or twelve hour backups.

To make an on-demand backup, [export your data]({{< relref "/rs/databases/import-export/export-data.md" >}}).

You can schedule backups to a variety of locations, including:

- FTP server
- SFTP server
- Local mount point
- Amazon Simple Storage Service (S3)
- Azure Blob Storage
- Google Cloud Storage

The backup process creates compressed (.gz) RDB files that you can [import into a database]({{< relref "/rs/databases/import-export/import-data.md" >}}).

When you back up a database configured for database clustering,
Redis Enterprise Software creates a backup file for each shard in the configuration.  All backup files are copied to the storage location.

{{< note >}}

- Make sure that you have enough space available in your storage location.
    If there is not enough space in the backup location, the backup fails.
- The backup configuration only applies to the database it is configured on.

{{< /note >}}

## Schedule periodic backups

Before scheduling periodic backups, verify that your storage location exists and is available to the user running Redis Enterprise Software (`redislabs` by default).  You should verify that:

- Permissions are set correctly
- The user running Redis Enterprise Software is authorized to access the storage location
- The authorization credentials work

Storage location access is verified before periodic backups are scheduled.

To schedule periodic backups for a database:

1.  Sign in to the Redis Enterprise Software admin console using admin credentials.
2.  From the admin console, choose **Databases** and then select your database.
3.  Select the **Edit** button.
4.  Locate and enable the **Periodic backup** checkbox.

    {{<image filename="images/rs/database-configuration-periodic-backup.png" alt="In the admin console, the Periodic backup settings can be found on the Configuration details tab of the database." >}}{{< /image >}}

6.  Use the following table to help specify the details:

    | Setting | Description |
    |--------------|-------------|
    | **Interval** | Specifies the frequency of the backup; that is, the time between each backup snapshot.<br/><br/>Supported values include _Every 24 hours_, _Every 12 hours_, _Every 4 hours_, and _Every hour_. |
    | **Set starting time** | _v6.2.8 or later:&nbsp;_ Specifies the start time for the backup; available when **Interval** is set to _Every 24 hours_ or _Every 12 hours_.<br/><br/>If not specified, defaults to a time selected by Redis Enterprise Software. |
    | **Choose storage type** | Specifies the storage type for the backup.  Supported options vary and might require additional details.  To learn more, see [Supported storage locations](#supported-storage-locations).

7.  Select **Update** to apply your changes.

Access to the storage location is verified when you apply your updates.  This means the location, credentials, and other details must exist and function before you can enable periodic backups.

## Default backup start time

If you do _not_ specify a start time for twenty-four or twelve hour backups, Redis Enterprise Software chooses a random starting time for you.

This choice assumes that your database is deployed to a multi-tenant cluster containing multiple databases.  This means that default start times are staggered (offset) to ensure availability.  This is done by calculating a random offset which specifies a number of seconds added to the start time.  

Here's how it works:

- Assume you're enabling the backup at 4:00 pm (1600 hours).
- You choose to back up your database every 12 hours.
- Because you didn't set a start time, the cluster randomly chooses an offset of 4,320 seconds (or 72 minutes).

This means your first periodic backup occurs 72 minutes after the time you enabled periodic backups (4:00&nbsp;pm&nbsp;+&nbsp;72&nbsp;minutes).  Backups repeat every twelve hours at roughly same time.

The backup time is imprecise because they're started by a trigger process that runs every five minutes.  When the process wakes, it compares the current time to the scheduled backup time.  If that time has passed, it triggers a backup.  

If the previous backup fails, the trigger process retries the backup until it succeeds.

In addition, throttling and resource limits also affect backup times.

For help with specific backup issues, [contact support](https://redis.com/company/support/).


## Supported storage locations {#supported-storage-locations}

Database backups can be saved to a local mount point, transferred to [a URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) using FTP/SFTP, or stored on cloud provider storage.

When saved to a local mount point or a cloud provider, backup locations need to be available to [the group and user]({{< relref "/rs/installing-upgrading/customize-user-and-group.md" >}}) running Redis Enterprise Software, `redislabs:redislabs` by default.  

Redis Enterprise Software needs the ability to view permissions and update objects in the storage location. Implementation details vary according to the provider and your configuration. To learn more, consult the provider's documentation.

The following sections provide general guidelines.  Because provider features change frequently, use your provider's documentation for the latest info.

### FTP server

Before enabling backups to an FTP server, verify that:

- Your Redis Enterprise cluster can connect and authenticate to the FTP server.
- The user specified in the FTP server location has read and write privileges.

To store your backups on an FTP server, set its **Backup Path** using the following syntax:

`ftp://[username]:[password]@[host]:[port]/[path]/`

Where:

- *protocol*: the server's protocol, can be either `ftp` or `ftps`.
- *username*: your username, if needed.
- *password*: your password, if needed.
- *hostname*: the hostname or IP address of the server.
- *port*: the port number of the server, if needed.
- *path*: the backup path, if needed.

Example: `ftp://username:password@10.1.1.1/home/backups/`

The user account needs permission to write files to the server.

### SFTP server

Before enabling backups to an SFTP server, make sure that:

- Your Redis Enterprise cluster can connect and authenticate to the SFTP server.
- The user specified in the SFTP server location has read and write privileges.
- The SSH private keys are specified correctly.  You can use the key generated by the cluster or specify a custom key.

    When using the cluster auto generated key, copy the **Cluster SSH Public Key** to the appropriate location on the SFTP server.  This is available from the **General** tab of the **Settings** menu in the admin console.

    Use the server documentation to determine the appropriate location for the SSH Public Key.

To backup to an SFTP server, enter the SFTP server location in the format:

```sh
sftp://user:password@host<:custom_port>/path/
```

For example: `sftp://username:password@10.1.1.1/home/backups/`

### Local mount point

Before enabling periodic backups to a local mount point, verify that:

- The node can connect to the destination server, the one hosting the mount point.
- The `redislabs:redislabs` user has read and write privileges on the local mount point
and on the destination server.
- The backup location has enough disk space for your backup files. Backup files
are saved with filenames that include the timestamp, which means that earlier backups are not overwritten.

To back up to a local mount point:

1. On each node in the cluster, create the mount point:
    1. Connect to a shell running on Redis Enterprise Software server hosting the node.
    1. Mount the remote storage to a local mount point.

        For example:

        ```sh
        sudo mount -t nfs 192.168.10.204:/DataVolume/Public /mnt/Public
        ```

1. In the path for the backup location, enter the mount point.

    For example: `/mnt/Public`

1. Verify that the user running Redis Enterprise Software has permissions to access and update files in the mount location.

### AWS Simple Storage Service

To store backups in an Amazon Web Services (AWS) Simple Storage Service (S3) [bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html):

1.  Sign in to the [AWS Management Console](https://console.aws.amazon.com/).

1. [Create an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html) if you do not already have one.

1. Create an access key if you do not already have one.

    - For an AWS root user, see [Creating access keys for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_add-key).

    - For an AWS Identity and Access Management (IAM) user, see [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

1. In the Redis Enterprise Software admin console, when you enter the backup location details:

    - Select "AWS S3" from the **Choose storage type** drop-down.

    - In the **Path** field, enter the path of your bucket.

    - In the **Access key ID** field, enter the access key ID.

    - In the **Secret access key** field, enter the secret access key.

### GCP Storage

For [Google Cloud Platform (GCP) console](https://developers.google.com/console/) subscriptions, store your backups in a Google Cloud Storage bucket:

1. Sign in to Google Cloud Platform console.

1. [Create a JSON service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating) if you do not already have one.

1. [Create a bucket](https://cloud.google.com/storage/docs/creating-buckets#create_a_new_bucket) if you do not already have one.

1. [Add a principal](https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add) to your bucket:

    - In the **New principals** field, add the `client_email` from the service account key.

    - Select "Storage Legacy Bucket Writer" from the **Role** list.

1. In the Redis Enterprise Software admin console, when you enter the backup location details:

    - Select "Google Cloud Storage" from the **Choose storage type** drop-down.

    - In the **Path** field, enter the path of your bucket.

    - In the **Client id** field, enter the `client_id` from the service account key.

    - In the **Client email** field, enter the `client_email` from the service account key.

    - In the **Private key id** field, enter the `private_key_id` from the service account key.

    - In the **Private key** field, enter the `private_key` from the service account key.
      Replace `\n` with new lines, and then select the **Save** icon.

### Azure Blob Storage

To store your backup in Microsoft Azure Blob Storage, sign in to the Azure portal and then:

To export to Microsoft Azure Blob Storage, sign in to the Azure portal and then:

1. [Create an Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create) if you do not already have one.

1. [Create a container](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) if you do not already have one.

1. [Manage storage account access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage) to find the storage account name and account keys.

1. In the Redis Enterprise Software admin console, when you enter the backup location details:

    - Select "Azure Blob Storage" from the **Choose storage type** drop-down.

    - In the **Path** field, enter the path of your bucket.

    - In the **Account name** field, enter your storage account name.

    - In the **Account key** field, enter the storage account key.

To learn more, see [Authorizing access to data in Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth).
