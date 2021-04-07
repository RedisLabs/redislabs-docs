---
Title: Flushing Databases
description:
weight: $weight
alwaysopen: false
categories: ["RC"]
---
There are times where you want to delete all database data.

{{% warning title="Data Loss Warning" %}}
The flush command deletes ALL of the data in the database.
This includes all data in memory and persisted to disk.
We recommend that you [backup your database]({{< relref "/rc/databases/back-up-data.md" >}}) before you flush the data.
{{< /warning >}}

## flushall for Redis Cloud databases

You can flush a database from the command line with the redis-cli command or with your Redis client.

To flush database data from the redis-cli, run:

```sh
redis-cli -h <hostname> -p <portnumber> -a <password> flushall
```

Example:

```sh
redis-cli -h redis-12345.c24.us-east-mz-1.ec2.cloud.redislabs.com -p 12345 -a xyz flushall
```
