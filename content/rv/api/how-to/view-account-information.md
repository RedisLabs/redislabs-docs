---
Title: View account information
description: Get initial information on account parameters
weight: 110
alwaysopen: false
categories: ["RC Pro"]
---

The root API operation returns information about the current account, user and API Key (as identified by the set of API Keys provided in the API request).

```shell
{{% embed-code "rv/api/70-query-metrics.sh" %}}
```

Following is an example of the API operation's response:

```json
{
  "account": {
    "id": 654321,
    "name": "Redis Labs",
    "createdTimestamp": "2018-12-23T15:15:31Z",
    "updatedTimestamp": "2019-07-04T12:22:04Z",
    "key": {
      "name": "john-doe-api-key-6",
      "accountId": 654321,
      "accountName": "Redis Labs Account for John Doe",
      "allowedSourceIps": [
        "82.81.136.0/24"
      ],
      "createdTimestamp": "2019-06-06T07:41:14Z",
      "owner": {
        "name": "John Doe",
        "email": "John.doe@redislabs.com"
      },
      "httpSourceIp": "82.81.136.242"
    }
  }
```

Note that the above example contains information about the current user's public source IP (`82.81.136.242`) as well as the API key limitation on allowed source IP ranges (the field `allowedSourceIps` restricts the current API Key access to requests originating from IP addresses that reside within the allowed IP range of `82.81.136.0/24`).


