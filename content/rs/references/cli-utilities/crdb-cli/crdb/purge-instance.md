---
Title: crdb-cli crdb purge-instance
linkTitle: purge-instance
description: Deletes data from a local instance and removes it from the active-active database.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases:
---

Deletes data from a local instance and removes it from the active-active database.

```sh
crdb-cli crdb purge-instance --crdb-guid <guid>
         --instance-id <instance-id>
         [ --no-wait ]
```

### Parameters

| Parameter                 | Value  | Description                                      |
|---------------------------|--------|--------------------------------------------------|
| crdb-guid        | string | The GUID of the database (required)              |
| instance-id  | string | The ID of the local instance (required) |
| no-wait                   |        | Does not wait for the task to complete           |

### Returns

Returns the task ID of the task that is purging the local instance.

If `--no-wait` is specified, the command exits. Otherwise, it will wait for the instance to be purged and return `finished`.

Once this command finishes, the other replicas must remove this instance with [`crdb-cli crdb remove-instance --force`]({{<relref "/rs/references/cli-utilities/crdb-cli/crdb/remove-instance">}}).

### Example

```sh
$ crdb-cli crdb purge-instance --crdb-guid db6365b5-8aca-4055-95d8-7eb0105c0b35 --instance-id 2
Task add0705c-87f1-4c28-ad6a-ab5d98e00c58 created
  ---> Status changed: queued -> started
  ---> Status changed: started -> finished
```
