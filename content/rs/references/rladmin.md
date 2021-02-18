---
Title: Redis Software Administration CLI (rladmin)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/rladmin/
---
`rladmin` is a command-line utility for performing administrative tasks such as failover, migrate, and bind on a Redis Enterprise Software cluster. Some of these tasks can also be performed through the Management UI and some are unique to the `rladmin` CLI tool. 

For example, with the rladmin CLI you can:

- View the detailed status of the cluster including information about each node, each database, and each shard
- Failover between a master and slave shard, or a master and slave endpoint
- Migrate a specific shard or endpoint between nodes
- Tune specific internal parameters of a database
- Upgrade the version of a database to the most current version supported by the cluster

## Use the rladmin shell

To open the rladmin shell:

1. Login to the Redis Enterprise Software host with an account that is a member of the **redislabs** OS group.

    The rladmin binary is located in `/opt/redislabs/bin`. If you don't have this directory in your PATH, you may want to add it. Otherwise, you can use `bash -l <username>` to log in as a user with permissions to that directory.


1. Run: `rladmin`

    {{< note >}}
If the CLI does not recognize the rladmin command,
you run this command to load the needed configuration first: `bash -l`
    {{< /note >}}

In the rladmin shell you can:

- Run a the `rladmin` command with arguments.
- Enter `?` to view the full list of available commands.
- Enter `help` followed by the name of a command for a detailed explanation of the command and its usage.
- Press the Tab key for command completion.
- Enter `exit` or press Ctl+D to return to your terminal prompt.

## rladmin Commands
| Command                     | Description                                                             |
| --------------------------- | ----------------------------------------------------------------------- |
| rladmin                         | Enter the `rladmin` shell
| [rladmin bind](#bind)           | Bind an endpoint                                                        |
| [rladmin cluster](#cluster)     | Cluster management commands                                             |
| exit                            | Exit `rladmin` shell                                           |
| [rladmin failover](#failover)   | Fail over master to replica                                               |
| rladmin help                    | Show available commands or specific command usage                                          |
| [rladmin info](#info)           | Show current parameters for a cluster, database, node, or proxy                               |
| [rladmin migrate](#migrate)     | Migrate elements between nodes                                          |
| [rladmin node](#node)           | Node management commands                                                |
| [rladmin placement](#placement) | Configure shards placement policy                                       |
| [rladmin recover](#recover)     | Recover databases                                            |
| [rladmin restart](#restart)     | Restart database shards                                                 |
| [rladmin status](#status)       | Show status information                                                 |
| [rladmin suffix](#suffix)       | Suffix management                                          |
| [rladmin tune](#tune)           | Tune system parameters                                                  |
| [rladmin upgrade](#upgrade)     | Upgrade the Redis or module version for a database     |
| [rladmin verify](#verify)       | Cluster verification reports                                           |


### `rladmin bind`

Every database uses [at least one proxy endpoint]({{< relref "/rs/administering/designing-production/networking/multiple-active-proxy.md" >}}) to direct client connections to the shard hosting the desired key.
The cluster has a proxy policy that automatically assigns proxy endpoints to nodes in the cluster, but you can fine-tune the policy by including or excluding nodes.

With the bind command, you can use:

- `[policy](#bind-policy)` to change the proxy policy.
- `[include or exclude](#endpoint-include-or-exclude)` to specify the nodes to include or exclude from the proxy policy.

#### Proxy policy

There are four types of proxy policies available: 
| Proxy policy      |Description                                                                                                      |
|-------------------|------------------------------------------------------------------------------------------------------------------|
| single            | All traffic flows through a single proxy bound to the database endpoint (preferable in most cases)               |
| all-master-shards | Multiple proxies, one on each master node (best for high traffic and multiple master shards)                     |
| all-nodes         | Multiple proxies, one on each node of the cluster (increases traffic in the cluster, only used in special cases) |
| Legacy            | Copies existing binding configuration from earlier versions                                                      |

- To change the proxy policy, run the following command:

```sh
rladmin bind [db <db:id | name>] endpoint <id> policy <single | all-master-shards | all-nodes>
```

- To specify the nodes to include or exclude from the proxy policy, run the following command:

```sh
rladmin bind [db <db:id | name>] endpoint <id> [ include | exclude ] <id1 .. idN>
```

### `rladmin cluster`

Note: This argument only applies to nodes that are configured as part of a cluster.

#### `cluster reset_password`

    rladmin cluster reset_password <user email>

Changes the password associated with e-mail address provided.
