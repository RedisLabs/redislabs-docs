---
Title: Authorize requests
linkTitle: authorize
description: Documents the Redis Enterprise Software REST API users/authorize requests.
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

| Method | Path | Description |
|--------|------|-------------|
| [POST](#post-authorize) | `/v1/users/authorize` | Authorize a user |

## Authorize user {#post-authorize}

    POST /v1/users/authorize

Authorize an RLEC user.

In order to use the rest-api, a user must be authorized using a JSON Web Token (JWT). In order to obtain a valid token, a request should be made to `/users/authorize` with a valid username and password.

### Request {#post-request}

#### Example HTTP request

    POST /users/authorize

#### Example JSON body

  ```json
  {
      "username": "user@redislabs.com",
      "password": "my_password"
  }
  ```

#### Request headers
| Key    | Value            | Description         |
|--------|------------------|---------------------|
| Host   | cnm.cluster.fqdn | Domain name         |
| Accept | application/json | Accepted media type |

#### Request body
| Field | Type | Description |
|-------|------|-------------|
| username | string | The RLEC user’s username (required) |
| password | string | The RLEC user’s password (required) |
| ttl | integer | Time to live - The amount of time in seconds the token will be valid |

### Response {#post-response}

#### Example JSON body

  ```json
  {
      "access_token": "eyJ5bGciOiKIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXViOjE0NjU0NzU0ODYsInVpZFI1IjEiLCJleHAiOjE0NjU0Nz30OTZ9.2xYXumd1rDoE0edFzcLElMOHsshaqQk2HUNgdsUKxMU"
  }
  ```

### Error codes {#post-error-codes}

When errors are reported, the server may return a JSON object with
`error_code` and `message` fields that provide additional information.
The following are possible `error_code` values:

| Code | Description |
|------|-------------|
| password_expired | The password has expired and must be changed. |

### Status codes {#post-status-codes}

| Code | Description |
|------|-------------|
| [200 OK](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) | The user is authorized. |
| [400 Bad Request](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) | The request could not be understood by the server due to malformed syntax. |
| [401 Unauthorized](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2) | The user is unauthorized. |