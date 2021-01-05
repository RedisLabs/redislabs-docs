---
Title: Configuring TLS Authentication and Encryption
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To prevent unauthorized access to your data, Redis Enterprise Software (RS) databases support the TLS protocol
(the more secure successor to SSL) that includes:

- Encryption - Makes sure that the traffic can only be read by the sender and
  recipient.
- Authentication - The server or client makes sure that it communicates with an
  authorized entity.

When you enable TLS for a database or Active-Active database, encryption is enforced on either all
communications or only communications between clusters, and RS sends its certificate
to clusters and clients for authentication to the database or Active-Active database. You can also
configure a database or Active-Active database to require authentication with a certificate for traffic
received from clusters or clients.

Related topics:

- You can use the REST API to [update the server TLS certificates and TLS protocol version]({{< relref "/rs/administering/cluster-operations/updating-certificates.md" >}}).
- To encrypt Replica Of synchronization traffic, you must also [configure encryption for the destination database]({{< relref "/rs/administering/creating-databases/create-active-passive#configuring-tls-for-replica-of-traffic-on-the-destination-database" >}}).

## Authentication for databases

When you configure Replica Of for a database, synchronization traffic flows between the
source and destination databases. You can
configure authentication for Replica Of synchronization traffic only, or for all
communications including Replica Of synchronization traffic and data traffic between
the database and the clients.

You can also specify that authentication is not enforced for traffic received from
clusters or clients.

{{< embed-md "tls-configuration-procedure.md"  >}}

## Authentication for Active-Active databases

When you create a new Active-Active database, you can configure authentication for Active-Active synchronization
traffic only or for all communications, including Active-Active synchronization traffic and
data traffic between the database and the clients.

You can also specify that authentication is not enforced for traffic received from
clusters and clients.

{{< note >}}
You cannot enable or disable TLS after the Active-Active database is created,
but you can change the TLS configuration.
{{< /note >}}

### Configuring TLS for Active-Active communication only

To enable TLS for Active-Active communication only for an Active-Active database:

1. In **databases**, click ![icon_add](/images/rs/icon_add.png#no-click "Add")
    to create a new Active-Active database.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.

![crdb-tls-config-enable](/images/rs/crdb-tls-config-enable.png "crdb-tls-config-enable")

Client authentication is enforced and the certificates for the participating clusters
are used automatically.

### Configuring TLS for Active-Active and client communication

To enable TLS for Active-Active and client communication for an Active-Active database:

1. In **databases**, click ![icon_add](/images/rs/icon_add.png#no-click "Add")
    to create a new Active-Active database.
1. In **configuration**, at the bottom of the page click **edit**.
1. Enable **TLS**.

    ![crdb-tls-config-enable](/images/rs/crdb-tls-config-enable.png "crdb-tls-config-enable")

1. After you create the Active-Active database on all participating clusters, on the participating clusters
    for which you want to require TLS for all communications, edit the Active-Active database instance and
    select **Require TLS for all communications**.

    ![crdb-tls-all](/images/rs/crdb-tls-all.png "crdb-tls-all")

    By default, client authentication is enforced so you must enter the certificates
    of the clients that connect to the database. The certificates for the participating
    clusters are used automatically.

1. To enter the client certificates:
    1. Copy the entire text of the client certificates.
    1. Click ![icon_add](/images/rs/icon_add.png#no-click "Add")
    to open the certificate box.
    1. Paste the text of the certificates in the box.
    1. Click ![icon_save](/images/rs/icon_save.png#no-click "Save")
    to save the certificates.

    ![crdb-tls-all-certs](/images/rs/crdb-tls-all-certs.png "crdb-tls-all-certs")

    You can also clear **Enforce client authentication** so that all clusters or clients
    can connect to your database without authentication.
