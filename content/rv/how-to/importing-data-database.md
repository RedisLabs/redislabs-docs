---
Title: Importing Data Into Your Database
description:
weight: $weight
alwaysopen: false
categories: ["RC Pro"]
---
You can import an existing dataset into your Redis Cloud Pro
instance. This article lists the steps required to share your dataset
with Redis Cloud Pro.

You can import a dataset from an existing Redis server or an RDB file
from various sources detailed below.

You can also import a sharded database that has multiple RDB files by
merging the files into a single RDB. Contact
[support](https://redislabs.com/support) if you need help merging the
RDB files.

Note: Expired keys do not get imported. As a result, the number of keys
in the source and destination databases might be different after the
import completes.

## Import a Dataset from a Redis Server

To import a dataset from any publicly available Redis server, simply
enter the following information in the Import Dataset dialog of your
Redis Cloud Pro instance and click the "Import" button when done:

1. Enter the hostname or the public IP address of the source Redis
    server in the **Redis Hostname/IP Address** box.
1. Enter the port of the source Redis server in the Port field, if it
    is different from the default value of *6379*.
1. If the source Redis server is set with a password, enter it in the
    **Password** input control field.

## Import a Dataset from a RDB File

You can import any standard RDB to your Redis Cloud Pro instance.
Both uncompressed and compressed (with a .gz suffix) RDB files are
acceptable.

### RDB File from an FTP or HTTP Server

To import a dataset from an RDB file that is accessible via a public FTP
or HTTP server, enter the file's full URL in the **Import Dataset**
dialog's **RDB File Path** field. Use the following standard pattern to
provide the file's URL:

`<protocol>://[username][:password]@[hostname][:port]/[path/]filename.rdb[.gz]`

Where:

- *protocol*: the server's protocol, can be either ftp, ftps, http or
    https.
- *username*: your username, if needed.
- *password*: your password, if needed.
- *hostname*: the hostname or IP address of the server.
- *port*: the port number of the server, if needed.
- *path*: the path to the file, if needed.
- *filename*: the filename of the RDB file, optionally compressed and
    with the *.gz* suffix.
    
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
       - In the Name field of the new item, enter: `service@redislabs-prod-clusters.iam.gserviceaccount.com`
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
