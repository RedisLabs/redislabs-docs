---
Title: redis-di set-secret
linkTitle: redis-di set-secret
description: Creates secret of a specified type
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Creates secret of a specified type

## Usage

```
Usage: redis-di set-secret [OPTIONS]
```

## Options

- `log_level`:

  - Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'])
  - Default: `info`
  - Usage: `--log-level
-l`

- `silent`:

  - Type: BOOL
  - Default: `false`
  - Usage: `-s
--silent`

  Silent install. Do not prompt to enter missing secret value.

- `type` (REQUIRED):

  - Type: Choice([<SecretType.SOURCE_DB_USERNAME: 'source-db-username'>, <SecretType.SOURCE_DB_PASSWORD: 'source-db-password'>, <SecretType.TARGET_DB_PASSWORD: 'target-db-username'>, <SecretType.TARGET_DB_USERNAME: 'target-db-password'>])
  - Default: `none`
  - Usage: `-t
--type`

- `value`:

  - Type: STRING
  - Default: `none`
  - Usage: `-v
--value`

  Secret value. Only provide in -s mode

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.

## CLI help

```
Usage: redis-di set-secret [OPTIONS]

  Creates secret of a specified type

Options:
  -l, --log-level [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  -s, --silent                    Silent install. Do not prompt to enter
                                  missing secret value.
  -t, --type [source-db-username|source-db-password|target-db-username|target-db-password]
                                  [required]
  -v, --value TEXT                Secret value. Only provide in -s mode
  --help                          Show this message and exit.
```
