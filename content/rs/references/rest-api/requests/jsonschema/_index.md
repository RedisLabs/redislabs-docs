---
Title: JSON schema requests
linkTitle: jsonschema
description: Documents the Redis Enterprise Software REST API jsonschema requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/jsonschema
         /rs/references/rest-api/jsonschema.md
         /rs/references/restapi/jsonschema
         /rs/references/restapi/jsonschema.md
         /rs/references/rest_api/jsonschema
         /rs/references/rest_api/jsonschema.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-jsonschema) | `/v1/jsonschema` | Get JSON schema of API objects |

## Get JSON schema of API objects {#get-jsonschema}

	GET /v1/jsonschema

Get the JSON schema of various Redis Enterprise REST API objects.

### Request {#get-request} 

#### Example HTTP request

	GET /jsonschema?object=bdb 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

#### Query parameters

| Field | Type | Description |
|-------|------|-------------|
| object | string | Optional. The API object name: 'cluster', 'node', 'bdb' etc. |

### Response {#get-response} 

#### Example JSON body

```json
{
     "type": "object",
     "description": "An API object that represents a managed database in the cluster.",
     "properties": {
          "...."
     },
     "...."
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | Success. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | Invalid object. |
