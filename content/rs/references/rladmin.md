---
Title: The RS Command-Line Interface (rladmin)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/rladmin/
---
Redis Enterprise Software (RS) includes rladmin, a command-line interface (CLI)
that you can use to do advanced administrative tasks.
Some of these tasks you can also do through the management web UI.

For example, with the rladmin CLI you can:

- View the detailed status of the cluster including information about each node, each database, and each shard
- Failover between a master and slave shard, or a master and slave endpoint
- Migrate a specific shard or endpoint between nodes
- Tune specific internal parameters of a database
- Upgrade the version of a database to the most current version supported by the cluster

## Using the rladmin CLI

To open the rladmin CLI:

1. Login to the RS host with an account that is a member of the **redislabs** OS group.

    If you are a non-root user, you must add `/opt/redislabs/bin/` to your PATH environment variables

1. Run: `rladmin`

    {{% note %}}
If the CLI does not recognize the rladmin command,
you run this command to load the needed configuration first: `bash -l`
    {{% /note %}}

## Command Syntax Help

In the rladmin CLI you can:

- Enter `?` to view the full list of available commands.
- Enter `help` followed by the name of a command for a detailed explanation of the command and its usage.
- Press the Tab key for command completion.

### rladmin usage

| Command                     | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| [**bind**](#bind)           | Bind an endpoint                                                        |
| [**cluster**](#cluster)     | Cluster management commands                                             |
| **exit**                    | Exit admin shell                                                        |
| [**failover**](#failover)   | Fail-over master to slave                                               |
| **help**                    | Show available commands, or use `help <command>` for a specific command |
| [**info**](#info)           | Show information about tunable parameters                               |
| [**migrate**](#migrate)     | Migrate elements between nodes                                          |
| [**node**](#node)           | Node management commands                                                |
| [**placement**](#placement) | Configure shards placement policy                                       |
| [**restart**](#restart)     | Restart database shards                                                 |
| [**status**](#status)       | Show status information                                                 |
| [**tune**](#tune)           | Tune system parameters                                                  |
| [**upgrade**](#upgrade)     | Upgrade entity version                                                  |

#### bind

Usage:

    bind [db <db:id | name>] endpoint <id>
    [ include | exclude ] proxy <id1 .. idN>

    bind [db <db:id | name>] endpoint <id> policy <single | all-master-shards | all-nodes>

Configure a specific endpoint's binding to proxies or change its binding policy.

Example: :
    `insert example`

#### cluster

Note: Only applies to nodes that are configured as part of a cluster

##### cluster reset_password

    cluster reset_password <user email>

Changes the access password of a user whose e-mail address is provided.

##### cluster config

    cluster config [cipher_suites cipher-suites-str ]
        [ipv6 <enabled/disabled>]
        [handle_redirects <enabled/disabled>]
        [http_support <enabled/disabled>]
        [min_control_TLS_version control_tls_version]
        [min_data_TLS_version data_tls_version]

The following parameters are optional:

| Option                  | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| http_support            | Enable or disable using HTTP for REST API                                   |
| min_control_TLS_version | The minimum version of TLS protocol which is supported at the control path. |
| min_data_TLS_version    | The minimum version of TLS protocol which is supported at the data path.    |
| sentinel_ssl_policy     | Define SSL policy for the Discovery Service: required/disabled/allowed      |

#### failover

Usage:

    failover [db <db:id | name>] shard <id1 .. idN> [immediate]

Fail-over one or more master shards of a specific database,
promoting their respective slaves to new masters.

When failing over shards, the slaves are verified to be in full sync before
fail-over is performed, unless the optional immediate keyboard is
specified.

#### info

Usage:

    info db <db:id | name>
    info proxy <id | all>
    info cluster

Show current tunable settings for a specific or all databases, proxies,
cluster.

#### migrate

Usage:

    migrate [db <db:id | name> | node <origin node:id>]
        shard <id1 .. idN> [preserve_roles] target_node <id> [override_policy]

    migrate (db <db:id | name> | node <origin node:id>) all_slave_shards target_node <id> [override_policy]

    migrate (db <db:id | name> | node <origin node:id>) all_master_shards target_node <id> [override_policy]

    migrate  node <origin node:id>  all_shards target_node <id> [override_policy]

    migrate [db <db:id | name> | node <origin node:id>] shards_to_endpoint [restrict_target_node <id>] [override_policy] [commit]

    migrate [db <db:id | name> | node <origin node:id>] endpoint_to_shards [restrict_target_node <id>] [override_policy] [to_first_slot] [commit] [max_concurrent_migrations <value>]

Migrate one or more shards or endpoints to a new node.

commands:

| Option             | Description                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shard              | migrate a single or a list of shards                                                                                                                        |
| all_slave_shards   | migrate all slave shards of a certain db or node                                                                                                            |
| all_master_shards  | migrate all master shards of a certain db or node                                                                                                           |
| all_shards         | migrate all shards (masters and slaves) of a certain node                                                                                                   |
| endpoint_to_shards | migrate endpoints of all or one db to the node where majority of the shards are (master to masters, slave to slaves), unless the to_first_slot flag is used |
| shards_to_endpoint | migrate shards of all or one db to the node where the endpoint is (masters to master, slaves to slave)                                                      |

options:

| Option                    | Description                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| db                        | limit to shards / endpoints of a specific database                                                                                 |
| node                      | limit to shards / endpoints on a specific origin node                                                                              |
| target_node               | migration target node                                                                                                              |
| restrict_target_node      | let the automatic mechanism find the target node, but perform only action for this target node                                     |
| override_policy           | override rack aware policy allowing master and slave to reside on the same rack. You must manually fix this invalid state later on |
| to_first_slot             | find the node of with the shard with the first hash slot rather than the majority of shards                                        |
| commit                    | perform the actions! (default is a dry-run)                                                                                        |
| max_concurrent_migrations | maximum number of concurrent endpoint migrations (default is 1)                                                                    |
| preserve_roles            | performs an additional fail-over in order to guarantee that the roles of masters are preserved.                                    |

#### node

Usage:

    node <id> enslave [ shards_only | endpoints_only ]
    node <id> snapshot [ create | list | restore | delete ]
    node <id> remove

Updates cluster node configuration.  Nodes support a single address which
can be configured only when the node is down or offline.

Nodes support zero or more external addresses, which are used to advertise
the service and accept inbound user connections.  It is possible to
configure one or more addresses in a single 'set' command, or change the
existing configuration using 'add' or 'remove' to add additional addresses
or remove existing addresses, respectively.

Enslaving all bound resources of a node is available using the 'enslave' command.

Handling node snapshots from the current node state (active endpoints and shards)may be done using the 'snapshot create', 'snapshot restore', 'snapshot list' and'snapdshot delete' commands.

#### placement

Usage:

    placement [db <db:id | name>] [ dense | sparse ]

Configure shards placement policy for a given database.

#### restart

Usage:

    restart db <db:id | name> [preserve_roles] [discard_data] [force_discard]

Performs a restart of the Redis software in use by a specific database
instance, by scheduling a restart of the master and slave processes.

The **preserve_roles** optional flag indicates an additional fail-over
can be used in order to guarantee that the roles of masters and slaves are
preserved by the end of the upgrade process.

The **discard_data** optional flag indicates that the data can be discarded and will not be saved after restart.

The **force_discard** optional flag indicates we force discard_data even if there is replication or persistence.

#### status

Usage:

full status report:

    status [extra options] [issues_only]

status report of just the nodes table:

    status nodes [extra options] [sort <COLUMN_TITLES>] [issues_only]

status report of just the database table:

    status databases [extra options] [sort <COLUMN_TITLES>] [issues_only]

status report of just the endpoints table:

    status endpoints [node <id>] [db <db:id | name>] [extra options] [sort <COLUMN_TITLES>] [issues_only]

status report of just the shards table:

    status shards [node <id>] [db <db:id | name>] [extra options] [sort <COLUMN_TITLES>] [issues_only]

Display current cluster status and topology information.

Extra info options:

| options             | description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| extra state_machine | Shows extra execution state machine info                                |
| extra nodestats     | Shows extra masters/slaves shards per node                              |
| extra backups       | Shows extra dbs and shards periodic backup                              |
| extra frag          | Shows extra shards fragmented memory that could be reclaimed by restart |
| extra watchdog      | Shows extra watchdog status                                             |
| extra rack_id       | Shows rack_id even when cluster is not marked as rack aware             |
| extra redis_version | Shows redis version of all the databases                                |
| extra all           | Shows all extra info                                                    |

COLUMN_TITLES: a list of table column titles.
e.g:
    status shards sort NODE USED_MEMORY

issues_only: Filters out all the OK items from status.

#### tune

Usage:

    tune db <db:id | name> [slave_buffer <value>]
        [slave_ha <enabled/disabled>]
        [slave_ha_priority <value>]

**slave_ha** is specified as default/enabled/disabled, and allows turning
on/off the slave high availability mechanism. default takes the cluster setting.

**slave_ha_priority** is an positive integer value, that represents the priority
of the bdb in slave high availability mechanism. it overrides the calculated priority of the bdb.

**slave_ha** is specified as enabled/disabled, and allows tuning the
default for the slave high availability mechanism.
it can be overwritten per database.

**slave_ha_grace_period** specifies the time in seconds,
between when a node fails, and when slave high availability mechanism
starts relocating shards from it to another node.

**slave_ha_cooldown_period** specifies the time in seconds.
a period after shard relocation in which slave high availability mechanism
cannot relocate from any other node.

**slave_ha_bdb_cooldown_period** specifies the time in seconds.
a period after shard relocation in which slave high availability mechanism
cannot relocate database from any other node.

#### upgrade

Usage:

    upgrade db <db:id | name>
        [preserve_roles] [keep_current_version]
        [discard_data] [force_discard]

Performs an upgrade of the Redis software in use by a specific database
instance, by scheduling a restart of the master and slave processes.

The **preserve_roles** optional flag indicates an additional fail-over
can be used in order to guarantee that the roles of masters and slaves are
preserved by the end of the upgrade process.

The **keep_current_version** optional flag requests an upgrade to the new patch release,
without upgrading to the latest major.minor version.

The **discard_data** optional flag indicates that the data can be discarded and will not be saved after upgrade.

The **force_discard** optional flag indicates we force discard_data even if there is replication or persistence.
