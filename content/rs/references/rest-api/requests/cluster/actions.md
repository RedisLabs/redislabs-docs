---
Title: Cluster actions requests
linkTitle: actions
description: Documents the Redis Enterprise Software REST API cluster/actions requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/cluster/actions
         /rs/references/rest-api/cluster/actions.md
         /rs/references/restapi/cluster/actions
         /rs/references/restapi/cluster/actions.md
         /rs/references/rest_api/cluster/actions
         /rs/references/rest_api/cluster/actions.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-cluster-actions) | `/v1/cluster/actions` | Get the status of all actions  |
| [GET](#get-cluster-action) | `/v1/cluster/actions/{action}` | Get the status of a specific action |
| [POST](#post-cluster-action) | `/v1/cluster/actions/{action}` | Initiate a cluster-wide action |
| [DELETE](#delete-cluster-action) | `/v1/cluster/actions/{action}` | Cancel action or remove action status |

## Get all cluster actions {#get-all-cluster-actions}

	GET /v1/cluster/actions

Get the status of all currently executing, queued, or completed cluster actions.

#### Required permissions

| Permission name |
|-----------------|
| [view_status_of_cluster_action]({{<relref "/rs/references/rest-api/permissions#view_status_of_cluster_action">}}) |

### Request {#get-all-request} 

#### Example HTTP request

    GET /cluster/actions

### Response {#get-all-response} 

The response body is a JSON array of actions, as described in [REST API actions overview]({{<relref "/rs/references/rest-api/objects">}}). 

#### Example JSON body

```json
{
    "actions": [
        {
            "name": "action_name",
            "status": "queued",
            "progress": 0.0
        }
    ]
}
```

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, response provides info about an ongoing action. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Action does not exist (i.e. not currently running and no available status of last run). |

## Get a cluster action {#get-cluster-action}

	GET /v1/cluster/actions/{action}

Get the status of a currently executing, queued, or completed cluster action.

#### Required permissions

| Permission name |
|-----------------|
| [view_status_of_cluster_action]({{<relref "/rs/references/rest-api/permissions#view_status_of_cluster_action">}}) |

### Request {#get-request} 

#### Example HTTP request

    GET /cluster/actions/action_name

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| action | string | The action to check. |

### Response {#get-response} 

The response body for the action is a JSON object, as described in [REST API actions overview]({{<relref "/rs/references/rest-api/objects">}}). 

#### Example JSON body

```json
{
    "name": "action_name",
     "status": "queued",
    "progress": 0.0
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, response provides info about an ongoing action. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Action does not exist (i.e. not currently running and no available status of last run). |

## Initiate a cluster-wide action {#post-cluster-action}

	POST /v1/cluster/actions/{action}

Initiate a cluster-wide action.

The API allows only a single instance of any action type to be
invoked at the same time, and violations of this requirement will
result in a `409 CONFLICT` response.

The caller is expected to query and process the results of the
previously executed instance of the same action, which will be
removed as soon as the new one is submitted.

#### Required permissions

| Permission name |
|-----------------|
| [start_cluster_action]({{<relref "/rs/references/rest-api/permissions#start_cluster_action">}}) |

### Request {#post-request} 

#### Example HTTP request

    POST /cluster/actions/action_name

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| action | string | The name of the action required. |

### Response {#post-response} 

The body content may provide additional action details. Currently, it is not used. 

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error, action was initiated. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad action or content provided. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | A conflicting action is already in progress. |

## Cancel action or remove action status {#delete-cluster-action}

	DELETE /v1/cluster/actions/{action}

Cancel a queued or executing cluster action, or remove the status of
a previously executed and completed action.

#### Required permissions

| Permission name |
|-----------------|
| [cancel_cluster_action]({{<relref "/rs/references/rest-api/permissions#cancel_cluster_action">}}) |

### Request {#delete-request} 

#### Example HTTP request

    DELETE /v1/cluster/actions/action_name

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| action | string | The name of the action to cancel, currently no actions are supported. |

### Response {#delete-response} 

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Action will be cancelled when possible. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Action unknown or not currently running. |
