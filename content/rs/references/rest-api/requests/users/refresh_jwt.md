---
Title: Refresh_jwt requests
linkTitle: refresh_jwt
description: Documents the Redis Enterprise Software REST API users/refresh_jwt requests.
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

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-refresh_jwt) | `/v1/users/refresh_jwt` | Get a new authentication token |

## Get a new authentication token {#post-refresh_jwt}

    POST /v1/users/refresh_jwt

Get a new authentication token.

Takes a valid token and returns a token that is issued at the time of the request.

### Request {#post-request} 

#### Example HTTP request

	POST /users/refresh_jwt 


#### Request headers

| Key | Value | Description |
|-----|-------|-------------|
| Host | cnm.cluster.fqdn | Domain name |
| Authorization | JWT eyJ5bGciOiKIUzI1NiIsInR5cCI6IkpXVCJ9.<br></br>eyJpYXViOjE0NjU0NzU0ODYsInVpZFI1IjEiLCJ<br></br>leHAiOjE0NjU0Nz30OTZ9.2xYXumd1rDoE0e<br></br>dFzcLElMOHsshaqQk2HUNgdsUKxMU | Authentication credentials |


#### Request body

| Field | Type | Description |
|-------|------|-------------|
| ttl | integer | Time to live - The amount of time in seconds the token will be valid |

### Response {#post-response} 

#### Example JSON body

```json
 {
     "access_token": "eyJ5bGciOiKIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXViOjE0NjU0NzU0ODYsInVpZFI1IjEiLCJleHAiOjE0NjU0Nz30OTZ9.2xYXumd1rDoE0edFzcLElMOHsshaqQk2HUNgdsUKxMU"
 }
```



### Status codes {#post-status-codes} 

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | A new token is given. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | The token is invalid or password has expired. |
