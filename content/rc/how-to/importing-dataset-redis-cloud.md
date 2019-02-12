---
Title: Importing Data Into Your Redis Enterprise Cloud Database
description: 
weight: $weight
alwaysopen: false
categories: ["RC"]
---
You can import an existing dataset into your Redis Enterprise Cloud
instance. This article lists the steps required to share your dataset
with Redis Enterprise Cloud.

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
Redis Enterprise Cloud instance and click the "Import" button when done:

1. Enter the hostname or the public IP address of the source Redis
    server in the **Redis Hostname/IP Address** box.
1. Enter the port of the source Redis server in the Port field, if it
    is different from the default value of *6379*.
1. If the source Redis server is set with a password, enter it in the
    **Password** input control field.

## Import a Dataset from a RDB File

You can import any standard RDB to your Redis Enterprise Cloud instance.
Both uncompressed and compressed (with a .gz suffix) RDB files are
acceptable.

### RDB File from an FTP or HTTP Server

To import a dataset from an RDB file that is accessible via a public FTP
or HTTP server, enter the file's full URL in the **Import Dataset**
dialog's **RDB File Path **field. Use the following standard pattern to
provide the file's URL:

`<protocol>://[username][:password]@[:port]/[path/]filename.rdb[.gz]`

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

## RDB File From an Amazon Simple Storage Service (AWS S3) Bucket

To import an RDB file that's stored in an S3 bucket, first make sure the
file is shared with Redis Cloud. To do so, access your AWS Management
Console and follow these steps:

1. Select the S3 service under Storage & Content Delivery to navigate
    to the S3 Management Console.
1. Open the bucket where the RDB file is stored by clicking it.
1. Navigate to the file's permissions:
    1. Select the RDB file.
    1. Right-click the file and select Properties from the context
        menu.
    1. Click the Permissions tab in the Properties pane.
1. Add access permissions to our service:
    1. Click the Add more permissions button.
    1. In the newly-added row:
        1. Enter the value service\@garantiadata.com in the Grantee
            field.
        1. Check the Open/Download box.
    1. Click the Save button.

Once the file's permissions are set, you can import it by entering its
URL in the Import Dataset dialog's RDB File Path field using the
following syntax:
s3://bucketname/\[path/\]filename.rdb\[.gz\]

Where:

- *bucketname*: the name of the S3 bucket.
- *path*: the path to the file, if needed.
- *filename*: the filename of the RDB file, optionally compressed and
    with the .gz suffix.

## RDB File from a Google Cloud Storage (GCS) Bucket

Before you import the RDB file through the RV console, you must go to the Google
Cloud Platform (GCP) console and share the file.

To share and import an RDB file that is stored in a GCS bucket:

1. Go to the GCP console and click on your GCP project.
1. Click on the menu to open it, and select **Storage** to open the Storage browser and view your buckets.
1. Click on the bucket where the RDB file is stored.
1. Edit the file permissions:
    1. Click on the RDB file menu to open it, and click **Edit permissions**.
    1. Click **Add item**.
    1. Enter the user details and access:
       - In the Entity box of the new item, select **User**.
       - In the Name box of the new item, enter: `service@garantiadata.com`
       - In the Access box of the new item, select **Reader**.
    1. Click **Save**.
1. In the RV management console, go to the database that you want to import into.
1. Click **Import**.
1. Enter the details for the RDB file:
    - Source Type - Select **Google Cloud Storage**.
    - RDB file path - Enter the URL for RDB file: `gs://bucketname/[path/]filename.rdb[.gz]`

        Where:
        - `bucketname`: Name of the GCS bucket
        - `path`: Path to the file
        - `filename`: Filename of the RDB file, including the .gz suffix if the file is compressed

## RDB File from an Azure Blob Storage (ABS) Container

To import an RDB file that’s stored in an ABS container, enter its URL in the Import Dataset dialog’s RDB File Path field using the following syntax:
abs://:storage_account_access_key@storage_account_name/[container/]filename.rdb[.gz]
Where:
- *storage_account_access_key*: the primary access key to the storage account
- *storage_account_name*: the storage account name.
- *url*: the URL of of the storage account.
- *container*: the name of the container, if needed.
- *filename*: the filename of the RDB file, optionally compressed and with the .gz suffix.
