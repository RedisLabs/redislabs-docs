---
Title: Role object
linkTitle: role
description: An object that represents a role
weight: $weight
alwaysopen: false
categories: ["RS"]
---

An API object that represents a role.

| Name | Type/Value | Description |
|------|------------|-------------|
| uid         | integer           | Role's unique uid |
| name        | string            | Role's name |
| management  | 'none'<br />'db_viewer'<br />'cluster_viewer'<br />'db_member'<br />'cluster_member'<br />'admin' | [Management role]({{<relref "/rs/references/rest-api/permissions#roles">}}) |       
| account_id  | integer           | SM account ID |
| action_uid  | string            | Action uid. If it exists, progress can be tracked by the GET /actions/{uid} API (read-only) |
