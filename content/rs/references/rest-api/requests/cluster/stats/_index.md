---
Title: Cluster stats requests
linkTitle: stats
description: Cluster statistics requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/cluster/stats
         /rs/references/rest-api/cluster/stats.md
         /rs/references/restapi/cluster/stats
         /rs/references/restapi/cluster/stats.md
         /rs/references/rest_api/cluster/stats
         /rs/references/rest_api/cluster/stats.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-cluster-stats) | `/v1/cluster/stats` | Get cluster stats |

## Get cluster stats {#get-cluster-stats}

```sh
GET /v1/cluster/stats
```

Get cluster statistics.

### Permissions

| Permission name | Roles |
|-----------------|-------|
| [view_cluster_stats]({{<relref "/rs/references/rest-api/permissions#view_cluster_stats">}}) | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |

### Request {#get-request}

#### Example HTTP request

```sh
GET /cluster/stats/1?interval=1hour&stime=2014-08-28T10:00:00Z
```

#### Headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| interval | string | Time interval for which we want stats: 1sec/10sec/5min/15min/1hour/12hour/1week (optional) |
| stime | ISO_8601 | Start time from which we want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |
| etime | ISO_8601 | End time after which we don't want the stats. Should comply with the [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) format (optional) |

### Response {#get-response}

Returns [statistics]({{<relref "/rs/references/rest-api/objects/statistics">}}) for the cluster.

#### Example JSON body

```json
{
  "intervals": [
    {
      "interval": "1hour",
      "stime": "2015-05-27T12:00:00Z",
      "etime": "2015-05-28T12:59:59Z",
      "conns": 0.0,
      "cpu_idle": 0.8533959401503577,
      "cpu_system": 0.01602159448549579,
      "cpu_user": 0.08721123782294203,
      "egress_bytes": 1111.2184745131947,
      "ephemeral_storage_avail": 3406676307.1449075,
      "ephemeral_storage_free": 4455091440.360014,
      "free_memory": 2745470765.673594,
      "ingress_bytes": 220.84083194769272,
      "interval": "1week",
      "persistent_storage_avail": 3406676307.1533995,
      "persistent_storage_free": 4455091440.088265,
      "total_req": 0.0
    },
    {
      "interval": "1hour",
      "stime": "2015-05-27T13:00:00Z",
      "etime": "2015-05-28T13:59:59Z",
      "// additional fields..."
    }
  ]
}
```

### Status codes {#get-status-codes}

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Internal server error |
