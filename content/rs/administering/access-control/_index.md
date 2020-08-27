---
Title: User Management
description:
weight: 40
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/account-management/
---
You can create Redis Enterprise Software (RS) users and assign them to [roles]({{< relref "user-roles.md" >}}) with permissions for:

- **Cluster management** - The areas of the cluster web UI and API that a user can access and edit.
- **Database connections** - Commands and keys that an authenticated user can use in database connections.

You can manage users and roles in **access control** or with the REST API.

## Adding a user

To add a user to the cluster:

1. Go to: **access control**
1. Click ![Add](/images/rs/icon_add.png#no-click "Add").
1. Enter the name, email and password of the new user and select the [role]({{< relref "user-roles.md" >}}) to assign to the user.
1. Select the type of user:
    - internal - Authenticates with RS
    - external - Authenticates with an external LDAP server

    {{% expand "How do I create an external user?" %}}
To have a user authenticate with LDAP, you must have [LDAP integration
enabled]({{< relref "/rs/administering/designing-production/security/ldap-integration.md" >}}).
Then, create a user with the user type **external**.

{{% comment %}}
You can also create an external with the REST API with this syntax:

```sh
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
      All databases include existing and future databases.
    - Receive cluster alerts - The alerts that are enabled for the cluster in **settings** > **alerts** are sent to the user.

    {{% expand "How do I select email alerts?" %}}{{< video "/images/rs/add-user-email-alerts.mp4" "Select email alerts" >}}{{% /expand %}}

    Then, click **Save**.
1. Click ![Save](/images/rs/icon_save.png#no-click "Save").

To edit the name, password, role or email alerts of a user, hover over the user and click ![Edit]
(/images/rs/icon_edit.png#no-click "Edit"). To change a user from internal to external, you must
delete the user and re-add it.

## User account security

To make sure your user accounts are secured and not misused, RS supports enforcement of:

- Password complexity
- Password expiration
- Account lock on failed attempts
- Account inactivity timeout

To enforce a more advanced password policy that meets your contractual and compliance requirements and your organizational policies,
we recommend that you use [LDAP integration]({{< relref "/rs/administering/designing-production/security/ldap-integration.md" >}}) with an external identity provider, such as Active Directory.

### Resetting user passwords

{{< embed-md "reset-password.md" >}}

### Setting up local password complexity

RS lets you enforce a password complexity profile that meets most organizational needs.
The password complexity profile is defined by:

- At least 8 characters
- At least one uppercase character
- At least one lowercase character
- At least one number (not first or last character)
- At least one special character (not first or last character)
- Does not contain the User ID or reverse of the User ID
- No more than 3 repeating characters

{{< note >}}
The password complexity profile applies to when a new user is added or an existing user changes their password.
{{< /note >}}

To enforce the password complexity profile, run:

```sh
curl -k -X PUT -v -H "cache-control: no-cache" -H "content-type: application/json" -u "<administrator-user-email>:<password>" -d '{"password_complexity":true}' https://<RS_server_address>:9443/v1/cluster
```

### Setting local user password expiration

RS lets you enforce password expiration to meet your compliance and contractual requirements.
To enforce an expiration of a local user password after a specified number of days, run:

```sh
curl -k -X PUT -v -H "cache-control: no-cache" -H "content-type: application/json" -u "<administrator_user>:<password>" -d '{"password_expiration_duration":<number_of_days>}' https://<RS_server_address>:9443/v1/cluster
```

To disable password expiration, set the number of days to `0`.

### Account lock on failed attempts

To prevent unauthorized access to RS, you can [enforce account lockout]({{< relref "/rs/administering/designing-production/security/login-lockout.md" >}})
after a specified number of failed login attempts.

### Session timeout

When you log in to the Web UI, your account is automatically logged out after 15 minutes of inactivity.

If you want to change duration of inactivity that causes the timeout:

- From rladmin, run: `rladmin cluster config cm_session_timeout_minutes <minutes>`

- From the REST API, run:

```sh
curl --request PUT \
  --url https://localhost:9443/v1/cluster \
  --header 'content-type: application/json' \
  --data '{
	"cm_session_timeout_minutes": <minutes>
}'
```
