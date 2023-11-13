---
Title: Audit using Service Log
description: Use the service log to track and audit actions performed in the account
weight: 60
alwaysopen: false
categories: ["RC"]
aliases: /rv/api/how-to/view-auditing-using-system-log/
         /rc/api/how-to/view-auditing-using-system-log/
         /rc/api/how-to/view-auditing-using-system-log.md
         /rc/examples/audit-system-logs/
         /rc/api/examples/audit-system-logs.md
---
Service logs collect and report actions performed on various entities in your Redis Cloud subscription.  These entities include the account itself, users, API Keys, subscriptions, databases, accounts, payment methods, and more. For each entity, various lifecycle events are logged in the system log.

To view the log, sign in to the Redis Cloud [admin console](https://app.redislabs.com/) and then select **Logs** from the main menu.

{{<image filename="images/rc/system-logs.png" alt="Choose the Logs command from the Redis Cloud admin console menu to view your subscription system log." width="75%">}}{{< /image >}} 

To learn more, see [System logs]({{<relref "/rc/databases/system-logs">}}).


### System log REST API

The REST API operation for querying the system service log is `GET /logs`.

For example, the following request returns the latest 100 system log entries, in descending order:

```shell
GET "https://[host]/v1/logs?limit=100&offset=0"
```

The `/logs` API operation accepts the following parameters:

- `offset` - The starting point for the results.  The default value of `0` starts with the latest log entry. A value of `11` skips the first 10 entries and retrieves entries starting with the 11 and older.
- `limit` - The maximum number of entries to return per request. The default value is `100`.

The system log reports activity for the entire account. It reports log entries for all types of entities, including subscriptions, databases, and so on.

### Request results

An API system log request results in data that includes an `entries` array. The entries are sorted by system log entry ID in descending order and include the following properties:

- `id` - A unique identifier for each system log entry.

- `time` - The system log entry timestamp, defined in ISO-8601 date format and in the UTC timezone (for example: `2019-03-15T14:26:02Z`).

- `originator` - The name of the user who performed the action described by the system log entry.

- `apiKeyName` - The name of the API key used to perform the action described by the system log entry.
    This field only appears if the action was performed through the API.
    If the operation was performed through the Redis Cloud admin console, this property is omitted.

- `resource` - The name of the entity associated with the logged action (for example, database name).
    This property is omitted if it is not applicable to the specific log entry.

- `type` - The category associated with the action log entry.

- `description` - The detailed description of the action in the log entry.
