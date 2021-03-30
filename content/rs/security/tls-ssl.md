---
Title: Transport Layer Security (TLS)
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/designing-production/security/tls-configuration", "/rs/administering/designing-production/security/client-connections"]
---
Transport Layer Security (TLS), a successor to SSL, ensures the privacy of data sent between applications and their Redis databases. TLS also secures connections between Redis Enterprise Software nodes.

You can use TLS authentication for one or more of the following types of communication:

- Communication from clients (applications) to your database
- Communication from your database to other clusters for replication using Replica Of
- Communication to and from your database to other clusters for synchronization using Active-Active

## Enable TLS for client connections

You can enable TLS by editing the configuration of an existing database (as shown below) or by selecting **Advanced Options** when you are creating a new database.

1. Select your database from your database list and navigate to the **configuration** tab.
1. Select **Edit** at the bottom of your screen.
1. Enable **TLS**.
    - **Enforce client authentication** is selected by default. If you choose to change this option, you will enforce encryption without authentication.
1. Select **Advanced Options** and **Require TLS for All Communications** from the dropdown menu.
    ![database-tls-all](/images/rs/database-tls-all.png "database-tls-all")
1. Select **Add** ![Add](/images/rs/icon_add.png#no-click "Add")
1. Paste your certificate or certificate authority (CA) into the text box.
    ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png "Database TLS Configuration")
1. Save the certificate. ![icon_save](/images/rs/icon_save.png#no-click "Save")
1. Repeat for each client certificate you need to add.
    - If your database uses Replica Of or Active-Active replication, you will need to add the syncer certificates for the participating clusters. The steps for each are below.
1. Optional: To limit connections further to a subset of those with valid certificates, enforce **Subject Alternative Name** and enter authorized users separated with commas.
1. Select **Update** at the bottom of the screen to save your configuration.

## Enable TLS for Active-Active cluster connections

{{< note >}}
You cannot enable or disable TLS after the Active-Active database is created, but you can change the TLS configuration.
{{< /note >}}

### Retrieve syncer certificates

1. For each participating cluster, copy the syncer certificate from the **general** settings tab.

### Configure TLS certificates for Active-Active

1. During database creation (see [Create an Active-Active Geo-Replicated Database]({{<relref "content/rs/administering/creating-databases/create-active-active.md" >)}}, select **Edit** from the **configuration** tab.
1. Enable **TLS**.
    - **Enforce client authentication** is selected by default. If you choose to change this option, you will enforce encryption without authentication.
1. Select **Require TLS for CRDB communication only** from the dropdown menu.
    ![crdb-tls-all](/images/rs/crdb-tls-all.png "crdb-tls-all")
1. Select **Add** ![Add](/images/rs/icon_add.png#no-click "Add")
1. Paste a syncer certificate into the text box.
    ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png "Database TLS Configuration")
1. Save the syncer certificate. ![icon_save](/images/rs/icon_save.png#no-click "Save")
1. Repeat this process, adding the syncer certificate for each participating cluster.
1. Optional: If also you want to  require TLS for client connections, select **Require TLS for All Communications** from the dropdown and add client certificates as well.
1. Select **Update** at the bottom of the screen to save your configuration.

### Configure TLS on all participating clusters

Repeat this process on all participating clusters.

To enforce TLS authentication, Active-Active databases require syncer certificates for every cluster connection. If every cluster does not have the syncer certificate for every other participating cluster, it will cause read and write errors.

## Enable TLS for Replica Of cluster connections

You can enable TLS by editing the configuration of an existing database (as shown below) or by selecting **Advanced Options** when you are creating a new database.

1. For each cluster hosting a replica, copy the syncer certificate from the **general** settings tab.
1. Select your database from your database list and navigate to the **configuration** tab.
1. Select **Edit** at the bottom of your screen.
1. Enable **TLS**.
    - **Enforce client authentication** is selected by default. If you choose to change this option, you will enforce encryption without authentication.
1. Under **Advanced Options**, Select **Require TLS for Replica Of Only** from the dropdown menu.
    ![database-tls-all](/images/rs/database-tls-all.png "database-tls-all")
1. Select **Add** ![Add](/images/rs/icon_add.png#no-click "Add")
1. Paste a syncer certificate into the text box.
    ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png "Database TLS Configuration")
1. Save the syncer certificate. ![icon_save](/images/rs/icon_save.png#no-click "Save")
1. Repeat this process, adding the syncer certificate for each cluster hosting a replica of this database.
1. Optional: If you also want to require TLS for client connections, select **Require TLS for All Communications** from the dropdown and add client certificates as well.
1. Select **Update** at the bottom of the screen to save your configuration.

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
