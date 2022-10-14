---
Title: Create a database with Replica Of
linkTitle: Create Replica Of database
description: Create Replica Of database
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: [ 
    /rs/administering/intercluster-replication/replica-of/, 
    /rs/administering/database-operations/create-active-passive/,
    /rs/administering/creating-databases/create-active-passive/,
    /rs/databases/import-export/create-replica-of.md, 
    /rs/databases/import-export/create-replica-of/,
    /rs/databases/import-export/replica-of/create.md,
    /rs/databases/import-export/replica-of/create/,
]
---
Replica databases copy data from source databases (previously known as _master_), which enable read-only connections from apps and clients located in different geographic locations.

To create a replica connection, you define a database as a replica of a source database.  Replica Of databases (also known as _Active-Passive databases_) synchronize in the background.

Sources databases can be:

- Located in the same Redis Enterprise Software cluster
- Located in a different Redis Enterprise cluster
- Hosted by a different deployment, e.g. Redis Enterprise Cloud
- Open source Redis (OSS) databases

Your apps can connect to the source database to read and write data; they can also use any replica for read-only access.

Replica Of can model a variety of data relationships, including:

- One-to-many relationships, where multiple replicas copy a single source database.
- Many-to-one relationships, where a single replica collects data from multiple source databases.

When you change the replica status of a database by adding, removing, or changing sources, the replica database is synchronized to the new sources.  

## Configure Replica Of

To configure a destination database as a Replica Of:

1. Open the database settings:

    1. For a new database, [create the database]({{<relref "/rs/databases/create.md" >}}) with its settings.

    1. For an existing database:

        1. Go to **databases**.
        1. Select the database and then select the **Configuration** tab.
        1. Select the **Edit** button.

1. Select **Replica Of** to display the **Add** button.  
![icon_add](/images/rs/icon_add.png#no-click "Add")

1. Select the **Add** button to display the source database prompt.

1. Enter the URL of the source database endpoint.

    The order of the multiple Replica Of sources has no material impact on replication.

    - For a source database in the same Redis Enterprise cluster - Enter the URL of the source database in the following format:

    ```sh
    <database name>: redis://admin:<password>@<endpoint>:<port>
    ```

    You can select the database that you want to use as the source.

    - For a source database in a different cluster:

        1. Sign in to the admin console of the cluster hosting the source database.
        1. In **Databases**, select the source database and then select the **Configuration** tab.
        1. Under **Endpoint**, select **Get Replica Of source URL**.

            ![Replica Of source URL](/images/rs/replicaof-source-url.png)

        1. Select **Copy to Clipboard** to copy the URL of the source endpoint to your Clipboard.

            To change the internal password, select **Regenerate Password**.

            If you regenerate the password, replication to existing destinations fails until their credentials are updated with the new password.

        1. In the destination database, paste the URL of the source endpoint to the **Replica Of** edit box.  
        
        1. Use the **Save** button to save your changes.  
        ![Save](/images/rs/icon_save.png#no-click "Save")

        For source databases on different clusters, you can [compress replication data]({{<relref "/rs/databases/import-export/replica-of/#data-compression-for-replica-of">}}) to save bandwidth.
        
    - For a source database on an open source Redis (OSS) cluster - Enter the URL of the source endpoint in one of the following formats:

        - For databases with passwords:

            ```sh
            redis://:<password>@<host>:<port>
            ```

            Where the password is the Redis password represented with URL encoding escape characters.

        - For databases without passwords:

            ```sh
            redis://<host>:<port>
            ```

For best results when using the [Multicast DNS](https://en.wikipedia.org/wiki/Multicast_DNS) (mDNS) protocol to resolve the fully-qualified domain name (FQDN) of the cluster, verify that your client connections meet the [client mDNS prerequisites]({{< relref "/rs/networking/mdns.md" >}}).

## Configure TLS on replica database

When you enable TLS for Replica Of, the Replica Of synchronization traffic uses TLS certificates to authenticate the communication between the source and destination clusters.

To encrypt the Replica Of synchronization traffic, you must also [configure encryption for the source database](#encrypt-source-database-traffic).

To enable TLS for Replica Of in the destination database:

1. Select the **Enable TLS Authentication** button.  
   ![Enable TLS Authentication button](/images/rs/icon_unlocked.png#no-click "Enable TLS Authentication button")

    ![Encrypt Replica-of](/images/rs/replicaof-unencrypted.png)

1. From the admin console of the cluster hosting the source database,
    select the **Settings** menu and then go to the **General** tab.  Copy the full text of the proxy certificate to the Clipboard.

1. Enter the copied certificate text as the **Source Cluster Certificate** for the destination database:

    ![Replica-of Destination - Certificate](/images/rs/replicaof-certificate.png)

1. Select **Continue** to save the certificate, save the Replica Of endpoint, and then select  **Update** to save your changes.

## Encrypt source database traffic

{{< embed-md "tls-configuration-procedure.md"  >}}