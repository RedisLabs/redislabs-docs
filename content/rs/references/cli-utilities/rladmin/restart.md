---
Title: rladmin restart
linkTitle: restart
description: Restarts the Redis software instance for a specific database.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin restart` restarts the Redis software in use by a specific database
instance by scheduling a restart of the primary and replica processes.

``` sh
rladmin restart db { db:id | name }
        [preserve_roles]
        [discard_data]
        [force_discard]
```

### Parameters

| Parameter      | Type/Value                     | Description                                                           |
|----------------|--------------------------------|-----------------------------------------------------------------------|
| db             | db:\<id\><br /> name           | Restarts the Redis Software for the specified database                |
| discard_data   |                                | Allows discarding data if there is no persistence or replication      |
| force_discard  |                                | Forcibly discards data even if there is persistence or replication    |
| preserve_roles |                                | Performs an additional failover to maintain shard roles               |

### Returns

`Done` if the restart completed successfully, `ERROR` otherwise.

### Example

``` sh
$ rladmin restart db db:5 preserve_roles
Monitoring 1db07491-35da-4bb6-9bc1-56949f4c312a
active - SMUpgradeBDB init
active - SMUpgradeBDB stop_forwarding
active - SMUpgradeBDB stop_active_expire
active - SMUpgradeBDB check_slave
oactive - SMUpgradeBDB stop_active_expire
active - SMUpgradeBDB second_failover
completed - SMUpgradeBDB
Done
```
