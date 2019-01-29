---
Title: Flushing Databases on Redis Enterprise Software
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
There are times where you want to delete all database data.

{{% warning title="Data Loss Warning" %}} The flush command deletes ALL of the data in the database. This
includes all data in memory and persisted to disk. We recommend that you
[backup your database]({{< relref "/rs/administering/database-operations/database-backup.md" >}}) first.{{% /warning %}}

### flushall for Redis Enterprise Software Databases

You can flush a database from the command line with the redis-cli command or with
your favorite Redis client.

Here is how to do it using redis-cli:

```src
$ redis-cli -h <hostname> -p <portnumber> -a <password> flushall
```

Example:

```src
$ redis-cli -h redis-12345.cluster.local -p 12345 -a xyz flushall
```

### Flushing Redis Enterprise Software CRDBs

When you flush a CRDB, all of the replicas flush their data at the same time.
To flush data from a CRDB, use the flush command in the crdb-cli.

1. To find the ID of the CRDB, run:

    ```src
    crdb-cli crdb list
    ```

    For example:

    ```src
    $ crdb-cli crdb list
    CRDB-GUID                                NAME                 REPL-ID CLUSTER-FQDN
    a16fe643-4a7b-4380-a5b2-96109d2e8bca     crdb1                1       cluster1.local
    a16fe643-4a7b-4380-a5b2-96109d2e8bca     crdb1                2       cluster2.local
    a16fe643-4a7b-4380-a5b2-96109d2e8bca     crdb1                3       cluster3.local
    ```

1. To flush the CRDB, run:

    ```src
    crdb-cli crdb flush --crdb-guid <CRDB_GUID>
    ```

    The command output contains the task ID of the flush task, for example:

    ```src
    $ crdb-cli crdb flush --crdb-guid a16fe643-4a7b-4380-a5b2-96109d2e8bca
    Task 63239280-d060-4639-9bba-fc6a242c19fc created
      ---> Status changed: queued -> started
    ```

1. To check the status of the flush task, run:

    ```src
    crdb-cli task status --task-id <Task-ID>
    ```

    For example:

    ```src
    $ crdb-cli task status --task-id 63239280-d060-4639-9bba-fc6a242c19fc
    Task-ID: 63239280-d060-4639-9bba-fc6a242c19fc
    CRDB-GUID: -
    Status: finished
    ```

To flush a CRDB with the REST API:

1. To find the ID of the CRDB, run:

    ```src
    curl -v -u <user>@<password> -X GET https://<cluster-fqdn>:9443/v1/crdbs/
    ```

1. To flush the CRDB, run:

    ```src
    curl -v -u <username>:<password> -X PUT https://<cluster-fqdn>:9443/v1/crdbs/<guid>/flush
    ```

    The command output contains the task ID of the flush task.

1. To check the status of the flush task, run:

    ```src
    curl -v -u <username>:<password> https://<cluster-fqdn>:9443/v1/crdb_tasks/<task-id>
    ```
