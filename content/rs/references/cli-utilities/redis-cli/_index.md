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

If you do not have access to `redis-cli`, the [RedisInsight CLI](https://redis.io/docs/stack/insight/#cli) is another option that lets you run Redis commands against a [connected database]({{<relref "/ri/using-redisinsight/add-instance">}}).

## Install `redis-cli`

When you install Redis Enterprise Software or open source Redis, it also installs the `redis-cli` command-line utility.

To learn how to install Redis and `redis-cli`, see the following installation guides:

- [Open source Redis](https://redis.io/docs/getting-started/installation/)

- [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software">}})

- [Redis Enterprise Software with Docker]({{<relref "/rs/installing-upgrading/get-started-docker">}})

## Connect to a database

Before you can run Redis commands, you need to use `redis-cli` to connect to your Redis database.

### Connect from a node

1. Use SSH to sign in to a node in your Redis Enterprise cluster.

1. Start a `redis-cli` interactive session:

    ```sh
    $ redis-cli -p <port>
    ```

### Connect remotely

Connect to a Redis database with `redis-cli`:

```sh
$ redis-cli -h <endpoint> -p <port> -a <password>
```

You can also set the password with the `REDISCLI_AUTH` environment variable instead of providing the password with the `-a` option.

### Connect with Docker

If you run Redis in Docker, you can [run `redis-cli` with `docker exec`](https://redis.io/docs/stack/get-started/install/docker/#connect-with-redis-cli).

## Basic use

Run `redis-cli` commands directly from the command-line terminal:

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
- Enter [`HELP`](https://redis.io/docs/manual/cli/#showing-help-about-redis-commands) followed by the name of a command for a detailed explanation of the command and its usage.
- Press the `Tab` key for command completion.
- Enter `exit` or `quit` or press `Control+D` to exit interactive mode and return to the terminal prompt.

Activate [interactive mode](#interactive-mode) and run commands:

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
- [Commands reference](https://redis.io/commands/)
