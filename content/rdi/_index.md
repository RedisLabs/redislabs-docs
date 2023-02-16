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

Redis Data Integration (RDI) transfers (or _ingests_) data from traditional relations databases and other record systems to Redis Enterprise databases.

For details about the process and how it works, see [Redis Data Integration architecture]({{<relref "/rdi/architecture">}}).

The following instructions show how to install [`redis-di`]({{<relref "/rdi/reference/redis-di">}}), a command line utility used to manage Redis Data Integration.   

For Kubernetes or OpenShift installation, see [Deploy with Kubernetes]({{<relref "/rdi/installation/install-k8s">}}).

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

## Install redis-di utility

Unpack the downloaded `redis-di.tar.gz` into `/usr/local/bin/` directory:

```bash
sudo tar xvf /tmp/redis-di.tar.gz -C /usr/local/bin/
```

> Note: Non-root users should unpack to a directory with write permission and run `redis-di` directly from it.

## Quick start

### Prerequisites

- An existing Redis Enterprise cluster v6.2 or later.
- [RedisGears](https://redis.com/modules/redis-gears/) v1.2.5 or later installed on the cluster.

    For help installing RedisGears to support RDI, see [Install RedisGears for Redis Data Integration]({{<relref "/rdi/installation/install-redisgears">}}).

- A target Redis database, which can be added after installing RDI.

### Create a new RDI database instance

Run `create` command to set up a new Redis Data Integration database instance within an existing Redis Enterprise Cluster:

```bash
redis-di create
```

The `create` command creates a database named `redis-di-<ID>` in your cluster. 

You'll need Redis Enterprise permissions to create a new database and to register RedisGears recipes.  Specifically, you need Redis Enterprise cluster credentials that include one of the following roles: `DB Member`, `Cluster Member`, or `Cluster Admin`.

To learn more, see [Role based access control]({{<relref "/rs/security/access-control/create-roles">}}).

### Scaffold configuration files

Run `scaffold` command to generate configuration files for Redis Data Integration and Debezium Redis Sink Connector:

```bash
redis-di scaffold <NAME> --db-type <TYPE>
```

where:

- _`<NAME>`_ is a string containing a project name unique to your specific use.
- _`<TYPE>`_ is one of the following supported values: `mysql`, `oracle`, `postgresql`, or `sqlserver`.

When run, the `scaffold` command uses the project name to create a directory at the current location (`/.`); this project directory contains the following files:

```bash
├── debezium
│   └── application.properties
├── jobs
│   └── README.md
└── config.yaml
```

The files include:

- `config.yaml`: The Redis Data Integration configuration file, which defines the target database, the appliers, and additional configuration details.

- `debezium/application.properties` - Debezium Server configuration file,

- `jobs` - Data transformation job folder.  See [Data transformation pipeline]({{<relref "/rdi/data-transformation/pipeline">}}) for details.

### Update Redis target connection details

{{<image filename="/images/rdi/config-yaml-diagram.png" alt="The Redis Data Integration configuration file (config.yaml)" >}}{{</image>}}

The `config.yaml` file configures your Redis Data Integration instance.  

The `connections.target` object defines the connection to the target Redis database.  Each setting includes a comment that describes the setting and expected values.  Additional details are available in the [configuration file reference]({{<relref "/rdi/reference/rdi-configuration-file">}}).  

Optional settings are commented out initially.  Enable these as needed for your environment.  For example, the TLS settings let you define paths for private keys and certificates.

Update the `connection.target` details to match your target database settings. 

### Deploy Configuration

use the `deploy` command to deploy the local configuration to the remote RDI database:

```bash
redis-di deploy
```

### Validate the install

Run `redis-di status` to check the status of the installation.

You may receive a warning error reporting "No streams found."  if you've not yet set up a Debezium source connector, this is expected and will be resolved in the next step.

## Install the Debezium Server

### Configure Debezium Server's `application.properties`

The `applications.properties` file configures Debezium Server so that it can connect to the sink connector and your source data.  It also defines the data transformations.

{{<image filename="/images/rdi/application-properties-diagram.png" alt="The application.properties diagram" >}}{{</image>}}

Edit the `debezium/application.properties` to define connections to the sink and the source data.

### Run Debezium Server

You can deploy Debezium Server in a container or install it directly.  For details, see the [Debezium Server deployment guide]({{<relref "/rdi/installation/debezium-server-deployment">}}).

### Quick setup using Debezium example database

You can use a [Debezium example database](https://github.com/debezium/docker-images) database to experiment and become familiar with Redis Data Integration. 

To illustrate, here's how to use the Postgres example database:

```bash
docker run -it --name example-postgres \
   -e POSTGRES_USER=postgres \
   -e POSTGRES_PASSWORD=postgres \
   -p 5432:5432 \
   debezium/example-postgres
```

## Redis Data Integration Configuration File (config.yaml)

### Reference Guide

For help with `config.yaml`, the RDI configuration file, see the [reference guide]({{<relref "/rdi/reference/rdi-configuration-file">}}).

### Placeholder substitutions

The examples and reference files include placeholder values that need to be updated with your specific environment and details.  These include:

- `${env:var}` - Environment variables. RDI environment variables will be prefixed with `REDIS_DI_` if not already prefixed that way.

- `${file:<FILE_NAME>:<PROPERTY_NAME>}` - Individual property in properties file.

- `${file:<FILE_NAME>}` - Reads the whole file.

- `${secrets:secret_name}` - Secrets: To set the secret, use the `redis-di set-secret` CLI command. Supported secrets: `target-password`.

## Distributed Installation

RDI supports multiple distribution environments and topologies, including multiple virtual machine and container scenarios.  To learn more, see [Installation topologies]({{<relref "/rdi/installation/distributed-installation">}}).

## Installing from a Python Package (Whl File)

The [`redis-di` utility]({{<relref "/rdi/reference/redis-di/">}}) requires [Python 3.7](https://docs.python.org/3.7/) or later.  

We recommend using a virtual environment:

- Set up a new virtual environment for Python:

  ```bash
  python3 -m venv venv  # replace with python3.9 if in use
  ```

- Activate virtual env:

  ```bash
  source venv/bin/activate
  ```

- Upgrade [Pip](https://pypi.org/project/pip/):

  ```bash
  pip install --upgrade pip
  ```

- Install `redis-di`:

  ```bash
  pip3 install https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis_di_cli-latest-py3-none-any.whl
  ```

## Installing from Source

- Set up a new virtual env for Python:

  ```bash
  python3 -m venv venv
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

To upgrade Redis Data Integration, you need to:

1. [Upgrade the `redis-di` utility]({{<relref "/rdi/upgrade#upgrade-rdi-cli">}})
1. [Upgrade the RDI engine]({{<relref "/rdi/upgrade#upgrade-rdi-engine">}})
1. [Upgrade the RedisGears module]({{<relref "/rdi/upgrade#upgrade-redisgears-module">}})

## Troubleshoot

If you run into problems installing Redis Data Integration or running Debezium Server, our [troubleshooting guide]({{<relref "/rdi/troubleshoot/">}}) helps resolve the most common issues.
