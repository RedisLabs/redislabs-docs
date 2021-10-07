---
Title: Database modules config requests
linkTitle: config
description: Documents the Redis Enterprise Software REST API bdbs/modules/config requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/modules/config
         /rs/references/rest-api/bdbs/modules/config.md
         /rs/references/restapi/bdbs/modules/config
         /rs/references/restapi/bdbs/modules/config.md
         /rs/references/rest_api/bdbs/modules/config
         /rs/references/rest_api/bdbs/modules/config.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-bdb-modules-config) | `/v1/bdbs/{uid}/modules/config` | Configure module |

## Configure module {#post-bdb-modules-config}

	POST /v1/bdbs/{string: uid}/modules/config

Use the module runtime configuration command (if defined) to configure new arguments for the module.

#### Required permissions

| Permission name |
|-----------------|
| edit_bdb_module |

### Request {#post-request} 

#### Example HTTP request

	POST /bdb/1/modules/config

#### Example JSON body

```json
{
     "module_name": "ft",
     "module_args": "MINPREFIX 3 MAXEXPANSIONS 1000"
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### Request body

| Field | Type | Description |
|-------|------|-------------|
| module_name | string | Module's name |
| module_args | string | Module command line arguments (pattern does not allow special characters &,<,>,”) |

### Response {#post-response} 

### Error codes {#post-error-codes} 

When errors are reported, the server may return a JSON object with `error_code` and `message` field that provide additional information. The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| db_not_exist | Database with given uid doesn't exist in cluster | 
| missing_field | "module_name" or "module_args" are not defined in request | 
| invalid_schema | JSON object received is not a dict object | 
| param_error | "module_args" parameter was not parsed properly | 
| module_not_exist | Module with given "module_name" does not exist for the database | 

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, module updated on bdb. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | bdb not found. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Module does not support runtime configuration of arguments. |
