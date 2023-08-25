---
Title: F.A.Q.
linkTitle: FAQ
description: Questions and answers about RDI
weight: 70
alwaysopen: false
categories: ["redis-di"]
aliases:
---

## General

**WHich use cases are supported by RDI?**
RDI supports two use cases: ingest and write-behind.
Ingest is used to keep Redis in sync with the application system of record database so that read queries can be done in speed and at scale from Redis.
Write behind is used to speed up application reads and writes using Redis as the front-end database while asynchronously updating a downstream database.
**Is RDI available as part of Redis Cloud?**
RDI is currently available as a self-managed product. This means you will need to install RDI engine and Debezium Server on hosts or K8s pods that you manage. However, RDI can write data to a Redis CLoud target.
**Is RDI available for open source Redis?**
RDI only works with Redis Enterprise.
**What is the minimal version of Redis Enterprise for running RDI?**
The minimal version is 6.2.18
**What are the pre-requisites for running RDI?**
RDI requires RedisGears 1.2.6 installed on the Redis Enterprise cluster. RDI can install RedisGears for you.
For more specific requirements per use case, see the `Ingest` and `Write Behind` sections of this document.

## Ingest

**What are the RDI prerequisites for the ingest use case?**
RDI will need the following to run the ingest use case:

- Redis Gears 1.2.6 installed on the Redis Enterprise cluster.
- A virtual machine or two (for high-availability) to run the Debezium Server. Alternatively, Debezium Server can run as a Kubernetes pod.
- A target Redis database to which RDI will write the data.
- The RDI CLI can run on any host that can access the RDI redis database using RESP connection.

**Does RDI requires its own Redis database in the ingest scenario?**
RDI provisions a one or two shard Redis database. This Redis database is used as a staging database where RDI receives data from Debezium Server, process it and writes it to the target Redis database. The RDI database is typically very small, up to 1GB of RAM in size (see the sizing section).
**Does RDI need access to the Redis Enterprise cluster REST API?**
RDI uses the cluster API only for the creation and removal of the RDI Redis database. If you don't want RDI to access the cluster API, you can create the RDI database via the Redis Enterprise GUI or you can start the RDI installation using the `redis-di configure` command. RDI doesn't require the cluster API for any other command.
**Is RDI suitable for synchronization with an active database?**
RDI is designed for synchronization with a live database (where data is being updated). RDI uses Debezium Server to get all the required existing data from the database and to track changes to data in near real-time. This is why Debezium Server is called a Change Data Capture (CDC) server. CDC products use the database binlog directly or via APIs to track committed changes to the data.
**What pace of changes can RDI deal with?**
RDI can process around 20,000 records per second end to end. This is typically much faster than the speed of changes introduced to the source database.
**How does RDI translate the data from source to Redis?**
RDI has several levels of data translation and transformation. RDI will translate each value in the database record to a string or number based on the reported Debezium type. For more information look at {{<relref "/rdi/data-transformation/data-type-handling.md">}}.
In addition to these simple conversions, the user can choose the Redis data type to use at the target (Hash, JSON, String, Set, Sorted Set, Stream). (field names, Redis key) and the data (add fields, remove fields, calculater fields) using declarative transformations. Finally the user can denormalize data from several source records into a composite JSON document at the target.
**Can one source record create more than one target key?**
RDI is capable of mapping a source record to several different keys (of any type) at the target. In addition, RDI allows for more than one Redis database target (each one can reside in a different cluster).

## Write-behind

## Sizing

## Operations

**How do I manage RDI?**
RDI can be fully managed from its CLI.

**Can I change the  RDI pipeline without downtime?**
Yes. RDI deployment of a pipeline configuration is done without any downtime.

**How do I upgrade RDI?**
RDI upgrade is done by upgrading the CLI (using a command) and then upgrading the engine business logic. RDI upgrade is done with cascading shard restarts, so no data is lost and no downtime is involved.

**How do I perform RDI healthcheck?**
RDI CLI has the `redis-di status` command. This command gives a snapshot of the health of an RDI deployment. If you run it in live mode, It provides a dynamic dashboard of data flow and processing.



## Misc

**Is RDI supported?**
RDI comes with full support by Redis (the company) including full support for Debezium Server.
