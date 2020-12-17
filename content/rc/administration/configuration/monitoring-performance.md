---
Title: Monitoring Performance
description:
weight: 40
alwaysopen: false
categories: ["RC"]
aliases: /rv/administration/configuration/monitoring-performance/
         /rc/administration/configuration/monitoring-performance/
         /rc/administration/configure/monitoring-alerting-metrics/
---
Redis Cloud provides a straightforward dashboard that
gives you good visibility into each database. Metrics can be viewed on
the Metrics tab of a selected database. Use the scroll bar at the top to
change between time intervals: last minute, five minutes, hour, day,
week, month, and year.

If you hover your cursor over the mini-graph for a metric, you should see two
boxes with arrows, one arrow pointing to the left and one to the right
(depending on which side of the mini-graph you hover on). Each side of
the mini-graph corresponds to the larger moving graphs towards the top
of the page, under the time scale. For example, if in the big graphs you
want to see Reads/sec on the left and Writes/sec on the right, click on
the left side of the Read/sec mini-graph and the right side of the
Writes/sec mini-graph.

<!-- Video out of date
For a quick tour of what you get, watch this video. -->

<!-- {{< youtube GYpVYilv5u4 >}} -->

## Definition of each metric

For each database, there are 14 different metrics you can see on the
page:

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

If you want to get more information, we recommend
[Redsmin](https://www.redsmin.com/) and/or [New
Relic](https://newrelic.com/plugins/poison-pen-llc/28). Also, you might
want to read [this
post](https://redislabs.com/blog/secure-redis-ssl-added-to-redsmin-and-clients).

## Alerting on metrics

There are five metrics, located on the Configuration tab for each
database, that you can and should create alerts for.

![Alert
Settings](/images/rc/alert_settings-2.png)

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

## Changing alert email recipients

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
