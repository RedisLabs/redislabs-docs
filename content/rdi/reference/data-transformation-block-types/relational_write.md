---
Title: relational.write
linkTitle: relational.write
description: 
weight: 70
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

# relational.write

Write into a SQL-compatible data store

**Properties**

| Name                                                                                                                                                      | Type       | Description                                                                                                                                                     | Required |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **connection**<br/>(The connection to use for loading)                                                                                                    | `string`   | Logical connection name as defined in the connections.yaml<br/>                                                                                                 | yes      |
| **table**<br/>(The target table name)                                                                                                                     | `string`   | Target table name<br/>                                                                                                                                          | yes      |
| **schema**<br/>(The table schema of the target table)                                                                                                     | `string`   | If left blank, the default schema of this connection will be used as defined in the connections.yaml<br/>                                                       | yes      |
| [**keys**](#keys)<br/>(Business keys to use for upsert in case of an UPSERT)                                                                              | `string[]` |                                                                                                                                                                 | no       |
| [**mapping**](#mapping)<br/>(Fields to write)                                                                                                             | `string[]` |                                                                                                                                                                 | no       |
| **load_strategy**                                                                                                                                         | `string`   | type of target<br/>Default: `"APPEND"`<br/>Enum: `"APPEND"`, `"REPLACE"`, `"UPSERT"`, `"TYPE2"`<br/>                                                            | no       |
| **active_record_indicator**                                                                                                                               | `string`   | Used for `TYPE2` load_strategy. An SQL expression used to identify which rows are active<br/>                                                                   | no       |
| [**inactive_record_mapping**](#inactive_record_mapping)<br/>(Used for \`TYPE2\` load_strategy\. The columns mapping to use to close out an active record) | `array`    | A list of columns to use. Use any valid SQL expression for the source. If 'target' is omitted, will default to the name of the source column<br/>Default: <br/> | no       |

**Additional Properties:** not allowed
**Example**

```yaml
id: load_snowflake
type: relational.write
properties:
  connection: eu_datalake
  table: employees
  schema: dbo
  load_strategy: APPEND
```

<a name="keys"></a>

## keys\[\]: Business keys to use for upsert in case of an UPSERT

**Items: name of column**

**Item Type:** `string`
**Example**

```yaml
- fname
- lname
```

<a name="mapping"></a>

## mapping\[\]: Fields to write

**Items: name of column**

**Item Type:** `string`
**Example**

```yaml
- fname
- lname
- address
- gender
```

<a name="inactive_record_mapping"></a>

## inactive_record_mapping\[\]: Used for \`TYPE2\` load_strategy\. The columns mapping to use to close out an active record

A list of columns to use. Use any valid SQL expression for the source. If 'target' is omitted, will default to the name of the source column

**No properties.**

**Example**

```yaml
- source: CURRENT_DATE
  target: deletedAt
- source: "'Y'"
  target: is_active
```
