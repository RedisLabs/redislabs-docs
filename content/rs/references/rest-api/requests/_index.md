---
Title: Redis Enterprise REST API requests
linkTitle: Requests
description: Documents the requests supported by the Redis Enterprise Software REST API calls.
weight: 30
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/endpoints/
         /rs/references/restapi/endpoints/
         /rs/references/rest_api/endpoints/
         /rs/references/rest_api/requests/
---

A REST API request requires the following components:
- [HTTP method](https://restfulapi.net/http-methods/) (`GET`, `PUT`, `PATCH`, `POST`, `DELETE`)
- Base URL
- Endpoint

Some requests may also require:
- URL parameters
- [Query parameters](https://en.wikipedia.org/wiki/Query_string)
- [JSON](http://www.json.org) request body
- [Permissions]({{<relref "/rs/references/rest-api/permissions">}})

{{< table-children columnNames="Request,Description" columnSources="LinkTitle,Description" enableLinks="LinkTitle" >}}
