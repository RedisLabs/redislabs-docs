To encrypt Replica Of synchronization traffic, you must also [configure encryption for the destination database]({{< relref "/rs/databases/import-export/replica-of/create#configuring-tls-for-replica-of-traffic-on-the-destination-database" >}}).

### Encrypt source synchronization traffic

To enable TLS for Replica Of communication only on the source database:

1. In **databases**, either:
    - Create a new database.
    - Select a database to configure and then select **Edit**.

1. Enable **TLS**.

    ![database-tls-config](/images/rs/database-tls-config.png "Database TLS Configuration")

1. Select the communication that you want to secure:

    - For a new database - **Require TLS for Replica Of communications only** is
    selected by default.

    - For an existing database that is configured to **Require TLS for all
    communications** - Select **Require TLS for Replica Of communications only**.

    By default, client authentication is enforced.  This means must enter the syncer certificates
    of the clusters hosting the replicas (the destination databases).

1. To enter the syncer certificates:

    1. Copy the syncer certificates for each cluster with a destination database:
    
        1. Sign in to the cluster.
        1. Go to **Settings**.
        1. In the syncer certificates box, copy the full text of the certificate to the Clipboard.

    1. Select the **Add** button to open the certificate dialog.  
    ![icon_add](/images/rs/icon_add.png#no-click "Add button") 

        ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png
        "Database TLS Configuration")

    1. Paste the certificate text into the text box below the **Enforce client authentication** checkbox.

    1. Use the **Save** button to save the certificates.  
    ![icon_save](/images/rs/icon_save.png#no-click "Save button")

    You can also clear **Enforce client authentication** so that all clusters or
    clients can connect to your database without authentication.

    To encrypt Replica Of synchronization traffic, you must also [configure encryption for the destination database]({{< relref "/rs/databases/import-export/replica-of/create#configuring-tls-for-replica-of-traffic-on-the-destination-database" >}}).

### Encrypt all source communication

To enable TLS for Replica Of and client communication on the source database:

1. From the **Databases** menu of the admin console, either:

    - Create a new database.

    - Select an existing database and then select the **Edit** button.

1. Enable **TLS** and select **Require TLS for all communications**.

    ![database-tls-all](/images/rs/database-tls-all.png "database-tls-all")

    By default, client authentication is enforced so you must enter the syncer
    certificates of the clusters that host the destination databases.
    The certificates of the clients that connect to the database.

1. To enter the syncer and client certificates:

    1. Copy the entire text of the syncer and client certificates.

        For each cluster with a destination database:

        1. Sign in to the cluster.
        1. Go to **Settings**.
        1. In the syncer certificates box, copy the full text of the certificate to the Clipboard.

    1. Use the **Add** button to open the certificate dialog.  
    ![icon_add](/images/rs/icon_add.png#no-click "Add button")

        ![database-tls-replica-certs](/images/rs/database-tls-replica-certs.png
        "Database TLS Configuration")

    1. Paste the certificate text into the text box below the **Enforce client authentication** checkbox.
    1. Use the **Save** button to save your changes.  
    ![icon_save](/images/rs/icon_save.png#no-click "Save button") 

    You can also clear the **Enforce client authentication** checkbox to allow 
    client connections without authentication.
