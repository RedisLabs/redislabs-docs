---
Title: redis-di trace
linkTitle: redis-di trace
description: Start a trace session for troubleshooting data transformation
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Start a trace session for troubleshooting data transformation

## Usage

```
Usage: redis-di trace [OPTIONS]
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


* `max_change_records`: 
  * Type: <IntRange x>=1> 
  * Default: `10`
  * Usage: `--max-change-records`

  Maximum traced change records per shard


* `timeout` (REQUIRED): 
  * Type: <IntRange 1<=x<=600> 
  * Default: `20`
  * Usage: `--timeout`

  Stops the trace after exceeding this timeout (in seconds)


* `trace_only_rejected`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--trace_only_rejected`

  Trace only rejected change records


* `help`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--help`

  Show this message and exit.



## CLI Help

```
Usage: redis-di trace [OPTIONS]

  Starts a trace session for troubleshooting data transformation

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --rdi-host TEXT                 Host/IP of RDI Database  [required]
  --rdi-port INTEGER              Port of RDI Database  [required]
  --rdi-password TEXT             RDI Database Password
  --rdi-key TEXT                  Private key file to authenticate with
  --rdi-cert TEXT                 Client certificate file to authenticate with
  --rdi-cacert TEXT               CA certificate file to verify with
  --max-change-records INTEGER RANGE
                                  Maximum traced change records per shard
                                  [x>=1]
  --timeout INTEGER RANGE         Stops the trace after exceeding this timeout
                                  (in seconds)  [default: 20; 1<=x<=600;
                                  required]
  --trace_only_rejected           Trace only rejected change records
  --help                          Show this message and exit.
```

