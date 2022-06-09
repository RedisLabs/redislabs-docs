---
Title: Register events
linkTitle: Register events
description: Register RedisGears functions to run when certain events occur in a Redis database.
weight: 80
toc: "true"
alwaysopen: false
categories: ["Modules"]
---

You can register RedisGears functions to [run when certain events occur](https://oss.redis.com/redisgears/intro.html#event-processing) in a Redis database.

## Register on events

To register RedisGears functions to run on an event, your code needs to:

1. Pass `KeysReader` to a `GearsBuilder` object.

1. Call the `GearsBuilder.register()` function.

1. Pass the `eventTypes` parameter to either:

    - The `register` function for Python.
    
    - The `KeysReader` object for Java.

For more information and examples of event registration, see:

- Python references:

    - [`KeysReader`](https://oss.redis.com/redisgears/readers.html#keysreader)

    - [`GearsBuilder.register()`](https://oss.redis.com/redisgears/functions.html#register)

- Java references:

    - [`KeysReader`]({{<relref "/modules/redisgears/jvm/classes/readers/keysreader">}})

    - [`GearsBuilder.register()`]({{<relref "/modules/redisgears/jvm/classes/gearsbuilder/register">}})

## Event types

For the list of event types you can register on, see the [Redis keyspace notification documentation](https://redis.io/docs/manual/keyspace-notifications/#events-generated-by-different-commands).

## Active-Active event types

In addition to standard Redis [events](https://redis.io/docs/manual/keyspace-notifications/#events-generated-by-different-commands), [Redis Enterprise Active-Active databases]({{<relref "/rs/databases/active-active">}}) also support the registration of RedisGears functions for the following event types:

- `change` for key change events in an Active-Active database.