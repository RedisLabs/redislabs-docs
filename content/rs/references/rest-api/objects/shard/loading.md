---
Title: Loading object
linkTitle: loading
description: Documents the loading object used with Redis Enterprise Software REST API calls.
weight: $weight
alwaysopen: false
categories: ["RS"]
---

| Name | Type/Value | Description |
|------|------------|-------------|
| status    | 'in_progress'<br></br>'idle' | Status of the load of a dump file (read-only) |
| progress  | number, (range: 0-100) | Percentage of bytes already loaded. |
