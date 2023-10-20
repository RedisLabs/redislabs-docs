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

1. [Upgrade all nodes in the cluster]({{<relref "/rs/installing-upgrading/upgrading/upgrade-cluster">}}) to a Redis Enterprise Software version that supports the later operating system version. To learn which versions of Redis Enterprise Software support the operating system version you want to upgrade to, see [Supported platforms]({{<relref "/rs/references/supported-platforms#supported-platforms">}}).

    <!-- potentially confusing, clarify that you are still using the RHEL7 version of the package, not RHEL8 yet -->

1. If any existing databases use custom or manually uploaded modules, upload the module package compiled for the new operating system version to each node.

## Perform rolling upgrade

- [Add extra nodes method (n + 1)](#upgrade-n-plus-1)

- [Remove then replace nodes method (n - 1)](#upgrade-n-minus-1)

<!--
Questions: 

1. Is one upgrade method preferred over the other?

    - Yes, the n + 1 method

1. The main reason to use n - 1 instead is if you don't have access to additional resources to perform the recommended n + 1 method
-->

### (n + 1) Add new node before removing old node {#upgrade-n-plus-1}

1. Create a node with the new operating system version.

1. [Install the same Redis Enterprise Software version]({{<relref "/rs/installing-upgrading/install/install-on-linux">}}) on the newly created node using the installation package that matches the new operating system version.

1. [Add the newly installed node]({{<relref "/rs/clusters/add-node">}})  to the cluster.

1. [Remove one node]({{<relref "/rs/clusters/remove-node#remove-a-node">}}) running the earlier operating system version from the cluster.

1. Repeat the previous steps until all the nodes running on the earlier operating system version are removed from the cluster.

### (n - 1) Remove then replace each node to upgrade {#upgrade-n-minus-1}

One node at a time, upgrade the operating system for each node in the cluster:

1. [Remove a node]({{<relref "/rs/clusters/remove-node#remove-a-node">}}) with the old OS from the cluster.

1. Uninstall Redis Enterprise Software from the removed node:

    ```sh
    sudo ./rl_uninstall.sh
    ```

1. Either upgrade the existing node to the new operating system version or add a new machine with the new operating system version.

1. Install the same version of Redis Enterprise Software on the new instance using the installation package that matches the new operating system version.

1. Join the cluster with `replace_node` flag.

    ```sh
    rladmin cluster join nodes <cluster_member_ip_address> username <username> password <password> replace_node <node_id>
    ```

1. Verify node health:

    1. Run `rlcheck` on all nodes:

        ```sh
        rlcheck
        ```

    1. Run `rladmin status extra all` on a new node:

        ```sh
        rladmin status extra all
        ```
