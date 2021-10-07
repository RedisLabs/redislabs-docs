---
Title: JWT authorize object
linkTitle: jwt_authorize
description: Documents the jwt_authorize object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

User authentication or JW token refresh request to REST API

| Name | Type/Value | Description |
|------|------------|-------------|
| username  | string | |
| password  | string  | |
| ttl       | integer (range: 1-86400) (default: 300) | Time to live - The amount of time in seconds the token will be valid |
