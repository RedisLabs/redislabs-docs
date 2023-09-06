---
Title: Redis Data Integration architecture
linkTitle: Architecture
description:
weight: 10
alwaysopen: false
categories: ["redis-di"]
headerRange: "[2]"
aliases: 
---

Redis Data Integration (RDI) is a product that helps Redis Enterprise users ingest and export data in near real time. RDI provides the following:

- End to end solution - No need for additional tools and integrations
- Capture Data Change (CDC) included
- Covers most popular databases as sources and targets
- Declarative data mapping and transformations - no custom code needed
- Data delivery guaranteed (at least once)
- Zero downtime day 2 operations (reconfigure & upgrade)

Redis Data Integration currently supports two use cases:

- Ingest (cache prefetch).
- Write Behind.

## Ingest functionality and architecture

You can think of RDI Ingest as a streaming ELT process:

- Data is **E**xtracted from the source database using [Debezium Server](https://debezium.io/) connectors.
- Data is then **L**oaded into Redis Data Integration, a Redis database instance that keeps the data in [Redis streams](https://redis.io/docs/manual/data-types/streams/) alongside required metadata.
- Data is then **T**ransformed using provided [RedisGears recipes](https://developer.redis.com/howtos/redisgears/) and written to the target Redis DB.

Redis Data Integration using Debezium Server works in two modes:

1. Initial sync - Where a snapshot of the entire database or a subset of selected tables is used as a baseline. The entire dataset is streamed to Redis Data Integration and then transformed and written into the target Redis database.
2. Live updates - Where Debezium captures changes to the data that happen after the baseline snapshot and streams them to Redis Data Integration where they are transformed and written to the target.

![High-level Redis Data Integration architecture](/images/rdi/redis-di-simplified.png)

### Supported data transformations

#### Mode mapping

RDI supports conversion of a database record into the following Redis types:

- Hash
- Set
- Sorted Set
- Stream
- JSON
- String

Each column in the record is automatically formatted as a number or string. See the [data types list]({{<relref "/rdi/reference/data-types-conversion">}}) for the exact mappings.

#### Additional transformations

RDI supports declarative transformations to further manipulate the data, including denormalization of data from several records into a single JSON key in Redis.

Read the data transformation section of these docs to learn more.

### Architecture and components

![Detailed Redis Data Integration architecture](/images/rdi/redis-di.png)

#### Feeders

Debezium Server has a Redis sink that writes data and state to RDI streams.
In addition RDI works with [Arcion](arcion.io), a commercial CDC that provides additional set of sources.

#### Redis data integration data plane

##### RDI data streams

Redis Data Integration receives data using [Redis streams](https://redis.io/docs/manual/data-types/streams/). Records with data from a specific database table are written to a stream with a key reflecting the table name. This allows a simple interface into Redis Data Integration and keeping the order of changes as served by Debezium.

##### RDI engine

RDI Engine is built on top of RedisGears. It has 2 main logical functions:

- Transformation of data - In the current version, we only support Debezium types into Redis types but future versions will support [Apache Avro](https://avro.apache.org/docs/current/). In addition we plan to provide data mapping between denormalized relational model and denormalized Redis JSON documents.
- Writing data - This is the part where Redis Data Integration writes the data to the target ensuring order & guarantying at least once to prevent data loss. In addition, the Writer can be configured to ignore, abort or keep rejected data entries.

#### Redis data integration control plane

#### RDI CLI

Redis Data Integration comes with a python based CLI that is intuitive, self explanatory & validating to ease the entire lifecycle of Redis Data Integration setup and management.

#### RDI configuration

Redis Data Integration configuration is persisted at the cluster level. The configuration is written by the CLI `deploy` command, reflecting the configuration file. This mechanism allows for automatic configuration of new shards when needed and can survive shard and node failure.

#### Secrets handling

Redis Data Integration requires the following secrets:

- The RDI Engine requires the credentials and certificate to connect and write encrypted data to the target Redis DB.
- The Debezium Redis Sink Connector requires the credentials and certificate to connect and write data into Redis Data Integration DB.
- The Debezium Source Connector requires the source DB secrets.
- The RDI CLI requires a Certificate to connect to the Redis Enterprise cluster. For the create command it requires the credentials of a privileged user but it does not cache or store these credentials.

Credentials and Certificate can be served in one of the following ways:

- Entered manually as parameters to a CLI command (where applicable).
- Stored in environment variables.
- Injected to the temp file system by a secret store agent (for example, [HashiCorp Vault](https://www.vaultproject.io/)).

### Scalability and high availability

Redis Data Integration is highly available:

- At the feeder level: Debezium Server is deployed using [Kubernetes](https://kubernetes.io/) or [Pacemaker](https://clusterlabs.org/pacemaker/) for failover between stateless instances, while the state is secured in Redis.
- At the Data and Control Plane: Using Redis Enterprise mechanisms for high availability (shard replica, cluster level configurations, and so on)

Redis Data Integration is horizontally scalable:

- Table level data streams can be split to multiple shards where they can be transformed and written to the target in parallel, while keeping table level order of updates.

### Tested topologies

Redis Data Integration is running on Redis Enterprise. It works on any installation of Redis Enterprise regardless of the runtime (bare metal, VMs, or containers).
Redis Data Integration can be collocated with the target Redis DB or run on a different Redis Enterprise cluster.

Debezium Server should run in warm High Availability topology in one of the following options:

- Running on 2 VMs in an active/passive setup. The failover orchestration can be done by tools such as [Pacemaker](https://clusterlabs.org/pacemaker/doc/).
- Running as a Kubernetes pod where Kubernetes watches the pod liveliness and readiness and acts to recover nonfunctional pod
  It is important to note that Redis Data Integration does not keep any state on Debezium. All state is kept in Redis Data Integration.

## Write behind functionality and architecture

RDI write behind allows integration between Redis Enterprise (as the source of changes to data) to downstream databases or datastores.
RDI captures the changes to a selected set of key-patterns in a Redis keyspace and asynchronously writes them in small batches to the downstream database, so the application doesn't need to take care of remodeling the data or managing the connection with the downstream database.

RDI write behind can normalize a key in Redis to several records in one or more tables at the target.
To learn more about write behind declarative jobs and renormalization read the [write behind quick start guide]({{<relref "/rdi/quickstart/write-behind-guide.md">}})

### Write behind topology

RDI CLI and engine come in one edition that can run both ingest and write behind. However, the topology for write behind is different.
RDI engine is installed on a Redis database containing the application data and not on a separate staging Redis database. RDI streams and control plain adds a small footprint of few hundreds of MBs to the Redis database. In the write behind topology, RDI process in parallel on each shard and establishes a single connection from each shard to the downstream database.

### model translation

RDI write behind can track changes to the following Redis types:

- Hash
- JSON
- Set
- Sorted Set

Unlike the ingest scenario, write behind has no default behavior for model translation. It is up to the user to create a declarative job, specifying the mapping between Redis key and target database record.
The job `keys` and `mapping` sections help make this an easy task.
