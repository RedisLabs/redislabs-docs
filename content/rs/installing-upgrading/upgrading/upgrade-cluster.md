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
| 6.4.x | 7.2 |
| 6.2.x | 7.2<br />6.4.x |
| 6.0.x | 7.2<br />6.4.x<br />6.2.x |

## Upgrade prerequisites

Before upgrading a cluster:

- Verify access to [rlcheck]({{< relref "/rs/references/cli-utilities/rlcheck/" >}}) and [rladmin]({{< relref "/rs/references/cli-utilities/rladmin/#use-the-rladmin-shell" >}}) commands

- Verify that you meet the upgrade path requirements for your desired cluster version and review the relevant [release notes]({{< relref "/rs/release-notes/_index.md" >}}) for any preparation instructions.

- Upgrade the cluster's primary (master) node first. To identify the primary node, use one of the following methods:

    - **Nodes** screen in the new admin console (only available for Redis Enterprise versions 7.2 and later)

    - [`rladmin status nodes`]({{<relref "/rs/references/cli-utilities/rladmin/status#status-nodes">}}) command
    
    - [`GET /nodes/status`]({{<relref "/rs/references/rest-api/requests/nodes/status#get-all-nodes-status">}}) REST API request

## Upgrade cluster

Starting with the primary (master) node, follow these steps for every node in the cluster. To ensure cluster availability, upgrade each node separately.

1.  Verify node operation with the following commands:

    ``` shell
    $ rlcheck
    $ rladmin status extra all
    ```

2.  Download the Redis Enterprise Software installation package to the machine running the node from the [Download Center](https://app.redislabs.com) on https://app.redislabs.com.  

3.  Extract the installation package:

    ```sh
    tar vxf <tarfile name>
    ```

    {{<note>}}
You cannot change the installation path or the user during the upgrade.
    {{</note>}}

1.  Run the install command. See [installation script options]({{<relref "/rs/installing-upgrading/install/install-script">}}) for a list of command-line options you can add to the following command:

    ``` shell
    sudo ./install.sh
    ```

    The installation script automatically recognizes the upgrade and responds accordingly.

    The upgrade replaces all node processes, which might briefly interrupt any active connections.

2.  Verify the node was upgraded to the new version and is still operational:

    ``` shell
    $ rlcheck
    $ rladmin status extra all
    ```

3.  Visit the admin console.

    If the admin console was open in a web browser during the upgrade, refresh the browser to reload the console.

After all nodes are upgraded, the cluster is fully upgraded. Certain features introduced in the new version of Redis Enterprise Software only become available after upgrading the entire cluster.

After upgrading from version 6.0.x to 6.2.x, restart `cnm_exec` on each cluster node to enable more advanced state machine handling capabilities:

```sh
supervisorctl restart cnm_exec
```
