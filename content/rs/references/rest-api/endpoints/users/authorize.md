---
Title: Authorize endpoints
linkTitle: Authorize
description: Documents the Redis Enterprise Software REST API users/authorize endpoints.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/users/authorize
         /rs/references/rest-api/users/authorize.md
         /rs/references/restapi/users/authorize
         /rs/references/restapi/users/authorize.md
         /rs/references/rest_api/users/authorize
         /rs/references/rest_api/users/authorize.md
---

## Authorize RLEC user

    POST /v1/users/authorize

Authorize a RLEC user.

In order to use the rest-api a user must be authorized using JSON Web Token (JWT). In order to obtain a valid token a request should be made to /users/authorize with a valid username and password.

TBA...