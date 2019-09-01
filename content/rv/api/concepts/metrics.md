---
Title: Metrics and usage statistics
description: Metrics API provides programmatic access to database usage and performance data
weight: 40
alwaysopen: false
categories: ["RC Pro"]
---
Metrics API provides programmatic access to database usage and performance data.
The metrics API shows data that similar to the data that the Redis Labs web UI shows in the database metrics.

## Metric spans and intervals

Metrics API data shows the data for the database that you request and the metric span that you request.
The metric span determines the time period for the data points in the metrics API response.

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
The data point interval represents a best-effort and is not an absolute or unvarying interval. The exact interval between one data point and the next may vary and the interval values may change.
{{% /note %}}

### High frequency, on-demand metric spans

The `1minute` and `5minutes` metric spans are high frequency intervals that require on-demand collection.
The API request collects the data since the last request (up to 5 minutes) only when you request it.

For example:

- At the first request for a `1minute` metric span, the metrics API operation returns an empty data-points array.
    This is because the first request triggers the collection of high-frequency metrics data for this metric span,
    but does not contain any previously collected data points.
- The next `1minute` request to the database within 5 minutes shows the metrics collected since the last request.
- Any break in requests to the database for more than 5 minutes stops the data collection.
    The next `1minute` request to the database starts the data collection again.

## Metric data points

A metric data point contains these properties:

| Property | Description |
|---|---|
| Category | Each data point is shown in a category and with the measurement unit for that category, for example: milliseconds, megabytes, percentage |
| Value | The value of the data point, defined with the measurement unit of the category for the data point |
| Timestamp | The exact collection time for the data point in ISO-8601 date format and in the UTC timezone, for example: 2019-03-15T14:26:02Z |

For example, a request for data points in the `count-connections` (number of connections) category returns:

```json
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

## Metric Categories

Data points are shown divided into these categories:

| Category | Description | Units |
|---|---|---|
| bigstore-hits | | |
| bigstore-overwrites | | |
| count-connections | | |
| count-keys | Number of keys in the database | | |
| disk-fragmentation-ratio | | |
| evicted-objects | Number of evicted objects | |
| expired-objects | Number of expired objects | |
| flash-big-del | | |
| flash-big-fetch | | |
| flash-big-io-ratio | | |
| flash-big-write | | |
| flash-used | | |
| hits-ram | | |
| hits-read | | |
| hits-write | | |
| latency-average | Average latency for all requests | milliseconds |
| latency-average-read | Average latency for read requests | milliseconds |
| latency-average-write | Average latency for write requests | milliseconds |
| latency-other | Average latency for requests that are not read or write | milliseconds |
| memory-fragmentation-ratio | | |
| memory-size-calculated | | |
| ram-big-delete | | |
| ram-big-fetch | | |
| ram-big-write | | |
| ram-overhead | | |
| ram-overwrites | | |
| ram-used | | |
| redis-big-io-ratio | | |
| requests-other | Number of requests that are not read or write | |
| requests-read | Number of read requests | |
| requests-write | Number of write requests | |
| values-in-flash | | |
| values-in-ram | | |

## Usage Example

```shell
{{% embed-code "rv/api/70-query-metrics.sh" %}}
```
