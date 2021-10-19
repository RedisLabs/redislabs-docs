---
Title: License requests
linkTitle: license
description: Documents the Redis Enterprise Software REST API license requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/license
         /rs/references/rest-api/license.md
         /rs/references/restapi/license
         /rs/references/restapi/license.md
         /rs/references/rest_api/license
         /rs/references/rest_api/license.md
---

| Method | Path | Description |
|--------|------|-------------|
| [GET](#get-license) | `/v1/license` | Get license details |
| [PUT](#put-license) | `/v1/license` | Update the license |

## Get license {#get-license}

	GET /v1/license

Returns the license details, including license string, expiration,
and supported features.

#### Required permissions

| Permission name |
|-----------------|
| [view_license]({{<relref "/rs/references/rest-api/permissions#view_license">}}) |

### Request {#get-request} 

#### Example HTTP request

	GET /license 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Accept | application/json | Accepted media type |

### Response {#get-response} 

#### Example JSON body

```json
{
    "license": "----- LICENSE START -----\ndi+iK...KniI9\n----- LICENSE END -----\n",
    "expired": true,
    "activation_date":"2018-12-31T00:00:00Z",
    "expiration_date":"2019-12-31T00:00:00Z",
    "shards_limit": 300,
    "features": ["bigstore"]
}
```

### Status codes {#get-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | License is returned in the response body. |
| [404 Not Found](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) | No license is installed. |

## Update license {#put-license}

	PUT /v1/license

Validate and install a new license string.

#### Required permissions

| Permission name |
|-----------------|
| [install_new_license]({{<relref "/rs/references/rest-api/permissions#install_new_license">}}) |

### Request {#put-request} 

The request must be a JSON object with a single key named "license".

#### Example HTTP request

	PUT /license 

#### Example JSON body

```json
{
    "license": "----- LICENSE START -----\ndi+iK...KniI9\n----- LICENSE END -----\n"
}
```

#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Accept | application/json | Accepted media type |


#### Request body

| Field | Type | Description |
|-------|------|-------------|
| license | string | New license string |

### Response {#put-response} 

Returns an error if the new license is not valid.

### Status codes {#put-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | License installed successfully. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | Invalid request, either bad JSON object or corrupted license was supplied. |
| [406 Not Acceptable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7) | License violation. A response body provides more details on the specific cause. |
