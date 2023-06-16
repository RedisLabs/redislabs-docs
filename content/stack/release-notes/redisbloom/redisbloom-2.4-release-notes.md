---
Title: RedisBloom 2.4 release notes
linkTitle: v2.4 (November 2022)
description: Added t-digest - a probabilistic data structure for estimating quantiles based on a data stream or a large dataset of floating-point values.
min-version-db: "6.0.16"
min-version-rs: "6.2.8"
weight: 96
alwaysopen: false
categories: ["Modules"]
aliases: /modules/redisbloom/release-notes/redisbloom-2.4-release-notes/
---
## Requirements

RedisBloom v2.4.5 requires:

- Minimum Redis compatibility version (database): 6.0.16
- Minimum Redis Enterprise Software version (cluster): 6.2.8

## v2.4.5 (April 2023)

This is a maintenance release for RedisBloom 2.4.

Update urgency: `LOW`: No need to upgrade unless there are new features you want to use.

Details:

- Improvements:

  - Internal changes for supporting future Redis Enterprise releases

## v2.4.4 (February 2023)

This is a maintenance release for RedisBloom 2.4.

Update urgency: `MODERATE`: Program an upgrade of the server, but it's not urgent.

Details:

- Bug fixes:

  - [#609](https://github.com/RedisBloom/RedisBloom/issues/609) [CF.INFO](https://redis.io/commands/cf.info/) - incorrect information for large filters

- Improvements:

  - [#389](https://github.com/RedisBloom/RedisBloom/issues/389) Introduce [BF.CARD](https://redis.io/commands/bf.card/) to retrieve the cardinality of a Bloom filter or 0 when such key does not exist

## v2.4 GA (v2.4.3) (November 2022)

This is the General Availability release of RedisBloom 2.4.

### Highlights

RedisBloom 2.4 introduces a new sketch data structure: **t-digest**.

### What's new in 2.4

[t-digest](https://www.sciencedirect.com/science/article/pii/S2665963820300403) is a probabilistic data structure for estimating quantiles based on a data stream or a large dataset of floating-point values. It can be used to answer the following questions:

- What fraction of the values in the data stream are smaller than a given value?
- How many values in the data stream are smaller than a given value?
- Which value is smaller than _p_ percent of the values in the data stream? (what is the _p_-percentile value)?
- What is the mean value between the _p1_-percentile value and the _p2_-percentile value?
- What is the value of the _n_-th smallest / largest value in the data stream? (what is the value with [reverse] rank _n_)?

As for any other probabilistic data structures, t-digest requires sublinear space and has controllable space-accuracy tradeoffs.

Using t-digest is simple and straightforward:

* **Creating a sketch and adding observations**

  `TDIGEST.CREATE key [COMPRESSION compression]` initializes a new t-digest sketch (and errors if the key already exists). The `COMPRESSION` argument is used to specify the tradeoff between accuracy and memory consumption. The default is 100. Higher values mean more accuracy.

  `TDIGEST.ADD key value...` adds new observations (floating-point values) to the sketch. You can repeat calling [TDIGEST.ADD](https://redis.io/commands/tdigest.add/) whenever new observations are available.

* **Estimating fractions or ranks by values**

  Use `TDIGEST.CDF key value...` to retrieve, for each input **value**, an estimation of the **fraction** of (observations **smaller** than the given value + half the observations equal to the given value).

  `TDIGEST.RANK key value...` is similar to [TDIGEST.CDF](https://redis.io/commands/tdigest.cdf/), but used for estimating the number of observations instead of the fraction of observations. More accurately it returns, for each input **value**, an estimation of the **number** of (observations **smaller** than a given value + half the observations equal to the given value).

  And lastly, `TDIGEST.REVRANK key value...` is similar to [TDIGEST.RANK](https://redis.io/commands/tdigest.rank/), but returns, for each input **value**, an estimation of the **number** of (observations **larger** than a given value + half the observations equal to the given value).

* **Estimating values by fractions or ranks**

  `TDIGEST.QUANTILE key fraction...` returns, for each input **fraction**, an estimation of the **value** (floating point) that is **smaller** than the given fraction of observations.

  `TDIGEST.BYRANK key rank...` returns, for each input **rank**, an estimation of the **value** (floating point) with that rank.

  `TDIGEST.BYREVRANK key rank...` returns, for each input **reverse rank**, an estimation of the **value** (floating point) with that reverse rank.

* **Estimating trimmed mean**

  Use `TDIGEST.TRIMMED_MEAN key lowFraction highFraction` to retrieve an estimation of the mean value between the specified fractions.

  This is especially useful for calculating the average value ignoring outliers. For example, calculating the average value between the 20th percentile and the 80th percentile.

* **Merging sketches**

  Sometimes it is useful to merge sketches. For example, suppose we measure latencies for 3 servers, and we want to calculate the 90%, 95%, and 99% latencies for all the servers combined.

  `TDIGEST.MERGE destKey numKeys sourceKey... [COMPRESSION compression] [OVERRIDE]` merges multiple sketches into a single sketch.

  If `destKey` does not exist, a new sketch is created.

  If `destKey` is an existing sketch, its values are merged with the values of the source keys. To override the destination key contents, use `OVERRIDE`.

* **Retrieving sketch information**

  Use `TDIGEST.MIN` key and `TDIGEST.MAX key` to retrieve the minimal and maximal values in the sketch, respectively.

  Both return NaN (Not a Number) when the sketch is empty.

  Both commands return accurate results and are equivalent to `TDIGEST.BYRANK key 0` and `TDIGEST.BYREVRANK key 0` respectively.

  Use `TDIGEST.INFO key` to retrieve some additional information about the sketch.

* **Resetting a sketch**

  `TDIGEST.RESET key` empties the sketch and reinitializes it.
