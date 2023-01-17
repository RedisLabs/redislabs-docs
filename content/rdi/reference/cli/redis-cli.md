---
Title: redis-di 
linkTitle: redis-di
description: A command line interface to manage & configure Redis Data Integration
weight: 0
alwaysopen: false
categories: ["redis-di"]
aliases: 
---

The `redis-cli` utility is a command line interface (CLI) to manage & configure Redis Data Integration

## Usage

```
Usage: redis-di [OPTIONS] COMMAND [ARGS]...
```

## Options
* `version`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--version`

  Show the version and exit.


* `help`: 
  * Type: BOOL 
  * Default: `false`
  * Usage: `--help`

  Show this message and exit.



## CLI Help

```
Usage: redis-di [OPTIONS] COMMAND [ARGS]...

  A command line tool to manage & configure Redis Data Integration

Options:
  --version  Show the version and exit.
  --help     Show this message and exit.

Commands:
  add-context          Adds a new context
  configure            Configures the RDI Database so it is ready to...
  create               Creates the RDI Database instance
  delete               Deletes RDI database permanently
  delete-all-contexts  Deletes all contexts
  delete-context       Deletes a context
  deploy               Deploys the Redis Data Integration configurations...
  describe-job         Describes a transformation engine's job
  get-rejected         Returns all the stored rejected entries
  list-jobs            Lists transformation engine's jobs
  reset                Resets the pipeline into initial full sync mode
  scaffold             Generates configuration files for Redis Data...
  set-context          Sets a context to be the active one
  set-secret           Writes a secret to Redis secret store
  start                Starts the pipeline
  status               Displays the status of the pipeline end to end
  stop                 Stops the pipeline
  trace                Starts a trace session for troubleshooting data...
  upgrade              Upgrades RDI Engine without losing data or downtime
```

