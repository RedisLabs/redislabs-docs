---
Title: Importing Data Into Your Database
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
aliases: /rv/how-to/importing-dataset-redis-cloud/
         /rc/how-to/importing-dataset-redis-cloud/
         /rc/how-to/importing-data-database/
         /rv/how-to/importing-data-database/
---
You can import an existing dataset into your Redis Cloud instance from an existing Redis server or an RDB file.

In order to import a sharded database that has multiple RDB files you must first merge the files into a single RDB.
For assistance, contact [Support](https://support.redislabs.com).

{{< note >}}
Expired keys are not imported.
As a result, the number of keys in the source and destination databases can be different after the import is complete.
{{< /note >}}

## Import a dataset from a Redis server

To import a dataset from any publicly available Redis server:

1. In the Redis Cloud management console, go to the database that you want to import into.
1. Click ![Import](/images/rc/icon_import.png#no-click "Import").
1. Enter the details for the RDB file:
    - Source Type - Select **Redis**.
    - Redis Hostname/IP Address - Enter the hostname or the public IP address of the source Redis server.
    - Redis port - Enter the port of the source Redis server if it is not the default value of `6379`.
    - Password - Enter the password, if required by the Redis database.
1. Click **Import**.

## Import a dataset from an RDB File

You can import any standard RDB to your Redis Cloud instance.
Both uncompressed and compressed (with a .gz suffix) RDB files are valid.

### RDB file from an FTP or HTTP server

To import an RDB file that is stored in an FTP or HTTP server:

1. In the Redis Cloud management console, select the database that you want to import into.
1. Click ![Import](/images/rc/icon_import.png#no-click "Import").
1. Enter the details for the RDB file:
    - Source Type - Select **FTP** or **HTTP**.
    - RDB file path - Enter the URL for RDB file: `<protocol>://[username][:password]@[:port]/[path/]filename.rdb[.gz]`

    Where:

    - `protocol` - Server protocol: ftp, ftps, http, https
    - `username` - Your username, if necessary
    - `password` - Your password, if necessary
    - `hostname` - Hostname or IP address of the server
    - `port` - Port number of the server, if not `6379`
    - `path` - Path to the file, if necessary
    - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

1. Click **Import**.

### RDB file from an Amazon Simple Storage Service (AWS S3) bucket

Before you import the RDB file through the Redis Cloud Essentials management console, you must share the file from the AWS management console.

To share and import an RDB file that is stored in an AWS S3 bucket:

1. Go to the AWS console and click **S3** from the Services menu.
1. Click on the bucket where the RDB file is stored.
1. Navigate to the file, select the RDB file and click **Permissions**.
1. Add access permissions to our service:
    1. Click **Add account**.
    1. In the Account field, enter: `fd1b05415aa5ea3a310265ddb13b156c7c76260dbc87e037a8fc290c3c86b614`
    1. In the Read object column, select **Yes**.
    1. Click **Save**.
1. In the Redis Cloud Essentials management console, go to the database that you want to import into.
1. Click ![Import](/images/rc/icon_import.png#no-click "Import").
1. Enter the details for the RDB file:
    - Source Type - Select **AWS S3**.
    - RDB file path - Enter the URL for RDB file: `s3://bucketname/[path/]filename.rdb[.gz]`

        Where:

        - `bucketname` - Name of the S3 bucket
        - `path` - Path to the file, if necessary
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

1. Click **Import**.

### RDB file from a Google Cloud Storage (GCS) bucket

Before you import the RDB file through the Redis Cloud Essentials console, you must share the file from the Google Cloud Platform (GCP) console.

To share and import an RDB file that is stored in a GCS bucket:

1. Go to the GCP console and click on your GCP project.
1. Click on the menu to open it, and select **Storage** to open the Storage browser and view your buckets.
1. Click on the bucket where the RDB file is stored.
1. Edit the file permissions:
    1. Click on the RDB file menu to open it, and click **Edit permissions**.
    1. Click **Add item**.
    1. Enter the user details and access:
       - In the Entity field of the new item, select **User**.
       - In the Name field of the new item, enter: `service@redislabs-prod-clusters.iam.gserviceaccount.com`
       - In the Access field of the new item, select **Reader**.
    1. Click **Save**.
1. In the Redis Cloud Essentials management console, go to the database that you want to import into.
1. Click ![Import](/images/rc/icon_import.png#no-click "Import").
1. Enter the details for the RDB file:
    - Source Type - Select **Google Cloud Storage**.
    - RDB file path - Enter the URL for RDB file: `gs://bucketname/[path/]filename.rdb[.gz]`

        Where:
        - `bucketname` - Name of the GCS bucket
        - `path` - Path to the file
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

1. Click **Import**.

### RDB file from an Azure Blob Storage (ABS) container

To import an RDB file that is stored in an ABS container:

1. In the Redis Cloud Essentials management console, go to the database that you want to import into.
1. Click ![Import](/images/rc/icon_import.png#no-click "Import").
1. Enter the details for the RDB file:
    - Source Type - Select **Azure Blob Storage**.
    - RDB file path - Enter the URL for RDB file: `abs://:storage_account_access_key@storage_account_name/[container/]filename.rdb[.gz]`

        Where:
        - `storage_account_access_key` - Primary access key to the storage account
        - `storage_account_name` - Name of the storage account
        - `url` - URL of the storage account
        - `container` - Name of the container, if necessary
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

1. Click **Import**.
