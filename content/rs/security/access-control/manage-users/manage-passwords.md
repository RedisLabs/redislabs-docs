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

To enforce a more advanced password policy, we recommend using LDAP integration with an external identity provider, such as Active Directory.

## Enable the password complexity profile

Redis Enterprise Software provides an optional password complexity profile
that meets most organizational needs. When enabled, this password profile requires the following:

- At least 8 characters
- At least one uppercase character
- At least one lowercase character
- At least one number (not first or last character)
- At least one special character (not first or last character)

In addition, the password:

- Cannot contain the user ID or reverse of the user ID.
- Cannot have more than three repeating characters.

{{< note >}}
The password complexity profile applies when a new user is added or an existing user changes their password. This profile does not apply to users authenticated through an external identity provider.
{{< /note >}}

To enable the password complexity profile, use [`PUT /v1/cluster`]({{< relref "/rs/references/rest-api/requests/cluster#put-cluster" >}}):

```sh
PUT https://[host][:port]/v1/cluster
    '{"password_complexity":true}'
```

To turn off the password complexity requirement, run the same command but set `"password_complexity"` to `false`.

## Enable password expiration

To enforce an expiration of a user's password after a specified number of days, use the following REST API request:

```sh
PUT https://[host][:port]/v1/cluster
    '{"password_expiration_duration":<number_of_days>}'
```

To turn off password expiration, set the number of days to `0`.

## User password rotation

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
After the old password is replaced in the database connections,
just delete the old password to finish the password rotation process.

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
