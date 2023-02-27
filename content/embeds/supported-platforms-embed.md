
Redis Enterprise Software is supported on several operating systems, cloud environments, and virtual environments.

## System requirements

Make sure your system meets these requirements:

- Only 64-bit operating systems are supported.
- You must install Redis Enterprise Software directly on the host, not through system cloning.
- You must install on a clean host with no other applications running so that all RAM is allocated to the operating system and Redis Enterprise Software  only.
- Linux distributions must be installed with at least "Minimal Install" configuration.

## Supported platforms

| **Platform** | **Versions/Information** |
|------------|-----------------|
| Ubuntu | 16.04 (deprecated), 18.04<br>Server version is recommended for production installations. Desktop version is only recommended for development deployments. |
| Red Hat Enterprise Linux (RHEL) 7, CentOS 7 | 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9<br>Requires OpenSSL 1.0.2 and [firewall configuration]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}) |
| <nobr>RHEL 8, CentOS 8</nobr> | 8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, and 8.7 |
| <nobr>Oracle Linux 7, Oracle Linux 8</nobr> | Based on the corresponding RHEL version |
| <nobr>Rocky Linux 8</nobr> | Based on RHEL 8 |
| Amazon Linux | Version 1 |
| Docker | [Docker images]({{< relref "/rs/installing-upgrading/get-started-docker.md" >}}) of Redis Enterprise Software are certified for development and testing only. |
| Kubernetes | See the [Redis Enterprise for Kubernetes documentation]({{< relref "/kubernetes/_index.md" >}}) |

## Operating system limitations

Be aware that Redis Enterprise Software relies on certain components that require support from the operating system.  You cannot enable support for components, services, protocols, or versions that aren't supported by the operating system running Redis Enterprise Software.  In addition, updates to the operating system or to Redis Enterprise Software can impact component support.

To illustrate, version 6.2.8 of Redis Enterprise Software removed support for TLS 1.0 and TLS 1.1 on Red Hat Enterprise Linux 8 (RHEL 8) because that operating system [does not enable support](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/using-the-system-wide-cryptographic-policies_security-hardening) for these versions by default.  

If you have trouble enabling specific components, features, or versions, verify that they're supported by your operating system and that they're configured correctly.

### Upgrade RHEL when using modules

RHEL 7 clusters cannot be directly upgraded to RHEL 8 when hosting databases using modules.
Due to binary differences in modules between the two operating systems, you cannot directly update RHEL 7 clusters to RHEL 8 when those clusters host databases using modules. Instead, you need to create a new cluster on RHEL 8 and then migrate existing data from your RHEL 7 cluster. This does not apply to clusters that do not use modules.

## VMware

Redis Enterprise is compatible with VMware, but make sure that you:

- Configure your memory, CPU, network, and storage settings to allow for optimal Redis Enterprise performance.
- Pin each Redis Enterprise shard to a specific ESX/ESXi host by setting the appropriate affinity rules.
- If you must manually migrate a virtual machine to another host, follow the best practices for shard maintenance and contact support if you have questions.
- Disable VMware VMotion because Redis Enterprise is not compatible with VMotion.
- Don't use VMware snapshots because Redis Enterprise cluster manages state dynamically, so a snapshot might not have the correct node and cluster state.
