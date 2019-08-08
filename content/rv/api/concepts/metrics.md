---
Title: Metrics and usage statistics
description: Metrics API provides programmatic access to database usage and performance data
weight: 40
alwaysopen: false
categories: ["RC Pro"]
---
Metrics API provides programmatic access to database usage and performance data.
The data exposed by the Metrics API resembles but is not identical to the Database Metrics tab in the Redis Labs web application.

### Metric spans and intervals

Metrics API data is provided per database, based on a specified (or default) metric time span parameter that specifies a requested time range. This metric span parameter indicates the requested time period covered by the data points in the Metrics API response.

| Metric Span | Data duration | Data point interval | Data point collection |
|---|---|---|---|
| 1minute  | 1 minute | 10 seconds | on-demand |
| 5minutes  | 5 minutes | 1 minute | on-demand |
| 1hour  | 1 hour | 5 minutes | continuous |
| 1day  | 1 day | 1 hour | continuous |
| 1week  | 1 week | 1 day | continuous |
| 1month  | 1 month | 1 day | continuous |
| 1year  | 1 year | 1 month | continuous |

{{% note %}}
The data point interval represents a best-effort. It must not be relied upon as an absolute or unvarying interval. The exact interval between one data point and the next may vary and the interval values may change.
{{% /note %}}

### High frequency on-demand metric spans

The `1minute` and `5minutes` metric spans are defined as "high frequency" and are therefore collected "on demand". This means that they are collected only when requested, and for a duration of no more than 5 minutes since previous request.

For example:

- on first request for a `1minute` metric span, the Metrics API operation returns an empty data points array. This is because the first call triggers the action of collecting high frequency metrics data for this metric span, but does not contain any previously collected data points
- Starting with any subsequent call (for a `1minute` metric span for the same database) a few seconds later, the collected data starts accumulating and will appear in the Metrics API response.
- If no additional requests are made during a period of 5 minutes or more (for a `1minute` metric span for the same database), the high frequency data collection will be terminated and any subsequent requests will be considered as a first request to this database's `1minute` metric span

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

| Property | Description |
|---|---|
| Category | Each data point is collected and reported within the context of a measurement topic called "category". Each category has a specified measurement unit (for example: milliseconds, megabytes or percentage) |
| Value | The value of the data point, defined in the specified measurement unit of the data point's category  |
| Timestamp | The exact time in which the data point was collected, defined in ISO-8601 date format, in the UTC timezone (for example: `2019-03-15T14:26:02Z`) |

For example, the data points related to the `count-connections` category (number of connections) will be displayed as follows:

```
   {
      "name": "count-connections",
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

### Usage example

See "[Query metrics and usage statistics]({{< relref  "rv/api/how-to/metrics-and-performance-data#metrics-query-example" >}})"
