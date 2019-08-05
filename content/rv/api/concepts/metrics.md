---
Title: Metrics and usage statistics
description: 
weight: 40
alwaysopen: false
categories: ["RC Pro"]
---

Metrics API provides programmatic access to database usage and performance data.
The data exposed by the Metrics API resembles but is not identical to the Database Metrics tab in the Redis Labs web application.

### Metric spans & intervals

Metrics API data is provided per database, based on a specified (or default) metric time span parameter that specifies a requested time range. This metric span parametr indicates the requested time period covered by the data points in the Metrics API response.

| Metric Span | Description | On demand |
|---|---|---|
| 1minute  | Metric data points collected every 10 seconds for a duration of 1 minute | Yes |
| 5minutes  | Metric data points collected every 1 minute for a duration of 5 minutes | Yes |
| 1hour  | Metric data points collected every 5 minutes seconds for a duration of 1 hour | No |
| 1day  | Metric data points collected every 1 hour for a duration of 1 day | No |
| 1week  | Metric data points collected every day for a duration of 1 week | No |
| 1month  | Metric data points collected every day for a duration of 1 month | No |
| 1year  | Metric data points collected every month for a duration of 1 year | No |


    {{% note %}}
The data point collection interval is a best-effort and must not be relied on as absolute and unvarying: The exact interval between one data point and the next may vary and the interval values may change.
    {{% /note %}}


### High frequency on-demand metric spans

The `1minute` and `5minutes` metric spans are defined as "high frequency" and are therefore collected "on demand". This means that they are collected only when requested, and for a duration of no more than 5 minutes since previous request. 

For example:
* on first request for a `1minute` metric span, the Metrics API operation returns an empty data points array. This is because the first call triggers the action of collecting high frequency metrics data for this metric span, but does not contain any previouslt collected data points
* Starting with a subsequent calls (for a `1minute` metric span for the same database) a few seconds later, the collected data will start accumulating and will appear in the Metrics API response.
* If no additional requests are made during a period of 5 minutes or more (for a `1minute` metric span for the same database), the high frequency data collection will be terminated and any qubsequent requests will be considered as a first request to this database's `1minute` metric span




