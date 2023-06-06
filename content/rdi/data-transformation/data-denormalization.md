---
Title: Data denormalization
linkTitle: Data denormalization
description: Learn denormalization strategies
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The data in the source database is often _normalized_, meaning that column values are scalar and entity relationships are expressed as mappings of primary keys to foreign keys between different tables.
Normalized data models are useful when you're inserting, updating, and deleting data at the cost of slower reads.
Redis as a cache, on the other hand, is focused on speeding up read queries. To that end, RDI provides denormalization of data.

## Nest strategy

Nest is the only currently supported denormalization strategy.
This strategy denormalizes _many-to-one_ relationships in the source database to JSON documents, where the parent entity is the root of the document and the children entities are nested inside a JSON `map` attribute.

![nest denormalization flow](/images/rdi/nest-flow.png)

Denormalization is performed by using a `nest` block in the children entities' RDI job, as shown in this example:

```yaml
source:
  server_name: chinook
  schema: public
  table: InvoiceLine
output:
  - uses: redis.write
    with:
      nest: # cannot co-exist with other parameters such as 'key'
        parent:
          # server_name: chinook
          # schema: public
          table: Invoice
        nesting_key: InvoiceLineId # cannot be composite
        parent_key: InvoiceId # cannot be composite
        path: $.InvoiceLineItems # path must start from document root ($)
        structure: map # currently the only supported option
```

The job has a `with` section under `output` that includes the `nest` block.
The job has to include these attributes in the `nest` block:

- `parent`: Specifies the RDI data stream for the parent entities. Typically, the parent table name is sufficient, unless you nest children under parent that comes from a different source database. In that case, you have to specify `server_name` and `schema`.
- `nesting-key`: The field of the child entity that stores the unique id (PK) of the parent entity.
- `parent-key`: The field in the parent entity that stores the unique id (PK) of the parent entity.
- `path`: The JSON path for the JSON map of children entities. This has to start with `$` which is the notation for the document root.
- `structure`: The type of JSON used for nesting the children entities. Currently, only JSON map is supported so the value must be `map`.

> Notes: 
  * Only JSON is supported with `nest` so make sure that you set `target_data_type: json` in `config.yaml`.
  * Only one level of nesting is currently supported.
  * Only applicable to PostgreSQL): To enable nested operations for tables in PostgreSQL databases, the following changes must be made to all child tables:
    >
    > ```sql
    > ALTER TABLE <TABLE_NAME> REPLICA IDENTITY FULL;
    > ```
    >
    > For every table that has nested data in a parent document, it is necessary to perform this task. The configuration impacts the information written to the write-ahead log (WAL) and its availability for capture. By default, PostgreSQL only records the modified fields in the log, which can cause the `parent_key` to be omitted, resulting in erroneous updates to the Redis key in the destination database. Modifying the table to capture all modifications in the log is essential to ensure proper operation of RDI. See more details in [Debezium PostgreSQL Connector Documentation](https://debezium.io/documentation/reference/connectors/postgresql.html#postgresql-replica-identity).