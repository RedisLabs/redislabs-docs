---
Title: Manage passwords
linkTitle: Manage passwords
description: Manage user passwords.
weight: 30
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: ["/rs/administering/access-control/password-rotation/"]
---

Redis Enterprise Software provides several ways to manage the passwords of local accounts, including:

- [Password complexity rules](#password-complexity-rules)

- [Password expiration](#password-expiration)

- [Password rotation policies](#password-rotation-policies)

You can also manage a user's ability [to sign in]({{<relref "rs/security/access-control/manage-users/login-lockout#user-login-lockout">}}) and control [session timeout]({{<relref "rs/security/access-control/manage-users/login-lockout#session-timeout">}}).

To enforce more advanced password policies, we recommend using LDAP integration with an external identity provider, such as Active Directory.

## Password complexity rules

Redis Enterprise Software provides optional password complexity rules that meet common requirements.  When enabled, these rules require the password to have:

- At least 8 characters
- At least one uppercase character
- At least one lowercase character
- At least one number
- At least one special character 

These requirements reflect v6.2.12 and later. Earlier versions did not support numbers or special characters as the first or the last character of a password. This restriction was removed in v6.2.12.

In addition, the password:

- Cannot contain the user ID or reverse of the user ID.
- Cannot have more than three repeating characters.

Password complexity rules apply complexity rules are applied when a new user account is created and when the password is changed.  Password complexity rules are not applied to accounts authenticated by an external identity provider.  

You can use the admin console or the REST API to enable password complexity rules.

### Enable using the admin console

To enable password complexity rules using the admin console:

1. Sign in to the Redis Enterprise Software admin console using an administrator account

1. From the main menu, select **Settings** | **Preferences**

    {{<image filename="images/rs/cluster-settings-preferences.png" alt="Preference settings in the Redis Software admin console." width="75%">}}{{< /image >}}

1. Place a checkmark next to **Enable password complexity rules**

1. Save your changes

### Enable using the REST API

To use the REST API to enable password complexity rules:

``` REST
PUT https://[host][:port]/v1/cluster
{"password_complexity":true}
```

### Deactivate password complexity rules

To deactivate password complexity rules:

- Remove the checkmark from the **Enable password complexity rules** setting in the admin console

- Use the `cluster` REST API endpoint to set `password_complexity` to `false`

## Password expiration

To enforce an expiration of a user's password after a specified number of days:

1. Use the admin console to place a checkmark next to the **Enable password expiration** preference setting

1. Use the `cluster` endpoint of the REST API

    ``` REST
    PUT https://[host][:port]/v1/cluster
    {"password_expiration_duration":<number_of_days>}
    ```

To deactivate password expiration:

- Remove the checkmark next to the to the **Enable password expiration** preference setting.

    For help locating the setting, see [Password complexity rules](#password-complexity-rules).

- Use the `cluster` REST API endpoint to set `password_expiration_duration` to `0` (zero).

## Password rotation policies

Redis Enterprise Software lets you implement password rotation policies using its [REST API]({{<relref "/rs/references/rest-api">}}).

You can add a new password for a database user without immediately invalidating the old one (which might cause authentication errors in production).

{{< note >}}
Password rotation does not work for the default user. [Add additional users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) to enable password rotation.
{{< /note >}}

For user access to the Redis Enterprise Software admin console,
you can set a [password expiration policy](#enable-password-expiration) to prompt the user to change their password.

However, for database connections that rely on password authentication,
you need to allow for authentication with the existing password while you roll out the new password to your systems.

With the Redis Enterprise Software REST API, you can add additional passwords to a user account for authentication to the database or the admin console and API.

Once the old password is replaced in the database connections, you can delete the old password to finish the password rotation process.

{{< warning >}}
Multiple passwords are only supported using the REST API.
If you reset the password for a user in the admin console,
the new password replaces all other passwords for that user.
{{< /warning >}}

The new password cannot already exist as a password for the user and must meet the [password complexity](#enable-the-password-complexity-profile) requirements, if enabled.

### Rotate password

To rotate the password of a user account:

1. Add an additional password to a user account with [`POST /v1/users/password`]({{< relref "/rs/references/rest-api/requests/users/password#add-password" >}}):

    ```sh
    POST https://[host][:port]/v1/users/password
         '{"username":"<username>", "old_password":"<an_existing_password>", "new_password":"<a_new_password>"}'
    ```

    After you send this request, you can authenticate with both the old and the new password.

1. Update the password in all database connections that connect with the user account.
1. Delete the original password with [`DELETE /v1/users/password`]({{< relref "/rs/references/rest-api/requests/users/password#update-password" >}}):

    ```sh
    DELETE https://[host][:port]/v1/users/password
           '{"username":"<username>", "old_password":"<an_existing_password>"}'
    ```

    If there is only one valid password for a user account, you cannot delete that password.

### Replace all passwords

You can also replace all existing passwords for a user account with a single password that does not match any existing passwords.
This can be helpful if you suspect that your passwords are compromised and you want to quickly resecure the account.

To replace all existing passwords for a user account with a single new password, use [`PUT /v1/users/password`]({{< relref "/rs/references/rest-api/requests/users/password#delete-password" >}}):

```sh
PUT https://[host][:port]/v1/users/password
    '{"username":"<username>", "old_password":"<an_existing_password>", "new_password":"<a_new_password>"}'
```

All of the existing passwords are deleted and only the new password is valid.

{{<note>}}
If you send the above request without specifying it is a `PUT` request, the new password is added to the list of existing passwords.
{{</note>}}
