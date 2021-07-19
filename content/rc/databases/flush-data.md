---
Title: Flush data
description:
weight: 80
alwaysopen: false
categories: ["RC"]
aliases: /rc/how-to/all-memcached-cloud/
         /rc/how-to/all-memcached-cloud.md
         
---

When you _flush_ a database, you remove all data.  This is a prerequisite to deleting a database.

This _permanently_ removes all data from the database.  The data cannot be recovered, except by restoring from earlier backups.

We _strongly_ recommend backing up databases before flushing them.

## Use Redis-CLI to flush data

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

## Memcached Enterprise cloud subscriptions

If you're using Memcached Enterprise Cloud subscription, you likely cannot use the `nc` command or the `flush_all` command.

If your resource has SASL enabled, you can use a command-line interface that supports SASL.  We recommend [bmemcached-CLI](https://github.com/RedisLabs/bmemcached-cli) client.

The following instructions assume you're using Ubuntu Linux.  Adjust as needed for your operating system.

```sh
$ wget https://github.com/RedisLabs/bmemcached-cli/archive/master.zip
$ sudo apt-get install unzip python-pip
$ unzip master.zip -d bmemcached-cli
$ cd bmemcached-cli/bmemcached-cli-master/
$ sudo pip install --upgrade pip
$ sudo pip install . -r requirements.pip
```

When the client is properly installed, you can use it to run the `flush_all command`:

```sh
bmemcached-cli [user]:[password]@[host]:[port]
```

Here's an example:

```sh
$ bmemcached-cli memcached-app123:x298k37@pub-memcache-1010.us-east-1-3.4.ec2.garantiadata.com:1010
([B]memcached) flush_all
True
exit
```