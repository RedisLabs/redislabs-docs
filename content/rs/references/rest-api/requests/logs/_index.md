---
Title: Logs requests
linkTitle: logs
description: Documents the Redis Enterprise Software REST API logs requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/logs
         /rs/references/rest-api/logs.md
         /rs/references/restapi/logs
         /rs/references/restapi/logs.md
         /rs/references/rest_api/logs
         /rs/references/rest_api/logs.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-logs) | `/v1/logs` | Get cluster events log |

## Get cluster events log {#get-logs}

	GET /v1/logs

Get cluster events log. Returns an array of events.

#### Required permissions

| Permission name |
|-----------------|
| [view_logged_events]({{<relref "/rs/references/rest-api/permissions#view_logged_events">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /logs?order=desc 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| stime | ISO_8601 | Start time before which we don't want events. (optional) |
| etime | ISO_8601 | End time after which we don't want events. (optional) |
| order | string | desc/asc - get events in descending or ascending order. Defaults to asc. |
| limit | integer | Maximum number of events to return. (optional) |
| offset | integer | Skip offset events before returning first one (useful for pagination). (optional) |

### Response {#get-response} 

#### Example JSON body

```json
[
  {
    "time": "2014-08-29T11:19:49Z",
    "type": "bdb_name_updated",
    "severity": "INFO",
    "bdb_uid": "1",
    "old_val": "test",
    "new_val": "test123"
  },
  {
    "time": "2014-08-29T11:18:48Z",
    "type": "cluster_bdb_created",
    "severity": "INFO",
    "bdb_uid": "1",
    "bdb_name": "test"
  },
  {
    "time": "2014-08-29T11:17:49Z",
    "type": "cluster_node_joined",
    "severity": "INFO",
    "node_uid": 2
  }
]
```

#### Event object

| Field | Description |
|-------|-------------|
| time | Timestamp when event happened. |
| type | Event type. Additional fields may be available for certain event types. |
| additional fields | Additional fields may be present based on event type.|

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
