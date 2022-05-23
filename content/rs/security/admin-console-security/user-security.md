---
Title: Authentication and authorization
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/administering/designing-production/security/login-lockout"]
---
You can configure users and roles for the admin console. This section details how you can set users and roles, configure external identity providers for authentication, and set up user account security within Redis Enterprise Software.<!--more-->

## Role-based access control

Redis Enterprise Software includes five pre-built roles to help users who need limited access to the admin console.

1. **DB Viewer** - Read any settings for databases
1. **DB Member** - Administer databases
1. **Cluster Viewer** - Read any cluster settings
1. **Cluster Member** - Administrator the cluster
1. **Admin** - Full cluster access

The following table elaborates on the privileges for each of these roles:

{{< embed-html "account-role-table.html" >}}

### Configure users with roles

To add a user to the cluster:

1. Go to the access control tab
1. Select ![Add](/images/rs/icon_add.png#no-click "Add")
1. Enter the name, email, and password of the new user and select the role to assign to the user
1. Select the internal user type
1. For email alerts, select "Edit" and then choose the alerts that the user should receive. You can select:

    - Receive alerts for databases - The alerts that are enabled for the selected databases will be sent to the user. You can either select "All databases", or you can select "Customize" and select the individual databases to send alerts for.
        - Receive cluster alerts - The alerts that are enabled for the cluster in **settings** > **alerts** are sent to the user.

1. Select the save icon
{{< video "/images/rs/new-user-add.mp4" "Create a new user" >}}

## User account security

Redis Enterprise supports the following user account security settings:

1. Password complexity rules
1. Password expiration
1. User Lockouts
1. Account inactivity timeout

To enforce a more advanced password policy, we recommend using LDAP integration with an external identity provider, such as Active Directory.

### Password complexity rules

Redis Enterprise Software provides optional password complexity rules that meet common requirements.  When enabled, these rules require passwords to have:

- At least 8 characters
- At least one uppercase character
- At least one lowercase character
- At least one number
- At least one special character

These requirements reflect v6.2.12 and later.  Earlier versions did not support numbers or special characters as the first or the last character of a password.  This restriction was removed in v6.2.12.

In addition, the password:

- Cannot contain the user ID or reverse of the user ID
- Cannot have more than three repeating characters

The password complexity rules apply when a new user is added or an existing user changes their password. These rules do not apply to users who authenticate through an external identity provider.

You can use the admin console or the REST API to enable password complexity rules.

To enable password complexity rules using the admin console:

1. Sign in to the Redis Enterprise Software admin console using an administrator account

1. From the main menu, select **Settings** | **Preferences**

    {{<image filename="images/rs/cluster-settings-preferences.png" alt="TPreferences settings in the Redis Software admin console." width="75%">}}{{< /image >}}

1. Place a checkmark next to **Enable password complexity rules**

1. Save your changes

To use the REST API to enable password complexity rules:

``` REST
PUT https://[host][:port]/v1/cluster
{"password_complexity":true}
```

To deactivate password complexity rules:

- Remove the checkmark from the **Enable password complexity rules** setting in the admin console

- Use the `cluster` REST API endpoint to set `password_complexity` to `false`

### Password expiration

To enforce an expiration of a user's password after a specified number of days:

1. Use the admin console to place a checkmark next to the **Enable password expiration** preference setting

1. Use the `cluster` endpoint of the REST API

    ``` REST
    PUT https://[host][:port]/v1/cluster
    {"password_expiration_duration":<number_of_days>}
    ```

To deactivate password expiration:

- Remove the checkmark next to the to the **Enable password expiration** preference setting

- Use the `cluster` REST API endpoint to set `password_expiration_duration` to `0` (zero).

### Session timeout

By default, admin console sessions automatically sign out after 15 minutes of inactivity.

To change this:

- Use the admin console to update the value of the **Session timeout** preference setting.

- Use `rladmin` to update the value of the `cm_session_timeout_minutes` cluster config setting

     ```sh
    rladmin cluster config cm_session_timeout_minutes <number_of_min>
    ```

    The value of the `<number_of_min>` parameter is an integer specifying the timeout period in minutes.

## User login lockout

The parameters for the user login lockout are:

- **Login Lockout Threshold** - The number of failed login attempts allowed before the user account is locked. (Default: 5)
- **Login Lockout Counter Reset** - The amount of time during which failed login attempts are counted. (Default: 15 minutes)
- **Login Lockout Duration** - The amount of time that the user account is locked after excessive failed login attempts. (Default: 30 minutes)

By default, after 5 failed login attempts within 15 minutes, the user account is locked for 30 minutes.

You can view the user login restrictions for your cluster with:

```sh
rladmin info cluster | grep login_lockout
```

### Change login lockout threshold

You can set the login lockout threshold with the command:

```sh
rladmin tune cluster login_lockout_threshold <login_lockout_threshold>
```

For example, to set the lockout threshold to 10 failed login attempts.

```sh
rladmin tune cluster login_lockout_threshold 10
```

Setting the lockout threshold to 0 disables account lockout. In this case, the cluster settings show: login_lockout_threshold: disabled

### Change login lockout counter

You can set the login lockout reset counter in seconds with the command:

```sh
rladmin tune cluster login_lockout_counter_reset_after <login_lockout_counter_reset_after>
```

To set the lockout reset to 1 hour, run:

```sh
rladmin tune cluster login_lockout_counter_reset_after 3600
```

### Change login lockout duration

You can set the login lockout duration in seconds with the command:

```sh
rladmin tune cluster login_lockout_duration <login_lockout_duration>
```

For example, to set the lockout duration to 1 hour use the command:

```sh
rladmin tune cluster login_lockout_duration 3600
```

If you set the lockout duration to 0, then the account can be unlocked only when an administrator changes the account's password. In this case, the cluster settings show: login_lockout_duration: admin-release

#### Unlock locked user accounts

To unlock a user account or reset a user password from the CLI, run:

```sh
rladmin cluster reset_password <user email>
```

To unlock a user account or reset a user password from the REST API, run:

```sh
curl -k -X PUT -v -H "cache-control: no-cache" 
                  -H "content-type: application/json" 
                  -u "<administrator_user>:<password>" 
                  -d '{"password": "<new_password>"}' 
                  https://<RS_server_address>:9443/v1/users/<uid>
```

## Update Active-Active admin credentials

Active-Active databases use administrator credentials to manage operations for Active-Active database.
To update the administrator user password on a cluster with Active-Active databases:
1. From the user management page, update the administrator user password on the clusters you wish to update.
1. For each participating cluster _and_ each Active-Active database, update the admin user credentials to match the changes in Step 1. 
{{< warning>}}Do not perform any management operation on the databases until these steps are complete. {{< /warning >}}

## LDAP integration

In version 6.0.20, Redis Enterprise Software integrated [Lightweight Directory Access Protocol](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) (LDAP) authentication and authorization into its [role-based access controls]({{<relref "rs/security/passwords-users-roles.md##olebased-access-control">}}) (RBAC).  You can now use LDAP to authorize access to the admin console and to authorize database access.

To learn more, including how to set up LDAP or to migrate an existing LDAP integration to the new mechanism, see [LDAP authentication]({{<relref "rs/security/ldap/">}}).
