---
Title: rladmin
linkTitle: rladmin (administer)
description: Administer Redis Enterprise clusters and databases.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/references/cli-reference/rladmin/",
          "/rs/references/rladmin/"]
---

`rladmin` is a command-line utility that lets you perform administrative tasks such as failover, migration, and endpoint binding on a Redis Enterprise Software cluster. You can also use `rladmin` to edit cluster and database configurations. 
Although you can use the admin console for some of these tasks, others are unique to the `rladmin` CLI tool.

## rladmin commands

{{<table-children columnNames="Command,Description" columnSources="LinkTitle,Description" enableLinks="LinkTitle">}}

## Use the `rladmin` shell

To open the `rladmin` shell:

1. Sign in to the Redis Enterprise Software host with an account that is a member of the **redislabs** OS group.

    The rladmin binary is located in `/opt/redislabs/bin`. If you don't have this directory in your PATH, you may want to add it. Otherwise, you can use `bash -l <username>` to sign in as a user with permissions for that directory.

1. Run: `rladmin`

    {{<note>}}
If the CLI does not recognize the `rladmin` command,
run this command to load the necessary configuration first: `bash -l`
    {{</note>}}

In the rladmin shell, you can:

- Run any `rladmin` command without prefacing it with `rladmin`.
- Enter `?` to view the full list of available commands.
- Enter `help` followed by the name of a command for a detailed explanation of the command and its usage.
- Press the Tab key for command completion.
- Enter `exit` or press Ctl+D to return to your terminal prompt.
