---
Title: BDB replica sources status field
linkTitle: replica_sources status
description: Documents the bdb replica_sources status field used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

The `replica_sources` status field relates to the [Replica Of]({{<relref "/rs/administering/creating-databases/create-active-passive">}}) feature, which enables the creation of a Redis database (single- or multi-shard) that synchronizes data from another Redis database (single- or multi-shard).

The status field represents the Replica Of sync process status for a specific sync source.

Possible status values:

| Status | Description | Possible next status |
|--------|-------------|----------------------|
| 'out-of-sync' | Sync process is disconnected from source and trying to reconnect | 'syncing' |
| 'syncing' | Sync process is in progress | 'in-sync' <br />'out-of-sync' |
| 'in-sync' | Sync process finished successfully, and new commands are syncing on a regular basis | 'syncing' <br />'out-of-sync'

![Replica sources status](/images/rs/rest-api-replica-sources-status.png#no-click "Replica sources status")
