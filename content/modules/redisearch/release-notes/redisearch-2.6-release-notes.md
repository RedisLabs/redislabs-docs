---
Title: RediSearch 2.6 release notes
linkTitle: v2.6 (November 2022)
description: Search using wildcard queries for TEXT and TAG fields, multi-value indexing and querying of attributes for any attribute type, and indexing double-precision floating-point vectors and range queries from a given vector.
min-version-db: "6.0.16"
min-version-rs: "6.2.8"
weight: 92
alwaysopen: false
categories: ["Modules"]
---
## Requirements

RediSearch v2.6.4 requires:

- Minimum Redis compatibility version (database): 6.0.16
- Minimum Redis Enterprise Software version (cluster): 6.2.8

## v2.6.4 (December 2022)

This is a maintenance release for RediSearch 2.6.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

  - [#3289](https://github.com/RediSearch/RediSearch/pull/3289) Potential crash when querying multiple fields (MOD-4639)
  - [#3279](https://github.com/RediSearch/RediSearch/pull/3279) Potential crash when querying using wildcard `*` on TAG field (MOD-4653)

- Improvements:
  
  - [#3256](https://github.com/RediSearch/RediSearch/pull/3256) Support IPv6 on cluster set command
  - [#3194](https://github.com/RediSearch/RediSearch/pull/3194) Add the query dialects that are in use to `FT.INFO` and `INFO MODULE` commands (MOD-4232)
  - [#3258](https://github.com/RediSearch/RediSearch/pull/3258) Add the module version and Redis version to `INFO MODULE`  

## v2.6 GA (v2.6.3) (November 2022)

This is the General Availability release of RediSearch 2.6.

### Highlights

This new major version introduces the ability to search using **wildcard queries** for TEXT and TAG fields. This enables the frequently asked feature of **suffix search** (`*vatore` and `ant?rez` are now supported).
In addition, the 2.6 release is all about **multi-value indexing and querying of attributes** for any attribute type ( [Text](https://redis.io/docs/stack/search/indexing_json/#index-json-arrays-as-text), [Tag](https://redis.io/docs/stack/search/indexing_json/#index-json-arrays-as-tag), [Numeric](https://redis.io/docs/stack/search/indexing_json/#index-json-arrays-as-numeric), [Geo](https://redis.io/docs/stack/search/indexing_json/#index-json-arrays-as-geo) and [Vector](https://redis.io/docs/stack/search/indexing_json/#index-json-arrays-as-vector)) defined by a [JSONPath](https://redis.io/docs/stack/json/path/) leading to an array or to multiple scalar values.
Lastly, this version adds support for indexing double-precision floating-point vectors and range queries from a given vector.

### What's new in 2.6

### Details

- Improvements:

  - [#2886](https://github.com/RediSearch/RediSearch/pull/2886) Support for [wildcard queries](https://redis.io/docs/stack/search/reference/query_syntax/#wildcard-matching) for TEXT and TAG fields, where
    - `?` matches any single character
    - `*` matches zero or more characters
    - use `'` and `\` for escaping, other special characters are ignored
    - [#2932](https://github.com/RediSearch/RediSearch/pull/2932) Optimized wildcard query support (i.e., suffix trie)
  - Multi-value indexing and querying
    - [#2819](https://github.com/RediSearch/RediSearch/pull/2819), [#2947](https://github.com/RediSearch/RediSearch/pull/2947) Multi-value text search - perform full-text search on [array of string or on a JSONPath](https://redis.io/docs/stack/search/indexing_json/#index-json-arrays-as-tag) leading to multiple strings
    - [#3131](https://github.com/RediSearch/RediSearch/pull/3131) Geo [#3118](https://github.com/RediSearch/RediSearch/pull/3118) Vector [#2985](https://github.com/RediSearch/RediSearch/pull/2985) Numeric [#3180](https://github.com/RediSearch/RediSearch/pull/3180) Tag
    - [#3060](https://github.com/RediSearch/RediSearch/pull/3060) Return JSON rather than scalars from multi-value attributes.  This is enabled via Dialect 3 in order not to break existing applications.
    - Support indexing and querying of multi-value JSONPath attributes and/or arrays (requires JSON >2.4.1)
    - [#3182](https://github.com/RediSearch/RediSearch/pull/3182) Support for `SORTABLE` fields on JSON in an implicit un-normalized form (UNF)
  - [#3156](https://github.com/RediSearch/RediSearch/pull/3156) Vector similarity 0.5.1:
    - Better space optimization selection ([#175](https://github.com/RedisAI/VectorSimilarity/pull/175)) 
    - Aligning index capacity with block size ([#177](https://github.com/RedisAI/VectorSimilarity/pull/177)) 
    - [#3129](https://github.com/RediSearch/RediSearch/pull/3129) Support FLOAT64 as vector data type 
    - [#3176](https://github.com/RediSearch/RediSearch/pull/3176) Range query support
    - [#3105](https://github.com/RediSearch/RediSearch/pull/3105) Support query attributes for vector queries

- Bugs (since 2.6-RC1 / v2.6.1):

  - [#3197](https://github.com/RediSearch/RediSearch/pull/3197) Failure to create temporary indices
  - [#3098](https://github.com/RediSearch/RediSearch/pull/3098) Wrong return value in Geo query
  - [#3230](https://github.com/RediSearch/RediSearch/issues/3230) Use the correct total number of matching records

{{<note>}}
With this release, we stop supporting direct upgrades from RediSearch v1.4 and v1.6 that are End-of-Life. Such RDB files can still be upgraded to RediSearch 2.0 first.
{{</note>}}

{{<note>}}
If indexing and querying RedisJSON data structures, this version is best combined with RedisJSON 2.4 GA (v2.4.1 onwards).
{{</note>}}
