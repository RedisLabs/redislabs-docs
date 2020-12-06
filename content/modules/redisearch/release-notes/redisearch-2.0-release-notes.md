---
Title: RediSearch 2.0 Release Notes
description:
weight: 95
alwaysopen: false
categories: ["Modules"]
---
## RediSearch 2.0.3 (November, 2020)

This is a maintenance release for version 2.0.

Minor bugfixes:

- Added [`OSS_GLOBAL_PASSWORD`](https://github.com/RediSearch/RSCoordinator#running-rscoordinator) config argument to allow specify shards password on OSS cluster.
- Update `min_redis_pack_version` to 6.0.8

Note: All these changes happened on [RSCoordinator](https://github.com/RediSearch/RSCoordinator). For consistency reasons however, we keep both repositories tags in sync until we merge the two repositories.

## RediSearch 2.0.2 (November, 2020)

This is a maintenance release for version 2.0.

- Minor enhancements:

    - [#1625](https://github.com/RediSearch/RediSearch/pull/1625) MAXPREFIXEXPANSIONS configuration which replaces the now deprecated config MAXEXPANSIONS. Same behaviour, more declarative naming.
    - [#1614](https://github.com/RediSearch/RediSearch/pull/1614) Prevent multiple sortby steps on FT.AGGREGATE

- Minor bug fixes:

    - [#1605](https://github.com/RediSearch/RediSearch/pull/1605) Rare bug where identical results would get a lower score

## RediSearch 2.0.1 (October, 2020)

This is a maintenance release for version 2.0.

- Minor additions:

    - [#1432](https://github.com/RediSearch/RediSearch/pull/1432) FT.AGGREGATE allows filtering by key and returning the key by using LOAD "@__key" .

- Minor bug fixes:

    - [#1571](https://github.com/RediSearch/RediSearch/pull/1571) Using FILTER in FT.CREATE might cause index to not be in sync with data.
    - [#1572](https://github.com/RediSearch/RediSearch/pull/1572) Crash when using WITHSORTKEYS without SORTBY.
    - [#1540](https://github.com/RediSearch/RediSearch/pull/1540) SORTBY should raise an error if the field is not defined as SORTABLE.

## RediSearch 2.0 (September, 2020)

RediSearch 2.0 is a public preview release meeting GA standards. This release includes several improvements in performance and usability over RediSearch 1.0. These improvements necessitate a few backward-breaking changes to the API.

### Highlights

For this release, we changed the way in which the search indexes are kept in sync with your data. In RediSearch 1.x, you had to manually add data to your indexes using the `FT.ADD` command. In RediSearch 2.x, your data is indexed automatically based on a key pattern.

These changes are designed to enhance developer productivity, and to ensure that
your search indexes are always kept in sync with your data. To support this, we've
made a few changes to the API.

In addition to simplifying indexing, RediSearch 2.0 allows you to scale a single index over multiple Redis shards using the Redis cluster API.

Finally, RediSearch 2.x keeps its indexes outside of the main Redis key space. Improvements to the indexing code have increased query performance 2.4x.

You can read more details in [the RediSearch 2.0 announcement blog post](https://redislabs.com/blog/introducing-redisearch-2-0/), and you can get started by checking out this [quick start blog post](https://redislabs.com/blog/getting-started-with-redisearch-2-0/).
<img src="https://github.com/RediSearch/RediSearch/blob/master/docs/img/newarchitecture.png"  alt="architecture" width="500"/>

### Details

- When you create an index, you must specify a prefix condition and/or a filter. This determines which hashes RediSearch will index.
- Several RediSearch commands now map to their Redis equivalents: `FT.ADD` -> `HSET`, `FT.DEL` -> `DEL` (equivalent to [`FT.DEL` with the DD flag in RediSearch 1.x](https://oss.redislabs.com/redisearch/Commands/#ftdel)), `FT.GET` -> `HGETALL`, `FT.MGET` -> `HGETALL`.
- RediSearch indexes no longer reside within the key space, and the indexes are no longer saved to the RDB.
- You can [upgrade from RediSearch 1.x to RediSearch 2.x](https://oss.redislabs.com/redisearch/master/Upgrade_to_2.0/).

### Noteworthy changes

- [#1246](https://github.com/RediSearch/RediSearch/pull/1246): [`geodistance`](https://oss.redislabs.com/redisearch/master/Aggregations/#list_of_geo_apply_functions) function for `FT.AGGREGATE` APPLY operation.
- [#1394](https://github.com/RediSearch/RediSearch/pull/1394): Expired documents (TTL) will be removed from the index.
- [#1394](https://github.com/RediSearch/RediSearch/pull/1394): [Optimization](https://oss.redislabs.com/redisearch/master/Configuring/#partial_indexed_docs) to avoid reindexing documents when non-indexed fields are updated.
- After [index creation](https://oss.redislabs.com/redisearch/Commands/#ftcreate), an initial scan starts for existing documents.  You can check the status of this scan by calling [`FT.INFO`](https://oss.redislabs.com/redisearch/Commands/#ftinfo) and looking at the `indexing` and `percent_indexed` values.  While `indexing` is true, queries return partial results.
- [#1435](https://github.com/RediSearch/RediSearch/pull/1435): `NOINITIALINDEX` flag on [`FT.CREATE`](https://oss.redislabs.com/redisearch/Commands/#ftcreate) to skip the initial scan of documents on index creation.
- [#1401](https://github.com/RediSearch/RediSearch/pull/1401): Support upgrade from v1.x and for reading RDB's created by RediSearch 1.x ([more information](https://oss.redislabs.com/redisearch/master/Upgrade_to_2.0/)).
- [#1445](https://github.com/RediSearch/RediSearch/pull/1445): Support for load event. This event indexes documents when they are loaded from RDB, ensuring that indexes are fully available when RDB loading is complete (available from Redis 6.0.7 and above).
- [#1384](https://github.com/RediSearch/RediSearch/pull/1384): [`FT.DROPINDEX`](https://oss.redislabs.com/redisearch/Commands/#ftdropindex), which by default does not delete documents underlying the index (see deprecated `FT.DROP`).
- [#1385](https://github.com/RediSearch/RediSearch/pull/1385): Add index definition to [`FT.INFO`](https://oss.redislabs.com/redisearch/master/Commands/#ftinfo) response.
- [#1097](https://github.com/RediSearch/RediSearch/pull/1097): Add Hindi snowball stemmer.
- The `FT._LIST` command returns a list of all available indices.  Note that this is a temporary command, as indicated by the `_` in the name, so it's not documented. We're working on a [`SCAN`](https://redis.io/commands/scan)-like command for databases with many indexes.
- The RediSearch version will appear in Redis as `20000`, which is equivalent to 2.0.0 in semantic versioning. Since the version of a module in Redis is numeric, we cannot explicitly add an GA flag.
- RediSearch 2.x requires Redis 6.0 or later.

### Behavior changes

Make sure you review these changes before upgrading to RediSearch 2.0:

- [#1381](https://github.com/RediSearch/RediSearch/pull/1381): `FT.SYNADD` is removed; use [`FT.SYNUPDATE`](https://oss.redislabs.com/redisearch/Commands/#ftsynupdate) instead. `FT.SYNUPDATE` requires both
and index name and a synonym group ID. This ID can be any ASCII string.
- [#1437](https://github.com/RediSearch/RediSearch/pull/1437): Documents that expire during query execution time will not appear in the results (but might have been counted in the number of produced documents).
- [#1221](https://github.com/RediSearch/RediSearch/pull/1221): Synonyms support for lower case. This can result in a different result set on FT.SEARCH when using synonyms.
- RediSearch will not index hashes whose fields do not match an existing index schema. You can see the number of hashes not indexed using [`FT.INFO`](https://oss.redislabs.com/redisearch/Commands/#ftinfo) - `hash_indexing_failures `.  The requirement for adding support for partially indexing and blocking is captured here: [#1455](https://github.com/RediSearch/RediSearch/pull/1455).
- Removed support for `NOSAVE` (for details see [v1.6 docs](https://oss.redislabs.com/redisearch/1.6/Commands/#ftadd)).
- RDB loading will take longer due to the index not being persisted.
- Field names in the [query syntax](https://oss.redislabs.com/redisearch/Query_Syntax/) are now case-sensitive.
- [Deprecated commands](https://oss.redislabs.com/redisearch/2.0/Commands/#deprecated_commands):
    - `FT.DROP` (replaced by `FT.DROPINDEX`, which by default keeps the documents)
    - `FT.ADD` (mapped to `HSET` for backward compatibility)
    - `FT.DEL` (mapped to `DEL` for backward compatibility)
    - `FT.GET` (mapped to `HGETALL` for backward compatibility)
    - `FT.MGET` (mapped to `HGETALL` for backward compatibility)
- Removed commands:
    - `FT.ADDHASH` (no longer makes sense)
    - `FT.SYNADD` (see [#1381](https://github.com/RediSearch/RediSearch/pull/1381))
    - `FT.OPTIMIZE` (see [v1.6 docs](https://oss.redislabs.com/redisearch/1.6/Commands/#ftoptimize))
