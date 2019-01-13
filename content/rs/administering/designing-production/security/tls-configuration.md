---
Title: Configuring TLS Authentication and Encryption
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To prevent unauthorized access to your data, RS databases support the TLS protocol that includes:

* Encryption - Each connection for data transmission is preceded with negotiation of a shared secret that is used to encrypt the traffic to make sure that the traffic is secure and reliable.
* Authentication - The client or server initiates a handshake with a certificate to verify that it communicates with an authorized entity.

When you enable TLS for a database or CRDB, encryption is enforced on either all communications or communications between clusters, and RS sends its certificate to clusters and clients for authentication to the database or CRDB. You can also configure a database or CRDB to require authentication with a certificate for traffic received from clusters or clients.

## Authentication for Databases

When you configure Replica Of for a database, synchronization traffic flows between the primary instance of the database and the replica instance of the database. You can configure authentication for Replica Of synchronization traffic only, or for all communications, including Replica Of synchronization traffic and data traffic between the database and the clients.

You can also specify that authentication is not enforced for traffic received from clusters or clients.

To enable TLS for Replica Of communication only for a database:

1. In **databases**, click ![Icon - Add](/images/rs/icon_add.png) to create a new 
   database or click on the database that you want to configure.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.
1. By default, client authentication is enforced so you must enter the syncer certificates of the clusters that host the replica instances of the database. The syncer certificate is shown in the Settings of the cluster.

    You can also clear **Enforce client authentication** so that all clusters or 
    clients can connect to your database without authentication.

To enable TLS for Replica Of and client communication for a database:

1. In **databases**, click ![Icon - Add](/images/rs/icon_add.png) to create a new database or click on the database that you want to configure.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS** and select **Require TLS for all communications** so that encryption and server authentication is used for Replica Of and client traffic.
1. By default, client authentication is enforced so you must enter:
    1. The syncer certificates of the clusters that host the replica instances of the database. The syncer certificate is shown in the Settings of the cluster.
    1. The certificates of the clients that connect to the database.

    You can also clear **Enforce client authentication** so that all clusters or clients can connect to your database without authentication.

## Authentication for CRDBs

When you create a new CRDB, you can configure authentication for CRDB synchronization traffic only or for all communications, including CRDB synchronization traffic and data traffic between the database and the clients.

You can also specify that authentication is not enforced for traffic received from clusters and clients.

Note: You cannot enable or disable TLS after the CRDB is created, but you can change the TLS configuration.

To enable TLS for CRDB communication only for a CRDB:

1. In **databases**, click ![Icon - Add](/images/rs/icon_add.png)  to create a new CRDB.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.

    Client authentication is enforced and the certificates for the participating clusters are used automatically.

To enable TLS for CRDB and client communication for a CRDB:

1. In **databases**, click ![Icon - Add](/images/rs/icon_add.png) to create a new CRDB.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.
1. After you create the CRDB, edit the CRDB settings and select **Require TLS for all communications** so that encryption and server authentication is used for CRDB and client traffic.
1. By default, client authentication is enforced so you must enter the certificates of the clients that connect to the database. The certificates for the participating clusters are used automatically.

    You can also clear **Enforce client authentication** so that all clusters or clients can connect to your database without authentication.