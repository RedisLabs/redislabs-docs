---
Title: rladmin node recovery_path set
linkTitle: recovery_path
description: Sets the local recovery path of the node.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

Sets the node's local recovery path, which specifies the directory where [persistence files]({{<relref "/rs/databases/configure/database-persistence">}}) are stored. You can use these persistence files to [recover a failed database]({{<relref "/rs/databases/recover-database">}}).

```sh
rladmin node <ID>
        recovery_path set <path>
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| node      | integer                        | Sets the recovery path for the specified node                                            |
| path      | filepath                       | Path to the folder where persistence files are stored                                         |

### Returns

Returns `Updated successfully` if the recovery path was set. Otherwise, it returns an error.

### Example

```sh
$ rladmin node 2 recovery_path set /var/opt/redislabs/persist/redis
Updated successfully.
```
