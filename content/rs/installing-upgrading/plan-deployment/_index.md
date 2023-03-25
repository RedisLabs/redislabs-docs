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

- Set up [your hardware]({{< relref "/rs/installing-upgrading/plan-deployment/hardware-requirements.md" >}}).

- Choose your [deployment platform]({{< relref "/rs/installing-upgrading/plan-deployment/supported-platforms.md" >}}).

    Redis Enterprise Software supports a variety of platforms, including:

    - Multiple Linux distributions (Ubuntu, RedHat Enterprise Linux (RHEL)/IBM CentOS, Oracle Linux)
    - [Amazon AWS AMI]({{< relref "configuring-aws-instances.md" >}})
    - [Docker container]({{< relref "/rs/installing-upgrading/get-started/get-started-docker.md" >}}) (for development and testing only)
    - [Kubernetes]({{< relref "/kubernetes/_index.md" >}})

    For complete details, see [Supported platforms]({{< relref "/rs/installing-upgrading/plan-deployment/supported-platforms.md" >}})

- Open appropriate [network ports]({{< relref "/rs/networking/port-configurations.md" >}}) in the firewall to allow connections to the nodes.

- Configure [cluster DNS]({{< relref "/rs/networking/cluster-dns.md" >}}) so that cluster nodes can reach each other by DNS names.
- By default, the install process requires an Internet connection to install dependencies and to synchronize the operating system clock.  To learn more, see [Offline installation]({{<relref "/rs/installing-upgrading/offline-installation">}}).

{{< allchildren style="h2" description="true" />}}
