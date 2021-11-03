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
| uid | integer | Role's unique ID |
| account_id | integer | SM account ID |
| action_uid | string | Action UID. If it exists, progress can be tracked by the GET /actions/{uid} API (read-only) |
| management | 'admin'<br />'db_member'<br />'db_viewer'<br />'cluster_member'<br />'cluster_viewer'<br />'none' | [Management role]({{<relref "/rs/references/rest-api/permissions#roles">}}) |
| name | string | Role's name |
