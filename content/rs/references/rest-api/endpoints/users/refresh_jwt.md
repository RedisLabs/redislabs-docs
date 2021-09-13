---
Title: Refresh_jwt endpoints
linkTitle: Refresh_jwt
description: Documents the Redis Enterprise Software REST API users/refresh_jwt endpoints.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/users/refresh_jwt
         /rs/references/rest-api/users/refresh_jwt.md
         /rs/references/restapi/users/refresh_jwt
         /rs/references/restapi/users/refresh_jwt.md
         /rs/references/rest_api/users/refresh_jwt
         /rs/references/rest_api/users/refresh_jwt.md
---

## Get a new authentication token

    POST /v1/users/refresh_jwt

Get a new authentication token.

Takes a valid token and returns a token that is issued at the time of the request.