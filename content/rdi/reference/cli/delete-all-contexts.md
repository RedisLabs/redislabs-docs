---
Title: redis-di delete-all-contexts
linkTitle: delete-all-contexts
description: Deletes all contexts
weight: $weight
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The `delete-all-contexts` command deletes all contexts.

## Usage

```
Usage: redis-di delete-all-contexts [OPTIONS]
```

## Options
* `loglevel`: 
  * Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL']) 
  * Default: `info`
  * Usage: `--loglevel
-log-level`

  


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
Usage: redis-di delete-all-contexts [OPTIONS]

  Deletes all contexts

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  -f, --force                     Force operation. skips verification prompts
  --help                          Show this message and exit.
```

