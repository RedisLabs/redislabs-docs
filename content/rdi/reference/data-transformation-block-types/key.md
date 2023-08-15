---
Title: key
linkTitle: key
description: Set the Redis key for this data entry
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Set the Redis key for this data entry

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
key:
  expression: concat([InvoiceId, '.', CustomerId])
  language: jmespath
```
