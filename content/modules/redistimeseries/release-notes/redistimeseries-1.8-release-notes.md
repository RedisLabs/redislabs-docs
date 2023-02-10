---
Title: RedisTimeSeries 1.8 release notes
linkTitle: v1.8 (November 2022)
description: Added a time-weighted average aggregator, gap filling, ability to control bucket timestamps, ability to control alignment for compaction rules, new reducer types, and ability to include the latest (possibly partial) raw bucket samples when retrieving compactions
min-version-db: "6.0.16"
min-version-rs: "6.2.8"
weight: 96
alwaysopen: false
categories: ["Modules"]
---
## Requirements

RedisTimeSeries v1.8.5 requires:

- Minimum Redis compatibility version (database): 6.0.16
- Minimum Redis Enterprise Software version (cluster): 6.2.8

## v1.8.5 (January 2023)

This is a maintenance release for RedisTimeSeries 1.8.

Update urgency: `HIGH`: There is a critical bug that may affect a subset of users. Upgrade!

Details:

- Bug fixes:

    - [#1388](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/1388) Potential crash when upgrading from v1.6 to 1.8 if there are compactions with `min` or `max` aggregation (MOD-4695)

## v1.8.4 (December 2022)

This is a maintenance release for RedisTimeSeries 1.8.

Update urgency: `HIGH`: There is a critical bug that may affect a subset of users. Upgrade!

Details:

- Bug fixes:

    - [#1360](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/1360) Potential crash when upgrading from v1.6 to 1.8 if there are compactions with `min` or `max` aggregation (MOD-4559)
    - [#1370](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/1370) Potential crash when using [TS.REVRANGE](https://redis.io/commands/ts.revrange/) or [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/) with aggregation
    - [#1347](https://github.com/RedisTimeSeries/RedisTimeSeries/pull/1347) When adding samples with [TS.ADD](https://redis.io/commands/ts.add/) or [TS.MADD](https://redis.io/commands/ts.madd/) using  `*` as timestamp, the timestamp could differ between master and replica shards

- Improvements:
    - [#1215](https://github.com/RedisTimeSeries/RedisTimeSeries/issues/1215) OSS cluster: Support TLS and IPv6; introduce new configuration parameter: [OSS_GLOBAL_PASSWORD](https://redis.io/docs/stack/timeseries/configuration/#oss_global_password)


## v1.8 GA (v1.8.3) (November 2022)

This is the General Availability release of RedisTimeSeries 1.8.

### Highlights

RedisTimeSeries 1.8 introduces seven highly requested features, performance improvements, and bug fixes.

### What's new in 1.8

* **Optionally retrieving aggregation results for the latest (still open) bucket for compactions**

  Till version 1.8, when a time series is a compaction, [TS.GET](https://redis.io/commands/ts.get/), [TS.MGET](https://redis.io/commands/ts.mget/), [TS.RANGE](https://redis.io/commands/ts.range/), [TS.REVRANGE](https://redis.io/commands/ts.revrange/), [TS.MRANGE](https://redis.io/commands/ts.mrange/), and [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/) did not report the compacted value of the latest bucket. The reason is that the data in the latest bucket of a compaction is still partial. A bucket is ‘closed’ and compacted only upon the arrival of data that ‘opens’ a ‘new latest’ bucket.

  There are use cases, however, where the compaction of the latest bucket should be retrieved as well. For example, a user may want to receive the count of events since the start of the decade, and the retention period for raw data is only one month. Till version 1.8, the user would have to run two queries - one on a compaction and one on the latest raw data, and then sum the results. Since version 1.8, by specifying `LATEST`, it is possible to retrieve the latest (possibly partial) bucket as well.

  To report aggregations for the latest bucket, use the new optional `LATEST` flag to [TS.GET](https://redis.io/commands/ts.get/), [TS.MGET](https://redis.io/commands/ts.mget/), [TS.RANGE](https://redis.io/commands/ts.range/), [TS.REVRANGE](https://redis.io/commands/ts.revrange/), [TS.MRANGE](https://redis.io/commands/ts.mrange/), and [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/).

* **Optionally retrieving aggregation results for empty buckets**

  The commands [TS.RANGE](https://redis.io/commands/ts.range/), [TS.REVRANGE](https://redis.io/commands/ts.revrange/), [TS.MRANGE](https://redis.io/commands/ts.mrange/), and [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/) have an optional `[AGGREGATION aggregator bucketDuration]` parameter. When this parameter is specified, raw reports are aggregated per bucket.

  Till version 1.8, results were not reported for empty buckets. With `EMPTY`, it is now possible to report aggregations for empty buckets as well.

  The two primary reasons for wanting to retrieve values for empty buckets:

  - It is easier to align results from similar queries over multiple time series

  - It is easier to use the retrieved results with some external tools (e.g., charting tools)

  For the `sum` and `count` aggregators, the value 0 is reported for empty buckets.

  For the `min`, `max`, `range`, `avg`, `first`, `std.p`, and `std.s` aggregators, the value NaN (not a number) is reported.

  For the `last` aggregator and the new `twa` aggregator, the `EMPTY` flag is used for gap filling (see below).

  To report aggregations for empty buckets, use the new optional `EMPTY` flag in [TS.RANGE](https://redis.io/commands/ts.range/), [TS.REVRANGE](https://redis.io/commands/ts.revrange/), [TS.MRANGE](https://redis.io/commands/ts.mrange/), and [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/).

  Regardless of the values of `fromTimestamp` and `toTimestamp`, no data is reported for empty buckets that end before the earliest sample or begin after the latest sample in the time series.

* **A new aggregator: time-weighted average**

  When a time series holds discrete samples of a continuous signal (e.g., temperature), using `avg` to estimate the average value over a given timeframe would produce a good estimate only when the signal is sampled at constant intervals. If, however, samples are available at non-constant intervals (e.g., when some samples are missing), the `twa` aggregator produces a more accurate estimate by averaging samples over time instead of simply averaging the samples.

  {{<image filename="images/modules/twa.png" alt="A graph showing the difference between average and time-weighted average.">}}{{</image>}}

  This is an extreme example: the signal in the diagram above has 4 samples in its ‘high’ value and 13 samples in its ‘low’ value. However, the period in each of those states is about the same. It is easy to see that the simple average (avg) of all the 17 samples does not represent the signal’s average over time.

  Time-weighted average (`twa`) adds weight to each sample. The weight is proportional to the time interval that the sample represents. In the diagram, the time-weighted average over the whole period assigns appropriate weight to each sample, so the result represents the signal’s average value over the whole period much more accurately.

* **Gap filling: optionally interpolate or repeat last value for empty buckets**

  Gap filling is performed when using `EMPTY` together with either `last` or `twa` aggregator.

  Using `EMPTY` with the `twa` aggregator allows us to estimate the average of a continuous signal even for buckets where no samples were collected (gap-filling).

  {{<image filename="images/modules/GapFilling.png" alt="A graph that illustrates gap-filling.">}}{{</image>}}

  Consider we want to use [TS.RANGE](https://redis.io/commands/ts.range/) to calculate the average value of each bucket (p1, p2, p3 in the diagram above). Using avg, the value reported for bucket p2 would be NaN, as this bucket contains no samples. If we use `EMPTY` with `twa`, on the other hand, the average value for bucket p2 would be calculated based on the linear interpolation of the value left of p2 and the value right of p2.

  When sampling a continuous signal, we can use this ‘gap-filling’ capability to calculate the average value of the signal over equal-width buckets without concern about bucket alignment or missing samples.

  Using `EMPTY` with the last aggregator allows filling empty buckets by repeating the value of the previous sample. This is useful, for example, when values in the time series represent stock prices and the price has not been changed during a bucket’s timeframe.

* **Ability to control how bucket timestamps are reported**

  Till version 1.8, [TS.RANGE](https://redis.io/commands/ts.range/), [TS.REVRANGE](https://redis.io/commands/ts.revrange/), [TS.MRANGE](https://redis.io/commands/ts.mrange/), and [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/) returned the start time of each reported bucket as its timestamp.

  Changing this behavior and reporting each bucket’s start time, end time, or mid-time is now possible. This is required in many use cases. For example, when drawing bars in trading applications, annotating each bar with the end timestamp of the bucket it represents is very common.

  The way bucket timestamps are reported can be specified with the new optional `BUCKETTIMESTAMP` parameter of [TS.RANGE](https://redis.io/commands/ts.range/), [TS.REVRANGE](https://redis.io/commands/ts.revrange/), [TS.MRANGE](https://redis.io/commands/ts.mrange/), and [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/):

  `-` or `low`: the bucket's start time (default)

  `+` or `high`: the bucket's end time

  `~` or `mid`: the bucket's mid-time (rounded down if not an integer)

* **Ability to control alignment for compaction rules**

  Till version 1.8, compaction rules could not be aligned. One could specify a compaction rule with 24-hour buckets, and as a result, each bucket would aggregate events from midnight till the next midnight. The first bucket always started at the epoch and all other buckets were aligned accordingly.

  But what if we want to aggregate daily events from 06:00 to 06:00 the next day? We can now specify alignment for compaction rules.

  Alignment can be specified with the new optional `alignTimestamp` parameter of [TS.CREATERULE](https://redis.io/commands/ts.createrule/) and the [COMPACTION_POLICY](https://redis.io/docs/stack/timeseries/configuration/#compaction_policy) configuration parameter. Specifying `alignTimestamp` ensures that there is a bucket that starts exactly at `alignTimestamp` and all other buckets are aligned accordingly. `alignTimestamp` is expressed in milliseconds. The default value is 0 (aligned with the epoch).

* **New reducers**

  Till version 1.8, only the `sum`, `min`, and `max` could be used as reducer types.

  It is now possible, for example, to calculate the maximal temperature per timeframe for each sensor and then report the average temperature (avg reducer) over groups of sensors (grouped by a given label's value).

  This can be specified with the new reducer types ([TS.MRANGE](https://redis.io/commands/ts.mrange/) and [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange/)): `avg`, `range`, `count`, `std.p`, `std.s`, `var.p`, and `var.s`.

{{<note>}}
New RDB version (v7). RDB files created with v1.8.3 are not backward compatible. 
{{</note>}}
