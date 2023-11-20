---
Title: Monitor database performance
description:
weight: 35
alwaysopen: false
categories: ["RC"]
linktitle: Monitor performance
aliases: /rv/administration/configuration/monitoring-performance/
         /rc/administration/configuration/monitoring-performance/
         /rc/administration/configure/monitoring-alerting-metrics/
         /rc/databases/monitor-performance/
---

Redis Cloud provides a variety of metrics to help you monitor database performance.  You can view graphs of performance data at any time and receive emails when performance crosses defined thresholds.

## View database metrics

The **Metrics** tab of the **View Database** screen provides a series of graphs showing performance data for your database.

{{<image filename="images/rc/database-metrics-tab.png" width="75%" alt="The Metrics tab of the View Database screen." >}}{{< /image >}}

Performance data provides insight into how your database is being used and how well it is performing.

The interval scrollbar controls the time period displayed in the graphs.  

{{<image filename="images/rc/database-metrics-interval-scrollbar.png" width="75%" alt="The Metrics tab of the View Database screen." >}}{{< /image >}}

## Promote metric graphs

The **Metrics** screen shows two primary graphs and a collection of smaller ones.  You can promote any smaller graph to a primary position.

When you use the mouse to point to a smaller graph, three things appear:

- A promotion icon pointing left
- A promotion icon pointing right
- A summary panel showing the minimum, average, maximum, and most recent values displayed in the graph.

{{<image filename="images/rc/metrics-promote-graphs.png" width="50%" alt="Promoting graphs to primary positions" >}}{{< /image >}}

Use the promotion icons to promote the smaller graph to one of the primary positions. The left icon promotes the smaller graph to the left position and the right icon promotes the smaller graph to the right position.

## Metric definitions

Several metric graphs are available:

| **Metric** | **Description** |
|------------|-----------------|
| [Ops/sec]({{< relref "/rs/references/metrics/database-operations#opssec" >}}) | The number of overall operations per sec for all Redis commands |
| [Reads/sec]({{< relref "/rs/references/metrics/database-operations#readssec" >}}) | The number of read operations per second |
| [Writes/sec]({{< relref "/rs/references/metrics/database-operations#writessec" >}}) | The number of write operations per second |
| [Other cmds/sec]({{< relref "/rs/references/metrics/database-operations#other-commandssec" >}}) | The number of other Redis commands per second |
| [Latency]({{< relref "/rs/references/metrics/database-operations#latency" >}}) | Latency per operation, in milliseconds |
| [Reads latency]({{< relref "/rs/references/metrics/database-operations#reads-latency" >}}) | Latency per read operation, in milliseconds |
| [Writes latency]({{< relref "/rs/references/metrics/database-operations#writes-latency" >}}) | Latency per write operation, in milliseconds |
| [Other latency]({{< relref "/rs/references/metrics/database-operations#other-commands-latency" >}}) | Latency of other commands, in milliseconds |
| [Used memory]({{< relref "/rs/references/metrics/resource-usage#used-memory" >}}) | Amount of memory used by the database |
| [Total keys]({{< relref "/rs/references/metrics/database-operations#total-keys" >}}) | Total number of keys in the database |
| [Connections]({{< relref "/rs/references/metrics/resource-usage#connections" >}}) | Total number of connections to the endpoint |
| [Evicted objects/sec]({{< relref "/rs/references/metrics/database-operations#evicted-objectssec" >}}) | Number of objects evicted from the database per second. |
| [Expired objects/sec]({{< relref "/rs/references/metrics/database-operations#expired-objectssec" >}}) | Number of expired objects per second. An expired object is an object with expired TTL that was deleted from the database. |
| [Hit ratio]({{< relref "/rs/references/metrics/database-operations#hit-ratio" >}}) | Percent of operations on existing keys out of the total number database operations |

For more detailed analysis, consider using [RedisInsight]({{< relref "/ri/" >}}) or [Prometheus and Grafana]({{< relref "/rc/monitor/prometheus-integration" >}}).

## Configure metric alerts

Depending on your subscription plan, you can enable alerts for several metrics for a given database.

To do so, go to the **Configuration** tab of the database and then locate the **Alerts** section. For details, including a breakdown of alerts available for each subscription type, see [Alerts section]({{< relref "/rc/databases/view-edit-database#alerts-section" >}}).

Alert settings are specific to a given database.  To receive alerts for multiple databases, make sure each is configured accordingly.

## Change alert recipients

Any member of the account team can receive alert emails.

To update alert settings for one or more team members, select **Access Management** from the admin console menu and then select the **Team** tab. For details, see [Access management]({{< relref "/rc/security/access-control/access-management" >}}).

If you subscribe to Redis Cloud through a Platform-as-a-Service (PaaS) provider (such as Heroku), you will need to review your provider's documentation for help managing your team.
