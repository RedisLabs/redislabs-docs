---
Title: rladmin cluster master
linkTitle: master
description: Identifies or changes the cluster's master node.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
tags: ["configured"]
categories: ["RS"]
aliases:
---

Identifies the cluster's master node. Use `set` to change the cluster's master to a different node.

```sh
cluster master [ set <node_id> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| node_id | integer | Unique node ID |

### Returns

Returns the ID of the cluster's master node. Otherwise, it returns an error message.

### Example

Identify the cluster's master node:

```sh
$ rladmin cluster master
Node 1 is the cluster master node
```

Change the cluster master to node 3:

```sh
$ rladmin cluster master set 3
Node 3 set to be the cluster master node
```
