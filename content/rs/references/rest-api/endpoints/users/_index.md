---
Title: Users endpoints
linkTitle: Users
description: Documents the Redis Enterprise Software REST API users endpoints.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/users
         /rs/references/rest-api/users.md
         /rs/references/restapi/users
         /rs/references/restapi/users.md
         /rs/references/rest_api/users
         /rs/references/rest_api/users.md
---

## Authorize endpoints
| Method | Path | Description |
|--------|------|-------------|
| [POST]({{<relref "/rs/references/rest-api/endpoints/users/authorize.md">}}) | `/v1/users/authorize` | Authorize an RLEC user |

## Password endpoints
| Method | Path | Description |
|--------|------|-------------|
| [POST]({{<relref "/rs/references/rest-api/endpoints/users/password#add-password">}})      | `/v1/users/password` | Add a new password          |
| [PUT]({{<relref "/rs/references/rest-api/endpoints/users/password#update-password">}})    | `/v1/users/password` | Change an existing password |
| [DELETE]({{<relref "/rs/references/rest-api/endpoints/users/password#delete-password">}}) | `/v1/users/password` | Delete a password           |

## Refresh_jwt endpoints
| Method | Path | Description |
|--------|------|-------------|
| [POST]({{<relref "/rs/references/rest-api/endpoints/users/refresh_jwt.md">}}) | `/v1/users/refresh_jwt` | Get a new authentication token |

