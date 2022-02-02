---
Title: Export database action requests
linkTitle: export
description: Export database requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/actions/export
         /rs/references/rest-api/bdbs/actions/export.md
         /rs/references/restapi/bdbs/actions/export
         /rs/references/restapi/bdbs/actions/export.md
         /rs/references/rest_api/bdbs/actions/export
         /rs/references/rest_api/bdbs/actions/export.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-bdbs-actions-export) | `/v1/bdbs/{uid}/actions/export` | Initiate database export |

## Initiate database export {#post-bdbs-actions-export}

	POST /v1/bdbs/{int: uid}/actions/export

Initiate a database export.

#### Required permissions

| Permission name |
|-----------------|
| [start_bdb_export]({{<relref "/rs/references/rest-api/permissions#start_bdb_export">}}) |

### Request {#post-request} 

#### Example HTTP request

	POST /bdbs/1/actions/export 

#### Example JSON body

```json
{
    "export_location": {
        "type": "url",
        "url": "ftp://..."
    },
    "email_notification": true
}
```

The above request initiates an export operation to the specified location.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database |


#### Request body

The request body should contain a JSON object with the following export parameters: 

| Field | Type | Description |
|-------|------|-------------|
| export_location | [backup_location/export_location]({{<relref "/rs/references/rest-api/objects/bdb/backup_location">}}) object | Details for the export destination. Call [`GET /jsonschema`]({{<relref "/rs/references/rest-api/requests/jsonschema#get-jsonschema">}}) on the bdb object and review the `backup_location` field to retrieve the object's structure.  |
| email_notification | boolean | Enable/disable an email notification on export failure/ completion. (optional) |

### Response {#post-response} 

Returns a status code.

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request is accepted and is being processed. In order to monitor progress, the BDB's `export_status`, `export_progress`, and `export_failure_reason` attributes can be consulted. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to perform an action on a nonexistent database. |
| [406&nbsp;Not&nbsp;Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Not all the modules loaded to the database support 'backup_restore' capability |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Database is currently busy with another action. In this context, this is a temporary condition and the request should be reattempted later. |
