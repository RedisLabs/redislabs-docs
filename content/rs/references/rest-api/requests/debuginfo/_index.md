---
Title: Debug info requests
linkTitle: debuginfo
description: Documents the Redis Enterprise Software REST API debuginfo requests.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/rest-api/debuginfo
         /rs/references/rest-api/debuginfo.md
         /rs/references/restapi/debuginfo
         /rs/references/restapi/debuginfo.md
         /rs/references/rest_api/debuginfo
         /rs/references/rest_api/debuginfo.md
---

Download the debuginfo in a tarball called _filename_.tar.gz. Extract the files from the tarball to access the debuginfo.

## Get debug info for all nodes in the cluster

| Method | Path | Description |
|--------|------|-------------|
| [GET]({{<relref "./all#get-all-debuginfo">}}) | `/v1/debuginfo/all` | Get debuginfo for all nodes |
| [GET]({{<relref "./all/bdb#get-all-debuginfo-bdb">}}) | `/v1/debuginfo/all/bdb{bdb_uid}` | Get debuginfo from all nodes for a BDB |

## Get debug info for the current node

| Method | Path | Description |
|--------|------|-------------|
| [GET]({{<relref "./node#get-debuginfo-node">}}) | `/v1/debuginfo/node` | Get debuginfo for the current node |
| [GET]({{<relref "./node/bdb#get-debuginfo-node-bdb">}}) | `/v1/debuginfo/node/bdb/{bdb_uid}` | Get debuginfo for the current node regarding a specific BDB |
