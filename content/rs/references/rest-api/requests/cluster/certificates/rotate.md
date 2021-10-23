---
Title: Rotate cluster certificates requests
linkTitle: rotate
description: Rotate cluster certificates requests
weight: $weight
alwaysopen: false
headerRange: "[1-2]"
categories: ["RS"]
aliases: /rs/references/rest-api/cluster/certificates/rotate
         /rs/references/rest-api/cluster/certificates/rotate.md
         /rs/references/restapi/cluster/certificates/rotate
         /rs/references/restapi/cluster/certificates/rotate.md
         /rs/references/rest_api/cluster/certificates/rotate
         /rs/references/rest_api/cluster/certificates/rotate.md
---

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-cluster-certificates-rotate) | `/v1/cluster/certificates/rotate` | Regenerate all internal cluster certificates |

## Rotate cluster certificates {#post-cluster-certificates-rotate}

	POST /v1/cluster/certificates/rotate

Regenerates all _internal_ cluster certificates.

The certificate rotation will be performed on all nodes within the cluster. If
"name" is provided, only rotate the specified certificate on all nodes within the cluster.

### Request {#post-request} 

#### Example HTTP request

	POST /cluster/certificates/rotate

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#post-response} 

Responds with a `200 OK` status code if the internal certificates successfully rotate across the entire cluster.

### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | No error |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Failed, not all nodes have been updated. |
| [403 Forbidden](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.4) | Unsupported internal certificate rotation. |
