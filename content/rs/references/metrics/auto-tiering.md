---
Title: Auto Tiering Metrics
linkTitle: Auto Tiering
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: {
    /rs/references/metrics/redis-on-flash/,
    /rs/references/metrics/auto-tiering/,
    
}
---

These metrics are additional metrics for [Auto Tiering ]({{< relref "/rs/databases/auto-tiering" >}}) databases.

#### % Values in RAM

Percent of keys whose values are stored in RAM.

**Components measured**: Database and Shard

#### Values in flash

Number of keys with values stored in flash, not including [replication]({{< relref "/rs/databases/durability-ha/replication" >}}).

**Components measured**: Database and Shard

#### Values in RAM

Number of keys with values stored in RAM, not including [replication]({{< relref "/rs/databases/durability-ha/replication" >}}).

**Components measured**: Database and Shard 

#### Flash key-value operations

Number of operations on flash key values (read + write + del) per second.

**Components measured**: Node

#### Flash bytes/sec

Number of total bytes read and written per second on flash memory.

**Components measured**: Cluster, Node, Database, and Shard

#### Flash I/O operations/sec

Number of input/output operations per second on the flash storage device.

**Components measured**: Cluster and Node

#### RAM:Flash access ratio

Ratio between logical Redis key value operations and actual flash key value operations.

**Components measured**: Database and Shard

#### RAM hit ratio

Ratio of requests processed directly from RAM to total number of requests processed.

**Components measured**: Database and Shard

#### Used flash

Total amount of memory used to store values in flash.

**Components measured**: Database and Shard

#### Free flash

Amount of free space on flash storage. 

**Components measured**: Cluster and Node

#### Flash fragmentation

Ratio between the used logical flash memory and the physical flash memory that is used.

**Components measured**: Database and Shard

#### Used RAM

Total size of data stored in RAM, including keys, values, overheads, and [replication]({{< relref "/rs/databases/durability-ha/replication" >}}) (if enabled).

**Components measured**: Database and Shard

#### RAM dataset overhead

Percentage of the [RAM limit](#ram-limit) that is used for anything other than values, such as key names, dictionaries, and other overheads.

**Components measured**: Database and Shard

#### RAM limit

Maximum amount of RAM that can be used in bytes.

**Components measured**: Database

#### RAM usage

Percentage of the [RAM limit](#ram-limit) used.

**Components measured**: Database

#### Storage engine usage

Total count of shards used, filtered by the sorage engine (Speedb / RockSB) per given database.

**Components measured**: Database, Shards



#### Calculated metrics

These RoF statistics can be calculated from other metrics.

- RoF average key size with overhead

    ([ram_dataset_overhead](#ram-dataset-overhead) * [used_ram](#used-ram))
                    / ([total_keys]({{< relref "/rs/references/metrics/database-operations#total-keys" >}}) * 2)

- RoF average value size in RAM

    ((1 - [ram_dataset_overhead](#ram-dataset-overhead)) * [used_ram](#used-ram)) / ([values_in_ram](#values-in-ram) * 2)

- RoF average value size in flash

    [used_flash](#used-flash) / [values_in_flash](#values-in-flash)    
