---
Title: Upgrading a Database to RediSearch 2.x
description:
weight: 30
alwaysopen: false
categories: ["Modules"]
module: RediSearch
---
RediSearch 2.x includes some significant changes to the architecture of RediSearch that provide improved functionality.
The main architectural change is that the indexes are stored outside of the redis database that contains the data.
This allows for improvements in command efficiency.
It also allows for improvements in replication between clusters because the index changes are managed by the participating clusters rather than being synchronized with the data.

This change allows databases with RediSearch to support:

- Active-Active databases
- Database clustering (sharding)
- Replica Of to sharded destination database
- EXPIRE of documents reflected in the index

To upgrade a Redis Enterprise Software (RS) database with RediSearch 1.x to RediSearch 2.x, you have to set up a new database with RediSearch 2.x and use the `RediSearch_Syncer.py` script to replicate the data from the old database into the new database.

To upgrade a RediSearch 1.x database to RediSearch 2.x:

1. Log in to the web UI of the RS cluster that you want to host the new database with RediSearch 2.x.
1. Add the RediSearch 2.x module to the cluster:
    1. Go to the [Redis Labs Download Center](https://redislabs.com/download-center/modules/) and download the RediSearch 2.x module package.
    1. In the Redis Enterprise web UI, go to the: **settings**
    1. In **redis modules**, click **Add Module**.

       ![upgrade_module-1](/images/rs/upgrade_module-1.png?width=1600&height=956)

    1. Browse to the module package and upload it to the cluster.
1. Create a new database :
    1. [Create a database]({{< relref "/rs/administering/creating-databases/_index.md" >}}) and configure the database settings.
    1. In the Redis Modules section, click ![Add](/images/rs/icon_add.png#no-click "Add"), select **RediSearch 2**, and click ![Save](/images/rs/icon_save.png#no-click "Save").
    1. Click **Activate** to create the database.
1. Migrate the data to the RediSearch 2.x database:
    1. Download the RediSearch_Syncer package for your operating system.
    1. Extract the package.
    1. In the extracted directory, run the RediSearch_Syncer.py script:

        ```sh
        python RediSearch_Syncer.py -d <destination_url> -s <source_url> [-l] [--add-prefix <prefix>]
        ```

        Where:

        - `destination url` - The replication URL of the RediSearch 2.x database that you see when you click on **Get Replica of source URL** in the database configuration in the web UI.
        - `source url` - The replication URL of the RediSearch 1.x database that you see when you click on **Get Replica of source URL** in the database configuration in the web UI.
        - `--add-prefix <prefix>` (optional) - Adds a prefix to the keys that are migrated to the new database

        The script shows a table with the progress of the replication.
        Press **F5** to see the updated status of the replication process.

    1. Stop the processes that are sending requests to the source database so all of the data gets synchronized to the destination database.
    1. When the status field is `st_in_sync` then you can press **Ctrl-C** to cancel the synchronization process.

        {{< note >}}
        You can also verify that the replication is complete in `shard-cli`. Connect to each shard in the source database and run `info replication` to see the replication offset.
        Then connect to each shard in the destination database and make sure that the offset reported in `info replication` is the same as for the shard in the source database.
        {{< /note >}}

    1. Press **Q** to quit the `RediSearch_Syncer.py`.
