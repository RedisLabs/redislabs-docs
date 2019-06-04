---
Title: Deleting a Conflict-free Replicated Database (CRDB)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Deleting a CRDB is a nearly identical procedure to standard Redis
databases in Redis Enterprise Software, but with a critical distinction.
Since CRDBs span multiple Participating Clusters, there is more
extensive administrative work being done on the clusters on your behalf.
When you click the button on the configuration tab to delete a CRDB,
**this action is an immediate, non-reversible, and has no rollback**.
The cluster deletes all member databases from all Participating Clusters
on your behalf. Therefore, it is highly recommended to have backups
complete and tested before deleting a CRDB.
