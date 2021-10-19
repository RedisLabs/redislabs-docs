---
Title: Node BDB debug info requests
linkTitle: bdb
description: Documents the Redis Enterprise Software REST API debuginfo/node/bdb requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/debuginfo/node/bdb
         /rs/references/rest-api/debuginfo/node/bdb.md
         /rs/references/restapi/debuginfo/node/bdb
         /rs/references/restapi/debuginfo/node/bdb.md
         /rs/references/rest_api/debuginfo/node/bdb
         /rs/references/rest_api/debuginfo/node/bdb.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-debuginfo-node-bdb) | `/v1/debuginfo/node/bdb/{bdb_uid}` | Get debuginfo for the current node regarding a specific BDB |

## Get debug info for a BDB on the current node {#get-debuginfo-node-bdb}

	GET /v1/debuginfo/node/bdb/{int: bdb_uid}

Fetch debuginfo tarfile which contains logs and other system
information used for troubleshooting, for the given bdb.

#### Required permissions

| Permission name |
|-----------------|
| [view_debugging_info]({{<relref "/rs/references/rest-api/permissions#view_debugging_info">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /debuginfo/node/bdb/1 

### Response {#get-response} 

Downloads the debuginfo in a tarball called _filename_.tar.gz. Extract the files from the tarball to access the debuginfo for the current node regarding the given bdb uid.

#### Response headers

| Key | Value | Description |
|-----|-------|-------------|
| Content-Type | application/x-gzip | Media type of request/response body |
| Content-Length | 653350 | Length of the response body in octets |
| Content-Disposition | attachment; filename=debuginfo.tar.gz | Display response in browser 

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Failed to get debuginfo. |