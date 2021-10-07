---
Title: Redis ACL object
linkTitle: redis_acl
description: Documents the redis_acl object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a RedisACL object

| Name | Type/Value | Description |
|------|------------|-------------|
| uid         | integer     | Object's unique uid. |
| name        | string      | Redis ACL's name |
| acl         | string      | Redis ACL's string |
| account_id  | integer     | SM account ID |
| action_uid  | string      | Action uid. If exists - progress can be tracked by the `GET`&nbsp;`/actions/{uid}` API (read-only) |
