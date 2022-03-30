---
Title: RedisGraph 2.8 release notes
linkTitle: v2.8 (February 2022)
description: Introduces multi-labeled nodes, indexes over relationship properties, and additional expressivity (Cypher construct, functions, and operators). Major performance enhancements. Many bug fixes.
min-version-db: "6.2.0"
min-version-rs: "6.2.8"
weight: 95
alwaysopen: false
categories: ["Modules"]
---
## Requirements

RedisGraph v2.8.10 requires:

- Minimum Redis compatibility version (database): 6.2.0
- Minimum Redis Enterprise Software version (cluster): 6.2.8

## v2.8.10 (March 2022)

This is a maintenance release for RedisGraph 2.8.

Update urgency: `HIGH`: There is a critical bug that may affect a subset of users. Upgrade!

Details: 

- Features:

    - [#2245](https://github.com/RedisGraph/RedisGraph/pull/2245) Support graphs [eviction](https://redis.io/docs/manual/eviction/)

- Bug fixes:

    - [#1493](https://github.com/RedisGraph/RedisGraph/issues/1493), [#2240](https://github.com/RedisGraph/RedisGraph/pull/2240) Fixed crash on certain queries
    - [#2229](https://github.com/RedisGraph/RedisGraph/issues/2229), [#2222](https://github.com/RedisGraph/RedisGraph/pull/2222) Fixed crash on certain queries
    - [#2209](https://github.com/RedisGraph/RedisGraph/issues/2209), [#2228](https://github.com/RedisGraph/RedisGraph/pull/2228) Fixed crash on certain invalid [`DELETE`](https://redis.io/commands/graph.query/#delete) queries
    - [#2237](https://github.com/RedisGraph/RedisGraph/issues/2237), [#2242](https://github.com/RedisGraph/RedisGraph/pull/2242) Fixed crash on certain [`PROFILE`](https://redis.io/commands/graph.profile/) queries
    - [#2230](https://github.com/RedisGraph/RedisGraph/issues/2230), [#2232](https://github.com/RedisGraph/RedisGraph/pull/2232) Fixed wrong number of reported deleted relationships on certain queries
    - [#2233](https://github.com/RedisGraph/RedisGraph/pull/2233) Certain valid queries were reported invalid
    - [#2246](https://github.com/RedisGraph/RedisGraph/issues/2246) Fixed memory leaks

- Improvements:

    - [#2235](https://github.com/RedisGraph/RedisGraph/pull/2235) Improved [RDB](https://redis.io/docs/manual/persistence/) loading performance

## v2.8.9 (March 2022)

This is a maintenance release for RedisGraph 2.8.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details: 

- Features:

    - [#2181](https://github.com/RedisGraph/RedisGraph/pull/2181), [#2182](https://github.com/RedisGraph/RedisGraph/pull/2182) Full support for ARM builds

- Bug fixes:

    - [#2167](https://github.com/RedisGraph/RedisGraph/pull/2167) Fixed a potential crash: filter placement in `OPTIONAL` subtrees
    - [#2176](https://github.com/RedisGraph/RedisGraph/pull/2176) Fixed a potential crash: invalid memory access in nested `DISTINCT` functions
    - [#2217](https://github.com/RedisGraph/RedisGraph/pull/2217) Fixed a potential crash: memory access after free on `FLUSHALL`
    - [#2207](https://github.com/RedisGraph/RedisGraph/pull/2207) Fixed memory leak when `MAX_QUEUED_QUERIES` is used
    - [#2220](https://github.com/RedisGraph/RedisGraph/pull/2220) `WITH * WHERE` - the `WHERE` filters were ignored
    - [#2151](https://github.com/RedisGraph/RedisGraph/pull/2151) Return correct results for aggregations with no inputs
    - [#2163](https://github.com/RedisGraph/RedisGraph/pull/2163) Emit error correctly on multi-query inputs

- Improvements:

    - [#2173](https://github.com/RedisGraph/RedisGraph/pull/2173) Improve performance of breadth-first search

## v2.8.8 (February 2022)

This is the General Availability release of RedisGraph 2.8.

### Highlights

RedisGraph 2.8 introduces multi-labeled nodes, indexes over relationship properties, additional expressivity (construct, functions, and operators), major performance enhancements, and many bug fixes.

#### What's new in 2.8

- Multi-labeled nodes
- Indexes over relationship properties
- Enhanced full-text search
- Delta matrices: node and relationships additions and deletions are much faster, as they are first updated in small delta matrices. The main matrices are then bulk-updated.
- Additional Cypher construct, functions, and operators
- [RediSearch](https://oss.redis.com/redisearch/) 2.2.7
- [SuiteSparse](https://github.com/DrTimothyAldenDavis/GraphBLAS) (GraphBLAS) 6.0.0

### Details

- Features (since 2.8-M02):

    - [#2109](https://github.com/RedisGraph/RedisGraph/pull/2109) Introduce `allShortestPaths` BFS function
    - [#2099](https://github.com/RedisGraph/RedisGraph/pull/2099) Introduce `keys` function
    - [#2047](https://github.com/RedisGraph/RedisGraph/pull/2047) Introduce `reduce` function
    - [#2076](https://github.com/RedisGraph/RedisGraph/pull/2076) Introduce XOR operation in [filter trees](https://oss.redis.com/redisgraph/design/#filter-tree)
    - [#2088](https://github.com/RedisGraph/RedisGraph/pull/2088) Introduce pattern comprehensions
    - [#2051](https://github.com/RedisGraph/RedisGraph/pull/2051) Allow copying of entity attribute sets in [`SET`](https://oss.redis.com/redisgraph/commands/#set) clauses
    - [#2067](https://github.com/RedisGraph/RedisGraph/pull/2067) Allow modification of virtual key entity count (`VKEY_MAX_ENTITY_COUNT`) at runtime
    - [#2102](https://github.com/RedisGraph/RedisGraph/pull/2102) New load time configuration option `NODE_CREATION_BUFFER` - see [documentation](https://github.com/RedisGraph/RedisGraph/blob/master/docs/configuration.md#node_creation_buffer) (MOD-2348)
    - [#2049](https://github.com/RedisGraph/RedisGraph/pull/2049) [RediSearch](https://oss.redis.com/redisearch/) supports field definitions

- Performance improvements (since 2.8-M02):

    - [#2097](https://github.com/RedisGraph/RedisGraph/pull/2097) Locks favor writers to prevent write exhaustion
    - [#1945](https://github.com/RedisGraph/RedisGraph/pull/1945) Track node count per label in graph statistics
    - [#1872](https://github.com/RedisGraph/RedisGraph/pull/1872) Delta matrices are always [hypersparse](https://fossies.org/linux/SuiteSparse/GraphBLAS/docs/graphblas_demo.html#40)
    - [#1871](https://github.com/RedisGraph/RedisGraph/pull/1871) Matrix sync policies reduce the number of syncs required
    - [#1869](https://github.com/RedisGraph/RedisGraph/pull/1869) Transposed matrices are always boolean
    - [#2101](https://github.com/RedisGraph/RedisGraph/pull/2101) Entity annotation has been replaced with an AST [`toString`](https://oss.redis.com/redisgraph/cypher_support/#string-functions) function
    - [#1878](https://github.com/RedisGraph/RedisGraph/pull/1878) Slowlog queries no longer create graphs
    - [#2067](https://github.com/RedisGraph/RedisGraph/pull/2067) Index graph entities incrementally on restore
    - Faster AOF recovery (PM-1252)

- Bug fixes (since 2.8-M02):

    - [#2016](https://github.com/RedisGraph/RedisGraph/pull/2016) Implement new BFS algorithm
    - [#2105](https://github.com/RedisGraph/RedisGraph/pull/2105) Creating a node with multiple properties using the same key only accepts the last value
    - [#2055](https://github.com/RedisGraph/RedisGraph/pull/2055) Avoid arithmetic overflow in [`avg`](https://oss.redis.com/redisgraph/cypher_support/#aggregating-functions) function
    - [#2048](https://github.com/RedisGraph/RedisGraph/pull/2048) [Modulo](https://oss.redis.com/redisgraph/cypher_support/#mathematical-operators) by zero emits division by zero error
    - [#2020](https://github.com/RedisGraph/RedisGraph/pull/2020) Fix evaluation of variable-length edges in expression ordering
    - [#2028](https://github.com/RedisGraph/RedisGraph/pull/2028) Fix utilization of record offset in procedure calls, refactor outputs
    - [#2014](https://github.com/RedisGraph/RedisGraph/pull/2014) Update label for every node in the AST
    - [#2002](https://github.com/RedisGraph/RedisGraph/pull/2002) Fix crash in index utilization using wrong query_graph
    - [#1976](https://github.com/RedisGraph/RedisGraph/pull/1976) Use operand matrix when available
    - [#1973](https://github.com/RedisGraph/RedisGraph/pull/1973) Emit error on a query that only contains parameters
    - [#1950](https://github.com/RedisGraph/RedisGraph/pull/1950) Print ExecutionPlan in [`GRAPH.EXPLAIN`](https://oss.redis.com/redisgraph/commands/#graphexplain) only if no errors are encountered in the construction
    - [#1933](https://github.com/RedisGraph/RedisGraph/pull/1933) Free thread-local data on graph deletion
    - [#1942](https://github.com/RedisGraph/RedisGraph/pull/1942) Fix dimensions of transposed delta matrices
    - [#1940](https://github.com/RedisGraph/RedisGraph/pull/1940) Do not use block client if deny blocking is specified
    - [#1898](https://github.com/RedisGraph/RedisGraph/pull/1898) Error when setting a property to an array containing an invalid type
    - [#1931](https://github.com/RedisGraph/RedisGraph/pull/1931) Sync matrices on parent process before serialization fork
    - [#1897](https://github.com/RedisGraph/RedisGraph/pull/1897) Aliases in [`WITH`](https://oss.redis.com/redisgraph/commands/#with) ... [`ORDER BY`](https://oss.redis.com/redisgraph/commands/#order-by) must be valid references
    - [#1913](https://github.com/RedisGraph/RedisGraph/pull/1913) Update thread-local AST for every cloned operation
    - [#1915](https://github.com/RedisGraph/RedisGraph/pull/1915) Validate function references in parameters
    - [#1911](https://github.com/RedisGraph/RedisGraph/pull/1911) Refactor `cron` task for managing query timeouts
    - [#1902](https://github.com/RedisGraph/RedisGraph/pull/1902) Fix incorrect behavior on `NULL` values in `CASE`...`WHEN` expressions
    - [#1904](https://github.com/RedisGraph/RedisGraph/pull/1904) Allow reconfiguring query timeout to 0
    - [#1888](https://github.com/RedisGraph/RedisGraph/pull/1888) Synchronize matrices on creation in RDB load
    - [#1892](https://github.com/RedisGraph/RedisGraph/pull/1892) Validate values specified in [`SET`](https://oss.redis.com/redisgraph/commands/#set) clauses
    - [#1889](https://github.com/RedisGraph/RedisGraph/pull/1889) Tuple iterator now updates properly when changing matrix to serialize
    - [#1870](https://github.com/RedisGraph/RedisGraph/pull/1870) Fix crash in [`range`](https://oss.redis.com/redisgraph/commands/#list-functions) function
    - [#2125](https://github.com/RedisGraph/RedisGraph/issues/2125) Fix crash on [`UNION`](https://oss.redis.com/redisgraph/commands/#union) ... [`RETURN`](https://oss.redis.com/redisgraph/commands/#return) * queries (MOD-2524)
    - [#2043](https://github.com/RedisGraph/RedisGraph/pull/2043) Avoid serialization of duplicate graph keys
    - [#2067](https://github.com/RedisGraph/RedisGraph/pull/2067) Numeric indices no longer lose precision on very large values
    - [#2072](https://github.com/RedisGraph/RedisGraph/issues/2072), [#2081](https://github.com/RedisGraph/RedisGraph/pull/2081) CRLF sequences embedded in strings no longer trigger a protocol error when being emitted
    - [#2139](https://github.com/RedisGraph/RedisGraph/pull/2139) Fix crash when trying to retrieve an out-of-bounds item
    - [#2149](https://github.com/RedisGraph/RedisGraph/pull/2149) Fix crash when matching a node engages an index to search for a value that is a RediSearch stop word

{{<note>}}
- This is the first GA version of 2.8. The version inside Redis will be 2.8.8 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.

- Minimum Redis version: 6.2
{{</note>}}