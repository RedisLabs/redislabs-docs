---
Title: Configure permissions with Redis ACLs
LinkTitle: Configure ACLs
description: 
weight: $weight
alwaysopen: false
toc: "true"
headerRange: [1-3]
categories: []
aliases: 
---

To configure a Redis ACL that you can assign to a data access role:

1. Go to **Data Access Control > ACLs** and either:

    - Create a new Redis ACL:

        {{<image filename="images/rc/icon-rbac-add.png" width="40px" alt="Select the Add button to create a new Redis ACL." >}}{{< /image >}}

    - Point to an existing ACL and select **Edit**:

        {{<image filename="images/rc/icon-rbac-edit.png" width="40px" alt="Select the Edit button to edit an existing ACL." >}}{{< /image >}}

1. Provide a descriptive name for the Redis ACL.

1. Enter [ACL syntax](https://redis.io/docs/management/security/acl/#acl-rules) to define the ACL rule or select **Rule Builder** for help building the ACL rule with correct syntax.

1. To create a Redis ACL rule with the **Rule Builder**:

    1. For **Redis commands / categories**, enter a [command](https://redis.io/commands/) or [command category](https://redis.io/docs/management/security/acl/#command-categories).

    1. Select whether to include or exclude the command or category.

    1. For **Keys**, enter the [pattern for permitted keys](https://redis.io/docs/management/security/acl/#key-permissions).

    1. In **Pub/Sub channels**, enter a channel pattern to restrict [pub/sub](https://redis.io/docs/manual/pubsub/) so it only allows access to the specified channels.
    
        The rule builder automatically adds `resetchannels` to the ACL rule when you save. This rule changes pub/sub access from permissive (allows access to all channels) to restrictive (blocks access to all channels).

        {{<note>}}
- **Pub/Sub channels** are only available in the **Rule Builder** for accounts that have Redis version 6.2 or later for all subscriptions.
- If your account contains any Redis 6.0 subscriptions, you can't use pub/sub ACLs unless you contact support to upgrade the subscriptions to a later version.
        {{</note>}}

    1. To add more commands, categories, keys, or pub/sub channels to the ACL rule, select **Add**:

        {{<image filename="images/rc/button-data-access-control-redis-acls-rule-builder-add.png"  alt="Use the Add button to add more commands, categories, or keys to the ACL rule." >}}{{< /image >}}

    1. When you finish building the ACL rule, select **Save rule**:

        {{<image filename="images/rc/button-data-access-control-redis-acls-rule-builder-save-rule.png" width="120px" alt="The Save rule button saves your ACL rule changes." >}}{{< /image >}}

1. Select the check mark to save your changes:

    {{<image filename="images/rc/icon-check-mark.png" width="40px" alt="Select the Submit entry button to save your Redis ACL changes." >}}{{< /image >}}