---
Title: Data transformation
linkTitle: Data transformation
description:
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Redis Data Integration (RDI) maps data coming from [Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html) (representing source database row data or row state changes) to a Redis key-value pair.  The resulting value is either a [Hash](https://redis.io/docs/data-types/hashes/) or a [JSON](https://redis.io/docs/stack/json/) document.

Two data transformations are available:

- By default, each source row is converted to a Redis [Hash](https://redis.io/docs/data-types/hashes/) value or a [JSON document](https://redis.io/docs/stack/json/).

    Incoming data, which includes schema, is converted using Debezium Schema.  
    
    RDI uses handlers to convert each source column based on the Debezium schema type.  For details, see [Data type conversion]({{<relref "/rdi/data-transformation/data-type-conversion">}}).

- To add or modify the conversion of source data, you can specify _Declarative Data Transformations_ using YAML files.  

    Each file defines a Job that represents a set of transformations for a single source table. 

    To learn more, [Data transformation pipeline]({{<relref "/rdi/data-transformation/pipeline">}}).

The following image shows how this works:

{{<image filename="/images/rdi/data-transformation-flow.png" alt="Data transformation flow" >}}{{</image>}}

## More info

{{<allchildren style="h2" description="true">}}