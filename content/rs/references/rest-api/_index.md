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


## JSON Requests and Responses

The Redis Enterprise Software REST API uses the JavaScript Object Notation (JSON) for requests and responses.

Some responses may have an empty body, but indicate the response with standard HTTP codes. For more information, see RFC 4627 (http://www.ietf.org/rfc/rfc4627.txt) and www.json.org.

Both requests and responses may include zero or more objects.

In case the request is for a single entity, the response shall return a single JSON object, or none. In case the request if for a list of entities, the response shall return a single JSON array with 0 or more elements.

Requests may be delivered with some JSON object fields missing. In this case, these fields will be assigned default values (often indicating they are not in use).

Request Headers
The Redis Labs REST API supports the following HTTP headers:

Header	Supported/Required Values
Accept	application/json
Content-Length	Length (in bytes) of request message.
Content-Type	application/json
Response Headers
The Redis Labs REST API supports the following HTTP headers:

Header	Supported/Required Values
Content-Type	application/json
Content-Length	Length (in bytes) of response message.
API Versions
All RLEC API operations are versioned, in order to minimize the impact of backwards-incompatible API changes and to coordinate between different versions operating in parallel.

Authentication
Authentication to RLEC API occurs via Basic Auth. Provide your RLEC username and password as the basic auth credentials.

All calls must be made over SSL, to port 9443.

Example Request:

curl -u "demo@redislabs.com:password" https://localhost:9443/v1/bdbs
Common Responses
The following are common responses which may be returned in some cases regardless of any specific request.

Response	Condition / Required handling
503 (Service Unavailable)	Contacted node is currently not a member of any active cluster.
505 (HTTP Version Not Supported)	An unsupported X-API-Version was used, see API Versions above.
