---
Title: Query metrics and usage statistics
description: 
weight: 80
alwaysopen: false
categories: ["RC Pro"]
---

The Metrics query API operation `GET /subscriptions/{subscription-id}/databases/{subscription-id}/metrics?metricSpan={metric-span}`.

The query accepts 3 parameters:

* `SUBSCRIPTION_ID` - Required. The subscription identifier of the database who's metric data will be queried
* `DATABASE_ID` - Required. The database identifier of a database belonging to the subscription identifier specified in the previous parameter.
* `METRIC_SPAN` - Optional. Defines the requested time span to be covered by the query. Default value is `1hour`. For a list of supported values see "[Metric spans and intervals]({{< relref  "/rv/api/concepts#metric-spans-and-intervals" >}})"


{{% note %}}
Metrics API operation supports Redis Labs Essentials databases as well as Redis Labs Pro databases.
{{% /note %}}


### Metrics query example

```shell
{{% embed-code "rv/api/70-query-metrics.sh" %}}
```
