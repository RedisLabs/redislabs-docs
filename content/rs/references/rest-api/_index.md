---
Title: REST API
description: Documents the REST API available to Redis Enterprise Software deployments.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/
         /rs/references/rest-api.md
         /rs/references/restapi/
         /rs/references/restapi.md
         /rs/references/rest_api/
         /rs/references/rest_api.md
---

## Protocol and headers

### JSON requests and responses

The Redis Enterprise Software REST API uses [JavaScript Object Notation (JSON)](http://www.json.org) for requests and responses. See the [RFC 4627 technical specifications](http://www.ietf.org/rfc/rfc4627.txt) for additional information about JSON.

Some responses may have an empty body but indicate the response with standard [HTTP codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

Both requests and responses may include zero or more objects.

If the request is for a single entity, the response returns a single JSON object or none. If the request is for a list of entities, the response returns a JSON array with zero or more elements.

If you omit certain JSON object fields from a request, they may be assigned default values, which often indicate that these fields are not in use.

### Request headers

The Redis Enterprise REST API supports the following HTTP headers:

| Header | Supported/Required Values |
|--------|---------------------------|
| Accept | application/json |
| Content-Length | Length (in bytes) of request message |
| Content-Type | application/json |

### Response headers

The Redis Enterprise REST API supports the following HTTP headers:

| Header | Supported/Required Values |
|--------|---------------------------|
| Content-Type | application/json |
| Content-Length | Length (in bytes) of response message |

## API versions

All RLEC API operations are versioned in order to minimize the impact of backwards-incompatible API changes and to coordinate between different versions operating in parallel.

## Authentication

Authentication to the RLEC API occurs via Basic Auth. Provide your RLEC username and password as the basic auth credentials.

All calls must be made over SSL, to port 9443.

Example Request:

    curl -u "demo@redislabs.com:password" https://localhost:9443/v1/bdbs

## Common responses

The following are common responses which may return regardless of the request type.

| Response | Condition/Required handling |
|----------|-----------------------------|
| [503 Service Unavailable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4) | Contacted node is currently not a member of any active cluster. |
| [505&nbsp;HTTP&nbsp;Version&nbsp;Not&nbsp;Supported](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.6) | An unsupported X-API-Version was used, see API Versions above. |
