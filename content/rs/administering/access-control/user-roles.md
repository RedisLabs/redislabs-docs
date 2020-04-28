---
Title: User Roles and Access Control
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
In **access control** > **roles**, you can configure RS roles to assign to users with:

- Management roles that define user access to the RS web UI for the cluster
- Redis ACLs that define the commands and keys that users can access in database connections

## Cluster Management Roles

Each user role is assigned a management role that defines the access the user with that role has in the RS web UI for the cluster.

The management roles are:

{{< embed-html "account-role-table.html" >}}

### Assigning Management Roles to a User Role

To assign a management role to a user role:

1. In **access control** > **roles**:
    - Edit an existing role - Hover over a role and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new role - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the management role for the user role.
1. Click **Save**.

### User Roles for Database Connections Only

To create a user role for users that cannot connect to the RS web UI, assign the **None** management role to the user role.

## Database Access Control

To control user access to Redis database commands and keys,
you must define Redis ACLs that specify the commands and keys that users can run.
Then, in the user role, select the databases that the users can access and Redis ACL that controls user access to those databases.

Redis ACLs are defined by a [Redis ACL syntax](https://redis.io/topics/acl#acl-rules) that lets you:

- include commands and keys with the `+` and exclude commands and keys with the `-` prefix
- define commands or command categories with the `@` prefix
- define keys or key patterns with the `~` prefix

The predefined Redis ACLs are:

- Full Access (+@all ~*) - All commands are allowed for all keys
- Not Dangerous (+@all -@dangerous ~*) - All commands except for the "dangerous" command category are allowed for all keys
- Read Only (+@read ~*) - Only the "read" command category are allowed for all keys

To define database access control, you can:

- Use the predefined user roles and add Redis ACLs to them.
- Create new user roles and select the management roles and Redis ACLs that apply to the user roles.
- Assign roles and Redis ACLs to a database in the access control list section of the [database configuration]({{< relref "/rs/administering/database-operations/creating-database.md" >}}).

### Configuring Redis ACLs

To configure a Redis ACL that you can assign to a user role:

1. In **access control** > **redis acls**:
    - Edit an existing Redis ACL - Hover over a Redis ACL and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new Redis ACL - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Enter a descriptive name for the Redis ACL.
1. Define the ACL command:
    - Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) of the command.
    - Click **Need Assistance** to use the form to build the command:
        1. For the commands, select to include or exclude the command or category.
        1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the commands.
            - You can enter multiple definitions of commands or categories.
            - All entries in the Commands/Categories column apply to the keys defined in the Keys column.
        1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the keys.
            - You can enter multiple definitions of keys.
        1. Click **Submit**.
1. Click **Save**.

### Assigning Redis ACLs to a User Role

To assign Redis ACLs to a user role:

1. In **access control** > **roles**:
    - Edit an existing role - Hover over a role and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new role - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. In the Redis ACLs section:
    - Edit a Redis ACL assignment - Hover over a Redis ACL assignment and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a Redis ACL assignment - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the databases that the Redis ACL applies to.
1. Select the [Redis ACL](#configuring-redis-acls) that define the access to commands and keys.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

    You can click ![Add](/images/rs/icon_add.png#no-click "Add") to assign a Redis ACL to another database.

1. Click **Update**.

Users that are assigned to the user role can access the databases according to the Redis ACL definitions.
