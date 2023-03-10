---
Title: Redis Data Integration
linkTitle: Redis Data Integration
description:
weight: 71
alwaysopen: false
categories: ["redis-di"]
headerRange: "[2]"
aliases: /connect/
         /connect.md
         /redis-di/
         /redis-di.md
---

Redis Data Integration (RDI) is a product that helps [Redis Enterprise](https://redis.com/redis-enterprise-software/overview/) users ingest and export data in near real time,
so that Redis becomes part of their data fabric without additional integration efforts.

RDI currently supports the following scenarios:

- [**Ingest**]({{<relref "/rdi/quickstart/ingest-guide">}}): RDI mirrors the application primary database to Redis using a Capture Data Change (CDC) tool. RDI transforms the database model and types to Redis model and types. This scenario is useful when the application database is not performant and scalable enough to serve the read queries. RDI helps offloading all read queries to Redis.
- [**Write-behind**]({{<relref "/rdi/quickstart/write-behind-guide">}}): Data changes in Redis are applied by RDI to one or more downstream data stores. RDI can map and transform the Redis types and model to the downstream types and models. This scenario is useful when the application needs fast writes and reads for some of the queries, but has to provide data to other downstream services that need them in different models for other uses.

Read [here]({{<relref "/rdi/architecture">}}) for more details and architecture.

## Supported sources (ingest)

Redis Data Integration supports the following database sources using [Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html) connectors:

| Database       | Versions               |
| -------------- | ---------------------- |
| Oracle         | 12c, 19c, 21c          |
| MariaDB        | >= 10.5                |
| MySQL          | 5.7, 8.0.x             |
| Percona XtraDB | 5.7, 8.0.x             |
| Postgres       | 10, 11, 12, 13, 14, 15 |
| SQL Server     | 2017, 2019             |

## Supported targets (write-behind)

| Database   |
| ---------- |
| Oracle     |
| MariaDB    |
| MySQL      |
| Postgres   |
| SQL Server |
| Cassandra  |

## Features

RDI is an enterprise grade product with an extensive set of features:

### Performance and scalability

- Up to 2 seconds from source to target
- Multi shard support (each shard supports 28K ops/sec)

### Resiliency, high availability, and data delivery guarantees

- At least once guarantee end to end
- Data in transit is replicated to replica shard
- Data persistence ([Redis AOF](https://redis.io/docs/management/persistence/))
- Back-pressure mechanism preventing cascading failure
- Reconnect on failure and write retries

### Developer tools and data transformation

- Declarative data filtering, mapping and transformations
- Support for SQL and [JMESPath](https://jmespath.org/) expressions in transformations
- Additional JMESPath custom functions simplifying transformation expressions
- Transformation jobs validation
- Zero downtime pipeline reconfiguration
- Hard failures routing to _dead-letter queue_ stream for troubleshooting
- Trace tool

### Operator tools and lifecycle management

- CLI with built-in help and validations
- Installation using CLI
- Zero downtime upgrade of RDI
- Status tool for health and data provenance
- Monitoring using [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/)
