---
Title: Using the OSS Cluster API
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
{{< embed-md "oss-cluster-api-intro.md"  >}}

## Prerequisites

Before you enable Redis OSS Cluster API, make sure that:

- The database uses the standard hashing policy.
- The database proxy policy is `all-master-shards`.
- The database proxy policy does not use node `include` or `exclude`.

When you enable Redis OSS Cluster API,
[multi-key commands]({{< relref "/rc/concepts/clustering#multikey-operations" >}}) are only allowed when all keys are mapped to the same slot.
To verify that your database meets this requirement, make sure that the `CLUSTER KEYSLOT` reply is the same for all keys in the [multi-key command]({{< relref "/rs/concepts/high-availability/clustering#multikey-operations" >}}).

## Managing OSS Cluster API support from the web UI

To configure an Redis Enterprise Software (RS) database to use the OSS Cluster API from the Web UI:

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

## Managing OSS Cluster API support with rladmin

To configure an RS database, including Replica Of databases, to use the OSS Cluster API from the command line:

1. Get the database ID for your database. Run:

    ```sh
    $ sudo rladmin info db | grep test
    db:4 [test]:
    ```

    In this example, the database ID is 4.

1. Enable/Disable OSS Cluster API for the database. Run:

    ```sh
    rladmin tune db <database name or ID> oss_cluster <enabled/disabled>
    ```

    {{< note >}}
The Redis OSS Cluster API setting applies to the specified database only, not to the entire cluster.
    {{< /note >}}


## Managing OSS Cluster API for Active-Active databases with crdb-cli

To configure an RS Active-Active database (formerly known as CRDB) to use the OSS Cluster API from the command line:

To **create** a new Active-Active database with OSS Cluster API, run:

    ```sh
    crdb-cli crdb create --name <name> --memory-size 10g --port <port>
    --sharding true --shards-count 2 --replication true --oss-cluster true
    --instance fqdn=<fqdn>,username=<username>,password=<pass>
    --instance fqdn=<fqdn>,username=<username>,password=<pass>
    --instance fqdn=<fqdn>,username=<username>,password=<pass>
    ```
    
To **configure** an existing Active-Active database with OSS Cluster API:
1. Get the CRDB-GUID for your Active-Active database. Run:

    ```sh
    $ crdb-cli crdb list
    CRDB-GUID                             NAME       REPL-ID  CLUSTER-FQDN
    2d26de9a-4ed5-404d-a543-459eadf76ce2  Database1  1        cluster1.local
    ```

1. Enable/Disable OSS Cluster API for the Active-Active database. Run:

    ```sh
    crdb-cli crdb update --crdb-guid <CRDB-GUID> --oss-cluster <true/false>
    ```

    {{< note >}}
The Redis OSS Cluster API setting applies to all of the instances of the Active-Active database.
    {{< /note >}}

