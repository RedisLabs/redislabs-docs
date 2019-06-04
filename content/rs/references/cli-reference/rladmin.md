---
Title: rladmin command-line interface
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) includes a command-line interface (CLI),
called *rladmin* that can be used for various advanced administrative
tasks. Some of these tasks can also be performed through the management
UI and some are unique to the CLI.

The following are examples of tasks that can be performed through the
CLI:

- View the detailed status of the cluster including information about
    each node, each database, each shard, etc.
- Execute failover between a master and slave shard, or a master and
    slave endpoint.
- Migrate a specific shard or endpoint between nodes.
- Tune specific internal parameters of a database.
- Upgrade the version of a database to the most current version
    supported by the cluster.

## Accessing the rladmin CLI

To open the *rladmin* CLI:

1. Open the operating system CLI.
1. 1\. Use an account that is a member of the *redislabs* OS group or change
    user to root by running the following command: sudo su --. (if you are a
    non-root user, you will need to add /opt/redislabs/bin/ to that user's
    PATH env var)
1. Run the following command in the CLI: rladmin

    **Note**: If the CLI does not recognize the rladmin command, you may
    need to run the following command to load the needed configuration
    first: bash -l

1. A message confirms that you are now running rladmin.

## rladmin features

In the rladmin CLI you can:

- Enter ? to view the full list of available commands.
- Type help, followed by the name of a command to view a detailed
    explanation of the command and its usage.
- Use the Tab key for automatic command completion.
