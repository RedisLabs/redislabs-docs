---
Title: redis-di reset
linkTitle: reset
description: Resets the pipeline into initial full sync mode
weight: $weight
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Resets the pipeline into initial full sync mode

## Usage

```
Usage: redis-di reset [OPTIONS]
```

## Options
* `loglevel`: 
  * Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL']) 
  * Default: `info`
  * Usage: `--loglevel
-log-level`

  


* `rdi_host` (REQUIRED): 
  * Type: STRING 
  * Default: `none`
  * Usage: `--rdi-host`

  Host/IP of RDI Database


* `rdi_port` (REQUIRED): 
  * Type: INT 
  * Default: `none`
  * Usage: `--rdi-port`

  Port of RDI Database


* `rdi_password`: 
  * Type: STRING 
  * Default: `none`
  * Usage: `--rdi-password`

  RDI Database Password


* `rdi_key`: 
  * Type: STRING 
  * Default: `none`
  * Usage: `--rdi-key`

  Private key file to authenticate with


* `rdi_cert`: 
  * Type: STRING 
  * Default: `none`
  * Usage: `--rdi-cert`

  Client certificate file to authenticate with


* `rdi_cacert`: 
  * Type: STRING 
  * Default: `none`
  * Usage: `--rdi-cacert`

  CA certificate file to verify with


* `force`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--force
-f`

  Force operation. skips verification prompts


* `help`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--help`

  Show this message and exit.



## CLI Help

```
Usage: redis-di reset [OPTIONS]

  Resets the pipeline into initial full sync mode

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --rdi-host TEXT                 Host/IP of RDI Database  [required]
  --rdi-port INTEGER              Port of RDI Database  [required]
  --rdi-password TEXT             RDI Database Password
  --rdi-key TEXT                  Private key file to authenticate with
  --rdi-cert TEXT                 Client certificate file to authenticate with
  --rdi-cacert TEXT               CA certificate file to verify with
  -f, --force                     Force operation. skips verification prompts
  --help                          Show this message and exit.
```

