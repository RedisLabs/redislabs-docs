---
Title: User Login Lockout for Security Compliance
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/rate-limiting/
---
To help reduce the risk of a brute force attacks on Redis Enterprise Software (RS),
RS includes user login restrictions.
You can customize the restrictions to align with the security policy of your organization.
Every failed login is shown in the logs.

{{< note >}}
Customers, such as large organizations, that use LDAP to manage external authentication
must set these restrictions in the LDAP service.
{{< /note >}}

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

## Customizing the User Lockout Parameters

You can customize the user lockout parameters with from rladmin.

### Changing the Login Lockout Threshold

You can set the login lockout threshold with the command:

```sh
rladmin tune cluster login_lockout_threshold <login_lockout_threshold>
```

If you set the lockout threshold to `0`,
the account is not locked out after failed login attempts, and the cluster settings show: `login_lockout_threshold: disabled`

For example, to set the lockout threshold to 10 failed login attempts.

```sh
rladmin tune cluster login_lockout_threshold 10
```

### Changing the Login Lockout Counter Reset

You can set the login lockout reset in seconds with the command:

```sh
rladmin tune cluster login_lockout_counter_reset_after <login_lockout_counter_reset_after>
```

For example, to set the lockout reset to 1 hour:

```sh
rladmin tune cluster login_lockout_counter_reset_after 3600
```

### Changing the Login Lockout Duration

You can set the login lockout duration in seconds with the command:

```sh
rladmin tune cluster login_lockout_duration <login_lockout_duration>
```

If you set the lockout duration to `0`,
the account must be manually unlocked by an administrator, and the cluster settings show: `login_lockout_duration: admin-release`

For example, to set the lockout duration to 1 hour:

```sh
rladmin tune cluster login_lockout_duration 3600
```

## Unlocking locked user accounts

Before the lockout duration ends,
an administrator can change the user password in order to manually unlock the user account.

{{< embed-md "reset-password.md" >}}
