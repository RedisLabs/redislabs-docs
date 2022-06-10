---
Title: rlcheck
linkTitle: rlcheck (verify nodes)
description: Verify nodes.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: ["/rs/references/cli-reference/rlcheck/",
          "/rs/references/rlcheck/"]
---
The `rlcheck` utility runs various health checks on a Redis Enterprise Software node and reports any discovered issues.
You can use this utility to confirm a successful installation or to verify that the node is functioning properly.

## Basic use

You can run `rlcheck` from the host's command-line interface (CLI).
The output of `rlcheck` shows information specific to the host that you run it on.

To open the `rlcheck` CLI:

1. Sign in to the Redis Enterprise Software host with an account that is a member of the **redislabs** operating system group.

1. Run: `rlcheck`

The utility runs and reports the result of each check.

To resolve issues reported by `rlcheck`, [contact Redis support](https://redis.com/company/support/).

## Options

To see more options for `rlcheck`, run:

```sh
rlcheck --help
```

The `--continue-on-error` option runs all tests to completion and shows all errors when complete.
