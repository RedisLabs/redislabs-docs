---
Title: RedisBloom 2.2 Release Notes
description:
weight: 97
alwaysopen: false
categories: ["Modules"]
---
## RedisBloom 2.2.4 (July 2020)

Headlines:

- This release improves overall stability and provides fixes for founded issues.

Details:

- Bugfix:
    - #[215](https://github.com/redisbloom/redisbloom/issues/215) Count-Min-Sketch CMS.INCRBY command to reply with correct min result.
    - #[219](https://github.com/redisbloom/redisbloom/issues/219) Cuckoo Filter CF.DEBUG correct response formatting.

## RedisBloom 2.2.2 (March 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor enhancements:
    - Bloom
        - #[180](https://github.com/redisbloom/redisbloom/issues/180) Removed the upper limit on Bloom Filter capacity.

## RedisBloom 2.2.1 (January 2020)

Headlines:

- This release improves overall stability and provides fixes for issues found after the previous release.

Details:

- Minor Enhancements:
    - Bloom
        - #[179](https://github.com/RedisBloom/RedisBloom/issues/179) Allow storing filters with size over 4294967295 (UINT32_MAX). Now 64 bits.
        - #[177](https://github.com/RedisBloom/RedisBloom/issues/177) Prevent passing both `EXPANSION` *and* `NONSCALING` parameters to `BF.RESERVE`.

## RedisBloom 2.2.0 (December 2019)

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

- Minor Bugfixes
    - Bloom
        - #[154](https://github.com/RedisBloom/RedisBloom/issues/154) Check error rate is 1< (cannot be equal)
    - Cuckoo
        - #[134](https://github.com/RedisBloom/RedisBloom/issues/134) Sdded `CuckooInsert_MemAllocFailed` exception
        - #[130](https://github.com/RedisBloom/RedisBloom/issues/130) Number of deletes wasn’t saved to RDB
    - General
        - #[117](https://github.com/RedisBloom/RedisBloom/issues/117) Using `RMUtil_RegisterWriteDenyOOMCmd`
        - #[121](https://github.com/RedisBloom/RedisBloom/issues/121) Moved `ReplicaVerbatim` to end of functions
