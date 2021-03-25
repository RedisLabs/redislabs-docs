---
Title: Transport Layer Security (TLS)
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/designing-production/security/tls-configuration", "/rs/administering/designing-production/security/client-connections"]
---
Transport Layer Security (TLS), commonly called “SSL”, ensures the privacy of data sent between applications and their Redis databases. TLS also secures connections between Redis Enterprise Software nodes.

## TLS authentication

You can enable TLS for the following two scenarios:

1. Client-server traffic between your Redis clients and your Redis databases
1. Replication and synchronization traffic between the nodes of a Redis Enterprise Software cluster

When you configure `Replica Of` for a database, synchronization traffic flows between the primary instance of the database and the replica instance of the database. You can configure authentication for Replica Of synchronization traffic only, or for all communications, including Replica Of synchronization traffic and data traffic between the database and the clients.

To enable and configure TLS authentication:

1. In **databases**, either:
    - Click **Add** (+) to create a new database.
    - Click on the database that you want to configure and at the bottom of the page click edit.
1. Enable the TLS option on the configuration page. When creating a database, you can find this under "Show advanced options".
    ![database-tls-config](/images/rs/database-tls-config.png "Database TLS Configuration")
1. Select the TLS scope:
    - Require TLS for Replica Of communications only - This option will only encrypt synchronization traffic.
    - Require TLS for all communications - This option will encrypt synchronization traffic and traffic between a client and a server.
    ![database-tls-all](/images/rs/database-tls-all.png "database-tls-all")

1. Select if you would like authentication enforced. By deselecting this option you enforce encryption without authentication.
1. Enter the certificates authorized to authenticate.
1. Copy the syncer certificate from the cluster settings tab. The syncer certificate is used to facilitate encrypted replication and synchronization traffic.
1. Click Add  ![Add](/images/rs/icon_add.png#no-click "Add") to configure certificates.
1. Paste the syncer certificate into the certificate box.
        ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png "Database TLS Configuration")
1. Save the certificates. ![icon_save](/images/rs/icon_save.png#no-click "Save")
1. Repeat for any client certificates you would like to be able to authenticate to your database.

{{< note >}}
There are two considerations for replication authentication you should be aware of:

1. The syncer certificates of the clusters that host the replica instances of the database must always be set when enabling a database for encryption.
2. When using CRDB, the syncer certificate for each cluster must be configured on the database.
{{< /note >}}

## Certificate Authentication for Active-Active Databases

When you create a new CRDB, you can configure authentication for traffic between active-active databases using the same process for as replication traffic.

{{< note >}}
You cannot enable or disable TLS after the CRDB is created, but you can change
the TLS configuration.
{{< /note >}}

### Configuring TLS for CRDB communication

To enable TLS for CRDB communication for a CRDB:

1. In **databases**, click ![icon_add](/images/rs/icon_add.png#no-click "Add")
    to create a new CRDB.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.
![crdb-tls-config-enable](/images/rs/crdb-tls-config-enable.png "crdb-tls-config-enable")
1. After you create the CRDB on all participating clusters, on the participating clusters for which you want to require TLS, edit the CRDB instance and select your TLS scope.
        - Require TLS for CRDB communication only - This option will require TLS for  CRDB synchronization only
data traffic between the database and the clients.
        - Require TLS for all communications - This option will encrypt synchronization traffic and traffic between a client and a server.   
 ![crdb-tls-all](/images/rs/crdb-tls-all.png "crdb-tls-all")
1. Ensure you copy the syncer certificate from the settings tab of all participating clusters. This will ensure that you can authenticate to each CRDB in the cluster.

## Installing your own certificates

Redis Enterprise Software uses self-signed certificates out-of-the-box to make sure that the product is secure by default.

If using a self-signed certificate is not the right solution for you, you can import a certificate signed by a certificate authority of your choice.

The certificates that help facilitate encrypted traffic to the database and within the cluster are the syncer certificate and the proxy certificate.

- Proxy - The certificate for connections between clients and database endpoints
- Syncer - The certificate for synchronization between databases for ReplicaOf and CRDB

{{< warning >}}
When you update the certificates, the new certificate replaces the same certificates on all nodes in the cluster.
{{< /warning >}}

1. Create a private key:

    ```sh
    openssl genrsa -out <key-file-name>.pem 2048
    ```

1. Create a certificate signing request:

    ```sh
    openssl req -new -key <key-file-name>.pem -out <key-file-name>.csr
    ```

    {{< note >}}
You will be prompted for a Country Name, State or Province Name, Locality Name, Organization Name, Organizational Unit and Common Name. You will need to check with your security team or certificate authority on the right values for your organization. The database fqdn is typically used as the common name for the certificate.
    {{< /note >}}

1. Sign the private using your certificate authority:

    - The process to obtain a CA signed certificate is different for each organization and CA vendor. Please consult your security team or certificate authority for the appropriate instructions to sign certificates.

1. Upload the certificate to the cluster.

To replace the proxy certificate use the rladmin command line utility:

```sh
 rladmin cluster certificate set proxy certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```

To replace the syncer certificate use the rladmin command line utility:

```sh
 rladmin cluster certificate set syncer certificate_file <cert-file-name>.pem key_file <key-file-name>.pem
```

## Configuring TLS Protocols

TLS protocols that impact the data path impact client to server communications and the discovery service.  

Syntax: rladmin cluster config cluster config min_data_TLS_version <TLS_Version>
TLS versions available:

- For TLSv1 - 1
- For TLSv1.1 - 1.1
- For TLSv1.2 - 1.2

{{< note >}}
TLSv1.2 is generally recommended as the minimum TLS version for encrypted communications.
{{< /note >}}

For example:

```sh
rladmin cluster config min_data_TLS_version 1.2
```

For your changes to take effect on the discovery service, restart the service with the command:

```sh
supervisorctl restart sentinel_service
```

## Client Side Encryption

Client side encryption may be used to help encrypt data through its lifecycle. This comes with some limitations. Operations that must operate on the data, such as increments, comparisons, and searches will not function properly. Client side encryption is used to help protect data in use.

You can write client side encryption logic directly in your own application or use functions built into clients such as the Java Lettuce cipher codec.
