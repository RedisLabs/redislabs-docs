---
Title: rladmin recover
linkTitle: recover
description: Recovers databases in recovery mode.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

Recovers databases in recovery mode.

## `recover all`

Recovers all databases in recovery mode.

```sh
rladmin recover all
            [ only_configuration ]
```

### Parameters

| Parameters         | Type/Value | Description                                 |
|--------------------|------------|---------------------------------------------|
| only_configuration |            | Recover database configuration without data |

### Returns

Returns `Completed successfully` if the database was recovered. Otherwise, returns an error.

## `recover db`

Recovers a specific database in recovery mode.

```sh
rladmin recover db { db:<id> | <name> }
                     [ only_configuration ]
```

### Parameters

| Parameters         | Type/Value           | Description                                 |
|--------------------|----------------------|---------------------------------------------|
| db                 | db:\<id\> <br />name | Database to recover                         |
| only_configuration |                      | Recover database configuration without data |

### Returns

Returns `Completed successfully` if the database was recovered. Otherwise, returns an error.

## `recover list`

Shows a list of all databases that are currently in recovery mode.

```sh
rladmin recover list
```

### Parameters

None.

### Returns

Displays a list of all recoverable databases. If no databases are in recovery mode, prints `No recoverable databases found`.

### Example

```sh
$ rladmin recover list
DATABASES IN RECOVERY STATE:
DB:ID  NAME  TYPE   SHARDS  REPLICATION  PERSISTENCE  STATUS
db:5   tr01  redis  1       enabled      aof          missing-files
db:6   tr02  redis  4       enabled      snapshot     ready
```
