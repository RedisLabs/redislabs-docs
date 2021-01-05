---
Title: Auditing using System Log
description: Using the Redis Labs system log to track and audit actions performed in the account
weight: 100
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/view-auditing-using-system-log/
---
The Redis Labs system log collects and reports on actions performed on various entities in the account. These entities include the account itself, users, API Keys, subscriptions, databases, accounts, payment methods and more. For each entity, various lifecycle events are logged in the system log.

You can view the system log in the Redis Cloud Admin Console by selecting `Menu` and then `System Log`. This will display the system log entries for the current account.

![System Logs in the UI](/images/rc/system_log.png)

### System logs API operation

The API operation for querying the system log is `GET /logs`.

For example, the following request returns the latest 100 system log entries, in descending order:

```shell
{{% embed-code "rv/api/80-query-logs.sh" %}}
```

The `/logs` API operation accepts the following parameters:

- `offset` - The starting point for the results.  The default value of `0` starts with the latest log entry. A value of `11` skips the first 10 entries and retrieves entries starting with the 11 and older.
- `limit` - The maximum number of entries to return per request. Default value is `100`.

{{< note >}}
The system log returns information for the entire account. It reports log entries for all types of entities, including Redis Labs Essentials and Redis Labs Pro subscriptions, databases and related entities.
{{< /note >}}

### Request results

An API System Log request results in data that includes an `entries` array. The entries are sorted by system log entry ID in descending order. Each entry contains these properties:

- `id` - A unique identifier for each system log entry.
- `time` - The system log entry timestamp, defined in ISO-8601 date format and in the UTC timezone (for example: `2019-03-15T14:26:02Z`).
- `originator` - The name of the user who performed the action described by the system log entry.
- `apiKeyName` - The name of the API key used to perform the action described by the system log entry.
    This field only appears if the action was performed through the API.
    If the operation was performed through the Redis Cloud Admin Console this property is omitted.
- `resource` - The name of the entity associated with the logged action (for example, database name).
    This property is omitted if it is not applicable to the specific log entry.
- `type` - The category associated with the action log entry.
- `description` - The detailed description of the action in the log entry.
