---
Title: Cluster settings object
linkTitle: cluster_settings
description: An object for cluster resource management settings
weight: $weight
alwaysopen: false
categories: ["RS"]
---

Cluster resources management policy

| Name | Type/Value | Description |
|------|------------|-------------|
| acl_pubsub_default | `resetchannels`<br /> `allchannels` | Default pub/sub ACL rule for all databases in the cluster:<br />•`resetchannels` blocks access to all channels (restrictive)<br />•`allchannels` allows access to all channels (permissive) |
| bigstore_migrate_node_threshold | integer | Minimum free memory (excluding reserved memory) allowed on a node before automatic migration of shards from it to free more memory |
| bigstore_migrate_node_threshold_p | integer | Minimum free memory (excluding reserved memory) allowed on a node before automatic migration of shards from it to free more memory |
| bigstore_provision_node_threshold | integer | Minimum free memory (excluding reserved memory) allowed on a node before new shards can no longer be added to it |
| bigstore_provision_node_threshold_p | integer | Minimum free memory (excluding reserved memory) allowed on a node before new shards can no longer be added to it |
| cluster_preferred_endpoint_type_default | `ip`<br />`hostname` | The default preferred endpoint type, returned by `CLUSTER SLOTS`, `CLUSTER SHARDS`, and `CLUSTER NODES`, for new databases (defaults to `ip`) |
| data_internode_encryption | boolean | Enable/deactivate encryption of the data plane internode communication |
| db_conns_auditing | boolean | [Audit connections]({{<relref "/rs/security/audit-events">}}) for new databases by default if set to true. |
| default_concurrent_restore_actions | integer | Default number of restore actions allowed at the same time. Set to 0 to allow any number of simultaneous restore actions. |
| default_fork_evict_ram | boolean | If true, the bdbs should evict data from RAM to ensure successful replication or persistence |
| default_non_sharded_proxy_policy | `single`<br /><nobr>`all-master-shards`</nobr><br />`all-nodes` | Default proxy_policy for newly created non-sharded databases' endpoints |
| default_provisioned_redis_version | string | Default Redis version |
| default_sharded_proxy_policy | `single`<br />`all-master-shards`<br />`all-nodes` | Default proxy_policy for newly created sharded databases' endpoints |
| default_shards_placement | `dense`<br />`sparse` | Default shards_placement for a newly created databases |
| endpoint_rebind_propagation_grace_time | integer | Time to wait between the addition and removal of a proxy |
| failure_detection_sensitivity | `high`<br />`low` | Predefined thresholds and timeouts for failure detection (previously known as `watchdog_profile`)<br />• `high` (previously `local-network`) – high failure detection sensitivity, lower thresholds, faster failure detection and failover<br />• `low` (previously `cloud`) – low failure detection sensitivity, higher tolerance for latency variance (also called network jitter) |
| login_lockout_counter_reset_after | integer | Number of seconds that must elapse between failed sign in attempts before the lockout counter is reset to 0. |
| login_lockout_duration | integer | Duration (in secs) of account lockout. If set to 0, the account lockout will persist until released by an admin. |
| login_lockout_threshold | integer | Number of failed sign in attempts allowed before locking a user account |
| max_saved_events_per_type | integer | Maximum saved events per event type |
| max_simultaneous_backups | integer <nobr>(default: 4)</nobr> | Maximum number of backup processes allowed at the same time |
| parallel_shards_upgrade | integer | Maximum number of shards to upgrade in parallel |
| persistence_cleanup_scan_interval | string | [CRON expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) that defines the Redis cleanup schedule |
| rack_aware | boolean | Cluster operates in a rack-aware mode |
| redis_migrate_node_threshold | integer | Minimum free memory (excluding reserved memory) allowed on a node before automatic migration of shards from it to free more memory |
| redis_migrate_node_threshold_p | integer | Minimum free memory (excluding reserved memory) allowed on a node before automatic migration of shards from it to free more memory |
| redis_provision_node_threshold | integer | Minimum free memory (excluding reserved memory) allowed on a node before new shards can no longer be added to it |
| redis_provision_node_threshold_p | integer | Minimum free memory (excluding reserved memory) allowed on a node before new shards can no longer be added to it |
| redis_upgrade_policy | **`major`** <br />`latest` | Create/upgrade Redis Enterprise software on databases in the cluster by compatibility with major versions or latest versions of OSS Redis |
| resp3_default | boolean (default:&nbsp;true) | Determines the default value of the `resp3` option upon upgrading a database to version 7.2 |
| shards_overbooking | boolean | If true, all databases' memory_size is ignored during shards placement |
| show_internals | boolean | Show internal databases (and their shards and endpoints) REST APIs |
| slave_ha | boolean | Enable the replica high-availability mechanism |
| slave_ha_bdb_cooldown_period | integer | Time in seconds between runs of the replica high-availability mechanism on different nodes on the same database |
| slave_ha_cooldown_period | integer | Time in seconds between runs of the replica high-availability mechanism on different nodes on the same database |
| slave_ha_grace_period | integer | Time in seconds between a node failure and when the replica high-availability mechanism starts relocating shards |
