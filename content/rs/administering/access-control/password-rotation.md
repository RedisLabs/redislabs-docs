---
Title: Database Password Rotation
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Most organizational security policies require periodic password rotation.
Redis Enterprise Software lets you implement these policies using its API.
Specifically, you can add a new password for a database user without immediately invalidating the old one (which might cause authentication errors in production).

For user access to the RS Admin Console,
you can set a [password expiration policy]({{< relref "/rs/administering/access-control/_index.md#setting-local-user-password-expiration" >}}) that prompts the user to change their password.
However, for database connections that rely on password authentication,
you need to allow for authentication with the existing password while you roll out the new password to your systems.

With the RS REST API, you can add additional passwords to an user account for authentication to the database or the Admin Console and API.
After the old password is replaced in the database connections,
just delete the old password to finish the password rotation process.

{{< warning >}}
Multiple passwords are only supported using the REST API.
If you reset the password for a user in the RS Admin Console,
the new password replaces all other passwords for that user.
{{< /warning >}}

The new password cannot already exist as a password for the user and must meet the [password complexity]({{< relref "/rs/administering/access-control/_index.md#setting-up-local-password-complexity" >}}) requirements, if enabled.

## Rotating the password of a user account

To rotate the password of a user account:

1. Add an additional password to an user account with this POST command:

    ```sh
    curl -k -v -X POST -H "content-type: application/json" -u "<administrator_user>:<password>"
        https://<RS_server_address>:9443/v1/users/password
        -d '{
        "username":"<username>",
        "old_password":"<an_existing_password>",
        "new_password":"<a_new_password>"
        }'
    ```

    After you run this command, you can authenticate with both the old and the new password.

1. Update the password in all database connections that connect with the user account.
1. Delete the original password with this DELETE command:

```sh
curl -k -v -X DELETE -H "content-type: application/json" -u "<administrator_user>:<password>"
    https://<RS_server_address>:9443/v1/users/password
    -d '{
    "username":"<username>",
    "old_password":"<an_existing_password>"
    }'
```

If there is only one valid password for a user account, you cannot delete that password.

## Replacing all existing passwords with a single password

You can also replace all existing passwords for a user account with a single password that is not an existing password.
This can be helpful if you suspect that your passwords are compromised and you want to quickly resecure the account.

To replace all existing passwords for a user account with a single new password, use this PUT command:

```sh
curl -k -v -X PUT -H "content-type: application/json" -u "<administrator_user>:<password>"
    https://<RS_server_address>:9443/v1/users/password
    -d '{
    "username":"<username>",
    "old_password":"<an_existing_password>",
    "new_password":"<a_new_password>"
    }'
```

All of the existing passwords are deleted and only the new password is valid.

{{< note >}}
If you run the above command without '-X PUT', the new password is added to the list of existing passwords.
{{< /note >}}