---
Title: CRDB updates requests
linkTitle: updates
description: Update Active-Active configuration requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/crdbs/updates
         /rs/references/rest-api/crdbs/updates.md
         /rs/references/restapi/crdbs/updates
         /rs/references/restapi/crdbs/updates.md
         /rs/references/rest_api/crdbs/updates
         /rs/references/rest_api/crdbs/updates.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-crdbs-updates) | `/v1/crdbs/{crdb_guid}/updates` | Modify Active-Active confgurarion |

## Modify Active-Active configuration {#post-crdbs-updates}

	POST /v1/crdbs/{crdb_guid}/updates

Modify Active-Active configuration.

{{<warning>}}
This is a very powerful API request and can cause damage if used incorrectly.
{{</warning>}}

In order to add or remove instances, you must use this API. For simple configuration updates, it is recommended to use PATCH on /crdbs/{crdb_guid} instead.

Updating default_db_config affects both existing and new instances that may be added.

When you update db_config, it changes the configuration of the database that you specify. This field overrides corresponding fields (if any) in default_db_config.

### Request {#post-request} 

#### Example HTTP request

    POST /crdbs/1/updates

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| X-Task-ID | string | Specified task ID |
| X-Result-TTL | integer | Time (in seconds) to keep task result |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| crdb_guid | string | Globally unique Active-Active database ID (GUID) |

#### Request body

Include a [CRDB modify_request object]({{<relref "/rs/references/rest-api/objects/crdb">}}) with updated fields in the request body.

### Response {#post-response} 

Returns a [CRDB task object]({{<relref "/rs/references/rest-api/objects/crdb_task">}}).

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request has been accepted. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | The posted Active-Active database contains invalid parameters. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Configuration, instance or Active-Active database not found. |
| [406&nbsp;Not&nbsp;Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The posted Active-Active database cannot be accepted. |
