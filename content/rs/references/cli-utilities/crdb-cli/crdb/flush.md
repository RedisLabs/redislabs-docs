---
Title: crdb-cli crdb flush
linkTitle: flush
description: Clears all keys from an Active-Active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

`crdb-cli crdb flush` clears all keys from an Active-Active database.

```sh
crdb-cli crdb flush --crdb_guid <guid>
                    [ --no-wait ]
```

### Parameters

| Parameter           | Value  | Description                         |
|---------------------|--------|-------------------------------------|
| crdb_guid \<guid\>  | string | The GUID of the database (required) |
| no-wait             |        | Does not wait for the task to complete |

### Returns

Returns the task ID of the task clearing the database. If `--no-wait` is specified, the command exits. Otherwise, it will wait for the database to be cleared and return `finished`.

### Example

```sh
$ crdb-cli crdb flush --crdb-guid d84f6fe4-5bb7-49d2-a188-8900e09c6f66
Task 53cdc59e-ecf5-4564-a8dd-448d71f9e568 created
  ---> Status changed: queued -> started
  ---> Status changed: started -> finished
```
