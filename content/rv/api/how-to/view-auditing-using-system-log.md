---
Title: Auditing using System Log
description: 
weight: 100
alwaysopen: false
categories: ["RC Pro"]
---

The Redis Labs system log collects and reports on actions perfonred on various entities in the Account. These entieies include the account itself, users, API Keys, subscriptions, databases, accounts, payment methods and more. For each entity, various lifecycle events are logged in the system log.

You can view the system log in the Redis Labs web application by selecting `Menu` and then `System Log`. This will display the system log entries for the current account.

![System Logs in the UI](/images/rc/system_log.png?width=998&height=576)


The API operation for querying the system log is `GET /logs`.

For example, the following request returns the latest 100 system log entries, in descending order:

```shell
{{% embed-code "rv/api/80-query-logs.sh" %}}
```

The `/logs` API operation accepts the following parameters:

* `offset` - The starting point for the results.  The default value of `0` means to start with the latest log entry. A value of `11` means to skip the first 10 entries and retrieve entries starting with the 11 and older.
* `limit` - The maximum number of entries to return per request. Note the number of actual entries returned may be smaller (if there are no additional entries)

The `/logs` results are sorted by system log entry identifier in descending order.

{{% note %}}
System log returns information for the entire Account. It reports log entries for all types of entities - including Redis Labs Essentials as well as Redis Labs Pro subscriptions, databases and related entities.
{{% /note %}}



