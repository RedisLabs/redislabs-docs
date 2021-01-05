---
Title: Role-Based Access Control
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Role-Based Access Control (RBAC) lets you scale your Redis deployments while simplifying the complexity of managing a cluster with many databases, users, and access control lists.
With RBAC, you can create a role and apply it to many users to define their access to multiple databases in the cluster.

In **access control** > **roles**, you can configure Redis Enterprise Software (RS) user roles with:

- **Management roles** that define user access to the RS web UI and API for the cluster
- **Data access control** with Redis ACLs that define the commands and keys that users can access in database connections

## Cluster management roles

Each user role is assigned a management role that defines the access the user with that role has in the RS web UI and API for the cluster.

The management roles are:

{{< embed-html "account-role-table.html" >}}

### Assigning management roles to a user role

To assign a management role to a user role:

1. In **access control** > **roles**:
    - Edit an existing role - Hover over a role and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new role - Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Select the management role for the user role.
1. Click **Save**.

### User roles for database connections only

To create a user role for users that cannot connect to the RS web UI and API, assign the **None** management role to the user role.

## Database access control

To control user access to Redis database commands and keys,
you must define Redis ACLs that specify the commands that users can run and keys that the commands can apply to.
Then, in the user role, select the databases that the users can access and Redis ACL that controls user access to those databases.

{{< note >}}

- Redis ACLs can only be configured in the cluster web UI or API.
    In Redis:
    - These ACL subcommands are blocked: LOAD, SAVE, SETUSER, DELUSER, GENPASS, LOG
    - These ACL subcommands are allowed: LIST, USER, GETUSER, CAT, WHOAMI, HELP
- The MULTI, EXEC, DISCARD commands are always allowed, but ACLs are enforced on MULTI subcommands.
- External users cannot authenticate with databases.
- When you run multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.

{{< /note >}}

### Redis ACL command syntax

Redis ACLs are defined by a [Redis syntax](https://redis.io/topics/acl#acl-rules) where you specify the commands or command categories that are allowed for specific keys.
A command category is a predefined, named set of commands that perform a function, for example `read` commands or `dangerous` commands.
You can also define Redis ACLs with module commands for any modules that are loaded on the cluster.
If you run a command on multiple databases including databases where the command is not allowed by ACLs or the command does not exist,
the command succeeds where possible.

A Redis ACL syntax lets you:

- Include commands and categories with the `+` or exclude commands and categories with the `-` prefix
- Define categories with the `@` prefix
- Define keys or key patterns with the `~` prefix

The predefined Redis ACLs are:

- Full Access (`+@all ~*`) - All commands are allowed for all keys
- Not Dangerous (`+@all -@dangerous ~*`) - All commands except for the "dangerous" command category are allowed for all keys
- Read Only (`+@read ~*`) - Only the "read" command category is allowed for all keys

To define database access control, you can either:

- Use the predefined user roles and add to them Redis ACLs for specific databases.
- Create new user roles and select the management roles and Redis ACLs that apply to the user roles for specific databases.
- Assign roles and Redis ACLs to a database in the access control list section of the [database configuration]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

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

### Assigning Redis ACLs to a user role

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
