---
Title: Shards last stats requests
linkTitle: last
description: Documents the Redis Enterprise Software REST API shards/stats/last requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/shards-stats/last
         /rs/references/rest-api/shards-stats/last.md
         /rs/references/restapi/shards-stats/last
         /rs/references/restapi/shards-stats/last.md
         /rs/references/rest_api/shards-stats/last
         /rs/references/rest_api/shards-stats/last.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-shards-stats-last) | `/v1/shards/stats/last` | Get most recent stats for all shards |
| [GET](#get-shard-stats-last) | `/v1/shards/stats/last/{uid}` | Get most recent stats for a specific shard |

## Get most recent stats for all shards {#get-all-shards-stats-last}

	GET /v1/shards/stats/last

Get most recent stats for all shards.

#### Required permissions

| Permission name |
|-----------------|
| [view_all_shard_stats]({{<relref "/rs/references/rest-api/permissions#view_all_shard_stats">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /shards/stats/last?interval=1sec&stime=015-05-27T08:27:35Z 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week. Default: 1sec (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |

### Response {#get-all-response} 

#### Example JSON body

```json
{
   "1": {
      "interval": "1sec",
      "stime": "2015-05-28T08:27:35Z",
      "etime": "2015-05-28T08:28:36Z",
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
   "2": {
      "interval": "1sec",
      "stime": "2015-05-28T08:27:40Z",
      "etime": "2015-05-28T08:28:45Z",
      "// additional fields..."
   }
}
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | No shards exist |

## Get most recent stats for a shard {#get-shard-stats-last}

	GET /v1/shards/stats/last/{int: uid}

Get most recent stats for a specific shard.

#### Required permissions

| Permission name |
|-----------------|
| [view_shard_stats]({{<relref "/rs/references/rest-api/permissions#view_shard_stats">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /shards/stats/last/1?interval=1sec&stime=2015-05-28T08:27:35Z 


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
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week. Default: 1sec. (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |

### Response {#get-response} 

#### Example JSON body

```json
{
   "1": {
      "interval": "1sec",
      "stime": "2015-05-28T08:27:35Z",
      "etime": "2015-05-28T08:27:36Z",
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
   }
}
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Shard does not exist |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Shard isn't currently active |
