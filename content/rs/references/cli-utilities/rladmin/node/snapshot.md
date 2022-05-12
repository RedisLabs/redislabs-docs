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

`rladmin node snapshot` manages the [snapshots]({{<relref "/rs/databases/configure/database-persistence#append-only-file-aof-vs-snapshot-rdb">}}) of the state of a node's shards and endpoints.

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

Deletes a snapshot of a node that has already been created.

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
| node                  | integer                        | Displays the snapshots of the specified node                    |

### Returns

Returns a list of the snapshots of the specified node.

### Example

```sh
$ rladmin node 2 snapshot list
Name                                               Node    Time
snap2                                              2       2022-05-12T19:27:51Z
```
