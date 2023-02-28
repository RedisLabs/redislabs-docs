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

```sh
GET /v1/nodes
```

Get all cluster nodes.

### Permissions

| Permission name | Roles |
|-----------------|-------|
| [view_all_nodes_info]({{<relref "/rs/references/rest-api/permissions#view_all_nodes_info">}}) | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |

### Request {#get-all-request}

#### Example HTTP request

```sh
GET /nodes
```

#### Headers

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

#### Status codes {#get-all-status-codes}

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Get node {#get-node}

```sh
GET /v1/nodes/{int: uid}
```

Get a single cluster node.

### Permissions

| Permission name | Roles |
|-----------------|-------|
| [view_node_info]({{<relref "/rs/references/rest-api/permissions#view_node_info">}}) | admin<br />cluster_member<br />cluster_viewer<br />db_member<br />db_viewer |

### Request {#get-request}

#### Example HTTP request

```sh
GET /nodes/1
```

#### Headers

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
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Node UID does not exist |

## Update node {#put-node}

```sh
PUT /v1/nodes/{int: uid}
```

Update a [node object]({{<relref "/rs/references/rest-api/objects/node">}}).

Currently, you can edit the following attributes:

- `addr`

- `external_addr`

- `recovery_path`

- `accept_servers`

{{<note>}}
You can only update the `addr` attribute for offline nodes. Otherwise, the request returns an error.
{{</note>}}

### Permissions

| Permission name | Roles |
|-----------------|-------|
| [update_node]({{<relref "/rs/references/rest-api/permissions#update_node">}}) | admin |

### Request {#put-request}

#### Example HTTP request

```sh
PUT /nodes/1
```

#### Example JSON body

```json
{
    "addr": "10.0.0.1",
    "external_addr" : [
        "192.0.2.24"
    ]
}
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


#### Body

| Field | Type | Description |
|-------|------|-------------|
| addr | string | Internal IP address of node |
| external_addr | JSON array | External IP addresses of the node |
| recovery_path | string | Path for recovery files |
| accept_servers | boolean | If true, no shards will be created on the node |

### Response {#put-response}

If the request is successful, the body will be empty. Otherwise, it may contain a JSON object with an error code and error message.

#### Status codes {#put-status-codes}

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, the request has been processed. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Update request cannot be processed. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad content provided. |

#### Error codes {#put-error-codes}

| Code | Description |
|------|-------------|
| node_not_found | Node does not exist |
| node_not_offline | Attempted to change node address while it is online |
| node_already_populated | The node contains shards or endpoints, cannot disable accept_servers |
| invalid_oss_cluster_port_mapping | Cannot enable "accept_servers" since there are databases with "oss_cluster_port_mapping" that do not have a port configuration for the current node |
| node_already_has_rack_id | Attempted to change node's rack_id when it already has one |
