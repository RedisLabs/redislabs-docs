---
Title: Database Password Rotation
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To maintain secure access to your Redis Enterprise Software (RS) cluster and databases,
most organizational security policies require that you rotate user passwords on a regular basis.

For user access to the RS web UI,
you can set a [password expiration policy]({{< relref "/rs/administering/access-control/#setting-local-user-password-expiration" >}}) that prompts the user to change their password.
However, for database connections that rely on password authentication,
you need to allow for authentication with the existing password while you rollout the new password to your systems.

With the RS REST API, you can add additional passwords to an RS user account for authentication to the database or the Admin Console and API.
After the old password is replaced in the database connections,
just delete the old password to finish the password rotation process.

{{ warning }}
If you reset the password for a user in the RS Admin Console,
that password replaces all other passwords for the user.
{{ /warning }}

## Adding an additional password to an RS user account

You can add an additional password to a user account as long as:

- The new password does not already exist as a password for the user
- If [password complexity]({{< relref "/rs/administering/access-control/#setting-up-local-password-complexity" >}}) is required, the new password meets the complexity requirements

To add an additional password to an RS user account, run this POST command:

```sh
curl -k -v -H "content-type: application/json" -u "<administrator_user>:<password>"
    https://<RS_server_address>:9443/v1/cluster
    -d '{
    "username": "<username>"
    "old_password": "<existing_password>",
    "new_password": "<new_password>",
    }'
```

After you run this command, you can authenticate with both the old and the new password.

## Deleting an existing password

After you rotate the passwords for all database connections that connect with a user, you can delete an existing password with the command:

```sh
curl -k -v -X DELETE -H "content-type: application/json" -u "<administrator_user>:<password>"
    https://<RS_server_address>:9443/v1/cluster
    -d '{
    "username": "<username>",
    "old_password": "<existing_password>"
    }'
```

If there is only one valid password for a user account, you cannot delete that password.

## Replacing all existing passwords with a single password

You can also replace all existing passwords for a user account with a single new password.
This can be helpful if you suspect that your passwords are compromised and you want to quickly resecure the account.

You can replace the passwords for a user account as long as:

- The new password does not already exist as a password for the user
- If [password complexity]({{< relref "/rs/administering/access-control/#setting-up-local-password-complexity" >}}) is required, the new password meets the complexity requirements

To replace all existing passwords for a user account with a single new password, run:

```sh
curl -k -v -X PUT -H "content-type: application/json" -u "<administrator_user>:<password>"
    https://<RS_server_address>:9443/v1/cluster
    -d '{
    "username": "<username>"
    "old_password": "<existing_password>",
    "new_password": "<new_password>",
    }'
```
