---
Title: Redis ACL object
linkTitle: redis_acl
description: An object that represents a Redis access control list (ACL)
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a Redis [access control list (ACL)]({{<relref "/rs/security/passwords-users-roles">}})

| Name | Type/Value | Description |
|------|------------|-------------|
| uid         | integer     | Object's unique uid |
| name        | string      | Redis ACL's name |
| acl         | string      | Redis ACL's string |
| account_id  | integer     | SM account ID |
| action_uid  | string      | Action uid. If it exists, progress can be tracked by the `GET`&nbsp;`/actions/{uid}` API (read-only) |
