---
Title: RedisTimeSeries 1.4 Release Notes
description:
weight: 98
alwaysopen: false
categories: ["Modules"]
---
## RedisTimeSeries 1.4 GA (1.4.5 - September 2020)

This is the General Availability release for RedisTimeSeries 1.4.

Highlights:

**Ability to backfill time series!** You can now add samples to a time series where the time of the sample is older than the newest sample in the series. This enables:

- [Adding](https://oss.redislabs.com/redistimeseries/commands/#tsadd) out of order of samples to time series.
- Batch loading of historical samples into an existing series.
- Updating existing samples (for example for compliance reasons).

This has been the most requested feature for RedisTimeSeries. We look forward to your feedback so we can move to a general availability release soon.

Details:

- Added functionality:
    - [#254](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/254) TS.REVRANGE and TS.MREVRANGE [commands] allow for querying in descending order of Timestamps.
    (https://oss.redislabs.com/redistimeseries/1.4/commands/#tsmrangetsmrevrange)
    - [#503](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/503) - RDB saves the whole chunk instead of individual samples giving a speed and space improvement when saving or loading an RDB file
    - [#502](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/502) - The ability to set, at creation time, the data section size of each chunk using flag `CHUNK_SIZE`. TS.INFO uses `chunkSize` instead of `maxSamplesPerChunk`.
    - [#437](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/437) Allow backfilling of samples and updating of existing samples
        - Works with [compressed](https://redislabs.com/blog/redistimeseries-version-1-2-is-here/) and uncompressed series.
        - This comes with a performance hit when a sample is written out-of-order. We will publish numbers once we are generally available, but are still considering optimisations.
    - [#521](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/521) [DUPLICATE_POLICY](https://oss.redislabs.com/redistimeseries/configuration/#duplicate_policy) allows to configure on [module](https://oss.redislabs.com/redistimeseries/configuration/#duplicate_policy), [series](https://oss.redislabs.com/redistimeseries/commands/#tscreate) and [sample](https://oss.redislabs.com/redistimeseries/commands/#tsadd) level how to handle duplicate samples. A duplicate sample is a sample for which the series holds already a sample on the same timestamp. Note that the default behaviour is equal to v1.2: `BLOCK`

Notes:
The version inside Redis will be 10405 or 1.4.5 in semantic versioning. Since the version of a module in Redis is numeric, we could not add an GA flag.
