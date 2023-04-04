---
Title: Install and setup
linkTitle: Install and setup
description:
weight: 35
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/
        /rs/installing-upgrading/downloading-installing/
---
This guide shows how to install Redis Enterprise Software, which includes several steps:

1. [Plan your deployment](#plan-your-deployment)
1. Download the [installation package](#download-the-installation-package)
1. [Prepare to install](#prepare-to-install-on-linux)
1. [Perform the install](#install-on-linux)

Depending on your needs, you may also want to [customize the installation](#more-info-and-options).

## More info and options

If you've already installed Redis Enterprise Software, you can also:

- [Upgrade an existing deployment]({{<relref "rs/installing-upgrading/upgrading">}})

- [Uninstall an existing deployment]({{<relref "rs/installing-upgrading/uninstalling.md">}})

More info is available to help with customization and related questions:

- [AWS EC2 configuration]({{<relref "rs/installing-upgrading/plan-deployment/configuring-aws-instances.md">}})
- [CentOS/RHEL Firewall configuration]({{< relref "rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}})
- [Change socket file location]({{< relref "rs/installing-upgrading/configuring/change-location-socket-files.md" >}})
- [Cluster DNS configuration]({{< relref "rs/networking/cluster-dns.md" >}})
- [Cluster load balancer setup]({{< relref "rs/networking/cluster-lba-setup.md" >}})
- [File locations]({{<relref "rs/installing-upgrading/plan-deployment/file-locations.md">}})
- [Supported platforms]({{<relref "rs/installing-upgrading/plan-deployment/supported-platforms.md">}})
- [Linux swap space configuration]({{< relref "rs/installing-upgrading/configuring/linux-swap.md" >}})
- [Manage installation questions]({{<relref "rs/installing-upgrading/prepare-install/manage-installation-questions.md">}})
- [mDNS client prerequisites]({{< relref "rs/networking/mdns.md" >}})
- [Offline installation]({{<relref "rs/installing-upgrading/offline-installation.md">}})
- [User and group ownership]({{<relref "rs/installing-upgrading/prepare-install/customize-user-and-group.md">}})

## Next steps

Now that your cluster is set up with nodes, you can:

- [Add users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) to the cluster with specific permissions.  To begin, start with [Access control]({{<relref "/rs/security/access-control">}}).
- [Create databases]({{< relref "/rs/administering/creating-databases/_index.md" >}}) to use with your applications.

