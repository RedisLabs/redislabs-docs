---
Title: JWT authorize object
linkTitle: jwt_authorize
description: An object for user authentication or a JW token refresh request
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object for user authentication or a JW token refresh request.

| Name | Type/Value | Description |
|------|------------|-------------|
| username  | string | The user’s username (required) |
| password  | string  | The user’s password (required) |
| ttl       | integer (range: 1-86400) (default: 300) | Time to live - The amount of time in seconds the token will be valid |
