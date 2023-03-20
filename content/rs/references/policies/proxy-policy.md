---
Title: Proxy policy
linkTitle: proxy_policy
description: Proxy policy 
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases: 
---

A database can have one of these proxy policies:

## Policy values

| Value | Description |
|-------|-------------|
| single | There is only a single proxy that is bound to the database. This is the default database configuration and preferable in most use cases. |
| <nobr>all-master-shards</nobr> | There are multiple proxies that are bound to the database, one on each node that hosts a database master shard. This mode fits most use cases that require multiple proxies. |
| all-nodes | There are multiple proxies that are bound to the database, one on each node in the cluster, regardless of whether or not there is a shard from this database on the node. This mode should be used only in special cases. |

## View proxy policy

To view the current proxy policy, run `rladmin info cluster`:

```sh
$ rladmin info cluster
cluster configuration:
   repl_diskless: enabled
   default_non_sharded_proxy_policy: single
   default_sharded_proxy_policy: single
   ...
```

## Change proxy policy

You can configure the proxy policy using the `bind` command in
rladmin.

The following example changes the proxy policy for a database called "db1" with the endpoint ID "1:1" to `all-master-shards`.

```sh
$ rladmin bind db db1 endpoint 1:1 \
          policy all-master-shards
```

