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

Redis ACLs are defined by a [Redis syntax](https://redis.io/docs/manual/security/acl/#acl-rules) where you specify the commands or command categories that are allowed for specific keys.

{{<note>}}
Redis Enterprise modules do not have a command category.
{{</note>}}

Redis Enterprise lets you:

- Include commands and categories with the "+" prefix for commands or "+@" prefix for command categories.
- Exclude commands and categories with the "-" prefix for commands or "-@" prefix for command categories.
- Include keys or key patterns with the "~" prefix.

To define database access control, you can:

- Use the predefined user roles and add Redis ACLs for specific databases.
- Create new user roles and select the management roles and Redis ACLs that apply to the user roles for specific databases.
- Assign roles and Redis ACLs to a database in the access control list section of the database configuration.

The predefined Redis ACLs are:

- **Full Access** - All commands are allowed on all keys.
- **Not Dangerous** - All commands are allowed except those that are administrative, could affect availability, or could affect performance.
- **Read Only** - Only read-only commands are allowed on keys.

## Configure Redis ACLs

To configure a Redis ACL rule that you can assign to a user role:

1. From **access control** > **redis acls**, you can either:

    - Point to a Redis ACL and select ![Edit](/images/rc/icon_edit.png#no-click "Edit") to edit an existing Redis ACL.

    - Select ![Add](/images/rs/icon_add.png#no-click "Add") to create a new Redis ACL.

1. Enter a descriptive name for the Redis ACL. This will be used to reference the ACL rule to the role.

1. Define the ACL rule.

1. Select **Save**.

{{< video "/images/rs/new-redis-acl-rule.mp4" "Create a new Redis ACL Rule" >}}

{{<note>}}
In Redis Enterprise:
- External users are not currently supported for database authentication.
- For multi-key commands on multi-slot keys, the return value is `failure` but the command runs on the keys that are allowed.
{{</note>}}

## Blocked ACL commands

The following ACL commands are blocked in Redis Enterprise: 

- `LOAD` 
- `SAVE` 
- `SETUSER`
- `DELUSER`
- `GENPASS`
- `LOG`

## Allowed ACL subcommands

The following ACL subcommands are allowed in Redis Enterprise: 

- `LIST` 
- `USER`
- `GETUSER`
- `CAT`
- `WHOAMI`
- `HELP`

{{<note>}}
The `MULTI`, `EXEC`, `DISCARD` commands are always allowed, but ACLs are enforced on `MULTI` subcommands.
{{</note>}}

