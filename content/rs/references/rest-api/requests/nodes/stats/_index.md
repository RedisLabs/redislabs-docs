---
Title: Node stats requests
linkTitle: stats
description: Documents the Redis Enterprise Software REST API nodes/stats requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/nodes/stats
         /rs/references/rest-api/nodes/stats.md
         /rs/references/restapi/nodes/stats
         /rs/references/restapi/nodes/stats.md
         /rs/references/rest_api/nodes/stats
         /rs/references/rest_api/nodes/stats.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-nodes-stats) | `/v1/nodes/stats` | Get stats for all nodes |
| [GET](#get-node-stats) | `/v1/nodes/stats/{uid}` | Get stats for a single node |

## Get stats for all nodes {#get-all-nodes-stats}

	GET /v1/nodes/stats

Get stats for all nodes.

#### Required permissions

| Permission name |
|-----------------|
| [view_all_nodes_stats]({{<relref "/rs/references/rest-api/permissions#view_all_nodes_stats">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /nodes/stats?interval=1hour&stime=2014-08-28T10:00:00Z 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week (optional)  |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |

### Response {#get-all-response} 

#### Example JSON body

```json
[
  {
    "uid": "1",
    "intervals": [
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:40:11Z",
      "etime": "2015-05-28T08:40:12Z",
      "conns": 0.0,
      "cpu_idle": 0.5499999999883585,
      "cpu_system": 0.03499999999985448,
      "cpu_user": 0.38000000000101863,
      "egress_bytes": 0.0,
      "ephemeral_storage_avail": 2929315840.0,
      "ephemeral_storage_free": 3977830400.0,
      "free_memory": 893485056.0,
      "ingress_bytes": 0.0,
      "persistent_storage_avail": 2929315840.0,
      "persistent_storage_free": 3977830400.0,
      "total_req": 0.0
    },
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:40:12Z",
      "etime": "2015-05-28T08:40:13Z",
      "cpu_idle": 1.2,
      "// additional fields..."
    }
   ]
  },
  {
    "uid": "2",
    "intervals": [
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:40:11Z",
      "etime": "2015-05-28T08:40:12Z",
      "conns": 0.0,
      "cpu_idle": 0.5499999999883585,
      "cpu_system": 0.03499999999985448,
      "cpu_user": 0.38000000000101863,
      "egress_bytes": 0.0,
      "ephemeral_storage_avail": 2929315840.0,
      "ephemeral_storage_free": 3977830400.0,
      "free_memory": 893485056.0,
      "ingress_bytes": 0.0,
      "persistent_storage_avail": 2929315840.0,
      "persistent_storage_free": 3977830400.0,
      "total_req": 0.0
    },
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:40:12Z",
      "etime": "2015-05-28T08:40:13Z",
      "cpu_idle": 1.2,
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
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | No nodes exist |

## Get node stats {#get-node-stats}

	GET /v1/nodes/stats/{int: uid}

Get stats for a node.

#### Required permissions

| Permission name |
|-----------------|
| [view_node_stats]({{<relref "/rs/references/rest-api/permissions#view_node_stats">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /nodes/stats/1?interval=1hour&stime=2014-08-28T10:00:00Z 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the node requested. |

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
  "intervals": [
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:40:11Z",
      "etime": "2015-05-28T08:40:12Z",
      "conns": 0.0,
      "cpu_idle": 0.5499999999883585,
      "cpu_system": 0.03499999999985448,
      "cpu_user": 0.38000000000101863,
      "egress_bytes": 0.0,
      "ephemeral_storage_avail": 2929315840.0,
      "ephemeral_storage_free": 3977830400.0,
      "free_memory": 893485056.0,
      "ingress_bytes": 0.0,
      "persistent_storage_avail": 2929315840.0,
      "persistent_storage_free": 3977830400.0,
      "total_req": 0.0
    },
    {
      "interval": "1sec",
      "stime": "2015-05-28T08:40:12Z",
      "etime": "2015-05-28T08:40:13Z",
      "cpu_idle": 1.2,
      "// additional fields..."
    }
  ]
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Node does not exist |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Node isn't currently active |
| [503 Service Unavailable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4) | Node is in recovery state |
