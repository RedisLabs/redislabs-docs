---
Title: Schedule periodic backups
description: You can manually export your data from a specific Redis Enterprise Software database at any time. You can also schedule backups of your databases to make sure you always have valid backups.
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/database-backup/,
    /rs/administering/database-operations/database-backup.md,
    /rs/databases/import-export/database-backup.md,
    /rs/databases/import-export/database-backup/,
]
---

Periodic backups provide a way to restore data with minimal data loss.  With Redis Enterprise Software, you can schedule periodic backups to occur every once a day (every 24 hours), twice a day (every twelve hours), every four hours, or every hour.

As of v6.2.8, you can specify the start time for twenty-four or twelve hour backups.

To make an on-demand backup, [export your data]({{< relref "/rs/databases/import-export/exporting-data.md" >}}).

You can schedule backups to a variety of locations, including:

- FTP server
- SFTP server
- Local mount point
- Amazon Simple Storage Service (S3)
- Azure Blob Storage
- Google Cloud Storage

The backup process creates compressed (.gz) RDB files that you can [import into a database]({{< relref "/rs/databases/import-export/importing-data.md" >}}). 

When you back up a database configured for database clustering,
Redis Enterprise Software creates a backup file for each shard in the configuration.  All backup files are copied to the storage location.

{{< note >}}

- Make sure that you have enough space available in your storage location.
    If there is not enough space in the backup location, the backup fails.
- The backup configuration only applies to the node it is configured on.

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

If you do _not_ specify a start time for twenty-four or twelve hour backups, Redis Enterprise Software chooses one for you, based on the time the backups are enabled.

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

1.  Use the **Services** menu to locate and select **Storage** > **S3**.  This takes you to the Amazon S3 admin panel.

1.  If you do not already have a bucket for backups, select the **Create Bucket** button in the upper, right corner of the **Buckets** panel.

    1.  When the **Create bucket** screen appears, enter a name for your bucket.

    1.  Set **AWS Region** to an appropriate region.

    1.  Set other properties according to your company standards.

    1.  When finished, select the **Create bucket** button near the bottom of the screen.

1.  Use the Buckets list to locate and select your bucket.  When the settings appear, select the **Permissions** tab, locate the **Access control list (ACL)** section, and then select the **Edit** button.

1.  When the **Edit access control list (ACL)** screen appears, locate the **Access for other AWS accounts** section and then select the **Add grantee** button.

    1.  In the **Grantee** field, enter the AWS account ID:
    
    ```
    fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614
    ```

    1.  In the **Objects** list, enable **Write**.
    1.  In the **Bucket ACL** list, enable **Read** and **Write**.
    1.  When finished, select the **Save changes** button.

Once the bucket is available and the permissions are set, use the name of your bucket as the **Backup destination** for your database **Remote backup settings**. 

Use the S3 protocol scheme (`s3://`) to set *backups-bucket* to the name of your backup bucket.  If, for example, your bucket is named *backups-bucket*, set **Backup destination** to `s3://backups-bucket`.

### GCP Storage 

For [Google Cloud Platform (GCP)
console](https://developers.google.com/console/) subscriptions, store your backups in a Google Cloud Storage bucket:

1. Sign in to Google Cloud Platform console.

1. In the admin console menu, locate the _Storage_ section then select **Cloud Storage&nbsp;>&nbsp;Browser**.

1. Create or select a bucket.

1. Select the [overflow menu](https://material.io/components/app-bars-top#anatomy) (three dots, stacked) and then select the **Edit Bucket Permissions** command.

1. Select the **Add members** button and then add:

    `service@redislabs-prod-clusters.iam.gserviceaccount.com`

1. Set **Role** to **Storage Legacy** | **Storage Legacy Bucket Writer**.

1. Save your changes.

1. Verify that your bucket does _not_ have a set retention policy.  

    To do so:

    1. View the details of your bucket.

    1. Select the **Retention** tab.
    
    1. Verify that there is no retention policy.  
    
    If a policy is defined and you cannot delete it, you need to use a different bucket.

Use the bucket details **Configuration** tab to locate the **gsutil URI**.  This is the value you'll assign to your resource's backup path.

### Azure Blob Storage 

To store your backup in Microsoft Azure Blob Storage, sign in to the Azure portal and then:

1. [Create an Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create) if you do not already have one

1. [Create a container](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) if you do not already have one

1. [Manage storage account access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage)

Set your resource's **Backup Path** to the path of your storage account.

The syntax for creating the backup varies according to your authorization mechanism.  For example:

`abs://storage_account_access_key@storage_account_name/container_name/[path/]`

Where:

- *storage_account_access_key:* the primary access key to the
    storage account
- *storage_account_name:* the storage account name
- *container_name:* the name of the container, if needed.
- *path*: the backups path, if needed.

To learn more, see [Authorizing access to data in Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth)

