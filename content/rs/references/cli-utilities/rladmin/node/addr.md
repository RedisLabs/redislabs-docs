---
Title: rladmin node addr set
linkTitle: addr
description: Sets the internal IP address of a node.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin node addr set` sets the internal IP address of a node. The internal IP address can only be set with `rladmin node addr` when the node is down.

```sh
rladmin node <id>
        addr set <ip_addr>
```

### Parameters

| Parameter | Type/Value                     | Description                                                                                   |
|-----------|--------------------------------|-----------------------------------------------------------------------------------------------|
| node      | node ID                        | Sets internal IP address of the specified node                                                |
| ip_addr   | IP address                     | Sets specified IP address as the internal IP of the node                                      |

### Returns

Returns `Updated successfully` if the IP address was set.

Use [`rladmin status nodes`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-nodes">}}) to verify the internal IP address was changed.

### Example

```sh
$ rladmin status nodes
CLUSTER NODES:
NODE:ID ROLE   ADDRESS    EXTERNAL_ADDRESS HOSTNAME     SHARDS CORES FREE_RAM        PROVISIONAL_RAM VERSION   STATUS
*node:1 master 192.0.2.2                   3d99db1fdf4b 5/100  6     16.06GB/19.54GB 12.46GB/16.02GB 6.2.12-37 OK
node:2  slave  192.0.2.3                   fc7a3d332458 0/100  6     -/19.54GB       -/16.02GB       6.2.12-37 DOWN, last seen 33s ago
node:3  slave  192.0.2.4                   b87cc06c830f 5/120  6     16.06GB/19.54GB 12.46GB/16.02GB 6.2.12-37 OK
$ rladmin node 2 addr set 192.0.2.5
Updated successfully.
$ rladmin status nodes
CLUSTER NODES:
NODE:ID ROLE   ADDRESS    EXTERNAL_ADDRESS HOSTNAME     SHARDS CORES FREE_RAM        PROVISIONAL_RAM VERSION   STATUS
*node:1 master 192.0.2.2                   3d99db1fdf4b 5/100  6     14.78GB/19.54GB 11.18GB/16.02GB 6.2.12-37 OK
node:2  slave  192.0.2.5                   fc7a3d332458 0/100  6     14.78GB/19.54GB 11.26GB/16.02GB 6.2.12-37 OK
node:3  slave  192.0.2.4                   b87cc06c830f 5/120  6     14.78GB/19.54GB 11.18GB/16.02GB 6.2.12-37 OK
```
