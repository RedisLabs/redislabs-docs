---
Title: Bootstrap object
linkTitle: bootstrap
description: An object for bootstrap configuration
weight: $weight
alwaysopen: false
categories: ["RS"]
---

A bootstrap configuration object.

| Name | Type/Value | Description |
|------|------------|-------------|
| action | 'create_cluster'<br />'join_cluster'<br />'recover_cluster' | Action to perform |
| cluster | [cluster_identity]({{<relref "/rs/references/rest-api/objects/bootstrap/cluster_identity">}}) object | Cluster to join or create |
| cnm_https_port | integer | Port to join a cluster with non-default cnm_https port |
| credentials | [credentials]({{<relref "/rs/references/rest-api/objects/bootstrap/credentials">}}) object | Cluster admin credentials |
| dns_suffixes | {{<code>}}
[{
  "name": string,
  "cluster_default": boolean,
  "use_aaaa_ns": boolean,
  "use_internal_addr": boolean,
  "slaves": array
}, ...]
{{</code>}} | Explicit configuration of DNS suffixes<br />**name**: DNS suffix name<br />**cluster_default**: Should this suffix be the default cluster suffix<br />**use_aaaa_ns**: Should AAAA records be published for NS records<br />**use_internal_addr**: Should internal cluster IPs be published for databases<br />**slaves**: List of replica servers that should be published as NS and notified |
| license | string | License string |
| max_retries | integer | Max number of retries in case of recoverable errors |
| node | [node_identity]({{<relref "/rs/references/rest-api/objects/bootstrap/node_identity">}}) object | Node description |
| policy | [policy]({{<relref "/rs/references/rest-api/objects/bootstrap/policy">}}) object | Policy object |
| recovery_filename | string | Name of backup file to recover from |
| required_version | string | This node can only join the cluster if all nodes in the cluster have a version greater than the required_version |
| retry_time | integer | Max waiting time between retries (in seconds) |


