---
Title: Shards stats requests
linkTitle: shards/stats
description: Documents the Redis Enterprise Software REST API shards/stats requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/shards-stats
         /rs/references/rest-api/shards-stats.md
         /rs/references/restapi/shards-stats
         /rs/references/restapi/shards-stats.md
         /rs/references/rest_api/shards-stats
         /rs/references/rest_api/shards-stats.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-shards-stats) | `/v1/shards/stats` | Get stats for all shards |
| [GET](#get-shard-stats) | `/v1/shards/stats/{uid}` | Get stats for a specific shard |

## Get stats for all shards {#get-all-shards-stats}

	GET /v1/shards/stats

Get stats for all shards.

#### Required permissions

| Permission name |
|-----------------|
| view_all_shard_stats |

### Request {#get-all-request} 

#### Example HTTP request

	GET /shards/stats?interval=1hour&stime=2014-08-28T10:00:00Z 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| parent_uid | integer | Only return shard from the given BDB ID (optional) |
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| metrics | list | Comma-separated list of metric names for which we want statistics (default is all) (optional) |

### Response {#get-all-response} 

#### Example JSON body

```json
[
  {
    "status": "active",
    "uid": "1",
    "node_uid": "1",
    "assigned_slots": "0-8191",
    "intervals": [
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:27:35Z",
      "etime": "2015-05-28T08:27:40Z",
      "used_memory_peak": 5888264.0,
      "used_memory_rss": 5888264.0,
      "read_hits": 0.0,
      "pubsub_patterns": 0.0,
      "no_of_keys": 0.0,
      "mem_size_lua": 35840.0,
      "last_save_time": 1432541051.0,
      "sync_partial_ok": 0.0,
      "connected_clients": 9.0,
      "avg_ttl": 0.0,
      "write_misses": 0.0,
      "used_memory": 5651440.0,
      "sync_full": 0.0,
      "expired_objects": 0.0,
      "total_req": 0.0,
      "blocked_clients": 0.0,
      "pubsub_channels": 0.0,
      "evicted_objects": 0.0,
      "no_of_expires": 0.0,
      "interval": "1sec",
      "write_hits": 0.0,
      "read_misses": 0.0,
      "sync_partial_err": 0.0,
      "rdb_changes_since_last_save": 0.0
    },
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:27:40Z",
      "etime": "2015-05-28T08:27:45Z",
      "// additional fields..."
      }
    ]
  },
  {
    "uid": "2",
    "status": "active",
    "node_uid": "1",
    "assigned_slots": "8192-16383",
    "intervals": [
      {
        "interval": "1sec",
        "stime": "2015-05-28T08:27:35Z",
        "etime": "2015-05-28T08:27:40Z",
        "// additional fields..."
      },
      {
        "interval": "1sec",
        "stime": "2015-05-28T08:27:40Z",
        "etime": "2015-05-28T08:27:45Z",
        "// additional fields..."
      }
    ]
  }
]
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | No shards exist |

## Get shard stats {#get-shard-stats}

	GET /v1/shards/stats/{int: uid}

Get stats for a specific shard.

#### Required permissions

| Permission name |
|-----------------|
| view_shard_stats |

### Request {#get-request} 

#### Example HTTP request

	GET /shards/stats/1?interval=1hour&stime=2014-08-28T10:00:00Z 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the shard requested. |


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
  "uid": "1",
  "status": "active",
  "node_uid": "1",
  "role": "master",
  "intervals": [
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:24:13Z",
      "etime": "2015-05-28T08:24:18Z",
      "avg_ttl": 0.0,
      "blocked_clients": 0.0,
      "connected_clients": 9.0,
      "etime": "2015-05-28T08:24:18Z",
      "evicted_objects": 0.0,
      "expired_objects": 0.0,
      "last_save_time": 1432541051.0,
      "used_memory": 5651440.0,
      "mem_size_lua": 35840.0,
      "used_memory_peak": 5888264.0,
      "used_memory_rss": 5888264.0,
      "no_of_expires": 0.0,
      "no_of_keys": 0.0,
      "pubsub_channels": 0.0,
      "pubsub_patterns": 0.0,
      "rdb_changes_since_last_save": 0.0,
      "read_hits": 0.0,
      "read_misses": 0.0,
      "stime": "2015-05-28T08:24:13Z",
      "sync_full": 0.0,
      "sync_partial_err": 0.0,
      "sync_partial_ok": 0.0,
      "total_req": 0.0,
      "write_hits": 0.0,
      "write_misses": 0.0
    },
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:24:18Z",
      "etime": "2015-05-28T08:24:23Z",

      "// additional fields..."
    }
  ]
}
```



### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Shard does not exist |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Shard isn't currently active |
