---
Title: Using flushall Command on Redis Enterprise Cloud
description: 
weight: $weight
alwaysopen: false
categories: ["RC"]
---
There are times where you want to delete all database data. In previous
versions of Redis Enterprise Cloud, there was a button to perform this
for you in the web UI. As more and more people use Redis Enterprise
Cloud for their authoritative database, keeping that data safe is even
more critical. So this operation was removed from the web UI so people
did not accidentally hit it.

### flushall for Redis Enterprise Cloud Databases

If you would still like to perform this operation on your database, you
can, but it is from the command line using the redis-cli command or from
your favorite Redis client.

Here is how to do it using redis-cli:

```src
$ redis-cli -h <hostname> -p <portnumber> -a <password> flushall
```

Example:

```src
$ redis-cli -h redis-12345.c24.us-east-mz-1.ec2.cloud.redislabs.com -p 12345 -a xyz flushall
```

Remember that this will delete ALL of the data in the database. This
includes all data in memory and persisted to disk. So before doing
flushall, it is best practice to [backup your
database]({{< relref "/rc/administration/configure/backups.md" >}}) first.

### 
