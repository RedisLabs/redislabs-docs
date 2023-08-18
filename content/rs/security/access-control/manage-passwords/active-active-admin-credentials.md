---
Title: Update admin credentials for Active-Active databases
linkTitle: Update Active-Active admin credentials
description: Update admin credentials for Active-Active databases.
weight: 90
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/security/access-control/rbac/active-active"]
---

Active-Active databases use administrator credentials to manage operations.

To update the administrator user password on a cluster with Active-Active databases:

1. From the user management page, update the administrator user password on the clusters you want to update.

1. For each participating cluster _and_ each Active-Active database, update the admin user credentials to match the changes in step 1. 

{{<warning>}}
Do not perform any management operations on the databases until these steps are complete.
{{</warning>}}
