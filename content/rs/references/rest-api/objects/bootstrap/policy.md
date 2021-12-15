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
| default_fork_evict_ram | boolean (default:&nbsp;false) | If true, the databases should evict data from RAM to ensure successful replication or persistence |
| default_non_sharded_proxy_policy | **'single'** <br />'all-master-shards'<br />'all-nodes' | Default proxy_policy for newly created non-sharded databases' endpoints |
| default_sharded_proxy_policy | 'single'<br /> **'all-master-shards'** <br />'all-nodes' | Default proxy_policy for newly created sharded databases' endpoints |
| default_shards_placement | 'dense'<br /> **'sparse'** | Default shards_placement for newly created databases |
| rack_aware | boolean | Cluster rack awareness |
| shards_overbooking | boolean (default:&nbsp;true) | If true, all databases' memory_size settings are ignored during shards placement |
