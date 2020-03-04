---
Title: Deleting an Active-Active Database
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Deleting an Active-Active database (CRDB) is a nearly identical procedure to standard Redis
databases in Redis Enterprise Software, but with a critical distinction.
Since Active-Active databases span multiple Participating Clusters, there is more
extensive administrative work being done on the clusters on your behalf.
When you click the button on the configuration tab to delete an Active-Active database,
**this action is an immediate, non-reversible, and has no rollback**.
The cluster deletes all member databases from all Participating Clusters
on your behalf. Therefore, it is highly recommended to have backups
complete and tested before deleting an Active-Active database.
