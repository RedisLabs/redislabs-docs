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

Redis Data Integration is a product that takes data from traditional databases and other record systems and migrates it to Redis Enterprise.

Think of Redis Data Integration as a streaming extract, load, transform (ELT) process where data is:

- Extracted from a source database using [Debezium](https://debezium.io/) connectors.
- Loaded into Redis Data Integration, a Redis database instance that keeps the data in [Redis Streams](https://redis.io/docs/manual/data-types/streams/) and required metadata.
- Transformed using [RedisGears recipes](https://developer.redis.com/howtos/redisgears/) and written to the target Redis database.

Redis Data Integration using Debezium works in two modes:

1. Initial sync - A snapshot of the entire database or a subset of selected tables is used as a baseline.  The data streamed to Redis Data Integration, transformed, and then written to the target Redis database.

2. Live updates - Debezium captures changes to the source data that occur after the baseline snapshot and streams updates to Redis Data Integration where they are transformed and then written to the target database.

The following image shows how this works:

{{<image filename="/images/rdi/redis-di-simplified.png" alt="Redis Data Integration architecture - high level" >}}{{</image>}}

## Database support

Redis Data Integration supports the following Databases sources using Debezium 1.9 connectors:

| Database   | Versions           |
| ---------- | ------------------ |
| Oracle     | 12c, 19c, 21c      |
| MySQL      | 5.7, 8.0.x         |
| Postgres   | 10, 11, 12, 13, 14 |
| SQL Server | 2017, 2019         |

## Supported data transformations

Currently, Redis Data Integration supports transforming data from RDBMS row to a [Redis Hash](https://redis.io/docs/data-types/#hashes) or a [RedisJSON](https://redis.io/docs/stack/json/) document.

For exact mappings, see [Data type conversion]({{<relref "/rdi/data-transformation/data-type-conversion">}}).

## Architecture and components

{{<image filename="images/rdi/redis-di.png" alt="Redis Data Integration Architecture - Detailed" >}}{{</image>}}

## Feeders

Currently the only source for Redis Data Integration is the [Debezium Redis Sink Connector](https://debezium.io/documentation/reference/stable/operations/debezium-server.html#_redis_stream).
Other sources and SDK will be added in later versions.

## Redis Data Integration data plane

### Redis Data Integration data streams

Redis Data Integration receives data using [Redis Streams](https://redis.io/docs/manual/data-types/streams/). Records with data from a specific database table are written to a stream with a key reflecting the table name. This allows a simple interface into Redis Data Integration and keeping the order of changes as served by Debezium.

### RDI Engine

RDI Engine is built on top of RedisGears. It has 2 main logical functions:

- Transformation of data - in the current version we only support Debezium types into Redis types but future versions will support [Apache Avro](https://avro.apache.org/docs/current/). In addition we plan to provide data mapping between denormalized relational model and denormalized Redis JSON documents.
- Writing data - this is the part where Redis Data Integration writes the data to the target ensuring order & guarantying at least once to prevent data loss. In addition, the Writer can be configured to ignore, abort or keep rejected data entries.

## Redis Data Integration control plane

### RDI CLI

Redis Data Integration comes with a python based command line utility that is intuitive, self explanatory, and validating to ease the entire lifecycle of Redis Data Integration setup and management.

### Redis Data Integration configuration

Redis Data Integration configuration is persisted at the cluster level. The configuration is written by the CLI `deploy` command, reflecting the configuration file. This mechanism allows for automatic configuration of new shards when needed and can survive shard and node failure.

### Secret handling

Redis Data Integration requires the following secrets:

- The RDI Engine requires the credentials and certificate to connect and write encrypted data to the target Redis DB.
- The Debezium Redis Sink Connector requires the credentials and certificate to connect and write data into Redis Data Integration DB.
- The Debezium Source Connector requires the source DB secrets.
- The RDI CLI requires a Certificate to connect to the Redis Enterprise cluster. For the create command it requires the credentials of a privileged user but it does not cache or store these credentials.

Credentials and Certificate can be served in one of the following ways:

- Entered manually as parameters to a CLI command (where applicable).
- Stored in environment variables.
- Injected to the temp file system by a secret store agent (e.g. [HashiCorp Vault](https://www.vaultproject.io/)).

## Scalability and high availability

Redis Data Integration is highly available:

- At the feeder level: Debezium Server is deployed using [Kubernetes](https://kubernetes.io/) or [Pacemaker](https://clusterlabs.org/pacemaker/) for failover between stateless instances, while the state is secured in Redis.
- At the Data and Control Plane: Using Redis Enterprise mechanisms for high availability (shard replica, cluster level configurations, etc.)

Redis Data Integration is horizontally scalable:

- Table level data streams can be split to multiple shards where they can be transformed and written to the target in parallel, while keeping table level order of updates.

## Tested Topologies

Redis Data Integration is running on Redis Enterprise. It works on any installation of Redis Enterprise regardless of the runtime (bare metal, VMs or containers).
Redis Data Integration can be collocated with the target Redis DB or run on a different Redis Enterprise cluster.

Debezium Server should run in warm High Availability topology in one of the following options:

- Running on 2 VMs in an active/passive setup. The failover orchestration can be done by tools such as [Pacemaker](https://clusterlabs.org/pacemaker/doc/).
- Running as a Kubernetes pod where Kubernetes watches the pod liveliness and readiness and acts to recover nonfunctional pod
  It is important to note that Redis Data Integration does not keep any state on Debezium. All state is kept in Redis Data Integration.
