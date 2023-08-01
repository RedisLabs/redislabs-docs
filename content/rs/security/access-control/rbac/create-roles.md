---
Title: Create roles
linkTitle: Create roles
description: Create access control roles.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/security/access-control/create-roles/"]
---

From **Access Control** > **Roles**, you can create custom user roles that determine cluster management permissions, data access permissions, or a combination of both.

- [**Management roles**](#default-management-roles) - Management roles define user access to the cluster's admin console and API.

- **Data access controls** - Data access controls define the permissions each role has for each database in the cluster.

## Default management roles

Redis Enterprise Software includes five predefined roles that determine a user's level of access to the admin console and [REST API]({{<relref "/rs/references/rest-api">}}).

1. **None** - Cannot access the admin console or use the REST API
1. **DB Viewer** - Read database settings
1. **DB Member** - Administer databases
1. **Cluster Viewer** - Read cluster settings
1. **Cluster Member** - Administer the cluster
1. **Admin** - Full cluster access

For more details about the privileges granted by each of these roles, see [admin console permissions]({{<relref "/rs/security/access-control/admin-console-access#admin-console-permissions">}}) or [REST API permissions]({{<relref "/rs/references/rest-api/permissions">}}).

## Create roles for database access {#create-db-role}

To create a role that grants database access to users but blocks access to the Redis Enterprise admin console and REST API, set the **Cluster management role** to **None**.

To define a role for database access:

1. From **Access Control** > **Roles**, you can:

    - Point to a role and select <img src="/images/rs/buttons/edit-button.png#no-click" alt="The Edit button" width="25px"> to edit an existing role.

    - Select **+ Add role** to create a new role.

1. Enter a descriptive name for the role. This will be used to reference the role when configuring users.

1. Choose a **Cluster management role**. The default is **None**.

1. Select **+ Add ACL**.

1. Choose a Redis ACL and databases to associate with the role.

1. Select the check mark to confirm.

1. Select **Save**.

## Next steps

- [Assign the role to a user]({{<relref "/rs/security/access-control/rbac/assign-user-role">}}).