---
Title: Modules requests
linkTitle: modules
description: Redis modules requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
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
| [POST](#post-module-v2) | `/v2/modules` | Upload a new module and its dependencies |
| [DELETE](#delete-module) | `/v1/modules/{uid}` | Delete a module without dependencies |
| [DELETE](#delete-module-v2) | `/v2/modules/{uid}` | Delete a module with dependencies |

## List modules {#list-modules}

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

Returns a JSON array of [module objects]({{<relref "/rs/references/rest-api/objects/module">}}).

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

Returns a [module object]({{<relref "/rs/references/rest-api/objects/module">}}).

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Module does not exist. |

## Upload module v1 {#post-module}

	POST /v1/modules

Uploads a new module to the cluster.

The request must contain a Redis module, bundled using [RedisModule
Packer](https://github.com/RedisLabs/RAMP).

#### Required permissions

| Permission name |
|-----------------|
| [update_cluster]({{<relref "/rs/references/rest-api/permissions#update_cluster">}}) |

### Request {#post-request} 

#### Example HTTP request

	POST /v1/modules 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | 127.0.0.1 | Domain name |
| Accept | \*/\* | Accepted media type |
| Content-Length | 865 | Length of the request body in octets |
| Expect | 100-continue | Requires particular server behaviors |
| Content-Type | multipart/form-data; boundary=------------------------4751ac3b332ace13 | Media type of request/response body |

### Response {#post-response} 

Returns a status code. If an error occurs, the response body may include an error code and message with more details.

### Error codes {#post-error-codes} 

The server may return a JSON object with `error_code` and `message` fields that provide additional information. The following are possible `error_code` values:

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

## Upload module v2 {#post-module-v2}

	POST /v2/modules

Asynchronously uploads a new module and its dependencies to the cluster.

The request must contain a Redis module bundled using [RedisModule Packer](https://github.com/RedisLabs/RAMP). If the module's metadata includes a `dependencies` section, a `/v2/modules` request automatically uploads the dependencies.

#### Required permissions

| Permission name |
|-----------------|
| [update_cluster]({{<relref "/rs/references/rest-api/permissions#update_cluster">}}) |

### Request {#post-request-v2} 

#### Example HTTP request

	POST /v2/modules 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | 127.0.0.1 | Domain name |
| Accept | \*/\* | Accepted media type |
| Content-Length | 865 | Length of the request body in octets |
| Expect | 100-continue | Requires particular server behaviors |
| Content-Type | multipart/form-data; boundary=------------------------4751ac3b332ace13 | Media type of request/response body |

### Response {#post-response-v2} 

Returns a [module object]({{<relref "/rs/references/rest-api/objects/module">}}) with an additional `action_uid` field.

You can use the `action_uid` to track the progress of the module upload.

#### Example JSON body

```json
{
   "action_uid":"dfc0152c-8449-4b1c-9184-480ea7cb526c",
   "author":"RedisLabs",
   "capabilities":[
      "types",
      "crdb",
      "failover_migrate",
      "persistence_aof",
      "persistence_rdb",
      "clustering",
      "backup_restore"
   ],
   "command_line_args":"Plugin gears_python CreateVenv 1",
   "config_command":"RG.CONFIGSET",
   "dependencies":{
      "gears_jvm":{
         "sha256":"b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
         "url":"http://example.com/redisgears_plugins/jvm_plugin/gears-jvm.linux-centos7-x64.0.1.0.tgz"
      },
      "gears_python":{
         "sha256":"22dca9cd75484cb15b8130db37f5284e22e3759002154361f72f6d2db46ee682",
         "url":"http://example.com/redisgears-python.linux-centos7-x64.1.2.1.tgz"
      }
   },
   "description":"Dynamic execution framework for your Redis data",
   "display_name":"RedisGears",
   "email":"user@example.com",
   "homepage":"http://redisgears.io",
   "is_bundled":false,
   "license":"Redis Source Available License Agreement",
   "min_redis_pack_version":"6.0.0",
   "min_redis_version":"6.0.0",
   "module_name":"rg",
   "semantic_version":"1.2.1",
   "sha256":"2935ea53611803c8acf0015253c5ae1cd81391bbacb23e14598841e1edd8d28b",
   "uid":"98f255d5d33704c8e4e97897fd92e32d",
   "version":10201
}
```

### Error codes {#post-error-codes-v2} 

The server may return a JSON object with `error_code` and `message` fields that provide additional information.

Possible `error_code` values include [`/v1/modules` error codes](#post-error-codes) and the following:

| Code | Description |
|------|-------------|
| invalid_dependency_data | Provided dependencies have an unexpected format |

### Status codes {#post-status-codes-v2} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, scheduled module upload. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Module name or version does not exist. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Dependency not found. |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Failed to get dependency. |

## Delete module v1 {#delete-module}

	DELETE /v1/modules/{string: uid}

Delete a module.

If the module has dependencies, use the [`v2` request](#delete-module-v2) instead.

#### Required permissions

| Permission name |
|-----------------|
| [update_cluster]({{<relref "/rs/references/rest-api/permissions#update_cluster">}}) |

### Request {#delete-request} 

#### Example HTTP request

	DELETE /v1/modules/1 

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

Returns a status code to indicate module deletion success or failure.

### Error codes {#delete-error-codes} 

| Code | Description |
|------|-------------|
| dependencies_not_supported | You can use the following API endpoint to delete this module with its dependencies: `/v2/modules/<uid>` |

### Status codes {#delete-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, the module is deleted. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to delete a nonexistent module. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The request is not acceptable. |

## Delete module v2 {#delete-module-v2}

	DELETE /v2/modules/{string: uid}

Delete a module with dependencies.

#### Required permissions

| Permission name |
|-----------------|
| [update_cluster]({{<relref "/rs/references/rest-api/permissions#update_cluster">}}) |

### Request {#delete-request-v2} 

#### Example HTTP request

	DELETE /v2/modules/1 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The module's unique ID. |

### Response {#delete-response-v2} 

Returns a JSON object with an `action_uid` that allows you to track the progress of module deletion.

### Status codes {#delete-status-codes-v2} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, scheduled module deletion. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to delete a nonexistent module. |
