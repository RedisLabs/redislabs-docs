---
Title: REST API Quick Start
linkTitle: REST API Quick Start
description: Redis Enterprise Software REST API Tutorial
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

Once you have [set up a Redis Enterprise Software node]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software">}}), you can use the API by making HTTPS requests to the node.

## REST API Fundamentals

### Headers

Redis Enterprise REST API requests support the following HTTP headers:

| Header | Supported/Required Values |
|--------|---------------------------|
| Accept | `application/json` |
| Content-Length | Length (in bytes) of request message |
| Content-Type | `application/json` |

If an invalid request header is specified, the request will fail with a [`400 Bad Request`](https://www.rfc-editor.org/rfc/rfc9110.html#name-400-bad-request) status code.

### Authentication

To be able to access an API, you must have the correct authentication to ensure the request is valid.

Authentication to the Redis Enterprise Software API occurs via Basic Auth. Provide your username and password as the basic auth credentials.

An admin user can access any endpoint on the API. Other users can access endpoints that correspond to their assigned roles. For more details on which user roles can access certain endpoints, see [Permissions]({{<relref "/rs/references/rest-api/permissions">}}).

If no username or password is specified, or the username and password is incorrect, the request will fail with a [`401 Unauthorized`](https://www.rfc-editor.org/rfc/rfc9110.html#name-401-unauthorized) status code.

All calls must be made over SSL, to port 9443.

The Redis Enterprise Software REST API uses [Self-signed certificates]({{<relref "/rs/security/certificates">}}) to ensure the product is secure. When you use the default self-signed certificates, the HTTPS requests will fail with `SSL certificate problem: self signed certificate` unless you turn off SSL certifcate verification. The examples in this tutorial turn off SSL certificate verification.

### Response Types

A three-digit [HTTP Status Code](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes) describes the result of the API request.

The most common responses for a Redis Enterprise API request are:

| Response | Condition/Required handling |
|----------|-----------------------------|
| [200 OK](https://www.rfc-editor.org/rfc/rfc9110.html#name-200-ok) | The request succeeded. |
| [400 Bad Request](https://www.rfc-editor.org/rfc/rfc9110.html#name-400-bad-request) | The request failed because of a bad request header. |
| [401 Unauthorized](https://www.rfc-editor.org/rfc/rfc9110.html#name-401-unauthorized) | The request failed because the authentication information was missing or incorrect. |
| [404 Not Found](https://www.rfc-editor.org/rfc/rfc9110.html#name-404-not-found) | The API endpoint was not found. |
| [503 Service Unavailable](https://www.rfc-editor.org/rfc/rfc9110.html#name-503-service-unavailable) | Contacted node is currently not a member of any active cluster. |
| [505&nbsp;HTTP&nbsp;Version&nbsp;Not&nbsp;Supported](https://www.rfc-editor.org/rfc/rfc9110.html#name-505-http-version-not-suppor) | An unsupported `x-api-version` was used. See [API Versions]({{<relref "/rs/references/rest-api#api-versions">}}) for more information. |

Some requests may have different response codes. These special cases are documented in the corresponding request page.

## REST API Examples

To follow these examples, you need:

- A [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software">}}) node
- [cURL](https://curl.se/)
- Python 3 and the [requests](https://pypi.org/project/requests/) Python library
- [node.js](https://nodejs.dev/)

### cURL

```sh
curl -X GET -H "accept: application/json"
            -u "[username]:[password]"
            https://[host][:port]/v1/bdbs?fields=uid,name -k -i
```

A cURL request has the following parameters:
- -X: Method (GET, PUT, PATCH, POST, or DELETE)
- -H: Header
- -u: username and password information
- -k: turn off SSL verification
- -i: Show headers and status code as well as the body response.
- -d: JSON data for PUT or POST requests

For more information, see the [cURL documentation.](https://curl.se/docs/)

### Python

```python
import json
import requests
r = requests.get("https://[host][:port]/v1/bdbs", auth=("[username]", "[password]"), params={"fields" : "uid,name"}, verify=False)
print(json.dumps(r.json(), indent=4))
```

The request functions include the following parameters:
- auth: username and password information
- params: a list or dictionary to send in the query string of the request
- verify: controls SSL certificate verification
- data: information to send in the body of the request for PUT or POST requests
- headers: a dictionary of HTTP headers to send with the request

For more information, see the [Python requests library documentation.](https://requests.readthedocs.io/en/latest/)

### node.js

```js
const https = require('https');

const options = {
    host: '[host]',
    port: '[port]',
    path: '/v1/bdbs?fields=uid,name',
    method: 'GET',
    auth: '[username]:[password]',
    rejectUnauthorized: false
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e.message);
});
req.end();
```

The options for the `https.request` function include:
- host: IP address of the node
- port: port to make API requests on (default is 9443)
- path: path to the API endpoint
- method: HTTP method (GET, PUT, PATCH, POST, or DELETE)
- auth: username and password for the API
- rejectUnauthorized: if `false`, turns off SSL verification

For more info, see the [node.js https class documentation.](https://nodejs.org/api/https.html#httpsrequestoptions-callback)

## More info

- [Redis Enterprise Software REST API]({{<relref "/rs/references/rest-api/">}})
- [Redis Enterprise Software REST API Requests]({{<relref "/rs/references/rest-api/requests/">}})
