---
Title: Upgrade an existing Redis Enterprise Software deployment
linkTitle: Upgrade
description:
weight: 60
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/upgrading/,
         /rs/installing-upgrading/upgrading/
---
To upgrade Redis Enterprise Software:

1. Verify appropriate [network ports]({{< relref "/rs/networking/port-configurations.md" >}}) are either open or used by Redis Enterprise Software.

1. [Upgrade the software on all nodes of the cluster.]({{<relref "/rs/installing-upgrading/upgrading/upgrade-cluster">}})

2. _(Optional)_ [Upgrade each database]({{<relref "/rs/installing-upgrading/upgrading/upgrade-database">}}) in the cluster or [upgrade an Active-Active database]({{<relref "/rs/installing-upgrading/upgrading/upgrade-active-active">}}) to enable new features and important fixes.
