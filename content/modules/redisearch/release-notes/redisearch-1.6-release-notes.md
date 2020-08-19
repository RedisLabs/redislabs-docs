---
Title: RediSearch 1.6 Release Notes
description:
weight: 96
alwaysopen: false
categories: ["Modules"]
---
## RediSearch 1.6.13 (May 2020)

This is a maintenance release for version 1.6.

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Bugfixes:
    - #[1186](https://github.com/RediSearch/RediSearch/pull/1186) #[1188](https://github.com/RediSearch/RediSearch/pull/1188) incorrect values for `inverted_sz_mb` and `num_records` in `FT.INFO` command.

## RediSearch 1.6.12 (April 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Features:
    - #[1172](https://github.com/redisearch/redisearch/issues/1172) Added [`exists`](https://oss.redislabs.com/redisearch/Aggregations.html#list_of_string_apply_functions) function that can be used on conditional updates ([REPLACE PARTIAL](https://oss.redislabs.com/redisearch/Commands.html#ftadd)) to check if a field exists in the document.
- Minor Enhancements:
    - #[1172](https://github.com/redisearch/redisearch/issues/1172) Lazy evaluation of the right side of 'or'/'and' clauses in [IF condition](https://oss.redislabs.com/redisearch/Commands.html#parameters_1).
    - #[1134](https://github.com/redisearch/redisearch/issues/1134) Remove hard limit on LIMIT when using FT.SEARCH.
- Bugfixes:
    - #[1124](https://github.com/redisearch/redisearch/issues/1124) NOINDEX tag fields could not be updated on UPDATE PARTIAL with no indexed fields.
    - #[1120](https://github.com/redisearch/redisearch/issues/1120) Release loop in II_GetCriteriaTester which released the same criteria tester multiple times.
    - #[1161](https://github.com/redisearch/redisearch/issues/1161) Case where setting [MAXDOCTABLESIZE](https://oss.redislabs.com/redisearch/Configuring.html#maxdoctablesize) had no effect.
    - #[1169](https://github.com/redisearch/redisearch/issues/1169) [FIRST_VALUE](https://oss.redislabs.com/redisearch/Aggregations.html#first_value) reducer crashed when value did not exist.
    - #[1159](https://github.com/redisearch/redisearch/issues/1159) Infinite loop on [`NOT`](https://oss.redislabs.com/redisearch/Query_Syntax.html#search_query_syntax) criteria tester.%

## RediSearch 1.6.11 (March 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Bugfixes:
    - #[1126](https://github.com/redisearch/redisearch/issues/1126) Memory leak introduced by queries for tag fields that have no results.

## RediSearch 1.6.10 (March 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.
- This release fixes certain backwards compatibility issues compared to 1.4.  Although they are rare cases, it is recommended when upgrading to 1.6 to use this version or newer.

Details:

- Minor Enhancements:
    - #[1062](https://github.com/redisearch/redisearch/issues/1062) Added Custom stopwords list in [`FT.INFO`](https://oss.redislabs.com/redisearch/Commands.html#ftinfo)
- Fixed backwards incompatible issues:
    - #[1075](https://github.com/redisearch/redisearch/issues/1075) Fields should always be returned to the user as a string.
    - #[1074](https://github.com/redisearch/redisearch/issues/1074) Don't truncate possible integral values when printing.
    - #[1065](https://github.com/redisearch/redisearch/issues/1065) Revert "Change how generated reducer aliases are made".
- Bugfixes:
    - #[1085](https://github.com/redisearch/redisearch/issues/1085) Min and max value on non leaf nodes in the numeric tree should not be updated.
    - #[1106](https://github.com/redisearch/redisearch/issues/1106)  Pipe leak on `FORK GC` caused by closing the fork without holding the lock.
    - #[1114](https://github.com/redisearch/redisearch/issues/1114)  PR #[986](https://github.com/redisearch/redisearch/issues/986) reverted the work from #[985](https://github.com/redisearch/redisearch/issues/985), #[989](https://github.com/redisearch/redisearch/issues/989). This PR reintroduces these features.

## RediSearch 1.6.9 (February 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Bugfixes:
    - #[1052](https://github.com/redisearch/redisearch/issues/1052) Remove wrong optimization on Quantile.
    - #[1057](https://github.com/redisearch/redisearch/issues/1057) Memory pool did not release memory when certain limit was reached.

## RediSearch 1.6.8 (February 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Bugfixes:
    - #[1052](https://github.com/redisearch/redisearch/issues/1052) Remove wrong optimization on Quantile.
    - #[1057](https://github.com/redisearch/redisearch/issues/1057) Memory pool did not release memory when certain limit was reached.

## RediSearch 1.6 GA (1.6.7 - January 2020)

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
