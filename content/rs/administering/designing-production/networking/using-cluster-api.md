---
Title: Using the Cluster API
description: 
weight: $weight
alwaysopen: false
---
To use the cluster API, you must have a newly created database in your v5.x or higher Redis Enterprise Software (RS) cluster. If you have an existing database you would like to use with the cluster API, you must create a new database and migrate the data over using ReplicaOf.

Note: The cluster API setting is not cluster-wide, but on a per database basis.

## Configuring a New Redis Enterprise Software Database to Use the Cluster API

The first step is to find the newly created database’s ID, so we convert the correct database.

    $ sudo rladmin info db | grep test
    db:4 [test]:

In this example, the db’s ID is 4 and that is what we will need for <db-id> below.

Using the rladmin command line utility, enable the Cluster API for a specified database.

    $ sudo rladmin
    rladmin> tune db <database name or ID> oss_cluster enable

Note: To disable Cluster API with rladmin, run: tune db crdb oss_cluster disable

Finally, we need to reconfigure the database to load the new settings and restart the endpoint proxy.

    $ sudo rlutil dmc_reconf bdb=<db-id>

Once this is configured, to get the benefits of using the Cluster API, you must use a cluster-aware Redis clients such as redis-py-cluster or jedis, but there are others.

## Converting an existing Redis database to use the Cluster API

While there are commands to convert an existing database to be able to use the Cluster API, if that database has data in it, this process is not supported as you will lose some data in the conversion. The commands are designed for converting an empty database.

If you need a Cluster API enabled database, create a new database in a cluster that is Redis Enterprise Software v5 or higher. Then migrate the data from the existing database to the new database using ReplicaOf.
