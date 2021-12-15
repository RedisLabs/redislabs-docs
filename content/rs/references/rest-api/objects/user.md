---
Title: User object
linkTitle: user
description: An object that represents a Redis Enterprise user
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a Redis Enterprise user.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid | integer | User's unique ID |
| account_id | integer | SM account ID |
| action_uid | string | Action UID. If it exists, progress can be tracked by the `GET`&nbsp;`/actions/{uid}` API request (read-only) |
| auth_method | 'external'<br /> **'regular'** | User's authentication method |
| bdbs_email_alerts | complex object | UIDs of databases that user will receive alerts for |
| cluster_email_alerts | boolean | Activate cluster email alerts for a user |
| email | string | User's email (pattern matching only ASCII characters) |
| email_alerts | boolean (default:&nbsp;true) | Activate email alerts for a user |
| name | string | User's name (pattern does not allow non-ASCII and special characters &,\<,>,") |
| password | string | User's password. Note that it could also be an already hashed value, in which case the `password_hash_method` parameter is also provided. |
| password_hash_method | '1' | Used when password is passed pre-hashed to specify the hashing method |
| password_issue_date | string | The date in which the password was set (read-only) |
| role | 'admin'<br />'cluster_member'<br />'cluster_viewer'<br />'db_member'<br /> **'db_viewer'** <br />'none' | User's [role]({{<relref "/rs/references/rest-api/permissions#roles">}}) |
| role_uids | array of integers | List of role UIDs associated with the LDAP group |
