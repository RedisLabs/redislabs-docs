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

`rladmin cluster recover` recovers a cluster from a backup file. Configuration backup file’s default location is `/var/opt/redislabs/persist/ccs/ccs-redis.rdb`.

```sh
rladmin cluster recover 
        filename <recovery-file-name> 
        [ ephemeral_path <path> ] 
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ]
        [ rack_id <ID> ] 
        [ override_rack_id ] 
        [ node_uid <number> ] 
        [ flash_enabled ] 
        [ flash_path <path> ] 
        [ addr <ip-address> ] 
        [ external_addr <ip-addresses> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| filename | | Backup file to use for recovery |
| ephemeral_path | filepath | Description |
| persistent_path | filepath | Specifies a path for persistent storage (optional) |
| ccs_persistent_path | filepath | Specifies the path where the CCS snapshots will be saved (optional) |
| rack_id |  | Switches to this rack ID (optional) |
| override_rack_id | | Changes to a new rack, specified by `rack_id` (optional) |
| node_uid | integer (Default:&nbsp;1) | Specifies which node will recover first and become master (optional) |
| flash_enabled | | Enables flash storage in a supporting node |
| flash_path | | Specifies a path for flash storage |
| addr | IP address | Sets a node's internal address. If not provided, the node sets the address automatically. (optional) |
| external_addr | IP address | Sets a node's external address. If not provided, the node sets the address automatically. (optional) |

### Returns

### Example

```sh
$ rladmin command x
response
```
