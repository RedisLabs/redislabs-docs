---
Title: Redis ACL object
linkTitle: redis_acl
description: An object that represents a Redis access control list (ACL)
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a Redis [access control list (ACL)]({{<relref "/rs/security/access-control/configure-acl">}})

| Name | Type/Value | Description |
|------|------------|-------------|
| uid | integer | Object's unique ID |
| account_id | integer | SM account ID |
| acl | string | Redis ACL's string |
| action_uid | string | Action UID. If it exists, progress can be tracked by the `GET`&nbsp;`/actions/{uid}` API (read-only) |
| name | string | Redis ACL's name |
