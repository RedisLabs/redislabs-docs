---
Title: Cluster Management Roles
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
In **access control** > **roles**, you can configure RS roles with:

- Cluster management roles that define user access to the RS web UI
- Redis ACLs that define the commands and keys that users can access in database connections

You can use the predefined roles and add Redis ACLs to them,
or you can create new roles with management roles and Redis ACLs.

The cluster management roles are:

{{< embed-html "account-role-table.html" >}}

## Users for Database Connections Only

To create a role for users that cannot connect to the RS web UI, assign the **None** management role to the role.

## Configuring Redis ACLs

