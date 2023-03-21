---
Title: Proxy policy
linkTitle: proxy_policy
description: Proxy policy 
weight: $weight
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

Redis Enterprise Software uses [proxies]({{<relref "/rs/references/terminology#proxy">}}) to manage and optimize access to database shards. Each node in the cluster runs a single proxy process, which can be active (receives incoming traffic) or passive (waits for failovers), depending on the database's [proxy policy]({{<relref "/rs/references/policies/proxy-policy">}}).

## Policy values

| Value | Description |
|-------|-------------|
| single | There is only a single proxy that is bound to the database. This is the default database configuration and preferable in most use cases. |
| <nobr>all-master-shards</nobr> | [Multiple proxies]({{<relref "/rs/databases/configure/proxy-policy#multiple-active-proxies">}}) are bound to the database, one on each node that hosts a master shard. This policy fits most use cases that require multiple proxies. |
| all-nodes | [Multiple proxies]({{<relref "/rs/databases/configure/proxy-policy#multiple-active-proxies">}}) are bound to the database, one on each node in the cluster, even if the node doesn't host any database shards. You should use this policy only in special cases. |

## Examples

### View proxy policy

To view the current proxy policy, run [`rladmin info cluster`]({{<relref "/rs/references/cli-utilities/rladmin/info#info-cluster">}}):

```sh
$ rladmin info cluster
cluster configuration:
   repl_diskless: enabled
   default_non_sharded_proxy_policy: single
   default_sharded_proxy_policy: single
   ...
```

### Change proxy policy

You can configure the proxy policy using [`rladmin bind`]({{<relref "/rs/references/cli-utilities/rladmin/bind">}}).

```sh
$ rladmin bind db db1 endpoint 1:1 policy all-master-shards
```

