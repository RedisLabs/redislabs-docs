---
Title: Write behind quick start guide
linkTitle: Write behind
description:
weight: 75
alwaysopen: false
categories: ["redis-di"]
aliases: 
draft: true
---

This guide will take you through the creation of a Write Behind Pipeline.

## Concepts

**Write Behind**: Is RDI policy and pipeline to synchronize the data in a Redis DB with some downstream data store.
You can think about it as a pipeline that starts with Capture Data Change (CDC) events for a Redis DB and then filters, transforms and maps the data to the target data store data structure.

**Target**: The target is the data store to which Write Behind Pipeline will connect and write data.

**Jobs**: The Write Behind Pipeline is composed of one or more jobs. Each job is responsible for capturing change for one key pattern in Redis and mapping it to one or more tables in the downstream data store. Each Job is defined in a YAML file.

![Write Behind Architecture](images/architecture/redis-di-write-behind.png)

## Supported Data Stores

RDI Write Behind is currently supporting the following target data stores:

| Data Store |
| ---------- |
| Cassandra  |
| IBM Db2    |
| MariaDB    |
| MongoDB    |
| MySQL      |
| Oracle     |
| PostgreSQL |
| SQL Server |

## Prerequisites

The only prerequisite for running RDI Write Behind is having [Redis Gears Python](https://redis.com/modules/redis-gears/) {{ site.redis_gears_min_version }} installed on the Redis Enterprise Cluster and enabled for the DB you want to mirror to the downstream data store.
Read [here](installation/install-redis-gears.md) about Redis Gears installation.

## Preparing the Write Behind Pipeline

- Install [RDI CLI](index.md#install-redis-data-integration-cli) on a linux host that has connectivity to your Redis Enterprise Cluster.
- Run the [`scaffold`](reference/cli/redis-di-scaffold.md) command with the type of data store you want to use:

  ```bash
  redis-di scaffold wb
  ```

  This will create a template of `config.yaml` and a folder named `jobs`.

- Configure the `config yaml` file:

  ```yaml
  connections:
    # Redis target DB connection details
    # This section is for configuring the Redis database to which Redis Data Integration will write the processed data
    redis-data:
      # Host of the Redis database to which Redis Data Integration will write the processed data
      host: localhost
      # Port for the Redis database to which Redis Data Integration will write the processed data
      port: 12000
      #password: <REDIS_TARGET_DB_PASSWORD>
      # In case of secured password
      #password: ${secrets:target-password}
      # TLS
      # Private key file to authenticate with
      #key: /path/to/key
      # Client certificate file to authenticate with
      #cert: /path/to/cert
      # CA certificate file to verify with
      #cacert: /path/to/cacert
  applier:
    # Interval (in seconds) on which to perform retry on failure (default: 5)
    #on_failed_retry_interval: <RETRY_INTERVAL_IN_SEC>
    # The batch size on which data will be written to target (default: 100)
    #batch: <BATCH_SIZE>
    # Interval (in ms) in which data will be written to target even if batch size was not reached (default: 100)
    #duration: <DURATION_IN_MS>
    # Error handling strategy: ignore - skip, dlq - store rejected messages in a dead letter queue (default: ignore)
    error_handling: dlq
    # Dead letter queue max messages per stream (default: 1000)
    dlq_max_messages: 100
    # Target data type: hash/json - RedisJSON module must be in use in the target DB (default:hash)
    #target_data_type: <TARGET_DATA_TYPE>

    # Checks if the batch has been written to the replica shard (default: false)
    #wait_enabled: <WAIT_ENABLED>
    # Ensures that a batch has been written to the replica shard and keeps retrying if not (default: true)
    #retry_on_replica_failure: <RETRY_ON_REPLICA_FAILURE>
  ```

  This is the first section of the `config.yaml` and typically the only one to edit. The `connections` section is designated to have many **target** connections. In this example we have one downstream connection named `redis-data`.

  The name can be any arbitrary name as long as it is:

  - Unique for this RDI Engine.
  - Referenced correctly by the jobs in the respective YAML files.

In order to prepare the pipeline, fill in the correct information for the target data store. Secrets can be provided through reference to a secret ([see below](#how-to-provide-targets-secrets)) or by specifying a path.

The `applier` section has information about the batch size and frequency used to write data to the target.

Some of the applier attributes such as: `target_data_type`, `wait_enabled` & `retry_on_replica_failure` are specific for RDI Ingest Pipeline and can be ignored.

### Using Jobs

Write Behind Jobs are a mandatory part of the Write Behind Pipeline configuration.
Under the `jobs` directory (parallel to `config.yaml`) you should have a job definition in a YAML file per every key pattern you want to write into a downstream database table.

he YAML file can be named using the destination table name or another naming convention, but has to have a unique name.

Job definition has the following structure:

```yaml
source:
  keyspace:
    pattern: emp:*
    exclude-commands: ["json.del"]
  row_format: full
transform:
  - uses: rename_field
    with:
      from_field: after.country
      to_field: after.my_country
output:
  - uses: relational.write
    with:
      connection: my-connection
      schema: my-schema
      table: my-table
      keys:
        - first_name
        - last_name
      mapping:
        - first_name
        - last_name
        - address
        - gender
```

### The Source Section

The `source` section describes the source of data change events in Redis:

- The `pattern` attribute specifies the pattern of Redis keys to listen on. The pattern has to correspond to keys that are of Hash or JSON value.

- The `exclude-commands` attribute specifies which commands not to act on. For example, if you listen on key pattern that has Hash values, you can exclude the `HDEL` command so no deletions of data will propagate to the downstream database. If you don't specify this attribute, RDI Write Behind will act on all relevant commands.

- The `row_format` attribute can be used with the `full` value in order to receive both the `before` and `after` sections of the payload. Note that for Write Behind events the `before` value of the key is never provided.

### The Output Section

The `output` section is critical. It specifies a reference to a connection from the `config.yaml` `connections` section:

- The `uses` attribute specifies the type of **writer** RDI Write Behind will use to prepare and write the data to the target.
  In this example, it is `relational.write`, a writer that translates the data into a SQL statement with the specific dialect of the downstream relational database.
  For a full list of supported writers, look [here](reference/data-transformation-block-types).

- The `schema` attribute specifies the schema/db to use (different database have different name for schema in the object hierarchy).

- The `table` attribute specifies the downstream table to use.

- The `keys` section specifies the field(s) in the table that are the unique constraints in that table.

- The `mapping` section is optional and used to map a subset of the fields in the Redis Hash or JSON document to the columns that will be written to the target table.

### Apply Filters & Transformations to Write Behind

The RDI Write Behind jobs can apply filters and transformations to the data before it is written to the target. Specify the filters and transformations under the `transform` section.

#### Filters

Use filters to skip some of the data and not apply it to target.
Filters can apply simple or complex expressions that take as arguments, the Redis entry key, fields and even the change op code (create, delete, update, etc.).
Read [here](reference/data-transformation-block-types/filter.md) for more information about filters.

#### Transformations

Transformations manipulate the data in one of the following ways:

- Renaming a field
- Adding a field
- Removing a field
- Mapping source fields to use in output

To learn more about transformations, read [here](data-transformation/data-transformation-pipeline.md).

## How to Provide Target's Secrets

Target's secrets (e.g. TLS certificate) can be read from a path on the Redis Nodes file system. This allows to consume secrets injected from secret stores.

## Deploying the Write Behind Pipeline

Starting the pipeline is done by running the [`deploy`](reference/cli/redis-di-deploy.md) command:

```bash
redis-di deploy
```

You can check that the pipeline is running, receiving and writing data, using the [`status`](reference/cli/redis-di-status.md) command:

```bash
redis-di status
```

## Monitoring the Write Behind Pipeline

RDI Write Behind Pipeline collects the following metrics:

| Metric Description                  | Metric in [Prometheus](https://prometheus.io/)                                                      |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| Total incoming events by stream     | Calculated as a Prometheus DB query: `sum(pending, rejected, filtered, inserted, updated, deleted)` |
| Created incoming events by stream   | `rdi_metrics_incoming_entries{data_source:"…",operation="inserted"}`                                |
| Updated incoming events by stream   | `rdi_metrics_incoming_entries{data_source:"…",operation="updated"}`                                 |
| Deleted incoming events by stream   | `rdi_metrics_incoming_entries{data_source:"…",operation="deleted"}`                                 |
| Filtered incoming events by stream  | `rdi_metrics_incoming_entries{data_source:"…",operation="filtered"}`                                |
| Malformed incoming events by stream | `rdi_metrics_incoming_entries{data_source:"…",operation="rejected"}`                                |
| Total events per stream (snapshot)  | `rdi_metrics_stream_size{data_source:""}`                                                           |
| Time in stream (snapshot)           | `rdi_metrics_stream_last_latency_ms{data_source:"…"}`                                               |

To use the metrics you can either:

- Run the [`status`](reference/cli/redis-di-status.md) command:

  ```bash
  redis-di status
  ```

- Scrape the metrics using RDI Prometheus exporter

## Upgrading

If you need to upgrade RDI, you should use the `upgrade` command that provides zero downtime upgrade:

```bash
redis-di upgrade ...
```

Read [here](upgrade/upgrade-guide.md) about upgrade.
