---
Title: Back up database data
description:
weight: 40
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

The back up process for Redis Enterprise Cloud data depends on your plan:

- Flexible and Annual can use the **Backup** icon on the **View Database** screen or schedule regular backups.

- Paid Fixed plans run scheduled backups every 24 hours.  

- Free plans do not back up automatically.

    (To back up Free plan data, connect to the database and use a process appropriate for the connection.  For example, you can use the [DUMP](https://redis.io/commands/dump) and [RESTORE](https://redis.io/commands/restore) commands with Redis&nbsp;CLI.)

Here, you'll learn how to store backups using different cloud providers.

## Back up to Amazon Simple Storage Service (AWS S3)

To use an S3 bucket for storing backups, sign in to your [AWS
Management Console](https://console.aws.amazon.com/) and follow these
steps:

1. Go to the AWS S3 Management Console in: **Services > Storage > S3**

1. Configure the permissions for your S3 bucket:

    - For a new bucket:
        1. Click **Create Bucket**.
        1. Enter a name and region for the bucket and click **Next**.
        1. Set the bucket properties that are required by your company standards, and click **Next**.
        1. Set Public access properties according to your company standards, and click **Next**.
        1. Review the properties, and click **Create bucket**.
        1. Find your bucket in the bucket list, and click on the bucket name.
        1. In **Permissions > Access Control**, click **Add account**:
            1. In the Account field enter:
                `fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614`
            1. Select the **Write objects**, **Read bucket permissions**, and **Write bucket permissions**, and click **Save**.

    - For an existing bucket, click on the S3 bucket and go to the **Permissions** tab.
        1. Click **Add account**.
        1. In the **Access for other AWS accounts** section, enter:
            1. In the Account field enter:
                `fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614`
            1. Select the **permissions** that you need.
        1. Click **Save**.

After the permissions are set for your bucket, set the **Backup Path** to the path of your S3 bucket
and click **Apply**. For example, if the name of your bucket is *backups-bucket*, use the path: `s3://backups-bucket`

## Back up to Google Cloud Storage (GCS)

For [Google Cloud Platform (GCP)
console](https://developers.google.com/console/) subscriptions, store your backups in a GCS bucket:

1. Sign in Google Cloud Platform
1. Navigate to **Storage -> Browser**
1. Click on the three dot button (1) on your relevant bucket name and
    choose **Edit bucket permissions** (2).
    ![GCS bucket
    permissions](/images/rc/bucket-permissions.png)
1. Under **Add members**, enter:
    `service@redislabs-prod-clusters.iam.gserviceaccount.com`
1. For the role, select **Storage Legacy -\> Storage Legacy Bucket
    Writer**.
    ![Google Cloud Storage
    Permissions](/images/rc/gcs-permissions.jpg)
1. Click on the **Add** button.

Once your bucket's permissions are set, you can use it with your
resource by setting its **Backup Path** to the path of your GCS bucket
and clicking the **Activate** button. For example, if your backups
bucket's name is backups-bucket, use the path:

`gs://backups-bucket`

## Back up to Azure Blob Storage 

To store your backup in Microsoft Azure Blob Storage, sign in to the Azure portal and then:

1. [Create an Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create)

1. [Create a container](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container)

1. [Manage storage account access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage)

Set your resource's **Backup Path** to the path of your storage
account.

The syntax for creating the backup varies according to your authorization mechanism.  For example:

`abs://:storage_account_access_key@storage_account_name/container_name/[path/]`

Where:

- *storage_account_access_key:* the primary access key to the
    storage account
- *storage_account_name:* the storage account name
- *container_name:* the name of the container, if needed.
- *path*: the backups path, if needed.

To learn more, see [Authorizing access to data in Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth)

## Back up to an FTP Server

To store your resource backups on an FTP server, set its **Backup Path**
using the following syntax:

`<protocol>://[username]:[password]@[hostname]:[port]/[path]/`

Where:

- *protocol*: the server's protocol, can be either ftp or ftps.
- *username*: your username, if needed.
- *password*: your password, if needed.
- *hostname*: the hostname or IP address of the server.
- *port*: the port number of the server, if needed.
- *path*: the backups path, if needed.
