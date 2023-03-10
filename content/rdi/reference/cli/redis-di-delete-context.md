---
Title: redis-di delete-context
linkTitle: redis-di delete-context
description: Delete a context
weight: 70
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Delete a context

## Usage

```
Usage: redis-di delete-context [OPTIONS] CONTEXT_NAME
```

## Options
* `loglevel`: 
  * Type: Choice(['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL']) 
  * Default: `info`
  * Usage: `--loglevel
-log-level`

  


* `context_name` (REQUIRED): 
  * Type: STRING 
  * Default: `none`
  * Usage: `context-name`

  


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
Usage: redis-di delete-context [OPTIONS] CONTEXT_NAME

  Deletes a context

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  -f, --force                     Force operation. skips verification prompts
  --help                          Show this message and exit.
```

