---
Title: Debug info requests
linkTitle: debuginfo
description: Debug info requests
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: 
---

Downloads a support package, which includes logs and information about the cluster, nodes, databases, and shards, as a tar file called `filename.tar.gz`. Extract the files from the tar file to access the debug info.

## Get debug info for all nodes in the cluster

| Method | Path | Description |
|--------|------|-------------|
| [GET]({{<relref "./all#get-all-debuginfo">}}) | `/v1/debuginfo/all` | Gets debug info for all nodes |
| [GET]({{<relref "./all/bdb#get-all-debuginfo-bdb">}}) | `/v1/debuginfo/all/bdb/{bdb_uid}` | Gets debug info for a database from all nodes |

## Get debug info for the current node

| Method | Path | Description |
|--------|------|-------------|
| [GET]({{<relref "./node#get-debuginfo-node">}}) | `/v1/debuginfo/node` | Gets debug info for the current node |
| [GET]({{<relref "./node/bdb#get-debuginfo-node-bdb">}}) | `/v1/debuginfo/node/bdb/{bdb_uid}` | Gets debug info for a database from the current node |
