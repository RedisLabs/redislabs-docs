---
Title: rladmin bind
linkTitle: bind
description: Manages the proxy policy for a specified database endpoint.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin bind` manages the proxy policy for a specific database endpoint.

## `bind endpoint <id> { include | exclude }`

Defines whether proxies should be included or excluded in the proxy policy for the specific database endpoint.

The include and exclude commands are overwriting commands. Multiple include or exclude commands will overwrite the proxy policy.

```sh
rladmin bind
        [ db { db:<id> | <name> } ]
        endpoint <id> { include | exclude }
        <proxy_id1 .. proxy_idN>
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| db        | db:\<id\><br /> name           | Only allows endpoints for the specified database                                               |
| endpoint  | endpoint ID                    | Changes proxy settings for the specified endpoint                              |
| include   |                                | Includes proxies in the proxy policy |
| exclude   |                                | Excludes proxies in the proxy policy                                                           |
| proxy     | list of proxy IDs          | Proxies to include or exclude                                                           |

### Returns

Returns `Finished successfully` if the proxy policy was successfully changed. Otherwise, it returns an error.

Use [`rladmin status endpoints`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-endpoints">}}) to verify that the policy changed.

### Example

``` sh
$ rladmin status endpoints db db:6
ENDPOINTS:
DB:ID    NAME   ID                  NODE      ROLE                      SSL
db:6     tr02   endpoint:6:1        node:2    all-nodes                 No
db:6     tr02   endpoint:6:1        node:1    all-nodes                 No
db:6     tr02   endpoint:6:1        node:3    all-nodes                 No
$ rladmin bind endpoint 6:1 exclude 2
Executing bind endpoint: OOO.
Finished successfully
$ rladmin status endpoints db db:6
ENDPOINTS:
DB:ID    NAME   ID                 NODE      ROLE                       SSL
db:6     tr02   endpoint:6:1       node:1    all-nodes -2               No
db:6     tr02   endpoint:6:1       node:3    all-nodes -2               No
```

## `bind endpoint policy`

Changes the overall proxy policy for a specific database endpoint.

```sh
rladmin bind
        [ db { db:<id> | <name> } ]
        endpoint <id>
        policy { single | all-master-shards | all-nodes }
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| db        | db:\<id\><br /> name           | Only allows endpoints for the specified database                                               |
| endpoint  | endpoint ID                    | Changes proxy settings for the specified endpoint                              |
| policy    | `all-master-shards`<br /> `all-nodes`<br /> `single` | Changes proxy policy to the specified policy (see below) |


| Proxy policy | Description |
| - | - |
| all-master-shards | Multiple proxies, one on each master node (best for high traffic and multiple master shards)                     |
| all-nodes | Multiple proxies, one on each node of the cluster (increases traffic in the cluster, only used in special cases) |
| single | All traffic flows through a single proxy bound to the database endpoint (preferable in most cases)               |

### Returns

Returns `Finished successfully` if the proxy policy was successfully changed. Otherwise, it returns an error.

Use [`rladmin status endpoints`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-endpoints">}}) to verify that the policy changed.

### Example

``` sh
$ rladmin status endpoints db db:6
ENDPOINTS:
DB:ID    NAME   ID                 NODE      ROLE                       SSL
db:6     tr02   endpoint:6:1       node:1    all-nodes -2               No
db:6     tr02   endpoint:6:1       node:3    all-nodes -2               No
$ rladmin bind endpoint 6:1 policy all-master-shards
Executing bind endpoint: OOO.
Finished successfully
$ rladmin status endpoints db db:6
ENDPOINTS:
DB:ID    NAME   ID                 NODE      ROLE                       SSL
db:6     tr02   endpoint:6:1       node:3    all-master-shards          No
```
