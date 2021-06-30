---
Title: RedisGraph 2.4 Release Notes
description:
weight: 96
alwaysopen: false
categories: ["Modules"]
---

## RedisGraph 2.4 GA (March 2021)

### Headlines:
This release introduces the [Map](https://oss.redislabs.com/redisgraph/master/datatypes/#maps) and [Geospatial Point](https://oss.redislabs.com/redisgraph/master/datatypes/#geospatial-points) datatypes.

### Details:
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

Notes:
This is the first GA version of 2.4. The version inside Redis will be 2.4.2 in semantic versioning. Since the version of a module in Redis is numeric, we could not add an GA flag.

<<Need to include cluste version requirement>>
