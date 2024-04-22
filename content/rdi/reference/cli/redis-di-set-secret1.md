---
Title: redis-di set-secret1
linkTitle: redis-di set-secret1
description: Creates secret of a specified type
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Creates secret of a specified type

## Usage

```
Usage: redis-di set-secret1 [OPTIONS]
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

  Silent install. Do not prompt to enter missing parameters

- `secret_type`:

  - Type: Choice(['SOURCE_DB_USERNAME', 'SOURCE_DB_PASSWORD', 'TARGET_DB_PASSWORD', 'TARGET_DB_USERNAME'])
  - Default: `none`
  - Usage: `-t
--secret-type`

  Secret type (required in -s mode).

- `secret_name`:

  - Type: STRING
  - Default: `none`
  - Usage: `-sn
--secret-name`

  Secret name (required in -s mode).

- `user`:

  - Type: STRING
  - Default: `none`
  - Usage: `-u
--user`

  User (required in -s mode when -t is BASIC_AUTH).

- `password`:

  - Type: STRING
  - Default: `none`
  - Usage: `-p
--password`

  Password (required in -s mode when -t is BASIC_AUTH).

- `certificate`:

  - Type: STRING
  - Default: `none`
  - Usage: `-c
--certificate`

  Certificate file location (required in -s mode when -t is TLS).

- `certificate_key`:

  - Type: STRING
  - Default: `none`
  - Usage: `-ck
--certificate-key`

  Certificate key file location (required in -s mode when -t is TLS).

- `secret_key`:

  - Type: STRING
  - Default: `none`
  - Usage: `-sk
--secret-key`

  Secret key (required in -s mode when -t is GENERIC).

- `secret_value`:

  - Type: STRING
  - Default: `none`
  - Usage: `-sv
--secret-value`

  Secret value (required in -s mode when -t is GENERIC).

- `namespace`:

  - Type: STRING
  - Default: `rdi`
  - Usage: `--namespace
-n`

  Namespace name.

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.

## CLI help

```
Usage: redis-di set-secret1 [OPTIONS]

  Creates secret of a specified type

Options:
  -l, --log-level [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  -s, --silent                    Silent install. Do not prompt to enter
                                  missing parameters
  -t, --secret-type [SOURCE_DB_USERNAME|SOURCE_DB_PASSWORD|TARGET_DB_PASSWORD|TARGET_DB_USERNAME]
                                  Secret type (required in -s mode).
  -sn, --secret-name TEXT         Secret name (required in -s mode).
  -u, --user TEXT                 User (required in -s mode when -t is
                                  BASIC_AUTH).
  -p, --password TEXT             Password (required in -s mode when -t is
                                  BASIC_AUTH).
  -c, --certificate TEXT          Certificate file location (required in -s
                                  mode when -t is TLS).
  -ck, --certificate-key TEXT     Certificate key file location (required in
                                  -s mode when -t is TLS).
  -sk, --secret-key TEXT          Secret key (required in -s mode when -t is
                                  GENERIC).
  -sv, --secret-value TEXT        Secret value (required in -s mode when -t is
                                  GENERIC).
  -n, --namespace TEXT            Namespace name.
  --help                          Show this message and exit.
```
