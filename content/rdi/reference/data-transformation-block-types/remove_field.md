---
Title: remove_field
linkTitle: remove_field
description: Remove fields
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Remove fields

**Option 1 (alternative):**
Remove multiple fields

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
  - uses: remove_field
    with:
      fields:
        - field: credit_card
        - field: name.mname
```

**Option 2 (alternative):**
Remove one field

**Properties**

| Name      | Type     | Description | Required |
| --------- | -------- | ----------- | -------- |
| **field** | `string` | Field<br/>  | yes      |

**Additional Properties:** not allowed  
**Example**

```yaml
source:
  server_name: redislabs
  schema: dbo
  table: emp
transform:
  - uses: remove_field
    with:
      field: credit_card
```

<a name="option1fields"></a>

## Option 1: fields\[\]: array

Fields

**Items**

**Item Properties**

| Name      | Type     | Description | Required |
| --------- | -------- | ----------- | -------- |
| **field** | `string` | Field<br/>  | yes      |

**Item Additional Properties:** not allowed  

**Example**

```yaml
- {}
```
