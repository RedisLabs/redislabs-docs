---
Title: CRDBs requests
linkTitle: crdbs
description: Documents the Redis Enterprise Software REST API crdbs requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/crdbs
         /rs/references/rest-api/crdbs.md
         /rs/references/restapi/crdbs
         /rs/references/restapi/crdbs.md
         /rs/references/rest_api/crdbs
         /rs/references/rest_api/crdbs.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-crdbs) | `/v1/crdbs` | Get all Active-Active databases |
| [GET](#get-crdb) | `/v1/crdbs/{crdb_guid}` | Get a specific Active-Active database |
| [PATCH](#patch-crdbs) | `/v1/crdbs/{crdb_guid}` | Update Active-Active configuration |
| [POST](#post-crdb) | `/v1/crdbs` | Create a new Active-Active database |
| [DELETE](#delete-crdb) | `/v1/crdbs/{crdb_guid}` | Delete an Active-Active database |

## Get all Active-Active databases {#get-all-crdbs}

	GET /v1/crdbs

Get a list of all Active-Active databases on the cluster.

### Request {#get-all-request} 

#### Example HTTP request

    GET /crdbs

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| X-Task-ID | string | Specified task ID |
| X-Result-TTL | integer | Time (in seconds) to keep task result |

### Response {#get-all-response} 

Returns a JSON array of [CRDB objects]({{<relref "/rs/references/rest-api/objects/crdb">}}).

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | A list of Active-Active database. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |

## Get an Active-Active database {#get-crdb}

	GET /v1/crdbs/{crdb_guid}

Get a specific Active-Active database.

### Request {#get-request} 

#### Example HTTP request

    GET /crdbs/1

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| X-Task-ID | string | Specified task ID |
| X-Result-TTL | integer | Time (in seconds) to keep task result |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| crdb_guid | string | Globally unique Active-Active database ID (GUID) |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| instance_id | integer | Instance from which to get the Active-Active database information |

### Response {#get-response} 

Returns a [CRDB object]({{<relref "/rs/references/rest-api/objects/crdb">}}).

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Active-Active database information is returned. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Database or configuration does not exist. |

## Update Active-Active configuration {#patch-crdbs}

	PATCH /v1/crdbs/{crdb_guid}

Update Active-Active configuration.

This API request is used to change CRDB configuration.

In order to add or remove instances, use POST crdbs/{crdb_guid}/updates instead.

### Request {#patch-request} 

#### Example HTTP request

    PATCH /crdbs/1

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

Include a [CRDB object]({{<relref "/rs/references/rest-api/objects/crdb">}}) with updated fields in the request body.

### Response {#patch-response} 

Returns a [CRDB task object]({{<relref "/rs/references/rest-api/objects/crdb_task">}}).

### Status codes {#patch-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request has been accepted. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | The posted Active-Active database contains invalid parameters. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Configuration or Active-Active database not found. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The posted Active-Active database cannot be accepted. |

## Create an Active-Active database {#post-crdb}

	POST /v1/crdbs

Create a new Active-Active database.

### Request {#post-request} 

#### Example HTTP request

    POST /crdbs

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| X-Task-ID | string | Specified task ID |
| X-Result-TTL | integer | Time (in seconds) to keep task result |

#### Request body

Include a [CRDB object]({{<relref "/rs/references/rest-api/objects/crdb">}}), which defines the Active-Active database, in the request body.

### Response {#post-response} 

Returns a [CRDB task object]({{<relref "/rs/references/rest-api/objects/crdb_task">}}).

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request has been accepted. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | The request is invalid or malformed. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The posted Active-Active database cannot be accepted. |

## Delete an Active-Active database {#delete-crdb}

	DELETE /v1/crdbs/{crdb_guid}

Delete an Active-Active database.

### Request {#delete-request} 

#### Example HTTP request

    DELETE /crdbs/1

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| X-Task-ID | string | Specified task ID |
| X-Result-TTL | integer | Time (in seconds) to keep task result |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| crdb_guid | string | Globally unique Active-Active database ID (GUID) |

### Response {#delete-response} 

Returns a [CRDB task object]({{<relref "/rs/references/rest-api/objects/crdb_task">}}).

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Action was successful. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | Unauthorized request. Invalid credentials |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Configuration or Active-Active database not found. |
| [406&nbsp;Not&nbsp;Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The Active-Active GUID is invalid or the Active-Active database was already deleted. |
