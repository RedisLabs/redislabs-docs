---
Title: Flush database data
linkTitle: Flush database
description: To delete the data in a database without deleting the database, you can use Redis CLI to flush it from the database.  You can also use Redis CLI, the admin console, and the Redis Software REST API to flush data from Active-Active databases.
weight: 80
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/database-operations/flush-db-crdb/,
    /rs/databases/import-export/flush-db-crdb.md,
    /rs/databases/import-export/flush-db-crdb/,
]
---
To delete the data in a database without deleting the database configuration,
you can flush the data from the database.

You can use the admin console to flush data from Active-Active databases.

{{< warning title="Data Loss Warning" >}}
The flush command deletes ALL in-memory and persistence data in the database.
We recommend that you [backup your database]({{< relref "/rs/databases/import-export/database-backup.md" >}}) before you flush the data.
{{< /warning >}}

## Flush data from a database

From the command line, you can flush a database with the redis-cli command or with your favorite Redis client.

To flush data from a database with the redis-cli, run:

```sh
redis-cli -h <hostname> -p <portnumber> -a <password> flushall
```

Example:

```sh
redis-cli -h redis-12345.cluster.local -p 12345 -a xyz flushall
```

## Flush data from an Active-Active database

When you flush an Active-Active database (formerly known as CRDB), all of the replicas flush their data at the same time.

To flush data from an Active-Active database:

- admin console

    1. Go to **database** and select the Active-Active database that you want to flush.
    1. Go to **configuration** and click **Flush** at the bottom of the page.
    1. Enter the name of the Active-Active database to confirm that you want to flush the data.

- Command line

    1. To find the ID of the Active-Active database, run:

        ```sh
        crdb-cli crdb list
        ```

        For example:

        ```sh
        $ crdb-cli crdb list
        CRDB-GUID                                NAME                 REPL-ID CLUSTER-FQDN
        a16fe643-4a7b-4380-a5b2-96109d2e8bca     crdb1                1       cluster1.local
        a16fe643-4a7b-4380-a5b2-96109d2e8bca     crdb1                2       cluster2.local
        a16fe643-4a7b-4380-a5b2-96109d2e8bca     crdb1                3       cluster3.local
        ```

    1. To flush the Active-Active database, run:

        ```sh
        crdb-cli crdb flush --crdb-guid <CRDB-GUID>
        ```

        The command output contains the task ID of the flush task, for example:

        ```sh
        $ crdb-cli crdb flush --crdb-guid a16fe643-4a7b-4380-a5b2-96109d2e8bca
        Task 63239280-d060-4639-9bba-fc6a242c19fc created
        ---> Status changed: queued -> started
        ```

    1. To check the status of the flush task, run:

        ```sh
        crdb-cli task status --task-id <Task-ID>
        ```

        For example:

        ```sh
        $ crdb-cli task status --task-id 63239280-d060-4639-9bba-fc6a242c19fc
        Task-ID: 63239280-d060-4639-9bba-fc6a242c19fc
        CRDB-GUID: -
        Status: finished
        ```

- REST API

    1. To find the ID of the Active-Active database, run:

        ```sh
        curl -v -u <user>:<password> -X GET https://<cluster-fqdn>:9443/v1/crdbs
        ```

    1. To flush the Active-Active database, run:

        ```sh
        curl -v -u <username>:<password> -X PUT https://<cluster-fqdn>:9443/v1/crdbs/<guid>/flush
        ```

        The command output contains the task ID of the flush task.

    1. To check the status of the flush task, run:

        ```sh
        curl -v -u <username>:<password> https://<cluster-fqdn>:9443/v1/crdb_tasks/<task-id>
        ```
