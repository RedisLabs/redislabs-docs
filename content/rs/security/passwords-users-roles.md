---
Title: Database access control
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/access-control/user-roles"]
---
Role-based access control allows you to scale your Redis deployments while minimizing the overhead involved in managing a cluster with many databases, multiple users, and various access control lists. With RBAC, you can create a role once and then deploy it across multiple databases in the cluster with ease.

Roles may be configured using standard or custom templates for database permissions that are based on the Redis ACL syntax. Redis Enterprise allows you to restrict database operations by command, command category, and key pattern.
Keys are typically restricted based on a namespace using a glob style wildcard.

The role CacheReader demonstrated below has been given the acl rule "+get ~cache:*". Users in this role can access a key prefixed with “cached:” and the get command only. This would allow them to access the key cached:foo with the command get but not give them access to the set command. This role would not be able to access the key ‘foo’ because it is not prefixed with ‘cached:’ as you can see below.

![role](/images/rs/Redis-Role.png#no-click "role")

To learn more on Redis command and key restrictions visit the [Redis documentation](https://redis.io/topics/acl#acl-rules)

## Redis ACL command syntax
Redis ACLs are defined by a [Redis syntax](https://redis.io/topics/acl#acl-rules) where you specify the commands or command categories that are allowed for specific keys.

{{< note >}}
Redis Enterprise Modules are not currently assigned a command category.
{{< /note >}}

Redis Enterprise allows you to:

1. Include commands and categories with the "+" prefix for commands or "+@" prefix for command categories
1. Exclude commands and categories with the "-" prefix for commands or "-@" prefix for command categories
1. Include keys or key patterns with the "~" prefix

To define database access control, you can:

1. Use the predefined user roles and add Redis ACLs for specific databases.
1. Create new user roles and select the management roles and Redis ACLs that apply to the user roles for specific databases.
1. Assign roles and Redis ACLs to a database in the access control list section of the database configuration.

The predefined Redis ACLs are:

- **Full Access** - All commands are allowed on all keys.
- **Not Dangerous** - All commands are allowed except those that are administrative, could affect availability, or could affect performance.
- **Read Only** - Only read-only commands are allowed on keys.

## Configuring Redis ACLs

To configure a Redis ACL rule that you can assign to a user role:

1. In **access control** > **redis acls**:

    - Edit an existing Redis ACL - Hover over a Redis ACL and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new Redis ACL - Click ![Add](/images/rs/icon_add.png#no-click "Add").

1. Enter a descriptive name for the Redis ACL. This will be used to reference the ACL rule to the role.
1. Define the ACL rule.
1. Click Save.

{{< video "/images/rs/new-redis-acl-rule.mp4" "Create a new Redis ACL Rule" >}}

{{< note >}}
    In Redis Enterprise:
    - The following ACL commands are blocked: LOAD, SAVE, SETUSER, DELUSER, GENPASS, LOG
    - The following ACL subcommands are allowed: LIST, USER, GETUSER, CAT, WHOAMI, HELP
    - The MULTI, EXEC, DISCARD commands are always allowed, but ACLs are enforced on MULTI subcommands.
    - External users are not currently supported for database authentication.
    - Multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.
{{< /note >}}

## Configuring roles and users

In **access control** > **roles**, you can configure user roles with:

- **Management roles** - Management roles define user access to the UI and API of the cluster
- **Data access controls** - Data access controls define the permissions each role has to each database in the cluster.

### Defining roles for database access

To create a user role for users that cannot connect to the Redis Enterprise control plane, assign the "**None**" management role to the user role.
{{< note >}}
We recommend that you set the management role to None for any role used for database access.
{{< /note >}}

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

### Adding Users

To add a user to the cluster:

1. Go to the  access control tab
1. Click ![Add](/images/rs/icon_add.png#no-click "Add")
1. Enter the name, email and password of the new user and select the role to assign to the user.
1. Select the internal user type
1. For email alerts, click "Edit" and select the alerts that the user should receive. You can select:
    - Receive alerts for databases - The alerts that are enabled for the selected databases will be sent to the user. You can either select "All databases", or you can select "Customize" and select the individual databases to send alerts for.
    - Receive cluster alerts - The alerts that are enabled for the cluster in **settings** > **alerts** are sent to the user.
1. Select the save icon.
{{< video "/images/rs/new-user-add.mp4" "Create a new user" >}}

### Disabling the default user

When you provision a database, default user will be enabled. This allows for backwards compatibility with versions of Redis before Redis 6.

To disable the default user:

1. Select the configuration tab.
1. Find the Default database access setting.
1. Deselect the checkbox.

{{< note >}}
We recommend that you disable the default user when using ACLs with your database and backwards compatibility is not required.
{{< /note >}}

![default](/images/rs/default-user.png#no-click "default")
