---
Title: BDB replica sync field
linkTitle: replica_sync
description: Documents the bdb replica_sync field used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

The BDB `replica_sync` field relates to the [Replica Of]({{<relref "/rs/databases/import-export/create-replica-of.md">}}) feature, which enables the creation of a Redis database (single- or multi-shard) that synchronizes data from another Redis database (single- or multi-shard).

You can use the `replica_sync` field to enable, disable, or pause the [Replica Of]({{<relref "/rs/databases/import-export/create-replica-of.md">}}) sync process. The BDB `crdt_sync` field has a similar purpose for the Redis CRDB.

Possible BDB sync values:

| Status | Description | Possible next status |
|--------|-------------|----------------------|
| 'disabled' | (default value) Disables the sync process and represents that no sync is currently configured or running. | 'enabled' |
| 'enabled' | Enables the sync process and represents that the process is currently active. | 'stopped' <br />'paused' |
| 'paused' | Pauses the sync process. The process is configured but is not currently executing any sync commands. | 'enabled' <br />'stopped' |
| 'stopped' | An unrecoverable error occurred during the sync process, which caused the system to stop the sync. | 'enabled' |

![BDB sync](/images/rs/rest-api-bdb-sync.png#no-click "BDB sync")

When the sync is in the 'stopped' or 'paused' state, then the `last_error` field in the relevant source entry in the `sync_sources` "status" field contains the detailed error message.
