---
Title: redis-di scaffold
linkTitle: scaffold
description: Generates configuration files for Redis Data Integration and Debezium Redis Sink Connector
weight: $weight
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Generates configuration files for Redis Data Integration and Debezium Redis Sink Connector

## Usage

```
Usage: redis-di scaffold [OPTIONS] NAME
```

## Options
* `loglevel`: 
  * Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL']) 
  * Default: `info`
  * Usage: `--loglevel
-log-level`

  


* `name` (REQUIRED): 
  * Type: STRING 
  * Default: `none`
  * Usage: `name`

  


* `db_type` (REQUIRED): 
  * Type: Choice(['cassandra', 'mysql', 'oracle', 'postgresql', 'sqlserver', 'write-behind']) 
  * Default: `none`
  * Usage: `--db-type`

  DB type


* `help`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--help`

  Show this message and exit.



## CLI Help

```
Usage: redis-di scaffold [OPTIONS] NAME

  Generates configuration files for Redis Data Integration and Debezium Redis
  Sink Connector

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --db-type [cassandra|mysql|oracle|postgresql|sqlserver|write-behind]
                                  DB type  [required]
  --help                          Show this message and exit.
```

