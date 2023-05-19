---
Title: Offline install
linkTitle: Offline install
description: Shows how to install Redis Data Integration without an active Internet connection
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

## Download

### Redis Data Integration offline package

#### Ubuntu20.04

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-offline-ubuntu20.04-latest.tar.gz -O /tmp/redis-di-offline.tar.gz
```

#### Ubuntu18.04

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-offline-ubuntu18.04-latest.tar.gz -O /tmp/redis-di-offline.tar.gz
```

#### RHEL8

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-offline-rhel8-latest.tar.gz -O /tmp/redis-di-offline.tar.gz
```

#### RHEL7

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/latest/redis-di-offline-rhel7-latest.tar.gz -O /tmp/redis-di-offline.tar.gz
```

### Debezium Container Image

```bash
wget https://qa-onprem.s3.amazonaws.com/redis-di/debezium/debezium_server_{{param rdi_debezium_server_version }}_offline.tar.gz
```

## Install RedisGears and its dependencies

If your Redis Enterprise Cluster version is 6.2.18 or higher, you can install RedisGears using the RDI CLI:

- Download RedisGears bundled with Python plugin:

  #### Ubuntu 20.04

  ```bash
  curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-ubuntu20.04-x86_64.{{ param rdi_redis_gears_current_semantic_version }}-withdeps.zip -o /tmp/redis-gears.zip
  ```

  #### Ubuntu 18.04

  ```bash
  curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-ubuntu18.04-x86_64.{{ param rdi_redis_gears_current_semantic_version }}-withdeps.zip -o /tmp/redis-gears.zip
  ```

  #### RHEL 8

  ```bash
  curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-rhel8-x86_64.{{  param rdi_redis_gears_current_semantic_version }}-withdeps.zip -o /tmp/redis-gears.zip
  ```

  #### RHEL 7

  ```bash
  curl -s https://redismodules.s3.amazonaws.com/redisgears/redisgears.Linux-rhel7-x86_64.{{ param rdi_redis_gears_current_semantic_version }}-withdeps.zip -o /tmp/redis-gears.zip
  ```

- Run the `create` command in interactive mode:

  ```bash
  redis-di create
  ```

  The RDI CLI will prompt you to specify the location of the RedisGears zip file, which is located at `/tmp/redis-gears.zip` unless you modified the curl command above.

  The RDI CLI will ask for your cluster host, port, user and password, and will attempt to install RedisGears before continuing with the creation of the RDI database.

### Manual Installation

- Copy the downloaded `redis-di-offline.tar.gz` into the master node of Redis under `/tmp` directory.

- Unpack into `/tmp` directory:

  ```bash
  cd /tmp
  tar xvf redis-di-offline.tar.gz
  ```

- Switch user to the user that the cluster was created with (usually `redislabs`).

- Install the [RedisGears](https://redis.com/modules/redis-gears/) module and dependencies:

  ```bash
  # substitute <OS_VERSION> to ubuntu18.04 | ubuntu20.04 | rhel7 | rhel8
  mkdir -p $modulesdatadir/rg/{{ param rdi_redis_gears_current_semantic_version }}/deps/
  cp /tmp/redis-di-offline/redis-gears/redisgears-python.Linux-<OS_VERSION>-x86_64.{{ param rdi_redis_gears_current_semantic_version }}.tgz $modulesdatadir/rg/{{ param rdi_redis_gears_current_version }}/deps/
  curl -v -k -u "<CLUSTER_USERNAME>:<CLUSTER_PASSWORD>" -F "module=@/tmp/redis-di-offline/redis-gears/redisgears_python.Linux-<OS_VERSION>-x86_64.{{param rdi_redis_gears_current_semantic_version }}.zip" https://localhost:9443/v2/modules
  ```

> Note: Make sure that the folder `$modulesdatadir/rg/{{ rdi rdi_redis_gears_current_version }}/deps` is accessible for the OS user running Redis Enterprise. Typically, this is user `redislabs`.


## Install RDI CLI

On the workstation where the RDI CLI is to be installed, follow these steps:

- Unpack the downloaded `redis-di-offline.tar.gz` into `/tmp` directory:

  ```bash
  tar xvf /tmp/redis-di-offline.tar.gz
  ```

- Unpack `redis-di.tar.gz` into `/usr/local/bin/` directory:

  ```bash
  sudo tar xvf /tmp/redis-di-offline/redis-di-cli/redis-di.tar.gz -C /usr/local/bin/
  ```

  > Note: Non-root users should unpack to a directory with write permission and run `redis-di` directly from it.

## Create Redis Data Integration BDB

```bash
redis-di create --silent --cluster-host <CLUSTER_HOST> --cluster-user <CLUSTER_USER> --cluster-password <CLUSTER_PASSWORD> --rdi-port <RDI_PORT> --rdi-password <RDI_PASSWORD>
```

Note: You can omit the `--rdi-port` argument and the BDB will be created on the next available port (starting with 12001).

## Load Debezium image

- Copy the downloaded `debezium_server_{{ param rdi_debezium_server_version }}_offline.tar.gz` into `/tmp`.
- Load image:
  ```bash
  docker load < /tmp/debezium_server_{{ param rdi_debezium_server_version }}_offline.tar.gz
  ```
- Tag as latest:
  ```bash
  docker tag debezium/server:{{ param rdi_debezium_server_version }}_offline debezium/server:{{ site.debezium_server_version }}
  docker tag debezium/server:{{ param rdi_debezium_server_version }}_offline debezium/server:latest
  ```

## Finalize the installation

Continue the installation as described [here](../ingest-qsg.md#scaffold-configuration-files).
