---
Title: Node last stats requests
linkTitle: last
description: Documents the Redis Enterprise Software REST API nodes/stats/last requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/nodes/stats/last
         /rs/references/rest-api/nodes/stats/last.md
         /rs/references/restapi/nodes/stats/last
         /rs/references/restapi/nodes/stats/last.md
         /rs/references/rest_api/nodes/stats/last
         /rs/references/rest_api/nodes/stats/last.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-nodes-stats-last) | `/v1/nodes/stats/last` | Get last stats for all nodes |
| [GET](#get-node-stats-last) | `/v1/nodes/stats/last/{uid}` | Get last stats for a single node |

## Get last stats for all nodes {#get-all-nodes-stats-last}

	GET /v1/nodes/stats/last

Get last stats for all nodes.

#### Required permissions

| Permission name |
|-----------------|
| [view_all_nodes_stats]({{<relref "/rs/references/rest-api/permissions#view_all_nodes_stats">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /nodes/stats/last?interval=1sec&stime=2015-10-14T06:29:43Z 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week. Default: 1sec. (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |

### Response {#get-all-response} 

#### Example JSON body

```json
{
    "1": {
         "conns": 0.0,
         "cpu_idle": 0.922500000015134,
         "cpu_system": 0.007499999999708962,
         "cpu_user": 0.01749999999810825,
         "cur_aof_rewrites": 0.0,
         "egress_bytes": 7887.0,
         "ephemeral_storage_avail": 75821363200.0,
         "ephemeral_storage_free": 81189969920.0,
         "etime": "2015-10-14T06:29:44Z",
         "free_memory": 2956963840.0,
         "ingress_bytes": 4950.0,
         "interval": "1sec",
         "persistent_storage_avail": 75821363200.0,
         "persistent_storage_free": 81189969920.0,
         "stime": "2015-10-14T06:29:43Z",
         "total_req": 0.0
     },
     "2": {
         "conns": 0.0,
         "cpu_idle": 0.922500000015134,
         "// additional fields..."
     }
}
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | No nodes exist |

## Get last stats for a node {#get-node-stats-last}

	GET /v1/nodes/stats/last/{int: uid}

Get the last stats of a node.

#### Required permissions

| Permission name |
|-----------------|
| [view_node_stats]({{<relref "/rs/references/rest-api/permissions#view_node_stats">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /nodes/stats/last/1?interval=1sec&stime=2015-10-13T09:01:54Z 


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
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week. Default: 1sec. (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601)format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601)format (optional) |

### Response {#get-response} 

#### Example JSON body

```json
{
    "1": {
         "conns": 0.0,
         "cpu_idle": 0.8049999999930151,
         "cpu_system": 0.02750000000014552,
         "cpu_user": 0.12000000000080036,
         "cur_aof_rewrites": 0.0,
         "egress_bytes": 2169.0,
         "ephemeral_storage_avail": 75920293888.0,
         "ephemeral_storage_free": 81288900608.0,
         "etime": "2015-10-13T09:01:55Z",
         "free_memory": 3285381120.0,
         "ingress_bytes": 3020.0,
         "interval": "1sec",
         "persistent_storage_avail": 75920293888.0,
         "persistent_storage_free": 81288900608.0,
         "stime": "2015-10-13T09:01:54Z",
         "total_req": 0.0
    }
}
```

### Error codes {#get-error-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Node does not exist |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Node isn't currently active |
| [503 Service Unavailable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4) | Mode is in recovery state |
