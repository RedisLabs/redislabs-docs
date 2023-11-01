---
Title: redis-di install-gears
linkTitle: redis-di install-gears
description: Install RedisGears module on Redis cluster
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Install RedisGears module on Redis cluster

## Usage

```
Usage: redis-di install-gears [OPTIONS]
```

## Options

- `loglevel`:

  - Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'])
  - Default: `info`
  - Usage: `--loglevel
-log-level`

- `cluster_host` (REQUIRED):

  - Type: STRING
  - Default: `none`
  - Usage: `--cluster-host`

  Host/IP of Redis Enterprise Cluster (service name in case of k8s)

- `cluster_api_port` (REQUIRED):

  - Type: <IntRange 1000<=x<=65535>
  - Default: `9443`
  - Usage: `--cluster-api-port`

  API Port of Redis Enterprise Cluster

- `cluster_user` (REQUIRED):

  - Type: STRING
  - Default: `none`
  - Usage: `--cluster-user`

  Redis Enterprise Cluster username with either DB Member, Cluster Member or Cluster Admin roles

- `cluster_password`:

  - Type: STRING
  - Default: `none`
  - Usage: `--cluster-password`

  Redis Enterprise Cluster Password

- `redisgears_module`:

  - Type: STRING
  - Default: ``
  - Usage: `--redisgears-module`

  RedisGears module file

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.

## CLI help

```
Usage: redis-di install-gears [OPTIONS]

  Install RedisGears module on Redis cluster

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --cluster-host TEXT             Host/IP of Redis Enterprise Cluster (service
                                  name in case of k8s)  [required]
  --cluster-api-port INTEGER RANGE
                                  API Port of Redis Enterprise Cluster
                                  [default: 9443; 1000<=x<=65535; required]
  --cluster-user TEXT             Redis Enterprise Cluster username with
                                  either DB Member, Cluster Member or Cluster
                                  Admin roles  [required]
  --cluster-password TEXT         Redis Enterprise Cluster Password
  --redisgears-module TEXT        RedisGears module file
  --help                          Show this message and exit.
```
