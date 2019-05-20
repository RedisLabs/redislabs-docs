---
Title: ReJSON Quick Start Tutorial
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
For this quick start, you will need the following:

- [A Redis Enterprise Software cluster with set up already
    complete]({{< relref "/rs/getting-started/quick-setup.md" >}})
- Any redis-cli or ReJSON enabled client

### Create a new database that uses the Module

1. Navigate to **databases** tab
1. Click on the **+** sign, if necessary, then **create database**
1. On the create database screen, check the box for Redis Modules and
    select the module you want to use for this database.

    ![select_module](/images/rs/select_module.png?width=794&height=554)
1. Click **Show advanced options** and put **12543** for the port.
1. Click the **Activate** button

## Quick start with redis-cli

These examples will use redis-cli as the Redis client to show how easy
it is. The first ReJSON command to try out is JSON.SET, which sets a
Redis key with a JSON value. All JSON values can be used, for example a
string:

Connect to redis using --raw so we can read the json correctly.
Otherwise the quotes are "escaped" and formatting is not ideal.

```src
$ redis-cli --raw -p 12543
127.0.0.1:12543>
```

Add a simple document

```src
127.0.0.1:12543> JSON.SET foo . '{"foo" : "bar"}'
OK
```

Read back the only entity with a get

```src
127.0.0.1:12543> JSON.GET foo
{"foo":"bar"}
```

Check what type foo is

```src
127.0.0.1:12543> JSON.TYPE foo .
object
```

See what type of entity the foo entity is in the foo document.

```src
127.0.0.1:12543> JSON.TYPE foo .foo
string
```

Now that we have a minimal JSON document. Add some more data to it. The
great thing is, we do not need the entire document, we only write what
needs to change. Add an entity into the document called test with a
integer value of 1.

```src
127.0.0.1:12543> JSON.SET foo .test 1
OK
```

Next increment that value by 2 and this returns the updated value.

```src
127.0.0.1:12543> JSON.NUMINCRBY foo .test 2
3
```

Now create a new document, add another document to it, and then add
another name/value pair to that sub-document.

```src
127.0.0.1:12543> JSON.SET foo . '{"foo":"bar"}'
OK
```

Add the test entity with a JSON document

```src
127.0.0.1:12543> JSON.SET foo .test '{"test2":true}'
OK
127.0.0.1:12543> JSON.GET foo
{"foo":"bar","test":{"test2":true}}
```

Add another entity to the test document

```src
127.0.0.1:12543> JSON.SET foo .test.test3 '"test"'
OK
127.0.0.1:12543> JSON.GET foo
{"foo":"bar","test":{"test2":true,"test3":"test"}}
```
