---
Title: Install Redis Enterprise Software
linkTitle: Install
description: Install Redis Enterprise Software on Linux.
weight: 35
alwaysopen: false
categories: ["RS"]
aliases: 
---

## Install on Linux

After you download the .tar file installation package, install the package on one of the nodes in the cluster.

Repeat this process for each node in the cluster.

1. [Create]({{< relref "/rs/clusters/new-cluster-setup.md" >}})
    or [join]({{< relref "/rs/clusters/add-node.md" >}}) an existing Redis Enterprise Software cluster.
1. [Create a database]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

    For geo-distributed Active-Active replication, create an [Active-Active]({{< relref "/rs/databases/active-active/create.md" >}}) database.

## Permissions and access

- Redis Enterprise Software installation creates the `redislabs:redislabs` user and group. 

    Assigning other users to the `redislabs` group is optional. Users belonging to the `redislabs` group have permission to read and execute (e.g. use the `rladmin` status command) but are not allowed to write (or delete) files or directories.

- Redis Enterprise Software is certified to run with permissions set to `750`, an industry standard.

    We recommend against reducing permissions to `700`; this configuration has not been tested and is not supported.

## More info and options

If you've already installed Redis Enterprise Software, you can also:

- [Upgrade an existing deployment]({{<relref "rs/installing-upgrading/upgrading">}})

- [Uninstall an existing deployment]({{<relref "rs/installing-upgrading/uninstalling.md">}})

More info is available to help with customization and related questions:

- [AWS EC2 configuration]({{<relref "rs/installing-upgrading/plan-deployment/configuring-aws-instances.md">}})
- [CentOS/RHEL Firewall configuration]({{< relref "rs/installing-upgrading/configuring/centos-rhel-firewall.md" >}})
- [Change socket file location]({{< relref "rs/installing-upgrading/configuring/change-location-socket-files.md" >}})
- [Cluster DNS configuration]({{< relref "rs/networking/cluster-dns.md" >}})
- [Cluster load balancer setup]({{< relref "rs/networking/cluster-lba-setup.md" >}})
- [File locations]({{<relref "rs/installing-upgrading/plan-deployment/file-locations.md">}})
- [Supported platforms]({{<relref "rs/installing-upgrading/plan-deployment/supported-platforms.md">}})
- [Linux swap space configuration]({{< relref "rs/installing-upgrading/configuring/linux-swap.md" >}})
- [Manage installation questions]({{<relref "rs/installing-upgrading/prepare-install/manage-installation-questions.md">}})
- [mDNS client prerequisites]({{< relref "rs/networking/mdns.md" >}})
- [Offline installation]({{<relref "rs/installing-upgrading/install/offline-installation.md">}})
- [User and group ownership]({{<relref "rs/installing-upgrading/prepare-install/customize-user-and-group.md">}})

## Next steps

After your cluster is set up with nodes, you can:

- [Add users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) to the cluster with specific permissions.  To begin, start with [Access control]({{<relref "/rs/security/access-control">}}).
- [Create databases]({{< relref "/rs/administering/creating-databases/_index.md" >}}) to use with your applications.

