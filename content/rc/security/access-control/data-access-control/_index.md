---
Title: Data Access Control
LinkTitle: Data Access Control
description: Secure access to the data in your Redis Cloud databases.
weight: 25
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: ["RC"]
aliases: /rc/administration/security/data-access-control
         /rc/security/database-security/passwords-users-roles/
         /rc/security/database-security/passwords-users-roles.md
---

## [Default user]({{<relref "/rc/security/access-control/data-access-control/default-user">}})

When you create a Redis Cloud database, your database is given a randomly generated password called the **Default user password**. Learn how to [change the default user password]({{<relref "/rc/security/access-control/data-access-control/default-user#change-password">}}) or [turn off access]({{<relref "/rc/security/access-control/data-access-control/default-user#turn-off-default-user">}}) using the default user password.

## [Role-based access control]({{<relref "/rc/security/access-control/data-access-control/role-based-access-control.md">}})

With Role-based access control (RBAC), you create roles and assign your users to those roles to grant different levels of access to the database.

- [Configure ACLs]({{<relref "rc/security/access-control/data-access-control/configure-acls">}})
- [Create roles]({{<relref "rc/security/access-control/data-access-control/create-roles">}})
- [Create and edit database users]({{<relref "rc/security/access-control/data-access-control/create-assign-users">}})
