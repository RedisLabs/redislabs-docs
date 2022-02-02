---
Title: Node Verification Utility (rlcheck)
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/references/cli-reference/rlcheck/
---
The `rlcheck` utility runs various health checks on an Redis Enterprise Software node and alerts on any issues found.
This utility can be useful to confirm a successful installation or to verify that the node is functioning properly.

You can access `rlcheck` from the host command-line interface (CLI).
The output of `rlcheck` shows information specific to the host that you run it on.

To open the `rladmin` CLI:

1. Sign in to the Redis Enterprise Software host with an account that is a member of the **redislabs** operating system group.

1. Run: `rlcheck`

The utility runs and reports the result of each check.

{{< note >}}
To see the `rlcheck` optional flags, run: `rlcheck --help`
Specifically, the `--continue-on-error` flag runs all tests to completion and shows all errors when complete.
{{< /note >}}

To resolve issues reported by `rlcheck`, [contact Redis support](https://redislabs.com/company/support/).
