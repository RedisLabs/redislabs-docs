---
Title: RedisJSON quick start tutorial
linkTitle: Quick start
description:
weight: 20
alwaysopen: false
categories: ["Modules"]
aliases: /rs/getting-started/creating-database/redisjson-quick-start/
---
For this quick start tutorial, you need:

- Either:
    - A Redis Cloud database [with the RedisJSON module]({{< relref "/rc/databases/create-database.md" >}})

        You can [set up a free Redis Cloud database]({{< relref "/modules/modules-quickstart.md" >}}) to see the module in action.
    - A Redis Enterprise Software database [with the RedisJSON module]({{< relref "/modules/add-module-to-database.md" >}})
- redis-cli with connectivity to a redis database

## Quick start with redis-cli

These examples use redis-cli as the Redis client to show how easy
it is. The first RedisJSON command to try out is JSON.SET, which sets a
Redis key with a JSON value. All JSON values can be used, for example a
string:

Connect to redis using --raw to maintain file formatting.

```sh
$ redis-cli --raw -p 12543
127.0.0.1:12543>
```

Run these commands:

Add a simple document

```sh
127.0.0.1:12543> JSON.SET foo . '{"foo" : "bar"}'
OK
```

Read back the only entity with a get

```sh
127.0.0.1:12543> JSON.GET foo
{"foo":"bar"}
```

Check what type foo is

```sh
127.0.0.1:12543> JSON.TYPE foo .
object
```

See what type of entity the foo entity is in the foo document.

```sh
127.0.0.1:12543> JSON.TYPE foo .foo
string
```

Now that we have a minimal JSON document. Add some more data to it. The
great thing is, we do not need the entire document, we only write what
needs to change. Add an entity into the document called test with a
integer value of 1.

```sh
127.0.0.1:12543> JSON.SET foo .test 1
OK
```

Next increment that value by 2 and this returns the updated value.

```sh
127.0.0.1:12543> JSON.NUMINCRBY foo .test 2
3
```

Now create a new document, add another document to it, and then add
another name/value pair to that sub-document.

```sh
127.0.0.1:12543> JSON.SET foo . '{"foo":"bar"}'
OK
```

Add the test entity with a JSON document

```sh
127.0.0.1:12543> JSON.SET foo .test '{"test2":true}'
OK
127.0.0.1:12543> JSON.GET foo
{"foo":"bar","test":{"test2":true}}
```

Add another entity to the test document

```sh
127.0.0.1:12543> JSON.SET foo .test.test3 '"test"'
OK
127.0.0.1:12543> JSON.GET foo
{"foo":"bar","test":{"test2":true,"test3":"test"}}
```
