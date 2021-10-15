---
Title: Identity object
linkTitle: identity
description: Documents the identity object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| name              | string              | Node's name |
| uid                |integer             | Assumed node's uid to join cluster. Used to replace a dead node with a new one. |
| rack_id           | string              | Rack id, overrides cloud config |
| override_rack_id  | boolean             | When replacing an existing node in a rack-aware cluster, allows the new node to be located in a different rack |
| addr              | string              | Internal IP address of node |
| external_addr     | complex object      | External IP addresses of node. `GET`&nbsp;`/jsonschema` to retrieve the object's structure. |
| accept_servers    | boolean (default:&nbsp;true) | If true, no shards will be created on the node |
