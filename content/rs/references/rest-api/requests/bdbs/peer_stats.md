---
Title: Database peer stats requests
linkTitle: peer_stats
description: Documents the Redis Enterprise Software REST API bdbs/peer_stats requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/peer_stats
         /rs/references/rest-api/bdbs/peer_stats.md
         /rs/references/restapi/bdbs/peer_stats
         /rs/references/restapi/bdbs/peer_stats.md
         /rs/references/rest_api/bdbs/peer_stats
         /rs/references/rest_api/bdbs/peer_stats.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-bdbs-peer_stats) | `/v1/bdbs/{bdb_uid}/peer_stats` | Get stats for all CRDB peer instances |
| [GET](#get-bdbs-peer_stats) | `/v1/bdbs/{bdb_uid}/peer_stats/{uid}` | Get stats for a specific CRDB peer instance |

## Get stats for all CRDB peer instances {#get-all-bdbs-peer_stats}

	GET /v1/bdbs/{bdb_uid}/peer_stats

Get stats for a all peer instances of a local CRDB instance.

#### Required permissions

| Permission name |
|-----------------|
| view_bdb_stats |

### Request {#get-all-request} 

#### Example HTTP request

	GET /bdbs/1/peer_stats?interval=5min 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| bdb_uid | integer | The unique ID of the local CRDB instance. |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |

### Response {#get-all-response} 

#### Example JSON body

```json
{ "peer_stats": [
     {
         "intervals": [
             {
                 "egress_bytes": 0.0,
                 "egress_bytes_decompressed": 0.0,
                 "etime": "2017-10-22T19:30:00Z",
                 "ingress_bytes": 18528,
                 "ingress_bytes_decompressed": 185992,
                 "interval": "5min",
                 "local_ingress_lag_time": 0.244,
                 "pending_local_writes_max": 0.0,
                 "pending_local_writes_min": 0.0,
                 "stime": "2017-10-22T19:25:00Z"
             },
             {
                 "egress_bytes": 0.0,
                 "egress_bytes_decompressed": 0.0,
                 "etime": "2017-10-22T19:35:00Z",
                 "ingress_bytes": 18,
                 "ingress_bytes_decompressed": 192,
                 "interval": "5min",
                 "local_ingress_lag_time": 0.0,
                 "pending_local_writes_max": 0.0,
                 "pending_local_writes_min": 0.0,
                 "stime": "2017-10-22T19:30:00Z"
             }
         ],
         "uid": "3"
     }
   ]
 }
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Database does not exist. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Database is not a CRDB. |

## Get stats for a CRDB peer instance {#get-bdbs-peer_stats}

	GET /v1/bdbs/{bdb_uid}/peer_stats/{int: uid}

Get stats for a specific CRDB peer instance.

#### Required permissions

| Permission name |
|-----------------|
| view_bdb_stats |

### Request {#get-request} 

#### Example HTTP request

	GET /bdbs/1/peer_stats/3?interval=5min 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| bdb_uid | integer | The unique ID of the local CRDB instance. |
| uid | integer | The peer instance uid, as specified in the CRDB instance list. |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |

### Response {#get-response} 

#### Example JSON body

```json
{
    "intervals": [
        {
            "egress_bytes": 0.0,
            "egress_bytes_decompressed": 0.0,
            "etime": "2017-10-22T19:30:00Z",
            "ingress_bytes": 18528,
            "ingress_bytes_decompressed": 185992,
            "interval": "5min",
            "local_ingress_lag_time": 0.244,
            "pending_local_writes_max": 0.0,
            "pending_local_writes_min": 0.0,
            "stime": "2017-10-22T19:25:00Z"
        },
        {
            "egress_bytes": 0.0,
            "egress_bytes_decompressed": 0.0,
            "etime": "2017-10-22T19:35:00Z",
            "ingress_bytes": 18,
            "ingress_bytes_decompressed": 192,
            "interval": "5min",
            "local_ingress_lag_time": 0.0,
            "pending_local_writes_max": 0.0,
            "pending_local_writes_min": 0.0,
            "stime": "2017-10-22T19:30:00Z"
        }
    ],
    "uid": "3"
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Database or peer does not exist. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Database is not a CRDB. |
