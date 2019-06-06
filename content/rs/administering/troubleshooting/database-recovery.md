---
Title: Database Recovery
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When a cluster fails or a database is corrupted,
you must use database recovery to restore the configuration and data to a database.

Database recovery requires the database persistence files that are created by the cluster.
These files are stored in the [persistence storage location]
({{< relref "/rs/administering/designing-production/persistent-ephemeral-storage.md" >}}).

The database recovery process includes:

1. Identify recoverable databases.
1. Restore the database configurations.
1. Verify that the databases are active.

## Prerequisites

Before you start database recovery, you must:

- Make sure that the cluster that hosts the database is healthy.
    In the case of a cluster failure,
    you must [recover the cluster]({{< relref "/rs/administering/troubleshooting/cluster-recovery.md" >}}) before you recover the databases.
- Mount the persistent storage drives of the old cluster to the node.
    These drives contain the database persistence files.
    {{% note %}}
Make sure that the user redislabs has permissions to access the storage location
of the configuration and persistence files on each of the nodes.
    {{% /note %}}
- If you use local persistent storage, place all the recovery files on each of the cluster nodes.

{{% note %}}
We recommend that you allocate new persistent storage drives for the new cluster nodes.
If you decide to use the persistent storage drives of the old cluster nodes,
make sure that you backup all files on the old persistent storage drives to another location.
{{% /note %}}

## Recovering the Databases

After you prepare the cluster that hosts the database,
you can run the recovery process from the [rladmin]({{< relref "/rs/references/cli-reference/rladmin.md" >}})
command-line interface (CLI).

{{% note %}}
Before you run the recovery process on the machines from the original cluster with Redis processes running on the machine,
make sure to kill all Redis processes.
{{% /note %}}

To recover the database:

1. To see which databases are recoverable, run:

    ```src
    rladmin recover list
    ```

    The status for each database can be either ready for recovery or missing files.
    An indication of missing files in any of the databases can result from:

    - The recovery path of the nodes not set appropriately
    - Cannot read the persistence files, such as: no permission to read the files, missing files, or corrupted files

    If the the command indicates that there are missing files,
    make sure that the recovery path is set correctly on all of the nodes in the cluster.
    If that does not resolve the issues, [contact Redis Labs Support](mailto:support@redislabs.com).

1. After you recover all of the nodes,
    you can either recover the databases all at once or specify the database to recover:

    - To recover all of the databases, run: `rladmin recover all`
    - To recover a single databases, run: `rladmin recover db <database_id|name>`

    All databases are recovered with the same configuration they had in the old cluster.
    The data is recovered from the persistence files located in the persistent storage drives
    that you mounted to the nodes.

    - If AOF or snapshot is available, the data is restored from the AOF or snapshot. CRDB instances are then synced with the other participating clusters to update with data changed since the AOF or snapshot (fast CRDB sync).

        If AOF or snapshot is available for a CRDB but you want to get all of the data from the other participating clusters (slow CRDB sync), use: recover db only_configuration <db_name>

    - If AOF or snapshot is not available, the database is restored empty. CRDB instances are synced with the other participating clusters (slow CRDB sync).

    {{% note %}}
If the persistence files of the databases from the old cluster are not stored in the persistent storage location of the new node,
you must first map the recovery path of each node to the location of the old persistence files.
To do this, run the `node <id> recovery_path set` command in rladmin.
The persistence files for each database are located in the persistent storage path of the nodes from the old cluster, under the /redis directory.
    {{% /note %}}  

1. To verify that the recovered databases are now active, run: `rladmin status`

After the databases are recovered, make sure that your redis clients can successfully connect to the cluster.
