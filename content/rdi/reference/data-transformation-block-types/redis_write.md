---
Title: redis.write
linkTitle: redis.write
description: Write to a Redis Enterprise database
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Write to a Redis Enterprise database

**Properties**

| Name                    | Type      | Description                                                                                                                                                          | Required |
|-------------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| **connection**          | `string`  | Name of Redis connection specified in `config.yaml`.<br/>Defaults to connection named `target`.                                                                      | no       |
| **data_type**<br/>      | `string`  | Type of Redis target data structure.<br/>Enum: `hash`(default), `json`, `set`, `sorted_set`, `stream`.<br/>Takes precedence over system property `target_data_type`. | no       |
| [**nest**](#nest)       | `object`  | Nest (embed) object within a different key.<br/>If nesting is specified, all other parameters are ignored.                                                           | no       |
| **key**                 | `object`  | Definition of the target Redis key.<br/>                                                                                                                             | yes      |
| &#x221F; **expression** | `string`  | Expression used to calculate the target key.                                                                                                                         | yes      |
| &#x221F; **language**   | `string`  | Language used to define the expression.<br/>Enum: `jmespath`, `sql`.                                                                                                 | yes      |
| [**args**](#args)       | `object`  | Arguments for modifying the target key.<br/>Specific to the data type.                                                                                               | no       |
| **mapping**             | `array`   | Array of fields (or `field: alias` pairs) to be written to the stream.<br/>Supported for `data_type: stream` only.                                                   | no       |
| **on_update**           | `string`  | Target key update strategy<br/>Enum: `merge`, `replace` (default).                                                                                                   | no       |
| **expire**              | `integer` | TTL in seconds for the modified key to expire.<br/>If not specified (or `expire: 0`), the target key will never expire.                                              | no       |

**Example**

```yaml
source:
  server_name: chinook
  schema: public
  table: invoice
output:
  # this block will use the default connection: target - since no explicit connection is specified,
  # the data will be written in a JSON format as the data_type: json is specified for the block
  - uses: redis.write
    with:
      data_type: json
      key:
        expression: concat(['invoice_id:', InvoiceId])
        language: jmespath
      on_update: merge
  # this block will use the explicitly specified connection: target1 - it must be defined in config.yaml
  # the data will be written to the corresponding Redis set, based on a value of the key expression
  - uses: redis.write
    with:
      connection: target
      data_type: set
      key:
        expression: concat(['invoices:', BillingCountry])
        language: jmespath
      args:
        member: InvoiceId
  # this block will use the explicitly specified connection: target1 - it must be defined in config.yaml
  # the data will be written to the Redis sorted set named invoices:sorted as specified in the key expression
  - uses: redis.write
    with:
      connection: target1
      data_type: sorted_set
      key:
        expression: "`invoices:sorted`"
        language: jmespath
      args:
        score: Total
        member: InvoiceId
  # this block will use the specified connection: target2 - this, again, has to be defined in config.yaml
  # the data will be written to a Redis stream named invoice:events as specified in the key expression
  - uses: redis.write
    with:
      connection: target
      data_type: stream
      key:
        expression: "`invoice:events`"
        language: jmespath
      mapping: # only the fields listed below will be written to a stream message, with two of them renamed as message_id and country
        - InvoiceId: message_id
        - BillingCountry: country
        - Total
```

<a name="args"></a>

## args: object

Arguments for modifying the target key

**Properties**

| Name       | Type     | Description                                                                                    | Required |
|------------|----------|------------------------------------------------------------------------------------------------|----------|
| **score**  | `string` | Field name used as a score for sorted sets.<br/>Valid for sorted sets only.                    | yes      |
| **member** | `string` | Field name used as a member for sets and sorted sets.<br/>Valid for sets and sorted sets only. | yes      |

<a name="nest"></a>

## nest: object

Nest (embed) object within a different key

**Properties**

| Name                     | Type     | Description                                                                                                                        | Required |
|--------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------|----------|
| **parent**               | `object` | Parent object definition.                                                                                                          | yes      |
| &#x221F; **server_name** | `string` | Server name.                                                                                                                       | no       |
| &#x221F; **schema**      | `string` | Schema name.                                                                                                                       | no       |
| &#x221F; **table**       | `string` | Parent table.                                                                                                                      | yes      |
| **parent_key**           | `string` | Field name used to identify the parent key (usually FK).                                                                           | yes      |
| **nesting_key**          | `string` | Field name used to create the nesting key (usually PK).                                                                            | yes      |
| **path**                 | `string` | Path, where the nested object should reside in a parent document.<br/>Must start with the root (e.g. `$.<children-elements-here>`) | yes      |
| **structure**            | `string` | Data structure used to represent the object in a parent document (`map` is the only supported value).p                             | yes      |

> Note: When `nest` object is defined, RDI will automatically assume `data_type: json` and `on_update: merge` regardless of what was declared in the job file.

> Note: Nesting job cannot be used together with any of the these properties: `key`, `args`, `mapping` or `expire`.

**Example**

```yaml
source:
  server_name: chinook
  schema: public
  table: InvoiceLine
output:
  - uses: redis.write
    with:
      nest:
        parent:
          # server_name: chinook
          # schema: public
          table: Invoice
        nesting_key: InvoiceLineId
        parent_key: InvoiceId
        path: $.InvoiceLineItems
        structure: map
```
