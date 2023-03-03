---
Title: filter
linkTitle: filter
description: 
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

# filter

Filter records

**Properties**

| Name           | Type     | Description                                   | Required |
| -------------- | -------- | --------------------------------------------- | -------- |
| **expression** | `string` | Expression<br/>                               | yes      |
| **language**   | `string` | Language<br/>Enum: `"jmespath"`, `"sql"`<br/> | yes      |

**Additional Properties:** not allowed  
**Example**

```yaml
source:
  server_name: redislabs
  schema: dbo
  table: emp
transform:
  - uses: filter
    with:
      language: sql
      expression: age>20
```
