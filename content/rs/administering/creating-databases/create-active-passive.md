---
Title: Create an Active-Passive Geo-Replicated Database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/intercluster-replication/replica-of/
        /rs/administering/database-operations/create-active-passive/
---
[Active-Passive replicated databases]({{< relref "/rs/administering/designing-production/active-passive.md" >}}) (also known as Replica Of) give applications read-only access
to replicas of the data that are hosted in different geographical locations.

The source database can be located in the same Redis Enterprise Software (RS) cluster, in a different cluster, or in an OSS Redis database.
Your applications can connect to the source database to read and write data, or to the source or destination databases to read data.

Replica Of can replicate:

- One-to-many - Configure multiple destinations as Replica Of one source database.
- Many-to-one - Configure one destination as Replica Of multiple source databases.

{{< note >}}
When you add, remove, or edit Replica Of sources, the data is re-replicated from all source databases.
{{< /note >}}

## Configuring Replica Of

To configure a destination database as a Replica Of:

1. Open the database settings:
    1. For a new database, [create the database]({{< relref "/rs/administering/creating-databases/_index.md" >}}) with its settings.
    1. For an existing database:
        1. Go to **databases**.
        1. Click on the database and go to **configuration**.
        1. Click **Edit**.
1. Select **Replica Of** to show the ![icon_add](/images/rs/icon_add.png#no-click "Add") icon.
1. Click ![icon_add](/images/rs/icon_add.png#no-click "Add") to show the box for the source database endpoint.
1. Enter the URL of the source database endpoint:

    {{< note >}}
The order of the Replica Of sources has no impact on replication.
    {{< /note >}}

    - For a source database in the same RS cluster - When you click on the box,
    the available databases are shown in the correct format for the URL of the source endpoint:

        ```sh
        <database name>: redis://admin:<database_password>@<database_endpoint>:<database_port>
        ```

        You can select the database that you want to use as the source.

    - For a source database in a different RS cluster:
        1. Log in to the admin console of the cluster that hosts the source database.
        1. In **databases**, click on the database and go to **configuration**.
        1. Under **Endpoint**, click on **Get Replica Of source URL**.

            ![Replica Of source URL](/images/rs/replicaof-source-url.png)

        1. Click **Copy to Clipboard** to copy the URL of the source endpoint.

            If you want a different internal password, you can click **Regenerate Password**.

            {{< warning >}}
If you regenerate the password, replication to existing destinations fails until you update their configuration with the new password.
            {{< /warning >}}

        1. In the destination database, paste the URL of the source endpoint in the **Replica Of** box, and click ![Save](/images/rs/icon_save.png#no-click "Save").

        {{< note >}}
For a source database on a different RS cluster,
you can [compress the replication data]({{< relref "/rs/administering/designing-production/active-passive#data-compression-for-replica-of">}}) to save bandwidth.
        {{< /note >}}

    - For a source database in an OSS Redis cluster - Enter the URL of the source endpoint in the format:

        - If the database has a password -

            ```sh
            redis://:<redis_password>@<hostname>:<database_port>
            ```

            Where the password is the Redis password represented with URL encoding escape characters.

        - If the database has no password -

            ```sh
            redis://<hostname>:<database_port>
            ```

{{< note >}}
If you used the mDNS protocol for the cluster name (FQDN),
make sure that the [client mDNS prerequisites]({{< relref "/rs/installing-upgrading/configuring/mdns.md" >}}) are met.
{{< /note >}}

## Configuring TLS for Replica Of traffic on the destination database

When you enable TLS for Replica Of, the Replica Of synchronization traffic uses TLS certificates to authenticate the communication between the source and destination clusters.
To encrypt the Replica Of synchronization traffic, you must also [configure encryption for the source database](#configuring-encryption-of-replica-of-traffic-on-the-source-database).

To enable TLS for Replica Of in the destination database:

1. Hover over the URL of the source endpoint and click ![Unencrypted](/images/rs/icon_unlocked.png#no-click "Unencrypted"):

    ![Encrypt Replica-of](/images/rs/replicaof-unencrypted.png)

1. From the admin console of the cluster that hosts the source database,
    go to **settings** > **general** and copy the proxy certificate.
1. Paste it as the **Source Cluster Certificate** for the destination database:

    ![Replica-of Destination - Certificate](/images/rs/replicaof-certificate.png)

1. Click **Continue**, save the Replica Of endpoint, and click **Update** to save the changes.

## Configuring encryption of Replica Of traffic on the source database

{{< embed-md "tls-configuration-procedure.md"  >}}