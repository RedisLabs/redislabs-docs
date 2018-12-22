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

If you get `internal error` on the UI while creating support package, or if you cannot access the UI, please execute `/opt/redislabs/bin/rladmin cluster debug_info` for version > 4.4 on any one of the node in the cluster. If it still fails, then please execute the command `/opt/redislabs/bin/debuginfo` on each node of the cluster and upload the tarball thus created. The path to the tarball is shown at the end after the command executes successfully.

Note that creating a support package might take several minutes and
might overload the system; therefore, do not attempt to initiate this
process unless it is necessary.
