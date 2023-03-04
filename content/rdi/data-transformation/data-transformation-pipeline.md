---
Title: Data transformation pipeline
linkTitle: Data transformation pipeline
description: Learn how to transform data to Redis types
weight: 20
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Redis Data Integration's Data Transformation allows users to transform their data beyond the default translation of source types to Redis types. The transformation involves no coding! Instead it is described in a set of human readable YAML files, one per source table.

The ingested format and types are different from one source to another. Currently, the only supported source is [Debezium](https://debezium.io/). The first transformation from Debezium types to a naive JSON with Redis types is done automatically without any need for user instructions. Then, this JSON is passed on to the user defined transformation pipeline

Each job describes the transformation logic to perform on data from a single source. The source is typically a database table or collection and is specified as the full name of this table/collection. The job may include a filtering logic, to skip data that matches a condition. Other logical steps in the job will transform the data into the desired output that will be stored in Redis (as Hash or JSON).

![High-level data transformation pipeline](/images/rdi/pipeline.png)

## Jobs

Each job will be in a separate YAML file. All of these files will be uploaded to Redis Data Integration using the `deploy` command (see [below](#deploy-configuration)). If you are using the [scaffold]({{<relref "/rdi/quickstart/ingest-guide#scaffold-configuration-files">}}) command, place the job files under the `jobs` folder.

### Job YAML Structure

#### Fields

- `source`:

  This section describes what is the table that this job works on:

  - `server_name`: logical server name (optional)
  - `db`: DB name (optional)
  - `schema`: DB schema (optional)
  - `table`: DB table
  - `row_format`: Format of the data to be transformed: data_only (default) - only payload, full - complete change record

- `transform`:

  This section includes a series of blocks that the data should go through.
  See documentation of the [supported blocks](../reference/data-transformation-block-types.md) and [JMESPath custom functions](../reference/jmespath-custom-functions.md).

- `output`:

  This section includes the outputs where the data should be written to:

  - Cassandra:
    - `uses`: `cassandra.write`: Write into a Cassandra data store
    - `with`:
      - `connection`: Connection name
      - `keyspace`: Keyspace
      - `table`: Target table
      - `keys`: Array of key columns
      - `mapping`: Array of mapping columns
      - `opcode_field`: Name of the field in the payload that holds the operation (c - create, d - delete, u - update) for this record in the DB
  - Redis:
    - `uses`: `redis.write`: Write to a Redis data structure
    - `with`:
      - `connection`: Connection name
      - `key`: This allows to override the key of the record by applying a custom logic:
        - `expression`: Expression to execute
        - `langauge`: Expression language, JMESPath or SQL
  - SQL:
    - `uses`: `relational.write`: Write into a SQL-compatible data store
    - `with`:
      - `connection`: Connection name
      - `schema`: Schema
      - `table`: Target table
      - `keys`: Array of key columns
      - `mapping`: Array of mapping columns
      - `opcode_field`: Name of the field in the payload that holds the operation (c - create, d - delete, u - update) for this record in the DB

#### Notes

- `source` is required.
- Either `transform` and `key` (or both) should be specified.

### Example

This example shows how to rename a certain field (`fname` to `first_name`) in a given table (`emp`) using the `rename_field` block. It also demonstrates how to set the key of this record instead of relying on the default logic.

redislabs.dbo.emp.yaml

```yaml
source:
  server_name: redislabs
  schema: dbo
  table: emp
transform:
  - uses: rename_field
    with:
      from_field: fname
      to_field: first_name
output:
  - uses: redis.write
    with:
      connection: target
      key:
        expression: concat(['emp:fname:',fname,':lname:',lname])
        language: jmespath
```

### Deploy Configuration

In order to deploy your jobs to the remote RDI database, run:

```bash
redis-di deploy
```

### Deploy Configuration on Kubernetes

If the RDI CLI is deployed as a pod in a Kubernetes cluster, then these steps are needed for deploying your jobs:

- Create a ConfigMap from the YAML files in your `jobs` folder:

  ```bash
  kubectl create configmap redis-di-jobs --from-file=jobs/
  ```

- Deploy your jobs:

  ```bash
  kubectl exec -it pod/redis-di-cli -- redis-di deploy
  ```

> Note: There will be a delay between creating/modifying the ConfigMap and its availability in the `redis-di-cli` pod. You should wait for around 30 seconds before running the `redis-di deploy` command.

There are two options for updating the ConfigMap:

- For smaller changes, you can edit the ConfigMap directly with this command:

  ```bash
  kubectl edit configmap redis-di-jobs
  ```

- For bigger changes (e.g. the addition of another job file), edit files in your local `jobs` folder and then run this command:

  ```bash
  kubectl create configmap redis-di-jobs --from-file=jobs/ --dry-run=client -o yaml | kubectl apply -f -
  ```

You need to run `kubectl exec -it pod/redis-di-cli -- redis-di deploy` after updating the ConfigMap with either option.
