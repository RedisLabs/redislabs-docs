---
Title: All nodes database debug info requests
linkTitle: bdb
description: Documents the Redis Enterprise Software REST API debuginfo/all/bdb requests.
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: 
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-all-debuginfo-bdb) | `/v1/debuginfo/all/bdb{bdb_uid}` | Get debug info for a database from all nodes |

## Get database debug info for all nodes {#get-all-debuginfo-bdb}

	GET /v1/debuginfo/all/bdb/{int: bdb_uid}

Downloads a tar file that contains debug info for the specified database (`bdb_uid`) from all nodes.

#### Required permissions

| Permission name |
|-----------------|
| [view_debugging_info]({{<relref "/rs/references/rest-api/permissions#view_debugging_info">}}) |

### Request {#get-all-request} 

#### Example HTTP request

	GET /debuginfo/all/bdb/1 

### Response {#get-all-response} 

Downloads the debug info in a tar file called `filename.tar.gz`. Extract the files from the tar file to access the debug info.

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
| [500 Internal Server Error](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.1) | Failed to get debug info. |
