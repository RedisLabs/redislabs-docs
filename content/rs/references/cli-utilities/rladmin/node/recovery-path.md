---
Title: rladmin node recovery_path set
linkTitle: recovery-path
description: Sets the local recovery path of the node.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin node recovery_path set` sets the local recovery path of the node. The recovery path is the folder where [persistence files]({{<relref "/rs/databases/configure/database-persistence">}}) are stored. This is used to [recover a failed database]({<relref "/rs/databases/recover-database">}}).

```sh
rladmin node <id>
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
