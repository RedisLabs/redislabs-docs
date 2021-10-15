---
Title: Backup object
linkTitle: backup
description: Documents the backup object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| status    | 'exporting'<br />'succeeded'<br />'failed' | Status of scheduled periodic backup process |
| progress  | number, (range: 0-100) | Shard backup progress (percentage) |
