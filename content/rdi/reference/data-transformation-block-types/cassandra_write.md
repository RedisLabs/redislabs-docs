---
Title: cassandra.write
linkTitle: cassandra.write
description: Write into a Cassandra data store
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Write into a Cassandra data store

**Properties**

| Name                                                   | Type     | Description                                                                                                                   | Required |
| ------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| **connection**<br/>(The connection to use for loading) | `string` | Logical connection name as defined in the connections.yaml<br/>                                                               | yes      |
| **keyspace**                                           | `string` | Keyspace<br/>                                                                                                                 | yes      |
| **table**<br/>(The target table name)                  | `string` | Target table name<br/>                                                                                                        | yes      |
| [**keys**](#keys)<br/>(Business keys)                  | `array`  |                                                                                                                               | yes      |
| [**mapping**](#mapping)<br/>(Fields to write)          | `array`  |                                                                                                                               | yes      |
| **opcode_field**                                       | `string` | Name of the field in the payload that holds the operation (c - create, d - delete, u - update) for this record in the DB<br/> | yes      |

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

## keys\[\]: Business keys

**Items: name of column**

**No properties.**

**Example**

```yaml
- fname
- lname: last_name
```

<a name="mapping"></a>

## mapping\[\]: Fields to write

**Items: name of column**

**No properties.**

**Example**

```yaml
- fname
- lname: last_name
- address
- gender
```
