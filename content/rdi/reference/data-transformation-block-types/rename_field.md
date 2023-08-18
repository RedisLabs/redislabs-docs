---
Title: rename_field
linkTitle: rename_field
description: Rename fields. All other fields remain unchanged.
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Rename fields. All other fields remain unchanged.

**Option 1 (alternative):**
Rename multiple fields

**Properties**

| Name                         | Type       | Description | Required |
| ---------------------------- | ---------- | ----------- | -------- |
| [**fields**](#option1fields) | `object[]` | Fields<br/> | yes      |

**Additional Properties:** not allowed  
**Example**

```yaml
source:
  server_name: redislabs
  schema: dbo
  table: emp
transform:
  - uses: rename_field
    with:
      fields:
        - from_field: name.lname
          to_field: name.last_name
        - from_field: name.fname
          to_field: name.first_name
```

**Option 2 (alternative):**
Rename one field

**Properties**

| Name           | Type     | Description     | Required |
| -------------- | -------- | --------------- | -------- |
| **from_field** | `string` | From field<br/> | yes      |
| **to_field**   | `string` | To field<br/>   | yes      |

**Additional Properties:** not allowed

**Example**

```yaml
source:
  server_name: redislabs
  schema: dbo
  table: emp
transform:
  - uses: rename_field
    with:
      from_field: name.lname
      to_field: name.last_name
```

<a name="option1fields"></a>

## Option 1: fields\[\]: array

Fields

**Items**

**Item Properties**

| Name           | Type     | Description     | Required |
| -------------- | -------- | --------------- | -------- |
| **from_field** | `string` | From field<br/> | yes      |
| **to_field**   | `string` | To field<br/>   | yes      |

**Item Additional Properties:** not allowed

**Example**

```yaml
- {}
```
