---
Title: Importing Data Into Your Redis Cloud Essentials Database
description: 
weight: $weight
alwaysopen: false
categories: ["RC Essentials"]
---
You can import an existing dataset into your Redis Cloud Essentials
instance from an existing Redis server or an RDB file.

In order to import a sharded database that has multiple RDB files you must first
merge the files into a single RDB. For assistance, contact [support](https://redislabs.com/support).

{{% note %}}Expired keys are not imported. As a result, the number of keys
in the source and destination databases might be different after the
import completes.{{% /note %}}

## Import a Dataset from a Redis Server

To import a dataset from any publicly available Redis server:

1. In the Redis Cloud Essentials management console, go to the database that you want to import into.
1. Click **Import**.
1. In the Source Type field, select **Redis**.
1. In the Redis Hostname/IP Address field, enter the hostname or the public IP address
    of the source Redis server.
1. In the Port field, enter the port of the source Redis server if it
    is not the default value `6379`.
1. If the source Redis server has a password, enter it in the
    Password field.

## Import a Dataset from a RDB File

You can import any standard RDB to your Redis Cloud Essentials instance.
Both uncompressed and compressed (with a .gz suffix) RDB files are
valid.

### RDB File from an FTP or HTTP Server

To import an RDB file that is stored in an FTP or HTTP server:

1. In the Redis Cloud Essentials management console, go to the database that you want to import into.
1. Click **Import**.
1. Enter the details for the RDB file:
    - Source Type - Select **FTP** or **HTTP**.
    - RDB file path - Enter the URL for RDB file: `<protocol>://[username][:password]@[:port]/[path/]filename.rdb[.gz]`

    Where:

    - `protocol` - Server protocol: ftp, ftps, http, https
    - `username` - Your username, if needed
    - `password` - Your password, if needed
    - `hostname` - Hostname or IP address of the server
    - `port` - Port number of the server, if not standard
    - `path` - Path to the file, if needed
    - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

### RDB File From an Amazon Simple Storage Service (AWS S3) Bucket

Before you import the RDB file through the Redis Cloud Essentials management console, you must go to the AWS 
management console and share the file.

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
1. Click **Import**.
1. Enter the details for the RDB file:
    - Source Type - Select **AWS S3**.
    - RDB file path - Enter the URL for RDB file: `s3://bucketname/[path/]filename.rdb[.gz]`

        Where:

        - `bucketname` - Name of the S3 bucket
        - `path` - Path to the file, if needed
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

### RDB File from a Google Cloud Storage (GCS) Bucket

Before you import the RDB file through the Redis Cloud Essentials console, you must go to the Google
Cloud Platform (GCP) console and share the file.

To share and import an RDB file that is stored in a GCS bucket:

1. Go to the GCP console and click on your GCP project.
1. Click on the menu to open it, and select **Storage** to open the Storage browser and view your buckets.
1. Click on the bucket where the RDB file is stored.
1. Edit the file permissions:
    1. Click on the RDB file menu to open it, and click **Edit permissions**.
    1. Click **Add item**.
    1. Enter the user details and access:
       - In the Entity field of the new item, select **User**.
       - In the Name field of the new item, enter: `service@garantiadata.com`
       - In the Access field of the new item, select **Reader**.
    1. Click **Save**.
1. In the Redis Cloud Essentials management console, go to the database that you want to import into.
1. Click **Import**.
1. Enter the details for the RDB file:
    - Source Type - Select **Google Cloud Storage**.
    - RDB file path - Enter the URL for RDB file: `gs://bucketname/[path/]filename.rdb[.gz]`

        Where:
        - `bucketname` - Name of the GCS bucket
        - `path` - Path to the file
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed

### RDB File from an Azure Blob Storage (ABS) Container

To import an RDB file that is stored in an ABS container:

1. In the Redis Cloud Essentials management console, go to the database that you want to import into.
1. Click **Import**.
1. Enter the details for the RDB file:
    - Source Type - Select **Azure Blob Storage**.
    - RDB file path - Enter the URL for RDB file: `abs://:storage_account_access_key@storage_account_name/[container/]filename.rdb[.gz]`

        Where:
        - `storage_account_access_key` - Primary access key to the storage account
        - `storage_account_name` - Name of the storage account
        - `url` - URL of the storage account
        - `container` - Name of the container, if needed
        - `filename` - Filename of the RDB file, including the .gz suffix if the file is compressed
