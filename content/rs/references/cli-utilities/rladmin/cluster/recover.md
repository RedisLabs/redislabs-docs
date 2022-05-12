---
Title: rladmin cluster recover
linkTitle: recover
description: Recovers a cluster from a backup file.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Recovers a cluster from a backup file. The default location of the configuration backup file is `/var/opt/redislabs/persist/ccs/ccs-redis.rdb`.

```sh
rladmin cluster recover 
        filename <recovery filename> 
        [ ephemeral_path <path> ] 
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ]
        [ rack_id <ID> ] 
        [ override_rack_id ] 
        [ node_uid <number> ] 
        [ flash_enabled ] 
        [ flash_path <path> ] 
        [ addr <IP address> ] 
        [ external_addr <IP address> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| addr | IP address | Sets a node's internal address. If not provided, the node sets the address automatically. (optional) |
| ccs_persistent_path | filepath | Path to the location of CCS snapshots (default is the same as persistent_path) (optional) |
| external_addr | IP address | Sets a node's external address. If not provided, the node sets the address automatically. (optional) |
| ephemeral_path | filepath (default:&nbsp;/var/opt/redislabs) | Path to an ephemeral storage location (optional) |
| filename | filepath | Backup file to use for recovery |
| flash_enabled | | Enables flash storage (optional) |
| flash_path | filepath (default:&nbsp;/var/opt/redislabs/flash) | Path to a flash storage location (in case the node does not support CAPI) (required if flash_enabled) |
| node_uid | integer (default:&nbsp;1) | Specifies which node will recover first and become master (optional) |
| override_rack_id | | Changes to a new rack, specified by `rack_id` (optional) |
| persistent_path | filepath | Path to a persistent storage location (optional) |
| rack_id | string | Switches to this rack ID (optional) |

### Returns

Returns `ok` if the cluster recovered successfully. Otherwise, it returns an error message.

### Example

```sh
$ rladmin cluster recover filename /tmp/persist/ccs/ccs-redis.rdb node_uid 1 rack_id 5
Initiating cluster recovery... ok
```
