---
Title: Flush data
description:
weight: 80
alwaysopen: false
categories: ["RC"]
---

When you _flush_ a database, you remove all data.  This is a pre-requisite to deleting a database.

As you might expect, flushing a database _permanently_ removes all data.  The data cannot be recovered, except from backups made before flushing.

Consequently, we _strongly_ recommend backing up databases before flushing them.

## Use Redis-CLI to flus data

To flush data from a database:

1.  Connect to the database with Redis CLI.

2.  Use the [FLUSHALL](https://redis.io/commands/flushall) command:

```sh
redis-cli -h <hostname> -p <portnumber> -a <password> flushall
```

Example:

```sh
redis-cli -h redis-12345.c24.us-east-mz-1.ec2.cloud.redislabs.com -p 12345 -a xyz flushall
```
