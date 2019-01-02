---
Title: Importing Data into Redis Enterprise
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
You can import data into a Redis Enterprise Software database from an
HTTP location, FTP server, Amazon S3, or OpenStack Object Storage
("Swift").

You can either import from a single file, or from multiple files in case
you are importing from a backup of a sharded database. For additional
details, refer to the Backup of a sharded database section in [Database
backup]({{< relref "/rs/administering/database-operations/database-backup.md" >}}).

Note: Importing data via this method will erase all existing content in
the database.

## Importing data into a database

To import data into a database:

1. In **databases**, click on the database that you want to import data to.
1. In **configuration**, at the bottom of the page click **Import**.
1. Select the location to import the data from and enter the connection details.
1. Select **Receive email notification on success/failure**, if you want to receive
    email notifications about the import process.
1. Click **Import**.

### FTP location

To import from FTP, you must ensure permissions to read from the FTP
location.

If needed, you can specify the username and password for the FTP
location as part of the path with the following structure:
ftp://user:password\@host:port/path/

### Amazon S3 or OpenStack Swift location

To import a database to Amazon S3 or OpenStack Swift, you need to simply
select the location type and enter the details in the relevant fields.
Ensure first that you have all these details from your platform.

Below is an example of the screen to import from AWS S3.

![Import data from AWS S3 into Redis
Enterprise](/images/rs/import_amazon_s3.png?width=700&height=648)
