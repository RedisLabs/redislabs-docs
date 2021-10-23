---
Title: Suffix requests
linkTitle: suffix
description: DNS suffix requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/suffix
         /rs/references/rest-api/suffix.md
         /rs/references/restapi/suffix
         /rs/references/restapi/suffix.md
         /rs/references/rest_api/suffix
         /rs/references/rest_api/suffix.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-suffix) | `/v1/suffix/{name}` | Get a single DNS suffix |

## Get suffix {#get-suffix}

	GET /v1/suffix/{string: name}

Get a single DNS suffix.

### Request {#get-request} 

#### Example HTTP request

	GET /suffix/cluster.fqdn 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |


#### URL parameters

| Field | Type | Description |
|-------|------|-------------|
| name | string | The unique name of the suffix requested. |

### Response {#get-response} 

Returns a [suffix object]({{<relref "/rs/references/rest-api/objects/suffix">}}).

#### Example JSON body

```json
{
    "name": "cluster.fqdn",
    "// additional fields..."
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | Suffix name does not exist |
