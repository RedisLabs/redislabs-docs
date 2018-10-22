
---
Title: rladmin command-line interface
description: 
weight: $weight
alwaysopen: false
---
Redis Enterprise Software (RS) includes a command-line interface (CLI),
called *rladmin* that can be used for various advanced administrative
tasks. Some of these tasks can also be performed through the management
UI and some are unique to the CLI.

The following are examples of tasks that can be performed through the
CLI:

- View the detailed status of the cluster including information about
    each node, each database, each shard, etc.
- Execute failover between a master and slave shard, or a master and
    slave endpoint.
- Migrate a specific shard or endpoint between nodes.
- Tune specific internal parameters of a database.
- Upgrade the version of a database to the most current version
    supported by the cluster.

===
insert toc
===

## Accessing the rladmin CLI {#_accessing_rladmin}

To open the *rladmin* CLI:

1. Open the operating system CLI.
1. 1\. Use an account that is a member of the *redislabs* OS group or change
    user to root by running the following command: sudo su --. (if you you a
    non-root user, you will need to add /opt/redislabs/bin/ to that user's
    PATH env var)
1. Run the following command in the CLI: rladmin

    **Note**: If the CLI does not recognize the rladmin command, you may
    need to run the following command to load the needed configuration
    first: bash -l

1. A message confirms that you are now running rladmin.

## rladmin features {#_rladmin_features}

In the rladmin CLI you can:

- Enter ? to view the full list of available commands.
- Type help, followed by the name of a command to view a detailed
    explanation of the command and its usage.
- Use the Tab key for automatic command completion.


## rladmin usage {#_rladmin_usage}

### bind {#_bind}
====

Configure a specific endpoint's binding to proxies or change its binding policy.

    bind [db <db:id | name>] endpoint <id> [ include | exclude ] proxy <id1 .. idN>
    bind [db <db:id | name>] endpoint <id> policy <single | all-master-shards | all-nodes>

### cluster {#_cluster}
=======

If node is configured as part of a cluster {#_if_node_is_configured_as_part_of_a_cluster}
------------------------------------------

### cluster reset\_password {#_cluster_reset_password}

Changes the access password of a user whose e-mail address is provided.

    cluster reset_password <user email>

### cluster config {#_cluster_config}

    cluster config
        [cipher_suites cipher-suites-str ]
        [ipv6 <enabled/disabled>]
        [handle_redirects <enabled/disabled>]
        [http_support <enabled/disabled>]
        [cm_port number]
        [cnm_http_port number]
        [cnm_https_port number]
        [min_control_TLS_version control_tls_version]
        [min_data_TLS_version data_tls_version]

+-----------------+-----------------------------------------------------------------------------------------------------+
| cipher\_suites  | Encryption cipher suites used by the cluster API & UI services                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| ipv6            | Enable or disable use of IPv6 by the cluster API & UI services                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| handle\_redirec | Enable or disable handling cluster redirects internally                                             |
| ts              |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| http\_support   | Enable or disable using HTTP for REST API                                                           |
+-----------------+-----------------------------------------------------------------------------------------------------+
| cm\_port        | UI server listening port                                                                            |
+-----------------+-----------------------------------------------------------------------------------------------------+
| cnm\_http\_port | HTTP REST API server listening port                                                                 |
+-----------------+-----------------------------------------------------------------------------------------------------+
| cnm\_https\_por | HTTPS REST API server listening port                                                                |
| t               |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| saslauthd\_ldap | Path to local file containing the desired saslauthd configuration                                   |
| \_conf          |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| debuginfo\_path | Path to local directory under which files should be placed when generating support packages.        |
+-----------------+-----------------------------------------------------------------------------------------------------+
| min\_control\_T | The minimum version of TLS protocol which is supported at the control path.                         |
| LS\_version     |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| min\_data\_TLS\ | The minimum version of TLS protocol which is supported at the data path.                            |
| _version        |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+

: The following parameters are optional

If node is not yet configured as part of a cluster: {#_if_node_is_not_yet_configured_as_part_of_a_cluster}
---------------------------------------------------

### cluster create {#_cluster_create}

Creates a new cluster, making this node the first node of the cluster. When creating a new cluster, it is mandatory to
specify the cluster name (FQDN) and the cluster administrator's credentials: username and password. FQDN (Fully
Qualified Domain Name) is the unique cluster identifier name that enables clients to connect to the different components
that are part of the Redis Labs Enterprise Cluster (RLEC).

    cluster create <name cluster-name> <username admin-user> <password admin-password>
        [node_uid node-uid]
        [rack_aware]
        [rack_id node-rack-id]
        [license_file file]
        [ephemeral_path path]
        [persistent_path path]
        [register_dns_suffix]
        [flash_enabled]
        [flash_path path]
        [addr ip-address]
        [external_addr ip-addresses]

+-----------------+-----------------------------------------------------------------------------------------------------+
| node\_uid       | lets you set the node uid of the first node in the cluster, the uid defaults to 1.                  |
+-----------------+-----------------------------------------------------------------------------------------------------+
| rack\_aware     | If not provided then rack awareness is disabled by default. When the flag is provided, each node    |
|                 | must be assigned a rack-zone ID (rack\_id). This ID maps the node to a physical rack or a logical   |
|                 | zone, which itself is mapped to a physical rack.                                                    |
+-----------------+-----------------------------------------------------------------------------------------------------+
| license\_file   | Lets you insert a license file automatically from the rladmin. The file path can either be absolute |
|                 | or relative.                                                                                        |
+-----------------+-----------------------------------------------------------------------------------------------------+
| persistent\_pat | Path for persistent storage (default location: /var/opt/redislabs/persist), while the               |
| h               | ephemeral\_path path parameter specifies a path for ephemeral storage (default location:            |
|                 | /var/opt/redislabs).                                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| register\_dns\_ | If provided, created databases will be maped to an internal as well as external IP addresses. If    |
| suffix          | not provided each database will mapped to single (external) IP address.                             |
+-----------------+-----------------------------------------------------------------------------------------------------+
| flash\_enabled  | If provided, created database will have its flash capabilities enabled. This only works on a node   |
|                 | supporting flash.                                                                                   |
+-----------------+-----------------------------------------------------------------------------------------------------+
| flash\_path     | Path for flash storage (default location: /var/opt/redislabs/flash), This is needed in case the     |
|                 | node does not support CAPI. The location should have flash drive mounted on it.                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| addr            | If provided it will set the internal address of the node. If not provided the node will set address |
|                 | automatically.                                                                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| external\_addr  | If provided it will set the external addresses of the node. If not provided the node will set       |
|                 | addresses automatically.                                                                            |
+-----------------+-----------------------------------------------------------------------------------------------------+

: The following parameters are optional

### cluster join {#_cluster_join}

Joins the specified node to an existing cluster. When joining a node to an existing cluster, it is mandatory to provide
an administrator username and password, and to specify either the cluster name or the internal IP address of an existing
node (nodes). If the cluster name is provided, it will be resolved in order to find the address/es of one or more
existing nodes.

    cluster join <name cluster-name | nodes node-address> <username admin-user> <password admin-password>
        [ephemeral_path path]
        [persistent_path path]
        [rack_id node-rack-id]
        [override_rack_id]
        [replace_node node-uid]
        [flash_enabled]
        [flash_path path]
        [addr ip-address]
        [external_addr ip-addresses]
        [override_repair]
        [cnm_http_port port]

+-----------------+-----------------------------------------------------------------------------------------------------+
| persistent\_pat | Path for persistent storage (default location: /var/opt/redislabs/persist), while the               |
| h               | ephemeral\_path path parameter specifies a path ephemeral storage (default location:                |
|                 | /var/opt/redislabs).                                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| flash\_enabled  | If provided, created database will have its flash capabilities enabled. This only works on a node   |
|                 | supporting flash.                                                                                   |
+-----------------+-----------------------------------------------------------------------------------------------------+
| flash\_path     | Path for flash storage (default location: /var/opt/redislabs/flash), This is needed in case the     |
|                 | node does not support CAPI. The location should have flash drive mounted on it.                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| rack\_id        | If rack awareness is enabled in the cluster the it is mandatory to supply the rack\_id.             |
+-----------------+-----------------------------------------------------------------------------------------------------+
| replace\_node   | If this node is added in order to replace an existing node then you need to supply the ID of the    |
|                 | node to be replaced in the replace\_node parameter. In this case you can update the rack\_id by     |
|                 | supplying a new value and supplying the override\_rack\_id flag. You can add flash support using    |
|                 | flash\_enabled but if original node already had flash support, flash\_enabled is mandatory.         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| addr            | If provided it will set the internal address of the node. If not provided the node will set address |
|                 | automatically.                                                                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| external\_addr  | If provided it will set the external addresses of the node. If not provided the node will set       |
|                 | addresses automatically.                                                                            |
+-----------------+-----------------------------------------------------------------------------------------------------+
| override\_repai | If specified the node will join the cluster even if there is a dead node in it.                     |
| r               |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| cnm\_http\_port | used to join a cluster to which the default cnm\_http port was changed (using rladmin cluster       |
|                 | config cnm\_http\_port)                                                                             |
+-----------------+-----------------------------------------------------------------------------------------------------+

: The following parameters are optional:

### cluster recover {#_cluster_recover}

Recovers cluster from backup, making this node replace the node with ID 1 in the old cluster. When recovering a cluster,
it is mandatory to specify the filename: the location (full path) of the cluster configuration backup file, which is
used for recovering the cluster. The file can be retrieved from any of the failed cluster's nodes. By default, the
location of the configuration backup file is `/var/opt/redislabs/persist/ccs/ccs-redis.rdb`, where:
`/var/opt/redislabs/persist/` is the persistent storage path.

    cluster recover filename <recovery-file-name>
        [ephemeral_path <path>]
        [persistent_path <path>]
        [rack_id <ID>]
        [override_rack_id]
        [node_uid number]
        [flash_enabled]
        [flash_path path]
        [addr ip-address]
        [external_addr ip-addresses]

+-----------------+-----------------------------------------------------------------------------------------------------+
| persistent\_pat | Path for persistent storage (default location: /var/opt/redislabs/persist), while the               |
| h               | ephemeral\_path path parameter specifies a path ephemeral storage (default location:                |
|                 | /var/opt/redislabs).                                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| rack\_id        | If rack awareness is enabled in the cluster you can override the rack ID by supplying a different   |
|                 | rack\_id and providing the override\_rack\_id flag, otherwise the existing value will be kept.      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| node\_uid       | Lets you specify which node will be the first to be recovered and take the role of the master in    |
|                 | the recovered cluster. If not specified defaults to 1.                                              |
+-----------------+-----------------------------------------------------------------------------------------------------+
| flash\_enabled  | If provided, enables flash in a supporting Node. In case the master node already had flash support. |
|                 | This is mandatory.                                                                                  |
+-----------------+-----------------------------------------------------------------------------------------------------+
| flash\_path     | Path for flash storage (default location: /var/opt/redislabs/flash), This is needed in case the     |
|                 | node does not support CAPI. The location should have flash drive mounted on it.                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| addr            | If provided it will set the internal address of the node. If not provided the node will set address |
|                 | automatically.                                                                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| external\_addr  | If provided it will set the external addresses of the node. If not provided the node will set       |
|                 | addresses automatically.                                                                            |
+-----------------+-----------------------------------------------------------------------------------------------------+

: The following parameters are optional:

### cluster debug {#_cluster_debug}

Writes support package to debuginfo\_path as set in cluster config.

    cluster debug_info [path <path>]

+-----------------+-----------------------------------------------------------------------------------------------------+
| path            | Lets you specify the path where support package will be written, instead of the default.            |
+-----------------+-----------------------------------------------------------------------------------------------------+

: The following parameters are optional:

exit {#_exit}
====

Exit admin shell

failover {#_failover}
========

Fail-over one or more master shards or endpoints of a specific database, promoting their respective slaves to new
masters.

    failover [db <db:id | name>] shard <id1 .. idN> [immediate]
    failover [db <db:id | name>] endpoint <id1 .. idN>

When failing over shards, the slaves are verified to be in full sync before fail-over is performed, unless the optional
immediate keyboard is specified.

help {#_help}
====

Show available commands, or use help \<command\> for a specific command

info {#_info}
====

Show current tunable settings for a specific or all databases, proxies, cluster.

    info db <db:id | name>
    info proxy <id | all>
    info cluster

migrate {#_migrate}
=======

Migrate one or more shards or endpoints to a new node.

    migrate [db <db:id | name> | node <origin node:id>] shard <id1 .. idN> [preserve_roles] target_node <id> [override_policy]
    migrate [db <db:id | name> | node <origin node:id>] endpoint <id> target_node <id> [override_policy]

    migrate (db <db:id | name> | node <origin node:id>) all_slave_shards target_node <id> [override_policy]
    migrate (db <db:id | name> | node <origin node:id>) all_master_shards target_node <id> [override_policy]
    migrate                      node <origin node:id>  all_shards target_node <id> [override_policy]

    migrate [db <db:id | name> | node <origin node:id>] shards_to_endpoint [restrict_target_node <id>] [override_policy] [commit]
    migrate [db <db:id | name> | node <origin node:id>] endpoint_to_shards [restrict_target_node <id>] [override_policy] [to_first_slot] [commit] [max_concurrent_migrations <value>]

+-----------------+-----------------------------------------------------------------------------------------------------+
| shard           | migrate a single or a list of shards                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| endpoint        | migrate a single or a list of endpoints                                                             |
+-----------------+-----------------------------------------------------------------------------------------------------+
| all\_slave\_sha | migrate all slave shards of a certain db or node                                                    |
| rds             |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| all\_master\_sh | migrate all master shards of a certain db or node                                                   |
| ards            |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| all\_shards     | migrate all shards (masters and slaves) of a certain node                                           |
+-----------------+-----------------------------------------------------------------------------------------------------+
| endpoint\_to\_s | migrate endpoints of all or one db to the node where majority of the shards are (master to masters, |
| hards           | slave to slaves), unless the to\_first\_slot flag is used                                           |
+-----------------+-----------------------------------------------------------------------------------------------------+
| shards\_to\_end | migrate shards of all or one db to the node where the endpoint is (masters to master, slaves to     |
| point           | slave)                                                                                              |
+-----------------+-----------------------------------------------------------------------------------------------------+

: commands

+-----------------+-----------------------------------------------------------------------------------------------------+
| db              | limit to shards / endpoints of a specific database                                                  |
+-----------------+-----------------------------------------------------------------------------------------------------+
| node            | limit to shards / endpoints on a specific origin node                                               |
+-----------------+-----------------------------------------------------------------------------------------------------+
| target\_node    | migration target node                                                                               |
+-----------------+-----------------------------------------------------------------------------------------------------+
| restrict\_targe | let the automatic mechanism find the target node, but perform only action for this target node      |
| t\_node         |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| override\_polic | override rack aware policy allowing master and slave to reside on the same rack. You must manually  |
| y               | fix this invalid state later on                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| to\_first\_slot | find the node of with the shard with the first hash slot rather than the majority of shards         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| commit          | perform the actions! (default is a dry-run)                                                         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| max\_concurrent | maximum number of concurrent endpoint migrations (default is 1)                                     |
| \_migrations    |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| preserve\_roles | performs an additional fail-over in order to guarantee that the roles of masters are preserved.     |
+-----------------+-----------------------------------------------------------------------------------------------------+

: options

node {#_node}
====

Updates cluster node configuration. Nodes support a single address which can be configured only when the node is down or
offline.

    node <id> addr set <addr>
    node <id> external_addr set <addr 1> <addr N>
    node <id> external_addr [ add | remove ] <addr>
    node <id> enslave [ shards_only | endpoints_only ]
    node <id> snapshot [ create | list | restore | delete ]
    node <id> [ remove ]

Nodes support zero or more external addresses, which are used to advertise the service and accept inbound user
connections. It is possible to configure one or more addresses in a single *set* command, or change the existing
configuration using *add* or *remove* to add additional addresses or remove existing addresses, respectively.

Enslaving all bound resources of a node is available using the *enslave* command.

Handling node snapshots from the current node state (active endpoints and shards) may be done using the *snapdhot
create*, *snapdhot restore*, *snapdhot list* and *snapdhot delete* commands.

placement {#_placement}
=========

Configure shards placement policy for a given database.

    placement [db <db:id | name>] [ dense | sparse ]

recover {#_recover}
=======

Recover some of the databases in recovery mode. {#_recover_some_of_the_databases_in_recovery_mode}
-----------------------------------------------

Use `only_configuration` to recover only db configuration without its data:

    recover [db <db:id | name>] [only_configuration]

Recover all databases in recovery mode. {#_recover_all_databases_in_recovery_mode}
---------------------------------------

Use `only_configuration` to recover only db configuration without its data:

    recover all [only_configuration]

List all databases available to recover: {#_list_all_databases_available_to_recover}
----------------------------------------

    recover list

restart {#_restart}
=======

Performs a restart of the Redis software in use by a specific database instance, by scheduling a restart of the master
and slave processes.

    restart db <db:id | name> [preserve_roles] [discard_data] [force_discard]

The `preserve_roles` optional flag indicates an additional fail-over can be used in order to guarantee that the roles of
masters and slaves are preserved by the end of the upgrade process.

The `discard_data` optional flag indicates that the data can be discarded and will not be saved after restart.

The `force_discard` optional flag indicates we force discard\_data even if there is replication or persistence.

status {#_status}
======

Display current cluster status and topology information.

Full status report: {#_full_status_report}
-------------------

    status [extra options] [issues_only]

Status report of just the nodes table: {#_status_report_of_just_the_nodes_table}
--------------------------------------

    status nodes [extra options] [sort <COLUMN_TITLES>] [issues_only]

Status report of just the database table: {#_status_report_of_just_the_database_table}
-----------------------------------------

    status databases [extra options] [sort <COLUMN_TITLES>] [issues_only]

Status report of just the endpoints table: {#_status_report_of_just_the_endpoints_table}
------------------------------------------

    status endpoints [node <id>] [db <db:id | name>] [extra options] [sort <COLUMN_TITLES>] [issues_only]

Status report of just the shards table: {#_status_report_of_just_the_shards_table}
---------------------------------------

    status shards [node <id>] [db <db:id | name>] [extra options] [sort <COLUMN_TITLES>] [issues_only]

+-----------------+-----------------------------------------------------------------------------------------------------+
| extra           | Shows extra execution state machine info                                                            |
| state\_machine  |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| extra nodestats | Shows extra masters/slaves shards per node                                                          |
+-----------------+-----------------------------------------------------------------------------------------------------+
| extra backups   | Shows extra dbs and shards periodic backup status                                                   |
+-----------------+-----------------------------------------------------------------------------------------------------+
| extra frag      | Shows extra shards fragmented memory that could be reclaimed by restart                             |
+-----------------+-----------------------------------------------------------------------------------------------------+
| extra watchdog  | Shows extra watchdog status                                                                         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| extra rack\_id  | Shows rack\_id even when cluster is not marked as rack aware                                        |
+-----------------+-----------------------------------------------------------------------------------------------------+
| extra           | Shows redis version of all the databases                                                            |
| redis\_version  |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| extra all       | Shows all extra info                                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+

: Extra info options:

`COLUMN_TITLES`: a list of table column titles. e.g:

    status shards sort NODE USED_MEMORY

`issues_only`: Filters out all the OK items from status.

suffix {#_suffix}
======

Handles the DNS suffixes in the cluster.

suffix list {#_suffix_list}
-----------

shows all suffixes defined in the cluster.

    suffix list

suffix add {#_suffix_add}
----------

adds a new suffix called name.

    suffix add name <name> [default] [internal] [mdns] [use_aaaa_ns] [slaves <ip>..]

If default is marked, this will be set as a default suffix for the cluster. Only first default suffix is regarded as
default, so having multiple default suffixes is good only when you want to change the default. If internal is marked,
the suffix will use private IPs and not public ones. If mdns is marked, the suffix will support Multicast DNS. If
use\_aaaa\_ns is marked, the suffix will support IPv6 addresses. If slaves are given, the suffix will notify the slaves
(frontend dns servers) when a change like a failover has occurred.

suffix delete {#_suffix_delete}
-------------

deletes the suffix named name.

    suffix delete name <name>

tune {#_tune}
====

Adjusts tunable system parameters. This command may accept one or more parameters at once.

Configuring databases {#_configuring_databases}
---------------------

    tune db <db:id | name>
        [slave_buffer <value>]
        [client_buffer <value>] [repl_backlog <size>]
        [repl_timeout <value>]
        [repl_diskless <enabled/disabled/default>]
        [master_persistence <enabled/disabled>]
        [maxclients <value>]
        [schedpolicy <value>] [max_shard_pipeline <value>]
        [conns <value>] [conns_type <value>]
        [max_client_pipeline <value>] [max_connections <value>]
        [max_aof_file_size <size>] [oss_cluster <enabled/disabled>]
        [oss_cluster_api_preferred_ip_type <value>]
        [slave_ha <enabled/disabled>]
        [slave_ha_priority <value>]
        [continue_on_error]

+-----------------+-----------------------------------------------------------------------------------------------------+
| slave\_buffer & | control the Redis slave and client output buffer limits. The values are specified in MB or in a     |
| client\_buffer  | full `hard:soft:time` corresponds to the Redis configuration file.                                  |
+-----------------+-----------------------------------------------------------------------------------------------------+
| repl\_backlog   | specified in MB (or if ending with bytes, KB or GB, in the respective unit) and controls the size   |
|                 | of the Redis replication buffer.                                                                    |
+-----------------+-----------------------------------------------------------------------------------------------------+
| repl\_timeout   | specified in seconds and controls replication timeout.                                              |
+-----------------+-----------------------------------------------------------------------------------------------------+
| repl\_diskless  | specified as `default`/`enabled`/`disabled`, and allows tuning on/off the Redis diskless            |
|                 | replication mechanism. `default` takes the cluster setting.                                         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| master\_persist | specified as `enabled`/`disabled`, and allows tuning on/off persistence of the master shard,        |
| ence            | instead of only the slave shard (in a replicated and persistent DB).                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| maxclients      | allows tuning the maximum number of client connections between the internal cluster proxy and every |
|                 | shard. Default value is 10000.                                                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| schedpolicy     | determines the way server side connections are used when forwarding traffic to shards, and is one   |
|                 | of cmp, mru, spread or mnp.                                                                         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| conns           | determines the size of the internal connection pool, specified per-thread or per-shard depending on |
|                 | the conns\_type settings.                                                                           |
+-----------------+-----------------------------------------------------------------------------------------------------+
| max\_connection | determines the maximum number of client connections to the database's endpoint. Default value is 0  |
| s               | which means unlimited.                                                                              |
+-----------------+-----------------------------------------------------------------------------------------------------+
| max\_client\_pi | determines the maximum number of commands in the proxy's pipeline per client connection. Maximum    |
| peline          | value is 2047. Default value is 200.                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| max\_shard\_pip | determines the maximum number of commands in the proxy's pipeline per shard connection. Default     |
| eline           | value is 2000.                                                                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| max\_aof\_file\ | is specified in MB (or if ending with bytes, KB or GB, in the respective unit) and controls the     |
| _size           | maximum size of the AOF file. The minimum value for this field is 10GB.                             |
+-----------------+-----------------------------------------------------------------------------------------------------+
| oss\_cluster    | specified as `enabled`/`disabled`, and allows setting oss cluster API on/off. Enabling will fail if |
|                 | oss required conditions are not met.                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| oss\_cluster\_a | determines preferred ip type for endpoint and bdb in oss cluster API: external/internal. Default is |
| pi\_preferred\_ | `internal`. When `external` ip is set but does not exist internal is used.                          |
| ip\_type        |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| slave\_ha       | specified as `default`/`enabled`/`disabled`, and allows turning on/off the slave high availability  |
|                 | mechanism. Default takes the cluster setting.                                                       |
+-----------------+-----------------------------------------------------------------------------------------------------+
| slave\_ha\_prio | positive integer value that represents the priority of the bdb in slave high availability           |
| rity            | mechanism. it overrides the calculated priority of the bdb.                                         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| continue\_on\_e | a flag that if set, skips gracefully the shards that cannot be reached.                             |
| rror            |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+

: Options

Configuring proxies {#_configuring_proxies}
-------------------

    tune proxy <id | all>
        [mode <static|dynamic>]
        [threads <value>]
        [max_threads <value>]
        [scale_threshold <value>]
        [scale_duration <value>]

+-----------------+-----------------------------------------------------------------------------------------------------+
| mode            | determines whether or not the proxy can automatically adjust the number of threads depending on     |
|                 | load.                                                                                               |
+-----------------+-----------------------------------------------------------------------------------------------------+
| threads and     | determine the initial number of threads created on startup, and the maximum number of threads       |
| max\_threads    | allowed.                                                                                            |
+-----------------+-----------------------------------------------------------------------------------------------------+
| scale\_threshol | determines the CPU utilization threshold that triggers spawning new threads. This CPU utilization   |
| d               | level needs to be maintained for at least scale\_duration seconds before automatic scaling is       |
|                 | performed.                                                                                          |
+-----------------+-----------------------------------------------------------------------------------------------------+

: Options

Configuring cluster {#_configuring_cluster}
-------------------

    tune cluster
        [repl_diskless <enabled | disabled>]
        [default_redis_version <version>]
        [redis_provision_node_threshold <size>]
        [redis_migrate_node_threshold <size>]
        [redis_provision_node_threshold_percent <percent>]
        [redis_migrate_node_threshold_percent <percent>]
        [max_simultaneous_backups <size>]
        [watchdog_profile <cloud | local-network>]
        [slave_ha <enabled/disabled>]
        [slave_ha_grace_period <seconds>]
        [slave_ha_cooldown_period <seconds>]
        [slave_ha_bdb_cooldown_period <seconds>]

+-----------------+-----------------------------------------------------------------------------------------------------+
| watchdog\_profi | cluster watchdog supports two pre-configured profiles:                                              |
| le              |                                                                                                     |
|                 | cloud                                                                                               |
|                 |                                                                                                     |
|                 | :   suitable for common cloud environments and has higher tolerance to network jitter, to avoid     |
|                 |     false positives.                                                                                |
|                 |                                                                                                     |
|                 | local-network                                                                                       |
|                 |                                                                                                     |
|                 | :   suitable for dedicated local area networks and provides improved failure detection and failover |
|                 |     times.                                                                                          |
+-----------------+-----------------------------------------------------------------------------------------------------+
| default\_redis\ | specifies the default Redis version that new databases are created with.                            |
| _version        |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| redis\_provisio | specifies the amount in MBs (or add bytes, KB, MB, GB after the size for different unit) needed to  |
| n\_node\_thresh | provision a new redis on a node.                                                                    |
| old             |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| redis\_migrate\ | specifies the amount in MBs (or add bytes, KB, MB, GB after the size for different unit) needed to  |
| _node\_threshol | migrate a redis between nodes.                                                                      |
| d               |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| redis\_provisio | specifies the amount in percentage needed to provision a new redis on a node.                       |
| n\_node\_thresh |                                                                                                     |
| old\_percent    |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| redis\_migrate\ | specifies the amount in percentage needed to migrate a redis between nodes.                         |
| _node\_threshol |                                                                                                     |
| d\_percent      |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| max\_simultaneo | specifies the amount of backups allowed to happen at once.                                          |
| us\_backups     |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+
| repl\_diskless  | specified as `enabled`/`disabled`, and allows tuning the default for the Redis diskless replication |
|                 | mechanism. It can be overwritten per database.                                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| slave\_ha       | specified as `enabled`/`disabled`, and allows tuning the default for the slave high availability    |
|                 | mechanism. it can be overwritten per database.                                                      |
+-----------------+-----------------------------------------------------------------------------------------------------+
| slave\_ha\_grac | specifies the time in seconds, between when a node fails, and when slave high availability          |
| e\_period       | mechanism starts relocating shards from it to another node.                                         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| slave\_ha\_cool | specifies the time in seconds after shard relocation in which slave high availability mechanism     |
| down\_period    | cannot relocate from any other node.                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| slave\_ha\_bdb\ | specifies the time in seconds after shard relocation in which slave high availability mechanism     |
| _cooldown\_peri | cannot relocate database from any other node.                                                       |
| od              |                                                                                                     |
+-----------------+-----------------------------------------------------------------------------------------------------+

: Options

upgrade {#_upgrade}
=======

Performs an upgrade of the Redis software in use by a specific database instance, by scheduling a restart of the master
and slave processes.

    upgrade db <db:id | name> [preserve_roles] [keep_current_version] [discard_data] [force_discard]

+-----------------+-----------------------------------------------------------------------------------------------------+
| preserve\_roles | optional flag indicates an additional fail-over can be used in order to guarantee that the roles of |
|                 | masters and slaves are preserved by the end of the upgrade process.                                 |
+-----------------+-----------------------------------------------------------------------------------------------------+
| keep\_current\_ | optional flag requests an upgrade to the new patch release, without upgrading to the latest         |
| version         | major.minor version.                                                                                |
+-----------------+-----------------------------------------------------------------------------------------------------+
| discard\_data   | optional flag indicates that the data can be discarded and will not be saved after upgrade.         |
+-----------------+-----------------------------------------------------------------------------------------------------+
| force\_discard  | optional flag indicates we force discard\_data even if there is replication or persistence.         |
+-----------------+-----------------------------------------------------------------------------------------------------+

: Options

verify {#_verify}
======

Print cluster shard balance report {#_print_cluster_shard_balance_report}
----------------------------------

    verify balance [node <id>]

Print cluster rack aware verification report {#_print_cluster_rack_aware_verification_report}
--------------------------------------------

    verify rack_aware
