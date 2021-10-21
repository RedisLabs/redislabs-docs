---
Title: CRDB flush requests
linkTitle: flush
description: Documents the Redis Enterprise Software REST API crdbs/flush requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/crdbs/flush
         /rs/references/rest-api/crdbs/flush.md
         /rs/references/restapi/crdbs/flush
         /rs/references/restapi/crdbs/flush.md
         /rs/references/rest_api/crdbs/flush
         /rs/references/rest_api/crdbs/flush.md
---

| Method | Path | Description |
|--------|------|-------------|
| [PUT](#put-crdbs-flush) | `/v1/crdbs/{crdb_guid}/flush` | Flush an Active-Active database |

## Flush an Active-Active database {#put-crdbs-flush}

	PUT /v1/crdbs/{crdb_guid}/flush

Flush an Active-Active database.

### Request {#put-request} 

#### Example HTTP request

    PUT /crdbs/1/flush

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| X-Task-ID | string | Specified task ID |
| X-Result-TTL | integer | Time (in seconds) to keep task result |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| crdb_guid | string | Globally unique Active-Active database ID (GUID) |

### Response {#put-response} 

Returns a [CRDB task object]({{<relref "/rs/references/rest-api/objects/crdb_task">}}).

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Action was successful. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | The request is invalid or malformed. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Configuration or Active-Active database not found. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Configuration cannot be accepted, typically because it was already committed. |
