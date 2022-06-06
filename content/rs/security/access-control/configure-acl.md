---
Title: Configure ACLs
linkTitle: Configure ACLs
description: Configure access control lists (ACLs).
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: 
---

## Redis ACL command syntax
Redis ACLs are defined by a [Redis syntax](https://redis.io/topics/acl#acl-rules) where you specify the commands or command categories that are allowed for specific keys.

{{<note>}}
Redis Enterprise modules are not currently assigned a command category.
{{</note>}}

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

## Configure Redis ACLs

To configure a Redis ACL rule that you can assign to a user role:

1. In **access control** > **redis acls**:

    - Edit an existing Redis ACL - Hover over a Redis ACL and click ![Edit](/images/rc/icon_edit.png#no-click "Edit").
    - Create a new Redis ACL - Click ![Add](/images/rs/icon_add.png#no-click "Add").

1. Enter a descriptive name for the Redis ACL. This will be used to reference the ACL rule to the role.
1. Define the ACL rule.
1. Click Save.

{{< video "/images/rs/new-redis-acl-rule.mp4" "Create a new Redis ACL Rule" >}}

{{<note>}}
In Redis Enterprise:
- The following ACL commands are blocked: LOAD, SAVE, SETUSER, DELUSER, GENPASS, LOG
- The following ACL subcommands are allowed: LIST, USER, GETUSER, CAT, WHOAMI, HELP
- The MULTI, EXEC, DISCARD commands are always allowed, but ACLs are enforced on MULTI subcommands.
- External users are not currently supported for database authentication.
- Multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.
{{</note>}}
