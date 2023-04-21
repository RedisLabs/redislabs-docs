---
Title: Create roles
linkTitle: Create roles
description: Create access control roles.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/security/access-control/create-roles/"]
---

From **access control** > **roles**, you can configure user roles with:

- **Management roles** - Management roles define user access to the cluster's admin console and API.
- **Data access controls** - Data access controls define the permissions each role has for each database in the cluster.

## Create roles for database access

To create a role that grants database access to users but blocks access to the Redis Enterprise admin console and REST API, set the **Cluster management role** to **None**.

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