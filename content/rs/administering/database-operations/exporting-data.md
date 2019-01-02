---
Title: Exporting Data from Redis Enterprise
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Using the Export option, you can back up a database at any time to an
FTP server, Amazon S3, or OpenStack Object Storage ("Swift"). Other
cloud storage options, such as Azure Geo-Redundant Storage, SoftLayer
Object Storage, and Google Cloud Storage will be added in a future
release. You cannot back up to the local machine.

To export data from a database:

1. In **databases**, click on the database that you want to export data from.
1. In **configuration**, at the bottom of the page click **Export**.
1. Select the location type to export the data to and enter the connection details.
1. Select **Receive email notification on success/failure**, if you want to receive
    email notifications about the import process.
1. Click **Export**.

### FTP location

To export to FTP, you must ensure permissions to read and write to the
FTP location. If needed, you can specify the username and password for
the FTP location as part of the path with the following structure: 
ftp://user:password@host:port/path/

### Amazon S3 or OpenStack Swift location

To export to Amazon S3 or OpenStack Swift, you only need to select the
location type and enter the details in relevant fields. Ensure first
that you have all these details from your platform.

For example, here is the data necessary to export to AWS S3.

![Export from Redis Enterprise to Amazon
S3](/images/rs/export_amazon_s3.png?width=700&height=578)
