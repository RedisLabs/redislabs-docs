---
Title: Migrate a Database to Active-Active
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
With [Active-Active databases]({{< relref "/rs/administering/designing-production/active-active.md" >}}), applications can read and write to the same data set from different geographical locations seamlessly and with latency less than 1 ms, without changing the way the application connects to the database.
Active-Active databases also provide disaster recovery and accelerated data read-access for geographically distributed users.

If you have data in a single-region database that you want to migrate to an Active-Active database,
you'll need to create a new Active-Active database and migrate the data into the new database as a [Replica Of](https://docs.redislabs.com/latest/rs/administering/active-passive/) the existing database.
This process will gradually populate the data in the Active-Active database.

Before data migration starts, all data is flushed from the Active-Active database.
The data is migrated to the Active-Active instance where you enabled Replica Of, and then the Active-Active replication copies the data to the other Active-Active instances.
When data migration is finished, disable Replica Of and connect your applications to the Active-Active database.

{{< note >}}
During the migration, make sure that any applications that connect to the Active-Active database are **read-only**
to make sure that dataset is unchanged in the migration process.
{{< /note >}}

To migrate an RS database to Active-Active:

1. Create a new [Active-Active database]({{< relref "/rs/administering/creating-databases/create-active-active.md" >}}).

    After the Active-Active database is activated, you see the database's configuration.

1. Click **Edit** at the bottom of the database configuration.
1. Enable **Migration using Replica Of**.
1. Click **Continue** to confirm that you want to flush the data from the Active-Active database.
1. Enter the URL of the source database endpoint:

    <!-- Shared in create-active-passive.md -->

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
        1. Log in to the Web UI of the cluster that hosts the source database.
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
