---
Title: Recover database action requests
linkTitle: recover
description: Database recovery requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/actions/recover
         /rs/references/rest-api/bdbs/actions/recover.md
         /rs/references/restapi/bdbs/actions/recover
         /rs/references/restapi/bdbs/actions/recover.md
         /rs/references/rest_api/bdbs/actions/recover
         /rs/references/rest_api/bdbs/actions/recover.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-bdbs-actions-recover) | `/v1/bdbs/{uid}/actions/recover` | Get a database recovery plan |
| [POST](#post-bdbs-actions-recover) | `/v1/bdbs/{uid}/actions/recover` | Initiate database recovery |

## Get database recovery plan {#get-bdbs-actions-recover}

	GET /v1/bdbs/{int: uid}/actions/recover

Fetch the recovery plan for a database in recovery mode.

The recovery plan provides information about the recovery status (if it is possible) and specific details on which available recovery files have been found.

#### Required permissions

| Permission name |
|-----------------|
| [view_bdb_recovery_plan]({{<relref "/rs/references/rest-api/permissions#view_bdb_recovery_plan">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /bdbs/1/actions/recover

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database for which a recovery plan is required. The database must be in recovery mode. |

### Response {#get-response} 

Returns the recovery plan as a JSON object.

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | DB does not exist. |

## Initiate database recovery {#post-bdbs-actions-recover}

	POST /v1/bdbs/{int: uid}/actions/recover

Initiate recovery for a database in recovery state.

#### Required permissions

| Permission name |
|-----------------|
| start_bdb_recovery |

### Request {#post-request} 

#### Example HTTP request

	POST /bdbs/1/actions/recover 

#### Example JSON body

```json
{
   "data_files": [
       {
           "filename": "appendonly-1.aof",
           "node_uid": "1",
           "shard_slots": "1-2048"
       },
       {   "filename": "appendonly-2.aof",
           "node_uid": "2",
           "shard_slots": "2049-4096"
       }
   ],
   "ignore_errors": false,
   "recover_without_data": false
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database to recover. |

#### Request body

The request body may be empty, in which case the database will be
recovered automatically:

-   Databases with no persistence are recovered with no data.
-   Persistent files (aof, rdb) will be loaded from their expected storage locations (i.e. where replica or master shards were last active).
-   If persistent files are not found where expected but can be located on other cluster nodes, they will be used.

The request may also include a request body with an explicit recovery plan.

### Response {#post-response} 

Returns a status code.

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request is accepted and is being processed. When the database is recovered, its status will become active. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to perform an action on a nonexistent database. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Database is currently busy with another action (e.g. recovery already in progress) or is not in recoverable state. |
