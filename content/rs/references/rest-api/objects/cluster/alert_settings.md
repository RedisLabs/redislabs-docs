---
Title: Alert settings object
linkTitle: alert_settings
description: Documents the alert_settings object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| cluster_certs_about_to_expire | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object | Cluster certificate will expire in x days |
| cluster_even_node_count | boolean (default:&nbsp;false) | True high availability requires an odd number of nodes in the cluster |
| cluster_flash_overcommit | boolean (default:&nbsp;false) | Flash memory committed to databases is larger than cluster total flash memory |
| cluster_inconsistent_redis_sw | boolean (default:&nbsp;false) | Some shards in the cluster are running different versions of Redis software |
| cluster_inconsistent_rl_sw | boolean (default:&nbsp;false) | Some nodes in the cluster are running different versions of Redis Enterprise software |
| cluster_internal_bdb | boolean (default:&nbsp;false) | Issues with internal cluster databases |
| cluster_multiple_nodes_down | boolean (default:&nbsp;false) | Multiple cluster nodes are down (this might cause data loss) |
| cluster_node_joined | boolean (default:&nbsp;false) | New node joined the cluster |
| cluster_node_remove_abort_completed | boolean (default:&nbsp;false) | Cancel node remove operation completed |
| cluster_node_remove_abort_failed | boolean (default:&nbsp;false) | Cancel node remove operation failed |
| cluster_node_remove_completed | boolean (default:&nbsp;false) | Node removed from the cluster |
| cluster_node_remove_failed | boolean (default:&nbsp;false) | Failed to remove a node from the cluster |
| cluster_ocsp_query_failed | boolean (default:&nbsp;false) | Failed to query the OCSP server |
| cluster_ocsp_status_revoked | boolean (default:&nbsp;false) | OCSP certificate status is REVOKED |
| cluster_ram_overcommit | boolean (default:&nbsp;false) | RAM committed to databases is larger than cluster total RAM |
| cluster_too_few_nodes_for_replication | boolean (default:&nbsp;false) | Replication requires at least 2 nodes in the cluster |
| node_aof_slow_disk_io | boolean (default:&nbsp;false) | AOF reaching disk I/O limits
| node_checks_error | boolean (default:&nbsp;false) | Some node checks have failed |
| node_cpu_utilization | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object | Node CPU utilization has reached the threshold value (% of the utilization limit) |
| node_ephemeral_storage | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object | Node ephemeral storage has reached the threshold value (% of the storage limit) |
| node_failed | boolean (default:&nbsp;false) | Node failed |
| node_free_flash | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object | Node flash storage has reached the threshold value (% of the storage limit) |
| node_insufficient_disk_aofrw | boolean (default:&nbsp;false) | Insufficient AOF disk space |
| node_internal_certs_about_to_expire | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object| Internal certificate on node will expire in x days |
| node_memory | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object | Node memory has reached the threshold value (% of the memory limit) |
| node_net_throughput | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object | Node network throughput has reached the threshold value (bytes/s) |
| node_persistent_storage | [cluster_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/cluster/cluster_alert_settings_with_threshold">}}) object | Node persistent storage has reached the threshold value (% of the storage limit) |
