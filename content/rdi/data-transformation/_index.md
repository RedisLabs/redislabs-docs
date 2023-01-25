---
Title: Data transformation
linkTitle: Data transformation
description:
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Redis Data Integration (RDI) maps data coming from [Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html) (representing source satabase row data or row state change) to a Redis key.  The resulting value is either a [Hash](https://redis.io/docs/data-types/hashes/) or a [JSON](https://redis.io/docs/stack/json/) value.

Two data transformations are available:

- By default, each source row is converted into one [Hash](https://redis.io/docs/data-types/hashes/) or one JSON key in Redis.

    This conversion is using the Debezium Schema based conversion: the incoming data includes the schema and RDI will use a set of handlers to automatically convert each source column to a the a Redis Hash field or JSON type based on the Debezium type in the schema. [Look here](../reference/data-types-conversion/data-types-conversion.md) for a full reference of these conversions.

- If the user wants to add or modify this default mapping, RDI provides Declarative Data Transformations. These transformations are represented in YAML files. Each file contains a Job, a set of transformations per source table. More about [Declarative Transformations](data-transformation-pipeline.md).

The following images hows how this works:

{{<image filename="/images/rdi/data-transformation-flow.png" alt="Data transformation flow" >}}{{</image>}}

## More info

{{<allchildren style="h2" description="true">}}