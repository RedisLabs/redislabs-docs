---
Title: rladmin help
linkTitle: help
description: List all options and parameters associated with the rladmin command.
weight: $weight
alwaysopen: false
toc: "true"
headerRange: "[1-2]"
categories: ["RS"]
aliases:
---

`rladmin help` lists all options and parameters associated with the rladmin command.

``` sh
rladmin help [command]
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| command   | rladmind command to display help |

### Returns

Returns a list of all the options and parameters associated with the rladmin command.

If `[command]` is specified, returns a list of all the options and parameters associated with that rladmin command.

### Example

```sh
$ rladmin help
usage: rladmin [options] [command] [command args]

Options:
  -y  Assume Yes for all required user confirmations.

Commands:
  bind      Bind an endpoint
  cluster   Cluster management commands
  exit      Exit admin shell
  failover  Fail-over master to slave
  help      Show available commands, or use help <command> for a specific command
  info      Show information about tunable parameters
  migrate   Migrate elements between nodes
  node      Node management commands
  placement Configure shards placement policy
  recover   Recover databases
  restart   Restart database shards
  status    Show status information
  suffix    Suffix management
  tune      Tune system parameters
  upgrade   Upgrade entity version
  verify    Cluster verification reports

Use "rladmin help [command]" to get more information on a specific command.
```
