---
Title: Redis Connect
linkTitle: Redis Connect
description:
weight: 71
alwaysopen: false
categories: ["Connect"]
aliases: /connect/
         /connect.md
---

Redis Connect help import (or _ingest_) data from existing systems into Redis Enterprise.   You can think of Redis Connect as a streaming [ELT process](https://en.wikipedia.org/wiki/Extract,_load,_transform) (extract, load, transform) where the original data is:

- Extracted from the source database using a connector service, such as [Debezium](https://debezium.io/).
- Loaded into Redis Connect, a Redis database instance that stores a copy of the original data in [Redis Streams](https://redis.io/docs/manual/data-types/streams/), along with required metadata.
- Transformed, using [Redis Gears recipes](https://developer.redis.com/howtos/redisgears/), into a format appropriate to the target Redis database.

For preview, Redis Connect leverages Debezium in two modes:

1. _Initial sync:_ A snapshot of the entire database or a subset of selected tables serves as a baseline that is streamed to Redis Connect and then transformed before being written to the target Redis database

2.  _Live updates:_ Debezium captures changes to the initial snapshop and streams them to Redis Connect for transformation before updating the target database.

Currently, Redis Connect transforms an incoming relational database row into a [Redis hash](https://redis.io/docs/manual/data-types/#hashes).  A future update will add the ability to transform a row into a [RedisJSON document](https://redis.io/docs/stack/json/).

To learn more, see [data types list](data-type-conversion.md) for the exact mappings.

## Database support

For preview, Redis Connect uses Debezium 1.9 connectors to support the following data sources:

| Database   | Versions           |
| ---------- | ------------------ |
| Oracle     | 12c, 19c, 21c      |
| MySQL      | 5.7, 8.0.x         |
| Postgres   | 10, 11, 12, 13, 14 |
| SQL Server | 2017, 2019         |

_\*snip\*_


## Architecture and Components

![Redis Connect Architer\cture](images/connect/redis-connect-architecture.png)

## Feeders

Currently the only source for Redis Connect is the [Debezium Redis Sink Connector](https://debezium.io/documentation/reference/stable/operations/debezium-server.html#_redis_stream).
Other sources and SDK will be added in later versions.

## Redis Connect Data Plane

### Redis Connect Data Streams

Redis Connect receives data using [Redis Streams](https://redis.io/docs/manual/data-types/streams/). Records with data from a sepcific database table are written to a stream with a key reflecting the table name. This allows a simple interface into Redis Connect and keeping the order of changes as served by Debezium.

### Redis Connect Data Transformation Engine

Redis Connect Data Transformation Engine is built on top of Redis Gears. It has 2 main logical functions:

- Transformation of data - in the current version we only support Debezium types into Redis types but future versions will support [Apache Avro](https://avro.apache.org/docs/current/). In addition we plan to provide data mapping between denormalized relational model and denormalized Redis JSON documents.
- Writing data - this is the part where Redis Connect writes the data to the target ensuring order & guaranting at least once to prevent data loss. In addition, the Writer can be configured to ignore, abort or keep rejected data entries.

## Redis Connect Control Plane

### Redis Connect CLI

Redis Connect comes with a python based CLI that is intuitive, self explanatory & validating to ease the entire lifecycle of Redis Connect setup and management.

### Redis Connect Configuration

Redis Connect configuration is persisted at the cluster level. The configuration is written by the CLI `deploy` command, refelcting the configuration file. This mechanism allows for automatic configuration of new shards when needed and can survive shard and node failure.

### Secrets Handling

Redis Connect requires the following secrets:

- The Redis Connect Data Transformation Engine requires the credentials and certificate to connect and write encryipted data to the target Redis DB.
- The Debezium Redis Sink Connector requires the credentials and certificate to connect and write data into Redis Connect DB.
- The Debezium Source Connector requires the source DB secrets.
- The Redis Connect CLI requires a Certificate to connect tothe Redis Enterprise cluster. For the create command it requires the credentials of a priveleged user but it does not cache or store these credentials.
  Credential s and Certificate can be served in one of the following ways:
- Entered manually as parameters to a CLI command (where applicable).
- Stored in environment variables.
- Injected to the temp file system by a secret store agent (e.g. Hashicorp Vault).

## Scalability and High Availability

Redis Connect is highly available:

- At the feeder level: Debezium Server is deployed using [Kubernetes](https://kubernetes.io/) or [Pacemaker](https://clusterlabs.org/pacemaker/) for failover between stateless instances, while the state is secured in Redis.
- At the Data and Control Plane: Using Redis Enterprise mechanisms for high availablity (shard replica, cluster level configurations, etc.)
  Redis Connect is horizonatlly scalable:
- Table level data streams can be split to multiple shards where they can be transformed and written to the target in parallel, while keeping table level order of updates.

## Tested Topologies

Redis Connect is running on Redis Enterprise. It works on any installation of Redis Enterpise regardless of the runtime (bare metal, VMs or containers).
Redis Connect can be colocated with the target Redis DB or run on a different Redis Enterpise cluster.

Debezium Server should run in warm High Availabilty topology in one of the following options:

- Running on 2 VMs in an active / passive setup. The failover orchestration can be done by tools such as [Pacemaker](https://clusterlabs.org/pacemaker/doc/).
- Running as a Kubernetes pod where Kubernetes watches the pod liveliness and readiness and acts to recover unfunctional pod
  It is important to note that Redis Connect does not keep any state on Debezium. All state is kept in Redis Connect.