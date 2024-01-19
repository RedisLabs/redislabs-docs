---
Title: Install Redis Enterprise Software
linkTitle: Install
description: Install Redis Enterprise Software on Linux.
weight: 35
alwaysopen: false
categories: ["RS"]
aliases: 
---

After you [plan your deployment]({{<relref "/rs/installing-upgrading/install/plan-deployment">}}), [download a Redis Enterprise Software installation package]({{<relref "/rs/installing-upgrading/install/prepare-install/download-install-package">}}), and finish [installation preparation]({{<relref "/rs/installing-upgrading/install/prepare-install">}}):

1. [Install the Redis Enterprise Software package]({{<relref "/rs/installing-upgrading/install/install-on-linux">}}) on one of the nodes in the cluster.

1. Repeat this process for each node in the cluster.

For installation on machines without an internet connection, see [Offline installation]({{<relref "/rs/installing-upgrading/install/offline-installation">}}).

## Permissions and access

- Redis Enterprise Software installation creates the `redislabs:redislabs` user and group. 

    Assigning other users to the `redislabs` group is optional. Users belonging to the `redislabs` group have permission to read and execute (e.g. use the `rladmin` status command) but are not allowed to write (or delete) files or directories.

- Redis Enterprise Software is certified to run with permissions set to `750`, an industry standard.

    {{<warning>}}
Do not reduce permissions to `700`. This configuration has not been tested and is not supported.
    {{</warning>}}

## More info and options

If you've already installed Redis Enterprise Software, you can also:

- [Upgrade an existing deployment]({{<relref "rs/installing-upgrading/upgrading">}}).

- [Uninstall an existing deployment]({{<relref "rs/installing-upgrading/uninstalling.md">}}).

To learn more about customization and find answers to related questions, see:

- [CentOS/RHEL Firewall configuration]({{< relref "rs/installing-upgrading/configuring/centos-rhel-firewall.md" >}})
- [Change socket file location]({{< relref "rs/installing-upgrading/configuring/change-location-socket-files.md" >}})
- [Cluster DNS configuration]({{< relref "rs/networking/cluster-dns.md" >}})
- [Cluster load balancer setup]({{< relref "rs/networking/cluster-lba-setup.md" >}})
- [File locations]({{<relref "rs/installing-upgrading/install/plan-deployment/file-locations.md">}})
- [Supported platforms]({{<relref "rs/installing-upgrading/install/plan-deployment/supported-platforms.md">}})
- [Manage installation questions]({{<relref "rs/installing-upgrading/install/manage-installation-questions.md">}})
- [mDNS client prerequisites]({{< relref "rs/networking/mdns.md" >}})
- [User and group ownership]({{<relref "rs/installing-upgrading/install/customize-user-and-group.md">}})

## Next steps

After your cluster is set up with nodes, you can:

- [Add users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) to the cluster with specific permissions.  To begin, start with [Access control]({{<relref "/rs/security/access-control">}}).
- [Create databases]({{< relref "/rs/databases/create" >}}) to use with your applications.

