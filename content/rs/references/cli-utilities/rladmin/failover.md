---
Title: rladmin failover
linkTitle: failover
description: Fail over primary shards of a database to their replicas
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

Fails over one or more primary (also known as master) shards of a database, promoting their respective replicas to primary shards.

``` sh
rladmin failover
        [db { db:<id> | <name> }]
        shard <id1 ... idN>
        [immediate]
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| db        | db:\<id\><br /> name           | Fail over shards for the specified database                                                   |
| shard     | one or more primary shard IDs  | Primary shard or shards to fail over                                                          |
| immediate |                                | Perform failover without verifying the replica shards are in full sync with the master shards |

### Returns

`Finished successfully` if failover was completed, `ERROR` otherwise.

Use [`rladmin status shards`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-shards">}}) to verify the failover completed.

### Example

``` sh
$ rladmin status shards
SHARDS:
DB:ID  NAME        ID         NODE     ROLE     SLOTS     USED_MEMORY    STATUS
db:5   tr01        redis:12   node:1   slave    0-16383   3.02MB         OK     
db:5   tr01        redis:13   node:2   master   0-16383   3.09MB         OK     
$ rladmin failover shard 13
Executing shard fail-over: OOO.
Finished successfully
$ rladmin status shards
SHARDS:
DB:ID  NAME        ID         NODE     ROLE     SLOTS     USED_MEMORY    STATUS
db:5   tr01        redis:12   node:1   master   0-16383   3.12MB         OK     
db:5   tr01        redis:13   node:2   slave    0-16383   2.99MB         OK
```
