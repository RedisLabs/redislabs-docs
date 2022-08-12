---
Title: RedisTimeSeries commands 
linkTitle: Commands 
description: Lists RedisTimeSeries commands and provides links to the command reference pages.
weight: 25
alwaysopen: false
toc: "false"
categories: ["Modules"]
---

The following table lists RedisTimeSeries commands. See the command links for more information about each command's syntax, arguments, and examples.

| Command | Description |
|---------|-------------|
| [TS.ADD](https://redis.io/commands/ts.add) | Appends a sample to a time series. |
| [TS.ALTER](https://redis.io/commands/ts.alter) | Updates the retention, chunk size, duplicate policy, or labels for an existing time series. |
| [TS.CREATE](https://redis.io/commands/ts.create) | Creates a new time series. |
| [TS.CREATERULE](https://redis.io/commands/ts.createrule) | Creates a compaction rule for [downsampling](https://redis.io/docs/stack/timeseries/quickstart/#downsampling). |
| [TS.DECRBY](https://redis.io/commands/ts.decrby) | Decreases the value of the latest sample in a time series by the specified number. Either modifies the existing sample or adds the decreased value as a new sample, depending on the timestamp option. |
| [TS.DEL](https://redis.io/commands/ts.del) | Removes all samples between two timestamps for a given time series. |
| [TS.DELETERULE](https://redis.io/commands/ts.deleterule) | Removes a compaction rule. |
| [TS.GET](https://redis.io/commands/ts.get) | Returns the last sample in a time series. |
| [TS.INCRBY](https://redis.io/commands/ts.incrby) | Increases the value of the latest sample in a time series by the specified number. Either modifies the existing sample or adds the increased value as a new sample, depending on the timestamp option. |
| [TS.INFO](https://redis.io/commands/ts.info) | Returns time series information and statistics. |
| [TS.MADD](https://redis.io/commands/ts.madd) | Appends multiple samples to one or more time series. |
| [TS.MGET](https://redis.io/commands/ts.mget) | Returns multiple samples with [labels](https://redis.io/docs/stack/timeseries/quickstart/#labels) that match the filter. |
| [TS.MRANGE](https://redis.io/commands/ts.mrange) | For multiple time series, runs a query against samples within a range of timestamps, from earliest to latest. Supports [filtering](https://redis.io/docs/stack/timeseries/quickstart/#filtering) and [aggregation](https://redis.io/docs/stack/timeseries/quickstart/#aggregation). |
| [TS.MREVRANGE](https://redis.io/commands/ts.mrevrange) | For multiple time series, runs a query against samples within a range of timestamps in reverse order, from latest to earliest. Supports [filtering](https://redis.io/docs/stack/timeseries/quickstart/#filtering) and [aggregation](https://redis.io/docs/stack/timeseries/quickstart/#aggregation). |
| [TS.QUERYINDEX](https://redis.io/commands/ts.queryindex) | Returns the keys of all time series with [labels](https://redis.io/docs/stack/timeseries/quickstart/#labels) that match the given filters. |
| [TS.RANGE](https://redis.io/commands/ts.range) | From the start of a single time series, runs a query against samples within a range of timestamps. Supports [filtering](https://redis.io/docs/stack/timeseries/quickstart/#filtering) and [aggregation](https://redis.io/docs/stack/timeseries/quickstart/#aggregation). |
| [TS.REVRANGE](https://redis.io/commands/ts.revrange) | From the end of a single time series, runs a query against samples within a range of timestamps in reverse order. Supports [filtering](https://redis.io/docs/stack/timeseries/quickstart/#filtering) and [aggregation](https://redis.io/docs/stack/timeseries/quickstart/#aggregation). |
