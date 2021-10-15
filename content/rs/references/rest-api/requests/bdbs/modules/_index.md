---
Title: Database modules requests
linkTitle: modules
description: Documents the Redis Enterprise Software REST API bdbs/modules requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/bdbs/modules
         /rs/references/rest-api/bdbs/modules.md
         /rs/references/restapi/bdbs/modules
         /rs/references/restapi/bdbs/modules.md
         /rs/references/rest_api/bdbs/modules
         /rs/references/rest_api/bdbs/modules.md
---

## Configure module
| Method | Path | Description |
|--------|------|-------------|
| [POST]({{<relref "/rs/references/rest-api/requests/bdbs/modules/config#post-bdb-modules-config">}}) | `/v1/bdbs/{uid}/modules/config` | Configure module |

## Upgrade module
| Method | Path | Description |
|--------|------|-------------|
| [POST]({{<relref "/rs/references/rest-api/requests/bdbs/modules/upgrade#post-bdb-modules-upgrade">}}) | `/v1/bdbs/{uid}/modules/upgrade` | Upgrade module |