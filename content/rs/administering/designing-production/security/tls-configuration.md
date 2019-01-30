---
Title: Configuring TLS Authentication and Encryption
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To prevent unauthorized access to your data, RS databases support the TLS protocol
(the more secure successor to SSL) that includes:

- Encryption - Makes sure that the traffic can only be read by the sender and
  recipient.
- Authentication - The server or client makes sure that it communicates with an
  authorized entity.

When you enable TLS for a database or CRDB, encryption is enforced on either all
communications or only communications between clusters, and RS sends its certificate
to clusters and clients for authentication to the database or CRDB. You can also
configure a database or CRDB to require authentication with a certificate for traffic
received from clusters or clients.

Related topics:

- You can use the REST API to [update the server TLS certificates and TLS protocol version]
  ({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).
- To encrypt Replica Of synchronization traffic, you must also [configure encryption
  for the destination database]({{< relref
  "/rs/administering/intercluster-replication/replica-of.md#encryption" >}}).

## Authentication for Databases

When you configure Replica Of for a database, synchronization traffic flows between the
source and destination databases. You can
configure authentication for Replica Of synchronization traffic only, or for all
communications including Replica Of synchronization traffic and data traffic between
the database and the clients.

You can also specify that authentication is not enforced for traffic received from
clusters or clients.

{{% excerpt %}}
### Configuring TLS for Replica Of communication only on the source database

To enable TLS for Replica Of communication only on the source database:

1. In **databases**, either:
    - Click ![icon_add](/images/rs/icon_add.png "Add") to create a new database.
    - Click on the database that you want to configure and at the bottom of the
    page click **edit**.
1. Enable **TLS**.

    ![database-tls-config](/images/rs/database-tls-config.png "Database TLS Configuration")

1. Select the communication that you want to secure: 
    - For a new database - **Require TLS for Replica Of communications only** is
    selected by default.
    - For an existing database that is configured to **Require TLS for all
    communications** - Select **Require TLS for Replica Of communications only**.

    By default, client authentication is enforced so you must enter the syncer certificates
    of the clusters that host the destination databases.

1. To enter the syncer certificates:
    1. Copy the syncer certificates for each cluster with a destination database:
        1. Login to the cluster.
        1. Go to **Settings**.
        1. In the syncer certificates box, copy the entire text of the certificate.
    1. Click ![icon_add](/images/rs/icon_add.png "Add") to open the certificate box.

        ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png
        "Database TLS Configuration")

    1. Paste the text of the certificates in the box.
    1. Click ![icon_save](/images/rs/icon_save.png "Save")
    to save the certificates.

    You can also clear **Enforce client authentication** so that all clusters or
    clients can connect to your database without authentication.

    To encrypt Replica Of synchronization traffic, you must also [configure encryption
    for the destination database]({{< relref 
    "/rs/administering/intercluster-replication/replica-of.md#encryption" >}}).

### Configuring TLS for all communication on the source database

To enable TLS for Replica Of and client communication on the source database:

1. In **databases**, either:
    - Click ![icon_add](/images/rs/icon_add.png "Add")
    to create a new database.
    - Click on the database that you want to configure and at the bottom of the
    database page click **edit**.
1. Enable **TLS** and select **Require TLS for all communications**.

    ![database-tls-all](/images/rs/database-tls-all.png "database-tls-all")

    By default, client authentication is enforced so you must enter the syncer
    certificates of the clusters that host the destination databases.
    The certificates of the clients that connect to the database.

1. To enter the syncer and client certificates:
    1. Copy the entire text of the syncer and client certificates.

        For each cluster with a destination database:

        1. Login to the cluster.
        1. Go to **Settings**.
        1. In the syncer certificates box, copy the entire text of the certificate.
    1. Click ![icon_add](/images/rs/icon_add.png "Add")
    to open the certificate box.

        ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png
        "Database TLS Configuration")

    1. Paste the text of the certificates in the box.
    1. Click ![icon_save](/images/rs/icon_save.png "Save")
    to save the certificates.

    You can also clear **Enforce client authentication** so that all clusters or
    clients can connect to your database without authentication.

    To encrypt Replica Of synchronization traffic, you must also [configure encryption
    for the destination database]({{< relref
    "/rs/administering/intercluster-replication/replica-of.md#encryption" >}}).
{{% /excerpt %}}

## Authentication for CRDBs

When you create a new CRDB, you can configure authentication for CRDB synchronization
traffic only or for all communications, including CRDB synchronization traffic and
data traffic between the database and the clients.

You can also specify that authentication is not enforced for traffic received from
clusters and clients.

Note: You cannot enable or disable TLS after the CRDB is created, but you can change
the TLS configuration.

### Configuring TLS for CRDB communication only

To enable TLS for CRDB communication only for a CRDB:

1. In **databases**, click ![icon_add](/images/rs/icon_add.png "Add")
    to create a new CRDB.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.

![crdb-tls-config-enable](/images/rs/crdb-tls-config-enable.png "crdb-tls-config-enable")

Client authentication is enforced and the certificates for the participating clusters
are used automatically.

### Configuring TLS for CRDB and client communication

To enable TLS for CRDB and client communication for a CRDB:

1. In **databases**, click ![icon_add](/images/rs/icon_add.png "Add")
    to create a new CRDB.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.

    ![crdb-tls-config-enable](/images/rs/crdb-tls-config-enable.png "crdb-tls-config-enable")

1. After you create the CRDB on all participating clusters, on the participating clusters
    for which you want to require TLS for all communications, edit the CRDB instance and
    select **Require TLS for all communications**.

    ![crdb-tls-all](/images/rs/crdb-tls-all.png "crdb-tls-all")

    By default, client authentication is enforced so you must enter the certificates
    of the clients that connect to the database. The certificates for the participating
    clusters are used automatically.

1. To enter the client certificates:
    1. Copy the entire text of the client certificates.
    1. Click ![icon_add](/images/rs/icon_add.png "Add")
    to open the certificate box.
    1. Paste the text of the certificates in the box.
    1. Click ![icon_save](/images/rs/icon_save.png "Save")
    to save the certificates.

    ![crdb-tls-all-certs](/images/rs/crdb-tls-all-certs.png "crdb-tls-all-certs")

    You can also clear **Enforce client authentication** so that all clusters or clients
    can connect to your database without authentication.
