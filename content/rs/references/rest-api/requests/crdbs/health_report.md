---
Title: CRDB health report requests
linkTitle: health_report
description: Active-Active database health report requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/crdbs/flush
         /rs/references/rest-api/crdbs/flush.md
         /rs/references/restapi/crdbs/flush
         /rs/references/restapi/crdbs/flush.md
         /rs/references/rest_api/crdbs/flush
         /rs/references/rest_api/crdbs/flush.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-crdbs-health) | `/v1/crdbs/{crdb_guid}/health_report` | Get a health report for an Active-Active database |

## Get health report {#get-crdbs-health}

	GET /v1/crdbs/{crdb_guid}/health_report

Get a health report for an Active-Active database.

### Request {#get-request} 

#### Example HTTP request

    GET /crdbs/552bbccb-99f3-4142-bd17-93d245f0bc79/health_report

#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| crdb_guid | string | Globally unique Active-Active database ID (GUID) |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| instance_id | integer | The request retrieves information from the specified Active-Active database instance. If this instance doesn’t exist, the request retrieves information from all instances. (optional) |

### Response {#get-response} 

Returns a JSON array of [CRDB health report objects]({{<relref "/rs/references/rest-api/objects/crdb/health_report">}}).

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Action was successful. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Configuration or Active-Active database not found. |
