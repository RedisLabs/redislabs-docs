---
Title: Redis Data Integration architecture and components
linkTitle: Architecture & components
description: Describes the architecture and components of Redis Data Integration
weight: 10
alwaysopen: false
categories: ["Connect"]
aliases: /connect/architecture/
         /connect/architecture.md
---

Redis Data Integration relies on a variety of components, as shown in the following figure:

{{<image filename="images/connect/redis-connect-architecture.png" alt="Redis Data Integration architecture and components" width="75%">}}{{< /image >}}

For Preview, Redis Data Integration uses [Debezium](https://debezium.io/) to load source data into a Redis Data Integration instance as [Redis Streams](https://redis.io/docs/manual/data-types/streams/).

Currently, Redis Data Integration uses the [Debezium Redis Sink Connector](https://debezium.io/documentation/reference/stable/operations/debezium-server.html#_redis_stream).  Future plans include support for additional connectors and a related SDK.

Once data in loaded into the Redis Data Integration instance, [RedisGears recipes](https://developer.redis.com/howtos/redisgears/) transform it into a format appropriate to the target Redis database.

Currently, incoming database rows are transformed into [Redis hashes](https://redis.io/docs/manual/data-types/#hashes) that incorporate the original table name into key names.  Future updates will add additional transformations, such as [RedisJSON documents](https://redis.io/docs/stack/json/).

{{<note>}}This information describes features currently in preview.  Behavior may change before general availability.{{</note>}}

## Data transformation engine

The Redis Data Integration data transformation engine uses RedisGears to perform two major functions:

- Data transformation

    The Redis Data Integration Preview uses Debezium to extract data from relational database sources.  
    
    Future versions will support additional data serialization options, such as [Apache Avro](https://avro.apache.org/), and denormalized data modules or sources
    
- Writing data

    As Redis Data Integration writes data to the target database, it ensures order and prevents data loss.  In addition, writers can be configured to ignore, reject, or retain individual data entities.

## Credentials and secrets

Redis Data Integration requires the following credentials and secrets:

- The Redis Data Integration data transformation engine requires the credentials and certificate to connect and write encrypted data to the target Redis database

- The Debezium Redis Sink Connector requires the credentials and certificate to connect and write data into the Redis Data Integration database

- The Debezium Source Connector requires read access to the source database, including related secrets

- Redis Data Integration CLI requires any certificates needed to connect to the Redis Enterprise cluster. 

    To run the `create` command, Redis Data Integration CLI requires the credentials of a privileged user.  These credentials are not cached or stored

There are several ways to provide required credentials and certificates:

- You can enter them manually when using Redis Data Integration CLI

- Store them as environment variables

- Leverage a key management service, such as Google Cloud [Key Management](https://cloud.google.com/security-key-management), Microsoft Azure [Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/), [HashiCorp Vault](https://www.hashicorp.com/products/vault), [and others](https://en.wikipedia.org/wiki/Key_management)
  

## Scalability and availability

Redis Data Integration is highly available:

- Debezium Server is deployed using [Kubernetes](https://kubernetes.io/) or [Pacemaker](https://clusterlabs.org/pacemaker/), which enables failover between stateless instances while securing state information in Redis

- Redis Data Integration relies on Redis Enterprise high availability mechanisms, such as replica shards, cluster configuration, and so on

- Horizontal scalability is handled by splitting incoming data streams across multiple shards and writing updates in parallel.  The original table order is retained.


## Tested topologies

Redis Data Integration runs on Redis Enterprise, which means it works on any deployment, whether "bare metal," virtual machines (VMs), or containers.  Redis Data Integration can run on the same cluster as the target Redis database or update a database stored on a separate cluster.

Debezium Server should run in "warm standby" [high availability](https://en.wikipedia.org/wiki/High_availability_software).  We recommend one of the following:

- Run using two VMs in an active-passive configuration.

    Failover should be orchestrated by a high availability resource manager, such as  [Pacemaker](https://clusterlabs.org/pacemaker/doc/)

- Run as a [Kubernetes pod](https://en.wikipedia.org/wiki/Kubernetes#Pods) where Kubernetes monitors pod activity (liveliness and readiness) and recovers non-functioning pods

    Note that Redis Data Integration stores state information in the Redis Data Integration instance.  No state information is stored at the connector level.  