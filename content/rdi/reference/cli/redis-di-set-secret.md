---
Title: redis-di set-secret
linkTitle: redis-di set-secret
description: Writes a secret to Redis secret store
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Writes a secret to Redis secret store

## Usage

```
Usage: redis-di set-secret [OPTIONS]
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

- `rdi_host` (REQUIRED):

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-host`

  Host/IP of RDI Database

- `rdi_port` (REQUIRED):

  - Type: <IntRange 1000<=x<=65535>
  - Default: `none`
  - Usage: `--rdi-port`

  Port of RDI Database

- `rdi_user`:

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-user`

  RDI Database Username

- `rdi_password`:

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-password`

  RDI Database Password

- `rdi_key`:

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-key`

  Private key file to authenticate with

- `rdi_cert`:

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-cert`

  Client certificate file to authenticate with

- `rdi_cacert`:

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-cacert`

  CA certificate file to verify with

- `rdi_key_password`:

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-key-password`

  Password for unlocking an encrypted private key

- `secret_name` (REQUIRED):

  - Type: STRING
  - Default: `none`
  - Usage: `--secret-name`

  The name of the secret

- `secret_value` (REQUIRED):

  - Type: STRING
  - Default: `none`
  - Usage: `--secret-value`

  The value of the secret

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.

## CLI help

```
Usage: redis-di set-secret [OPTIONS]

  Writes a secret to Redis secret store

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
  --rdi-host TEXT                 Host/IP of RDI Database  [required]
  --rdi-port INTEGER RANGE        Port of RDI Database  [1000<=x<=65535;
                                  required]
  --rdi-user TEXT                 RDI Database Username
  --rdi-password TEXT             RDI Database Password
  --rdi-key TEXT                  Private key file to authenticate with
  --rdi-cert TEXT                 Client certificate file to authenticate with
  --rdi-cacert TEXT               CA certificate file to verify with
  --rdi-key-password TEXT         Password for unlocking an encrypted private
                                  key
  --secret-name TEXT              The name of the secret  [required]
  --secret-value TEXT             The value of the secret  [required]
  --help                          Show this message and exit.
```
