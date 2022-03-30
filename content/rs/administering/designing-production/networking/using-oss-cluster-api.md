---
Title: Use the OSS Cluster API
linkTitle: Use the OSS Cluster API
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
{{< embed-md "oss-cluster-api-intro.md"  >}}

## Prerequisites

Before you enable Redis OSS Cluster API for a database, make sure that:

- The database uses the standard hashing policy.
- The database proxy policy is `all-master-shards`.
- The database proxy policy does not use node `include` or `exclude`.
- The database does not use [RediSearch]({{<relref "/modules/redisearch">}}).

## Enable OSS Cluster API support

When you enable the Redis OSS Cluster API from the command line or RS admin console,
[multi-key commands]({{< relref "/rc/databases/configuration/clustering#multikey-operations" >}}) are only allowed when all keys are mapped to the same slot.
To verify that your database meets this requirement, make sure that the `CLUSTER KEYSLOT` reply is the same for all keys in the [multi-key command]({{< relref "/rs/concepts/high-availability/clustering#multikey-operations" >}}).

### Enable from the admin console

For a Redis Enterprise Software (RS) database, to enable the OSS Cluster API from the admin console:

1. Go to: **databases**
1. Either:
    - Click on an existing database and in **configuration** click **Edit**.
    - Click ![Add](/images/rs/icon_add.png#no-click "Add") and **create database**
1. Click **Show advance options** and select **OSS Cluster API support**.
    {{< note >}}
The Redis OSS Cluster API setting applies to the specified database only, not to the entire cluster.
    {{< /note >}}
1. Save the database:
    - For an existing database, click **Update**.
    - For a new database, configure the database settings and click **Activate**.

### Enable from the command line

You can use the rladmin CLI to enable OSS Cluster API for RS databases, including Active-Passive (Replica Of) databases.
For Active-Active (CRDB) databases, [use the crdb-cli tool](#enable-for-active-active-databases-from-the-command-line).

For an RS database, to enable the OSS Cluster API from the command line:

1. To get the database ID for your database, run:

    ```sh
    $ sudo rladmin info db | grep test
    db:4 [test]:
    ```

    In this example, the database ID is 4.

1. To enable the OSS Cluster API for the database, run:

    ```sh
    rladmin tune db <database name or ID> oss_cluster enabled
    ```

    {{< note >}}
The Redis OSS Cluster API setting applies to the specified database only, not to the entire cluster.
    {{< /note >}}

### Enable for Active-Active databases from the command line

For a new RS Active-Active database, to enable the OSS Cluster API from the command line:

1. To create an Active-Active database with OSS Cluster API, run:

    ```sh
    crdb-cli crdb create --name <name> --memory-size 10g --port <port>
    --sharding true --shards-count 2 --replication true --oss-cluster true
    --instance fqdn=<fqdn>,username=<username>,password=<pass>
    --instance fqdn=<fqdn>,username=<username>,password=<pass>
    --instance fqdn=<fqdn>,username=<username>,password=<pass>
    ```

1. To get the CRDB-GUID for your Active-Active database, run:

    ```sh
    $ crdb-cli crdb list
    CRDB-GUID                             NAME       REPL-ID  CLUSTER-FQDN
    2d26de9a-4ed5-404d-a543-459eadf76ce2  Database1  1        cluster1.local
    ```

1. To enable the OSS Cluster API for the Active-Active database, run:

    ```sh
    crdb-cli crdb update --crdb-guid <CRDB-GUID> --oss-cluster true
    ```

    {{< note >}}
The Redis OSS Cluster API setting applies to all of the instances of the Active-Active database.
    {{< /note >}}

## Turn off OSS Cluster API support

If you need to turn off OSS Cluster API support for a database, run:

- From the RS admin console:
    1. Go to: **databases**
    1. Click on the database and in **configuration** click **Edit**.
    1. Click **Show advance options** and unselect **OSS Cluster API support**.
- From the command line, run: `rladmin tune db <database name or ID> oss_cluster disable`
    - For an Active-Active database, run: `crdb-cli crdb update --crdb-guid <CRDB-GUID> --oss-cluster false`
