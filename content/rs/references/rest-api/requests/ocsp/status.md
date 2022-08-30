---
Title: OCSP status requests
linkTitle: status
description: OCSP status requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/ocsp/status
         /rs/references/rest-api/ocsp/status.md
         /rs/references/restapi/ocsp/status
         /rs/references/restapi/ocsp/status.md
         /rs/references/rest_api/ocsp/status
         /rs/references/rest_api/ocsp/status.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-status) | `/v1/ocsp/status` | Get OCSP status |

## Get OCSP status {#get-status}

	GET /v1/ocsp/status

Gets the latest cached status of the proxy certificate’s OCSP response.

#### Required permissions

| Permission name |
|-----------------|
| [view_ocsp_status]({{<relref "/rs/references/rest-api/permissions#view_ocsp_status">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /ocsp/status 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-response} 

Returns an [OCSP status object]({{<relref "/rs/references/rest-api/objects/ocsp_status">}}).

#### Example JSON body

```json
{
    "responder_url": "http://responder.ocsp.url.com",
    "cert_status": "REVOKED",
    "produced_at": "Wed, 22 Dec 2021 12:50:11 GMT",
    "this_update": "Wed, 22 Dec 2021 12:50:11 GMT",
    "next_update": "Wed, 22 Dec 2021 14:50:00 GMT",
    "revocation_time": "Wed, 22 Dec 2021 12:50:04 GMT"
}
```

### Error codes {#get-error-codes} 

When errors occur, the server returns a JSON object with `error_code` and `message` fields that provide additional information. The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| ocsp_unsupported_by_capability | Not all nodes support OCSP capability | 
| invalid_ocsp_response | The server returned a response that is not OCSP-compatible |

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Feature not supported in all nodes |