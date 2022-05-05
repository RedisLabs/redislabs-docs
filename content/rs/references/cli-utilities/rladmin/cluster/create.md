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
        name <cluster-name>
        username <admin-email> 
        password <admin-password> 
        [ node_uid <node-uid> ] 
        [ rack_aware ] 
        [ rack_id <node-rack-id> ] 
        [ license_file <file> ] 
        [ ephemeral_path <path> ] 
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ] 
        [ register_dns_suffix ] 
        [ flash_enabled ] 
        [ flash_path <path> ] 
        [ addr <ip-address> ] 
        [ external_addr <ip-addresses> ]
```

### Parameters

| Parameter | Type/Value | Description |
|-----------|------------|-------------|
| param1 | Description |
| param2 | Description |

### Returns

### Example

```sh
$ rladmin command x
response
```
