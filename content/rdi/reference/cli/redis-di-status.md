---
Title: redis-di status # YOSSI
linkTitle: redis-di status
description: Displays the status of the pipeline end to end
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Displays the status of the pipeline end to end

## Usage

```
Usage: redis-di status [OPTIONS]
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

- `rdi_key_password`:

  - Type: STRING
  - Default: `none`
  - Usage: `--rdi-key-password`

  Password for unlocking an encrypted private key

- `live`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--live
-l`

  Live data flow monitoring

- `page_number`:

  - Type: <IntRange x>=1>
  - Default: `none`
  - Usage: `--page-number
-p`

  Set the page number (live mode only)

- `page_size`:

  - Type: <IntRange x>=1>
  - Default: `none`
  - Usage: `--page-size
-s`

  Set the page size (live mode only)

- `ingested_only`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--ingested-only
-i`

  Display ingested data streams (live mode only)

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.

## CLI help

```
Usage: redis-di status [OPTIONS]

  Displays the status of the pipeline end to end

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --rdi-host TEXT                 Host/IP of RDI Database  [required]
  --rdi-port INTEGER              Port of RDI Database  [required]
  --rdi-password TEXT             RDI Database Password
  --rdi-key TEXT                  Private key file to authenticate with
  --rdi-cert TEXT                 Client certificate file to authenticate with
  --rdi-cacert TEXT               CA certificate file to verify with
  --rdi-key-password TEXT         Password for unlocking an encrypted private
                                  key
  -l, --live                      Live data flow monitoring
  -p, --page-number INTEGER RANGE
                                  Set the page number (live mode only)  [x>=1]
  -s, --page-size INTEGER RANGE   Set the page size (live mode only)  [x>=1]
  -i, --ingested-only             Display ingested data streams (live mode
                                  only)
  --help                          Show this message and exit.
```
