---
Title: redis-di set-context
linkTitle: set-context
description: Sets a context to be the active one
weight: $weight
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

Sets a context to be the active one

## Usage

```
Usage: redis-di set-context [OPTIONS] CONTEXT_NAME
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

  


* `help`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--help`

  Show this message and exit.



## CLI Help

```
Usage: redis-di set-context [OPTIONS] CONTEXT_NAME

  Sets a context to be the active one

Options:
  -log-level, --loglevel [DEBUG|INFO|WARN|ERROR|CRITICAL]
                                  [default: INFO]
  --help                          Show this message and exit.
```

