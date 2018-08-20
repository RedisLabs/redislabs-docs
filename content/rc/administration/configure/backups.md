---
Title: Redis Enterprise Cloud Database Backups
description: 
weight: $weight
alwaysopen: false
---
You can back up your Redis Enterprise Cloud (RC) databases to a storage
bucket of your choosing. This article explains how to create a cloud
storage bucket and grant permissions to use it for scheduled and
on-demand backups. Alternatively, you may use an FTP server to store
your backups instead.

Note: Backups are only available for paid plans. If you are free plan
user, you must upgrade your subscription to a paid plan (zero downtime)
in order to utilize this feature.

## Amazon Simple Storage Service (AWS S3)

To use an S3 bucket for storing backups, first access your [AWS
Management Console](https://console.aws.amazon.com/) and follow these
steps:

1.  Select the **S3** service under **Services** -\> **Storage -\>
    S3** to navigate to the **S3 Management Console**.
2.  Navigate to your bucket's permissions page:
    a.  To create a new bucket:
        1.  Click the **+ Create Bucket** button
        2.  Enter a **name** and **region** for the bucket\
            ![](/images/rc/new-bucket.png?width=600&height=678)
        3.  Click the **Next** button.
        4.  Set any bucket properties to your company's standards
        5.  On the Set permissions page, click the **+ Add account**
            button
        6.  In the Account field enter
            ***fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614***
        7.  Check read/write boxes for **Objects** and **Object
            permissions**, then click **Save\
            ![](/images/rc/add_s3_user.png?width=600&height=698)\
            **
        8.  Click the **Create bucket** button
    b.  To use an existing bucket, click on the bucket and go to the
        **Permissions** tab
        1.  Click **+ Add account** in the **Access for other AWS
            accounts** section enter the below information
        2.  In the Account field enter
            ***fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614\
            ![](/images/rc/add_user_existing.png?width=700&height=175)***
        3.  Check read/write boxes for various** permissions**, then
            click the **Save** button

Once your bucket's permissions are set, you can use it with your
resource by setting its **Backup Path** to the path of your S3 bucket
and clicking the **Apply** button. For example, if your backups bucket's
name is *backups-bucket*, you should use the following path:

`s3://backups-bucket`

## Google Cloud Storage (GCS)

There are two ways to backup to Google Cloud Storage and which you use
depends on the Redis version your database has in Redis^e^ Cloud. To
identify the version go to the configuration page of the database you
wish you backup.

![Identify the redis
version](/images/rc/backups-version1.png?width=800&height=448)

### For Redis versions prior to 3.2.x

To use a GCS bucket for storing your resources' backups, follow these
steps in your [Google Cloud Platform (GCP)
console](https://developers.google.com/console/):

1.  Access your GCP project by:
    a.  Creating a new project using the "**NEW PROJECT**" button, or
    b.  Opening an existing project by clicking it.
2.  Select "**Cloud Storage**" in the left-hand menu to open the Storage
    browser and view your buckets.
3.  Navigate to your bucket's permissions page:
    a.  To create a new bucket:
        1.  Click the "**NEW BUCKET**" button.
        2.  Enter a name for the bucket.
        3.  Click the "**Create**" button.
        4.  Navigate one level up and out of the newly created bucket.
        5.  Continue to step 3.2.
    b.  To use an existing bucket, select it using the left-most
        checkmark control and click the "**Bucket Permissions**" button.
4.  At your bucket's permissions page, add another permission by
    entering the following information at the bottom of the page:
    a.  In the left-most dropbox, make sure that the value *User* is
        selected.
    b.  Next, enter ***service\@garantiadata.com***.
    c.  Set the permission to *Writer*.
    d.  Click the **Add** and then the **Save** buttons to apply your
        changes.

Once your bucket's permissions are set, you can use it with your
resource by setting its **Backup Path** to the path of your GCS bucket
and clicking the **Activate** button. For example, if your backups
bucket's name is backups-bucket, you should use the following path:

`gs://backups-bucket`

### For Redis versions greater than 3.2.x

1.  Login to your account on Google Cloud Platform
2.  Navigate to "**Storage -\> Browser**"
3.  Click on the three dot button (1) on your relevant bucket name and
    choose "**Edit bucket permissions**" (2).\
    ![GCS bucket
    permissions](/images/rc/bucket-perm1.png?width=800&height=493)
4.  Under "**Add members**" input
    **service\@redislabs-prod-clusters.iam.gserviceaccount.com**
5.  For the role, select "**Storage Legacy -\> Storage Legacy Bucket
    Writer**".\
    ![Google Cloud Storage
    Permissions](/images/rc/gcs-permissions.jpg?width=800&height=606)
6.  Click on the "**Add**" button.

Once your bucket's permissions are set, you can use it with your
resource by setting its "**Backup Path**" to the path of your GCS bucket
and clicking the "**Activate**" button. For example, if your backups
bucket's name is backups-bucket, you should use the following path:

`gs://backups-bucket`

Note: Backup to GCS locations is only available for Google Cloud
Platform subscriptions.

## Azure Blob Storage (ABS)

To use an ABS container for storing your resources' backups, follow
these steps in your [Microsoft Azure Management
Portal](https://manage.windowsazure.com/):

1.  Access your storage by clicking the left-hand **STORAGE** icon.
2.  Select the storage account:
    a.  To create a new storage account:
        1.  Click the **+ NEW** button at the lower-left corner of the
            page.
        2.  Verify that you've selected **DATA
            SERVICES-\>STORAGE-\>QUICK CREATE** from the menu.
        3.  Enter the **URL** for your new storage account.
        4.  Select a **LOCATION/AFFINITY GROUP** for the storage
            account.
        5.  Choose a **REPLICATION** mode for the account.
        6.  Click the **CREATE STORAGE ACCOUNT** button.
        7.  Continue to step 2.2.
    b.  To use an existing storage account, select it by clicking on it.
3.  Click the **MANAGE ACCESS KEYS** button at the bottom of the page.
4.  Copy your storage account's **PRIMARY ACCESS KEY**

Set your resource's **Backup Path** to the path of your ABS storage
account and clicking the **Apply** button using the following syntax:

`abs://:storage_account_access_key@storage_account_name/container_name/[path/]`

Where:

-   *storage\_account\_access\_key:* the primary access key to the
    storage account
-   *storage\_account\_name:* the storage account name
-   *url:* the URL of of the storage account.
-   *container\_name:* the name of the container, if needed.
-   *path*: the backups path, if needed.

## FTP Server

To store your resource backups on an FTP server, set its **Backup Path**
using the following syntax:

`<protocol>://[username]:[password]@[hostname]:[port]/[path]/`

Where:

-   *protocol*: the server's protocol, can be either ftp or ftps.
-   *username*: your username, if needed.
-   *password*: your password, if needed.
-   *hostname*: the hostname or IP address of the server.
-   *port*: the port number of the server, if needed.
-   *path*: the backups path, if needed.

### Can I export my Redis data from Redis Enterprise Cloud?

Absolutely! There is no lock-in with Redis Enterprise Cloud. Using the
instructions on this page, you can export your latest RDB backup file
from your cloud storage, FTP or HTTP server to any Redis server of your
choice (paid subscriptions only).
