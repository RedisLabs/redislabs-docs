---
Title: redis-di set-secret
linkTitle: redis-di set-secret
description: Creates a secret of a specified type
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Creates a secret of a specified type

## Usage

```
Usage: redis-di set-secret [OPTIONS] {source-db-username|source-db-
                           password|target-db-username|target-db-password}
                           [VALUE]
```

## Options

- `log_level`:

  - Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'])
  - Default: `info`
  - Usage: `--log-level
-l`

- `key` (REQUIRED):

  - Type: Choice([<SecretKey.SOURCE_DB_USERNAME: 'source-db-username'>, <SecretKey.SOURCE_DB_PASSWORD: 'source-db-password'>, <SecretKey.TARGET_DB_PASSWORD: 'target-db-username'>, <SecretKey.TARGET_DB_USERNAME: 'target-db-password'>])
  - Default: `none`
  - Usage: `key`

- `value`:

  - Type: STRING
  - Default: `none`
  - Usage: `value`

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.

## CLI help

```
Usage: redis-di set-secret [OPTIONS] {source-db-username|source-db-
                           password|target-db-username|target-db-password}
                           [VALUE]

  Creates a secret of a specified type

Options:
  -l, --log-level [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --help                          Show this message and exit.
```
