---
Title: JSON
linkTitle: JSON
description: Redis Stack adds support for JSON to Redis databases.
weight: 30
alwaysopen: false
toc: "true"
categories: ["Modules"]
aliases:
  - /redisjson/
  - /redis-json/
  - /redis_json/
  - /rs/developing/modules/redisjson/
  - /rs/getting-started/creating-database/redisjson-quick-start/
  - /modules/redisjson/redisjson-quickstart/
  - /modules/redisjson/
---

Redis Stack adds support for the [JSON data structure](http://www.json.org/) to Redis databases.

Applications developed with the [open source version of RedisJSON](https://github.com/RedisJSON/RedisJSON) are 100%
compatible with Redis Enterprise databases with JSON enabled.

## JSON paths

[Paths](https://redis.io/docs/stack/json/path) let you traverse the structure of a JSON document, starting from the root, and interact only with the data you want. You can also use paths to perform operations on specific JSON elements.

Since there is no standard for JSON path syntax, Redis Stack implements its own.

### JSONPath syntax

RedisJSON v2.0 and later support the [JSONPath syntax](https://redis.io/docs/stack/json/path/#jsonpath-support), which resembles [Goessner's design](https://goessner.net/articles/JsonPath/):
  
  - Paths start with a dollar sign (`$`), which represents the root of the JSON document.

  - See the [JSONPath syntax table](https://redis.io/docs/stack/json/path/#jsonpath-syntax) to learn how to access various elements within a JSON document.

The following path refers to `headphones`, which is a child of `inventory` under the root:

`$.inventory.headphones`
  
See [JSONPath examples](https://redis.io/docs/stack/json/path/#jsonpath-examples) for examples with more complex syntax.

### Legacy path syntax

The [legacy path syntax](https://redis.io/docs/stack/json/path/#legacy-path-syntax) refers to the path implementation in RedisJSON v1. RedisJSON v2 still supports this legacy path syntax in addition to JSONPath syntax.

The legacy path syntax works as follows:

  - A period character represents the root.
  
  - For paths to the root's children, it is optional to prefix the path with a period.

  - Supports both dot notation and bracket notation for JSON object key access.
  
The following paths refer to `headphones`, which is a child of `inventory` under the root:

`.inventory.headphones`
 
`inventory["headphones"]`

`['inventory']["headphones"]`

### Key name rules

You can only use the [legacy path syntax](#legacy-path-syntax) to access JSON keys if they follow these name syntax rules:

- Key names must begin with a letter, a dollar sign (`$`), or an underscore (`_`).
- Key names can contain letters, digits, dollar signs, and underscores.
- Key names are case-sensitive.

## Index and search JSON documents

You can index, search, and query stored JSON documents.

For more information about how to search and query JSON documents, see the [quick start](https://redis.io/docs/stack/search/indexing_json/).

## JSON in Active-Active databases

RedisJSON v2.2 and later support the JSON data structure as a conflict-free replicated data type [(CRDT)](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) in [Active-Active Redis Enterprise databases]({{<relref "/rs/databases/active-active">}}).

For details about how Redis Enterprise resolves JSON operation conflicts that can arise when replicas attempt to sync, see the JSON [conflict resolution rules]({{<relref "/stack/json/active-active#conflict-resolution-rules">}}).

## More info

- [JSON quick start](https://redis.io/docs/stack/json/#use-redisjson)
- [JSON commands]({{<relref "/stack/json/commands">}})
- [RedisJSON source](https://github.com/RedisJSON/RedisJSON)
