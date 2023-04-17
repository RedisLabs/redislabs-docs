---
Title: Assign permissions to roles
LinkTitle: Create roles
description: 
weight: 20
alwaysopen: false
toc: "true"
headerRange: "[1-3]"
categories: []
aliases: 
---

To assign [Redis ACLs]({{<relref "rc/security/access-control/data-access-control/configure-acls">}}) to a data access role:

1. Go to **Data Access Control > Roles** and either select `+` to create a new role or point to an existing role and select the pencil icon to edit it.

1. In the **Associations** section of the **Edit role** or **Create new role** screen, you can select `+` to create a new association or point to an existing association and select the pencil icon to edit it.

1. Select one or more databases from the **Databases** list.

1. To set the role's level of access to the selected databases, select a **Redis ACL** from the list.

1. Select the check mark to confirm the association.

1. Select **Save role**.

After you create a role, you can [assign a user]({{<relref "rc/security/access-control/data-access-control/create-assign-users#assign-roles-to-users">}}) to it. Users assigned the role can access the databases according to the role's associated Redis ACLs.



