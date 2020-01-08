---
Title: Create an Active-Passive Geo-Replicated Database (Replica Of)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/intercluster-replication/replica-of/
---
[Active-Passive replicated databases]({{< relref "/rs/administering/active-passive.md" >}}) (also known as Replica Of) give applications read-only access
to replicas of the data set in different geographical locations.

The source database can be located in the same cluster, in a different cluster, or in an OSS Redis database.
Your applications can connect to the source database to write to the database and to the source or destination databases to read from the database.

Replica Of can replicate:

- One-to-many - Configure multiple destinations as Replica Of one source database.
- Many-to-one - Configure one destination as Replica Of multiple source databases.

{{% note %}}
When you add, remove, or edit Replica Of sources, the data is re-replicated from all source databases.
{{% /note %}}

## Configuring Replica Of

To configure a destination database as a Replica Of:

1. Open the database settings:
    1. For a new database, [create the database]({{< relref "/rs/administering/database-operations/creating-database.md" >}}) with its settings.
    1. For an existing database:
        1. Go to **databases**.
        1. Click on the database and go to **configuration**.
        1. Click **Edit**.
1. Select **Replica of** to show the ![icon_add](/images/rs/icon_add.png "Add") icon.
1. Click ![icon_add](/images/rs/icon_add.png "Add") to show the box for the source database endpoint.
1. Enter the URL of the source database endpoint:

    {{% note %}}
The order of the Replica Of sources has no impact on replication.
    {{% /note %}}

    - For a source database in the same RS cluster - When you click on the box,
    the available databases are shown in the correct format for the URL of the source endpoint:

    ```src
    redis://admin:<database_password>@<database_endpoint>:<database_port>
    ```

    You can select the database that you want to use as the source.

    - For a source database in a different RS cluster:
        1. Log in to the Web UI of the cluster that hosts the source database.
        1. In **databases**, click on the database and go to **configuration**.
        1. Under **Endpoint**, click on **Get Replica of source URL**.

            ![Replica Of source URL](/images/rs/replicaof-source-url.png)

        1. Click **Copy to Clipboard** to copy the URL of the source endpoint.

            If you want a different internal password, you can click **Regenerate Password**.

            {{% caution %}}
If you regenerate the password, replication to existing destinations fails until you update their configuration with the new password.
            {{% /caution %}}

        1. In the destination database, paste the URL of the source endpoint in the **Replica Of** box, and click ![Save](/images/rs/icon_save.png#no-click "Save").

        {{% note %}}
For a source database on a different RS cluster, you can [compress the replication data]({{< relref "/rs/administering/active-passive.md#data-compression-for-replica-of">}}) to save bandwidth.
        {{% /note %}}

    - For a source database in an OSS Redis cluster - Enter the URL of the source endpoint in the format:

        - If the database has a password -

        ```src
        redis://:<redis_password@<hostname>:<database_port>
        ```

        Where the password is the Redis password represented with URL encoding escape characters.

        - If the database has no password -

        ```src
        redis://<hostname>:<database_port>
        ```

{{% note %}}
If you used the mDNS protocol for the cluster name (FQDN),
make sure that the [client mDNS prerequisites]({{< relref "/rs/installing-upgrading/configuring/mdns.md" >}}) are met.
{{% /note %}}

## Configuring TLS for Replica Of on the destination database

To enable TLS for Replica Of in the destination database:

1. Edit the 'Replica of' section of the destination Database to point
    the source Database and press the 'Enable TLS Authentication' icon:
    ![Replica-of
    Destination](/images/rs/Screen-Shot-2018-03-29-at-10.48.18-PM.png?width=1608&height=178)
    Replica-of Destination
2. From the *source cluster*, copy the "Proxy
    Certificate" (located under **settings**-\> **general**) and paste
    it as the **Source Cluster Certificate** for the destination
    Database:
    ![Replica-of Destination -
    Certificate](/images/rs/Screen-Shot-2018-03-29-at-10.49.55-PM.png?width=1596&height=626)
    Replica-of Destination - Certificate
3. Press the **Continue** button, save the certificate and **Update**
    the database changes.

## Encryption of Replica Of 

{{< embed-md "tls-configuration-procedure.md"  >}}