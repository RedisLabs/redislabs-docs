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

Redis Data Integration transfers (or _ingests_) data from traditional relations databases and other record systems to Redis Enterprise databases.

For details about the process and how it works, see [Redis Data Integration architecture]({{<relref "/rdi/architecture">}}).

## Installation

The following installation instructions install the RDI CLI on a local workstation. For installing in K8S or OpenShift please see [k8s installation](installation/install-k8s.md).

Redis Data Integration installation is done via the RDI CLI. The CLI should have network access to the Redis Enterprise cluster API (port 9443 by default).

### Download RDI CLI

#### Ubuntu20.04

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-ubuntu20.04-latest.tar.gz -O /tmp/redis-di.tar.gz
```

#### Ubuntu18.04

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-ubuntu18.04-latest.tar.gz -O /tmp/redis-di.tar.gz
```

#### RHEL8

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-rhel8-latest.tar.gz -O /tmp/redis-di.tar.gz
```

#### RHEL7

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-rhel7-latest.tar.gz -O /tmp/redis-di.tar.gz
```

## Install RDI CLI

Unpack the downloaded `redis-di.tar.gz` into `/usr/local/bin/` directory:

```bash
sudo tar xvf /tmp/redis-di.tar.gz -C /usr/local/bin/
```

> Note: Non-root users should unpack to a directory with write permission and run `redis-di` directly from it.

## Quick Start

### Prerequisites

- An existing Redis Enterprise cluster version >= 6.2.
- [RedisGears](https://redis.com/modules/redis-gears/) >= {{ site.redis_gears_min_version }} installed on the cluster. In case it's missing, follow [this guide](installation/install-redis-gears.md) to install.
- A target Redis DB (can be added after installation).

### Create a New RDI Database

Run `create` command to set up a new Redis Data Integration database instance within an existing Redis Enterprise Cluster:

```bash
redis-di create
```

The `create` command will create a BDB named `redis-di-<ID>` in your cluster. You will need to use a privileged Redis Enterprise user that has the permissions to create a BDB and to register Gears recipes, to run it.

> Note: This command requires credentials of a Redis Enterprise cluster user with either `DB Member`, `Cluster Member` or `Cluster Admin` roles, read more about [cluster roles](https://docs.redis.com/latest/rs/security/admin-console-security/user-security/#role-based-access-control).

### Scaffold Configuration Files

Run `scaffold` command to generate configuration files for Redis Data Integration and Debezium Redis Sink Connector:

```bash
redis-di scaffold <NAME> --db-type <{{ site.db_types }}>
```

A directory named with the above project-name will be created in the current location with:

```bash
├── debezium
│   └── application.properties
├── jobs
│   └── README.md
└── config.yaml

```

**Folder Structure**

- `config.yaml` - Redis Data Integration configuration file (definitions of target database, applier, etc.)

- `debezium/application.properties` - Debezium Server configuration file

- `jobs` - Data transformation's jobs, [read here](data-transformation/data-transformation-pipeline.md)

### Update Redis Target Connection Details

![config.yaml Diagram](images/quickstart/config-yaml-diagram.png)

Edit `config.yaml` configuration file. This file holds the connection details of the target Redis instance and Applier settings.

Update the `connection/target` details to match the target database settings. [See configuration reference for all available settings](reference/config-yaml-reference.md).

### Deploy Configuration

Run `deploy` command to deploy the local configuration to the remote RDI database:

```bash
redis-di deploy
```

### Validate the Install

Run `redis-di status` to check the status of the installation.

> Note that it is OK to see the warning of "No streams found" since we have not yet set up a Debezium source connector. We will do this in the next step.

## Install the Debezium Server

### Configure Debezium Server's `application.properties`

![application.properties Diagram](images/quickstart/application-properties-diagram.png)

Edit `debezium/application.properties` file created under your project directory (created by the `scaffold` command described [above](#scaffold-configuration-files)).

You can read the [Debezium Server Configuration Guide](installation/debezium-server-configuration.md) for the key configuration properties reference.

### Run Debezium Server

Follow [Debezium Server Deployment Guide](installation/debezium-server-deployment.md) to deploy and run Debezium Server in either [containerized](installation/debezium-server-deployment.md#containerized-deployment) and [non containerized](installation/debezium-server-deployment.md#non-containerized-deployment) deployment modes of your choice.

### Quick Database Setup using Debezium Example Database

In case you want a quick setup of a preconfigured database to experiment with Redis Data Integration, you can use one of the [Debezium example databases](https://github.com/debezium/docker-images).

To set up a Postgres example database:

```bash
docker run -it --name example-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 debezium/example-postgres
```

## Redis Data Integration Configuration File (config.yaml)

### Reference Guide

See [Redis Data Integration Configuration File Reference Guide](reference/config-yaml-reference.md).

### Substitutions

- `${env:var}` - Environment variables. The env variables will be prefixed with `REDIS_DI_` if not already prefixed that way.

- `${file:<FILE_NAME>:<PROPERTY_NAME>}` - Specific property in properties file.

- `${file:<FILE_NAME>}` - Reading the whole file.

- `${secrets:secret_name}` - Secrets: To set the secret use the `redis-di set-secret` CLI command. Currently only supports the secret named `target-password`.

## Distributed Installation

For detailed information about a distributed installation (multi VM/Multi pod), [read this document](installation/distributed-installation.md).

## Installing from a Python Package (Whl File)

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

## Installing from Source

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

## Upgrade

- [Upgrade RDI CLI](upgrade/upgrade-guide.md#upgrade-rdi-cli)
- [Upgrade RDI Engine](upgrade/upgrade-guide.md#upgrade-rdi-engine)
- [Upgrade RedisGears Module](upgrade/upgrade-guide.md#upgrade-redisgears-module)

## Troubleshooting Guide

See [Troubleshooting Guide](troubleshooting/troubleshooting-guide.md).
