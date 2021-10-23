---
Title: Cluster module capabilities requests
linkTitle: module-capabilities
description: Redis module capabilities requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/cluster/module-capabilities
         /rs/references/rest-api/cluster/module-capabilities.md
         /rs/references/restapi/cluster/module-capabilities
         /rs/references/restapi/cluster/module-capabilities.md
         /rs/references/rest_api/cluster/module-capabilities
         /rs/references/rest_api/cluster/module-capabilities.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-cluster-module-capabilities) | `/v1/cluster/module-capabilities` | List possible Redis module capabilities |

## List Redis module capabilities {#get-cluster-module-capabilities}

	GET /v1/cluster/module-capabilities

List possible Redis module capabilities.

#### Required permissions

| Permission name |
|-----------------|
| [view_cluster_modules]({{<relref "/rs/references/rest-api/permissions#view_cluster_modules">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /cluster/module-capabilities 

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | \*/\* | Accepted media type |

### Response {#get-response} 

Returns a JSON object that contains a list of capability names and descriptions.

#### Example JSON body

```json
{
  "all_capabilities": [
    {"name": "types", "desc": "module has its own types and not only operate on existing redis types"},
    {"name": "no_multi_key", "desc": "module has no methods that operate on multiple keys"}
    "// additional capabilities..."
  ]
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |

