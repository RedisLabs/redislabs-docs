---
Title: Manage Active-Active databases 
description: Manage Active-Active
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/databases/active-active/edit-aa-database.md,
    /rs/databases/active-active/edit-aa-database/,
    /rs/databases/active-active/manage-aa.md,
    /rs/databases/active-active/manage-aa/,
]
---

## Edit Active-Active database configuration

An Active-Active database (formerly known as CRDB) is a database that spans multiple Redis Enterprise clusters.
The clusters that host instances of the Active-Active database are called participating clusters.
When you create an Active-Active database you must specify the participating clusters that host the Active-Active database instances.

When you edit the database configurations of an Active-Active database,
most database settings only apply to the Active-Active database instance that you are editing, including:

- Memory limit
- Data persistence
- Redis password
- Number of shards
- TLS mode
- Periodic backup

You can change the global configuration of the Active-Active database from the command line with [`crdb-cli`]({{<relref "/rs/references/cli-utilities/crdb-cli">}}).

## Participating clusters

You can add and remove participating clusters of an Active-Active database to change the topology.
Use the participating clusters list to manage the changes to Active-Active topology in the UI.
You can make multiple changes at once and changes will be committed when the database configuration is saved.

![add-active-active-participants](/images/rs/add-active-active-participants.png)

### Add participating clusters

All of the existing participating clusters must be online and in a syncing state when you add new participating clusters.

New participating clusters create the Active-Active database instance based on the global Active-Active database configuration.
After you add new participating clusters to an existing Active-Active database,
the new database instance can accept connections and read operations.
The new instance does not accept write operations until it is in the syncing state.

### Remove participating clusters

All of the existing participating clusters must be online and in a syncing state when you remove an online participating clusters.
If you must remove offline participating clusters, you can do this with forced removal.
If a participating cluster that was removed forcefully returns attempts to re-join the cluster,
it will have an out of date on Active-Active database membership.
The joined participating clusters reject updates sent from the removed participating cluster.

## Replication backlog

Redis databases that use [replication for high availability]({{< relref "/rs/databases/configure/replication.md" >}}) maintain a replication backlog (per shard) to synchronize the primary and replica shards of a database. In addition to the database replication backlog, Active-Active databases maintain a backlog (per shard) to synchronize the database instances between clusters.

By default, both the database and Active-Active replication backlogs are set to one percent (1%) of the database size divided by the number of shards. This can range between 1MB to 250MB per shard for each backlog.

### Change the replication backlog size

Use the [`crdb-cli`]({{<relref "/rs/references/cli-utilities/crdb-cli">}}) utility to control the size of the replication backlogs. You can set it to `auto` or set a specific size.  

Update the database replication backlog configuration with the `crdb-cli` command shown below.

```text
crdb-cli crdb update --crdb-guid <crdb_guid> --default-db-config "{\"repl_backlog_size\": <size in MB | 'auto'>}"
```

Update the Active-Active (CRDT) replication backlog with the command shown below: 

```text
crdb-cli crdb update --crdb-guid <crdb_guid> --default-db-config "{\"crdt_repl_backlog_size\": <size in MB | 'auto'>}"
```

