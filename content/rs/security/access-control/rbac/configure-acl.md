---
Title: Configure ACLs
linkTitle: Configure ACLs
description: Configure access control lists (ACLs).
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/security/access-control/configure-acl/"]
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
- Allow access to [pub/sub channels](https://redis.io/docs/manual/pubsub/) with the "&" prefix (only supported for databases with Redis version 6.2 and later).

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

## Change default pub/sub permissions

Pub/sub ACL rules determine which [pub/sub channels](https://redis.io/docs/manual/pubsub/) a user can access.

As of Redis Enterprise version 6.4.2, you can configure `acl_pubsub_default`, which determines the default pub/sub permissions for all databases in the cluster. You can set `acl_pubsub_default` to the following values:

- `resetchannels` is restrictive and blocks access to all channels by default.

- `allchannels` is permissive and allows access to all channels by default. 

Redis Enterprise version 6.4.2 defaults to permissive pub/sub channels for backward compatibility. We recommend you change your cluster's default pub/sub ACLs to be restrictive.

To make default pub/sub permissions restrictive:

1. [Upgrade all databases]({{<relref "/rs/installing-upgrading/upgrading#upgrade-a-database">}}) in the cluster to Redis version 6.2 or later.

1. Set the default to `resetchannels` with [`rladmin`]({{<relref "/rs/references/cli-utilities/rladmin">}}) or the [REST API]({{<relref "/rs/references/rest-api">}}).

    - Method 1 - [`rladmin tune cluster`]({{<relref "/rs/references/cli-utilities/rladmin/tune#tune-cluster">}}):

        ```sh
        rladmin tune cluster acl_pubsub_default resetchannels
        ```

    - Method 2 - [Update cluster policy]({{<relref "/rs/references/rest-api/requests/cluster/policy#put-cluster-policy">}}) REST API request:

        ```sh
        PUT /v1/cluster/policy
        { "acl_pubsub_default": "resetchannels" }
        ```

## ACL command support

Redis Enterprise Software does not support certain open source Redis ACL commands. Instead, you can manage access controls from the admin console.

{{<embed-md "acl-command-compatibility.md">}}

{{<note>}}
The `MULTI`, `EXEC`, `DISCARD` commands are always allowed, but ACLs are enforced on `MULTI` subcommands.
{{</note>}}

## Next steps

- [Create or edit a role]({{<relref "/rs/security/access-control/rbac/create-roles">}}) and add Redis ACLs to it.
