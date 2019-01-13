---
Title: Supported Platforms
description: 
weight: $weight
alwaysopen: false
categories: ["RS"]
---
Redis Enterprise Software (RS) is supported on several operating
systems, cloud environments, and virtual environments.

 {{% note title="64-bit OS"%}}Only 64-bit operating systems are supported.{{% /note %}}

| **Platform** | **Versions/Information** |
|------------|-----------------|
| Ubuntu | 14.04, 16.04, 18.04<br>Server version is recommended for production installations. Desktop version is only recommended for development deployments. |
| RHEL/CentOS 6 |  6.7, 6.8, 6.9<br>Requires at least "Minimal Install" configuration. |
| RHEL/CentOS 7 | 7.0, 7.1, 7.2, 7.3, 7.4, 7.5<br>Requires at least "Minimal Install" configuration. For additional considerations, refer to [CentOS / RHEL 7 firewall configuration]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}). |
| Oracle Linux | 6.7, 6.8, 6.9; 7.0, 7.1, 7.2, 7.3, 7.4 |
| Amazon Linux | All 64-bit Versions |
| Docker | At this time, official Redis Enterprise Software Docker images are Linux-based images and therefore are only certified for production use on a Linux host. All other OS hosts are certified for Development and Testing only. |

No other applications should be running on the same server that is
running RS. The RS software's resource consumption assumes that all RAM
on the server is exclusively allocated to the OS and RS; thus, other
applications running on the same server can interfere with RS's proper
functioning.

Note: Cloning of servers/VMs/instances with Redis Enterprise Software
already install/deployed, is **NOT** supported. It must be a fresh
install of RS each time.
