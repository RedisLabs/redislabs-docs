### FTP server

Before you configure backups to an FTP server, make sure that:

- The RS cluster has network connectivity to the FTP server.
- The user that you specify in the FTP server location has read and write priviledges.

To backup to an FTP server, enter the FTP server location in the format:

```src
ftp://user:password@host<:custom_port>/path/
```

For example: `ftp://username:password@10.1.1.1/home/backups/`

### SFTP server

Before you configure backups to an SFTP server, make sure that:

- The RS cluster has network connectivity to the SFTP server.
- The user that you specify in the SFTP server location has read and write priviledges.
- The RS server and SFTP server have the correct TLS certificates. You can select either:
    - **Use the cluster auto generated key** - Go to **settings** and copy the **Cluster SSH Public Key**
        to the SFTP server.
    - **Use a custom key** - Generate a TLS key pair for the SFTP server, copy the private key to
        the **SSH Private Key** box, and copy the public key to the SFTP server.

To backup to an SFTP server, enter the SFTP server location in the format:

```src
sftp://user:password@host:<:custom_port>/path/
```

For example: `sftp://username:password@10.1.1.1/home/backups/`

### Amazon S3

Before you configure backups to Amazon S3, make sure that you have:

- Path in the format: `s3://bucketname/path/`
- Access key ID
- Secret access key

### Local mount point

Before you configure backups to a local mount point, make sure that:

- The node has network connectivity to the destination server of the mount point.
- The `redislabs:redislabs` user has read and write priviledges on the local mount point
and on the destination server.

To backup to a local mount point for a node:

1. Connect to the terminal of the RS server that the node is running on.
1. Mount the remote storage to a local mount point.

    For example:

    ```src
    sudo mount -t nfs 192.168.10.204:/DataVolume/Public /mnt/Public
    ```

1. In the path for the backup location, enter the mount point.

    For example: `/mnt/Public`

### OpenStack Swift

Before you configure backups to OpenStack Swift, make sure that you have:

- Storage URL in the format: `https://<openstack_url>/v1`
- Container
- Prefix (Optional)
- User
- Key
