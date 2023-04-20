---
Title: Plan Redis Enterprise Software deployment
linkTitle: Plan deployment
description: Plan a deployment of Redis Enterprise Software.
weight: 20
alwaysopen: false
categories: ["RS"]
aliases: 
---

Before installing Redis Enterprise Software, you need to:

- Set up your hardware. See [Hardware requirements]({{< relref "/rs/installing-upgrading/plan-deployment/hardware-requirements.md" >}}) and [Persistent and ephemeral node storage 
]({{<relref "/rs/installing-upgrading/plan-deployment/persistent-ephemeral-storage">}}) for more information.

- Choose your [deployment platform]({{< relref "/rs/installing-upgrading/plan-deployment/supported-platforms.md" >}}).

    Redis Enterprise Software supports a variety of platforms, including:

    - Multiple Linux distributions (Ubuntu, Red Hat Enterprise Linux (RHEL), IBM CentOS, Oracle Linux)
    - [Amazon AWS AMI]({{< relref "configuring-aws-instances.md" >}})
    - [Docker container]({{< relref "/rs/installing-upgrading/quickstarts/docker-quickstart" >}}) (for development and testing only)
    - [Kubernetes]({{< relref "/kubernetes/_index.md" >}})

    For more details, see [Supported platforms]({{< relref "/rs/installing-upgrading/plan-deployment/supported-platforms.md" >}}).

- Open appropriate [network ports]({{< relref "/rs/networking/port-configurations.md" >}}) in the firewall to allow connections to the nodes.

- Configure [cluster DNS]({{< relref "/rs/networking/cluster-dns.md" >}}) so that cluster nodes can reach each other by DNS names.
- By default, the installation process requires an internet connection to install dependencies and synchronize the operating system clock. To learn more, see [Offline installation]({{<relref "/rs/installing-upgrading/install/offline-installation">}}).

## Next steps

After you finish planning your deployment, you can:

- [Download an installation package]({{<relref "/rs/installing-upgrading/prepare-install/download-install-package">}}).

- [Prepare to install]({{<relref "/rs/installing-upgrading/prepare-install">}}) Redis Enterprise Software.

- [View installation questions]({{<relref "/rs/installing-upgrading/prepare-install/manage-installation-questions">}}) and prepare answers before installation.
