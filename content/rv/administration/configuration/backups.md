---
Title: Database Backups
description: 
weight: 70
alwaysopen: false
categories: ["RC Pro"]
---
You can back up your Redis Cloud Pro databases to a storage bucket
of your choosing. This article explains how to create a cloud storage
bucket and grant permissions to use it for scheduled and on-demand
backups. Alternatively, you may use an FTP server to store your backups
instead.

**Note**: Backups are only available for paid plans. If you are free
plan user, you must upgrade your subscription to a paid plan (zero
downtime) in order to utilize this feature.

## Amazon Simple Storage Service (AWS S3)

To use an S3 bucket for storing backups, first access your [AWS
Management Console](https://console.aws.amazon.com/) and follow these
steps:

1. Select the **S3** service under **Services** -\> **Storage -\>
    S3** to navigate to the **S3 Management Console**.
1. Navigate to your bucket's permissions page:
    1. To create a new bucket:
        1. Click the **+ Create Bucket** button
        1. Enter a **name** and **region** for the bucket
            ![new-bucket](/images/rv/new-bucket.png?width=600&height=678)
        1. Click the **Next** button.
        1. Set any bucket properties to your company's standards
        1. On the Set permissions page, click the **+ Add account**
            button
        1. In the Account field enter:
            `fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614`
        1. Check read/write boxes for **Objects** and **Object
            permissions**, then click **Save**.
            ![add_s3_user](/images/rv/add_s3_user.png?width=600&height=698)
        1. Click the **Create bucket** button
    1. To use an existing bucket, click on the bucket and go to the
        **Permissions** tab
        1. Click **+ Add account** in the **Access for other AWS
            accounts** section enter the below information
        1. In the Account field enter:
            `fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614`
            ![add_user_existing](/images/rv/add_user_existing.png?width=700&height=175)
        1. Check read/write boxes for various** permissions**, then
            click the **Save** button

\>

Once your bucket's permissions are set, you can use it with your
resource by setting its **Backup Path** to the path of your S3 bucket
and clicking the **Apply** button. For example, if your backups bucket's
name is *backups-bucket*, you should use the following path:

`s3://backups-bucket`

## Google Cloud Storage (GCS)

To use a GCS bucket for storing your resources' backups, follow these
steps in your [Google Cloud Platform (GCP)
console](https://developers.google.com/console/):

1. Access your GCP project by:
    1. Creating a new project using the **NEW PROJECT** button, or
    1. Opening an existing project by clicking it.
1. Select **Cloud Storage** in the left-hand menu to open the Storage
    browser and view your buckets.
1. Navigate to your bucket's permissions page:
    1. To create a new bucket:
        1. Click the **NEW BUCKET** button.
        1. Enter a name for the bucket.
        1. Click the **Create** button.
        1. Navigate one level up and out of the newly created bucket.
        1. Continue to step 3.2.
    1. To use an existing bucket, select it using the left-most
        checkmark control and click the **Bucket Permissions** button.
1. At your bucket's permissions page, add another permission by
    entering the following information at the bottom of the page:
    1. In the left-most drop-box, make sure that the value *User* is
        selected.
    1. Next, enter `service@garantiadata.com`.
    1. Set the permission to *Writer*.
    1. Click the **Add** and then the **Save** buttons to apply your
        changes.

Once your bucket's permissions are set, you can use it with your
resource by setting its **Backup Path** to the path of your GCS bucket
and clicking the **Apply** button. For example, if your backups bucket's
name is backups-bucket, you should use the following path:

`gs://backups-bucket`

Please note, backup to GCS locations is only available for Google Cloud
Platform subscriptions.

## Azure Blob Storage (ABS)

To use an ABS container for storing your resources' backups, follow
these steps in your [Microsoft Azure Management
Portal](https://manage.windowsazure.com/):

1. Access your storage by clicking the left-hand **STORAGE** icon.
1. Select the storage account:
    1. To create a new storage account:
        1. Click the **+ NEW** button at the lower-left corner of the
            page.
        1. Verify that you've selected **DATA
            SERVICES-\>STORAGE-\>QUICK CREATE** from the menu.
        1. Enter the **URL** for your new storage account.
        1. Select a **LOCATION/AFFINITY GROUP** for the storage
            account.
        1. Choose a **REPLICATION** mode for the account.
        1. Click the **CREATE STORAGE ACCOUNT** button.
        1. Continue to step 2.2.
    1. To use an existing storage account, select it by clicking on it.
1. Click the **MANAGE ACCESS KEYS** button at the bottom of the page.
1. Copy your storage account's **PRIMARY ACCESS KEY**

Set your resource's **Backup Path** to the path of your ABS storage
account and clicking the **Apply** button using the following syntax:

`abs://:storage_account_access_key@storage_account_name/container_name/[path/]`

Where:

- *storage_account_access_key:* the primary access key to the
    storage account
- *storage_account_name:* the storage account name
- *url:* the URL of of the storage account.
- *container_name:* the name of the container, if needed.
- *path*: the backups path, if needed.

## FTP Server

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

### Can I export my Redis data from Redis Cloud Pro?

Absolutely! There is no lock-in with Redis Cloud Pro. Using the
instructions on this page, you can export your latest RDB backup file
from your cloud storage, FTP or HTTP server to any Redis server of your
choice (paid subscriptions only).
