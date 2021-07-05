---
Title: RedisGraph 2.4 release notes
linkTitle: v2.4 (March 2021)
description:
weight: 96
alwaysopen: false
categories: ["Modules"]
---

## v2.4.6 (June 2021)

This is a maintenance release for RedisGraph 2.4

Update urgency: Medium

- Details:

- Performance improvements:
    - #[1702](https://github.com/redisgraph/redisgraph/issues/1702) Optimize matrix synchronization in GRAPH.BULK commands
    - #[1716](https://github.com/redisgraph/redisgraph/issues/1716) Reduce lock calls in retrieving matrices for reading
    - #[1741](https://github.com/redisgraph/redisgraph/issues/1741) Improve edge extraction
    - #[1388](https://github.com/redisgraph/redisgraph/issues/1388) Node creation buffer
    - #[1724](https://github.com/redisgraph/redisgraph/issues/1724) Update RediSearch 2.0
    - #[1731](https://github.com/redisgraph/redisgraph/issues/1731) Release lock after MergeCreate builds entities
    - #[1734](https://github.com/redisgraph/redisgraph/issues/1734) Added multi edge flag

- Bug fixes:
    - #[1726](https://github.com/redisgraph/redisgraph/issues/1726) JsonEncoder: invalid cast
    - #[1709](https://github.com/redisgraph/redisgraph/issues/1709) #1712 Fix potential deadlock in BGSAVE
    - #[1703](https://github.com/redisgraph/redisgraph/issues/1703) Uniquing logic in UNION subqueries
    - #[1720](https://github.com/redisgraph/redisgraph/issues/1720) Propagate configuration updates to replicas
    - #[1714](https://github.com/redisgraph/redisgraph/issues/1714) Don't build scan operations for bound variables
    - #[1708](https://github.com/redisgraph/redisgraph/issues/1708) Regression in GRAPH.CONFIG GET *
    - #[1715](https://github.com/redisgraph/redisgraph/issues/1715) Validate function private data before freeing it

- Miscellaneous:

    - #[1691](https://github.com/redisgraph/redisgraph/issues/1691) Reword error message on setting property value to invalid type

## v2.4.4 (15 May 2021)

This is a maintenance release for RedisGraph 2.4.

Update urgency: Medium

Details:

- Minor Enhancements:
    - #[1666](https://github.com/redisgraph/redisgraph/issues/1666) Add configuration parameter to limit the memory usage of queries
    - #[1639](https://github.com/redisgraph/redisgraph/issues/1639) Add functionality to SET all properties on an entity to a map

- Bug fixes:
    - #[1678](https://github.com/redisgraph/redisgraph/issues/1678) Crash on multiple procedure calls in a single query

## v2.4.3 (8 May 2021)

This is a maintenance release for RedisGraph 2.4.

Update urgency: Medium

Details:

- Features:
    - #[1657](https://github.com/redisgraph/redisgraph/issues/1657) Support filtering on variable-length edges in traversals
    - #[1514](https://github.com/redisgraph/redisgraph/issues/1514) Add support for shortestPath in MATCH clauses
    - #[1664](https://github.com/redisgraph/redisgraph/issues/1664) Add support for limiting max queued queries
    - #[1653](https://github.com/redisgraph/redisgraph/issues/1653), #[1655](https://github.com/redisgraph/redisgraph/issues/1655) Add support for square root (sqrt) function

- Performance improvements:
    - #[1641](https://github.com/redisgraph/redisgraph/issues/1641) Use indexes when filters can only be resolved at run-time
    - #[1668](https://github.com/redisgraph/redisgraph/issues/1668) Apply path filters after all other filters

- Bug fixes:
    - #[1650](https://github.com/redisgraph/redisgraph/issues/1650) Fix memory leak on allocated keys in OpAggregate
    - #[1671](https://github.com/redisgraph/redisgraph/issues/1671) Disallow nested aggregates in map values, circumventing a bug that introduced invalid group keys
    - #[1644](https://github.com/redisgraph/redisgraph/issues/1644) Fix bug in which values for unknown schema types are cached
    - #[1656](https://github.com/redisgraph/redisgraph/issues/1656) Fix potential crash when releasing thread pools on server shutdown


## v2.4 GA (March 2021)

Headlines:

- This release introduces the [Map](https://oss.redislabs.com/redisgraph/master/datatypes/#maps) and [Geospatial Point](https://oss.redislabs.com/redisgraph/master/datatypes/#geospatial-points) datatypes.

Details:

- Features:
  - #[1514](https://github.com/redisgraph/redisgraph/issues/1514) Add support for [Map](https://oss.redislabs.com/redisgraph/master/datatypes/#maps) datatype.
  - #[1516](https://github.com/redisgraph/redisgraph/issues/1516) Add support for [Geospation Point](https://oss.redislabs.com/redisgraph/master/datatypes/#geospatial-points) datatype.
  - #[1562](https://github.com/redisgraph/redisgraph/issues/1562) Add [`toJSON`](https://oss.redislabs.com/redisgraph/master/commands/#json-format) function.
  - #[1607](https://github.com/redisgraph/redisgraph/issues/1607) [Querying full-text indexes](https://oss.redislabs.com/redisgraph/commands/#full-text-indexes) can yield the `score` of each result.
  - #[1610](https://github.com/redisgraph/redisgraph/issues/1610) Expose run-time configuration for [read query timeouts](https://oss.redislabs.com/redisgraph/configuration/#query-timeout).

- Performance improvements:
  - #[1596](https://github.com/redisgraph/redisgraph/issues/1596) [Redisgraph-bulk-loader](https://github.com/RedisGraph/redisgraph-bulk-loader) no longer blocks the server.

- Minor Enhancements
  - #[1590](https://github.com/redisgraph/redisgraph/issues/1590) Improve handling of run-time errors.
  - #[1580](https://github.com/redisgraph/redisgraph/issues/1580) Enable assertions in debug mode.

- Bugfixes (compared to RC1)
  - #[1618](https://github.com/redisgraph/redisgraph/issues/1618) Fix relationship types being omitted in traversals of 3 or more types.

{{< note >}}
This is the first GA version of 2.4. The version inside Redis will be 2.4.2 in semantic versioning. Since the version of a module in Redis is numeric, we could not add an GA flag.
{{< /note >}}