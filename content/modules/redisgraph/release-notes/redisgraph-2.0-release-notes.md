---
Title: RedisGraph 2.0 Release Notes
description:
weight: 98
alwaysopen: false
categories: ["Modules"]
---
## RedisGraph 2.0.10

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor Enhancements:
    - #[1035](https://github.com/redisgraph/redisgraph/issues/1035) - RediSearch version [1.6.11](https://github.com/RediSearch/RediSearch/releases/tag/v1.6.11).
- Bugfixes:
    - #[1017](https://github.com/redisgraph/redisgraph/issues/1017), #[1019](https://github.com/redisgraph/redisgraph/issues/1019) - Algebraic expressions correctness.
    - #[1020](https://github.com/redisgraph/redisgraph/issues/1020) - Support parameterised SKIP and LIMIT.

## RedisGraph 2.0.9

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Bugfixes:
    - #[1028](https://github.com/redisgraph/redisgraph/issues/1028) Ensure proper placement of Index Scans when partially replacing Filter ops.

## RedisGraph 2.0.8

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Bugfixes:
    - #[1023](https://github.com/redisgraph/redisgraph/issues/1023) Fix regression in checking argument counts to GRAPH endpoints.

## RedisGraph 2.0.6

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- #[897](https://github.com/redisgraph/redisgraph/issues/897) GRAPH.SLOWLOG
- #[1004](https://github.com/redisgraph/redisgraph/issues/1004) Re-enable GRAPH.PROFILE
- #[917](https://github.com/redisgraph/redisgraph/issues/917), #[991](https://github.com/redisgraph/redisgraph/issues/991), #[940](https://github.com/redisgraph/redisgraph/issues/940), #[984](https://github.com/redisgraph/redisgraph/issues/984) Memory leak fixes
- #[925](https://github.com/redisgraph/redisgraph/issues/925) Bug fix within RediSearch
- #[1001](https://github.com/redisgraph/redisgraph/issues/1001) Bug fix label scan invalid range

## RedisGraph 2.0.5

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Enhancement:
    - #[955](https://github.com/redisgraph/redisgraph/issues/955)  Switch OR,AND boolean semiring to ANY,PAIR.

## RedisGraph 2.0.2

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Improved error reporting:
    - #[925](https://github.com/redisgraph/redisgraph/issues/925) RediSearch query error reporting
    - #[919](https://github.com/redisgraph/redisgraph/issues/919) Added non existing entity runtime error
- Enhancements:
    - #[942](https://github.com/redisgraph/redisgraph/issues/942) Update GraphBLAS version (3.2.0)
    - #[922](https://github.com/redisgraph/redisgraph/issues/922) Filter tree compaction
    - #[906](https://github.com/redisgraph/redisgraph/issues/906) Optimize cartesian product
    - #[898](https://github.com/redisgraph/redisgraph/issues/898) Granular matrix locking
- Bug fixes:
    - #[917](https://github.com/redisgraph/redisgraph/issues/917) #[940](https://github.com/redisgraph/redisgraph/issues/940) Resolve memory leaks
    - #[938](https://github.com/RedisGraph/RedisGraph/pull/938) Label matrix should be fetch right before eval

## RedisGraph 2.0 GA (2.0.1)

This is the General Availability Release of RedisGraph 2.0 (2.0.1)!

Headlines:

- Full Text Search (FTS) enabling Graph-aided Search.
- Full graph response enabling visualisation.
- Substantial amount of Cypher coverage.
- Performance improvements of up to 4x compared to RedisGraph 1.2.

(We will blog about this release soon including performance improvements results and the link here)

Full details:

- Major Features
    - #[339](https://github.com/RedisGraph/RedisGraph/issues/339) [Full Graph Response](https://oss.redislabs.com/redisgraph/result_structure/#top-level-members).  RedisGraph now allows to return Graph entities such as Nodes and Relationships.  This feature also enables graph visualisation.
    - #[558](https://github.com/RedisGraph/RedisGraph/issues/558) Indexing functionality replaced by [RediSearch](redisearch.io). This results in support for
        - compound indices
        - full text search
        - graph-aided search
    - #[691](https://github.com/RedisGraph/RedisGraph/issues/691) RediSearch index is used with `IN` operator on indexed properties.
    - #[488](https://github.com/RedisGraph/RedisGraph/issues/488) Replace flex/lemon parser with [libcypher-parser](https://github.com/cleishm/libcypher-parser).
    - #[574](https://github.com/RedisGraph/RedisGraph/issues/574) Introduction of the array data type. This introduces significant support of Cypher as well as properties can be arrays on both nodes and relationships.
    - Cypher
        - #[714](https://github.com/RedisGraph/RedisGraph/issues/714) `MERGE` can be combined with any other clause. `MERGE` will take into account bounded entities.
        - #[786](https://github.com/RedisGraph/RedisGraph/issues/786) Support for passing all supported graph data types (Node, Relationship, Array,...) as arguments to procedure calls, rather than requiring all arguments to be Strings.
        - #[708](https://github.com/RedisGraph/RedisGraph/issues/708) Named path support.
        - #[717](https://github.com/RedisGraph/RedisGraph/issues/717) `count(*)`
        - #[730](https://github.com/RedisGraph/RedisGraph/issues/730) `UNION`
        - #[757](https://github.com/RedisGraph/RedisGraph/issues/757) `coalesce`
        - #[658](https://github.com/RedisGraph/RedisGraph/issues/658) Support for `COUNT DISTINCT`
        - #[574](https://github.com/RedisGraph/RedisGraph/issues/574) with the array data support comes `IN`, `collect`, `head`,`range`, `reverse`, `size`, `tail`
        - #[624](https://github.com/RedisGraph/RedisGraph/issues/624) `randomUUID()`
        - #[632](https://github.com/RedisGraph/RedisGraph/issues/632) `IS NULL` and `IS NOT NULL`.
        - #[594](https://github.com/RedisGraph/RedisGraph/issues/594) Support dynamic inline properties for `CREATE` and `MERGE` patterns.
        - #[583](https://github.com/RedisGraph/RedisGraph/issues/583) `NOT` Operator.
        - #[569](https://github.com/RedisGraph/RedisGraph/issues/569) `timestamp()` function.
        - #[586](https://github.com/RedisGraph/RedisGraph/issues/586) `CASE WHEN` (simple form).
        - #[582](https://github.com/RedisGraph/RedisGraph/issues/582) `contains` function.
        - #[596](https://github.com/RedisGraph/RedisGraph/issues/596) `indegree` and `outdegree` functions for nodes.
        - #[587](https://github.com/RedisGraph/RedisGraph/issues/587) improved boolean logic.
        - #[539](https://github.com/RedisGraph/RedisGraph/issues/539) Reusable entities in pattern matching.
    - #[668](https://github.com/RedisGraph/RedisGraph/issues/668) PageRank support.
    - #[713](https://github.com/RedisGraph/RedisGraph/issues/713) Parameterised queries support. Most client drivers are updated. This enables future performance enhancements for query caching.
    - #[662](https://github.com/RedisGraph/RedisGraph/issues/662) Support for AOF.
- Enhancements
    - #[752](https://github.com/RedisGraph/RedisGraph/issues/752) Use GraphBLAS 3.1.1.
    - #[674](https://github.com/RedisGraph/RedisGraph/issues/674) `GRAPH.QUERY` will not fail even if graph doesn't exist.
    - #[613](https://github.com/RedisGraph/RedisGraph/issues/613) Runtime arithmetic error handling.
- Performance Improvements
    - #[773](https://github.com/RedisGraph/RedisGraph/issues/773) Bulk deletion of relationships. Deletion of relationships within the same query will be efficiently handled by batch operations in GraphBLAS.
    - #[783](https://github.com/RedisGraph/RedisGraph/issues/783) Better replication support. Only write queries that mutate the graph or create indices will be replicated to AOF and slaves.
    - #[783](https://github.com/RedisGraph/RedisGraph/issues/783) Better commit flow. The Redis Global Lock and RedisGraphs's R/W lock are released once writes are done. Fixed duplicate replications in queries with multiple write segments.
    - #[640](https://github.com/RedisGraph/RedisGraph/issues/640) GraphBlas to support OpenMP.
    - #[532](https://github.com/RedisGraph/RedisGraph/issues/532) #[535](https://github.com/RedisGraph/RedisGraph/issues/535) Counting edges of given type by reducing matrices.
    - #[534](https://github.com/RedisGraph/RedisGraph/issues/534) #[571](https://github.com/RedisGraph/RedisGraph/issues/571) Query parsing and `GRAPH.EXPLAIN` in dedicated thread.
    - #[550](https://github.com/RedisGraph/RedisGraph/issues/550) #[555](https://github.com/RedisGraph/RedisGraph/issues/555) Optimize cartesian product by reducing to join.
    - #[641](https://github.com/RedisGraph/RedisGraph/issues/641) Cartesian products with multiple incoming streams >2 can now be optimized with "HashJoin".
- Bugfixes
    - #[783](https://github.com/RedisGraph/RedisGraph/issues/783) Master-slave replication - slaves were dropping index mutations caused by procedure calls.
    - #[785](https://github.com/RedisGraph/RedisGraph/issues/785) Solved several major memory leaks.
    - #[795](https://github.com/RedisGraph/RedisGraph/issues/795) The underlying graph object's attributes were not updated on `RENAME`.
    - #[720](https://github.com/RedisGraph/RedisGraph/issues/720) Validation of function calls in `WITH` and `CREATE` clauses e.g. `CREATE (a {v: fake()})`.
    - #[732](https://github.com/RedisGraph/RedisGraph/issues/732), #[736](https://github.com/RedisGraph/RedisGraph/issues/736), #[747](https://github.com/RedisGraph/RedisGraph/issues/747) Detect cycles in graph and generate algebraic expression.
    - #[734](https://github.com/RedisGraph/RedisGraph/issues/734) Fix access of uninitialised GrB_Info.
    - #[735](https://github.com/RedisGraph/RedisGraph/issues/735) Index scans with `IN` filters did not compare with strings properly,
    - #[758](https://github.com/RedisGraph/RedisGraph/issues/758) Validate that during `UNION` all return clauses are annotated.
    - #[412](https://github.com/RedisGraph/RedisGraph/issues/412) Better handling for `GRAPH.DELETE`.
    - #[537](https://github.com/RedisGraph/RedisGraph/issues/537) Wrong row index within expand-into, enabled few TCK tests.
    - #[591](https://github.com/RedisGraph/RedisGraph/issues/591) Emit validation error when an alias refers to both nodes and edges.
    - #[606](https://github.com/RedisGraph/RedisGraph/issues/606) Fix Record ID of edges held in ExpandInto op.
    - #[607](https://github.com/RedisGraph/RedisGraph/issues/607) All ops NULL-set variables in their free routines (memory).
    - #[893](https://github.com/RedisGraph/RedisGraph/issues/893) Preserve the children array order when replacing operations.

Note: the version inside Redis will be 20001 or 2.0.1 in semantic versioning.
