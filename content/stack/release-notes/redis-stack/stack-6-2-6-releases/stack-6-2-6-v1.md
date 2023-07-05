---
Title: Redis Stack 6.2.6-v0 release notes
linkTitle: 6.2.6-v0
description: Multi-value index and query for text, tag, numeric, geo and vector. Suffix search *vatore and wildcard search ant?rez. Support for FP64 vectors and range queries from a given vector. Faster JSONPath parser. New probabilistic data structure t-digest. New path-finding algorithms for Graph. Time series gap filling.
weight: 99
alwaysopen: false
hidden: true
categories: ["Modules"]
---

This is a GA release of Redis Stack version 6.2.6.

Highlights:

- Query & Search:

    - Multi-value index and query for: text, tag, numeric, geo and vector!

    - Suffix search `*vatore` and wildcard search `ant?rez`

    - Support for FP64 vectors and range queries from a given vector

- New faster JSONPath parser

- New probabilistic data structure: t-digest

- New path-finding algorithms `algo.SPpaths` and `algo.SSpaths` for Graph

- Support for gap filling for Time Series

## New features and enhancements

#### RediSearch

RediSearch introduces the following features:

- Support for wildcard queries for TEXT and TAG fields, where:

    - ? matches any single character

    - * matches zero or more characters
    
    - use ' and \ for escaping, other special characters are ignored
    
    - Optimized wildcard query support (i.e., suffix trie)
    
- Multi-value indexing and querying:

    - Multi-value text search - perform full-text search on array of string or on a JSONPath leading to multiple strings

    - Support for Geo, Vector, Numeric, Tag

    - Return JSON rather than scalars from multi-value attributes. This is enabled via Dialect 3 in order not to break existing applications.
    
    - Support indexing and querying of multi-value JSONPath attributes and/or arrays (requires JSON >2.4.1)
    
    - Support for SORTABLE fields on JSON in an implicit un-normalized form (UNF)

- Vector similarity 0.5.1:
    
    - Better space optimization selection
    
    - Aligning index capacity with block size
    
    - Support FLOAT64 as vector data type
    
    - Range query support
    
    - Support query attributes for vector queries

#### RedisJSON

RedisJSON introduces the following features:

- Add JSONPath filter the regexp match operator

- Support legacy JSONpath with dollar $

- A new JSONPath library which enhances the performance of parsing any JSONPath expression in RedisJSON.

- Floating point numbers which become round numbers due to some operation, for example by JSON.NUMINCRBY, will now return as a floating point with a trailing .0, e.g., instead of just 42, now 42.0 will be returned.

#### RedisBloom

RedisBloom introduces the following new features:

- A new sketch data structure: t-digest. t-digest is a sketch data structure for estimating quantiles based on a data stream or a large dataset of values. As for other sketch data structures, t-digest requires sublinear space and has controllable space-accuracy tradeoffs.

#### RedisGraph

RedisGraph introduces the following new features:

- New path-finding algorithms:

    - The algo.SPpaths procedure returns one, n, or all minimal-weight, optionally bounded-cost, optionally bounded-length paths between a given pair of nodes.
    
    - The algo.SSpaths procedure returns one, n, or all minimal-weight, optionally bounded-cost, optionally bounded-length paths from a given node.

- Introduce SET for adding node labels and REMOVE for removing node labels, node properties, and edge properties

- Support deleting paths with DELETE

- Introduce toBoolean, toBooleanOrNull, toFloatOrNull, toIntegerOrNull, toStringOrNull, toBooleanList, toFloatList, toIntegerList, toStringList, properties, split, last, isEmpty,e, exp, log, log10, sin, cos, tan, cot, asin, acos, atan, atan2, degrees, radians, pi, and haversin functions.

- Graph slow log can be reset with GRAPH.SLOWLOG g RESET

- Queries are now atomic (Atomicity is the guarantee that each query either succeeds or fails with no side effects). Whenever a failure occurs, the query effect is rolled-back from an undo-log.

#### RedisTimeSeries

RedisTimeSeries introduces the following new features:

- Introduction of a new aggregator: twa (time-weighted average)

- Introduction of a new optional EMPTY flag to TS.RANGE, TS.REVRANGE, TS.MRANGE, and TS.MREVRANGE to retrieve aggregations for empty buckets as well.

- Gap-filling: Using EMPTY when the aggregator is twa allows estimating the average of a continuous signal even for empty buckets based on linear interpolation of previous and next samples. Using EMPTY when the aggregator is last would repeat the value of the previous sample when the bucket is empty.

- Introduction of a new optional BUCKETTIMESTAMP parameter to TS.RANGE, TS.REVRANGE, TS.MRANGE, and TS.MREVRANGE. It is now possible to report the start time, the end time, or the mid time for each bucket.

- Introduction of a new optional alignTimestamp parameter to TS.CREATERULE and to COMPACTION_POLICY configuration parameter. It is now possible to define alignment for compaction rules, so one can, for example, aggregate daily events from 06:00 to 06:00 the next day.

- Introduction of additional reducer types in GROUPBY (TS.MRANGE, and TS.MREVRANGE): avg, range, count, std.p, std.s, var.p, and var.s

- Introduction of a new optional LATEST flag to TS.GET, TS.MGET, TS.RANGE, TS.REVRANGE, TS.MRANGE, and TS.MREVRANGE. it is possible to retrieve the latest (possibly partial) bucket as well.

## Version changes

{{<note>}}
Version numbers follow the following pattern:
`x.y.z-b`
- `x.y` Redis Major version
- `z` increases with even numbers as a module x.y version increases.
- `b` denotes a patch to Redis or a module (any `z` of Redis or Modules). `b` will consist of a `v` + numeric value.
{{</note>}}

### Redis version (no changes) {#redis-version}

- Redis 6.2.7

### Module versions

- RediSearch 2.6.3

- RedisJSON 2.4.2

- RedisGraph 2.10.4

- RedisTimeSeries 1.8.3

- RedisBloom 2.4.3

### Recommended client libraries (no changes) {#recommended-client-libraries}

- Java
    - Jedis 4.2.0 or greater
    - redis-om-spring

- Python
    - redis-py 4.3.1 or greater
    - redis-om-python

- NodeJS
    - node-redis 4.4.0 or greater
    - redis-om-node

- .NET
    - redis-om-dotnet

Compatible with the latest RedisInsight. The Docker image redis/redis-stack for this version is bundled with RedisInsight 2.14.

## Resolved issues

Bug Fixes (since 6.2.6-RC1):

- RediSearch #3098 Wrong return value in Geo query

- RediSearch #3230 Precalculated number of replies must be equal to actual number

- RediSearch #3171 Shard of DB with RedisSearch 2.4.8/11 got restarted by node_wd

- RediSearch #3197 RediSearch 2.4.15 crashed

- RediSearch #3197 failure to create temporary indices

- RedisJSON #850 Allow repetition of filter relation instead of optional

- RedisGraph #2695 Potential crash on certain write queries

- RedisGraph #2724 Potential crash when setting property values based on nonexistent properties

- RedisGraph #2460, #2637, #2680 Crash on invalid queries

- RedisGraph #2672 Wrong matching result on multiple labels

- RedisGraph #2643 Duplicate reports when matching relationship type :R|R

- RedisGraph #2687, #2414 Error when UNWINDing relationships

- RedisGraph #2636 MERGE … ON ... - cannot remove property by setting it to null

- RedisGraph #2710 Undo-log fix

- RedisGraph #2435 Incorrect result when comparing a value to NaN

- RedisGraph #2497 Incorrect result when comparing a value to null

- RedisGraph #2676 sqrt, log, log10 - incorrect result for negative values

- RedisGraph #2213 Division and Modulo by zero - wrong behavior

- RedisTimeSeries #1333 Potential crash when aggregating over a compaction with the avg aggregator and the LATEST flag
