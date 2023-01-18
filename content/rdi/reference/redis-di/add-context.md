---
Title: redis-di add-context
linkTitle: add-context
description: Adds a new context to your Redis Data integration instance
weight: $weight
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The `add-context` command adds a new context to your Redis Data integration instance.

## Usage

```
Usage: redis-di add-context [OPTIONS] CONTEXT_NAME
```

## Options
* `context_name` (REQUIRED): 
  * Type: STRING 
  * Default: `none`
  * Usage: `context-name`

  


* `loglevel`: 
  * Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL']) 
  * Default: `info`
  * Usage: `--loglevel
-log-level`

  


* `cluster_host` (REQUIRED): 
  * Type: STRING 
  * Default: `none`
  * Usage: `--cluster-host`

  Host/IP of Redis Enterprise Cluster (service name in case of k8s)


* `cluster_api_port` (REQUIRED): 
  * Type: INT 
  * Default: `9443`
  * Usage: `--cluster-api-port`

  API Port of Redis Enterprise Cluster


* `cluster_user` (REQUIRED): 
  * Type: STRING 
  * Default: `none`
  * Usage: `--cluster-user`

  Redis Enterprise Cluster username with either DB Member, Cluster Member or Cluster Admin roles


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


* `help`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--help`

  Show this message and exit.



## CLI Help

```
Usage: redis-di add-context [OPTIONS] CONTEXT_NAME

  Adds a new context

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --cluster-host TEXT             Host/IP of Redis Enterprise Cluster (service
                                  name in case of k8s)  [required]
  --cluster-api-port INTEGER      API Port of Redis Enterprise Cluster
                                  [default: 9443; required]
  --cluster-user TEXT             Redis Enterprise Cluster username with
                                  either DB Member, Cluster Member or Cluster
                                  Admin roles  [required]
  --rdi-host TEXT                 Host/IP of RDI Database  [required]
  --rdi-port INTEGER              Port of RDI Database  [required]
  --rdi-key TEXT                  Private key file to authenticate with
  --rdi-cert TEXT                 Client certificate file to authenticate with
  --rdi-cacert TEXT               CA certificate file to verify with
  --help                          Show this message and exit.
```

