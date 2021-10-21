---
Title: CRDB purge requests
linkTitle: purge
description: Documents the Redis Enterprise Software REST API crdbs/purge requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/crdbs/purge
         /rs/references/rest-api/crdbs/purge.md
         /rs/references/restapi/crdbs/purge
         /rs/references/restapi/crdbs/purge.md
         /rs/references/rest_api/crdbs/purge
         /rs/references/rest_api/crdbs/purge.md
---

| Method | Path | Description |
|--------|------|-------------|
| [PUT](#put-crdbs-purge) | `/v1/crdbs/{crdb_guid}/purge` | Purge data from an instance that was forcibly removed from the Active-Active database |

## Purge data from removed Active-Active database instance {#put-crdbs-purge}

	PUT /v1/crdbs/{crdb_guid}/purge

Purge the data from an instance that was removed from the
Active-Active database by force.

When you force the removal of an instance from an Active-Active
database, the removed instance keeps the data and configuration
according to the last successful synchronization.

To delete the data and configuration from the forcefully removed
instance you must use this API (Must be executed locally on the
removed instance).

### Request {#put-request} 

#### Example HTTP request

    PUT /crdbs/1/purge

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| crdb_guid | string | Globally unique Active-Active database ID (GUID) |

#### Request body

| Field | Type | Description |
|-------|------|-------------|
| instances | array of integers | Array of unique instance IDs |

### Response {#put-response} 

Returns a [CRDB task object]({{<relref "/rs/references/rest-api/objects/crdb_task">}}).

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Action was successful. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | The request is invalid or malformed. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Configuration, instance, or Active-Active database not found. |
