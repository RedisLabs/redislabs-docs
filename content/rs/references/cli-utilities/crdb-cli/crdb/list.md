---
Title: crdb-cli crdb list
linkTitle: list
description: Shows a list of all Active-Active databases.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb list` shows a list of all Active-Active databases.

```sh
crdb-cli crdb list
```

### Parameters

None.

### Returns

Returns a list of all Active-Active databases that the cluster participates in. Each database is represented with a unique GUID, the name of the database, an instance ID, and the FQDN of the cluster that hosts the instance.

### Example

```sh
$ crdb-cli crdb list
CRDB-GUID                             NAME       REPL-ID  CLUSTER-FQDN
d84f6fe4-5bb7-49d2-a188-8900e09c6f66  database1  1        cluster1.redis.local
d84f6fe4-5bb7-49d2-a188-8900e09c6f66  database1  2        cluster2.redis.local
```
