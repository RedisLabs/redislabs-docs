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

1. Go to **Data Access Control** from the [Redis Cloud console](https://app.redislabs.com/#/) menu.

    {{<image filename="images/rc/data-access-control-menu.png" width="200px" alt="Menu for database access control." >}}{{< /image >}}

1. Select the **Roles** tab.

    {{<image filename="images/rc/data-access-control-roles.png" alt="Role configuration area." >}}{{< /image >}}

1. Select `+` to create a new role or point to an existing role and select the pencil icon to edit it.

    {{<image filename="images/rc/data-access-control-roles-add-or-edit.png" width="300px" alt="Add or edit a role." >}}{{< /image >}}

1. Enter a name for the role.

    {{<image filename="images/rc/data-access-control-roles-add.png" width="400px" alt="Role add screen." >}}{{< /image >}}

1. Select an **ACL rule** to assign to the role.

    {{<image filename="images/rc/data-access-control-roles-select-acl.png" width="300px" alt="Select an ACL Rule." >}}{{< /image >}}

1. Select one or more databases from the **Databases** list and click the check mark to confirm the association.

    {{<image filename="images/rc/data-access-control-roles-select-databases.png" width="400px" alt="Select an databases." >}}{{< /image >}}

1. Select **Save role**.

When you assign a user-defined ACL rule to a role and associate it with one or more databases, Redis will verify that the ACL rule will work with the selected databases. 

After you create a role, you can assign it to a user. Users with this role can access the databases according to the role's associated Redis ACLs. For more information, see [Assign roles to users]({{<relref "rc/security/access-control/data-access-control/create-assign-users#assign-roles-to-users">}}).

To assign Redis ACLs to a role for an [Active-Active subscription]({{<relref "rc/databases/active-active-redis">}}), see [Active-Active access roles]({{<relref "rc/security/access-control/data-access-control/active-active-roles">}}).

