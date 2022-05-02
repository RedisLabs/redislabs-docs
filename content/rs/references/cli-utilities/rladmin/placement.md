---
Title: rladmin placement
linkTitle: placement
description: Configures shard placement policy for a given database.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin placement` configures the shard placement policy for a specified database.

``` sh
rladmin placement
        db { db:<id> | <name> }
        { dense | sparse }
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| db        | db:\<id\><br /> name           | Configures shard placement for the specified database                                         |
| dense     |                                | Places new shards on the same node as long as it has resources                                |
| sparse    |                                | Places new shards on the maximum number of available nodes within the cluster                 |

### Returns

Returns the new shard placement policy if the policy was changed successfully, `ERROR` otherwise.

Use [`rladmin status databses`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-databases">}}) to verify the failover completed.

### Example

``` sh
$ rladmin status databases
DATABASES:
DB:ID  NAME       TYPE   STATUS   SHARDS   PLACEMENT    REPLICATION    PERSISTENCE    ENDPOINT                                
db:5   tr01       redis  active   1        dense        enabled        aof            redis-12000.cluster.local:12000         
$ rladmin placement db db:5 sparse
Shards placement policy is now sparse
$ rladmin status databases
DATABASES:
DB:ID  NAME       TYPE   STATUS   SHARDS   PLACEMENT    REPLICATION    PERSISTENCE    ENDPOINT                                
db:5   tr01       redis  active   1        sparse       enabled        aof            redis-12000.cluster.local:12000         
```
