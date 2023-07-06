---
Title: Prepare to install Redis Enterprise Software
linkTitle: Prepare to install
description: Prepare to install Redis Enterprise Software.
weight: 6
alwaysopen: false
categories: ["RS"]
aliases: 
---

Before you install Redis Enterprise Software:

- [Download an installation package]({{<relref "/rs/installing-upgrading/install/prepare-install/download-install-package">}}).

- [View installation questions]({{<relref "/rs/installing-upgrading/install/manage-installation-questions">}}) and optionally prepare answers before installation.

- Review the [security considerations]({{< relref "/rs/security/" >}}) for your deployment.

- Check that you have root-level access to each node, either directly or with `sudo`.

- Check that all [required ports are available]({{<relref "/rs/installing-upgrading/install/prepare-install/port-availability">}}).

- [Turn off Linux swap]({{< relref "/rs/installing-upgrading/configuring/linux-swap.md" >}}) on all cluster nodes.

- If you require the `redislabs` UID (user ID) and GID (group ID) numbers to be the same on all the nodes, create the `redislabs` user and group with the required numbers on each node.

- If you want to use Auto Tiering for your databases, see [Prepare Auto Tiering]({{<relref "/rs/installing-upgrading/install/prepare-install/prepare-flash">}}).

## Next steps

- View [installation script options]({{<relref "/rs/installing-upgrading/install/install-script">}}) before starting the installation.

- [Install Redis Enterprise Software]({{<relref "/rs/installing-upgrading/install">}}).
