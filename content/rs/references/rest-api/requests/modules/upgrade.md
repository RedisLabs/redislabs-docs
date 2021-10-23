---
Title: Upgrade module requests
linkTitle: upgrade/bdb
description: Upgrade module requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/modules/upgrade-bdb
         /rs/references/rest-api/modules/upgrade-bdb.md
         /rs/references/restapi/modules/upgrade-bdb
         /rs/references/restapi/modules/upgrade-bdb.md
         /rs/references/rest_api/modules/upgrade-bdb
         /rs/references/rest_api/modules/upgrade-bdb.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-modules-upgrade-bdb) | `/v1/modules/upgrade/bdb/{uid}` | Upgrade module |

## Upgrade module {#post-modules-upgrade-bdb}

	POST /v1/modules/upgrade/bdb/{string: uid}

Upgrades module version on a specific BDB.

#### Required permissions

| Permission name |
|-----------------|
| [edit_bdb_module]({{<relref "/rs/references/rest-api/permissions#edit_bdb_module">}}) |

### Request {#post-request} 

#### Example HTTP request

	POST /modules/upgrade/bdb/1

#### Example JSON body

```json
{
     "modules": [
         {"module_name": "ReJson",
         "current_semantic_version": "2.2.1",
         "new_module": "aa3648d79bd4082d414587c42ea0b234"}
     ],
     "// Optional fields to fine-tune restart and failover behavior:",
     "preserve_roles": true,
     "may_discard_data": false
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
| modules | list | List of dicts representing the modules that will be upgraded. Each dict must include: <br></br> • **current_module**: uid of a module to upgrade <br></br> • **new_module**: uid of the module we want to upgrade to <br></br> • **new_module_args**: args list for the new module |
| preserve_roles | boolean | Preserve shards’ master/replica roles (optional) |
| may_discard_data | boolean | Discard data in a non-replicated non-persistent bdb (optional) |

### Response {#post-response} 

Returns the upgraded [module object]({{<relref "/rs/references/rest-api/objects/module">}}).

#### Example JSON body

```json
{
    "uid": 1,
    "name": "name of database #1",
    "module_id": "aa3648d79bd4082d414587c42ea0b234",
    "module_name": "ReJson",
    "semantic_version": "2.2.2"
    "// additional fields..."
}
```

### Error codes {#post-error-codes} 

When errors are reported, the server may return a JSON object with    `error_code` and `message` field that provide additional information.    The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| missing_module | Module is not present in cluster.| 
| module_downgrade_unsupported | Module downgrade is not allowed.| 
| redis_incompatible_version | Module min_redis_version is bigger than the current Redis version.| 
| redis_pack_incompatible_version | Module min_redis_pack_version is bigger than the current Redis Enterprise version.| 
| unsupported_module_capabilities | New version of module does support all the capabilities needed for the database configuration| 

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, module updated on bdb. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | bdb or node not found. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Bad or missing configuration parameters. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | The requested configuration is invalid. |
