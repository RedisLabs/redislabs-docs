---
Title: Install and set up Redis Enterprise Software
linkTitle: Install and setup
description: Learn how to install, set up, and upgrade Redis Enterprise Software.
weight: 35
alwaysopen: false
toc: "true"
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/
        /rs/installing-upgrading/downloading-installing/
---

## Quickstarts

If you want to try out Redis Enterprise Software, see the following quickstarts:

- [Redis Enterprise Software quickstart]({{<relref "/rs/installing-upgrading/quickstarts/get-started-redis-enterprise-software">}})

- [Docker quickstart for Redis Enterprise Software]({{<relref "/rs/installing-upgrading/quickstarts/get-started-docker">}})

## Install Redis Enterprise Software

To install Redis Enterprise Software on a [supported platform]({{<relref "/rs/installing-upgrading/plan-deployment/supported-platforms">}}), you need to:

1. [Plan your deployment]({{<relref "/rs/installing-upgrading/plan-deployment">}}).

1. [Download the installation package]({{<relref "/rs/installing-upgrading/prepare-install/download-install-package">}}).

1. [Prepare to install]({{<relref "/rs/installing-upgrading/prepare-install">}}).

1. [Perform the install]({{<relref "/rs/installing-upgrading/install">}}).

Depending on your needs, you may also want to [customize the installation](#more-info-and-options).

## Upgrade existing deployment

If you already installed Redis Enterprise Software, you can:

- [Upgrade a cluster]({{<relref "/rs/installing-upgrading/upgrading/upgrade-cluster">}})

- [Upgrade a database]({{<relref "/rs/installing-upgrading/upgrading/upgrade-database">}})

- [Upgrade an Active-Active database]({{<relref "/rs/installing-upgrading/upgrading/upgrade-active-active">}})

## Uninstall Redis Enterprise Software

- [Uninstall existing deployment]({{<relref "/rs/installing-upgrading/uninstalling">}})

## More info and options

More information is available to help with customization and related questions:

- [CentOS/RHEL firewall configuration]({{< relref "rs/installing-upgrading/configuring/centos-rhel-firewall.md" >}})
- [Change socket file location]({{< relref "rs/installing-upgrading/configuring/change-location-socket-files.md" >}})
- [Cluster DNS configuration]({{< relref "rs/networking/cluster-dns.md" >}})
- [Cluster load balancer setup]({{< relref "rs/networking/cluster-lba-setup.md" >}})
- [File locations]({{<relref "rs/installing-upgrading/plan-deployment/file-locations.md">}})
- [Linux swap space configuration]({{< relref "rs/installing-upgrading/configuring/linux-swap.md" >}})
- [mDNS client prerequisites]({{< relref "rs/networking/mdns.md" >}})
- [User and group ownership]({{<relref "rs/installing-upgrading/install/customize-user-and-group.md">}})

## Next steps

After you install Redis Enterprise Software and set up your cluster, you can:

- [Add users]({{<relref "/rs/security/access-control/manage-users/add-users">}}) to the cluster with specific permissions.  To begin, start with [Access control]({{<relref "/rs/security/access-control">}}).

- [Create databases]({{<relref "/rs/databases/create">}}) to use with your applications.

