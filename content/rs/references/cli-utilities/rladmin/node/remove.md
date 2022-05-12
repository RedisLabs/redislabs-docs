---
Title: rladmin node remove
linkTitle: remove
description: Removes a node from the cluster.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin node remove` removes the specified node from the cluster.

### Parameters

| Parameter             | Type/Value                     | Description                                                 |
|-----------------------|--------------------------------|-------------------------------------------------------------|
| node                  | integer                        | Creates a snapshot of the specified node                    |

### Returns

Returns `OK` if the node was removed successfully. Otherwise, it returns an error.

Use [`rladmin status nodes`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-nodes">}}) to verify that the node was removed.

### Example

```sh
$ rladmin status nodes
CLUSTER NODES:
NODE:ID ROLE   ADDRESS    EXTERNAL_ADDRESS  HOSTNAME     SHARDS CORES       FREE_RAM         PROVISIONAL_RAM  VERSION   STATUS
*node:1 master 192.0.2.12 198.51.100.1      3d99db1fdf4b 5/100  6           14.26GB/19.54GB  10.67GB/16.02GB  6.2.12-37 OK    
node:2  slave  192.0.2.13 198.51.100.2      fc7a3d332458 4/100  6           14.26GB/19.54GB  10.71GB/16.02GB  6.2.12-37 OK    
node:3  slave  192.0.2.14                   b87cc06c830f 1/120  6           14.26GB/19.54GB  10.7GB/16.02GB   6.2.12-37 OK    
$ rladmin node 3 remove
Performing remove action on node:3: 100%
OK
CLUSTER NODES:
NODE:ID ROLE   ADDRESS    EXTERNAL_ADDRESS  HOSTNAME     SHARDS CORES       FREE_RAM         PROVISIONAL_RAM  VERSION   STATUS
*node:1 master 192.0.2.12 198.51.100.1      3d99db1fdf4b 5/100  6           14.34GB/19.54GB  10.74GB/16.02GB  6.2.12-37 OK    
node:2  slave  192.0.2.13 198.51.100.2      fc7a3d332458 5/100  6           14.34GB/19.54GB  10.74GB/16.02GB  6.2.12-37 OK
```
