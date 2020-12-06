---
Title: RedisGraph 2.2 Release Notes
description:
weight: 97
alwaysopen: false
categories: ["Modules"]
---
## RedisGraph 2.2 GA (November 2020)

This is the General Availability Release of RedisGraph 2.2 (v2.2.8)!

Headlines:

- Enhanced support for scaling reads
- `OPTIONAL MATCH` (Left outer join)
- Query cache: Improve performance by caching the query execution plan
- Tooling to increase developer experience

Details:

- Support for scaling reads
    - #[1054](https://github.com/RedisGraph/RedisGraph/pull/1054)
 Drastic reduction of memory consumption during replication (and [Active-Passive]({{< relref "/rs/administering/creating-databases/create-active-passive" >}})). Break down a large graph into several portions, each accommodating a virtual key and distribute those for reconstruction at the replica end, by doing so we reduce memory consumption on the replica's end.

- `OPTIONAL MATCH` support
    Unlike MATCH, which requires for a pattern to exist, `OPTIONAL MATCH` continues processing when the optional pattern doesn't exist. We can easily compare `OPTIONAL MATCH` in Cypher to an outer join in SQL. It works just like a regular `MATCH` with the difference that if no matches are found, [`OPTIONAL MATCH`](https://oss.redislabs.com/redisgraph/commands/#optional-match) will use a null for missing parts of the pattern.

    - Query cache: Improve performance by caching the query execution plan

        When executing parameterised queries, RedisGraph will cache the execution plan for increased performance. By caching query's execution-plan, RedisGraph skips the parsing and execution-plan construction phase.
        Cache size can be [configured](https://oss.redislabs.com/redisgraph/configuration/#cache_size) at module load time. The default value is 25.

- Tooling to increase developer experience

    Introduction of [`GRAPH.SLOWLOG`](https://oss.redislabs.com/redisgraph/commands/#graphslowlog) command which returns the longest running queries.
    In addition #[1274](https://github.com/RedisGraph/RedisGraph/pull/1274)
 introduces query timeouts with an optional [query flag](https://oss.redislabs.com/redisgraph/configuration/#query-timeout).

- Smaller features and enhancements:
    - #[1225](https://github.com/RedisGraph/RedisGraph/pull/1225)
 Only update index on change of relevant Node properties.
    - #[1229](https://github.com/RedisGraph/RedisGraph/pull/1229)
 RediSearch 1.8.2. (Dependency update)
    - #[1266](https://github.com/RedisGraph/RedisGraph/pull/1266)
, #[1277](https://github.com/RedisGraph/RedisGraph/pull/1277)
 Add support for `any()` and `all()` functions in list comprehension.
    - #[877](https://github.com/RedisGraph/RedisGraph/pull/877)
 Transpose matrices: maintain transpose relationship matrices such that we won't have to compute the transpose of a matrix at run-time. This feature is on by default but can [configured](https://oss.redislabs.com/redisgraph/configuration/#maintain_transposed_matrices) to reduce memory consumption.

- Small updates compared to RC7
    - Minor enhancements:
        - #[1365](https://github.com/RedisGraph/RedisGraph/pull/1365)
 Support array properties in bulk loader.
        - #[1377](https://github.com/RedisGraph/RedisGraph/pull/1377)
 Adding a new procedure `dbms.procedures` that returns all the procedures in the system.
        - #[1389](https://github.com/RedisGraph/RedisGraph/pull/1389)
 Allow property accesses on non-identifier entity references.
    - Bug fixes:
        - #[1406](https://github.com/RedisGraph/RedisGraph/pull/1406)
 Query validation should not check if procedure outputs have been defined.
        - #[1382](https://github.com/RedisGraph/RedisGraph/pull/1382)
 Add graph version to graph context object, response with an error when client graph version mismatch.
        - #[1361](https://github.com/RedisGraph/RedisGraph/pull/1361)
 Don't migrate `WITH` filters into Merge and Apply operation scope.

Notes:
This is the GA version of 2.2. The version inside Redis will be 20208 or 2.2.8 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.
