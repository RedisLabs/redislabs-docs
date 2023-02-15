---
Title: redis-di command line utility
linkTitle: redis-di command line utility
description: Describes redis-di, the Redis Data Integration command line utility 
weight: 10
alwaysopen: false
categories: ["redis-di"]
aliases: [
   "/rdi/reference/cli"
] 
---

The `redis-di` utility is a command line interface (CLI) to manage and configure Redis Data Integration

## Usage

```
redis-di [OPTIONS] COMMAND [ARGS]...
```

## Options

| Option | Description |
|--------|-------------|
| --version | Shows the RDI version string and exits.  Boolean, default: _false_<br/>Example: `--version` |
| --help    | Shows the help message and exists.  Boolean, default: _false_<br/>Example: `--help`  |

## Commands

| Command | Description |
|---------|-------------|
| [add-context]({{<relref "/rdi/reference/redis-di/add-context">}}) | Adds a new context to your Redis Data integration instance |
| [configure]({{<relref "/rdi/reference/redis-di/configure">}}) | Configures a Redis Data Integration database so that it's ready to process data |
| [create]({{<relref "/rdi/reference/redis-di/create">}}) | Creates a new Redis Data Integration instance |
| [delete]({{<relref "/rdi/reference/redis-di/delete">}}) | Deletes a Redis Data Integration database |
| <nobr>[delete-all-contexts]({{<relref "/rdi/reference/redis-di/delete-all-contexts">}})</nobr> | Deletes all contexts |
| [delete-context]({{<relref "/rdi/reference/redis-di/delete-context">}}) | Deletes a context |
| [deploy]({{<relref "/rdi/reference/redis-di/deploy">}}) | Deploys the Redis Data Integration configurations including target |
| [describe-job]({{<relref "/rdi/reference/redis-di/describe-job">}}) | Describes a transformation engine job |
| [get-rejected]({{<relref "/rdi/reference/redis-di/get-rejected">}}) | Returns all the stored rejected entries |
| [list-jobs]({{<relref "/rdi/reference/redis-di/list-jobs">}}) | Lists transformation engine jobs |
| [reset]({{<relref "/rdi/reference/redis-di/reset">}}) | Resets the pipeline into initial full sync mode |
| [scaffold]({{<relref "/rdi/reference/redis-di/scaffold">}}) | Generates configuration files for Redis Data Integration and Debezium Redis Sink Connector |
| [set-context]({{<relref "/rdi/reference/redis-di/set-context">}}) | Sets a context to be the active one |
| [set-secret]({{<relref "/rdi/reference/redis-di/set-secret">}}) | Writes a secret to Redis secret store |
| [start]({{<relref "/rdi/reference/redis-di/start">}}) | Starts the pipeline |
| [status]({{<relref "/rdi/reference/redis-di/status">}}) | Displays the status of the pipeline end to end |
| [stop]({{<relref "/rdi/reference/redis-di/stop">}}) |   Stops the pipeline |
| [trace]({{<relref "/rdi/reference/redis-di/trace">}}) |  Starts a trace session for troubleshooting data transformation |
| [upgrade]({{<relref "/rdi/reference/redis-di/upgrade">}}) | Upgrades RDI Engine without losing data or downtime |


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

