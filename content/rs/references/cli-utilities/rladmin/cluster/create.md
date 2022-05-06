---
Title: rladmin cluster create
linkTitle: create
description: Creates a new cluster.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

`rladmin cluster create` creates a new cluster. The node from which the command is executed becomes the first node of the new cluster.

```sh
cluster create 
        name <cluster name>
        username <admin email> 
        password <admin password> 
        [ node_uid <node UID> ] 
        [ rack_aware ] 
        [ rack_id <node rack ID> ] 
        [ license_file <file> ] 
        [ ephemeral_path <path> ] 
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ] 
        [ register_dns_suffix ] 
        [ flash_enabled ] 
        [ flash_path <path> ] 
        [ addr <IP address> ] 
        [ external_addr <IP address> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| addr | IP address | Internal IP addresses of the node |
| ccs_persistent_path | filepath (default:&nbsp;/var/opt/redislabs/persist) | Path to location of CCS snapshots |
| ephemeral_path | filepath | Path to ephemeral storage location (defaults to /var/opt/redislabs) |
| external_addr | IP address | External IP addresses of the node |
| flash_enabled | | Enables flash storage |
| flash_path | filepath (default:&nbsp;/var/opt/redislabs/flash) | Path to flash storage location |
| license_file | | Path to RLEC license file |
| node_uid | | Unique node ID |
| persistent_path | filepath (default:&nbsp;/var/opt/redislabs/persist) | Path to persistent storage location |
| rack_aware | | Enables/disables rack awareness |
| rack_id | | Rack ID of the rack |
| register_dns_suffix | | Enables database mapping to both internal and external IP |

### Returns

### Example

```sh
$ rladmin command x
response
```
