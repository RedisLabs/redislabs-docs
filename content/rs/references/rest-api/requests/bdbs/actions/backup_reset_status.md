---
Title: Backup reset status database action requests
linkTitle: backup_reset_status
description: Documents the Redis Enterprise Software REST API bdbs/actions/imbackup_reset_statusport requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/actions/backup_reset_status
         /rs/references/rest-api/bdbs/actions/backup_reset_status.md
         /rs/references/restapi/bdbs/actions/backup_reset_status
         /rs/references/restapi/bdbs/actions/backup_reset_status.md
         /rs/references/rest_api/bdbs/actions/backup_reset_status
         /rs/references/rest_api/bdbs/actions/backup_reset_status.md
---

| Method | Path | Description |
|--------|------|-------------|
| [PUT](#put-bdbs-actions-backup-reset-status) | `/v1/bdbs/{uid}/actions/backup_reset_status` | Reset database backup status |

## Reset database backup status {#put-bdbs-actions-backup-reset-status}

	PUT /v1/bdbs/{int: uid}/actions/backup_reset_status

Reset the database's `backup_status` to idle if a backup is not in progress and clears the value of the `backup_failure_reason` field.

#### Required permissions

| Permission name |
|-----------------|
| [reset_bdb_current_backup_status]({{<relref "/rs/references/rest-api/permissions#reset_bdb_current_backup_status">}}) |

### Request {#put-request} 

#### Example HTTP request

	PUT /bdbs/1/actions/backup_reset_status 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| uid | integer | The unique ID of the database |

### Response {#put-response} 


### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The request is accepted and is being processed. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Attempting to perform an action on a nonexistent database. |
| [406&nbsp;Not&nbsp;Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Not all the modules loaded to the database support 'backup_restore' capability |
| [409 Conflict](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10) | Database is currently busy with another action. In this context, this is a temporary condition and the request should be reattempted later. |
