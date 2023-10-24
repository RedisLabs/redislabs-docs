---
Title: Upgrade operating system version for Redis Enterprise Software cluster
linkTitle: Upgrade operating system
description: Upgrade a Redis Enterprise Software cluster's operating system.
weight: 70
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

## Prerequisites

Before you upgrade a cluster to a later operating system version, do the following:

1. [Upgrade all nodes in the cluster]({{<relref "/rs/installing-upgrading/upgrading/upgrade-cluster">}}) to a Redis Enterprise Software version that also supports the later operating system.

    To learn which versions of Redis Enterprise Software support the operating system version you want to upgrade to, see [Supported platforms]({{<relref "/rs/references/supported-platforms#supported-platforms">}}).

1. If the cluster contains databases that use modules:

    1. You must update all nodes in the cluster to [Redis Enterprise Software version 7.2.4-52]({{<relref "/rs/release-notes/rs-7-2-4-releases">}}) or later before you upgrade the operating system.

    1. If any existing databases use custom modules, manually uploaded modules, or earlier module versions, you must upload module packages with the same module version, but compiled for the new operating system, to a cluster node.

        See [Install a module on a cluster]({{<relref "/stack/install/add-module-to-cluster">}}) for instructions.

## Perform rolling upgrade

To upgrade the cluster's operating system, use one of the following rolling upgrade methods:

- [Extra node method](#extra-node-upgrade) - recommended if you have additional resources available

- [Replace node method](#replace-node-upgrade) - recommended if you cannot temporarily allocate additional resources

### Extra node upgrade method {#extra-node-upgrade}

1. Create a node with the new operating system version.

1. [Install the same Redis Enterprise Software version]({{<relref "/rs/installing-upgrading/install/install-on-linux">}}) on the newly created node using the installation package that matches the new operating system version.

1. [Add the newly installed node]({{<relref "/rs/clusters/add-node">}})  to the cluster.

1. [Remove one node]({{<relref "/rs/clusters/remove-node#remove-a-node">}}) running the earlier operating system version from the cluster.

1. Repeat the previous steps until all the nodes running on the earlier operating system version are removed from the cluster.

### Replace node upgrade method {#replace-node-upgrade}

1. [Remove a node]({{<relref "/rs/clusters/remove-node#remove-a-node">}}) with the earlier operating system version from the cluster.

1. Uninstall Redis Enterprise Software from the removed node:

    ```sh
    sudo ./rl_uninstall.sh
    ```

1. Either upgrade the existing node to the new operating system version or add a new machine with the new operating system version.

1. [Install the same Redis Enterprise Software version]({{<relref "/rs/installing-upgrading/install/install-on-linux">}}) on the new instance using the installation package that matches the new operating system version.

1. Replace the removed node with the new node using [`rladmin cluster join`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/join">}}) and the `replace_node` flag:

    ```sh
    rladmin cluster join nodes <cluster_member_ip_address> username <username> password <password> replace_node <node_id>
    ```

1. Verify node health:

    1. Run `rlcheck` on all nodes:

        ```sh
        rlcheck
        ```

    1. Run [`rladmin status`]({{<relref "/rs/references/cli-utilities/rladmin/status">}}) on the new node:

        ```sh
        rladmin status extra all
        ```

1. Repeat the previous steps until all nodes running on the earlier operating system version are replaced.
