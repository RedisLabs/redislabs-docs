### FTP server

Before you choose to backup to an FTP server, make sure that:

- The RS cluster has network connectivity to the FTP server.
- The user that you specify in the FTP server location has read and write priviledges.

To backup to an FTP server, enter the FTP server location in the format:

```src
ftp://user:password@host<:custom_port>/path/
```

For example: `ftp://username:password@10.1.1.1/home/backups/`

### SFTP server

Before you choose to backup to an SFTP server, make sure that:

- The RS cluster has network connectivity to the SFTP server.
- The user that you specify in the SFTP server location has read and write priviledges.
- The RS server and SFTP server have the correct TLS certificates. You can select either:
    - **Use the cluster auto generated key** - Go to **settings** and copy the **Cluster SSH Public Key**
        to the SFTP server.
    - **Use a custom key** - Generate a TLS key pair for the SFTP server, copy the private key to
        the **SSH Private Key** box, and copy the public key to the location required by the SFTP server.

To backup to an SFTP server, enter the SFTP server location in the format:

```src
sftp://user:password@host:<:custom_port>/path/
```

For example: `sftp://username:password@10.1.1.1/home/backups/`

### AWS S3

Before you choose to backup to Amazon AWS S3, make sure that you have:

- Storage location path in the format: `s3://bucketname/path/`
- Access key ID
- Secret access key

You can also connect to a storage service that uses the S3 protocol but is not hosted by Amazon AWS.
The storage service must have a valid SSL certificate.
To connect to an S3-compatible storage location, run: `rladmin cluster config s3_url <url>`

### Local mount point

Before you choose to backup to a local mount point, make sure that:

- The node has network connectivity to the destination server of the mount point.
- The `redislabs:redislabs` user has read and write priviledges on the local mount point
and on the destination server.
- The backup location has enough disk space for your backup files. The backup files
are saved with filenames that include the timestamp so that backup files are not overwritten.

To backup to a local mount point for a node:

1. On each node in the cluster, create the mount point:
    1. Connect to the terminal of the RS server that the node is running on.
    1. Mount the remote storage to a local mount point.

        For example:

        ```src
        sudo mount -t nfs 192.168.10.204:/DataVolume/Public /mnt/Public
        ```

1. In the path for the backup location, enter the mount point.

    For example: `/mnt/Public`

### OpenStack Swift

{{% note %}}
Support for OpenStack Object Storage ("Swift") for backup, import and export location ends on November 30, 2020.
{{% /note %}}

Before you choose to backup to OpenStack Swift, make sure that you have:

- Storage URL in the format: `https://<openstack_url>/v1`
- Container
- Prefix (Optional)
- User
- Key

### Azure Blob Storage

Before you choose to backup to OpenStack Swift, make sure that you have:

- Storage location path in the format: `/container_name/[path/]/`
- Account name
- Account key

### Google Cloud Storage

Before you choose to backup to OpenStack Swift, make sure that you have:

- Storage location path in the format: `/bucket_name/[path/]/`
- Client ID
- Client email
- Private key ID
- Private key
