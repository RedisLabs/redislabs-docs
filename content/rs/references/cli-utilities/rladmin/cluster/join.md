---
Title: rladmin cluster join
linkTitle: join
description: Adds a node to an existing cluster.
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

`rladmin cluster join` adds a node to an existing cluster.

```sh
rladmin cluster join 
        name <cluster-name> | nodes <node-address> 
        username <admin-user> 
        password <admin-password>
        [ ephemeral_path <path> ]
        [ persistent_path <path> ]
        [ ccs_persistent_path <path> ]
        [ rack_id <node-rack-id> ]
        [ override_rack_id ]
        [ replace_node <node-uid> ]
        [ flash_enabled ]
        [ flash_path <path> ]
        [ addr <ip-address> ]
        [ external_addr <ip-addresses> ]
        [ override_repair ]
        [ accept_servers <enable | disable> ]
        [ cmn_http_port <port> ]
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
