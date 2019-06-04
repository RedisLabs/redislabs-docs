---
Title: Creating a support package
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
If you encounter any issues that you are not able to resolve yourself
and need to contact Redis Labs support for assistance, you can create a
support package that gathers all essential information to help us debug
your issues.

## Creating a support package

To create a support package:

1. Click **Support** at the top right of the management UI.
1. Click **Create Support Package** at the bottom of the page, and
    confirm the action.
    The package is created and downloaded by your browser.

{{%expand "The package creation failed with an error? You can't access the UI?" %}}
If package creation fails with `internal error` or if you cannot access the UI, create a support package for the cluster from the command-line:

- On any one of the node in the cluster, run: `/opt/redislabs/bin/rladmin cluster debug_info`

If this command fails, you can create a support package for the cluster, using the following from the command-line:

- On each node of the cluster, run: `/opt/redislabs/bin/debuginfo`

Upload the tar archive to the [Redis Labs Support site](https://support.redislabs.com). The path to the archive is shown in the command output.
{{% /expand%}}

Note that creating a support package might take several minutes and
might overload the system; therefore, do not attempt to initiate this
process unless it is necessary.
