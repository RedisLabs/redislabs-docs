---
Title: Create roles
linkTitle: Create roles
description: Create access control roles.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: 
---

From **access control** > **roles**, you can configure user roles with:

- **Management roles** - Management roles define user access to the cluster's admin console and API
- **Data access controls** - Data access controls define the permissions each role has for each database in the cluster.

## Default management roles

Redis Enterprise Software includes five predefined roles to help users who need limited access to the admin console.

1. **DB Viewer** - Read database settings
1. **DB Member** - Administer databases
1. **Cluster Viewer** - Read cluster settings
1. **Cluster Member** - Administer the cluster
1. **Admin** - Full cluster access

For more details about the privileges for each of these roles, see the following table:

| Action | DB Viewer | DB Member | Cluster Viewer | Cluster Member | Admin |
|--------|:---------:|:---------:|:--------------:|:-----------:|:------:|
| Edit database configuration | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| Reset slow log | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View cluster configuration | <span title="Not allowed">&#x274c;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View cluster logs | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span><br /> |
| View cluster metrics | <span title="Not allowed">&#x274c;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View database configuration | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View database metrics | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View node configuration | <span title="Not allowed">&#x274c;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View node metrics | <span title="Not allowed">&#x274c;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View Redis database password | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> | <span title="Allowed">&#x2705;</span> |
| View and edit cluster settings |<span title="Not allowed">&#x274c;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Not allowed">&#x274c;</span> | <span title="Allowed">&#x2705;</span> |

## Create roles for database access

To create a user role for users that cannot connect to the Redis Enterprise control plane, assign the "**None**" management role to the user role.
{{<note>}}
We recommend that you set the management role to None for any role used for database access.
{{</note>}}

To define a role for database access:

1. From **access control** > **roles**, you can either:

    - Point to a role and select ![Edit](/images/rc/icon_edit.png#no-click "Edit") to edit an existing role.

    - Select ![Add](/images/rs/icon_add.png#no-click "Add") to create a new role.

1. Enter a descriptive name for the role. This will be used to reference the role when configuring users.

1. Select a **Cluster management role**. The default is **None**.

1. Select **Add** under **Redis ACLs** ![Add](/images/rs/icon_add.png#no-click "Add").

1. Select the databases the role applies to.

1. Select the Redis ACL to apply to the role.

1. Select the save icon.

1. Select **Save**.

{{< video "/images/rs/new-redis-role.mp4" "Create a new Redis Role" >}}