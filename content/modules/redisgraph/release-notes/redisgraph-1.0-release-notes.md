---
Title: RedisGraph 1.0 Release Notes
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## RedisGraph 1.0.15 (March 2019)

- GraphBLAS 2.3.0 [release notes](https://github.com/RedisLabsModules/RedisGraph/pull/390#issuecomment-470620353)
- WITH clause: Allows query parts to be chained together, piping the results from one to be used as starting points or criteria of the next. [ref p.78](https://s3.amazonaws.com/artifacts.opencypher.org/openCypher9.pdf)
- Enhancements
    - #[393](https://github.com/RedisGraph/RedisGraph/issues/393) Discard distinct when performing aggregation
- Minor bugfixes
    - #[359](https://github.com/RedisGraph/RedisGraph/issues/359) Adding ORDER BY changes the number of returned hits when used in combination with LIMIT
    - #[363](https://github.com/RedisGraph/RedisGraph/issues/363) Remove graph entity property when it is set to null
    - #[386](https://github.com/RedisGraph/RedisGraph/issues/386) Return updated values on queries that modify data

## RedisGraph 1.0.14 (February 2019)

license update, REDIS SOURCE AVAILABLE LICENSE AGREEMENT.

## RedisGraph 1.0.13 (February 2019)

Reuse attribute name to avoid duplication

## RedisGraph 1.0.12 (January 2019)

traverse direction optimization to reduce number of matrix transpose

## RedisGraph 1.0.11 (January 2019)

Removed OpenMP requirement
Traverse from multiple nodes concurrently

## RedisGraph 1.0.10 (January 2019)

Update indices when MERGE create new entities

## RedisGraph 1.0.9 (January 2019)

Support for mixing MERGE and SET clauses
Granular writer locking
Fix graph serialization error in duplicate edge handling

## RedisGraph 1.0.8

Index utilization when performing cartesian product

Increase usage of rm_malloc functions in module

Allow serialization of NULL-valued properties

Support for multiple relationship types

## RedisGraph 1.0.7

Bulk-insert support unicode
Bulk-insert better progress reporting
Multiple relationship types

## RedisGraph 1.0.5

Bulk insert supports ID specifying + relationships attributes

## RedisGraph 1.0.4

- Compact GraphBLAS, using structural semiring

## RedisGraph 1.0.3

- GraphBLAS 2.2
- Multiple CREATE clauses
- Multiple MATCH clauses
- Bug fixes:
    - Replace operations appropriately when rewriting execution plan
    - Entity returned from datablock should have its internals cleared
    - Loaded triemap strings are not guaranteed space for a null terminator

## RedisGraph 1.0.2

- Bug fix #[249](https://github.com/RedisGraph/RedisGraph/issues/249) reset operation within execution plan should propagate upwards

## RedisGraph 1.0.1

- Resolved a number of memory leaks
- Support '*' within RETURN clause
- Add TYPE function
- Initial support for UNWIND clause
