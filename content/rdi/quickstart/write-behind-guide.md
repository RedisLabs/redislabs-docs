---
Title: Write-behind quickstart
linkTitle: Write-behind
description: Get started creating a write-behind pipeline
weight: 40
alwaysopen: false
categories: ["redis-di"]
aliases: 
draft: 
hidden: false
---

This guide takes you through the creation of a write-behind pipeline.

> Note: Write Behind is currently in Preview.

## Concepts

**Write-behind**: An RDI policy and pipeline to synchronize the data in a Redis DB with some downstream data store.
You can think about it as a pipeline that starts with change data capture (CDC) events for a Redis database and then filters, transforms, and maps the data to the target data store data structure.

**Target**: The data store to which the write-behind pipeline connects and writes data.

**Jobs**: The write-behind pipeline is composed of one or more jobs. Each job is responsible for capturing change for one key pattern in Redis and mapping it to one or more tables in the downstream data store. Each job is defined in a YAML file.

![Write-behind architecture](/images/rdi/redis-di-write-behind.png)

## Supported data stores

RDI write-behind currently supports these target data stores:

| Data Store |
| ---------- |
| Cassandra  |
| MariaDB    |
| MySQL      |
| Oracle     |
| PostgreSQL |
| SQL Server |

## Prerequisites

The only prerequisite for running RDI write-behind is [Redis Gears Python](https://redis.com/modules/redis-gears/) >= 1.2.6 installed on the Redis Enterprise Cluster and enabled for the database you want to mirror to the downstream data store.
For more information, see [Redis Gears installation]({{<relref "/rdi/installation/install-redis-gears">}}).

## Preparing the write-behind pipeline

- Install [RDI CLI]({{<relref "/rdi/installation/install-rdi-cli">}}) on a Linux host that has connectivity to your Redis Enterprise Cluster.
- Run the [`configure`]({{<relref "/rdi/reference/cli/redis-di-configure">}}) command to install the RDI Engine on your Redis database, if you have not used this Redis database with RDI write-behind before.
- Run the [`scaffold`]({{<relref "/rdi/reference/cli/redis-di-scaffold">}}) command with the type of data store you want to use, for example:

  ```bash
  redis-di scaffold --strategy write_behind --dir . --db-type mysql
  ```

  This creates a template of `config.yaml` and a folder named `jobs` under the current directory.
  You can specify any folder name with `--dir` or use the `--preview config.yaml` option, if your RDI CLI is deployed inside a K8s pod, to get the `config.yaml` template to the terminal.

- Add the connections required for downstream targets in the `connections` section of `config.yaml`, for example:

  ```yaml
  connections:
    my-postgres:
      type: postgresql
      host: 172.17.0.3
      port: 5432
      database: postgres
      user: postgres
      password: postgres
      #query_args:
      # sslmode: verify-ca
      # sslrootcert: /opt/work/ssl/ca.crt
      # sslkey: /opt/work/ssl/client.key
      # sslcert: /opt/work/ssl/client.crt
    my-mysql:
      type: mysql
      host: 172.17.0.4
      port: 3306
      database: test
      user: test
      password: test
      #connect_args:
      # ssl_ca: /opt/ssl/ca.crt
      # ssl_cert: /opt/ssl/client.crt
      # ssl_key: /opt/ssl/client.key
  ```

  This is the first section of the `config.yaml` and typically the only one to edit. The `connections` section is designated to have many **target** connections. In this example we have two downstream connections named `my-postgres` and `my-mysql`.

  To obtain a secured connection using TLS, you can add more `connect_args` or `query_args` (depending on the specific target database terminology) to the connection definition.

  The name can be any arbitrary name as long as it is:

  - Unique for this RDI engine.
  - Referenced correctly by the jobs in the respective YAML files.

In order to prepare the pipeline, fill in the correct information for the target data store. Secrets can be provided through reference to a secret ([see below](#how-to-provide-targets-secrets)) or by specifying a path.

The `applier` section has information about the batch size and frequency used to write data to the target.

Some of the applier attributes such as `target_data_type`, `wait_enabled`, and `retry_on_replica_failure` are specific for the RDI ingest pipeline and can be ignored.

### Write-behind jobs

Write-behind jobs are a mandatory part of the write-behind pipeline configuration.
Under the `jobs` directory (parallel to `config.yaml`) you should have a job definition in a YAML file per every key pattern you want to write into a downstream database table.

The YAML file can be named using the destination table name or another naming convention, but has to have a unique name.

Job definition has the following structure:

```yaml
source:
  keyspace:
    pattern: emp:*
    exclude-commands: ["json.del"]
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

### Source section

The `source` section describes the source of data change events in Redis:

- The `pattern` attribute specifies the pattern of Redis keys to listen on. The pattern has to correspond to keys that are of Hash or JSON value.

- The `exclude-commands` attribute specifies which commands not to act on. For example, if you listen on key pattern that has Hash values, you can exclude the `HDEL` command so no deletions of data will propagate to the downstream database. If you don't specify this attribute, RDI write-behind acts on all relevant commands.

- The `row_format` attribute can be used with the `full` value in order to receive both the `before` and `after` sections of the payload. Note that for Write Behind events the `before` value of the key is never provided.

 > Note: RDI write-behind does not support the [`Expired`](https://redis.io/docs/manual/keyspace-notifications/#events-generated-by-different-commands) event. Therefore, keys that are expired in Redis will not be deleted from the target database automatically.

### Output section

The `output` section is critical. It specifies a reference to a connection from the `config.yaml` `connections` section:

- The `uses` attribute specifies the type of **writer** RDI Write Behind will use to prepare and write the data to the target.
  In this example, it is `relational.write`, a writer that translates the data into a SQL statement with the specific dialect of the downstream relational database.
  For a full list of supported writers, look [Data transformation block types]({{<relref "/rdi/reference/data-transformation-block-types">}}).

- The `schema` attribute specifies the schema/db to use (different database have different name for schema in the object hierarchy).

- The `table` attribute specifies the downstream table to use.

- The `keys` section specifies the field(s) in the table that are the unique constraints in that table.

- The `mapping` section is optional and used to map a subset of the fields in the Redis hash or JSON document to the columns that will be written to the target table.

### Apply filters and transformations to write-behind

The RDI Write Behind jobs can apply filters and transformations to the data before it is written to the target. Specify the filters and transformations under the `transform` section.

#### Filters

Use filters to skip some of the data and not apply it to target.
Filters can apply simple or complex expressions that take as arguments, the Redis entry key, fields and even the change op code (create, delete, update, etc.).
See [Filter]({{<relref "/rdi/reference/data-transformation-block-types/filter">}}) for more information about filters.

#### Transformations

Transformations manipulate the data in one of the following ways:

- Renaming a field
- Adding a field
- Removing a field
- Mapping source fields to use in output

To learn more about transformations, see [Data transformation pipeline]({{<relref "/rdi/data-transformation/data-transformation-pipeline">}}).

## Provide target's secrets

The target's secrets (such as TLS certificates) can be read from a path on the Redis Nodes file system. This allows the consumption of secrets injected from secret stores.

## Deploy the write-behind pipeline

To start the pipeline, run the [`deploy`]({{<relref "/rdi/reference/cli/redis-di-deploy">}}) command:

```bash
redis-di deploy
```

You can check that the pipeline is running, receiving, and writing data, using the [`status`]({{<relref "/rdi/reference/cli/redis-di-status">}}) command:

```bash
redis-di status
```

## Monitor the write-behind pipeline

The RDI write-behind pipeline collects the following metrics:

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

- Run the [`status`]({{<relref "/rdi/reference/cli/redis-di-status">}}) command:

  ```bash
  redis-di status
  ```

- Scrape the metrics using RDI Prometheus exporter

## Upgrading

If you need to upgrade RDI, you should use the [`upgrade`]({{<relref "/rdi/reference/cli/redis-di-upgrade">}}) command that provides zero downtime upgrade:

```bash
redis-di upgrade ...
```

See the [Upgrade guide]({{<relref "/rdi/upgrade">}}) for more information.
