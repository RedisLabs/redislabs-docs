---
Title: v1.0
description:
weight: 100
alwaysopen: false
categories: ["Modules"]
---
## RedisGraph v1.0.15 Release Notes

* GraphBLAS 2.3.0 [release notes](https://github.com/RedisLabsModules/RedisGraph/pull/390#issuecomment-470620353)
* WITH clause: Allows query parts to be chained together, piping the results from one to be used as starting points or criteria of the next. [ref p.78](https://s3.amazonaws.com/artifacts.opencypher.org/openCypher9.pdf)
* Enhancements
  *  #[393](https://github.com/RedisGraph/RedisGraph/issues/393) Discard distinct when performing aggregation
* Minor bugfixes
  * #[359](https://github.com/RedisGraph/RedisGraph/issues/359) Adding ORDER BY changes the number of returned hits when used in combination with LIMIT
  * #[363](https://github.com/RedisGraph/RedisGraph/issues/363) Remove graph entity property when it is set to null
  * #[386](https://github.com/RedisGraph/RedisGraph/issues/386) Return updated values on queries that modify data

## RedisGraph v1.0.14 Release Notes

license update, REDIS SOURCE AVAILABLE LICENSE AGREEMENT.

## RedisGraph v1.0.13 Release Notes

Reuse attribute name to avoid duplication

## RedisGraph v1.0.12 Release Notes

traverse direction optimization to reduce number of matrix transpose

## RedisGraph v1.0.11 Release Notes

Removed OpenMP requirement
Traverse from multiple nodes concurrently

## RedisGraph v1.0.10 Release Notes

Update indices when MERGE create new entities

## RedisGraph v1.0.9 Release Notes

Support for mixing MERGE and SET clauses
Granular writer locking
Fix graph serialisation error in duplicate edge handling

## RedisGraph v1.0.8 Release Notes

Index utilisation when performing cartesian product

Increase usage of rm_malloc functions in module

Allow serialisation of NULL-valued properties

Support for multiple relationship types

## RedisGraph v1.0.7 Release Notes

Bulk-insert support unicode
Bulk-insert better progress reporting
Multiple relationship types

## RedisGraph v1.0.5 Release Notes

Bulk insert supports ID specifying + relationships attributes

## RedisGraph v1.0.4 Release Notes

* Compact GraphBLAS, using structural semiring

## RedisGraph v1.0.3 Release Notes

* GraphBLAS 2.2
* Multiple CREATE clauses
* Multiple MATCH clauses
* Bug fixes:
* Replace operations appropriately when rewriting execution plan
* Entity returned from datablock should have its internals cleared
* Loaded triemap strings are not guaranteed space for a null terminator

## RedisGraph v1.0.2 Release Notes

* Bug fix #[249](https://github.com/RedisGraph/RedisGraph/issues/249) reset operation within execution plan should propagate upwards

## RedisGraph v1.0.1 Release Notes

* Resolved a number of memory leaks
* Support '*' within RETURN clause
* Add TYPE function
* Initial support for UNWIND clause