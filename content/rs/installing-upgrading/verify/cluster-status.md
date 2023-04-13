---
Title: Verify cluster status
linkTitle: Cluster status
description: Verify cluster status.
weight: 50
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

## General cluster issues

Run [`rladmin status issues_only`]({{<relref "/rs/references/cli-utilities/rladmin/status">}}) and verify that no issues appear:

```sh
$ rladmin status issues_only
CLUSTER NODES:
NODE:ID ROLE ADDRESS EXTERNAL_ADDRESS HOSTNAME SHARDS CORES FREE_RAM PROVISIONAL_RAM VERSION STATUS

DATABASES:
DB:ID  NAME        TYPE  STATUS  SHARDS  PLACEMENT   REPLICATION    PERSISTENCE    ENDPOINT  

ENDPOINTS:
DB:ID               NAME             ID          NODE             ROLE             SSL       

SHARDS:
DB:ID      NAME     ID        NODE     ROLE     SLOTS      USED_MEMORY            STATUS     

```

## Shard memory

For each shard, `USED_MEMORY` should be less than 25 GB.

Run [`rladmin status shards`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-shards">}}):

```sh
$ rladmin status shards
SHARDS:
DB:ID    NAME         ID          NODE      ROLE      SLOTS       USED_MEMORY       STATUS   
db:1     db1          redis:1     node:1    master    0-16383     2.13MB            OK  
```

## Active tasks

Run [`rladmin cluster running_actions`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/running_actions">}}) and confirm that no tasks are currently running (active):

```sh
$ rladmin cluster running_actions
No active tasks
```

## Verify balance

Run [`rladmin verify balance`]({{<relref "/rs/references/cli-utilities/rladmin/verify#verify-balance">}}) and verify no databases are listed. This check is not critical unless latency is observed.

```sh
$ rladmin verify balance
The table presents all of the unbalanced endpoints/nodes in the cluster
BALANCE:
NODE:ID   DB:ID   NAME     ENDPOINT:ID     PROXY_POLICY     LOCAL SHARDS     TOTAL SHARDS    
```
