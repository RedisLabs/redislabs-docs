---
Title: redis-di set-secret
linkTitle: redis-di set-secret
description: Creates a secret of a specified key
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Creates a secret of a specified key

## Usage

```
Usage: redis-di set-secret [OPTIONS] {source-db-username|source-db-
                           password|target-db-username|target-db-
                           password|source-db-cacert|source-db-cert|source-db-
                           key|source-db-key-password|target-db-cacert|target-
                           db-cert|target-db-key|target-db-key-password}
                           [VALUE]
```

## Options

- `log_level`:

  - Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'])
  - Default: `info`
  - Usage: `--log-level
-l`

- `key` (REQUIRED):

  - Type: Choice(['source-db-username', 'source-db-password', 'target-db-username', 'target-db-password', 'source-db-cacert', 'source-db-cert', 'source-db-key', 'source-db-key-password', 'target-db-cacert', 'target-db-cert', 'target-db-key', 'target-db-key-password'])
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
                           password|target-db-username|target-db-
                           password|source-db-cacert|source-db-cert|source-db-
                           key|source-db-key-password|target-db-cacert|target-
                           db-cert|target-db-key|target-db-key-password}
                           [VALUE]

  Creates a secret of a specified key

Options:
  -l, --log-level [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --help                          Show this message and exit.
```
