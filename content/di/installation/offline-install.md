---
Title: Offline install
linkTitle: Offline install
description: Shows how to install Redis Data Integration without an active internet connection.
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

## Download

### Redis Data Integration Offline Package

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
wget https://qa-onprem.s3.amazonaws.com/redis-di/debezium/debezium_server_{{ site.debezium_server_version }}_offline.tar.gz
```

## Install RedisGears Module and its Dependencies

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
  mkdir -p $modulesdatadir/rg/10205/deps/
  cp /tmp/redis-di-offline/redis-gears/redisgears-python.Linux-<OS_VERSION>-x86_64.{{ site.redis_gears_min_version }}.tgz $modulesdatadir/rg/10205/deps/
  curl -v -k -u "<CLUSTER_USERNAME>:<CLUSTER_PASSWORD>" -F "module=@/tmp/redis-di-offline/redis-gears/redisgears_python.Linux-<OS_VERSION>-x86_64.{{ site.redis_gears_min_version }}.zip" https://localhost:9443/v2/modules
  ```

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
redis-di create --silent --cluster-host <CLUSTER_HOST> --cluster-user <CLUSTER_USER> --cluster-password <CLUSTER_PASSWORD> --rdi-port <RC_PORT> --rdi-password <RC_PASSWORD>
```

Note: You can omit the `--rdi-port` argument and the BDB will be created on the next available port (starting with 12001).

## Load Debezium Image

Copy the downloaded `debezium_server_{{ site.debezium_server_version }}_offline.tar.gz` into `/tmp` and run:

```bash
docker load < /tmp/debezium_server_{{ site.debezium_server_version }}_offline.tar.gz
docker tag debezium/server:{{ site.debezium_server_version }}_offline debezium/server:latest
```

## Finalize the Installation

Continue the installation as described in [README](../index.md#scaffold-configuration-files).
