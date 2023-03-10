---
Title: redis-di scaffold
linkTitle: redis-di scaffold
description: Generate configuration files for RDI and Debezium (when ingesting data to Redis)
weight: 150
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Generate configuration files for RDI and Debezium (when ingesting data to Redis)

## Usage

```
Usage: redis-di scaffold [OPTIONS]
```

## Options
* `loglevel`: 
  * Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL']) 
  * Default: `info`
  * Usage: `--loglevel
-log-level`

  


* `db_type` (REQUIRED): 
  * Type: Choice([<DbType.CASSANDRA: 'cassandra'>, <DbType.MYSQL: 'mysql'>, <DbType.ORACLE: 'oracle'>, <DbType.POSTGRESQL: 'postgresql'>, <DbType.SQLSERVER: 'sqlserver'>]) 
  * Default: `none`
  * Usage: `--db-type`

  DB type


* `strategy`: 
  * Type: Choice([<Strategy.INGEST: 'ingest'>, <Strategy.WRITE_BEHIND: 'write_behind'>]) 
  * Default: `ingest`
  * Usage: `--strategy`

  Strategy


  Output to directory or stdout


* `directory`: 
  * Type: STRING 
  * Default: `none`
  * Usage: `--dir`

  Directory containing RDI configuration


* `preview`: 
  * Type: STRING 
  * Default: `none`
  * Usage: `--preview`

  Print the content of specified config file (debezium/application.properties | config.yaml) to CLI output


* `help`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--help`

  Show this message and exit.



## CLI Help

```
Usage: redis-di scaffold [OPTIONS]

  Generates configuration files for RDI and Debezium (when ingesting data to
  Redis)

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --db-type [cassandra|mysql|oracle|postgresql|sqlserver]
                                  DB type  [required]
  --strategy [ingest|write_behind]
                                  Strategy  [default: ingest]
  Output formats: [mutually_exclusive, required]
                                  Output to directory or stdout
    --dir TEXT                    Directory containing RDI configuration
    --preview TEXT                Print the content of specified config file
                                  (debezium/application.properties |
                                  config.yaml) to CLI output
  --help                          Show this message and exit.
```

