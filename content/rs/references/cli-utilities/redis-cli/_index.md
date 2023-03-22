---
Title: redis-cli
linkTitle: redis-cli (run Redis commands)
description: Run Redis commands.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

The `redis-cli` command-line utility lets you interact with a Redis database. With `redis-cli`, you can run [Redis commands](https://redis.io/commands/) directly from the command-line terminal or with [interactive mode](#interactive-mode).

If you want to run Redis commands without `redis-cli`, you can [connect to a database with RedisInsight]({{<relref "/ri/using-redisinsight/add-instance">}}) and use the built-in [CLI](https://redis.io/docs/stack/insight/#cli) prompt instead.

## Install `redis-cli`

When you install Redis Enterprise Software or open source Redis, it also installs the `redis-cli` command-line utility.

To learn how to install Redis and `redis-cli`, see the following installation guides:

- [Open source Redis](https://redis.io/docs/getting-started/installation/)

- [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software">}})

- [Redis Enterprise Software with Docker]({{<relref "/rs/installing-upgrading/get-started-docker">}})

## Connect to a database

To run Redis commands with `redis-cli`, you need to connect to your Redis database.

### Connect from a node

If you have SSH access to a node in a Redis cluster, you can run `redis-cli` directly from the node:

1. Use SSH to sign in to a node in the Redis Enterprise cluster.

1. Connect to the database with `redis-cli`:

    ```sh
    $ redis-cli -p <port>
    ```

### Connect remotely

If you have `redis-cli` installed on your local machine, you can use it to connect to a remote Redis database. You will need to provide the database's connection details, such as the hostname or IP address, port, and password.

```sh
$ redis-cli -h <endpoint> -p <port> -a <password>
```

You can also provide the password with the `REDISCLI_AUTH` environment variable instead of the `-a` option:

```sh
$ export REDISCLI_AUTH=<password>
$ redis-cli -h <endpoint> -p <port>
```

### Connect with Docker

If your Redis database runs in a Docker container, you can use `docker exec` to run `redis-cli` commands:

```sh
$ docker exec -it <Redis container name> redis-cli -p <port>
```

## Basic use

You can run `redis-cli` commands directly from the command-line terminal:

```sh
$ redis-cli -p <port> <Redis command>
```

For example, you can use `redis-cli` to test your database connection and store a new Redis string in the database:

```sh
$ redis-cli -p 12000 PING
PONG
$ redis-cli -p 12000 SET mykey "Hello world"
OK
$ redis-cli -p 12000 GET mykey              
"Hello world"
```

For more information, see [Command line usage](https://redis.io/docs/manual/cli/#command-line-usage).

## Interactive mode

In `redis-cli` [interactive mode](https://redis.io/docs/manual/cli/#interactive-mode), you can:

- Run any `redis-cli` command without prefacing it with `redis-cli`.
- Enter `?` for more information about how to use the `HELP` command and [set `redis-cli` preferences](https://redis.io/docs/manual/cli/#preferences).
- Enter [`HELP`](https://redis.io/docs/manual/cli/#showing-help-about-redis-commands) followed by the name of a command for more information about the command and its options.
- Press the `Tab` key for command completion.
- Enter `exit` or `quit` or press `Control+D` to exit interactive mode and return to the terminal prompt.

This example shows how to start interactive mode and run Redis commands:

```sh
$ redis-cli -p 12000
127.0.0.1:12000> PING
PONG
127.0.0.1:12000> SET mykey "Hello world"
OK
127.0.0.1:12000> GET mykey
"Hello world"
```

## More info

- [Redis CLI documentation](https://redis.io/docs/manual/cli/)
- [Redis commands reference](https://redis.io/commands/)
