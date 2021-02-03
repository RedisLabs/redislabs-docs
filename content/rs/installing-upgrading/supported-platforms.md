---
Title: Supported Platforms
description:
weight: 10
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/designing-production/supported-platforms/
---
Redis Enterprise Software (RS) is supported on several operating systems, cloud environments, and virtual environments.

{{% note %}}
Make sure your system meets these requirements:

- Only 64-bit operating systems are supported.
- You must install Redis Enterprise Software directly on the host, not through system cloning.
- You must install on a clean host with no other applications running so that all RAM is allocated to the OS and RS only.
- Linux distributions must be installed with at least "Minimal Install" configuration.
{{% /note %}}

| **Platform** | **Versions/Information** |
|------------|-----------------|
| Ubuntu | 14.04, 16.04, 18.04<br>Server version is recommended for production installations. Desktop version is only recommended for development deployments. |
| RHEL/CentOS 6 |  6.7, 6.8, 6.9 |
| RHEL/CentOS 7 | 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9<br>Requires OpenSSL 1.0.2 and [firewall configuration]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}) |
| Oracle Linux 6 | Based on the corresponding RHEL version |
| Oracle Linux 7 | Based on the corresponding RHEL version |
| Amazon Linux | Version 1 |
| Docker | Redis Enterprise Software Docker images are certified for Development and Testing only. |
| Kubernetes, Pivotal Platform (PCF) and other orchestration and cloud environments | See the [Platform documentation]({{< relref "/platforms" >}}) |
