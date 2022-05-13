---
Title: rladmin node snapshot
linkTitle: snapshot
description: Manages snapshots of the state of a node's resources.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin node snapshot` manages [snapshots]({{<relref "/rs/databases/configure/database-persistence#append-only-file-aof-vs-snapshot-rdb">}}) of the state of a node's shards and endpoints.

## `node snapshot create`

Creates a snapshot of a node's current state.

```sh
$ rladmin node <id> snapshot create <name>
```

### Parameters

| Parameter             | Type/Value                     | Description                                                                               |
|-----------------------|--------------------------------|-------------------------------------------------------------------------------------------|
| node                  | integer                        | Creates a snapshot of the specified node                    |
| name                  | string                         | Name of the created snapshot                                |

### Returns

Returns `Done` if the snapshot was created successfully. Otherwise, returns an error.

### Example

```sh
$ rladmin node 1 snapshot create snap1
Creating node snapshot 'snap1' for node:1
Done.
```

## `node snapshot delete`

Deletes an existing snapshot of a node.

```sh
$ rladmin node <id> snapshot delete <name>
```

### Parameters

| Parameter             | Type/Value                     | Description                                                                               |
|-----------------------|--------------------------------|-------------------------------------------------------------------------------------------|
| node                  | integer                        | Deletes a snapshot of the specified node                    |
| name                  | string                         | Deletes the specified snapshot                                |

### Returns

Returns `Done` if the snapshot was deleted successfully. Otherwise, returns an error.

### Example

```sh
$ rladmin node 1 snapshot delete snap1
Deleting node snapshot 'snap1' for node:1
Done.
```

## `node snapshot list`

Displays a list of created snapshots for the specified node.

``` sh
$ rladmin node <id> snapshot list
```

### Parameters

| Parameter             | Type/Value                     | Description                                                                               |
|-----------------------|--------------------------------|-------------------------------------------------------------------------------------------|
| node                  | integer                        | Displays snapshots of the specified node                    |

### Returns

Returns a list of snapshots of the specified node.

### Example

```sh
$ rladmin node 2 snapshot list
Name                                               Node    Time
snap2                                              2       2022-05-12T19:27:51Z
```

## `node snapshot restore`

Restores a node as close to the stored snapshot as possible.

```sh
$ rladmin node <id> snapshot restore <name>
```

### Parameters

| Parameter             | Type/Value                     | Description                                                                               |
|-----------------------|--------------------------------|-------------------------------------------------------------------------------------------|
| node                  | integer                        | Restore the specified node from a snapshot.                    |
| restore              | string                           | Name of the snapshot used to restore the node.              |

### Returns

Returns `Snapshot restore completed successfully` if the actions needed to restore the snapshot completed successfully. Otherwise, it returns an error.

### Example

```sh
$ rladmin node 2 snapshot restore snap2
Reading node snapshot 'snap2' for node:2
Planning restore
Planned actions:
* migrate redis:15 to node:2
* failover redis:14
* migrate redis:17 to node:2
* failover redis:16
* migrate redis:19 to node:2
* failover redis:18
* migrate redis:21 to node:2
* failover redis:20
Proceed?[Y]es/[N]o? Y
2022-05-12T19:43:31.486613 Scheduling 8 actions
[2022-05-12T19:43:31.521422 Actions Status: 8 waiting ]
* [migrate redis:21 to node:2] waiting => executing
* [migrate redis:19 to node:2] waiting => executing
* [migrate redis:17 to node:2] waiting => executing
* [migrate redis:15 to node:2] waiting => executing
[2022-05-12T19:43:32.586084 Actions Status: 4 executing | 4 waiting ]
* [migrate redis:21 to node:2] executing => finished
* [migrate redis:19 to node:2] executing => finished
* [migrate redis:17 to node:2] executing => finished
* [migrate redis:15 to node:2] executing => finished
* [failover redis:20] waiting => executing
* [failover redis:18] waiting => executing
* [failover redis:16] waiting => executing
* [failover redis:14] waiting => executing
[2022-05-12T19:43:33.719496 Actions Status: 4 finished | 4 executing ]
* [failover redis:20] executing => finished
* [failover redis:18] executing => finished
* [failover redis:16] executing => finished
* [failover redis:14] executing => finished
Snapshot restore completed successfully.
```
