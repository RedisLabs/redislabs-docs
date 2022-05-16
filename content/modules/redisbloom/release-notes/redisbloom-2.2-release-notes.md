---
Title: RedisBloom 2.2 release notes
linkTitle: v2.2 (December 2019)
description: BF.INFO returns bloom filter details. CF.INFO returns cuckoo filter details. Scalable bloom and cuckoo filters. Configurable bucket size for cuckoo filters. CMS.INCRBY returns count.
min-version-db: "4.0.0"
min-version-rs: "5.0.0"
weight: 97
alwaysopen: false
categories: ["Modules"]
---
## Requirements

RedisBloom v2.2.15 requires:

- Minimum Redis compatibility version (database): 4.0.0
- Minimum Redis Enterprise Software version (cluster): 5.0.0

## v2.2.15 (May 2022)

This is a maintenance release for RedisBloom 2.2.

Update urgency: None.

Details:

- Enhancements:

    - Added support for RedisBloom for AArch64 Linux

## v2.2.14 (March 2022)

This is a maintenance release for RedisBloom 2.2.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

    - [#419](https://github.com/RedisBloom/RedisBloom/pull/419) [`CMS.INCRBY`](https://oss.redis.com/redisbloom/CountMinSketch_Commands/#cmsincrby) now returns an error on overflow
    - [#412](https://github.com/RedisBloom/RedisBloom/pull/412) Fixed macOS build

## v2.2.12 (February 2022)

This is a maintenance release for RedisBloom 2.2.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

    - [#392](https://github.com/RedisBloom/RedisBloom/pull/392) Fixed a potential crash on Bloom filter expansion when loading from [AOF](https://redis.io/topics/persistence)
    - [#404](https://github.com/RedisBloom/RedisBloom/pull/404) Fixed a potential crash on Cuckoo filter when calling [`CF.LOADCHUNK`](https://oss.redis.com/redisbloom/Cuckoo_Commands/#cfloadchunk) on a filter with `EXPANSION` greater than 1

## v2.2.9 (November 2021)

This is a maintenance release for RedisBloom 2.2.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

    - [#281](https://github.com/RedisBloom/RedisBloom/pull/281) Memory leak when loading TOPK keys from RDB.

    - [#303](https://github.com/RedisBloom/RedisBloom/pull/303) `CMS.INCRBY` for negative or non-number

    - [#354](https://github.com/RedisBloom/RedisBloom/pull/354) TOPK List Duplicate entries

    - [#369](https://github.com/RedisBloom/RedisBloom/pull/369) Free only latest filter on `CF.COMPACT`

    - [#371](https://github.com/RedisBloom/RedisBloom/pull/371) `CF.SCANDUMP` for cuckoo filter
 
    - [#374](https://github.com/RedisBloom/RedisBloom/pull/374) ReplicateVerbatim for `CF.LOADCHUNK` (similar to [#309](https://github.com/RedisBloom/RedisBloom/pull/309))

- Improvements:

    - [#331](https://github.com/RedisBloom/RedisBloom/pull/331) Add `WITHCOUNT` flag to `TOPK.LIST`

## v2.2.6 (August 2021)

This is a maintenance release for version 1.0.

Update urgency: `LOW` -  No need to upgrade unless there are new features you want to use.

Details:
- Enhancements:
    - #[333](https://github.com/redisbloom/redisbloom/issues/333) Support inter shards TLS capability

## v2.2.4 (July 2020)

Headlines:

- This release improves overall stability and provides fixes for found issues.

Details:

- Bug fixes:
    - #[215](https://github.com/redisbloom/redisbloom/issues/215) Count-Min-Sketch CMS.INCRBY command to reply with correct min result.
    - #[219](https://github.com/redisbloom/redisbloom/issues/219) Cuckoo Filter CF.DEBUG correct response formatting.

## v2.2.3 (July 2020)

Headlines:

- This release improves overall stability and provides fixes for found issues.

Details:

- Bug fixes:
    - [#217](https://github.com/RedisBloom/RedisBloom/pull/217) Client hung on `BF.INSERT` with multiple new items when a non-scaling filter is full.

## v2.2.2 (March 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor enhancements:
    - Bloom
        - #[180](https://github.com/redisbloom/redisbloom/issues/180) Removed the upper limit on Bloom Filter capacity.

## v2.2.1 (January 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor Enhancements:
    - Bloom
        - #[179](https://github.com/RedisBloom/RedisBloom/issues/179) Allow storing filters with size over 4294967295 (UINT32_MAX). Now 64 bits.
        - #[177](https://github.com/RedisBloom/RedisBloom/issues/177) Prevent passing both `EXPANSION` *and* `NONSCALING` parameters to `BF.RESERVE`.

## v2.2.0 (December 2019)

- Added functionality
    - Bloom
        - #[149](https://github.com/RedisBloom/RedisBloom/issues/149) `BF.INFO` returns [details](https://oss.redislabs.com/redisbloom/Bloom_Commands/#bfinfo) about a specific bloom filter
        - Scalable
            - #[153](https://github.com/RedisBloom/RedisBloom/issues/153) [Ability to change](https://oss.redislabs.com/redisbloom/Bloom_Commands/#bfreserve) the `EXPANSION` rate. This means each subsequent sub-filter will be `expansion` times larger as the previous one.
            - #[160](https://github.com/RedisBloom/RedisBloom/issues/160) Optimise the scaling up of filter according to the [Scalable Bloom Filter](https://core.ac.uk/download/pdf/55607643.pdf) paper
            - #[161](https://github.com/RedisBloom/RedisBloom/issues/161) [Optional](https://oss.redislabs.com/redisbloom/Bloom_Commands/#bfreserve) `NONSCALING` argument to disable scaling.  (This saves space since less hash functions are used)
        - #[155](https://github.com/RedisBloom/RedisBloom/issues/155) Disabling rounding up functionality
    - Cuckoo
        - #[149](https://github.com/RedisBloom/RedisBloom/issues/149) `CF.INFO` returns [details](https://oss.redislabs.com/redisbloom/Cuckoo_Commands/#cfinfo) about a specific cuckoo filter
        - Scalable
            - #[138](https://github.com/RedisBloom/RedisBloom/issues/138) [Configurable](https://oss.redislabs.com/redisbloom/Cuckoo_Commands/#cfreserve) `EXPANSION`. When an additional filter is created, its size will be the size of the current filter multiplied by the `expansion`.  Higher expansion rates will result in lower error rates.
            - #[142](https://github.com/RedisBloom/RedisBloom/issues/142) The maximum number of expansions limited to 32.
            - #[131](https://github.com/RedisBloom/RedisBloom/issues/131) [Configurable](https://oss.redislabs.com/redisbloom/Cuckoo_Commands/#cfreserve) `MAXITERATIONS`. Number of attempts to swap buckets before declaring filter as full and creating an additional filter.
        - #[135](https://github.com/RedisBloom/RedisBloom/issues/135)  [Configurable](https://oss.redislabs.com/redisbloom/Cuckoo_Commands/#cfreserve)  `BUCKETSIZE`. Number of items in each bucket. Higher bucket size value improves the fill rate but result in a higher error rate and slightly slower operation speed.
        - #[142](https://github.com/RedisBloom/RedisBloom/issues/142) use of 64bit hash function
        - #[136](https://github.com/RedisBloom/RedisBloom/issues/136) expose compaction of filters in the API
    - CMS
        - #[97](https://github.com/RedisBloom/RedisBloom/issues/97) `CMS.INCRBY` [returns count](https://oss.redislabs.com/redisbloom/CountMinSketch_Commands/#cmsincrby) instead of ‘OK’

- Minor bug fixes
    - Bloom
        - #[154](https://github.com/RedisBloom/RedisBloom/issues/154) Check error rate is 1< (cannot be equal)
    - Cuckoo
        - #[134](https://github.com/RedisBloom/RedisBloom/issues/134) Added `CuckooInsert_MemAllocFailed` exception
        - #[130](https://github.com/RedisBloom/RedisBloom/issues/130) Number of deletes wasn’t saved to RDB
    - General
        - #[117](https://github.com/RedisBloom/RedisBloom/issues/117) Using `RMUtil_RegisterWriteDenyOOMCmd`
        - #[121](https://github.com/RedisBloom/RedisBloom/issues/121) Moved `ReplicaVerbatim` to end of functions
