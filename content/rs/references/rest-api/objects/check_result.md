---
Title: Check result object
linkTitle: check_result
description: An object that contains the results of a cluster check
weight: $weight
alwaysopen: false
categories: ["RS"]
---

Cluster check result

| Name | Type/Value | Description |
|------|------------|-------------|
| cluster_test_result | boolean | Indication if any of the tests failed |
| nodes | {{<code>}}
[{
  "node_uid": integer,
  "result": boolean,
  "error": string
}, ...]
{{</code>}} | Nodes results |
