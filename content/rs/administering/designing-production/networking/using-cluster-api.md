---
Title: Using the OSS Cluster API
description: 
weight: $weight
alwaysopen: false
---
To use the OSS Cluster API, you must have a newly created database 
in your v5.x or higher Redis Enterprise Software (RS) cluster. 
If you have an existing database you want to use with the OSS Cluster API, 
you must create a new database and migrate the data over using ReplicaOf.

Note: The OSS Cluster API setting is not cluster-wide. 
The setting only applies to the specified database.

## Configuring a New RS Database to Use the OSS Cluster API

To configure a new RS database to use the OSS Cluster API:

1. Make sure that the database meets these requirements:
    * The database must use the standard hashing policy.
    * The database proxy policy is `all-master-shards`.
    * The database proxy policy must not use include or exclude.
1. Find the database ID to make sure that we convert the correct database.

    ```sh
    $ sudo rladmin info db | grep test
    db:4 [test]:
    ```

    In this example, the db ID is 4.

1. Using the rladmin command line utility, enable the OSS Cluster API 
for the specified database.

    ```sh
    $ sudo rladmin
    rladmin> tune db <database name or ID> oss_cluster enable
    ```

    Note: To disable OSS Cluster API with rladmin, run: tune db crdb oss_cluster disable

1. Reconfigure the database to load the new settings and restart the endpoint proxy.

    ```sh
    $ sudo rlutil dmc_reconf bdb=<db-id>
    ```

To get the benefits of using the OSS Cluster API, make sure that your Redis clients 
are cluster-aware, such as redis-py-cluster or jedis.

## Converting an existing Redis database to use the OSS Cluster API

While there are commands to convert an existing database to be able to use the OSS Cluster API, if that database has data in it, this process is not supported as you will lose some data in the conversion. The commands are designed for converting an empty database.

If you need a OSS Cluster API enabled database, create a new database in a cluster that is Redis Enterprise Software v5 or higher. Then migrate the data from the existing database to the new database using ReplicaOf.
