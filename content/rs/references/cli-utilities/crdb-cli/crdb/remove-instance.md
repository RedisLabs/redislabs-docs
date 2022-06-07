---
Title: crdb-cli crdb remove-instance
linkTitle: remove-instance
description: Removes a peer replica from an Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb remove-instance` deletes all data from an Active-Active instance, deletes the instance from the participating cluster, and removes the instance from the list of instances for the Active-Active database.

```sh
crdb-cli crdb remove-instance --crdb_guid <guid> /
                    --instance-id <instance-id> /
                    [ { --ordered | --unordered } ] /
                    [ --force ] /
                    [ --no-wait ]
```

### Parameters

| Parameter                    | Value  | Description                                                                                                                                                      |
|------------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| crdb_guid \<guid\>          | string | The GUID of the database (required)                                                                                                                              |
| instance_id \<instance-id\> | string | The instance ID of the local instance (required)                                                                                                                 |
| force                        |        | Removes the instance without purging data from the instance. <br>If --force is specified, you must run [`crdb-cli crdb purge-instance`]({{<relref "/rs/references/cli-utilities/crdb-cli/crdb/purge-instance">}}) from the removed instance. |
| no-wait                      |        | Does not wait for the task to complete                                                                                                                           |

### Returns

Returns the task ID of the task that is getting rid of the local instance. If --no-wait is specified, the command exits. Otherwise, it will wait for the instance to be purged and return `finished`.

### Example

```sh
$ crdb-cli crdb remove-instance --crdb-guid db6365b5-8aca-4055-95d8-7eb0105c0b35 --instance-id 2 --force
Task b1eba5ba-90de-49e9-8678-d66daa1afb51 created
  ---> Status changed: queued -> started
  ---> Status changed: started -> finished
```
