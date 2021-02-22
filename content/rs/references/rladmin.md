---
Title: Redis Software Administration CLI (rladmin)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/rladmin/
---
`rladmin` is a command-line utility for performing administrative tasks such as failover, migrate, and bind on a Redis Enterprise Software cluster. Some of these tasks can also be performed through the Management UI and some are unique to the `rladmin` CLI tool. 


## rladmin Commands
| Command | Description |
| - | - |
| [rladmin](#use-the-rladmin-shell) | Enter the `rladmin` shell |
| [bind](#bind) | Bind an endpoint |
| [cluster](#cluster) | Cluster management commands |
| [exit](#use-the-rladmin-shell)| Exit `rladmin` shell |
| [failover](#failover) | Fail over master to replica |
| [help](#help) | Show available commands or specific command usage |
| [info](#info) | Show current parameters for a cluster, database, node, or proxy |
| [migrate](#migrate) | Migrate elements between nodes |
| [node](#node) | Node management commands |
| [placement](#placement) | Configure shards placement policy |
| [recover](#recover) | Recover databases |
| [restart](#restart) | Restart database shards |
| [status](#status) | Show status information |
| [suffix](#suffix) | Suffix management |
| [tune](#tune) | Tune system parameters |
| [upgrade](#upgrade) | Upgrade the Redis or module version for a database |
| [verify](#verify) | Cluster verification reports |

### `bind`

Every database uses [at least one proxy endpoint]({{< relref "/rs/administering/designing-production/networking/multiple-active-proxy.md" >}}) to direct client connections to the shard hosting the desired key.
The cluster has a proxy policy that automatically assigns proxy endpoints to nodes in the cluster, but you can fine-tune the policy by including or excluding nodes.

With the bind command, you can use:

- `policy` to change the proxy policy.
- `include` or `exclude` to specify the nodes to include or exclude from the proxy policy.

#### Proxy policy

There are four types of proxy policies available: 
| Proxy policy | Description |
| - | - |
| single | All traffic flows through a single proxy bound to the database endpoint (preferable in most cases)               |
| all-master-shards | Multiple proxies, one on each master node (best for high traffic and multiple master shards)                     |
| all-nodes | Multiple proxies, one on each node of the cluster (increases traffic in the cluster, only used in special cases) |
| Legacy | Copies existing binding configuration from earlier versions                                                      |

- To change the proxy policy, run the following command:

```text
rladmin bind 
        [ db <db:id | name> ] 
        endpoint <id> 
        policy <single | all-master-shards | all-nodes>
```

- To specify the nodes to include or exclude from the proxy policy, run the following command:

```text
rladmin bind 
        [ db <db:id | name> ] 
        endpoint <id> [ include | exclude ] 
        proxy <id1 .. idN>
```

### `cluster`

You can use the `rladmin cluster` commands for cluster management. Some `rladmin cluster` commands are only for clusters that are already configured, while others are only for new clusters that have not been configured.

| Command (for configured clusters) | Description |
| - | - |
| [`cluster config`](#cluster-config) | Update configuration for the cluster |
| [`cluster reset_password`](#cluster-reset_password) | Change the password for a given email |
| [`cluster stats_archiver`](#cluster-stats_archiver) | Enable/disable stats archiving |
| [`cluster debug_info`](#cluster-debug_info) | Create a support package |
| `cluster running_actions` | List all active tasks |

| Command (for non-configured clusters) | Description |
| - | - |
| [`cluster create`](#cluster-create) |  |
| [`cluster join`](#cluster-join) |  |
| [`cluster recover_filename`](#cluster-recover_filename) |  |

#### `cluster config`

This command is used to update configuration for the cluster.

```text
 rladmin cluster config 
        [ cipher_suites '<openssl_cipher_list>' ]
        [ ipv6 <enabled/disabled> ]
        [ handle_redirects <enabled/disabled>]
        [ http_support <enabled/disabled>]
        [ min_control_TLS_version <control_tls_version>]
        [ min_data_TLS_version <data_tls_version> ]
        [ sentinel_ssl_policy <allowed/required/disabled> ]

```

The following parameters are optional:

| Option | Description |
| - | - |
| cipher_suites | The cipher suite used for TLS connections to the RS admin console |
| ipv6 | Enable or disable IPv6 connections to the RS admin console |
| handle_redirects | Enable or disable handling DNS redirects when DNS is not configured and running behind a load balancer |
| http_support | Enable or disable using HTTP for REST API connections (info cluster) |
| min_control_TLS_version | The minimum version of TLS protocol which is supported at the control path |
| min_data_TLS_version | The minimum version of TLS protocol which is supported at the data path |
| sentinel_ssl_policy | Define SSL policy for the Discovery Service: required/disabled/allowed |

#### `cluster reset_password`

This command changes the password associated with e-mail address provided.

```text
rladmin cluster reset_password <user email>
```

#### `cluster stats_archiver`


#### `cluster debug_info`

This command writes a support package to the specified path in the cluster configuration file.

```text
rladmin cluster debug_info [ path <path> ]
```
#### `cluster create`

This command creates a new cluster. The node from which the command is executed becomes the first node of the new cluster. 

```text
cluster create 
        name <cluster-name>
        username <admin-user> 
        password <admin-password> 
        [ node_uid <node-uid> ] 
        [ rack_aware ] 
        [ rack_id <node-rack-id> ] 
        [ license_file <file> ] 
        [ ephemeral_path <path> ] 
        [ persistent_path <path> ] 
        [ register_dns_suffix ] 
        [ flash_enabled ] 
        [ flash_path path ] 
        [ addr ip-address ] 
        [external_addr <ip-addresses>]
```

### `failover`

`rladmin failover` allows you to failover one or more master shards of a specific database and promote their respective replicas to new masters. This command verifies replicas are in full sync before failover is performed, unless you specify the `immediate` option.

```text
rladmin failover 
        [db <db:id | name>] 
        shard <id1 .. idN> 
        [immediate]
```

### `help`



### `info`

### `migrate`

### `node`

### `placement`

### `recover`

### `restart`

### `status`

### `suffix`

### `tune`

### `upgrade`

### `verify`

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

- Run a any `rladmin` command without prefacing it with `rladmin`.
- Enter `?` to view the full list of available commands.
- Enter `help` followed by the name of a command for a detailed explanation of the command and its usage.
- Press the Tab key for command completion.
- Enter `exit` or press Ctl+D to return to your terminal prompt.