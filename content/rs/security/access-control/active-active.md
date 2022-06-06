---
Title: Access control for Active-Active databases
linkTitle: Active-Active databases
description: Access control for Active-Active databases.
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: 
---

Users, roles, and Redis ACLs are cluster-level entities. Therefore they are applied per local participating cluster and Active-Active database instance, and they are not replicated or propagated to the other participating clusters and instances.
ACLs will be enforced according to the instance the client is connected to. The Active-Active replication mechanism will propagate all the effects of the operation.

## Update admin credentials

Active-Active databases use administrator credentials to manage operations.

To update the administrator user password on a cluster with Active-Active databases:

1. From the user management page, update the administrator user password on the clusters you want to update.

1. For each participating cluster _and_ each Active-Active database, update the admin user credentials to match the changes in step 1. 

{{<warning>}}
Do not perform any management operations on the databases until these steps are complete.
{{</warning>}}
