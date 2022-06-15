---
Title: Redis Enterprise Software REST API quick start
linkTitle: Quick Start
description: Redis Enterprise Software REST API quick start
weight: 20
alwaysopen: false
categories: ["RS"]
aliases:
---

Redis Enterprise Software includes a REST API that allows you to automate certain tasks.

## REST API fundamentals

### Authentication

Authentication to the Redis Enterprise Software API occurs via [Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication). Provide your username and password as the basic auth credentials.

If the username and password is incorrect or missing, the request will fail with a [`401 Unauthorized`](https://www.rfc-editor.org/rfc/rfc9110.html#name-401-unauthorized) status code.

An admin user can access any endpoint on the API. Other users can access endpoints that correspond to their assigned roles. If a user attempts to access an endpoint that is not allowed in their role, the request will fail with a [`403 Forbidden`](https://www.rfc-editor.org/rfc/rfc9110.html#name-403-forbidden) status code. For more details on which user roles can access certain endpoints, see [Permissions]({{<relref "/rs/references/rest-api/permissions">}}).

The Redis Enterprise Software REST API uses [Self-signed certificates]({{<relref "/rs/security/certificates">}}) to ensure the product is secure. When you use the default self-signed certificates, the HTTPS requests will fail with `SSL certificate problem: self signed certificate` unless you turn off SSL certificate verification. The examples in this tutorial turn off SSL certificate verification.

### Headers

Redis Enterprise REST API requests support the following HTTP headers:

| Header | Supported/Required Values |
|--------|---------------------------|
| Accept | `application/json` |
| Content-Length | Length (in bytes) of request message |
| Content-Type | `application/json` |

If the client specifies an invalid header, the request will fail with a [`400 Bad Request`](https://www.rfc-editor.org/rfc/rfc9110.html#name-400-bad-request) status code.

### Response types and error codes

[HTTP Status Codes](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes) describe the result of an API request. This can be `200 OK` if the server accepted the request, or it can be one of many error codes.

The most common responses for a Redis Enterprise API request are:

| Response | Condition/Required handling |
|----------|-----------------------------|
| [200 OK](https://www.rfc-editor.org/rfc/rfc9110.html#name-200-ok) | Success |
| [400 Bad Request](https://www.rfc-editor.org/rfc/rfc9110.html#name-400-bad-request) | The request failed, generally due to a typo or other mistake. |
| [401 Unauthorized](https://www.rfc-editor.org/rfc/rfc9110.html#name-401-unauthorized) | The request failed because the authentication information was missing or incorrect. |
| [403 Forbidden](https://www.rfc-editor.org/rfc/rfc9110.html#name-403-forbidden) | The user cannot access the specified [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier). |
| [404 Not Found](https://www.rfc-editor.org/rfc/rfc9110.html#name-404-not-found) | The [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) does not exist. |
| [503 Service Unavailable](https://www.rfc-editor.org/rfc/rfc9110.html#name-503-service-unavailable) | The node is not responding, or is not a memeber of a cluster. |
| [505&nbsp;HTTP&nbsp;Version&nbsp;Not&nbsp;Supported](https://www.rfc-editor.org/rfc/rfc9110.html#name-505-http-version-not-suppor) | An unsupported `x-api-version` was used. See [Versions](#versions). |

Some endpoints may have different response codes. The request page of these endpoints document these special cases.

### Ports

All calls must be made over SSL to port 9443. For the API to work, port 9443 must be exposed to incoming traffic or mapped to a different port.

If you are using a [Redis Enterprise Software Docker image]({{<relref "/rs/installing-upgrading/get-started-docker">}}), run the following command to start the Docker image with port 9443 exposed:

```sh
docker run -p 9443:9443 redislabs/redis
```

### Versions

All API requests are versioned in order to minimize the impact of backwards-incompatible API changes and to coordinate between different versions operating in parallel.

For the Redis Enterprise Software API, specify version 1 or version 2 in the [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier).

| Request path | Description |
|--------------|-------------|
| POST `/v1/bdbs` | A version 1 request for the `/bdbs` endpoint. |
| POST `/v2/bdbs` | A version 2 request for the `/bdbs` endpoint. |

When an endpoint supports more than one version, the endpoint's request page documents both versions.  For example, the [bdbs request]({{<relref "/rs/references/rest-api/requests/bdbs/" >}}) page documents POST requests for [version 1]({{<relref "/rs/references/rest-api/requests/bdbs/#post-bdbs-v1" >}}) and [version 2]({{<relref "/rs/references/rest-api/requests/bdbs/#post-bdbs-v2" >}}).

## Send API requests with cURL

[cURL](https://curl.se/) is a command-line tool that allows you to send HTTP requests from a terminal.

A cURL request includes the following options:
- -X: Method (GET, PUT, PATCH, POST, or DELETE)
- -H: Header
- -u: username and password information
- -k: turn off SSL verification
- -i: Show headers and status code as well as the body response
- -d: JSON data for PUT or POST requests
- -F: Form data for PUT or POST requests, such as for the [POST `/v1/modules`]({{<relref "/rs/references/rest-api/requests/modules/#post-module" >}}) or [POST `/v2/modules`]({{<relref "/rs/references/rest-api/requests/modules/#post-module-v2" >}}) endpoint

See the [cURL documentation](https://curl.se/docs/) for more info.

### GET request

Use the following cURL command to get a list of databases with the [GET `/v1/bdbs/`]({{<relref "/rs/references/rest-api/requests/bdbs/#get-all-bdbs" >}}) endpoints.

```sh
$ curl -X GET -H "accept: application/json" \
              -u "[username]:[password]" \
              https://[host][:port]/v1/bdbs -k -i

HTTP/1.1 200 OK
server: envoy
date: Tue, 14 Jun 2022 19:24:30 GMT
content-type: application/json
content-length: 2833
cluster-state-id: 42
x-envoy-upstream-service-time: 25

[
    {
        ...
        "name": "tr01",
        ...
        "slave_ha" : false,
        ...
        "uid": 1,
        "version": "6.0.16",
        "wait_command": true
    }
]
```

For more info on the fields returned by [GET `/v1/bdbs/`]({{<relref "/rs/references/rest-api/requests/bdbs/#get-all-bdbs" >}}), see the [`bdbs` object]({{<relref "/rs/references/rest-api/objects/bdb/" >}}).

### PUT request

Once you have the `uid` of a database, you can use [PUT `/v1/bdbs/`]({{<relref "/rs/references/rest-api/requests/bdbs/#put-bdbs" >}}) to update the configuration of the database.

```sh
$ curl -X PUT -H "accept: application/json" \
               -u "[username]:[password]" \
               https://[host][:port]/v1/bdbs/1 \
               -d '{ "slave_ha": true }' -k -i
HTTP/1.1 200 OK
server: envoy
date: Tue, 14 Jun 2022 20:00:25 GMT
content-type: application/json
content-length: 2933
cluster-state-id: 43
x-envoy-upstream-service-time: 159

{
    ...
    "name" : "tr01",
    ...
    "slave_ha" : true,
    ...
    "uid" : 1,
    "version" : "6.0.16",
    "wait_command" : true
}
```

For more info on the fields required by [PUT `/v1/bdbs/`]({{<relref "/rs/references/rest-api/requests/bdbs/#put-bdbs" >}}), see the [`bdbs` object]({{<relref "/rs/references/rest-api/objects/bdb/" >}}).

## Send API requests with code

To follow these examples, you need:

- A [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software">}}) node
- Python 3 and the [requests](https://pypi.org/project/requests/) Python library
- [node.js](https://nodejs.dev/)

### Python

```python
import json
import requests

# Information needed for this example - replace with your host, port, username, and password
host = "[host]"
port = "[port]"
username = "[username]"
password = "[password]"

# Get list of databases using GET /v1/bdbs
bdbs_uri = "https://{}:{}/v1/bdbs".format(host, port)

print("GET {}".format(bdbs_uri))
get_resp = requests.get(bdbs_uri,
                        auth = (username, password),
                        headers = { "accept" : "application/json" },
                        verify = False)

print("{} {}".format(get_resp.status_code, get_resp.reason))
for header in get_resp.headers.keys():
    print("{}: {}".format(header, get_resp.headers[header]))

print("\n" + json.dumps(get_resp.json(), indent=4))

# Update all databases with slave_ha = true using PUT /v1/bdbs
for bdb in get_resp.json():
    uid = bdb["uid"]

    put_uri = "{}/{}".format(bdbs_uri, uid)
    put_data = { "slave_ha" : True }

    print("PUT {} {}".format(put_uri, json.dumps(put_data)))

    put_resp = requests.put(put_uri,
                            data = json.dumps(put_data),
                            auth = (username, password),
                            headers = { "content-type" : "application/json" },
                            verify = False)

    print("{} {}".format(put_resp.status_code, put_resp.reason))
    for header in put_resp.headers.keys():
        print("{}: {}".format(header, put_resp.headers[header]))

    print("\n" + json.dumps(put_resp.json(), indent=4))
```

See the [Python requests library documentation](https://requests.readthedocs.io/en/latest/) for more info.

#### Output

```sh
$ python rs_api.py
python rs_api.py
GET https://[host]:[port]/v1/bdbs
InsecureRequestWarning: Unverified HTTPS request is being made to host '[host]'. Adding certificate verification is strongly advised. See: https://urllib3.readthedocs.io/en/1.26.x/advanced-usage.html#ssl-warnings
  warnings.warn(
200 OK
server: envoy
date: Wed, 15 Jun 2022 15:49:43 GMT
content-type: application/json
content-length: 2832
cluster-state-id: 89
x-envoy-upstream-service-time: 27

[
    {
        ...
        "name": "tr01",
        ...
        "slave_ha" : false,
        ...
        "uid": 1,
        "version": "6.0.16",
        "wait_command": true
    }
]

PUT https://[host]:[port]/v1/bdbs/1 {"slave_ha": true}
InsecureRequestWarning: Unverified HTTPS request is being made to host '[host]'. Adding certificate verification is strongly advised. See: https://urllib3.readthedocs.io/en/1.26.x/advanced-usage.html#ssl-warnings
  warnings.warn(
200 OK
server: envoy
date: Wed, 15 Jun 2022 15:49:43 GMT
content-type: application/json
content-length: 2933
cluster-state-id: 90
x-envoy-upstream-service-time: 128

{
    ...
    "name" : "tr01",
    ...
    "slave_ha" : true,
    ...
    "uid" : 1,
    "version" : "6.0.16",
    "wait_command" : true
}
```

### node.js

```js
const https = require('https');

const options = {
    host: '[host]',
    port: '[port]',
    path: '/v1/bdbs',
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

See the [node.js https class documentation](https://nodejs.org/api/https.html#httpsrequestoptions-callback) for more info.

## More info

- [Redis Enterprise Software REST API]({{<relref "/rs/references/rest-api/">}})
- [Redis Enterprise Software REST API Requests]({{<relref "/rs/references/rest-api/requests/">}})
