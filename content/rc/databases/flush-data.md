---
Title: Flush data
description:
weight: 35
alwaysopen: false
categories: ["RC"]
aliases: /rc/how-to/all-memcached-cloud/
         /rc/how-to/all-memcached-cloud.md
         
---

The [FLUSHALL](https://redis.io/commands/flushall) command provides a fast way to remove all data from a database.

{{< note >}}
When you _flush_ a database, you remove all data.  This is a prerequisite to deleting a database.<br/><br/>

This _permanently_ removes all data from the database.  The data cannot be recovered, except by restoring from earlier backups.<br/><br/>

We _strongly_ recommend backing up databases before flushing them.
{{</note>}}

## How to use FLUSHALL

To use it, connect your database and then issue the command.  

There are several ways to do this, depending on your circumstances and environment.

The following sections provide some options:

- [The Redis-CLI utility]({{<relref "rc/databases/flush-data#the-redis-cli-utility">}})
- [RedisInsight CLI]({{<relref "rc/databases/flush-data#redisinsight-cli">}})
- [The netcat utility]({{<relref "rc/databases/flush-data#the-netcat-utility">}})
- [SASL connection]({{<relref "rc/databases/flush-data#sasl-connection">}})

### The Redis-CLI utility

To use the `redis-cli` utility:

```sh
redis-cli -h <hostname> -p <portnumber> -a <password> flushall
```

Example:

```sh
redis-cli -h redis-12345.server.cloud.redislabs.example.com -p 12345 -a xyz flushall
```

### RedisInsight CLI

If you've installed [RedisInsight]({{<relref "/ri/">}}) and [added your database]({{<relref "rc/rc-quickstart/#using-redisinsight">}}), you can use the RedisInsight command-line interface (CLI) to issue commands:

1.  Start RedisInsight and connect to your database.

2.  From the RedisInsight menu, select **CLI** and wait for the client to connect to your database.

3.  In the command area, enter `flushall` and then press _Enter_.

    {{<image filename="images/rc/redisinsight-cli-flushall-example.png" alt="You can use RedisInsight to issue commands to a database." >}}{{< /image >}}

    The 'OK' response indicates that the command executed properly.

### The netcat utility 

If you have shell access to the server hosting your database, you can use the [netcat](https://en.wikipedia.org/wiki/Netcat) (`nc`) to send the `flush_all` command to your database:

```sh
echo "flush_all" | nc redis-12345.server.cloud.redislabs.example.com 12345
```

### SASL connection

If you do not have permission to access the command shell of the server hosting your database or are unable to use RedisInsight, but you have connection credentials and your database supports [Simple Authentication and Security Layer](https://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer) connections, you can use an SASL-enabled command-line client.

For example, suppose you're using Memcached Enterprise Cloud and that your database has SASL enabled. In this case, you can can use the [bmemcached-CLI](https://github.com/RedisLabs/bmemcached-cli) client to connect and issue commands to your database.

Setup instructions vary according to the environment.  Many Linux systems, such as Ubuntu, follow this process:

```sh
$ wget https://github.com/RedisLabs/bmemcached-cli/archive/master.zip
$ sudo apt-get install unzip python-pip
$ unzip master.zip -d bmemcached-cli
$ cd bmemcached-cli/bmemcached-cli-master/
$ sudo pip install --upgrade pip
$ sudo pip install . -r requirements.pip
```

Adjust as needed for your operating system and configuration.

When the client is properly installed, you can use it to run the `flush_all` command:

```sh
bmemcached-cli [user]:[password]@[host]:[port]
```

Here's an example:

```sh
$ bmemcached-cli username:password@redis-12345.server.cloud.redislabs.example.com:12345
([B]memcached) flush_all
True
exit
```