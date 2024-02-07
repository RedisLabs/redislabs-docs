---
Title: redis-di create-k8s-secret
linkTitle: redis-di create-k8s-secret
description: Creates secret of specified type inside of K8S
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases:
---

Creates secret of specified type inside of K8S

## Usage

```
Usage: redis-di create-k8s-secret [OPTIONS]
```

## Options

- `log_level`:

  - Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'])
  - Default: `info`
  - Usage: `--log-level
-l`

- `namespace`:

  - Type: STRING
  - Default: `rdi`
  - Usage: `--namespace
-n`

  Secret name

- `help`:

  - Type: BOOL
  - Default: `false`
  - Usage: `--help`

  Show this message and exit.

## CLI help

```
Usage: redis-di create-k8s-secret [OPTIONS]

  Creates secret of specified type inside of K8S

Options:
  -l, --log-level [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  -n, --namespace TEXT            Secret name
  --help                          Show this message and exit.
```
