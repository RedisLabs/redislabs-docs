---
Title: Back up a database
description:
weight: 35
alwaysopen: false
categories: ["RC"]
linktitle: Back up data
aliases: [ "/rv/administration/configure/backups/",
           "/rc/administration/configure/backups/",
           "/rv/administration/configuration/backups/",
           "/rc/administration/configuration/backups.md",
           "/rc/administration/configuration/backups/",
           "/rc/databases/backups/" ]
---

The backup options for Redis Enterprise Cloud databases depend on your plan:

- Flexible and Annual subscriptions can perform backups on-demand and schedule daily backups that occur during a set hour.

- Paid Fixed plans can perform backups on-demand and schedule backups that occur every 24 hours.  

- Free plans cannot perform backups through the Redis Cloud console.

Backups are saved to predefined storage locations available to your subscription.

Backup locations need to be available before you turn on database backups.  To learn more, see [Set up backup storage locations](#set-up-backup-storage-locations)

Here, you'll learn how to store backups using different cloud providers.

## Turn on backups

To turn on database backups:

1. Sign in to the Redis Cloud [admin portal](https://app.redislabs.com/new/).  (Create an account if you don't already have one.)

2. If you have more than one subscription, select the target subscription from the list.  This displays the **Databases** tab for the selected subscription.

    {{<image filename="images/rc/subscription-flexible-databases-tab-pending.png" alt="The Databases tab summarizes databases created for a given subscription." >}}{{< /image >}}

3.  Select the database to open the **Database** page and then select **Edit database**.

    {{<image filename="images/rc/database-details-configuration-tab-general-flexible.png" alt="The Configuration tab of the Database details screen." >}}{{< /image >}}

4.  In the **Durability** section of the **Configuration** tab, locate the **Remote backup** setting:

    {{<image filename="images/rc/database-details-configuration-tab-durability-flexible.png" alt="The Remote backup setting is located in the Durability section of the Configuration tab of the database details screen." >}}{{< /image >}}

When you enable **Remote backup**, additional options appear.  The options vary according to your subscription.

{{<image filename="images/rc/database-details-configuration-durability-backup.png" alt="Backup settings appear when you enable the Remote backup settings." >}}{{< /image >}}

|Setting name|Description|
|:-----------|:----------|
| **Interval** | Defines the frequency of automatic backups.  Paid fixed accounts are backed up every 24 hours.  Flexible and Annual subscriptions can be set to 24, 12, 6, 4, 2, or 1 hour backup intervals. |
| **Set backup time** | When checked, this lets you set the hour of the **Backup time**. (_Flexible and Annual  subscriptions only_) |
| **Backup time** | Defines the hour automatic backups are made.  Note that actual backup times will vary up in order to minimize customer access disruptions.  (_Flexible and Annual  subscriptions only_)<br/> Times are expressed in [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (UTC).|
| **Storage type** | Defines the provider of the storage location, which can be: `AWS S3`, `Google Cloud Storage`, `Azure Blob Storage`, or `FTP` (FTPS). |
| **Backup destination** | Defines a URI representing the backup storage location. |

## Back up data on demand

After backups are turned on, you can back up your data at any time.  Use the **Backup now** button in the **Durability** section.

{{<image filename="images/rc/button-database-backup-now.png" alt="Use the Backup Now button to make backups on demand." >}}{{< /image >}}

You can only use the **Backup now** button after you turn on backups.

## Set up backup storage locations

Database backups can be stored to a cloud provider service or saved to a URI using FTP/FTPS.

When stored to a cloud provider, backup locations need to be available on the same provider in the same region as your subscription.

Your subscription needs the ability to view permissions and update objects in the storage location.  Specific details vary according to the provider.  To learn more, consult the provider's documentation.

The following sections help set things up; however, provider features change frequently.  For best results, use your provider's documentation for the latest info.

### AWS S3

To store backups in an Amazon Web Services (AWS) Simple Storage Service (S3) [bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html):

1. In the [AWS Management Console](https://console.aws.amazon.com/), use the **Services** menu to locate and select **Storage** > **S3**.  This takes you to the Amazon S3 admin panel.

1.  Use the Buckets list to locate and select your bucket.  When the settings appear, select the **Permissions** tab, locate the **Access control list (ACL)** section, and then select the **Edit** button.

1.  When the **Edit access control list (ACL)** screen appears, configure the bucket's Access Control List to give access to Redis Enterprise Cloud.
    1. Select **Add grantee**.
    1. In the **Grantee** field, enter:
    `fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614`
    1. In the **Objects** list, select **Write**.
    1. In the **Bucket ACL** list, select **Read** and **Write**.
    1. Select **Save**.

Once the bucket is available and the permissions are set, use the name of your bucket as the **Backup destination** for your database's Remote backup settings. For example, suppose your bucket is named *backups-bucket*.  In that case, set **Backup destination** to `s3://backups-bucket`.

To learn more, see [Configuring ACLs for buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html) on the AWS docs.

### Google Cloud Storage

For [Google Cloud](https://developers.google.com/console/) subscriptions, store your backups in a Google Cloud Storage bucket:

1. Sign in to Google Cloud Platform console.

1. In the admin console menu, locate the _Storage_ section than select **Cloud Storage&nbsp;>&nbsp;Browser**.

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

To learn more, see [Use IAM permissions](https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-iam).

### Azure Blob Storage

To store your backup in Microsoft Azure Blob Storage, sign in to the Azure portal and then:

1. [Create an Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create) if you do not already have one.

1. [Create a container](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container) if you do not already have one.

1. [Manage storage account access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage)

Set your resource's **Backup Path** to the path of your storage account.

The syntax for creating the backup varies according to your authorization mechanism.  For example:

`abs://:storage_account_access_key@storage_account_name/container_name/[path/]`

Where:

- *storage_account_access_key:* the primary access key to the
    storage account
- *storage_account_name:* the storage account name
- *container_name:* the name of the container, if needed.
- *path*: the backups path, if needed.

To learn more, see [Authorizing access to data in Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth).

### FTP Server

To store your backups on an FTP server, set its **Backup Path** using the following syntax:

`<protocol>://[username]:[password]@[hostname]:[port]/[path]/`

Where:

- *protocol*: the server's protocol, can be either `ftp` or `ftps`.
- *username*: your username, if needed.
- *password*: your password, if needed.
- *hostname*: the hostname or IP address of the server.
- *port*: the port number of the server, if needed.
- *path*: the backup path, if needed.

The user account needs permission to write files to the server.
