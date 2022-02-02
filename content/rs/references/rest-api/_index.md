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
Redis Enterprise Software provides a REST API to help you automate common tasks.

Here, you'll find the details of the API and how to use it.  

For more info, see:

- Supported [request endpoints]({{<relref "/rs/references/rest-api/requests/_index.md" >}}), organized by path
- Supported [objects]({{<relref "/rs/references/rest-api/objects/_index.md" >}}), both request and response
- Built-in roles and associated [permissions]({{<relref "/rs/references/rest-api/permissions/_index.md" >}})

## Protocol and headers

### JSON requests and responses

The Redis Enterprise Software REST API uses [JavaScript Object Notation (JSON)](http://www.json.org) for requests and responses. See the [RFC 4627 technical specifications](http://www.ietf.org/rfc/rfc4627.txt) for additional information about JSON.

Some responses may have an empty body but indicate the response with standard [HTTP codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

Both requests and responses may include zero or more objects.

If the request is for a single entity, the response returns a single JSON object or none. If the request is for a list of entities, the response returns a JSON array with zero or more elements.

If you omit certain JSON object fields from a request, they may be assigned default values, which often indicate that these fields are not in use.

### Request headers

Redis Enterprise REST API requests support the following HTTP headers:

| Header | Supported/Required Values |
|--------|---------------------------|
| Accept | `application/json` |
| Content-Length | Length (in bytes) of request message |
| Content-Type | `application/json` |

### Response headers

Redis Enterprise REST API responses support the following HTTP headers:

| Header | Supported/Required Values |
|--------|---------------------------|
| Content-Type | `application/json` |
| Content-Length | Length (in bytes) of response message |

## API versions

All API requests are versioned in order to minimize the impact of backwards-incompatible API changes and to coordinate between different versions operating in parallel.

Specify the version in the request URI, as shown in the following table:

| Request path | Description |
|--------------|-------------|
| POST `/v1/bdbs` | A version 1 request for the `/bdbs` endpoint. |
| POST `/v2/bdbs` | A version 2 request for the `/bdbs` endpoint. |

When an endpoint supports multiple versions, each version is documented on the corresponding endpoint.  For example, the [bdbs request]({{<relref "/rs/references/rest-api/requests/bdbs/" >}}) page documents POST requests for [version 1]({{<relref "/rs/references/rest-api/requests/bdbs/#post-bdbs-v1" >}}) and [version 2]({{<relref "/rs/references/rest-api/requests/bdbs/#post-bdbs-v2" >}}). 

## Authentication

Authentication to the API occurs via Basic Auth. Provide your username and password as the basic auth credentials.

All calls must be made over SSL, to port 9443.

Example request:

``` bash
curl -u "demo@redislabs.com:password" \
    https://localhost:9443/v1/bdbs
```

By default, the admin user is authorized for access.  Use [role-based access controls]({{< relref "/rs/security/admin-console-security/user-security.md" >}}) and [role permissions]({{<relref "/rs/references/rest-api/permissions/_index.md" >}}) to manage access.

## Common responses

The following are common responses which may return regardless of the request type.

| Response | Condition/Required handling |
|----------|-----------------------------|
| [503 Service Unavailable](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.4) | Contacted node is currently not a member of any active cluster. |
| [505&nbsp;HTTP&nbsp;Version&nbsp;Not&nbsp;Supported](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.6) | An unsupported `x-api-version` was used, see API Versions above. |

Individual requests may return different response codes.  These additional codes are documented on the corresponding request page.