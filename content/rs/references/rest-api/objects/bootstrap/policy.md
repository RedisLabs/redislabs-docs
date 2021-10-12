---
Title: Policy object
linkTitle: policy
description: Documents the policy object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| rack_aware                        | boolean                  | Cluster rack awareness |
| default_sharded_proxy_policy      | 'single'<br />**'all-master-shards'** <br />'all-nodes' | Default proxy_policy for newly created sharded databases' endpoints |
| default_non_sharded_proxy_policy  | **'single'**<br />'all-master-shards'<br />'all-nodes' | Default proxy_policy for newly created non-sharded databases' endpoints |
| default_shards_placement          | **'sparse'**<br />'dense' | Default shards_placement for newly created databases |
| shards_overbooking                | boolean (default:&nbsp;true)  | If true, all bdbs' memory_size settings are ignored during shards placement |
| default_fork_evict_ram            | boolean (default:&nbsp;false) | If true, the bdbs should evict data from RAM to ensure successful replication or persistence |
