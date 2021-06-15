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

Redis Enterprise Cloud provides a variety of metrics to help you monitor database performance.  You can view graphs of performance data at any time and receive emails when performance crosses defined threshholds.

##  View database metrics

The **Metrics** tab of the **View Database** screen provides a series of graphs showing performance data for your database.

{{<image filename="images/rc/database-view-metrics.png" width="75%" alt="The Metrics tab of the View Database screen." >}}{{< /image >}}

Performance data provides insights into how your database is being used and how well it is performing.

The interval scrollbar controls the time period displayed in the graphs.  

### Promote metric graphs

The **Metrics** screen shows two primary graphs and a collection of smaller ones.  You can promote any smaller graph to a primary position.

When you use the mouse to point to a smaller graph, three things appear:

- A promotion icon pointing left
- A promotion icon pointing right
- A summary panel showing the minimum, average, maximum and most recent values displayed in the graph.

{{<image filename="images/rc/metrics-promote-graphs.png" width="50%" alt="Promoting graphs to primary positions" >}}{{< /image >}}


Use the promotion icons to promote the smaller graph to one of the primary positions. The left icon promotes the smaller graph to the left position and the right icon promotes the smaller graph to the right position.

## Definition of each metric

Several metric graphs are available:

| **Metric** | **Description** |
|------------|-----------------|
| Ops/sec | The number of overall operations per sec for all Redis commands |
| Reads/sec | The number of read operations per second |
| Writes/sec | The number of write operations per second |
| Other cmds/sec | The number of other Redis commands per second |
| Latency (in milliseconds) | Latency per write operation |
| Reads Latency (in milliseconds) | The average, min, max and last values are also shown |
| Writes Latency (in milliseconds) | Latency per write operation |
| Other Latency (in milliseconds) | Latency per other commands |
| Used Memory | The amount of memory used by the database |
| Total Keys | The total number of keys in the database |
| Connections | The total number of connections to the endpoint |
| Evicted Objects/sec | Number of objects evicted from the database per second |
| Expired Objects/sec | Number of expired objects per sec. An expired object is an object with expired TTL that was deleted from the database. |
| Hit Ratio (percentage) | The number of operations on existing keys divided by total database operations. |

For more detailed analysis, consider tools similar to [RedisInsight]({{< relref "/ri/" >}}).

## Configure metric alerts

There are five metrics, located on the Configuration tab for each
database, that you can and should create alerts for.

![Alert
Settings](/images/rc/alert_settings.png)

If you want to edit the values or enable/disable an alert, you must
first click on the pencil icon to edit the configuration. While there
are default values, each database's alerting needs are usually
different, so there are no best practices, per se, around what to set
these to.

{{< note >}}
The "Total size of datasets under this plan" metric is at the
subscription plan level even though they are shown (for convenience) at
the database level. If you set this alert in one database you can see that
the value has changed in the other database configurations too. The
exception to that is Pay-as-you-go plans. For "Number of connections
reached," each database can have its own threshold. If you have multiple
databases on the same subscription, you need to set this percentage
appropriately on your own. For example, if you have two databases,
configuring an alert for when each database reaches 80% can surpass your
number of subscriptions.
{{< /note >}}

### Change alert recipients

Any member of the account team can receive alert emails.

To change the alert email recipients please do the following:

1. Click the **'Team'** button in the top right of the main UI page.
1. Click **'Edit'**.
1. Check the **'Receive Email Alerts'** checkbox of the users who
    should receive alerts.
1. Save your changes by clicking **'Save'**.

{{< note >}}
PaaS users, such as Heroku users, don't have the option to
create a team. Users on a team can specify an alert email and a billing
email, regardless of what email is set in **Account** -> **Account
Info**. For PaaS users, on the other hand, the alert emails and billing
emails are sent to the email that is set in **Account** -> **Account
Info**.
{{< /note >}}
