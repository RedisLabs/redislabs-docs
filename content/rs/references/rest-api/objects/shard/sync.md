---
Title: Sync object
linkTitle: sync
description: Documents the sync object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| status    | 'in_progress'<br></br>'idle'<br></br>'link_down' | Indication of the shard's current sync status |
| progress  | integer        | Number of bytes remaining in current sync |
