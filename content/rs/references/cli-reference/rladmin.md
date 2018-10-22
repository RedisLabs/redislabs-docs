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

Document Table of Contents
- [Accessing the rladmin CLI](#accessing-the-rladmin-cli)
- [rladmin features](#rladmin-features)
- [rladmin usage](#rladmin-usage)
    - [bind](#bind)
    - [cluster](#cluster)
        - [cluster reset_password](#cluster-reset_password)
        - [cluster config](#cluster-config)
        - [cluster create](#cluster-create)
        - [cluster join](#cluster-join)
        - [cluster recover](#cluster-recover)
        - [cluster debug_info](#cluster-debug_info)
    - [failover](#failover)
    - [info](#info)
    - [migrate](#migrate)
    - [node](#node)
    - [placement](#placement)
    - [recover](#recover)
    - [restart](#restart)
    - [suffix](#suffix)
    - [tune](#tune)
        - [Configuring databases](#configuring-databases)
        - [Configuring proxies](#configuring-proxies)
        - [Configuring cluster](#configuring-cluster)
    - [upgrade](#upgrade)
    - [verify](#verify)

# Accessing the rladmin CLI 

To open the *rladmin* CLI:

1. Open the operating system CLI.
2. Use an account that is a member of the *redislabs* OS group or change
    user to root by running the following command: sudo su --. (if you you a
    non-root user, you will need to add /opt/redislabs/bin/ to that user's
    PATH env var)
3. Run the following command in the CLI: rladmin

    **Note**: If the CLI does not recognize the rladmin command, you may
    need to run the following command to load the needed configuration
    first: bash -l

4. A message confirms that you are now running rladmin.

# rladmin features 

In the rladmin CLI you can:

- Enter ? to view the full list of available commands.
- Type help, followed by the name of a command to view a detailed
    explanation of the command and its usage.
- Use the Tab key for automatic command completion.


# rladmin usage

-  **bind**      Bind an endpoint
-  **cluster**   Cluster management commands
-  **exit**      Exit admin shell
-  **failover**  Fail-over master to slave
-  **help**      Show available commands, or use ```help <command>``` for a specific command
-  **info**      Show information about tunable parameters
-  **migrate**   Migrate elements between nodes
-  **node**      Node management commands
-  **placement** Configure shards placement policy
-  **recover**   Recover databases
-  **restart**   Restart database shards
-  **status**    Show status information
-  **suffix**    Suffix management
-  **tune**      Tune system parameters
-  **upgrade**   Upgrade entity version
-  **verify**    Cluster verification reports



## bind

Usage:
    
    bind [db <db:id | name>] endpoint <id> 
    [ include | exclude ] proxy <id1 .. idN>
    
    bind [db <db:id | name>] endpoint <id> policy <single | all-master-shards | all-nodes>

Configure a specific endpoint's binding to proxies or change its binding policy.

Example: : 
    ``insert example``



## cluster

If node is configured as part of a cluster:
===============================
### cluster reset_password
    cluster reset_password <user email>
----------------------------------------------------------
Changes the access password of a user whose e-mail address is provided.

### cluster config

    cluster config [cipher_suites cipher-suites-str ] 
        [ipv6 <enabled/disabled>] 
        [handle_redirects <enabled/disabled>] 
        [http_support <enabled/disabled>] 
        [cm_port number] 
        [cnm_http_port number] 
        [cnm_https_port number]
        [min_control_TLS_version control_tls_version] 
        [min_data_TLS_version data_tls_version]

The following parameters are optional:
cipher_suites - Encryption cipher suites used by the cluster API & UI services
ipv6 - Enable or disable use of IPv6 by the cluster API & UI services
handle_redirects - Enable or disable handling cluster redirects internally
http_support - Enable or disable using HTTP for REST API
cm_port - UI server listening port
cnm_http_port - HTTP REST API server listening port
cnm_https_port - HTTPS REST API server listening port
saslauthd_ldap_conf - Path to local file containing the desired saslauthd configuration
debuginfo_path - Path to local directory under which files should be placed when generating support packages.
min_control_TLS_version - The minimum version of TLS protocol which is supported at the control path.
min_data_TLS_version - The minimum version of TLS protocol which is supported at the data path.

If node is not yet configured as part of a cluster:
=====================================
### cluster create 

    cluster create <name cluster-name> <username admin-user> 
        <password> admin-password> 
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


Creates a new cluster, making this node the first node of the cluster.
When creating a new cluster, it is mandatory to specify the cluster name (FQDN) and the cluster administrator's credentials: username and password. FQDN (Fully Qualified Domain Name) is the unique cluster identifier name that enables clients to connect to the different components that are part of the Redis Labs Enterprise Cluster (RLEC).

The following parameters are optional:
node_uid parameter lets you set the node uid of the first node in the cluster, the uid defaults to 1.
rack_aware flag. If not provided then rack awareness is disabled by default. When the flag is provided, each node must be assigned a rack-zone ID (rack_id). This ID maps the node to a physical rack or a logical zone, which itself is mapped to a physical rack.
license_file parameter lets you insert a license file automatically from the rladmin. The file path can either be absolute or relative.
The persistent_path path parameter specifies a path for persistent storage (default location: /var/opt/redislabs/persist), while the ephemeral_path path parameter specifies a path for ephemeral storage (default location: /var/opt/redislabs).
register_dns_suffix flag. If provided, created databases will be maped to an internal as well as external IP addresses. If not provided each database will mapped to single (external) IP address.
flash_enabled flag. If provided, created database will have its flash capabilities enabled. This only works on a node supporting flash.
flash_path parameters specifies a path for flash storage (default location: /var/opt/redislabs/flash), This is needed in case the node does not support CAPI. The location should have flash drive mounted on it.
addr parameter. If provided it will set the internal address of the node. If not provided the node will set address automatically.
external_addr parameter. If provided it will set the external addresses of the node. If not provided the node will set addresses automatically.

### cluster join

    cluster join <name cluster-name | nodes node-address>
        <username admin-user> <password admin-password>
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
 
Joins the specified node to an existing cluster.
When joining a node to an existing cluster, it is mandatory to provide an administrator username and password, and to specify either the cluster name or the internal IP address of an existing node (nodes). If the cluster name is provided, it will be resolved in order to find the address/es of one or more existing nodes.

The following parameters are optional:
The persistent_path path parameter specifies a path for persistent storage (default location: /var/opt/redislabs/persist), while the ephemeral_path path parameter specifies a path ephemeral storage (default location: /var/opt/redislabs).
flash_enabled flag. If provided, created database will have its flash  capabilities enabled. This only works on a node supporting flash.
flash_path parameters specifies a path for flash storage (default      location: /var/opt/redislabs/flash), This is needed in case the node does not  support CAPI. The location should have flash drive mounted on it.
If rack awareness is enabled in the cluster the it is mandatory to supply the rack_id.
If this node is added in order to replace an existing node then you need to supply the ID of the node to be replaced in the replace_node parameter. In this case you can update the rack_id by supplying a new value and supplying the override_rack_id flag. You can add flash support using flash_enabled but if original node already had flash support, flash_enabled is mandatory.
addr parameter. If provided it will set the internal address of the node. If not provided the node will set address automatically.
external_addr parameter. If provided it will set the external addresses of the node. If not provided the node will set addresses automatically.
If override_repair is marked, the node will join the cluster even if there is a dead node in it.
cnm_http_port is used to join a cluster to which the default cnm_http
port was changed (using rladmin cluster config cnm_http_port)

### cluster recover 

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

Recovers cluster from backup, making this node replace the node with ID 1 in the old cluster.
When recovering a cluster, it is mandatory to specify the filename: the location (full path) of the cluster configuration backup file, which is used for recovering the cluster. The file can be retrieved from any of the failed cluster's nodes. By default, the location of the configuration backup file is /var/opt/redislabs/persist/ccs/ccs-redis.rdb, where: /var/opt/redislabs/persist/ is the persistent storage path.

The following parameters are optional:
The persistent_path path parameter specifies a path for persistent storage (default location: /var/opt/redislabs/persist), while the ephemeral_path path parameter specifies a path ephemeral storage (default location: /var/opt/redislabs).
If rack awareness is enabled in the cluster you can override the rack ID by supplying a different rack_id and providing the override_rack_id flag, otherwise the existing value will be kept.
node_uid lets you specify which node will be the first to be recovered and take the role of the master in the recovered cluster. If not specified defaults to 1.
flash_enabled flag. If provided, enables flash in a supporting Node. In case the master node already had flash support. This is mandatory.
flash_path parameters specifies a path for flash storage (default      location: /var/opt/redislabs/flash), This is needed in case the node does not  support CAPI. The location should have flash drive mounted on it.
addr parameter. If provided it will set the internal address of the node. If not provided the node will set address automatically.
external_addr parameter. If provided it will set the external addresses of the node. If not provided the node will set addresses automatically.

### cluster debug_info

    cluster debug_info [path <path>]

Writes support package to debuginfo_path as set in cluster config.

The following parameters are optional:
path lets you specify the path where support package will be written, instead of the default.

## failover 

Usage: 
    
    failover [db <db:id | name>] shard <id1 .. idN> [immediate]

Fail-over one or more master shards of a specific database,
promoting their respective slaves to new masters.

When failing over shards, the slaves are verified to be in full sync before
fail-over is performed, unless the optional immediate keyboard is
specified.

## info

Usage: 

    info db <db:id | name>
    info proxy <id | all>
    info cluster

Show current tunable settings for a specific or all databases, proxies,
cluster.


## migrate

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

```
shard - migrate a single or a list of shards
all_slave_shards - migrate all slave shards of a certain db or node
all_master_shards- migrate all master shards of a certain db or node
all_shards - migrate all shards (masters and slaves) of a certain node
endpoint_to_shards - migrate endpoints of all or one db to the node where majority of the shards are (master to masters, slave to slaves), unless the to_first_slot flag is used
shards_to_endpoint - migrate shards of all or one db to the node where the endpoint is (masters to master, slaves to slave)
```

options:
```
db - limit to shards / endpoints of a specific database
node - limit to shards / endpoints on a specific origin node
target_node - migration target node
restrict_target_node - let the automatic mechanism find the target node, but perform only action for this target node
override_policy - override rack aware policy allowing master and slave to reside on the same rack. You must manually fix this invalid state later on
to_first_slot - find the node of with the shard with the first hash slot rather than the majority of shards
commit - perform the actions! (default is a dry-run)
max_concurrent_migrations - maximum number of concurrent endpoint migrations (default is 1)
preserve_roles - performs an additional fail-over in order to guarantee that the roles of masters are preserved.
```

## node

Usage: 

    node <id> addr set <addr>
    node <id> external_addr set <addr 1> <addr N>
    node <id> external_addr [ add | remove ] <addr>
    node <id> enslave [ shards_only | endpoints_only ]
    node <id> snapshot [ create | list | restore | delete ]
    node <id> [ remove ]

Updates cluster node configuration.  Nodes support a single address which
can be configured only when the node is down or offline.

Nodes support zero or more external addresses, which are used to advertise
the service and accept inbound user connections.  It is possible to
configure one or more addresses in a single 'set' command, or change the
existing configuration using 'add' or 'remove' to add additional addresses
or remove existing addresses, respectively.

Enslaving all bound resources of a node is available using the 'enslave' command.

Handling node snapshots from the current node state (active endpoints and shards)
may be done using the 'snapdhot create', 'snapdhot restore', 'snapdhot list' and
'snapdhot delete' commands.


## placement

Usage:
    
    placement [db <db:id | name>] [ dense | sparse ]

Configure shards placement policy for a given database.

## recover

Usage:
recover some of the databases in recovery mode.
Use only_configuration to recover only db configuration without its data:
    
    recover [db <db:id | name>] [only_configuration]

recover all databases in recovery mode.
Use only_configuration to recover only db configuration without its data:

    recover all [only_configuration]

list all databases available to recover:
    recover list

## restart

Usage: 
    
    restart db <db:id | name> [preserve_roles] [discard_data] [force_discard]

Performs a restart of the Redis software in use by a specific database
instance, by scheduling a restart of the master and slave processes.

The preserve_roles optional flag indicates an additional fail-over
can be used in order to guarantee that the roles of masters and slaves are
preserved by the end of the upgrade process.

The discard_data optional flag indicates that the data can be discarded and will not be saved after restart.

The force_discard optional flag indicates we force discard_data even if there is replication or persistence.

status

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
```    
extra state_machine         Shows extra execution state machine info
extra nodestats                Shows extra masters/slaves shards per node
extra backups                  Shows extra dbs and shards periodic backup status
extra frag                     Shows extra shards fragmented memory that could be reclaimed by restart
extra watchdog                 Shows extra watchdog status
extra rack_id                  Shows rack_id even when cluster is not marked as rack aware
extra redis_version            Shows redis version of all the databases
extra all                      Shows all extra info
```

COLUMN_TITLES: a list of table column titles.
e.g:
    status shards sort NODE USED_MEMORY

issues_only: Filters out all the OK items from status.


## suffix

Usage: 
    
    suffix list
    
    suffix add name <name> [default] [internal] [mdns] [use_aaaa_ns] [slaves <ip>..]
    
    suffix delete name <name>

Handles the DNS suffixes in the cluster.

- **suffix list** shows all suffixes defined in the cluster.
- **suffix add** adds a new suffix called name.
- If default is marked, this will be set as a default suffix for the cluster. Only first 
- **default suffix** is regarded as default, so having multiple default suffixes is good only when you want to change the default.
- If **internal** is marked, the suffix will use private IPs and not public ones.
- If **mdns** is marked, the suffix will support Multicast DNS.
- If **use_aaaa_ns** is marked, the suffix will support IPv6 addresses.
- If slaves are given, the suffix will notify the slaves (frontend dns servers) when a change like a failover has occurred.
- **suffix delete** deletes the suffix named name.


## tune

Usage: 

    tune db <db:id | name> [slave_buffer <value>]
        [client_buffer <value>] [repl_backlog <size>]
        [repl_timeout <value>]
        [repl_diskless <enabled/disabled/default>]
        [master_persistence <enabled/disabled>]
        [maxclients <value>]
        [schedpolicy <value>] 
        [max_shard_pipeline <value>]
        [conns <value>] [conns_type <value>]
        [max_client_pipeline <value>] 
        [max_connections <value>]
        [max_aof_file_size <size>] 
        [oss_cluster <enabled/disabled>]
        [oss_cluster_api_preferred_ip_type <value>]
        [slave_ha <enabled/disabled>]
        [slave_ha_priority <value>]
        [continue_on_error]

or: 
    
    tune proxy <id | all> [mode <static|dynamic>]
        [threads <value>] 
        [max_threads <value>]
        [scale_threshold <value>] 
        [scale_duration <value>]
or: 
   
    tune cluster [repl_diskless <enabled | disabled>]
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

Adjusts tunable system parameters.  This command may accept one or more
parameters at once.

### Configuring databases
**slave_buffer** and **client_buffer** control the Redis slave and
client output buffer limits.  The values are specified in MB or in a full
hard:soft:time which corresponds to the Redis configuration file.

**repl_backlog** is specified in MB (or if ending with bytes, KB or GB, in the respective unit)
and controls the size of the Redis replication buffer.

**repl_timeout** is specified in seconds and controls replication timeout.

**repl_diskless** is specified as default/enabled/disabled, and allows tuning
on/off the Redis diskless replication mechanism. default takes the cluster setting.

**master_persistence** is specified as enabled/disabled, and allows tuning
on/off persistence of the master shard, instead of only the slave shard (in a replicated and persistent DB).

**maxclients** allows tuning the maximum number of client connections between the
internal cluster proxy and every shard Default value is 10000.

**schedpolicy** determines the way server side connections are used when
forwarding traffic to shards, and is one of cmp, mru, spread or mnp.

**conns** determines the size of the internal connection pool, specified
per-thread or per-shard depending on the conns_type settings.

**max_connections** determines the maximum number of client connections to
the database's endpoint. Default value is 0 which means unlimited.

**max_client_pipeline** determines the maximum number of commands in the proxy's
pipeline per client connection. Maximum value is 2047. Default value is 200.

**max_shard_pipeline** determines the maximum number of commands in the proxy's
pipeline per shard connection. Default value is 2000.

**max_aof_file_size** is specified in MB (or if ending with bytes, KB or GB, in the respective unit)
and controls the maximum size of the AOF file. The minimum value for this field is 10GB.

**oss_cluster** is specified as enabled/disabled, and allows setting oss cluster API on/off.
Enabling will fail if oss required conditions are not met.

**oss_cluster_api_preferred_ip_type** determines preferred ip type for endpoint and bdb in oss cluster API: external/internal.
Default is internal. When external ip is set but does not exist internal is used.

**slave_ha** is specified as default/enabled/disabled, and allows turning
on/off the slave high availability mechanism. default takes the cluster setting.

**slave_ha_priority** is an positive integer value, that represents the priority
of the bdb in slave high availability mechanism. it overrides the calculated priority of the bdb.

**continue_on_error** is a flag, that if set, skips gracefully the shards that cannot be reached.

### Configuring proxies

**mode** determines whether or not the proxy can automatically adjust the
number of threads depending on load.

**threads** and **max_threads** determine the initial number of threads
created on startup, and the maximum number of threads allowed.

**scale_threshold** determines the CPU utilization threshold that
triggers spawning new threads.  This CPU utilization level needs to be
maintained for at least scale_duration seconds before automatic
scaling is performed.

### Configuring cluster

**watchdog_profile** cluster watchdog supports two pre-configured profiles:
the cloud profile is suitable for common cloud environments and has
higher tolerance to network jitter, to avoid false positives.
The local-network profile is suitable for dedicated local area networks
and provides improved failure detection and failover times.

**default_redis_version** specifies the default Redis version that new
databases are created with.

**redis_provision_node_threshold** specifies the amount in MBs (or add bytes, KB, MB, GB after the size for different unit)
needed to provision a new redis on a node.

**redis_migrate_node_threshold** specifies the amount in MBs (or add bytes, KB, MB, GB after the size for different unit)
needed to migrate a redis between nodes.

**redis_provision_node_threshold_percent** specifies the amount in percentage needed to
provision a new redis on a node.

**redis_migrate_node_threshold_percent** specifies the amount in percentage needed to
migrate a redis between nodes.

**max_simultaneous_backups** specifies the amount of backups allowed to
happen at once.

**repl_diskless** is specified as enabled/disabled, and allows tuning the
default for the Redis diskless replication mechanism.
it can be overwritten per database.

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


## upgrade

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

The **force_discard** optinal flag indicates we force discard_data even if there is replication or persistence.


## verify

Usage: verify balance [node <id>]
       verify rack_aware

Print cluster shard balance report.
Print cluster rack aware verification report.


