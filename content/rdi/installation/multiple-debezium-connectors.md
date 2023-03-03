---
Title: Use multiple Debezium connectors
linkTitle: Use multiple Debezium connectors
description: Install multiple Debezium Servers on the same host
weight: 80
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Some use cases require ingesting data from several different data sources.
Ingesting data from more than one Debezium Connector to the same RDI installation is supported.
The following diagram depict this topology.

{{<image filename="/images/rdi/redis-di-multi-debezium.png" alt="Multi-Debezium topology" >}}{{</image>}}

## Create the topology

- For each source database, a separate Debezium Server installation is needed ([see below](#installing-multiple-debezium-servers-on-the-same-host)).
- Each of these Debezium Servers will have its own `application.properties` file.
- Each of these Debezium Servers will need a different logical name so it can create separate set of data streams and offset key in RDI database. To do so specify a unique name in the `debezium.source.topic.prefix` connector property.
- If more than one Debezium Server is running on the same host, each one of them requires a different HTTP port. Set the port using the `quarkus.http.port` property.
- Ensure your RDI database has enough memory for all the streams you will have with ingested data. Use the following formula:

  ```
  <number of captured tables> * <batch size> * <max row size> * 4
  ```

This formula is using:

- The number of tracked source tables as the indicator for number of streams.
- The batch size multiplied by maximum source database row size as the amount of data that will reside in each stream. This amount of memory is multiplied by 4 to account for overhead from Debezium JSON schema and other control plane data.

### Installing multiple Debezium Servers on the same host

In some cases, you would like to have more than one Debezium Server installed on the same host. This is possible but requires some attention:

- Ensure enough CPU cores and RAM for all the processing needed (especially during initial sync).
- Each Debezium Server **must have a separate `config` folder** with the right `application.properties` file. Make sure you do not use start the Debezium Server pointing to the wrong `config` folder.
- Make sure each container running a Debezium Server is started with a different name.

## Caveats

- Reset of one of the sources back to initial snapshot mode is not yet supported.
- Batch size and other RDI Engine configuration properties are for all sources.
- There is no support for data meshing from different sources into a Redis Hash/JSON.
