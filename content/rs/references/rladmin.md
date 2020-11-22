---
Title: The RS Command-Line Interface (rladmin)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/rladmin/
---
Redis Enterprise Software (RS) includes rladmin, a command-line interface (CLI)
that you can use to do advanced administrative tasks.
Some of these tasks you can also do through the management admin console.

For example, with the rladmin CLI you can:

- View the detailed status of the cluster including information about each node, each database, and each shard
- Failover between a master and slave shard, or a master and slave endpoint
- Migrate a specific shard or endpoint between nodes
- Tune specific internal parameters of a database
- Upgrade the version of a database to the most current version supported by the cluster

## Using the rladmin CLI

To open the rladmin CLI:

1. Login to the RS host with an account that is a member of the **redislabs** OS group.

    If you are a non-root user, you must add `/opt/redislabs/bin/` to your PATH environment variables

1. Run: `rladmin`

    {{< note >}}
If the CLI does not recognize the rladmin command,
you run this command to load the needed configuration first: `bash -l`
    {{< /note >}}

## Command syntax help

In the rladmin CLI you can:

- Enter `?` to view the full list of available commands.
- Enter `help` followed by the name of a command for a detailed explanation of the command and its usage.
- Press the Tab key for command completion.
