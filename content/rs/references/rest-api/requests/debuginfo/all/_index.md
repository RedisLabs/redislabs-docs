---
Title: All debug info requests
linkTitle: all
description: Documents the Redis Enterprise Software REST API debuginfo/all requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/debuginfo/all
         /rs/references/rest-api/debuginfo/all.md
         /rs/references/restapi/debuginfo/all
         /rs/references/restapi/debuginfo/all.md
         /rs/references/rest_api/debuginfo/all
         /rs/references/rest_api/debuginfo/all.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-debuginfo) | `/v1/debuginfo/all` | Get debuginfo for all nodes |

## Get debug info for all nodes {#get-all-debuginfo}

	GET /v1/debuginfo/all

Fetch debuginfo from all nodes.

#### Required permissions

| Permission name |
|-----------------|
| view_debugging_info |

### Request {#get-all-request} 

#### Example HTTP request

	GET /debuginfo/all 

### Response {#get-all-response} 

Downloads the debuginfo in a tarball called _filename_.tar.gz. Extract the files from the tarball to access the debuginfo for all nodes.

#### Response headers

| Key | Value | Description |
|-----|-------|-------------|
| Content-Type | application/x-gzip | Media type of request/response body |
| Content-Length | 653350 | Length of the response body in octets |
| Content-Disposition | attachment; filename=debuginfo.tar.gz | Display response in browser or download as attachment |

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Failed to get debuginfo. |
