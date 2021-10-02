---
Title: Upgrade database requests
linkTitle: upgrade
description: Documents the Redis Enterprise Software REST API bdbs/upgrade requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/upgrade
         /rs/references/rest-api/bdbs/upgrade.md
         /rs/references/restapi/bdbs/upgrade
         /rs/references/restapi/bdbs/upgrade.md
         /rs/references/rest_api/bdbs/upgrade
         /rs/references/rest_api/bdbs/upgrade.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-bdbs-upgrade) | `/v1/bdbs/{uid}/upgrade` | Upgrade database |

## Upgrade database {#post-bdbs-upgrade}

	POST /v1/bdbs/{int: uid}/upgrade

Upgrade a BDB.

#### Required permissions

| Permission name |
|-----------------|
| update_bdb_with_action |

### Request {#post-request} 

#### Example HTTP request

	POST /bdbs/1/upgrade 

#### Example JSON body

```json
{
    "swap_roles": true,
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
| force_restart | boolean | Restart shards even if no version change (default: false) |
| keep_redis_version | boolean | Keep current Redis version (default: false) |
| keep_crdt_protocol_version | boolean | Keep current crdt protocol version (default: false)  |
| may_discard_data | boolean | Discard data in a non-replicated, non-persistent bdb (default: false) |
| force_discard | boolean | Discard data even if the bdb is replicated and/or persistent (default: false) |
| preserve_roles | boolean | Preserve shards' master/replica roles (requires an extra failover) (default: false) |
| parallel_shards_upgrade | integer | Max number of shards to upgrade in parallel (default: all) |
| modules | list of modules | List of dicts representing the modules that will be upgraded.<br></br>Each dict includes:<br></br>• `current_module`: uid of a module to upgrade<br></br>• `new_module`: uid of the module we want to upgrade to<br></br>• `new_module_args`: args list for the new module (no defaults for the three module-related parameters).

### Response {#post-response} 

#### Example JSON body

```json
{
    "uid": 1,
    "replication": true,
    "data_persistence": "aof",
    "// additional fields..."
}
```

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success, bdb upgrade initiated (`action_uid` can be used to track progress) |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Malformed or bad command |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | bdb not found |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | New module version capabilities don't comply with the database configuration |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Internal error |
