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

        ```
        python RediSearch_Syncer.py -d <destination_url> -s <source_url> [-l] [--add-prefix <prefix>]
        ```

        Where:

        - `destination url` - 
        - `source url` - 
        - `-l` -
        - `--add-prefix <prefix>` -

        The script shows a table with the progress of the replication.
    
    1. Stop the traffic on the source database *?*
    1. Go to each shard of the database and run `rladmin info replication`.
    
        When the offset of each shard in the replication shown in `rladmin info replication` matches the `repl_offset`,
        the replication is complete.

    1. Stop the `RediSearch_Syncer.py` script.