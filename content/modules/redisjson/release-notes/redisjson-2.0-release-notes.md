---
Title: RedisJSON 2.0 release notes
linkTitle: v2.0 (November 2021)
description: Index JSON documents. JSONPath support. Commands operate on multiple paths.
min-version-db: "6.0"
min-version-rs: "6.0"
weight: 99
alwaysopen: false
categories: ["Modules"]
---
## Requirements

RedisJSON v2.0.5 requires:

- Minimum Redis compatibility version (database): 6.0
- Minimum Redis Enterprise Software version (cluster): 6.0

## v2.0.5 (December 2021)

This is a maintenance release for RedisJSON 2.0.

Details:

- Bug fixes:
  - #[553](https://github.com/RedisJSON/RedisJSON/pull/553) Return an empty array on a nonexistent path
  - #[548](https://github.com/RedisJSON/RedisJSON/pull/548) Align error handling behavior
  - #[546](https://github.com/RedisJSON/RedisJSON/pull/546) #[545](https://github.com/RedisJSON/RedisJSON/pull/545) Fix key location in `JSON.DEBUG MEMORY`

## v2.0.4 (November 2021)

This is the General Availability release of RedisJSON 2.0.

### Headlines

RedisJSON is a [high-performance JSON document store](https://redis.com/blog/redisjson-public-preview-performance-benchmarking/) that allows developers to build modern applications. It stores and processes JSON in-memory, supporting millions of operations per second with sub-millisecond response times. The combination of `RediSearch`, native indexing, querying, and full-text search of JSON documents allows developers to create secondary indexes and query data at lightning speed.

#### Indexing JSON documents

Using [RediSearch](https://redisearch.io), it is now possible to [index, query, and search JSON documents](https://oss.redis.com/redisearch/master/Indexing_JSON/), gaining full-text search capabilities and document retrieving based on their content.

To do so, you must install both modules, `RedisJSON` and `RediSearch`, on the same database.

#### Support of JSON Path

The commands [support JSONPath](https://oss.redis.com/redisjson/2.0/path/#jsonpath-support-redisjson-v2) as specified in the [original specifications](https://goessner.net/articles/JsonPath).

The legacy path syntax is still supported.

#### Commands operate on multiple paths

A `JSONPath` query may resolve to several paths. Every [command](https://oss.redis.com/redisjson/commands/) supports multiple paths and applies the operation to all the encountered paths.

Notice that the output of the commands evolved to provide multiple results according to the number of paths impacted. 

### Details

- Enhancements
  - #[477](https://github.com/RedisJSON/RedisJSON/pull/477) Support of Multipath
  - #[336](https://github.com/RedisJSON/RedisJSON/pull/336) Added generic JSON path implementation 
  - #[525](https://github.com/RedisJSON/RedisJSON/pull/525) Error messages prefixed with ERR or WRONGTYPE 
  - #[490](https://github.com/RedisJSON/RedisJSON/pull/490) Performance: Discard `to_value` method
  - #[426](https://github.com/RedisJSON/RedisJSON/pull/426) Move from next_string to next_str 
  - #[464](https://github.com/RedisJSON/RedisJSON/pull/464) Initial RedisJSON commands.json file 
  - #[488](https://github.com/RedisJSON/RedisJSON/pull/488) Docker with RediSearch revisited 

- Bug fixes
  - #[515](https://github.com/RedisJSON/RedisJSON/pull/515) JSON.DEL count deleted null value 
  - #[499](https://github.com/RedisJSON/RedisJSON/pull/499) Avoid crash in ARRTRIM 
  - #[458](https://github.com/RedisJSON/RedisJSON/pull/458) Docker/Debian: moved from Buster to Bullseye 
  - #[397](https://github.com/RedisJSON/RedisJSON/pull/397) Support RDB Short Read in RedisJSON (a.k.a diskless-load) 
  - #[398](https://github.com/RedisJSON/RedisJSON/pull/398) Avoid path clone when not needed 
  - #[416](https://github.com/RedisJSON/RedisJSON/pull/416) Add testGetWithBracketNotation
