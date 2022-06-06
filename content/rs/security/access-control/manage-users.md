---
Title: Manage users
linkTitle: Manage users
description: Manage users and assign access control roles.
weight: 20
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: ["/rs/administering/access-control/password-rotation/",
    "/rs/administering/designing-production/security/login-lockout",
    "/rs/security/admin-console-security/user-security/"]
---

## Add users

To add a user to the cluster:

1. Go to the access control tab
1. Select ![Add](/images/rs/icon_add.png#no-click "Add")
1. Enter the name, email and password of the new user and select the role to assign to the user.
1. Select the internal user type
1. For email alerts, select "Edit" and then choose the alerts that the user should receive. You can select:

    - Receive alerts for databases - The alerts that are enabled for the selected databases will be sent to the user. You can either select "All databases", or you can select "Customize" and select the individual databases to send alerts for.
        - Receive cluster alerts - The alerts that are enabled for the cluster in **settings** > **alerts** are sent to the user.

1. Select the save icon.
{{< video "/images/rs/new-user-add.mp4" "Create a new user" >}}

## Deactivate default user

When you provision a database, default user will be enabled. This allows for backwards compatibility with versions of Redis before Redis 6.

To deactivate the default user:

1. Select the configuration tab.
1. Find the Default database access setting.
1. Deselect the checkbox.

{{<note>}}
We recommend that you deactivate the default user when using ACLs with your database and backwards compatibility is not required.
{{</note>}}

![default](/images/rs/default-user.png#no-click "default")

## User account security

Redis Enterprise supports the following user account security settings:

1. Password complexity
1. Password expiration
1. User Lockouts
1. Account inactivity timeout

To enforce a more advanced password policy, we recommend using LDAP integration with an external identity provider, such as Active Directory.

### Enable the password complexity profile

Redis Enterprise Software provides an optional password complexity profile
that meets most organizational needs. When enabled, this password profile requires the following:

- At least 8 characters
- At least one uppercase character
- At least one lowercase character
- At least one number (not first or last character)
- At least one special character (not first or last character)

In addition, the password:

- Cannot contain the user ID or reverse of the user ID
- Cannot have more than three repeating characters

{{< note >}}
The password complexity profile applies when a new user is added or an existing user changes their password. This profile does not apply to users authenticated through an external identity provider.
{{< /note >}}

To enable the password complexity profile, run the following `curl` command against the REST API:

```sh
curl -k -X PUT -v -H "cache-control: no-cache" 
                  -H "content-type: application/json" 
                  -u "<administrator-user-email>:<password>" 
                  -d '{"password_complexity":true}' 
                  https://<RS_server_address>:9443/v1/cluster
```

To turn off the password complexity requirement, run the same command but set `"password_complexity"` to `false`.

### Enable password expiration

To enforce an expiration of a user's password after a specified number of days, run the following command:

```sh
curl -k -X PUT -v -H "cache-control: no-cache" 
                  -H "content-type: application/json" 
                  -u "<administrator_user>:<password>" 
                  -d '{"password_expiration_duration":<number_of_days>}' 
                  https://<RS_server_address>:9443/v1/cluster
```

To turn off password expiration, set the number of days to `0`.

## User password rotation

Redis Enterprise Software lets you implement password rotation policies using its API.

You can add a new password for a database user without immediately invalidating the old one (which might cause authentication errors in production).

{{< note >}}
Password rotation does not work for the default user. [Add additional users]({{<relref "/rs/security/access-control/manage-users#add-users">}}) to enable password rotation.
{{< /note >}}

For user access to the Redis Enterprise Software admin console,
you can set a [password expiration policy]({{<relref "/rs/security/access-control/manage-users#enable-password-expiration">}}) to prompt the user to change their password.
However, for database connections that rely on password authentication,
you need to allow for authentication with the existing password while you roll out the new password to your systems.

With the Redis Enterprise Software REST API, you can add additional passwords to a user account for authentication to the database or the admin console and API.
After the old password is replaced in the database connections,
just delete the old password to finish the password rotation process.

{{< warning >}}
Multiple passwords are only supported using the REST API.
If you reset the password for a user in the admin console,
the new password replaces all other passwords for that user.
{{< /warning >}}

The new password cannot already exist as a password for the user and must meet the [password complexity]({{<relref "/rs/security/access-control/manage-users#enable-the-password-complexity-profile">}}) requirements, if enabled.

### Rotate password

To rotate the password of a user account:

1. Add an additional password to a user account with this POST command:

    ```sh
    curl -k -v -X POST -H "content-type: application/json" -u "<administrator_user>:<password>" -d '{"username":"<username>", "old_password":"<an_existing_password>", "new_password":"<a_new_password>"}' https://<RS_server_address>:9443/v1/users/password
    ```

    After you run this command, you can authenticate with both the old and the new password.

1. Update the password in all database connections that connect with the user account.
1. Delete the original password with this DELETE command:

```sh
curl -k -v -X DELETE -H "content-type: application/json" -u "<administrator_user>:<password>" -d '{"username":"<username>", "old_password":"<an_existing_password>"}' https://<RS_server_address>:9443/v1/users/password
```

If there is only one valid password for a user account, you cannot delete that password.

### Replace all passwords

You can also replace all existing passwords for a user account with a single password that is not an existing password.
This can be helpful if you suspect that your passwords are compromised and you want to quickly resecure the account.

To replace all existing passwords for a user account with a single new password, use this PUT command:

```sh
curl -k -v -X PUT -H "content-type: application/json" -u "<administrator_user>:<password>" -d '{"username":"<username>", "old_password":"<an_existing_password>", "new_password":"<a_new_password>"}' https://<RS_server_address>:9443/v1/users/password
```

All of the existing passwords are deleted and only the new password is valid.

{{<note>}}
If you run the above command without `-X PUT`, the new password is added to the list of existing passwords.
{{</note>}}

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

### Change the login lockout threshold

You can set the login lockout threshold with the command:

```sh
rladmin tune cluster login_lockout_threshold <login_lockout_threshold>
```

For example, to set the lockout threshold to 10 failed login attempts.

```sh
rladmin tune cluster login_lockout_threshold 10
```

Setting the lockout threshold to 0 turns off account lockout. In this case, the cluster settings show: `login_lockout_threshold: disabled`.

### Change the login lockout counter

You can set the login lockout reset counter in seconds with the command:

```sh
rladmin tune cluster login_lockout_counter_reset_after <login_lockout_counter_reset_after>
```

To set the lockout reset to 1 hour, run:

```sh
rladmin tune cluster login_lockout_counter_reset_after 3600
```

### Change the login lockout duration

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

### Session timeout

The Redis Enterprise admin console supports session timeouts. By default, users are automatically logged out after 15 minutes of inactivity.

To customize the session timeout you can run the following command:

```sh
rladmin cluster config cm_session_timeout_minutes <number_of_min>
```

Here, number_of_min is the number of minutes after which sessions will time out.