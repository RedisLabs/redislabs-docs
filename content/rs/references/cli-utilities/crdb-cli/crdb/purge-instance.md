---
Title: crdb-cli crdb purge-instance
linkTitle: purge-instance
description: Purges local instance from existing Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb purge-instance` purges the local instance from an existing Active-Active database.

```sh
crdb-cli crdb purge-instance --crdb_guid <guid> /
                    --instance-id <instance-id> /
                    [ --no-wait ]
```

### Parameters

| Parameter                 | Value  | Description                                      |
|---------------------------|--------|--------------------------------------------------|
| crdb_guid \<guid\>        | string | The GUID of the database (required)              |
| instance_id \<instance\>  | string | The instance ID of the local instance (required) |
| no-wait                   |        | Does not wait for the task to complete           |

### Returns

Returns the task ID of the task that is getting rid of the local instance. If --no-wait is specified, the command exits. Otherwise, it will wait for the instance to be purged and return `finished`.

### Example

```sh
$ crdb-cli crdb purge-instance --crdb-guid db6365b5-8aca-4055-95d8-7eb0105c0b35 --instance-id 2
Task add0705c-87f1-4c28-ad6a-ab5d98e00c58 created
  ---> Status changed: queued -> started
  ---> Status changed: started -> finished
```
