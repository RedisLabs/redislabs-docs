---
Title: Exporting Data from Redis Enterprise
description: $description
weight: $weight
alwaysopen: false
---
Using the Export option, you can back up a database at any time to an
FTP server, Amazon S3, or OpenStack Object Storage ("Swift"). Other
cloud storage options, such as Azure Geo-Redundant Storage, SoftLayer
Object Storage, and Google Cloud Storage will be added in a future
release. You cannot back up to the local machine.

To perform a database export:

1.  Click the relevant database row in the **Databases** page. The
    selected database page appears.
2.  Select the **Configuration** tab.
3.  Click **Export** button at the bottom of the page.
4.  In the popup that appears, choose the location type and populate the
    relevant fields
5.  You can also choose whether or not you would like to receive email
    notifications with regard to the export process
6.  Click **Export**.

### FTP location

To export to FTP, you must ensure permissions to read and write to the
FTP location. If needed, you can specify the username and password for
the FTP location as part of the path with\
the following structure: ftp://user:password\@host:port/path/

### Amazon S3 or OpenStack Swift location

To export to Amazon S3 or OpenStack Swift, you only need to select the
location type and enter the details in relevant fields. Ensure first
that you have all these details from your platform.

For example, here is the data necessary to export to AWS S3.

![Export from Redis Enterprise to Amazon
S3](/images/rs/export_amazon_s3.png){.alignnone
.size-full .wp-image-36865 width="700" height="578"}
