---
Title: Role object
linkTitle: role
description: Documents the role object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a role.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid         | integer           | Role's unique uid. |
| name        | string            | Role's name |
| management  | 'none'<br></br>'db_viewer'<br></br>'cluster_viewer'<br></br>'db_member'<br></br>'cluster_member'<br></br>'admin' | Management role |       
| account_id  | integer           | SM account ID |
| action_uid  | string            | Action uid. If exists - progress can be tracked by the GET /actions/{uid} API (read-only) |
