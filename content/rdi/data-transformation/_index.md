---
Title: Data transformation
linkTitle: Data transformation
description:
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The key functionality that RDI performs is mapping the data coming from [Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html) (representing a Source Database row data or row state change) into a Redis key with a value of [Hash](https://redis.io/docs/data-types/hashes/) or [JSON](https://redis.io/docs/stack/json/).
There are two types of Data Transformations in RDI:

- By default, each source row is converted into one [Hash](https://redis.io/docs/data-types/hashes/) or one JSON key in Redis.
  This conversion uses the Debezium schema-based conversion: the incoming data includes the schema and RDI uses a set of handlers to automatically convert each source column to a Redis Hash field or JSON type based on the Debezium type in the schema. See [Data type conversion]({{<relref "/rdi/reference/data-types-conversion">}}) for a full reference on these conversions.

- If the user wants to add or modify this default mapping, RDI provides Declarative Data Transformations. These transformations are represented in YAML files. Each file contains a Job, a set of transformations per source table. More about [Declarative Transformations]({{<relref "/rdi/data-transformation/data-transformation-pipeline">}}).

![Data transformation flow](/images/rdi/data-transformation-flow.png)

## More info

{{<allchildren style="h2" description="true"/>}}