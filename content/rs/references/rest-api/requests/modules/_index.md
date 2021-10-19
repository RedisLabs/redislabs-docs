---
Title: Modules requests
linkTitle: modules
description: Documents the Redis Enterprise Software REST API modules requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/modules
         /rs/references/rest-api/modules.md
         /rs/references/restapi/modules
         /rs/references/restapi/modules.md
         /rs/references/rest_api/modules
         /rs/references/rest_api/modules.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#list-modules) | `/v1/modules` | List available modules |
| [GET](#get-module) | `/v1/modules/{uid}` | Get a specific module |
| [POST](#post-module) | `/v1/modules` | Upload a new module |
| [DELETE](#delete-module) | `/v1/modules/{uid}` | Delete a module |

## List available modules {#list-modules}

	GET /v1/modules

List available modules, i.e. modules stored within the CCS.

#### Required permissions

| Permission name |
|-----------------|
| [view_cluster_modules]({{<relref "/rs/references/rest-api/permissions#view_cluster_modules">}}) |

### Request {#list-request} 

#### Example HTTP request

    GET /modules

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | 127.0.0.1:9443 | Domain name |
| Accept | \*/\* | Accepted media type |

### Response {#list-response} 

### Status codes {#list-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

## Get module {#get-module}

	GET /v1/modules/{string: uid}

Get specific available modules, i.e. modules stored within the CCS.

#### Required permissions

| Permission name |
|-----------------|
| [view_cluster_modules]({{<relref "/rs/references/rest-api/permissions#view_cluster_modules">}}) |

### Request {#get-request} 

#### Example HTTP request

    GET /modules/1

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | 127.0.0.1:9443 | Domain name |
| Accept | \*/\* | Accepted media type |	

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The module's unique ID. |

### Response {#get-response} 

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Module does not exist. |

## Upload module {#post-module}

	POST /v1/modules

Uploads a new module into the CCS.

The request must contain a Redis module, bundled using [RedisModule
Packer](https://github.com/RedisLabs/RAMP).

#### Required permissions

| Permission name |
|-----------------|
| [update_cluster]({{<relref "/rs/references/rest-api/permissions#update_cluster">}}) |

### Request {#post-request} 

#### Example HTTP request

	POST /modules 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | 127.0.0.1 | Domain name |
| Accept | \*/\* | Accepted media type |
| Content-Length | 865 | Length of the request body in octets |
| Expect | 100-continue | Requires particular server behaviors |
| Content-Type | multipart/form-data; boundary=------------------------4751ac3b332ace13 | Media type of request/response body |

### Response {#post-response} 


### Error codes {#post-error-codes} 

When errors are reported, the server may return a JSON object with `error_code` and `message` field that provide additional information. The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| no_module | Module wasn't provided | 
| invalid_module | Module either corrupted or packaged files are wrong | 
| module_exists | Module already in system | 
| min_redis_pack_version | Module isn't supported yet in this Redis pack | 
| unsupported_module_capabilities | The module does not support required capabilities| 
| os_not_supported | This module is not supported for this operating system |
| dependencies_not_supported | This endpoint does not support dependencies, see v2 |

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Either missing module file or an invalid module file. |

## Delete module {#delete-module}

	DELETE /v1/modules/{string: uid}

Delete a module.

#### Required permissions

| Permission name |
|-----------------|
| [update_cluster]({{<relref "/rs/references/rest-api/permissions#update_cluster">}}) |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /module/1 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The module's unique ID. |

### Response {#delete-response} 


### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, the module is deleted. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to delete a nonexistent module. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The request is not acceptable. |
