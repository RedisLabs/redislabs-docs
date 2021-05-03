---
Title: Request performance metrics
description: The metrics API provides programmatic access to database usage and performance data
weight: 40
alwaysopen: false
categories: ["RC"]
---
The REST API provides programmatic access to database usage and performance metrics.

It provides data similar to that shown in the **Metrics** tab of the **View Database** screen of the admin console.

## Metric spans and intervals

Metric data summarizes performance for a given database over a specific period of time.  

The metric span determines the time period for the results in the response.

| Metric Span | Data duration | Data point interval | Data point collection |
|---|---|---|---|
| 1minute  | 1 minute | 10 seconds | on-demand |
| 5minutes  | 5 minutes | 1 minute | on-demand |
| 1hour  | 1 hour | 5 minutes | continuous |
| 1day  | 1 day | 15 minutes | continuous |
| 1week  | 1 week | 1 hour | continuous |
| 1month  | 1 month | 12 hours | continuous |
| 1year  | 1 year | 7 days | continuous |

{{< note >}}
The data point interval represents a best-effort and is not an absolute or unvarying interval. The exact interval between one data point and the next may vary and the interval values may change.
{{< /note >}}

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
    }
```

## Metric categories

Data points are shown divided into these categories:

| Category | Description | Units | Redis on RAM | Redis on Flash | Essentials 
|---|---|---|---|---|---|
|**count-connections**|Number of open connections in the database|count|Y|Y|Y|
|**count-keys**|Number of keys in the database|count|Y|Y|Y|
|**evicted-objects**|Number of evicted objects|count|Y|Y|Y|
|**expired-objects**|Number of expired objects|count|Y|Y|Y|
|**flash-used**|Flash storage used by Redis-on-Flash database|bytes|Y|||
|**fragmentation-ratio-disk**|Flash storage fragmentation ratio|percentage|Y|||
|**fragmentation-ratio-memory**|RAM fragmentation ratio|percentage|Y|Y|Y|
|**hits-flash**|Requests found in Flash|percentage|Y|||
|**hits-ram**|Requests found in RAM|percentage|Y|||
|**hits-read**|Read requests found in Redis database|percentage|Y|Y|Y|
|**hits-write**|Write requests found in Redis database|percentage|Y|Y|Y|
|**latency-average**|Average latency for all requests|microseconds|Y|Y|Y|
|**latency-average-read**|Average latency for read requests|microseconds|Y|Y|Y|
|**latency-average-write**|Average latency for write requests|microseconds|Y|Y|Y|
|**latency-other**|Average latency for requests that are not read or write|microseconds|Y|Y|Y|
|**memory-size-calculated**|Total size of Redis database|bytes|Y|Y|Y|
|**ram-flash-ratio**|Ratio between RAM and Flash access|percentage|Y|||
|**ram-overhead**|The percentage of RAM used for storing everything rather than pure values. I.e. keys, Redis dictionary and other key/value overheads|bytes|Y|||
|**ram-used**|RAM used by Redis-on-Flash database|bytes|Y|||
|**requests-other**|Number of requests that are not read or write|ops/sec|Y|Y|Y|
|**requests-read**|Number of read requests|ops/sec|Y|Y|Y|
|**requests-total**|Total number of requests|ops/sec|Y|Y|Y|
|**requests-write**|Number of write requests|ops/sec|Y|Y|Y|
|**values-in-flash**|Number of values stored in Flash|count|Y|||
|**values-in-ram**|Number of values stored in RAM|count|Y|||

## Usage example

```shell
{{% embed-code "rv/api/70-query-metrics.sh" %}}
```
