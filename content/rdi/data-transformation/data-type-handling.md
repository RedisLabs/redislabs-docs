---
Title: Data type handling
linkTitle: Data type handling
description: Describes how relational data types are converted to Redis data types
weight: 20
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

## Debezium type handling

RDI automatically converts data that has a Debezium JSON schema into Redis types.
Some Debezium types require special conversion. For example:

- Date and Time types are converted to epoch time.
- Decimal numeric types are converted to strings that can be used by applications without losing precision.

The following Debezium logical types are currently handled:

- double
- float
- io.debezium.data.Bits
- io.debezium.data.Json
- io.debezium.data.VariableScaleDecimal
- io.debezium.time.Date
- io.debezium.time.NanoTime
- io.debezium.time.NanoTimestamp
- io.debezium.time.MicroTime
- io.debezium.time.MicroTimestamp
- io.debezium.time.ZonedTime
- io.debezium.time.ZonedTimestamp
- org.apache.kafka.connect.data.Date
- org.apache.kafka.connect.data.Decimal
- org.apache.kafka.connect.data.Time

These types are currently **not** supported and will return "Unsupported Error":

- io.debezium.time.interval

All other values will be treated as plain String.

For more information, see [a full list of source database values conversion]({{<relref "/rdi/reference/data-types-conversion">}}).