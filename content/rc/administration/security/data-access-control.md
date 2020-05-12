---
title: Role-Based Access Control for Data Connections
description:
weight: 40
alwaysopen: false
categories: ["RC"]
---
Role-Based Access Control (RBAC) lets you scale your Redis deployments while simplifying the management of data access for a subscription with many databases, users, and access control lists.
With RBAC, you can create a role for data access and apply it to many users to define their access to multiple databases in the subscription.

In **Data Access Control > Roles**, you can configure data access roles with Redis ACLs that define the commands and keys that users can access in database connections

To control user access to Redis database commands and keys,
you must define Redis ACLs that specify the commands that users can run and keys that the commands can apply to.
Then, in the data access role, select the databases that the users can access and Redis ACL that controls user access to those databases.

{{% note %}}

- Redis ACLs can only be configured in the Redis Cloud Admin Console.
    In Redis:
    - These ACL subcommands are blocked: LOAD, SAVE, SETUSER, DELUSER, GENPASS, LOG
    - These ACL subcommands are allowed: LIST, USER, GETUSER, CAT, WHOAMI, HELP
- The MULTI, EXEC, DISCARD commands are always allowed, but ACLs are enforced on MULTI subcommands.
- When you run multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.

{{% /note %}}

## Redis ACL command syntax

Redis ACLs are defined by a [Redis syntax](https://redis.io/topics/acl#acl-rules) where you specify the commands or command categories that are allowed for specific keys.
A command category is a predefined, named set of commands that perform a function, for example `read` commands or `dangerous` commands.
You can also define Redis ACLs with module commands for any modules that are loaded on the subscription,
but they can only be used for databases that support those modules.

The Redis ACL syntax lets you:

- Include commands and categories with the `+` or exclude commands and categories with the `-` prefix
- Define categories with the `@` prefix
- Define keys or key patterns with the `~` prefix

The predefined Redis ACLs are:

- Full Access (`+@all ~*`) - All commands are allowed for all keys
- Not Dangerous (`+@all -@dangerous ~*`) - All commands except for the "dangerous" command category are allowed for all keys
- Read Only (`+@read ~*`) - Only the "read" command category is allowed for all keys

To define database access control, you can either:

- Use the predefined data access roles and add Redis ACLs to them for specific databases.
- Create new data access roles and select the management roles and Redis ACLs that apply to the roles for specific databases.
- Assign roles and Redis ACLs to a database in the access control list section of the [database configuration]({{< relref "/rc/administration/setup/create-database.md" >}}).

## Configuring Redis ACLs

To configure a Redis ACL that you can assign to a data access role:

1. In **Data Access Control** > **Redis ACLs**:
    - Edit an existing Redis ACL - Hover over a Redis ACL and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new Redis ACL - Click ![Add](/images/rc/icon_add.png#no-click "Add").
1. Enter a descriptive name for the Redis ACL.
1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) of the command or click **Rule Builder** to use the form to build the command:
    1. For the commands:
        1. Select to include or exclude the command or category.
        1. Enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the commands.
            - To add more command definitions, click ![Add](/images/rc/icon_add.png#no-click "Add").
            - All entries in the Commands/Categories column apply to the keys defined in the Keys column.
    1. For the keys, enter the [ACL syntax](https://redis.io/topics/acl#acl-rules) that defines the keys.
        - To add more key definitions, click ![Add](/images/rc/icon_add.png#no-click "Add").
    1. Click **Save Rule**.
1. Click **Save**.

## Assigning Redis ACLs to a User Role

To assign Redis ACLs to a data access role:

1. In **Data Access Control** > **Roles**:
    - Edit an existing role - Hover over a role and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new role - Click ![Add](/images/rc/icon_add.png#no-click "Add").
1. In the Redis ACLs section:
    - Edit a Redis ACL association - Hover over a Redis ACL assignment and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a Redis ACL association - Click ![Add](/images/rc/icon_add.png#no-click "Add").
1. Select the databases that the Redis ACL applies to.
1. Select the [Redis ACL](#configuring-redis-acls) that define the access to commands and keys.
1. Click ![Save](/images/rc/icon_save.png#no-click "Save").

    You can click ![Add](/images/rc/icon_add.png#no-click "Add") to assign a Redis ACL to another database.

1. Click **Save**.

Users that are assigned to the role can access the databases according to the Redis ACL definitions.

## Assigning Users to a User Role

To assign users to a data access role:

1. In **Data Access Control** > **Users**:
    - Edit an existing role - Hover over a role and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new role - Click ![Add](/images/rc/icon_add.png#no-click "Add").
1. Select a role for the user.

    You can also change the user password.

1. Click ![Save](/images/rc/icon_save.png#no-click "Save").
