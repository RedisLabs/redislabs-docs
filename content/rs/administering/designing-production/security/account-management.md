---
Title: Account Management
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/account-management/
---
To give each team member only the permissions that they need for their work with the cluster,
RS lets you assign a role to each team member.
You can manage team members and roles in **settings** > **team**, or with the REST API.

The roles and permissions available in RS are:

{{< embed-html "account-role-table.html" >}}

## Adding a user

To add a user to the cluster:

1. Go to: **settings** > **team**
1. Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Enter the name, email and password of the new user and select the role to assign to the user.
1. Select the type of user:
    - internal - Authenticates with RS
    - external - Authenticates with an external LDAP server

    {{% expand "How do I create an external user?" %}}
To have a user authenticate with LDAP, you must have [LDAP integration
enabled]({{< relref "/rs/administering/designing-production/security/ldap-integration.md" >}}).
Then, create a new **external** user in the web UI.

{{% comment %}}
You can also create an external with the REST API with this syntax:

```src
curl -k -L -v -u ":" --location-trusted -H "Content-Type: application/json" -X POST http://<RS_server_address>:8080/v1/users -d "{"auth_method": "external", "name": "<username>", "role": "<user_role>"}"
```

For the user role, enter either:

- `db_viewer` - DB viewer
- `db_member` - DB member
- `cluster_viewer` - Cluster viewer
- `cluster_member` - Cluster member
- `admin` - Admin
{{% /comment %}}
    {{% /expand %}}

1. For the email alerts, click **Edit** and select the alerts that the user receives.
    You can select:
    - Receive alerts for databases - The alerts that are enabled for the selected databases are sent to
      the user. You can either select all databases, or you can select **Customize** and select the
      individual databases to send alerts for.
      All databases includes existing and future databases.
    - Receive cluster alerts - The alerts that are enabled for the cluster in **settings** > **alerts** are sent to the user.

    {{% expand "How do I select email alerts?" %}}![Select email alerts](/images/rs/add-user-email-alerts.gif "Select email alerts"){{% /expand %}}

    Then, click **Save**.
1. Click ![Save](/images/rv/icon_save.png#no-click "Save").

To edit the name, password, role or email alerts of a user, hover over the user and click ![Edit]
(/images/rv/icon_edit.png#no-click "Edit"). To change a user from internal to external, you must
delete the user and re-add it.
