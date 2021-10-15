---
Title: User object
linkTitle: user
description: Documents the user object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents an RLEC user.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid                   | integer            | User's unique uid |
| email                 | string             | User's email (pattern matching only ascii characters) |
| password              | string             | User's password. Note that it could also be an already-hashed value, in which case 'password_hash_method' parameter is also provided. |
| name                  | string             | User's name (pattern does not allow non-ascii and special characters &,\<,>,") |
| email_alerts          | boolean (default:&nbsp;true) | Activate email alerts for a user |
| bdbs_email_alerts     | complex object     | UIDs of databases that user will receive alerts for |
| cluster_email_alerts  | boolean            | Activate cluster email alerts for a user |
| role                  | 'admin'<br />'cluster_member'<br />**'db_viewer'**<br />'db_member'<br />'cluster_viewer'<br />'none' | User's role |
| auth_method           | **'regular'**<br />'external' | User's authentication method |
| password_hash_method  | '1'                | Used when password is passed pre-hashed to specify the hashing method |
| password_issue_date   | string             | The date in which the password was set (read-only) |
| role_uids             | array of integer   | List of role uids associated with the LDAP group |
| account_id            | integer            | SM account ID |
| action_uid            | string             | Action uid. If it exists, progress can be tracked by the `GET`&nbsp;`/actions/{uid}` API (read-only) |
