---
Title: CRDB-CLI Commands
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
An [Active-Active database]({{< relref "/rs/administering/designing-production/active-active.md" >}}) (also known as CRDB or Conflict-free, Replicated DataBase)
replicates your dataset across Redis Enterprise Software (RS) clusters located in geographically distributed regions.
Active-Active databases allow read-write access in all locations, making them ideal for distributed applications that require the fastest response times, and also for disaster recovery.

The Active-Active database on an individual cluster is called an **instance**.
Each cluster that hosts an instance is called a **participating cluster**.

An Active-Active database requires two or more participating clusters.
Each instance is responsible for updating the instances residing on other participating clusters with the transactions it receives.
Write conflicts are resolved using [CRDTs]({{< relref "/rs/administering/designing-production/active-active.md" >}}).

To programmatically maintain an Active-Active database and its instances, you can use the CRDB-CLI command-line tool.

## Using the crdb-cli

To use the CRDB-CLI tool, use SSH to log in to an RS host with a user that belongs to the group that RS was installed with (Default: **redislabs**).
If you log in with a non-root user, you must add `/opt/redislabs/bin/` to your PATH environment variables.

CRDB-CLI commands use the syntax: `crdb-cli <command> <arguments>` to let you:

- Create, list, update, flush, or delete an Active-Active database
- Add or remove an instance of the Active-Active database on a specific cluster

Each command creates a task.
By default, the command runs immediately and you see the result of the command in the command output.
If you use the `--no-wait` flag, the command runs in the background so that your application is not delayed by the response.
You can track the task with [`crdb-cli task status`](#active-active-task-status).

For each CRDB-CLI command, you can use `--help` for additional information about the command.

## Active-Active database operations

Active-Active database operations affect the configuration and data of the database.

### Creating an Active-Active database

The `crdb create` command lets you create a customized Active-Active database and create instances of the database on specified participating clusters. Before you create an Active-Active database you must have:

- At least two participating clusters
- [Network connectivity]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}) between the participating clusters

When you create an Active-Active database, you must specify:

|Flag and argument| Argument type| Description|
|---|---|---|
|`name <CRDB_name>`| string| Name of the Active-Active database|
|`memory-size <size>`| string| Maximum memory in bytes| kilobytes (kb)| or gigabytes (gb)|
|`port <port_number>`| integer| TCP port for the Active-Active database on all participating clusters|
|`instance fqdn=<cluster_fqdn>,username=<username>,password=<password>`| strings| The connection information for the participating clusters. You must specify this flag for each participating cluster.|

The syntax for the command is:

```sh
crdb-cli crdb create --name <name> /
--memory-size <maximum_memory> --port <port_number> /
--instance fqdn=<cluster_fqdn>,username=<username>,password=<password> /
--instance fqdn=<cluster_fqdn>,username=<username>,password=<password> /
[--no-wait] /
[--db-config-json <file_content>] /
[--db-config-json-file <filename>] /
[--compression (0-6)] /
[--causal-consistency true] /
[--password <password>] /
[--replication true] /
[--encryption true] /
[--sharding false] /
[-- shards-count <number_of_shards>] /
[--shard-key-regex <regex_rule>] /
[--oss-sharding BOOLEAN] /
[--oss-cluster true]
[--bigstore true]
[--bigstore-ram-size <maximum_memory>]
[--with-module <module_name>]
```

After you run the command, the response shows the globally unique identifier (GUID) of the task and the GUID of the Active-Active database that was created:

```sh
Task 2b3d62c6-395b-4679-87b1-eef006ad4a38 created
  ---> Status changed: queued -> started
  ---> CRDB GUID Assigned: crdb:552bbccb-99f3-4142-bd17-93d245f0bc79
  ---> Status changed: started -> finished
```

If you only specify the required fields, the properties of the database are::

- Compression level 3
- Causal consistency is off
- No password
- No replication
- No encryption
- 1 shard
- Shard key regex: `{u'regex': u'.*\\{(?<tag>.*)\\}.*'}, {u'regex': u'(?<tag>.*)'}`

The `crdb create` command supports several additional options:

|Flag and argument| Argument type| Description|
|---|---|---|
|`no-wait`| no arguments| Prevents CRDB-CLI from running another command before this command finishes|
|`compression (0-6)`| integer| The level of data compression: 0=Compression disabled| 1=Low compression and resource load| 6=High compression and resource load (Default: 3)|
|`causal-consistency true`| boolean| [Causal consistency]({{< relref "/rs/administering/database-operations/causal-consistency-crdb.md" >}}) applies updates to all instances in the order they were received|
|`password <password>`| string| Password for access to the database|
|`replication true`| boolean| Enables [database replication]({{< relref "/rs/concepts/high-availability/replication.md" >}})| where every master shard replicates to a replica shard (We recommend that you use replication so that active-active database synchronization traffic is off-loaded to the slave shard)|
|`encryption true`| boolean| Enable encryption|
|`sharding disable`| string| Disable sharding (also known as [database clustering]({{< relref "/rs/concepts/high-availability/replication.md" >}})) so that there is only one shard for the database|
|`shards-count <number>`| integer| If sharding is enabled this specifies the number of Redis shards for each database instance|
|`shard-key-regex <regex_rule>`| string| If sharding is enabled this defines a custom sharding key regex rule (also known as a [hashing policy]({{< relref "/rs/concepts/high-availability/clustering#custom-hashing-policy" >}}) that determines which keys are located in each shard|
<!-- |`default-db-config <options>`|text|Default database configuration options|
|`default-db-config-file <filename>`|file path|Default database configuration options| -->

#### crdb create examples

To create an Active-Active database with two shards in each instance and with encrypted traffic between the clusters:

```sh
crdb-cli crdb create --name mycrdb --memory-size 100mb --port 12000 --instance fqdn=cluster1.local,username=test,password=test --instance fqdn=cluster2.local,username=test,password=test --shards-count 2 --encrypted true
```

To create an Active-Active database with no shards and with encrypted traffic between the clusters:

```sh
crdb-cli crdb create --name mycrdb --memory-size 100mb --port 12000 --instance fqdn=cluster1.local,username=test,password=test --instance fqdn=cluster2.local,username=test,password=test --encrypted true --shards-count 2
```

To create an Active-Active database with 1 shard in each instance and not wait for the response:

```sh
crdb-cli crdb create --name mycrdb --memory-size 100mb --port 12000 --instance fqdn=cluster1.local,username=test,password=test --instance fqdn=cluster2.local,username=test,password=test --no-wait
```

### Showing the list of Active-Active databases

The `crdb list` command shows all Active-Active databases that the cluster participates in.
Each database is represented with a unique GUID, the name of the database, an instance ID, and the FQDN of the cluster that hosts the instance.
You use the CRDB-GUID and REPL-ID in other commands, such as [add-instance](#adding-an-instance-to-an-activeactive-database) and [remove-instance](#removing-an-instance-from-an-activeactive-database).

```sh
crdb-cli crdb list
```

For example:

```sh
# crdb-cli crdb list
CRDB-GUID                                              NAME    REPL-ID     CLUSTER-FQDN
e7ef4552-3705-4790-9f30-6a8e9f4bef28  shopping-cart  1        cluster1.local
e7ef4552-3705-4790-9f30-6a8e9f4bef28  shopping-cart  2        cluster2.local
```

### Updating the configuration of an Active-Active database

The `crdb update` command lets you change the configuration of the Active-Active instances of an existing Active-Active database.
This command requires the CRDB-GUID of the database.

{{< note >}}
If you want to change the configuration of the local instance only, you can change the configuration from `rladmin`.
{{< /note >}}

The syntax for the command is:

```sh
crdb-cli crdb update --crdb-guid <crdb-guid> /
[--no-wait] /
[--db-config-json <file_content>] /
[--db-config-json-file <filename>] /
[--compression (0-6)] /
[--causal-consistency true] /
[--password <password>] /
[--replication true] /
[--encryption true] /
[--oss-cluster true]
[--bigstore-ram-size <maximum_memory>]
```

The configuration options that you can update are:

|Flag and argument| Argument type| Description|
|---|---|---|
|`memory-size <ram_limit>`|string| Maximum memory in bytes| kilobytes (kb)| or gigabytes (gb)|
|`causal-consistency <true | false>`|boolean| Database updates are applied to all instances in the order they were received|
|`encryption <true | false>`| binary| Enable encryption|
|`compression (0-6)`| integer| The level of compression of data: 0=Compression disabled| 1=Low compression and resource load| 6=High compression and resource load (Default: 3)|
|`credentials id=<instance_id>,username=<username>,password=<password>`|string|Update the credentials for the participating cluster|
|`featureset-version <true | false>`|boolean|Update to latest FeatureSet version|
|`oss-cluster <true | false>`|boolean|Enable or disable OSS cluster mode|
|`bigstore <true | false>`|boolean|Use Redis on Flash to add flash memory to the database|
|`bigstore-ram-size <ram_limit>`|string|RAM limit for RoF database (bytes, MB, or GB)|
|`with-module <module_name>`|text|The name of the module to add to the database|
|`force`|no arguments|Increase the configuration version even if there are no configuration changes|
<!-- |`default-db-config <options>`|text|Default database configuration options|
|`default-db-config-file <filename>`|file path|Default database configuration options| -->

### Flushing the data from an Active-Active database

The `crdb flush` command deletes all data in all of the instances of an Active-Active database.
This command requires the CRDB-GUID of the database.

{{< warning >}}
This is an irreversible command.
If the data in your database is important, make sure you back it up before you flush the database.
{{< /warning >}}

To flush the data from an Active-Active database, run:

```sh
crdb-cli crdb flush --crdb-guid <crdb-guid>
```

### Deleting an Active-Active database

The `crdb delete` command deletes the Active-Active database and its data.
This command requires the CRDB-GUID of the database.

To delete an Active-Active database, run:

```sh
crdb-cli crdb delete --crdb-guid <crdb-guid>
```

{{< warning >}}
This is an irreversible command.
If the data in your database is important, make sure you back it up before you delete the database.
{{< /warning >}}

## Active-Active instance operations

Active-Active instance operations affect the placement of database instances on participating clusters, but do not change the configuration or data in the database.

### Adding an instance to an Active-Active database {#adding-an-instance-to-an-activeactive-database}

The `crdb add-instance` command lets you add instances to an existing Active-Active database in order to host the database on additional clusters.
This creates a read-write copy of the database on the specified cluster.

When you add an instance to an Active-Active database, you must specify:

|Flag and argument| Argument type| Description|
|---|---|---|
|`crdb-guid <guid-id>`| string| The ID of the Active-Active database that you want to add the instance to|
|`instance fqdn=<cluster_fqdn>,username=<username>,password=<password>`| strings| The connection information for the participating cluster that will host the new instance|

### Removing an instance from an Active-Active database {#removing-an-instance-from-an-activeactive-database}

The `remove-instance` command deletes all data from an Active-Active instance, deletes the instance from the participating cluster, and removes the instance from the list of instances for the Active-Active database.

When you remove an instance from an Active-Active database, you must specify:

|Flag and argument| Argument type| Description|
|---|---|---|
|`crdb-guid <guid-id>`| string| The ID of the Active-Active database that you want to add the instance to|
|`instance-id=<instance_id>`| integer| The ID of the instance to remove from the Active-Active database|

{{< note >}}
If the cluster that you run the command on cannot communicate with the instance that you want to remove,
you can use the `--unordered` flag to remove the instance from the Active-Active database without purging the data from the instance.

After you use `crdb remove-instance --unordered`, you must run `crdb purge-instance` from the removed participating cluster to delete the Active-Active database and its data. To purge the instance, run: `crdb-cli crdb purge-instance --crdb-guid <crdb-guid> <instance-id>`
{{< /note >}}

## Active-Active task status

Each `crdb-cli crdb` command creates a task ID that you can use to track the progress of the command.
For example:

```sh
# crdb-cli crdb update --crdb-guid dda3d2f6-d1f3-4ecd-ab86-2399d16c1dcc --causal-consistency true
Task 29beaee9-39fd-4f93-af98-51dc223f218b created
  ---> Status changed: queued -> started
  ---> CRDB GUID Assigned: crdb:dda3d2f6-d1f3-4ecd-ab86-2399d16c1dcc
  ---> Status changed: started -> finished
```

The `task status` command shows the status of the task with the specified task ID.

To see the status of a task, run:

```sh
crdb-cli task status --task-id <task-ID>
```

For example:

```sh
# crdb-cli task status --task-id ef6c6088-72e3-4d32-8d62-23a665cb9eb1
Task-ID: ef6c6088-72e3-4d32-8d62-23a665cb9eb1
CRDB-GUID: d1053041-1c55-4b65-9ab9-f56b63afb55c
Status: started
```
