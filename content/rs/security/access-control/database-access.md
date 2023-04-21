---
Title: Control database access using RBAC
linkTitle: Database access (RBAC)
description: Control the user's level of access to a database.
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: 
---

To control a user's level of access to a database, use role-based access control.

1. [Configure Redis ACLs]({{<relref "/rs/security/access-control/rbac/configure-acl">}}).

1. [Create or edit a role]({{<relref "/rs/security/access-control/rbac/create-roles">}}) and associate it with specific Redis ACLs and databases.

1. [Assign the role to a user]({{<relref "/rs/security/access-control/rbac/assign-user-role">}}) to grant access to the database with the permissions defined by the role's associated ACLs.