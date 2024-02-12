---
Title: Node identity object
linkTitle: node_identity
description: Documents the node_identity object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| bigstore_driver | 'rocksdb' | Bigstore driver name or none (deprecated) |
| bigstore_enabled | boolean | Bigstore enabled or disabled |
| identity | [identity]({{<relref "/rs/references/rest-api/objects/bootstrap/identity">}}) object | Node identity |
| limits | [limits]({{<relref "/rs/references/rest-api/objects/bootstrap/limits">}}) object | Node limits |
| paths | [paths]({{<relref "/rs/references/rest-api/objects/bootstrap/paths">}}) object | Storage paths object |
