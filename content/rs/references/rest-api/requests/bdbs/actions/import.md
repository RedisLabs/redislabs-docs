---
Title: Import database action requests
linkTitle: import
description: Import database requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/actions/import
         /rs/references/rest-api/bdbs/actions/import.md
         /rs/references/restapi/bdbs/actions/import
         /rs/references/restapi/bdbs/actions/import.md
         /rs/references/rest_api/bdbs/actions/import
         /rs/references/rest_api/bdbs/actions/import.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-bdbs-actions-import) | `/v1/bdbs/{uid}/actions/import` | Initiate manual dataset import |

## Initiate manual dataset import {#post-bdbs-actions-import}

	POST /v1/bdbs/{int: uid}/actions/import

Initiate a manual import process.

#### Required permissions

| Permission name |
|-----------------|
| [start_bdb_import]({{<relref "/rs/references/rest-api/permissions#start_bdb_import">}}) |

### Request {#post-request} 

#### Example HTTP request

	POST /bdbs/1/actions/import 

#### Example JSON body

```json
{
    "dataset_import_sources": [
        {
            "type": "url",
            "url": "http://..."
        },
        {
            "type": "url",
            "url": "redis://..."
        }
    ],
    "email_notification": true
}
```

This request initiates an import process using `dataset_import_sources` values that were previously configured for the database.

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |
| Content-Length | 0 | Length of the request body in octets |

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database |

#### Request body

The request _may_ contain a subset of the [BDB JSON object]({{<relref "/rs/references/rest-api/objects/bdb">}}), which includes the following import-related attributes: 

| Field | Type | Description |
|-------|------|-------------|
| dataset_import_sources | array of [dataset_import_sources]({{<relref "/rs/references/rest-api/objects/bdb/dataset_import_sources">}}) objects | Details for the import sources. Call [`GET /jsonschema`]({{<relref "/rs/references/rest-api/requests/jsonschema#get-jsonschema">}}) on the bdb object and review the `dataset_import_sources` field to retrieve the object's structure.  |
| email_notification | boolean | Enable/disable an email notification on import failure/ completion. (optional) |

{{<note>}}
Other attributes are not allowed and will cause the request to fail.
{{</note>}}

### Response {#post-response} 

Returns a status code.

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request is accepted and is being processed. In order to monitor progress, the `import_status`, `import_progress`, and `import_failure_reason` attributes can be consulted. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to perform an action on a nonexistent database. |
| [406&nbsp;Not&nbsp;Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Not all the modules loaded to the database support 'backup_restore' capability. |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Database is currently busy with another action. In this context, this is a temporary condition and the request should be reattempted later. |
