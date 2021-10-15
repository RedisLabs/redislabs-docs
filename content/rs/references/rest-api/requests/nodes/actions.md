---
Title: Node actions requests
linkTitle: actions
description: Documents the Redis Enterprise Software REST API nodes/actions requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/nodes/actions
         /rs/references/rest-api/nodes/actions.md
         /rs/references/restapi/nodes/actions
         /rs/references/restapi/nodes/actions.md
         /rs/references/rest_api/nodes/actions
         /rs/references/rest_api/nodes/actions.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-nodes-actions) | `/v1/nodes/actions` | Get status of all actions on all nodes|
| [GET](#get-node-actions) | `/v1/nodes/{node_uid}/actions` | Get status of all actions on a specific node |
| [GET](#get-node-action) | `/v1/nodes/{node_uid}/actions/{action}` | Get status of an action on a specific node |
| [POST](#post-node-action) | `/v1/nodes/{node_uid}/actions/{action}` | Initiate node action |
| [DELETE](#delete-node-action) | `/v1/nodes/{node_uid}/actions/{action}` | Cancel action or remove action status |

## Get status for all actions on all nodes {#get-all-nodes-actions}

	GET /v1/nodes/actions

Get the status of all currently executing, pending, or completed
actions on all nodes.

#### Required permissions

| Permission name |
|-----------------|
| view_status_of_all_node_actions |

### Request {#get-all-request} 

#### Example HTTP request

	GET /nodes/actions

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-all-response} 


### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, response provides details about an ongoing action. |

## Get status of all actions on a specific node {#get-node-actions}

	GET /v1/nodes/{node_uid}/actions

Get the status of all actions on a specific node.

#### Required permissions

| Permission name |
|-----------------|
| view_status_of_node_action |

### Request {#get-request-all-actions} 

#### Example HTTP request

	GET /nodes/1/actions

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| action | string | The action to check. |

### Response {#get-response-all-actions} 

An array with all actions for the specified node is returned, encapsulated in a JSON object.

If no actions are available the response will include an empty array.

#### Example JSON body

```json
{
    "actions": [
        {
            "name": "remove_node",
            "node_uid": "1",
            "status": "running",
            "progress": 10
        }
    ]
}
```

### Error codes {#get-error-codes-all-actions} 

| Code | Description |
|------|-------------|
| internal_error | An internal error that cannot be mapped to a more precise error code has been encountered. |
| insufficient_resources | The cluster does not have sufficient resources to complete the required operation. |

### Status codes {#get-status-codes-all-actions} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, response provides details about an ongoing action. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Action does not exist (i.e. not currently running and no available status of last run). |

## Get status of an action on a specific node {#get-node-action}

	GET /v1/nodes/{node_uid}/actions/{action}

Get the status of a currently executing, queued, or completed action on a specific node.

### Request {#get-request} 

#### Example HTTP request

	GET /nodes/1/actions/remove

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-response} 

### Error codes {#get-error-codes} 

| Code | Description |
|------|-------------|
| internal_error | An internal error that cannot be mapped to a more precise error code has been encountered. |
| insufficient_resources | The cluster does not have sufficient resources to complete the required operation. |

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, response provides details about an ongoing action. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Action does not exist (i.e. not currently running and no available status of last run). |

## Initiate node action {#post-node-action}

	POST /v1/nodes/{node_uid}/actions/{action}

Initiate a node action.

The API allows only a single instance of any action type to be
invoked at the same time, and violations of this requirement will
result in a `409 CONFLICT` response.

The caller is expected to query and process the results of the
previously executed instance of the same action, which will be
removed as soon as the new one is submitted.

#### Required permissions

| Permission name |
|-----------------|
| start_node_action |

### Request {#post-request} 

#### Example HTTP request

	POST /nodes/1/actions/remove

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| action | string | The name of the action required. |

Currently supported actions are: 
- `remove`: Removes the node from the cluster after migrating all bound resources to other nodes. As soon as a successful remove request is received, the cluster will no longer automatically migrate resources (shards/endpoints) to the node, even if the remove task fails at some point. 
- `maintenance_on`: Creates a snapshot of the node, migrates shards to other nodes, and makes sure it can undergo maintenance.
    - If there aren't enough resources to migrate shards out of the maintained node, set `"keep_slave_shards":`&nbsp;`true` to keep the replica shards in place but demote any master shards.
- `maintenance_off`: Restores node to its previous state before maintenance started.
    - By default it uses the latest node snapshot.
    - Use `"snapshot_name":`&nbsp;`"..."` to restore state from a different snapshot.
    - To avoid restoring shards at the node, use `"skip_shards_restore":`&nbsp;`true`. 
- `enslave_node`: Turn node into a replica.

### Response {#post-response} 

The body content may provide additional action details. Currently, it is not used.

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Action initiated successfully. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Only a single instance of any action type can be invoked at the same time. |

## Cancel action or remove action status {#delete-node-action}

	DELETE /v1/nodes/{node_uid}/actions/{action}

Cancel a queued or executing node action, or remove the status of a
previously executed and completed action.

#### Required permissions

| Permission name |
|-----------------|
| cancel_node_action |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /nodes/1/actions/remove

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| action | string | The name of the action to cancel. |

### Response {#delete-response} 


### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Action will be cancelled when possible. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Action unknown or not currently running. |
