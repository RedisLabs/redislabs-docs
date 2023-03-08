---
Title: Import data into a database
description:
weight: 35
alwaysopen: false
categories: ["RC"]
linktitle: Import data
aliases: /rv/how-to/importing-dataset-redis-cloud/
         /rc/how-to/importing-dataset-redis-cloud/
         /rv/how-to/importing-data-database/
         /rc/how-to/importing-data-database/
         /rc/how-to/importing-data-database.md
         /rc/databases/import-data/
         /rv/how-to/importing-data/
         /rc/how-to/importing-data/
         /rc/how-to/importing-data.md                  
---
You can import an existing dataset into your Redis Cloud instance from an existing Redis server or an RDB file.

{{< note >}}
Expired keys are not imported.
As a result, the number of keys in the source and destination databases can be different after the import is complete.
{{< /note >}}

## Import from a Redis server

To import a dataset from any publicly available Redis server:

1. Select **Databases** from the admin console menu and then select the target database from the database list.
1. In the **Danger Zone**, select **Import**.
1. Enter the source database details:
    - Source type - Select **Redis**.
    - Redis Hostname/IP Address - Enter the hostname or the public IP address of the source Redis server.
    - Redis port - Enter the port of the source Redis server if it is not the default value of `6379`.
    - Password - Enter the password, if required by the Redis database.
1. Select **Import**.

## Import from an RDB file

If you have an RDB or a compressed RDB file from a Redis database, you can import data from that file into your Redis Enterprise Cloud database.

{{< note >}}
In order to import a sharded database that has multiple RDB files, you must first merge the files into a single RDB.
For assistance, contact [Support](https://redis.com/company/support/).
{{< /note >}}

### Via FTP or HTTP

To import an RDB file stored on an FTP or HTTP server:

1. Select **Databases** from the admin console menu and then select your database from the list.
1. In the **Danger Zone**, select **Import**.
1. Enter the details for the RDB file:
    - Source type - Select **FTP** or **HTTP**.
    - Source path - Enter the URL for the RDB file: `<protocol>://[username][:password]@[:port]/[path/]filename.rdb[.gz]`

    Where:

    - `protocol` - Server protocol: ftp, ftps, http, https
    - `username` - Your username, if necessary
    - `password` - Your password, if necessary
    - `hostname` - Hostname or IP address of the server
    - `port` - Port number of the server, if not `6379`
    - `path` - Path to the file, if necessary
    - `filename` - Filename of the RDB file, including the `.gz` suffix if the file is compressed

1. Select **Import**.

### Via AWS S3

To use the Redis Cloud admin console to import your data, you must first share the file from the Amazon Web Services (AWS) management console.

To share and import an RDB file that is stored in an AWS Simple Storage Service (S3) bucket:

1. In the AWS management console, configure the file’s Access Control List to give read-only access to Redis Enterprise Cloud:
    1. Go to the bucket in the AWS S3 console. In the location where the file is stored, select the RDB file.
    1. Select **Permissions**.
    1. Select **Edit**.
    1. Select **Add grantee**.
    1. In the Grantee field, enter:
    `fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614`
    1. In the Read column, select Yes.
    1. Select Save.

    For more info, see [Configuring ACLs for objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html).

1. In the [Redis Cloud admin console](https://app.redislabs.com/), select the target database from the database list.
1. In the **Danger Zone**, select **Import**.
1. Enter the details for the RDB file:
    - Source type - Select **AWS S3**.
    - Source path - Enter the URL for the RDB file: `s3://bucketname/[path/]filename.rdb[.gz]`

        Where:

        - `bucketname` - Name of the S3 bucket
        - `path` - Path to the file, if necessary
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

1. Select **Import**.

### Via GCP Storage

To use the Redis Cloud admin console to import your data, you must first share the file from the Google Cloud Platform (GCP) console.

To share and import an RDB file that is stored in a GCP Storage bucket:

1. In the GCP Storage bucket, edit the file's Access Control List to give read access to Redis Enterprise Cloud:
    1. Select **Edit access** in the RDB file menu.
    1. Select **Add item**.
    1. Enter the user details and access:
       - In the Entity field of the new item, select **User**.
       - In the Name field of the new item, enter: `service@redislabs-prod-clusters.iam.gserviceaccount.com`
       - In the Access field of the new item, select **Reader**.
    1. Select **Save**.

    For more info, see [Set ACLs](https://cloud.google.com/storage/docs/access-control/create-manage-lists#set-an-acl).

1. In the [Redis Cloud admin console](https://app.redislabs.com/), select the target database from the database list.
1. In the **Danger Zone**, select **Import**.
1. Enter the details for the RDB file:
    - Source type - Select **Google Cloud Storage**.
    - Source path - Enter the URL for the RDB file: `gs://bucketname/[path/]filename.rdb[.gz]`

        Where:
        - `bucketname` - Name of the GCS bucket
        - `path` - Path to the file
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

1. Select **Import**.

### Via Azure Blob Storage container

To import an RDB file stored in a Microsoft Azure Blog storage container:

1. In the Redis Cloud admin console, select the target database from the database list.
1. In the **Danger Zone**, select **Import**.
1. Enter the details for the RDB file:
    - Source type - Select **Azure Blob Storage**.
    - Source path - Enter the URL for the RDB file: `abs://:storage_account_access_key@storage_account_name/[container/]filename.rdb[.gz]`

        Where:
        - `storage_account_access_key` - Primary access key to the storage account
        - `storage_account_name` - Name of the storage account
        - `url` - URL of the storage account
        - `container` - Name of the container, if necessary
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

1. Select **Import**.
