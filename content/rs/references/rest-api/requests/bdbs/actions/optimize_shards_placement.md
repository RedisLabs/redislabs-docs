---
Title: Optimize shards placement database action requests
linkTitle: optimize_shards_placement
description: Optimize shard placement requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/actions/optimize_shards_placement
         /rs/references/rest-api/bdbs/actions/optimize_shards_placement.md
         /rs/references/restapi/bdbs/actions/optimize_shards_placement
         /rs/references/restapi/bdbs/actions/optimize_shards_placement.md
         /rs/references/rest_api/bdbs/actions/optimize_shards_placement
         /rs/references/rest_api/bdbs/actions/optimize_shards_placement.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-bdbs-actions-optimize-shards-placement) | `/v1/bdbs/{uid}/actions/optimize_shards_placement` | Get optimized shards placement for a database  |


## Get optimized shards placement {#get-bdbs-actions-optimize-shards-placement}

	GET /v1/bdbs/{int: uid}/actions/optimize_shards_placement

Get optimized shards placement for the given database.

#### Required permissions

| Permission name |
|-----------------|
| [view_bdb_info]({{<relref "/rs/references/rest-api/permissions#view_bdb_info">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /bdbs/1/actions/optimize_shards_placement

### Response {#get-response} 

To rearrange the database shards, you can submit the blueprint returned in this response body as the `shards_blueprint` field in the [`PUT`&nbsp;`/bdbs/{uid}`](#put-bdbs-rearrange-shards) request.

#### Example JSON body

```json
[
    {
        "nodes": [
            {
                "node_uid": "3",
                "role": "master"
            },
            {
                "node_uid": "1",
                "role": "slave"
            }
        ],
        "slot_range": "5461-10922"
    },
    {
        "nodes": [
            {
                "node_uid": "3",
                "role": "master"
            },
            {
                "node_uid": "1",
                "role": "slave"
            }
        ],
        "slot_range": "10923-16383"
    },
    {
        "nodes": [
            {
                "node_uid": "3",
                "role": "master"
            },
            {
                "node_uid": "1",
                "role": "slave"
            }
        ],
        "slot_range": "0-5460"
    }
]
```

#### Response headers

| Key | Value | Description |
|-----|-------|-------------|
| Content-Length | 352 | Length of the request body in octets |
| cluster-state-id | 30 | Cluster state ID |

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Database UID does not exist |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Not enough resources in the cluster to host the database |

## Rearrange database shards {#put-bdbs-rearrange-shards}

Use the blueprint returned by the [`GET`&nbsp;`/bdbs/{uid}/actions/optimize_shards_placement`]({{<relref "/rs/references/rest-api/requests/bdbs/actions/optimize_shards_placement#get-bdbs-actions-optimize-shards-placement">}}) request as the value of the `shards_blueprint` field to rearrange the database shards.

To ensure that the optimized shard placement is relevant for the current cluster state, pass the `cluster-state-id`, taken from the response header of the `GET` request, in the [`PUT`&nbsp;`/bdbs/{uid}`]({{<relref "/rs/references/rest-api/requests/bdbs#put-bdbs">}}) request headers.

The cluster will reject the update if its state was changed since the optimal shards placement was obtained.

### Request

#### Example HTTP request

    PUT /bdbs/1

#### Example JSON body

```json
{
  "shards_blueprint": [
    {
      "nodes": [
        {
          "node_uid": "2",
          "role": "master"
        }
      ],
      "slot_range": "0-8191"
    },
    "..."
  ]
}
```

{{<warning>}} 
If you submit such an optimized blueprint, it may cause strain on the cluster and its resources. Use with caution.
{{</warning>}} 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |
| cluster-state-id | 30 | Cluster state ID |
