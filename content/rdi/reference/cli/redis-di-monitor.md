---
Title: redis-di monitor
linkTitle: redis-di monitor
description: Monitors RDI by collecting metrics and exporting to Prometheus
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Monitors RDI by collecting metrics and exporting to Prometheus

## Usage

```
Usage: redis-di monitor [OPTIONS]
```

## Options

- `loglevel`:

  - Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'])
  - Default: `info`
  - Usage: `--loglevel
-log-level`

- `rdi_host` (REQUIRED):

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-host`

  Host/IP of RDI Database

- `rdi_port` (REQUIRED):

  - Type: INT
  - Default: `none`
  - Usage: `--rdi-port`

  Port of RDI Database

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

- `exporter-port`:

  - Type: INT
  - Default: `9121`
  - Usage: `--exporter-port`

  HTTP port to start the exporter on

- `collect-interval`:

  - Type: INT
  - Default: `5`
  - Usage: `--collect-interval`

  Metrics collection interval (seconds)  

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.
