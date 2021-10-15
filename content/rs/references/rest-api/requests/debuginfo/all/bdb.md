---
Title: All BDB debug info requests
linkTitle: bdb
description: Documents the Redis Enterprise Software REST API debuginfo/all/bdb requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/debuginfo/all/bdb
         /rs/references/rest-api/debuginfo/all/bdb.md
         /rs/references/restapi/debuginfo/all/bdb
         /rs/references/restapi/debuginfo/all/bdb.md
         /rs/references/rest_api/debuginfo/all/bdb
         /rs/references/rest_api/debuginfo/all/bdb.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-debuginfo-bdb) | `/v1/debuginfo/all/bdb{bdb_uid}` | Get debuginfo from all nodes for a BDB |

## Get debug info for all nodes for a BDB {#get-all-debuginfo-bdb}

	GET /v1/debuginfo/all/bdb/{int: bdb_uid}

Fetch debuginfo from all nodes that are relevent to a given bdb uid.

#### Required permissions

| Permission name |
|-----------------|
| view_debugging_info |

### Request {#get-all-request} 

#### Example HTTP request

	GET /debuginfo/all/bdb/1 

### Response {#get-all-response} 

Downloads the debuginfo in a tarball called _filename_.tar.gz. Extract the files from the tarball to access the debuginfo for all nodes relevant to the given bdb uid.

#### Response headers

| Key | Value | Description |
|-----|-------|-------------|
| Content-Type | application/x-gzip | Media type of request/response body |
| Content-Length | 653350 | Length of the response body in octets |
| Content-Disposition | attachment; filename=debuginfo.tar.gz | Display response in browser 

### Status codes {#get-all-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Failed to get debuginfo. |
