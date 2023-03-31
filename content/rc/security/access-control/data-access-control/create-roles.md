---
Title: Create and assign roles
LinkTitle: Create roles
description: 
weight: $weight
alwaysopen: false
toc: "true"
headerRange: [1-3]
categories: []
aliases: 
---

## Assign permissions to roles

To assign Redis ACLs to a data access role:

1. Go to **Data Access Control > Roles** and either:

    - Point to an existing role and select the **Edit** button:

        {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing role." >}}{{< /image >}}

    - Select the **Add** button to create a new role:

        {{<image filename="images/rc/icon-rbac-add.png" width="40px" alt="Select the Add button to create a new role." >}}{{< /image >}}

1. In the **Associations** section of the **Edit role** or **Create new role** screen, you can:

    - Point to an existing association and select the **Edit** button:

        {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing role association." >}}{{< /image >}}

    - Select the **Add** button to create a new association:

        {{<image filename="images/rc/icon-rbac-add.png" width="40px" alt="Select the Add button to create a new role association." >}}{{< /image >}}

1. Select one or more databases from the **Databases** list.

1. To set the role's level of access to the selected databases, select a **Redis ACL** from the list.

1. Select the check mark to confirm the association:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to save the role association changes." >}}{{< /image >}}

1. Select **Save role**:

    {{<image filename="images/rc/button-data-access-control-save-role.png" width="120px" alt="The Save role button saves your role changes." >}}{{< /image >}}

Users assigned the role can access the databases according to the role's associated Redis ACLs.

## Assign roles to users

To assign a role to a user:

1. Go to **Data Access Control > Users**.

1. Point to the user and select the **Edit** button when it appears:

    {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing user's role." >}}{{< /image >}}

1. Select a **Role** from the list.

1. Select the check mark to assign the role to the user:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to apply the user's role changes." >}}{{< /image >}}