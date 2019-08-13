---
Title: Authentication Rate Limiting
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/security/rate-limiting/
---

To help reduce the liklihood of a brute force attack on a client Redis Enterprise Software (RS) implements rate limting features to allow customers to align with organziational policies. This allows an organization to set rules around locking out users if they repeatedly fail to login to the control plane of the cluster.

**Note:** Enterprise customers frequently will implement similar features in their enterprise LDAP. For enterprise customers who leverage an LDAP server these features may act as a defense in depth strategy or not be implemented at all as desired.

## Account Lockout Strategies

Account Lockout Strategies help reduce the chance of a brute force attack. They frequently represent a trade off between security against a brute force attack and the opportunity for a denial of service attack.

The following parameters may be configured in RS to implement account lock outs.

- **Lockout Threshold** - Lockout threshold defines how many times a user may fail to login to the application before getting locked out from further sign-in attempts. 
  - Default: 5 failed login attempts
- **Lockout Duration** - Lockout Duration defines how long a user must wait after being locked out before they are allowed to try to sign in to the application again and their lockout is released. If this value is set to zero then an administrator must manually unlock a user each time they are locked out. 
  - Default: 30 minutes
- **Lockout Reset** - Lockout reset defines the amount of time before the lockout threshold counter is reset back to zero.
  - Default: 15 minutes

## How to view current settings

Account lockout specifications can be viewed using Redis Enterprise Software's administrative utility, rladmin. The below command allows you to query the login lockout parameters. If these parameters do not align with organizational policy you may want to change them.

```src
rladmin info cluster | grep login_lockout
```
Where:
- login_lockout_threshold - defines the lockout threshold.
- login_lockout_duration - defines the lockout duration in hours:minutes:seconds where 0:30:00 is 30 minutes.
- login_lockout_counter_reset_after - defines the lockout reset in hours:minutes:seconds where defines the lockout threshold in hours minutes and seconds where 0:15:00 is 15 minutes.

## How to configure account lockout parameters

Account lockout parameters may be set using Redis Enterprise Software's administrative utility, rladmin. Lockout parameters should be set according to your organization's standards.

Lockout Threshold may be set using the below command:

```src
rladmin tune cluster login_lockout_threshold <login_lockout_threshold>
```

Where the below command sets the lockout theshold to 10 failed login attempts.

```src
rladmin tune cluster login_lockout_threshold 10
```
Lockout lockout duration may be set using the below command:

```src
rladmin tune cluster login_lockout_duration <login_lockout_duration>
```
Where the below command sets the lockout duration to 1 hour

```src
rladmin tune cluster login_lockout_threshold 1:00:00
```
Lockout lockout reset may be set using the below command:

```src
rladmin tune cluster login_lockout_counter_reset_after <login_lockout_counter_reset_after>
```

Where the below command sets the lockout reset to 1 hour:

```src
rladmin tune cluster login_lockout_counter_reset_after 1:00:00
```


```src
rladmin tune cluster login_lockout_threshold 1:00:00
```

## How to unlock a user


TODO: How does an administrator manually unlock a user if required.
