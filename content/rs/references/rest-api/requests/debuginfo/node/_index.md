---
Title: Node debug info requests
linkTitle: node
description: Documents the Redis Enterprise Software REST API debuginfo/node requests.
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/debuginfo/node
         /rs/references/rest-api/debuginfo/node.md
         /rs/references/restapi/debuginfo/node
         /rs/references/restapi/debuginfo/node.md
         /rs/references/rest_api/debuginfo/node
         /rs/references/rest_api/debuginfo/node.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-debuginfo-node) | `/v1/debuginfo/node` | Get debuginfo for the current node |

## Get debug info for current node {#get-debuginfo-node}

	GET /v1/debuginfo/node

Fetch a debuginfo tarfile which contains logs and other system
information used for troubleshooting.

#### Required permissions

| Permission name |
|-----------------|
| [view_debugging_info]({{<relref "/rs/references/rest-api/permissions#view_debugging_info">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /debuginfo/node 

### Response {#get-response} 

Downloads the debuginfo in a tarball called _filename_.tar.gz. Extract the files from the tarball to access the debuginfo.

#### Response headers

| Key | Value | Description |
|-----|-------|-------------|
| Content-Type | application/x-gzip | Media type of request/response body |
| Content-Length | 653350 | Length of the response body in octets |
| Content-Disposition | attachment; filename=debuginfo.tar.gz | Display response in browser or download as attachment |

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Failed to get debuginfo. |