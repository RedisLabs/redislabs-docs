---
Title: Flushing Databases on Redis Cloud Essentials
description: 
weight: $weight
alwaysopen: false
categories: ["RC"]
---
There are times where you want to delete all database data.

{{% warning title="Data Loss Warning" %}} The flush command deletes ALL of the data in the database. This
includes all data in memory and persisted to disk. We recommend that you
[backup your database]({{< relref "/rc/administration/configure/backups.md" >}}) first.{{% /warning %}}

### flushall for Redis Cloud Essentials Databases

You can flush a database from the command line with the redis-cli command or with
your favorite Redis client.

Here is how to do it using redis-cli:

```src
$ redis-cli -h <hostname> -p <portnumber> -a <password> flushall
```

Example:

```src
$ redis-cli -h redis-12345.c24.us-east-mz-1.ec2.cloud.redislabs.com -p 12345 -a xyz flushall
```
