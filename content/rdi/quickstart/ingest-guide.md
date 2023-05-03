---
Title: Ingest quickstart
linkTitle: Ingest
description: Get started creating an ingest pipeline
weight: 30
alwaysopen: false
categories: ["redis-di"]
aliases: 

---

This guide will take you through the creation of a write-behind pipeline.


## Prerequisites

- Install [RDI CLI]({{<relref "/rdi/installation/install-rdi-cli">}}).
- An existing Redis Enterprise cluster version >= 6.2.
- [RedisGears](https://redis.com/modules/redis-gears/) >= 1.2.5 installed on the cluster. In case it's missing, see [Install RedisGears for Redis Data Integration]({{<relref "/rdi/installation/install-redis-gears">}}) to install.
- A target Redis database (can be added after installation).

## Create a new RDI database

Run `create` command to set up a new Redis Data Integration database instance within an existing Redis Enterprise Cluster:

```bash
redis-di create
```

The `create` command will create a BDB named `redis-di-<ID>` in your cluster. You will need to use a privileged Redis Enterprise user that has the permissions to create a BDB and to register Gears recipes, to run it.

> Note: This command requires credentials of a Redis Enterprise cluster user with either `DB Member`, `Cluster Member` or `Cluster Admin` roles, read more about [cluster roles]({{<relref "/rs/security/access-control/create-roles">}}).

## Scaffold configuration files

[Reference documentation]({{<relref "/rdi/reference/cli/redis-di-scaffold">}})

Run `scaffold` command to generate configuration files for Redis Data Integration and Debezium Redis Sink Connector:

```bash
redis-di scaffold --db-type <{{ site.db_types }}> --dir <PATH_TO_DIR>
```

The following files will be created in the provided directory:

```bash
├── debezium
│   └── application.properties
├── jobs
│   └── README.md
└── config.yaml

```

**Folder Structure**

- `config.yaml` - Redis Data Integration configuration file (definitions of target database, applier, and so on).

- `debezium/application.properties` - Debezium Server configuration file.

- `jobs` - Data transformation jobs. For more information, see [Data transformation pipeline]({{<relref "rdi/data-transformation/data-transformation-pipeline">}}).

## Update Redis target connection details

![config.yaml diagram](/images/rdi/config-yaml-diagram.png)

Edit the `config.yaml` configuration file. This file holds the connection details of the target Redis instance and Applier settings.

Update the `connection/target` details to match the target database settings. See [configuration reference for all available settings]({{<relref "/rdi/reference/config-yaml-reference">}}).

## Preventing data loss at Redis target DB

In order to prevent Redis Target DB from losing data, configure RDI to [wait](https://redis.io/commands/wait/) for replica shard write acknowledgment. This can be done by adding the following lines in the `applier` section of `config.yaml`:

```yaml
applier:
  wait_enabled: true
  retry_on_replica_failure: true
```

## Deploy configuration

Run [deploy]({{<relref "/rdi/reference/cli/redis-di-deploy">}}) command to deploy the local configuration to the remote RDI database:

```bash
redis-di deploy
```

> Note: If you are specifying TLS `key`, `cert` and `cacert` locations in `config.yaml` or you use one of the file patterns `${file:<location>}` `${file:<location>:<property-name>}` for the `password` property, make sure these files exist on the Redis Enterprise nodes that host RDI shards.
 

## Validate the install

Run `redis-di status` to check the status of the installation.

> Note that it is OK to see the warning of "No streams found" since we have not yet set up a Debezium source connector. We will do this in the next step.

## Install the Debezium Server

### Configure Debezium Server's `application.properties`

![application.properties Diagram](/images/rdi/application-properties-diagram.png)

Edit `debezium/application.properties` file created under your project directory (created by the `scaffold` command described [above](#scaffold-configuration-files)).

You can read the [Debezium Server Configuration Guide]({{<relref "/rdi/installation/debezium-server-configuration">}}) for the key configuration properties reference.

### Run Debezium Server

Follow [Debezium Server Deployment Guide]({{<relref "/rdi/installation/debezium-server-deployment">}}) to deploy and run Debezium Server in either containerized and non-containerized deployment modes of your choice.

### Quick database setup using Debezium example database

In case you want a quick setup of a preconfigured database to experiment with Redis Data Integration, you can use one of the [Debezium example databases](https://github.com/debezium/docker-images).

To set up a Postgres example database:

```bash
docker run -it --name example-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 debezium/example-postgres
```

## Redis Data Integration Configuration File (config.yaml)

### Reference Guide

See [Redis Data Integration configuration file reference]({{<relref "/rdi/reference/config-yaml-reference">}}).

### Substitutions

- `${env:var}` - Environment variables. The env variables will be prefixed with `REDIS_DI_` if not already prefixed that way.

- `${file:<FILE_NAME>:<PROPERTY_NAME>}` - Specific property in properties file.

- `${file:<FILE_NAME>}` - Reading the whole file.

- `${secrets:secret_name}` - Secrets: To set the secret use the `redis-di set-secret` CLI command. Currently only supports the secret named `target-password`.

## Distributed installation

For information about a distributed installation (multi VM/Multi pod), see [Distributed installation]({{<relref "/rdi/installation/distributed-installation">}}).

## Installing from a Python package (Whl File)

> Note: RDI CLI requires Python version 3.7 and up.

- Set up a new virtual environment for Python:

  ```bash
  python3.8 -m venv venv  # replace with python3.9 if in use
  ```

- Activate virtual env:

  ```bash
  source venv/bin/activate
  ```

- Upgrade [Pip](https://pypi.org/project/pip/):

  ```bash
  pip install --upgrade pip
  ```

- Install RDI CLI:

  ```bash
  pip3 install https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis_di_cli-latest-py3-none-any.whl
  ```

## Installing from source

- Set up a new virtual env for Python:

  ```bash
  python3.8 -m venv venv
  ```

- Activate virtual env:

  ```bash
  source venv/bin/activate
  ```

- Install [Poetry](https://python-poetry.org/) builder:

  ```bash
  pip install poetry
  ```

- Build cli:

  ```bash
  cd cli
  poetry install
  ```

## Upgrading

To learn how you can upgrade RDI CLI, RDI engine, and RedisGears see the [Upgrade]({{<relref "/rdi/upgrade">}}) section.

## Troubleshooting

See the [troubleshooting guide]({{<relref "/rdi/troubleshoot">}}).
