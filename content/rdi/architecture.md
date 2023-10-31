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

Redis Data Integration (RDI) is a product that helps Redis Enterprise users ingest and export data in near real time.

- End to end solution; no need for additional tools and integrations
- Capture Data Change (CDC) included
- Covers most popular databases as sources and targets
- Declarative data mapping and transformations; no custom code needed
- Data delivery guaranteed (at least once)
- Zero downtime day two operations (reconfigure and upgrade)

RDI currently supports two use cases:

- Ingest (cache prefetch)
- Write-behind

## Architecture overview

![RDI components](/images/rdi/rdi-components.png)

RDI has several components, all of them deployed outside of the Redis Enterprise cluster. In addition RDI uses a small Redis database inside the cluster for staging data and storing state.

RDI can be deployed as a K8s deployment or on two VMs.

### RDI operator

RDI operator is the main control plane component. It is in charge of spinning, configuring and watching RDI data plane components.

### RDI collectors

For the ingest scenario RDI operator will create and configure a collector. RDI collector is in charge of fetching a baseline snapshot of the source data and then tracking the data changes at the source.
Currently, RDI comes with one type of collector, the `RDI Debezium Collector`. This collector is an orchestrated [Debezium Server](https://debezium.io/).

### RDI stream processor

In all use cases, the RDI stream processor is the main processor of data:

- Reading collector supplied data from Redis streams.
- Applying transformations in order to translate the data from other models to Redis model (ingest) or vice versa from Redis to another model (write-behind).
- Connect to the target database / datastore and apply the data changes.

For more information about RDI jobs and transformations, read the data transformation section of these docs.
For a list of targets see the specific ingest and write behind sections below.

### RDI metrics exporter

The RDI metrics exporter is a prometheus exporter that allows [prometheus](https://prometheus.io/) to scrape metrics measuring data processing and performance.

### RDI API server

The RDI API server exposes REST endpoints of RDI API.

### RDI CLI

The RDI CLI provides a user interface to manage RDI. It uses the RDI API.


## Ingest functionality and architecture

You can think of RDI Ingest as a streaming ELT process, where

- Data is **E**xtracted from the source database using RDI Debezium Collector - an orchestrated [Debezium Server](https://debezium.io/)
- Data is then **L**oaded into RDI DB, a Redis database instance that keeps the data in [Redis streams](https://redis.io/docs/manual/data-types/streams/) alongside required metadata.
- Data is then **T**ransformed using RDI Stream Processor and written to the target Redis database.

RDI using Debezium Server works in two modes:

1. Initial sync - where a snapshot of the entire database or a subset of selected tables is used as a baseline. The entire dataset is streamed to RDI and then transformed and written into the target Redis database.
2. Live updates - where Debezium captures changes to the data that happen after the baseline snapshot and streams them to RDI where they are transformed and written to the target.

![RDI data flow diagram](/images/rdi/rdi-ingest-data-flow.png)


### Supported data transformations

#### Model mapping

RDI supports conversion of a database record into the following Redis types:

- [Hash](https://redis.io/docs/data-types/hashes/)
- [JSON](https://redis.io/docs/data-types/json/)
- [Set](https://redis.io/docs/data-types/sets/)
- [Sorted Set](https://redis.io/docs/data-types/sorted-sets/)
- [Stream](https://redis.io/docs/data-types/streams/)
- [String](https://redis.io/docs/data-types/strings/)

Each column in the record is automatically formatted as a number or string. See the [data types list]({{<relref "/rdi/reference/data-types-conversion">}}) for the exact mappings.

#### Additional transformations

RDI supports declarative transformations to further manipulate the data, including denormalization of data from several records into a single JSON key in Redis. To learn more, see the [data transformation]({{<relref "/rdi/data-transformation/">}}) section.


### Secrets handling

RDI components requires access to secrets in order to access the source database (collector), the rdi database (collector, stream processor, operator, metrics exporter and API server) and the target database (stream processor).

RDI never keeps secrets in configuration files, instead secrets can be injected or pulled in the following ways:


### Scalability and high availability

RDI is highly available:
When deployed on Kubernetes, RDI components are all stateless pods managed by Kubernetes and the RDI operator.
When deployed on VMs, RDI use one VM as a failover (active-passive topology) with identical set of stateless components on each VM and an operator using a `Redlock` mechanism to ensure he owns the active set of RDI components.

All RDI state is stored in highly available manner using Redis database high availability and Kubernetes etcd.

RDI is scalable:

- Data is distributed to streams based on number of tables or even based on primary key.
- During initial load (ingesting the baseline snapshot) RDI stream processor can span multiple processes each one processing some of the data streams.

### Deployment

RDI can be deployed on Kubernetes or on VMs:

- On Kubernetes, RDI works as a Kubernetes deployment managed by RDI operator. RDI operator is a pod watched by the cluster and responsible for orchestrating the other RDI components.
- On VMs, RDI is deployed on two VMs. Each VM has an RDI operator that can orchestrate the other RDI components. At any given time a single RDI orchestrator is the primary and hence this VM is the active part of the deployment. On the other VM the orchestrator stops the RDI components and they do not run.
![rdi active passive](/images/rdi/rdi-active-passive.png)

## Write-behind functionality and architecture

RDI write-behind allows integration between Redis Enterprise (as the source of changes to data) and downstream databases or datastores.
RDI captures the changes to a selected set of key patterns in a Redis keyspace and asynchronously writes them in small batches to the downstream database, so the application doesn't need to take care of remodeling the data or managing the connection with the downstream database.

RDI write-behind can normalize a key in Redis to several records in one or more tables at the target.
To learn more about write-behind declarative jobs and normalization, see the [write-behind quick start guide]({{<relref "/rdi/quickstart/write-behind-guide.md">}})

### Write-behind topology

RDI's CLI and components come in one edition that can run both ingest and write-behind. However, the topology for write-behind is different.

- RDI Redis collector - This component run on RedisGears inside the application Redis database. It captures data change events and writes them into Redis streams.
- RDI stream processor - reads and process the data in the streams the same way it does for ingest data, however there are 2 main differences:
  - RDI needs a job to be deployed in order to know how to map the data to a target table(s)
  - RDI will use a specific writer (In most cases `relational.write`) in order to connect and apply the changes to the target.

### Model translation

RDI write-behind can track changes to the following Redis types:

- [Hash](https://redis.io/docs/data-types/hashes/)
- [JSON](https://redis.io/docs/data-types/json/)
- [Set](https://redis.io/docs/data-types/sets/)
- [Sorted Set](https://redis.io/docs/data-types/sorted-sets/)

Unlike the ingest scenario, write-behind has no default behavior for model translation. It is up to the user to create a declarative job, specifying the mapping between Redis keys and target database records.
The job `keys` and `mapping` sections help make this an easy task.
