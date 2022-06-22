---
Title: Manage user login
linkTitle: Manage user login
description: Manage user login lockout and session timeout.
weight: 40
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: ["/rs/administering/designing-production/security/login-lockout"]
---

## User login lockout

The parameters for the user login lockout are:

- **Login Lockout Threshold** - The number of failed login attempts allowed before the user account is locked. (Default: 5 minutes)
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

For example, to set the lockout threshold to 10 failed login attempts, run:

```sh
rladmin tune cluster login_lockout_threshold 10
```

If you set the lockout threshold to 0, it turns off account lockout. In this case, the cluster settings show `login_lockout_threshold: disabled`.

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

For example, to set the lockout duration to 1 hour, run:

```sh
rladmin tune cluster login_lockout_duration 3600
```

If you set the lockout duration to 0, then the account can be unlocked only when an administrator changes the account's password. In this case, the cluster settings show `login_lockout_duration: admin-release`.

### Unlock locked user accounts

To unlock a user account or reset a user password with `rladmin`, run:

```sh
rladmin cluster reset_password <user email>
```

To unlock a user account or reset a user password with the REST API, use [`PUT /v1/users`]({{< relref "/rs/references/rest-api/requests/users#put-user" >}}):

```sh
PUT https://[host][:port]/v1/users
    '{"password": "<new_password>"}'
```

## Session timeout

The Redis Enterprise admin console supports session timeouts. By default, users are automatically logged out after 15 minutes of inactivity.

To customize the session timeout, run:

```sh
rladmin cluster config cm_session_timeout_minutes <number_of_min>
```

The `number_of_min` is the number of minutes after which sessions will time out.
