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

## `bind endpoint exclude`

Defines whether proxies should be excluded in the proxy policy for the specific database endpoint.

The exclude command is an overwriting command. Multiple include or exclude commands will overwrite the proxy policy.

```sh
rladmin bind
        [ db { db:<id> | <name> } ]
        endpoint <id> exclude
        <proxy_id1 .. proxy_idN>
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| db        | db:\<id\><br /> name           | Only allows endpoints for the specified database                                               |
| endpoint  | endpoint ID                    | Changes proxy settings for the specified endpoint                              |
| proxy     | list of proxy IDs          | Proxies to exclude                                                           |

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

## `bind endpoint include`

Defines whether proxies should be included in the proxy policy for the specific database endpoint.

The include command is an overwriting command. Multiple include or exclude commands will overwrite the proxy policy.

```sh
rladmin bind
        [ db { db:<id> | <name> } ]
        endpoint <id> include
        <proxy_id1 .. proxy_idN>
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| db        | db:\<id\><br /> name           | Only allows endpoints for the specified database                                               |
| endpoint  | endpoint ID                    | Changes proxy settings for the specified endpoint                              |
| proxy     | list of proxy IDs          | Proxies to include                                                           |

### Returns

Returns `Finished successfully` if the proxy policy was successfully changed. Otherwise, it returns an error.

Use [`rladmin status endpoints`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-endpoints">}}) to verify that the policy changed.

### Example

``` sh
$ rladmin status endpoints db db:6
ENDPOINTS:
DB:ID    NAME   ID                 NODE      ROLE                       SSL
db:6     tr02   endpoint:6:1       node:3    all-master-shards          No
$ rladmin bind endpoint 6:1 include 3
Executing bind endpoint: OOO.
Finished successfully
$ rladmin status endpoints db db:6
ENDPOINTS:
DB:ID   NAME   ID                NODE      ROLE                          SSL
db:6    tr02   endpoint:6:1      node:1    all-master-shards +3          No
db:6    tr02   endpoint:6:1      node:3    all-master-shards +3          No
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
