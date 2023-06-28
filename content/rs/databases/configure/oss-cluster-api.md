---
Title: Enable OSS Cluster API
linkTitle: OSS Cluster API
description:
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/networking/using-oss-cluster-api.md,
    /rs/administering/designing-production/networking/using-oss-cluster-api/,
    /rs/databases/configure/enable-oss-cluster-api.md,
    /rs/databases/configure/enable-oss-cluster-api/,
    /rs/databases/configure/oss-cluster-api.md,
    /rs/databases/configure/oss-cluster-api/,
]
---
{{< embed-md "oss-cluster-api-intro.md"  >}}

## Prerequisites

The Redis OSS Cluster API is supported only when a database meets specific criteria.  

The database must:

- Use the standard [hashing policy]({{<relref "/rs/databases/durability-ha/clustering#supported-hashing-policies">}}).
- Have the [proxy policy]({{<relref "/rs/databases/configure/proxy-policy">}}) set to either `all-master-shards` or `all-nodes`.

In addition, the database must _not_:

- Use node `include` or `exclude` in the proxy policy.
- Use [RediSearch]({{<relref "/stack/search">}}), [RedisTimeSeries]({{<relref "/stack/timeseries">}}), or [RedisGears]({{<relref "/stack/gears-v1">}}) modules.

The OSS Cluster API setting applies to individual databases, as opposed to the overall cluster.

## Enable OSS Cluster API support

You can use the admin console or the `rladmin` utility to enable OSS Cluster API support for a database.

### Admin console

To enable the OSS Cluster API from the admin console for an existing database:

1.  Sign in to the admin console and then select the target database.

1.  When the database details appear, select the **Configuration** tab.

1.  The **OSS Cluster API support** setting shows the current setting.

    {{<image filename="images/rs/oss-cluster-api-database-configuration.png" alt="The *OSS Cluster API* setting indicates whether the API is enabled for a database." >}}{{< /image >}}

1.  Select the **Edit** button.

1.  Place a checkmark in the **OSS Cluster API support** setting and then select **Update**.

    {{<image filename="images/rs/oss-cluster-api-database-create.png" alt="Use the *OSS Cluster API* setting to enable the API for the selected database." >}}{{< /image >}}


You can also use the admin console to enable the setting when creating a new database.  

To do so, select **Advanced options** while creating the database in order to display the **OSS Cluster API support** setting.  Place a checkmark in the setting to enable the API when the database is created.

### Command line (`rladmin`)

You can use the [`rladmin` utility]({{<relref "/rs/references/cli-utilities/rladmin/">}}) to enable the OSS Cluster API for Redis Enterprise Software databases, including Replica Of (Active-Passive) databases.

For Active-Active (CRDB) databases, [use the crdb-cli utility](#active-active-databases).

To enable the OSS Cluster API for a Redis database from the command line:

```sh
$ rladmin tune db <database name or ID> oss_cluster enabled
```

To determine the current setting for a database from the command line, use `rladmin info db` to return the value of the `oss_cluster` setting.

```sh
$ rladmin info db test | grep oss_cluster:
  oss_cluster: enabled
```

The Redis OSS Cluster API setting applies to the specified database only; it does not apply to the cluster.

### Active-Active databases

Use the `crdb-cli` utility to enable the OSS Cluster API for Active-Active databases:

```sh
$ crdb-cli crdb update --crdb-guid <GUID> --oss-cluster true
```

For best results, you should do this when you first create the database.  

Here's the basic process:

1. Create the Active-Active database: 

    ```sh
    $ crdb-cli crdb create --name <name> \
       --memory-size 10g --port <port> \
       --sharding true --shards-count 2  \
       --replication true --oss-cluster true \
       --instance fqdn=<fqdn>,username=<user>,password=<pass> \
       --instance fqdn=<fqdn>,username=<user>,password=<pass> \
       --instance fqdn=<fqdn>,username=<user>,password=<pass>
    ```

1. Obtain the CRDB-GUID ID for the new database:

    ```sh
    $ crdb-cli crdb list
    CRDB-GUID    NAME   REPL-ID  CLUSTER-FQDN
    <CRDB-GUID>  Test   4        cluster1.local
    ```

1. Use the CRDB-GUID ID to enable the OSS Cluster API:

    ```sh
    $ crdb-cli crdb update --crdb-guid <CRDB-GUID> \
        --oss-cluster true
    ```

The Redis OSS Cluster API setting applies to all of the instances of the Active-Active database.

## Turn off OSS Cluster API support

To deactivate OSS Cluster API support for a database, either:

- Use the admin console to remove the checkmark from the database configuration settings.

- Use the appropriate utility to deactivate the OSS cluster setting.

    For standard databases, including Replica Of (Active-Passive), use `rladmin`:

    ```sh
    $ rladmin tune db <Name or ID> oss_cluster disable
    ```

    For Active-Active databases, use `crdb-cli`:

    ```sh
    $ crdb-cli crdb update --crdb-guid <CRDB-GUID> \
        --oss-cluster false
    ```

## Multi-key command support

When you enable the Redis OSS Cluster API for a database, 
[multi-key commands]({{< relref "/rc/databases/configuration/clustering#multikey-operations" >}}) are only allowed when all keys are mapped to the same slot.

To verify that your database meets this requirement, make sure that the `CLUSTER KEYSLOT` reply is the same for all keys affected by the multi-key command.  To learn more, see [multi-key operations]({{< relref "/rs/databases/durability-ha/clustering#multikey-operations" >}}).
