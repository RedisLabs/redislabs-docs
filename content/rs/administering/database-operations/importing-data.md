---
Title: Importing Data into Redis Enterprise
description: 
weight: $weight
alwaysopen: false
---
You can import data into a Redis Enterprise Software database from an
HTTP location, FTP server, Amazon S3, or OpenStack Object Storage
("Swift").

You can either import from a single file, or from multiple files in case
you are importing from a backup of a sharded database. For additional
details, refer to the Backup of a sharded database section in [Database
backup](/rs/database-configuration/database-backup).

Note: Importing data via this method will erase all existing content in
the database.

## Importing data into a database

To import data into a database:

1.  Click the relevant database row in the **Databases** page. The
    selected database page appears.
2.  Read and understand the warning.
3.  Select the **Configuration** tab.
4.  Click **Import** at the bottom of the page.
5.  A warning appears, informing you that importing a dataset into the
    database will erase all existing database content. Click
    **Continue**.
6.  In the popup that appears, select the location type and populate the
    relevant fields. The RDB file path / object name should have an RDB
    format or a compressed RDB format file. To import from multiple
    files, enter each file path in a new line.
7.  You can also choose whether or not you would like to receive email
    notifications with regard to the import process.
8.  Click **Import**.

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
