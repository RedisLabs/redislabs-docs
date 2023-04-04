---
Title: Upgrade a Redis Enterprise Software cluster
linkTitle: Upgrade cluster
description: Upgrade a Redis Enterprise Software cluster.
weight: 30
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: 
---

## Supported upgrade paths

The following upgrade paths are supported:

| Current<br/>cluster version | Upgrade to<br/>cluster version |
|:-----:|:-----:|
| 6.2.x | 6.4.2 |
| 6.0.x | 6.4.2<br />6.2.x |
| 5.6   | 6.0.x |

## Upgrade prerequisites

Before upgrading a cluster:

- Verify that you meet the upgrade path requirements for your desired cluster version and review the relevant [release notes]({{< relref "/rs/release-notes/_index.md" >}}) for any preparation instructions.

- Identify the cluster master node and upgrade that node first.

    Use the [`rladmin status nodes`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-nodes">}}) command or send a [`GET /nodes/status`]({{<relref "/rs/references/rest-api/requests/nodes/status#get-all-nodes-status">}}) request to the [REST API]({{<relref "/rs/references/rest-api">}}) to identify the master node.

## Upgrade cluster

Starting with the master node, follow these steps for every node in the cluster.  (We recommend upgrading each node separately to ensure cluster availability.)

1.  Download the Redis Enterprise Software installation package to the machine running the node.  

    For help, see [Download the installation package]({{< relref "/rs/installing-upgrading#download-the-installation-package" >}})

1.  Untar the installation package.  Note that neither the installation path nor the user can be changed during the upgrade.

1.  Verify node operation with the following commands:

    ``` shell
    rlcheck
    rladmin status extra all
    ```

1.  Run the install command:

    ``` shell
    sudo ./install.sh -y
    ```

    The installation script automatically recognizes the upgrade and responds accordingly.

    The upgrade replaces all node processes, which might briefly interrupt any active connections.

1.  Verify node operation by repeating the commands from Step 3.

1.  If the admin console was open in a web browser during the upgrade, refresh the browser to reload the console.

When each node is upgraded, the cluster is fully upgraded.
