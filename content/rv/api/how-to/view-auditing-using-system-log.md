---
Title: Auditing using System Log
description: 
weight: 100
alwaysopen: false
categories: ["RC Pro"]
---

### Introdcution

The Redis Labs system log collects and reports on actions perfonred on various entities in the Account. These entieies include the account itself, users, API Keys, subscriptions, databases, accounts, payment methods and more. For each entity, various lifecycle events are logged in the system log.

You can view the system log in the Redis Labs web application by selecting `Menu` and then `System Log`. This will display the system log entries for the current account.

![System Logs in the UI](/images/rc/system_log.png?width=998&height=576)


### System Logs API Operation

The API operation for querying the system log is `GET /logs`.

For example, the following request returns the latest 100 system log entries, in descending order:

```shell
{{% embed-code "rv/api/80-query-logs.sh" %}}
```

The `/logs` API operation accepts the following parameters:

* `offset` - The starting point for the results.  The default value of `0` means to start with the latest log entry. A value of `11` means to skip the first 10 entries and retrieve entries starting with the 11 and older.
* `limit` - The maximum number of entries to return per request. Note the number of actual entries returned may be smaller (if there are no additional entries). Default value is `100`.



{{% note %}}
System log returns information for the entire Account. It reports log entries for all types of entities - including Redis Labs Essentials as well as Redis Labs Pro subscriptions, databases and related entities.
{{% /note %}}


### Request results

An API System Log request results in data that includes an `entries` array. The entries are sorted by system log entry identifier in descending order. Each entry contains the following properties:

* `id` - a unique identifier for each system log entry
* `time` - the system log entry timestamp, defined in ISO-8601 date format, in the UTC timezone (for example: `2019-03-15T14:26:02Z`)  
* `originator` - name of the user who performed the action described by the system log entry
* `apiKeyName` - name of the API Key used to performed the action described by the system log entry. This field will only appear if the action was performed using API. If the operation was performed using the Redis Labs web application this property will be omitted
* `resource` - the name of the entity associated with the logged action (for example - database name). This property will be omitted if not applicable to the specific log entry
* `type` - category associated with the action log entry
* `description` - detailed textual describing the action in detail
