---
Title: Nodes requests
linkTitle: nodes
description: Node requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/nodes
         /rs/references/rest-api/nodes.md
         /rs/references/restapi/nodes
         /rs/references/restapi/nodes.md
         /rs/references/rest_api/nodes
         /rs/references/rest_api/nodes.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-nodes) | `/v1/nodes` | Get all cluster nodes |
| [GET](#get-node) | `/v1/nodes/{uid}` | Get a single cluster node |
| [PUT](#put-node) | `/v1/nodes/{uid}` | Update a node |

## Get all nodes {#get-all-nodes}

	GET /v1/nodes

Get all cluster nodes.

#### Required permissions

| Permission name |
|-----------------|
| [view_all_nodes_info]({{<relref "/rs/references/rest-api/permissions#view_all_nodes_info">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /nodes 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-all-response} 

Returns a JSON array of [node objects]({{<relref "/rs/references/rest-api/objects/node">}}).

#### Example JSON body

```json
[
    {
      "uid": 1,
      "status": "active",
      "uptime": 262735,
      "total_memory": 6260334592,
      "software_version": "0.90.0-1",
      "ephemeral_storage_size": 20639797248,
      "persistent_storage_path": "/var/opt/redislabs/persist",
      "persistent_storage_size": 20639797248,
      "os_version": "Ubuntu 14.04.2 LTS",
      "ephemeral_storage_path": "/var/opt/redislabs/tmp",
      "architecture": "x86_64",
      "shard_count": 23,
      "public_addr": "",
      "cores": 4,
      "rack_id": "",
      "supported_database_versions": [
        {
          "db_type": "memcached",
          "version": "1.4.17"
        },
        {
          "db_type": "redis",
          "version": "2.6.16"
        },
        {
          "db_type": "redis",
          "version": "2.8.19"
        }
      ],
      "shard_list": [1, 3, 4],
      "addr": "10.0.3.61"
    },
    {
      "uid": 1,
      "status": "active",
      "// additional fields..."
    }
]
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Get node {#get-node}

	GET /v1/nodes/{int: uid}

Get a single cluster node.

#### Required permissions

| Permission name |
|-----------------|
| [view_node_info]({{<relref "/rs/references/rest-api/permissions#view_node_info">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /nodes/1 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the node requested. |

### Response {#get-response} 

Returns a [node object]({{<relref "/rs/references/rest-api/objects/node">}}).

#### Example JSON body

```json
{
    "uid": 1,
    "name": "node:1",
    "// additional fields..."
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Node uid does not exist |

## Update node {#put-node}

	PUT /v1/nodes/{int: uid}

Update a node object.

Currently, this operation supports editing the following attributes:

- `addr`

- `external_addr`

- `recovery_path`

- `accept_servers`

The `addr` attribute can only be updated for offline nodes, and the request will return an
error otherwise.

#### Required permissions

| Permission name |
|-----------------|
| [update_node]({{<relref "/rs/references/rest-api/permissions#update_node">}}) |

### Request {#put-request} 

#### Example HTTP request

	PUT /nodes/1 

#### Example JSON body

```json
{ "addr": "10.0.0.1" }
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |
| Content-Type | application/json | Media type of request/response body |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the updated node. |


#### Request body

| Field | Type | Description |
|-------|------|-------------|
| addr | string | Internal IP address of node |
| external_addr | complex object | External IP addresses of node. GET /jsonschema to retrieve the object’s structure. |
| recovery_path | string | Path for recovery files |
| accept_servers | boolean | If true, no shards will be created on the node |

### Response {#put-response} 

If an error status is returned, the body may contain a JSON object
that describes the error.

#### Example JSON body

```json
{
    "error_code": "node_not_offline", 
    "description": "Attempted to change node address while it is online" 
}
```

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, the request has been processed. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Update request cannot be processed. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad content provided. |
