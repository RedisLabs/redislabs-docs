---
Title: Supported Platforms
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/supported-platforms/
---
Redis Enterprise Software (RS) is supported on several operating systems, cloud environments, and virtual environments.

{{< note >}}
Make sure your system meets these requirements:

- Only 64-bit operating systems are supported.
- You must install Redis Enterprise Software directly on the host, not through system cloning.
- You must install on a clean host with no other applications running so that all RAM is allocated to the OS and RS only.
- Linux distributions must be installed with at least "Minimal Install" configuration.
- All nodes in the cluster must run the same OS version.
{{< /note >}}

| **Platform** | **Versions/Information** |
|------------|-----------------|
| Ubuntu | 16.04, 18.04<br>Server version is recommended for production installations. Desktop version is only recommended for development deployments. |
| RHEL/CentOS 7 | 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8<br>Requires OpenSSL 1.0.2 and [firewall configuration]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}) |
| Oracle Linux 7 | Based on the corresponding RHEL version |
| Amazon Linux | Version 1 |
| Docker | [Docker images]({{< relref "/rs/getting-started/getting-started-docker.md" >}}) of Redis Enterprise Software are certified for Development and Testing only. |
| Kubernetes, Pivotal Platform (PCF) and other orchestration and cloud environments | See the [Platform documentation]({{< relref "/platforms" >}}) |
| RHEL/CentOS 6, Oracle Linux 6, Ubuntu 14.04 | Support ended on November 30, 2020 |

## VMware

Redis Enterprise is compatible with VMware.

However, when deploying on VMware, you must carefully configure your memory, CPU,
network, and storage settings to ensure optimal Redis Enterprise performance.

You also need to ensure that each Redis Enterprise shard is pinned to a specific ESX/ESXi host by setting the appropriate affinity rules.

If you must manually migrate a virtual machine to another host, please ensure that you follow the best practices for shard maintenance, and [contact Redis Labs support](https://redislabs.com/company/support/) if you have questions.

## VMware limitations

Note that Redis Enterprise is not compatible with VMware VMotion at this time. To use Redis Enterprise on VMware, you must disable VMotion.

In addition, VMware snapshotting is unsupported. Redis Enterprise cluster manages state dynamically. We don't support VMware snapshotting because a VM restored from a snapshot might not have the correct node and cluster state.
