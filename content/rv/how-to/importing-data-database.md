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
