To encrypt Replica Of synchronization traffic, you must also [configure encryption for the destination database]({{< relref "/rs/databases/import-export/create-replica-of#configuring-tls-for-replica-of-traffic-on-the-destination-database" >}}).

### Configuring encryption for only Replica Of communication on the source database

To enable TLS for Replica Of communication only on the source database:

1. In **databases**, either:
    - Click ![icon_add](/images/rs/icon_add.png#no-click "Add") to create a new database.
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
    1. Click ![icon_add](/images/rs/icon_add.png#no-click "Add") to open the certificate box.

        ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png
        "Database TLS Configuration")

    1. Paste the text of the certificates in the box.
    1. Click ![icon_save](/images/rs/icon_save.png#no-click "Save")
    to save the certificates.

    You can also clear **Enforce client authentication** so that all clusters or
    clients can connect to your database without authentication.

    To encrypt Replica Of synchronization traffic, you must also [configure encryption for the destination database]({{< relref "/rs/databases/import-export/create-replica-of#configuring-tls-for-replica-of-traffic-on-the-destination-database" >}}).

### Configuring encryption for all communication on the source database

To enable TLS for Replica Of and client communication on the source database:

1. In **databases**, either:
    - Click ![icon_add](/images/rs/icon_add.png#no-click "Add")
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
    1. Click ![icon_add](/images/rs/icon_add.png#no-click "Add")
    to open the certificate box.

        ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png
        "Database TLS Configuration")

    1. Paste the text of the certificates in the box.
    1. Click ![icon_save](/images/rs/icon_save.png#no-click "Save")
    to save the certificates.

    You can also clear **Enforce client authentication** so that all clusters or
    clients can connect to your database without authentication.
