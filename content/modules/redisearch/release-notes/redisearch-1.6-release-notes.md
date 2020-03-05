---
Title: RediSearch 1.6 Release Notes
description:
weight: 96
alwaysopen: false
categories: ["Modules"]
---

## RediSearch 1.6 GA (1.6.7)

This is the General Availability Release of RediSearch 1.6!

Headlines:

- Several performance improvements increasing full-text search queries up to 60% and aggregation queries up to 73%.
- Support for Aliasing of indices.
- Low-level API in C (and [Rust bindings](https://github.com/RediSearch/redisearch-api-rs)) to make RediSearch embeddable in other Redis modules. [RedisGraph](redisgraph.io) is the first GA consumer.
- Forked process Garbage Collection (FORK GC) allows for stable read latencies.

Full details:

- Added functionality
    - #[658](https://github.com/RediSearch/RediSearch/issues/658) `FT.ADD … REPLACE … NOCREATE` will not add the document if the document does not exist.
    - #[575](https://github.com/RediSearch/RediSearch/issues/575) Add index aliasing. This allows users to provide (or remove) ‘links’ to indexes. The commands are `FT.ALIASADD`, `FT.ALIASDEL`, and `FT.ALIASUPDATE`. [See documentation for full details](https://oss.redislabs.com/redisearch/Commands.html#ftaliasadd)
    - New C API to make RediSearch embeddable in other Redis modules. This API allows other Redis modules to use functionality of RedisSearch without actually having the “module” functionality active. Note that this must still be used on Redis proper. Modules that are already incorporating this API
    - [RedisGraph](https://github.com/RedisGraph/RedisGraph/releases/tag/2.0.0) GA
    - [RedisTimeSeries](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/186) (WIP)
    - [RedisJSON](https://github.com/RedisJSON/RedisJSON2) (WIP)

- Performance improvements
    - Improve performance when using many union (|) iterators
    - Improve performance when using many intersect iterators
    - Improve overall index reading performance
    - #[598](https://github.com/RediSearch/RediSearch/issues/598) Do not return `foo: NULL` if `foo` is not present in the document. This conserves network bandwidth

- Bugfixes - Semantics
    - #[688](https://github.com/RediSearch/RediSearch/issues/688) #[623](https://github.com/RediSearch/RediSearch/issues/623) Fix various issues with optional (~) search operator:
        - Fixes omitted results when using union operators in addition to optional iterators.
        - Allow optional iterator to be used in isolation in promotion-only mode (without a filter query)
        - Fix issue where weight attribute was being ignored
    - #[653](https://github.com/RediSearch/RediSearch/issues/653) FT.GET will no longer return a document as existing if it was not added by FT.ADD, even if the document exists in the server as a plain redis hash
    - FT.AGGREGATE is now more stringent with its semantics, avoiding nonsensical queries or referencing fields which do not exist in the schema or LOADed.
    - #[779](https://github.com/RediSearch/RediSearch/issues/779) Added `to_number()` and `to_str()` functions for ambiguity reasons
    - #[906](https://github.com/RediSearch/RediSearch/issues/906) A description of how scores were calculated can be added by adding 'EXPLAINSCORE'
    - #[897](https://github.com/RediSearch/RediSearch/issues/897) `FORK GC` has now lowest priority over indexing and read queries
    - Added automated tests to ensure macOs build works

- Bugfixes - Crash/Stability
    - Improved overall architectural stability
    - #[666](https://github.com/RediSearch/RediSearch/issues/666) Fix crash when conflict between internal key name and user key name is encountered; e.g. creating a new document with `ft:two/two`
    - #[697](https://github.com/RediSearch/RediSearch/issues/697) #[588](https://github.com/RediSearch/RediSearch/issues/588) Fix memory leaks
    - #[691](https://github.com/RediSearch/RediSearch/issues/691) Fix crash on `FT.EXPLAIN`
    - Proper module-level and index-level cleanup functionality
    - Simplified concurrency model
    - #[898](https://github.com/RediSearch/RediSearch/issues/898) Fix rare issue where `FORK GC` doesn't exists on termination of Redis
    - #[865](https://github.com/RediSearch/RediSearch/issues/865) When using `FT.SEARCH` with `SORTBY`, it will only be possible to sort by one field
    - #[917](https://github.com/RediSearch/RediSearch/issues/917) Fix wrong results introduced in a skip optimisation
    - #[888](https://github.com/RediSearch/RediSearch/issues/888) `NULL` terms cause `FORK` GC to crash
    - #[887](https://github.com/RediSearch/RediSearch/issues/887) Chinese searches not being converted to simplified Chinese.
    - Fix `FORK GC` issue where read from pipe did not returned all the data
