
Redis Enterprise Software (RS) is supported on several operating systems, cloud environments, and virtual environments.

{{< note >}}
Make sure your system meets these requirements:

- Only 64-bit operating systems are supported.
- You must install Redis Enterprise Software directly on the host, not through system cloning.
- You must install on a clean host with no other applications running so that all RAM is allocated to the OS and RS only.
- Linux distributions must be installed with at least "Minimal Install" configuration.
{{< /note >}}

| **Platform** | **Versions/Information** |
|------------|-----------------|
| Ubuntu | 14.04 (Support ends on November 30, 2020)<br>16.04, 18.04<br>Server version is recommended for production installations. Desktop version is only recommended for development deployments. |
| RHEL/CentOS 6 | 6.7, 6.8, 6.9 (Support ends on November 30, 2020) |
| RHEL/CentOS 7 | 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9<br>Requires OpenSSL 1.0.2 and [firewall configuration]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}) |
| Oracle Linux 6 | Based on the corresponding RHEL version |
| Oracle Linux 7 | Based on the corresponding RHEL version |
| Amazon Linux | Version 1 |
| Docker | [Docker images]({{< relref "/rs/getting-started/getting-started-docker.md" >}}) of Redis Enterprise Software are certified for Development and Testing only. |
| Kubernetes, Pivotal Platform (PCF) and other orchestration and cloud environments | See the [Platform documentation]({{< relref "/platforms" >}}) |

## VMware

Redis Enterprise is compatible with VMware, but make sure that you:

- Configure your memory, CPU, network, and storage settings to allow for optimal Redis Enterprise performance.
- Pin each Redis Enterprise shard to a specific ESX/ESXi host by setting the appropriate affinity rules.
- If you must manually migrate a virtual machine to another host, follow the best practices for shard maintenance and contact support if you have questions.
- Disable VMware VMotion because Redis Enterprise is not compatible with VMotion.
- Don't use VMware snapshots because Redis Enterprise cluster manages state dynamically, so a snapshot might not have the correct node and cluster state.
