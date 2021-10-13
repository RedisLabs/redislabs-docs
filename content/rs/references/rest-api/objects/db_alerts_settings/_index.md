---
Title: Database alerts settings object
linkTitle: db_alerts_settings
description: Documents the db_alerts_settings object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents the database alerts configuration.

| Name | Type/Value | Description |
|------|------------|-------------|
| bdb_backup_delayed | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Periodic backup has been delayed for longer than specified threshold value (minutes) |
| bdb_high_latency | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Latency is higher than specified threshold value (microsec) |
| bdb_high_throughput | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Throughput is higher than specified threshold value (requests / sec) |
| bdb_low_throughput | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Throughput is lower than specified threshold value (requests / sec) |
| bdb_size | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Dataset size has reached the threshold value \(% of the memory limit) |
| bdb_ram_dataset_overhead | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Dataset RAM overhead of a shard has reached the threshold value (% of its RAM limit) |
| bdb_ram_values | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Percent of values kept in a shard's RAM is lower than (% of its key count) |
| bdb_shard_num_ram_values | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Number of values kept in a shard's RAM is lower than (values) |
| bdb_high_syncer_lag | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Replica of sync lag is higher than specified threshold value (seconds) (deprecated) |
| bdb_syncer_connection_error | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Replica of sync has connection error while trying to connect replica source (deprecated) |
| bdb_syncer_general_error | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Replica of sync encountered in general error (deprecated) |
| bdb_replica_src_high_syncer_lag | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Replica-of source sync lag is higher than specified threshold  value (seconds) |
| bdb_replica_src_syncer_connection_error | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Replica-of source sync has connection error while trying to connect replica source |
| bdb_replica_src_syncer_general_error | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | Replica-of sync encountered in general error |
| bdb_crdt_src_high_syncer_lag | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | CRDB source sync lag is higher than specified threshold value (seconds) |
| bdb_crdt_src_syncer_connection_error | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | CRDB source sync has connection error while trying to connect replica source |
| bdb_crdt_src_syncer_general_error | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | CRDB sync encountered in general error |
| bdb_long_running_action | [bdb_alert_settings_with_threshold]({{<relref "/rs/references/rest-api/objects/db_alerts_settings/bdb_alert_settings_with_threshold">}}) object | An alert for state-machines that are running for too long |
