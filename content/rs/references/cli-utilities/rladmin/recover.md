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

None

### Returns

Displays a list of all recoverable databases. If no databases are in recovery mode, returns `No recoverable databases found`.

### Example

```sh
$ rladmin recover list
DATABASES IN RECOVERY STATE:
DB:ID  NAME  TYPE   SHARDS  REPLICATION  PERSISTENCE  STATUS
db:5   tr01  redis  1       enabled      aof          missing-files
db:6   tr02  redis  4       enabled      snapshot     ready
```

## `recover s3_import`

Imports current database snapshot files from an AWS S3 bucket to a directory on the node.

```sh
$ rladmin recover s3_import
                  s3_bucket <bucket name>
                  [ s3_prefix <prefix> ]
                  s3_access_key_id <access key>
                  s3_secret_access_key <secret access key>
                  local_path <path>
```

### Parameters

| Parameters           | Type/Value | Description                                                      |
|----------------------|------------|------------------------------------------------------------------|
| s3_bucket            | string     | S3 bucket name                                                   |
| s3_prefix            | string     | S3 object prefix                                                 |
| s3_access_key_id     | string     | S3 access key ID                                                 |
| s3_secret_access_key | string     | S3 secret access key                                             |
| local_path           | filepath   | Local import path where all database snapshots will be imported  |

### Returns

Returns `Completed successfully` if the database files were imported. Otherwise, returns an error.
