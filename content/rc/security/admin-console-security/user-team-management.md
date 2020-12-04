---
Title: User management
description:
weight: 10
alwaysopen: false
categories: ["RC"]
---
Redis Enterprise Cloud lets you create user accounts for your team members. You can manage these user account and their roles using the admin console.

{{< note >}}
Admin console users are distinct from database users. To manage your Redis database users, see [Database role-based access control]({{<relref "/rc/security/database-security/passwords-users-roles.md">}}).
{{< /note >}}

## Managing users

To see the list of users who have access to your account:

1. Log in to your account as an account owner.
1. From the menu, go to **Settings**.
1. Select the **Team** tab.

From here, you can:

* [Add a new user](#add)
* [Edit an existing user](#edit)
* [Delete a user](#delete)

### Adding a new user {#add}

To add a new user:

1. Click the *add new user* button: ![Add](/images/rc/icon_add.png#no-click "Add").
1. Enter the user's **name**, **email address**, and **[role](#roles)**.
1. Select the types of email alerts the user should receive (**alert**, **billing**, and **operational**).
1. Click *save*: ![Save](/images/rc/icon_save.png#no-click "Add").

The new user will then receive an email prompting them to create an account.

### Editing a user's settings {#edit}

You can edit a user's name and email alert settings. To edit a user:

1. Select the user whose info you want to edit and click *edit*: ![Edit](/images/rc/icon_edit.png#no-click "Add").
1. Make your desired changes and then click *save*: ![Save](/images/rc/icon_save.png#no-click "Add").

### Deleting a user {#delete}

1. Select the user you want to delete and click *edit*: ![Edit](/images/rc/icon_edit.png#no-click "Add").
1. Click *delete*: ![Delete](/images/rc/icon_delete.png#no-click "Delete").

## User roles {#roles}

The admin console supports the following user roles:

- **Owner**: Full access to the account. Can create, update, and delete subscriptions, databases, and users.
- **Member**: Can view and edit existing databases only. No access to subscriptions or users.
- **Viewer**: Can view databases and their configurations (including database secrets). No access to subscriptions or users.

## User and team management for GCP Marketplace customers {#gcp-users}

If you subscribe to [Redis Enterprise Cloud on the GCP Marketplace](https://console.cloud.google.com/marketplace/product/endpoints/gcp.redisenterprise.com), you can manage your team from the [IAM settings](https://cloud.google.com/iam/docs) in the GCP console.

To provide a GCP user with access to the admin console, you will need to assign the following GCP-specific roles:

- For the **viewer** role: `serviceusage.serviceUsageViewer` and `redisenterprisecloud.viewer`
- For the **owner** role:  `serviceusage.serviceUsageViewer` and `redisenterprisecloud.admin`

Users must log in Redis Cloud using GCP SSO at least once for them to be added to the team.
