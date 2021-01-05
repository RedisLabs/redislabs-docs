---
Title: Options for Redis Enterprise Databases
description: A primer for the configuration options for Redis Enterprise database Custom Resource Definitions.
weight: 35
alwaysopen: false
categories: ["Platforms"]
aliases:
---

The database options are specified in the `spec` section of the database custom resource.
These options include options that you can change and options that are created by the controller for applications or developers. For example, the database connection information is stored in a secret.

### `databaseSecretName`

A string containing the name of a secret that contains the desired database password.

If you do not specify a secret name, a secret is created for you with the name
constructed from the database name (`metadata.name`) with "`redb-`" as a prefix.

If you specify a secret name, you must create the secret before you create the
database resource.

To create your own database password in the secret, run:

```sh
 kubectl create secret generic mydb --from-literal=password=<password>
 ```

where \<password> is your desired password in plain text.

In the database custom resource, the value is just secret name. In this example,
the name is `mydb`:

 ```yaml
 databaseSecretName: mydb
 ```

When the database is created, the secret is updated to include the port and service name for the database
but the password does not change. If you did not create the secret, it is
also updated with the generated database password.

### `enforceClientAuthentication`

A boolean that indicates whether [client authentication]({{< relref "/rs/administering/designing-production/security/client-connections.md">}}) should be enforced (default: `true`).

### `evictionPolicy`

An [eviction policy]({{< relref "/rs/administering/database-operations/eviction-policy.md">}}) (default: `volitile-lru`)

### `memorySize`

The amount of memory to allocate that is at least 100MB. Values are an integer
suffixed with a unit. For example, values like 1GB, 250MB, etc.

### `persistence`

The value for the [database persistence]({{< relref "/rs/concepts/data-access/persistence.md">}}) setting.

The value is a keyword with the values:

| Value | Description |
| ----- | ----------- |
| disabled | Data is not persisted (default) |
| aofEverySecond | Data is synced to disk every second |
| aofAlways | Data is synced to disk with every write. |
| snapshotEvery1Hour | A snapshot of the database is created every hour |
| snapshotEvery6Hour | A snapshot of the database is created every 6 hours. |
| snapshotEvery12Hour | A snapshot of the database is created every 12 hours. |

### `rackAware`

A boolean that indicates whether the database is [rack-zone aware]({{< relref "/rs/concepts/high-availability/rack-zone-awareness.md">}}) (default: the cluster setting)

### `redisEnterpriseCluster`

The name of the cluster to create the database on.

The value has a single `name` property.
For example, to refer to the `rec` cluster:

```YAML
redisEnterpriseCluster:
   name: rec
```

### `replication`

A boolean that indicates whether in-memory [database replication]({{< relref "/rs/concepts/high-availability/replication.md">}}) is enabled (default: `false`).

When enabled, the database has a replica shard for every master.

### `shardCount`

The number of [database shards]({{< relref "/rs/concepts/high-availability/clustering.md">}}) (default: `1`).

### `tlsMode`

Controls SSL [authentication and encryption]({{< relref "/rs/administering/designing-production/security/tls-configuration.md">}}) for connections to the database.

| Value | Description |
| ----- | ----------- |
| disabled | no incoming connection to the Database uses SSL (default) |
| enabled | all incoming connections to the Database must use SSL. |
| replica_ssl | databases that replicate from this database must use SSL. |
