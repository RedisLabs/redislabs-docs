---
Title: Database replica sources alerts requests
linkTitle: replica_sources/alerts
description: Documents the Redis Enterprise Software REST API bdbs/replica_sources/alerts requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/replica_sources-alerts
         /rs/references/rest-api/bdbs/replica_sources-alerts.md
         /rs/references/restapi/bdbs/replica_sources-alerts
         /rs/references/restapi/bdbs/replica_sources-alerts.md
         /rs/references/rest_api/bdbs/replica_sources-alerts
         /rs/references/rest_api/bdbs/replica_sources-alerts.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-bdbs-replica-sources-alerts) | `/v1/bdbs/replica_sources/alerts` | Get all replica sources alert states for all BDBs |
| [GET](#get-bdbs-replica-sources-alerts) | `/v1/bdbs/replica_sources/alerts/{uid}` | Get all replica sources alert states for a BDB |
| [GET](#get-bdbs-replica_source-all-alerts) | `/v1/bdbs/replica_sources/alerts/{uid}/{replica_src_id}` | Get all alert states for a replica source |
| [GET](#get-bdbs-replica-source-alert) | `/v1/bdbs/replica_sources/alerts/{uid}/{replica_src_id}/{alert}` | Get a replica source alert state |

## Get all replica sources alert states for all BDBs {#get-all-bdbs-replica-sources-alerts}

	GET /v1/bdbs/replica_sources/alerts

Get all alert states for all replica sources of all BDBs.

#### Required permissions

| Permission name |
|-----------------|
| view_all_bdbs_alerts |

### Request {#get-all-request} 

#### Example HTTP request

	GET /bdbs/replica_sources/alerts 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-all-response} 

Returns a hash of alert UIDs and the alerts states for each BDB.

See [REST API alerts overview] for a description of the alert state object.

#### Example JSON body

```json
{
    "1": {
        "replica_src_syncer_connection_error": {
            "enabled": true,
            "state": true,
            "threshold": "80",
            "change_time": "2014-08-29T11:19:49Z",
            "severity": "WARNING",
            "change_value": {
                "state": true,
                "threshold": "80",
                "memory_util": 81.2
            }
        },
        "..."
    },
    "..."
}
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Get all replica sources alert states for a BDB {#get-bdbs-replica-sources-alerts}

	GET /v1/bdbs/replica_sources/alerts/{int: uid}

Get all alert states for all replica sources of a specific bdb.

#### Required permissions

| Permission name |
|-----------------|
| view_bdb_alerts |

### Request {#get-request-all-replica-alerts} 

#### Example HTTP request

	GET /bdbs/replica_sources/alerts/1 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database |

### Response {#get-response-all-replica-alerts} 

Returns a hash of alert objects and their states.

See [REST API alerts overview] for a description of the alert state object.

#### Example JSON body

```json
{
    "replica_src_syncer_connection_error": {
        "enabled": true,
        "state": true,
        "threshold": "80",
        "severity": "WARNING",
        "change_time": "2014-08-29T11:19:49Z",
        "change_value": {
            "state": true,
            "threshold": "80",
            "memory_util": 81.2
        }
    },
    "..."
}
```

### Status codes {#get-status-codes-all-replica-alerts} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Specified bdb does not exist |

## Get all alert states for a replica source {#get-bdbs-replica_source-all-alerts}

	GET /v1/bdbs/replica_sources/alerts/{int: uid}/{int: replica_src_id}

Get all alert states for a specific replica source of a bdb.

#### Required permissions

| Permission name |
|-----------------|
| view_bdb_alerts |

### Request {#get-request-replica-alerts} 

#### Example HTTP request

	GET /bdbs/replica_sources/alerts/1/2 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database |
| replica_src_id | integer | The ID of the replica source in this BDB |

### Response {#get-response-replica-alerts} 

Returns a hash of alert objects and their states.

See [REST API alerts overview] for a description of the alert state object.

#### Example JSON body

```json
{
    "replica_src_syncer_connection_error": {
        "enabled": true,
        "state": true,
        "threshold": "80",
        "severity": "WARNING",
        "change_time": "2014-08-29T11:19:49Z",
        "change_value": {
            "state": true,
            "threshold": "80",
            "memory_util": 81.2
        }
    },
    "..."
}
```

### Status codes {#get-status-codes-replica-alerts} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Specified bdb does not exist |

## Get replica source alert state {#get-bdbs-replica-source-alert}

	GET /v1/bdbs/replica_sources/alerts/{int: uid}/{int: replica_src_id}/{alert}

Get a replica source alert state of a specific bdb.

#### Required permissions

| Permission name |
|-----------------|
| view_bdb_alerts |

### Request {#get-request-alert} 

#### Example HTTP request

	GET /bdbs/replica_sources/alerts/1/2/replica_src_syncer_connection_error 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database |
| replica_src_id | integer | The ID of the replica source in this BDB |
| alert | string | The alert name |

### Response {#get-response-alert} 

See [REST API alerts overview] for a description of the alert state object.

#### Example JSON body

```json
{
    "enabled": true,
    "state": true,
    "threshold": "80",
    "severity": "WARNING",
    "change_time": "2014-08-29T11:19:49Z",
    "change_value": {
        "state": true,
        "threshold": "80",
        "memory_util": 81.2
    }
}
```

### Status codes {#get-status-codes-alert} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad request |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Specified alert or bdb does not exist |
