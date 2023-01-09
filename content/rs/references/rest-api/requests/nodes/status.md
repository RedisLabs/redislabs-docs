---
Title: Node status requests
linkTitle: status
description: Node status requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/nodes/status
         /rs/references/rest-api/nodes/status.md
         /rs/references/restapi/nodes/status
         /rs/references/restapi/nodes/status.md
         /rs/references/rest_api/nodes/status
         /rs/references/rest_api/nodes/status.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-nodes-status) | `/v1/nodes/status` | Get the status of all nodes |
| [GET](#get-node-status) | `/v1/nodes/{uid}/status` | Get a node's status |

## Get all node statuses {#get-all-nodes-status}

	GET /v1/nodes/status

Get the status of all nodes in the cluster.

#### Required permissions

| Permission name |
|-----------------|
| [view_all_nodes_alerts]({{<relref "/rs/references/rest-api/permissions#view_all_nodes_alerts">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /nodes/status

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-all-response} 

Returns an array of [node objects]({{<relref "/rs/references/rest-api/objects/node">}}).

#### Example JSON body

```json

```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |


## Get node status {#get-node-status}

	GET /v1/nodes/{int: uid}/status

Get the status of a specific node.

#### Required permissions

| Permission name |
|-----------------|
| [view_node_alerts]({{<relref "/rs/references/rest-api/permissions#view_node_alerts">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /nodes/1/status


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


### Response {#get-response} 

Returns a [node object]({{<relref "/rs/references/rest-api/objects/node">}}).

#### Example JSON body

```json

```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Specified alert or node does not exist |
