---
Title: REST API Tutorial
linkTitle: REST API Tutorial
description: Redis Enterprise Software REST API Tutorial
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

## Prerequisites

For this tutorial, you need:

- A [Redis Enterprise Software]({{<relref "/rs/installing-upgrading/get-started-redis-enterprise-software">}}) node
- [cURL](https://curl.se/)
- Python 3 and the [requests](https://pypi.org/project/requests/) Python library
- [node.js](https://nodejs.dev/)

## Use the API

Once you have set up a Redis Enterprise Software node, you can use the API by making HTTPS requests to the node. By default, communication for the API is on port 9443.

The Redis Enterprise Software REST API uses [Self-signed certificates]({{<relref "/rs/security/certificates">}}) to ensure the product is secure. When you use the default self-signed certificates, the HTTPS requests will fail unless you turn off SSL certifcate verification. The examples in this tutorial turn off SSL certificate verification.

To authorize access to the API, use your cluster username and password. An admin user can access any endpoint on the API. Other users can access endpoints that correspond to their assigned roles. For more details on which user roles can access certain endpoints, see [Permissions]({{<relref "/rs/references/rest-api/permissions">}}).

### cURL

```sh
curl -X GET -H "content-type: application/json"
            -u "[username]:[password]"
            https://[host][:port]/v1/bdbs?fields=uid,name -k
```

A cURL request has the following parameters:
- -X: Method (GET, PUT, PATCH, POST, or DELETE)
- -H: Header
- -u: username and password information
- -k: turn off SSL verification
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
