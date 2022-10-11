---
Title: Cluster management commands compatibility
linkTitle: Cluster management
description: Cluster management commands compatible with Redis Enterprise.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: 
---

[Clustering in Redis Enterprise Software]({{<relref "/rs/databases/durability-ha/clustering">}}) and [Redis Enterprise Cloud]({{<relref "/rc/databases/configuration/clustering">}}) differs from the [open source Redis cluster](https://redis.io/docs/manual/scaling/) and works with all standard Redis clients.

Redis Enterprise blocks most [cluster commands](https://redis.io/commands/?group=cluster). If you try to use a blocked cluster command, it returns an error.

| Command | Redis<br />Enterprise | Redis<br />Cloud | Notes |
|:--------|:----------------------|:-----------------|:------|
| [ASKING](https://redis.io/commands/asking) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER ADDSLOTS](https://redis.io/commands/cluster-addslots) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER ADDSLOTSRANGE](https://redis.io/commands/cluster-addslotsrange) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER BUMPEPOCH](https://redis.io/commands/cluster-bumpepoch) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER COUNT-FAILURE-REPORTS](https://redis.io/commands/cluster-count-failure-reports) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER COUNTKEYSINSLOT](https://redis.io/commands/cluster-countkeysinslot) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER DELSLOTS](https://redis.io/commands/cluster-delslots) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER DELSLOTSRANGE](https://redis.io/commands/cluster-delslotsrange) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER FAILOVER](https://redis.io/commands/cluster-failover) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER FLUSHSLOTS](https://redis.io/commands/cluster-flushslots) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER FORGET](https://redis.io/commands/cluster-forget) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER GETKEYSINSLOT](https://redis.io/commands/cluster-getkeysinslot) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER INFO](https://redis.io/commands/cluster-info) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Only supported with the [OSS cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}). |
| [CLUSTER KEYSLOT](https://redis.io/commands/cluster-keyslot) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Only supported with the [OSS cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}). |
| [CLUSTER LINKS](https://redis.io/commands/cluster-links) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER MEET](https://redis.io/commands/cluster-meet) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER MYID](https://redis.io/commands/cluster-myid) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER NODES](https://redis.io/commands/cluster-nodes) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Only supported with the [OSS cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}). |
| [CLUSTER REPLICAS](https://redis.io/commands/cluster-replicas) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER REPLICATE](https://redis.io/commands/cluster-replicate) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER RESET](https://redis.io/commands/cluster-reset) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER SAVECONFIG](https://redis.io/commands/cluster-saveconfig) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER SET-CONFIG-EPOCH](https://redis.io/commands/cluster-set-config-epoch) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER SETSLOT](https://redis.io/commands/cluster-setslot) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER SHARDS](https://redis.io/commands/cluster-shards) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [CLUSTER SLAVES](https://redis.io/commands/cluster-slaves) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | Deprecated as of Redis v5.0.0. |
| [CLUSTER SLOTS](https://redis.io/commands/cluster-slots) | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | &#x2705; Yes<br /><br /><nobr>Active-Active:</nobr><br />&#x2705; Yes | Only supported with the [OSS cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}). Deprecated as of Redis v7.0.0. |
| [READONLY](https://redis.io/commands/readonly) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
| [READWRITE](https://redis.io/commands/readwrite) | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No | &#x274c; No<br /><br /><nobr>Active-Active:</nobr><br />&#x274c; No |  |
