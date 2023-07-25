---
Title: Manage Auto Tiering storage engine
linkTitle: Manage storage engine
description: Manage the storage engine used for your database with auto tiering enabled. 
weight: 100
alwaysopen: false
categories: ["RS"]
aliases: /rs/databases/auto-tiering/storage-engine.md
---

## Manage the storage engine

Redis Enterprise Auto Tiering supports two storage engines:

* [Speedb](https://www.speedb.io/) (default, recommended)
* [RocksDB](https://rocksdb.org/)

{{<note>}}Switching between the two storage engines requires guidance by Redis Support or your Account Manager.{{</note>}}

### Change the storage engine

1. Change the cluster level configuration for default storage engine.
     ``` sh
     curl -k -u <username>:<password> -X PUT -H "Content-Type: application/json" -d '{"bigstore_driver":"speedb"}' https://localhost:9443/v1/cluster
     ```

     ```sh
     rladmin cluster config bigstore_driver {speedb | rocksdb}
     ```

1. One by one, per each database on the cluster, restart the database.

     ```sh
     rladmin restart db { db:<id> | <name> }
     ```

{{<note>}} We recommend restarting your database at times with low usage and avoiding peak hours. For databases without persistence enabled, we also recommend using export to backup your database first.{{</note>}}

## Monitor the storage engine

To get the current cluster level default storage engine run:

* Use the `rladmin info cluster` command look for ‘bigstore_driver’.

* Using the REST API:

     ```sh
     curl -k -u <username>:<password> -X GET -H "Content-Type: application/json" https://localhost:9443/v1/cluster
     ```

Versions of Redis Enterprise 7.2 and later provide a metric called `bdb_bigstore_shard_count` to help track the shard count per database, filtered by `bdb_id` and by storage engine.

See examples:

  ```sh
  bdb_bigstore_shard_count{bdb="1",cluster="mycluster.local",driver="rocksdb"} 1.0
  bdb_bigstore_shard_count{bdb="1",cluster="mycluster.local",driver="speedb"} 2.0
  ```

For more about metrics for Redis Enterprise’s integration with Prometheus, see [Prometheus integration]({{<relref "/clusters/monitoring/prometheus-metrics-definitions/">}}).
