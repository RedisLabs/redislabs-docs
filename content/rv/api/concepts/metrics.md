---
Title: Metrics and usage statistics
description: 
weight: 40
alwaysopen: false
categories: ["RC Pro"]
---

Metrics API provides programmatic access to database usage and performance data.
The data exposed by the Metrics API resembles but is not identical to the Database Metrics tab in the Redis Labs web application.

### Metric spans and intervals

Metrics API data is provided per database, based on a specified (or default) metric time span parameter that specifies a requested time range. This metric span parameter indicates the requested time period covered by the data points in the Metrics API response.

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

### Metric categories

The data points collected and reported by the Metrics API are grouped in categories. Each category contains the data points collected for the specific category measurement:

| Category | Description |
|---|---|
| bigstore-hits | |
| bigstore-overwrites | |
| count-connections | |
| count-keys | number of keys in the database |
| disk-fragmentation-ratio | |
| evicted-objects | number of evicted objects |
| expired-objects | number of expired objects |
| flash-big-del | |
| flash-big-fetch | |
| flash-big-io-ratio | |
| flash-big-write | |
| flash-used | |
| hits-ram | |
| hits-read | |
| hits-write | |
| latency-average | average latency for all requests (in milliseconds) |
| latency-average-read | average latency for read requests (in milliseconds) |
| latency-average-write | average latency for write requests (in milliseconds) |
| latency-other | average latency for requests that are not read or write (in milliseconds) |
| memory-fragmentation-ratio | |
| memory-size-calculated | |
| ram-big-delete | |
| ram-big-fetch | |
| ram-big-write | |
| ram-overhead | |
| ram-overwrites | |
| ram-used | |
| redis-big-io-ratio | |
| requests-other | number of requests that are not read or write |
| requests-read | number of read requests |
| requests-write | number of write requests |
| values-in-flash | |
| values-in-ram | |


### Metric data points


A metric data point contains the following properties:

| Property | Description &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
|---|---|
| Category | Each data point is collected and reported within the context of a measurement topic called "category". Each category has a specified measurement unit (for example: milliseconds, megabytes or percentage) |
| Value | The value of the data point, defined in the specified measurement unit of the data point's category  |
| Timestamp | The exact time in which the data point was collected, defined in ISO-8601 date format, in the UTX timezone (for example: `2019-03-15T14:26:02Z`) |

For example, the data points related to the `conns` category (number of connections) will be displayed as follows:

```
   {
      "name": "conns",
      "data": [
        {
          "value": 7,
          "timeStamp": "2019-08-05T16:02:22Z"
        },
        {
          "value": 9,
          "timeStamp": "2019-08-05T16:02:32Z"
        },
        {
          "value": 8,
          "timeStamp": "2019-08-05T16:02:42Z"
        }
      ]
    },
```

