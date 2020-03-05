---
Title: RedisTimeSeries 1.2 Release Notes
description:
weight: 99
alwaysopen: false
categories: ["Modules"]
---
## RedisTimeSeries 1.2 GA (1.2.2)

This is the General Availability Release of RedisTimeSeries 1.2 (1.2.2)!

Headlines:

- Compression added which can reduce memory up to 98% and improve read performance up to 50%.
- Stable ingestion time independent of the number of the data points on a time-series.
- Reviewed API with performance improvements and removed ambiguity.
- Extended [client support](https://oss.redislabs.com/redistimeseries/#client-libraries)

(we will blog about this release soon including performance improvements results and the link here)

Full details:

- Added functionality
    - #[261](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/261) Samples are compressed using `Double Delta compression` which results in cost savings and faster query times.
    - Based on the [Gorilla paper](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf).
        - In theory, this can save space up to 98%. (2 bits per sample in stead of 128).
        - In practice, a memory reduction of 5-8x is common but depends on the use case.
    - Initial benchmarks show 94% memory savings and performance improvements in reads up to XX%.
    - `UNCOMPRESSED` [option](https://oss.redislabs.com/redistimeseries/commands/#tscreate) in `TS.CREATE`.

- API changes / Enhancements
    - #[241](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/241) Overwriting the last sample with the same timestamp is not allowed.
    - #[242](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/242) [revised](https://oss.redislabs.com/redistimeseries/commands/#tsincrbytsdecrby) `TS.INCRBY/DECRBY`
    - Returns a timestamp.  The behaviour is now aligned with `TS.ADD`.
    - The `RESET` functionality was removed. `RESET` contradicted the rewriting of the last sample (#[241](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/241)).
    Alternatively, you can reconstruct similar behaviour by
        - `TS.ADD ts * 1` + `sum` aggregation
        - `TS.INCRBY ts 1` + `range` aggregation
    - #[317](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/317) Aligning response on empty series of `TS.GET` with `TS.RANGE`.
    - #[285](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/285) #[318](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/318) Changed default behaviour of  [`TS.MRANGE`](https://oss.redislabs.com/redistimeseries/commands/#tsmrange) and  [`TS.MGET`](https://oss.redislabs.com/redistimeseries/commands/#tsmget) to no longer returns the labels of each time-series in order reduce network traffic. Optional `WITHLABELS` argument added.
    - #[319](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/319) `TS.RANGE` and `TS.MRANGE` aggregation starting from requested timestamp.

- Performance improvements
    - #[237](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/237) Downsampling after time window is closed vs. downsampling with each sample.
    - #[285](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/285) #[318](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/318) Optional `WITHLABELS` argument added.  This feature improves read performance drastically.

- Minor Enhancements
    - #[230](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/230) `TS.INFO` now [includes](https://oss.redislabs.com/redistimeseries/commands/#tsinfo) `total samples`, `memory usage`,`first time stamp`, ...
    - #[230](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/230) `MEMORY` calculates series memory footprint.

- Bugfixes since 1.0.3
    - #[204](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/204) Module initialization params changed to 64 bits.
    - #[266](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/266) Memory leak in the aggregator context.
    - #[260](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/260) Better error messages.
    - #[259](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/259) #[257](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/257) #[219](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/219) Miscellaneous.
    - #[320](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/320) Delete the existing key prior to restoring it.
    - #[323](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/323) Empty first sample on aggregation.

note: the version inside Redis will be 10202 or 1.2.2 in semantic versioning.
