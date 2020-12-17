---
Title: Upgrading a Database to RediSearch 2.x
description:
weight: 30
alwaysopen: false
categories: ["Modules"]
module: RediSearch
---
RediSearch 2.x includes some significant changes to the architecture of RediSearch that provide improved functionality.
The main architectural change is that the indexes are stored outside of the Redis database that contains the data.
This allows for improvements in command efficiency and improvements in replication between clusters because the index changes are managed by the participating clusters rather than being synchronized with the data.

This change allows databases with RediSearch to support:

- [Active-Active databases]({{< relref "/modules/redisearch/redisearch-active-active.md" >}})
- Database cluster re-sharding
- Replica Of to a sharded destination database
- [EXPIRE](https://redis.io/commands/ttl) of documents reflected in the index

In addition, RediSearch 2.x indexes data that already existed in the database at the time that the index was created.

To upgrade a Redis Enterprise Software (RS) database with RediSearch 1.x to RediSearch 2.x, you have to set up a new database with RediSearch 2.x and use the `RediSearch_Syncer.py` script to replicate the data from the old database into the new database.

{{< note >}}
After you create the database or after you replicate the data, [create an index](https://oss.redislabs.com/redisearch/Commands/#ftcreate) with a prefix or filter that defines the keys that you want to index.
{{< /note >}}

## Prerequisites

Make sure that you have Python 3 (`sudo apt install python3`) installed on the host where you will run the synchronization script.

## Limitations

1. Suggestions (`FT.SUG` APIs) and spell check dictionaries are not replicated from the source database. You need to add them manually.
1. If there are multiple indexes on the source and the documents do not have prefixes that identify them with an index, RediSearch 2.x can't index the documents in their respective indexes.
1. The NOSAVE option is no longer supported. Indexes created with the NOSAVE option can't be upgraded.
1. Databases that contain temporary indexes can't be upgraded.
1. Any attempt to add, delete, or modify an index during the upgrade will cause the replication to fail. During the upgrade, the source database can only receive ft.add and ft.del commands.

## Replicating data from RediSearch 1.x to RediSearch 2.x:

To replicate a RediSearch 1.x database to a RediSearch 2.x database:

1. Log in to the web UI of the RS cluster that you want to host the new database with RediSearch 2.x.
1. Add the RediSearch 2.x module to the cluster:
    1. Go to the [Redis Labs Download Center](https://redislabs.com/download-center/modules/) and download the RediSearch 2.x module package.
    1. In the Redis Enterprise web UI, go to the: **settings**
    1. In **redis modules**, click **Add Module**.

       ![upgrade_module-1](/images/rs/upgrade_module-1.png)

    1. Browse to the module package and upload it to the cluster.
1. Create a new database with RediSearch 2.x:
    1. [Create a database]({{< relref "/rs/administering/creating-databases/_index.md" >}}) and configure the database settings.
    1. In the Redis Modules section, click ![Add](/images/rs/icon_add.png#no-click "Add"), select **RediSearch 2**, and click ![Save](/images/rs/icon_save.png#no-click "Save").
    1. Click **Activate** to create the database.
1. Migrate the data to the RediSearch 2.x database:
    1. Download the RediSearch_Syncer package for your operating system.
        - [RedHat Enterprise Linux 7](http://redismodules.s3.amazonaws.com/redisearch/RediSearchSyncer/RediSearchSyncer-rhel7.zip)
        - [Ubuntu 18.04](http://redismodules.s3.amazonaws.com/redisearch/RediSearchSyncer/RediSearchSyncer-bionic.zip)
        - [Ubuntu 16.04](http://redismodules.s3.amazonaws.com/redisearch/RediSearchSyncer/RediSearchSyncer-xenial.zip)
        - [Ubuntu 14.04](http://redismodules.s3.amazonaws.com/redisearch/RediSearchSyncer/RediSearchSyncer-trusty.zip)
    1. Extract the package with: `unzip <package_name>`
    1. In the extracted directory, run the RediSearch_Syncer.py script:

        ```sh
        python3 RediSearch_Syncer.py -d <destination_url> -s <source_url> [-l] [--add-prefix <prefix>]
        ```

        Where:

        - `destination url` - The replication URL of the RediSearch 2.x database that you see when you click on **Get Replica of source URL** in the database configuration in the web UI.
        - `source url` - The replication URL of the RediSearch 1.x database that you see when you click on **Get Replica of source URL** in the database configuration in the web UI.
        - `--add-prefix <prefix>` (optional) - Adds a prefix to all of the hashes that are replicated to the new database.

            {{< note >}}
The `add-prefix` option is only recommended when you want to index all of the hashes in the same index in the source database.
            {{< /note >}}

        The script shows a table with the progress of the replication.
        Press **F5** to see the updated status of the replication process.

        For example:

        ```sh
        python RediSearch_Syncer.py -d redis://admin:IBrS0xaL6rShfB1wKTtUkcQG1g3UWAlTd53AotPdTcQvGIVP@redis-19472.cluster1.local:19472 -s redis://admin:1GjFuUbBqTSPDbRfaxEPLSoXpFmRdFxmBKMD0BuxwMJ2DEaO@redis-19636.cluster1.local:19636
        ```

    1. Stop the processes that are sending requests to the source database so all of the data gets synchronized to the destination database.
    1. Verify that the replication is complete in `shard-cli`:

        1. Connect to each shard in the source database and run `info replication` to see the replication offset.
        1. Compare that replication offset to the offset reported by the syncer.

    1. When the status field is `st_in_sync` then you can press **Ctrl-C** to cancel the synchronization process.
    1. Press **Q** to quit the `RediSearch_Syncer.py`.

You can now redirect your database connections to the database with RediSearch 2.x.

