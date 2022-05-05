---
Title: RedisJSON quick start tutorial
linkTitle: Quick start
description:
weight: 20
alwaysopen: false
categories: ["Modules"]
aliases: /rs/getting-started/creating-database/redisjson-quick-start/
---

## Prerequisites

For this quick start tutorial, you need:

- A Redis database with the RedisJSON module enabled. You can use either:
    - A [Redis Cloud]({{<relref "/modules/modules-quickstart.md">}}) database

    - A [Redis Enterprise Software]({{<relref "/modules/install/add-module-to-database">}}) database

- redis-cli command line tool

- [redis-py](https://github.com/redis/redis-py) client library v4.0.0 or greater

## RedisJSON with redis-cli

The `redis-cli` command line tool comes packaged with Redis. You can you it to connect to your Redis database and test the following RedisJSON commands.

### Connect to a database

```sh
$ redis-cli -h <endpoint> -p <port> -a <password> --raw
127.0.0.1:12543>
```

The `--raw` option maintains the format of the database response.

### Create and Read a JSON document

Use the `JSON.SET` command to set a Redis key with a JSON value. A key can contain any valid JSON value, including scalars, objects, and arrays.

Set the key `test-obj` to a simple JSON object. The second argument in `JSON.SET` is the path in the JSON object. The `$` or `.` character is the "root" of the JSON object. All new keys must have either `$` or `.` as the path.

```sh
127.0.0.1:12543> JSON.SET test-obj $ '{"foo" : "bar"}'
OK
```

Use `JSON.GET` to read the JSON object from the database:

```sh
127.0.0.1:12543> JSON.GET test-obj .
{"foo":"bar"}
```

Use `JSON.TYPE` to check the JSON type of the value.

```sh
127.0.0.1:12543> JSON.TYPE test-obj
object
```

You can also use `JSON.GET` to read a single entity from the JSON object, and use `JSON.TYPE` to check the JSON type of the entity.

```sh
127.0.0.1:12543> JSON.GET test-obj .foo
"bar"
127.0.0.1:12543> JSON.TYPE test-obj .foo
string
```

### Update a JSON document

Now that you have a JSON object, use `JSON.SET` to add an entity to it. You can add any JSON entity type to a JSON object with `JSON.SET`.

```sh
127.0.0.1:12543> JSON.SET test-obj .count 1
OK
127.0.0.1:12543> JSON.GET test-obj
{"foo":"bar","count":1}
127.0.0.1:12543> JSON.SET test-obj .array "[ { \"id\":\"num0\", \"value\":3 }, { \"id\":\"num1\", \"value\":5 } ]"
OK
127.0.0.1:12543> JSON.GET test-obj .array
[{"id":"num0","value":3},{"id":"num1","value":5}]
```

Use `JSON.NUMINCRBY` to increment an integer entity by a specified value. This returns the new value of the entity.

```sh
127.0.0.1:12543> JSON.NUMINCRBY test-obj .count 3
4
127.0.0.1:12543> JSON.NUMINCRBY test-obj .array[1].value 1
6
127.0.0.1:12543> JSON.GET test-obj
{"foo":"bar","count":4,"array":[{"id":"num0","value":3},{"id":"num1","value":6}]}
```

Use `JSON.DEL` to delete parts of the JSON document.

```sh
127.0.0.1:12543> JSON.DEL test-obj .array
1
127.0.0.1:12543> JSON.GET test-obj
{"foo":"bar","count":4}
```

## RedisJSON with Python

If you want to use RediSearch within an application, you can use one of these [client libraries](https://redis.io/docs/stack/json/clients/).

The following example uses the Redis Python client library [redis-py](https://github.com/redis/redis-py), which supports RedisJSON commands as of v4.0.0.

This Python code creates a JSON document in Redis, adds and updates information to the JSON document, and then deletes the document.
