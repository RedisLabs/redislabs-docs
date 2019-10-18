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
Then, create a user with the user type **external**.

{{% comment %}}
You can also create an external with the REST API with this syntax:

```src
curl -k -L -v -u ":" --location-trusted -H "Content-Type: application/json" -X POST https://<RS_server_address>:9443/v1/users -d "{"auth_method": "external", "name": "<username>", "role": "<user_role>"}"
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

    {{% expand "How do I select email alerts?" %}}{{< video "/images/rs/add-user-email-alerts.mp4" "Select email alerts" >}}{{% /expand %}}

    Then, click **Save**.
1. Click ![Save](/images/rv/icon_save.png#no-click "Save").

To edit the name, password, role or email alerts of a user, hover over the user and click ![Edit]
(/images/rv/icon_edit.png#no-click "Edit"). To change a user from internal to external, you must
delete the user and re-add it.

## Setting Local Password Policies

Many of our users require a password policy to meet their contractual & compliance obligations as well as to meet their organizational policies. Redis Labs reccomends that LDAP be used to query users in an external identity provider, such as Active Directory to meet the granular password complexity and compliance needs of your organization. Instructions on how to setup LDAP to your external identity provider may be found in our documentation for [LDAP integration]({{< relref "/rs/administering/designing-production/security/ldap-integration.md" >}}).

### Setting up local password complexity

Redis Enterprise Software comes with a build in password complexity enforcement profile that will meet most organizational needs. This profile enforces the below password complexity requirements for all new users. 

#### Password Complexity Rules:

- At least 8 characters
- At least one uppercase character
- At least one lowercase character
- At least one number (not first or last character)
- At least one special character (not first or last character)
- Does not contain the User ID or reverse of the User ID
- No more than 3 repeating characters

Note: This password complexity profile will only apply to new users. Users who have been previously added will have to change their password for this profile to take effect.

To enable this password complexity profile, run the below command:

```src
curl -k -X PUT -v -H "cache-control: no-cache" -H "content-type: application/json" -u "<administrator-user-email>:<password>" -d '{"password_complexity":true}' https://<RS_server_address>:9443/v1/cluster
```

### Setting Local User Password Expiration

Password expiration is also a frequent requirement to meet the complaince and contractual obligations of our users organizations. To force an expiration of a local users password you can run the below command where <number_of_days> may be subtituted for your organizational requirements. To disable this requirement, set <number_of_days> to 0.

```src
curl -k -X PUT -v -H "cache-control: no-cache" -H "content-type: application/json" -u "<administrator_user>:<password>" -d '{"password_expiration_duration":<number_of_days>}' https://<RS_server_address>:9443/v1/cluster
```

