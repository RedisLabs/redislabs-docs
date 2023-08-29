---
Title: RediSearch 2.8 release notes
linkTitle: v2.8 (July 2023)
description: RESP3 support. Geo Polygon Search. Performance improvements.
min-version-db: "7.2"
min-version-rs: "7.2.4"
weight: 91
alwaysopen: false
categories: ["Modules"]
aliases: 
---
## Requirements

RediSearch v2.8.4 requires:

- Minimum Redis compatibility version (database): 7.2
- Minimum Redis Enterprise Software version (cluster): 7.2.4

## v2.8 GA (v2.8.4) (July 2023)

This is the General Availability release of RediSearch 2.8.

### Headlines

RediSearch 2.8 introduces support for RESP3, new features, performance improvements, and bug fixes.

### What's new in 2.8.4

This new major version introduces new and frequently asked Geo Polygon Search. Adding the `GEOSHAPE` field type that supports polygons shapes using [WKT notation](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry). Besides the current `GEO` (alias for `GEOPOINT`) used already geo range queries, we add the support for `POLYGON` and `POINT` as new geo shapes formats (new `GEOSHAPE`). In addition, 2.8 brings improvements on performance for `SORT BY` operations using `FT.SEARCH` and `FT.AGGREGATE`, and new `FORMAT` for enhanced responses on `FT.SEARCH` and `FT.AGGREGATE` in RESP3 only.

Features:

- Introduce support for Geo-polygon shapes and queries:

  - Adding `GEOSHAPE` [field type](https://redis.io/commands/ft.create/) to map polygons in the `SCHEMA` on `FT.CREATE` (MOD-4798)

  - Support for polygons `POLYGON` and `POINT` using [WKT notation](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry), for example `POLYGON((lon1 lat1, lon2 lat2, ...))`

  - #Adjust the [query syntax](https://redis.io/commands/ft.search/#examples) on `FT.SEARCH` for Polygons using the predicate `@geom:[OPERATOR $poly]` and defining polygon in WKT format as `PARAMS 2 poly "POLYGON((10 20, ...))"` using `DIALECT 3`

  - Initially `WITHIN` and `CONTAINS` operators with `GEOSHAPES` for now

  - Support multiple coordinate systems: cartesian (X,Y) with the flag `FLAT` for flat earth and geographic (lon, lat) using the flag `SPHERICAL` (MOD-5303). Geographic coordinate system using spherical indexing as default (`SPHERICAL`)

  - Add memory usage per Geometry Index in the `FT.INFO` response report (MOD-5278)

- Introduce performance optimization for sorting operations on `FT.SEARCH` and `FT.AGGREGATE` as default on `DIALECT 4`. It will improve performance in 4 different scenarios, listed below:

  - Skip Sorter - applied when there is no sort of any kind. The query can return once it reaches the `LIMIT` requested results.

  - Partial Range - applied when there is a `SORTBY` a numeric field, with no filter or filter by the same numeric field, the query iterate on a range large enough to satisfy the `LIMIT` requested results.

  - Hybrid - applied when there is a `SORTBY` a numeric field in addition to another non-numeric filter. Some results will get filtered, and the initial range may not be large enough. The iterator then is rewinded with the following ranges, and an additional iteration takes place to collect `LIMIT` requested results.

  - No optimization - If there is a sort by score or by non-numeric field, there is no other option but to retrieve all results and compare their values.

- Add `WITHCOUNT` argument that allow return accurate counts for the query results with sorting. This operation processes all results in order to get accurate count, being less performant than the optimized option (default behavior on `DIALECT 4`) (MOD-5311)

- New `FORMAT` argument in `FT.SEARCH` and `FT.AGGREGATE` to retrieve the results as JSON strings or RESP3 hierarchical structures (RESP3 only) (MOD-5390)

Improvements (since 2.8.3):

- [#3717](https://github.com/RediSearch/RediSearch/pull/3717) - Polygons shapes validation and orientation correction when clockwise (MOD-5575)

- [#3534](https://github.com/RediSearch/RediSearch/pull/3534) - Vector Similarity \[[0.7.0](https://github.com/RedisAI/VectorSimilarity/releases/tag/v0.7.0)\]

- [#3657](https://github.com/RediSearch/RediSearch/pull/3657) - Allow GC calls for all tiered indexes in the schema

- [#3701](https://github.com/RediSearch/RediSearch/pull/3701) - HNSW is now using data blocks to store vectors and metadata instead of array

Changed Behavior:

- [#3355](https://github.com/RediSearch/RediSearch/pull/3355), [#3635](https://github.com/RediSearch/RediSearch/pull/3635) Expired keys deleted from slave's index, returning an empty array instead of `nil` (MOD-4739)

{{<note>}}
- The version inside Redis will be 2.8.4 in semantic versioning. Since the version of a module in Redis is numeric, we could not add a GA flag.

- Minimal Redis version: 7.2

- If indexing and querying RedisJSON data structures, this version is best combined with RedisJSON 2.6 (v2.6.0 onwards)
{{</note>}}
