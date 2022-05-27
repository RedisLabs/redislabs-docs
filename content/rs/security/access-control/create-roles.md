---
Title: Create roles
linkTitle: Create roles
description: Create access control roles.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: 
---

In **access control** > **roles**, you can configure user roles with:

- **Management roles** - Management roles define user access to the UI and API of the cluster
- **Data access controls** - Data access controls define the permissions each role has to each database in the cluster.

## Default roles

Redis Enterprise Software includes five pre-built roles to help users who need limited access to the admin console.

1. **DB Viewer** - Read any settings for databases
1. **DB Member** - Administer databases
1. **Cluster Viewer** - Read any cluster settings
1. **Cluster Member** - Administrator the cluster
1. **Admin** - Full cluster access

The following table elaborates on the privileges for each of these roles:

{{<embed-html "account-role-table.html">}}

## Create roles for database access

To create a user role for users that cannot connect to the Redis Enterprise control plane, assign the "**None**" management role to the user role.
{{<note>}}
We recommend that you set the management role to None for any role used for database access.
{{</note>}}

To define a role for database access:

1. In **access control** > **roles**:

    - Edit an existing Redis ACL - Hover over a Redis ACL and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new Redis ACL - Click ![Add](/images/rs/icon_add.png#no-click "Add").

1. Enter a descriptive name for the role. This will be used to reference the role when configuring users.
1. Select a Cluster management role by default this is set to "**None**"
1. Select Add under Redis ACLs  ![Add](/images/rs/icon_add.png#no-click "Add")
1. Select the databases the role applies to
1. Select the Redis ACL to apply to the role
1. Select the save icon
1. Select save
{{< video "/images/rs/new-redis-role.mp4" "Create a new Redis Role" >}}