---
Title: Creating a Support Package
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
If you encounter any issues that you are not able to resolve yourself
and need to [contact Redis Labs support](https://redislabs.com/company/support/) for assistance, you can create a
support package that gathers all essential information to help us debug
your issues.

{{< note >}}
The process of creating the support package can take several minutes and generates load on the system.
{{< /note >}}

## Creating a support package

To create a support package:

1. Click **Support** at the top right of the management UI.
1. Click **Create Support Package** at the bottom of the page, and confirm the action.
    The package is created and downloaded by your browser.

{{% expand "The package creation failed with an error? You can't access the UI?" %}}
If package creation fails with `internal error` or if you cannot access the UI, create a support package for the cluster from the command-line on any of the nodes in the cluster with the command: `/opt/redislabs/bin/rladmin cluster debug_info`

- If `rladmin cluster debug_info` fails for lack of space in the `/tmp` directory, you can:

    1. Change the storage location where the support package is saved: `rladmin cluster config debuginfo_path <path>`

        The `redislabs` user must have write access to the storage location.
    1. On any one of the node in the cluster, run: `rladmin cluster debug_info`

- If `rladmin cluster debug_info` fails for another reason, you can create a support package for the cluster from the command-line on each node in the cluster with the command: `/opt/redislabs/bin/debuginfo`

Upload the tar archive to [Redis Labs Support](https://support.redislabs.com). The path to the archive is shown in the command output.
{{% /expand %}}
