
Redis Enterprise Software is supported on several operating systems, cloud environments, and virtual environments.

{{< note >}}
Make sure your system meets these requirements:

- Only 64-bit operating systems are supported.
- You must install Redis Enterprise Software directly on the host, not through system cloning.
- You must install on a clean host with no other applications running so that all RAM is allocated to the OS and Redis Enterprise Software  only.
- Linux distributions must be installed with at least "Minimal Install" configuration.
{{< /note >}}

| **Platform** | **Versions/Information** |
|------------|-----------------|
| Ubuntu | 16.04, 18.04<br>Server version is recommended for production installations. Desktop version is only recommended for development deployments. |
| RHEL/CentOS 7 | 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9<br>Requires OpenSSL 1.0.2 and [firewall configuration]({{< relref "/rs/installing-upgrading/configuring/centos-rhel-7-firewall.md" >}}) |
| RHEL/CentOS 8 | 8.0, 8.1, 8.2, 8.3, 8.4, 8.5 |
| Oracle Linux 7 | Based on the corresponding RHEL version |
| Amazon Linux | Version 1 |
| Docker | [Docker images]({{< relref "/rs/installing-upgrading/get-started-docker.md" >}}) of Redis Enterprise Software are certified for Development and Testing only. |
| Kubernetes | See the [Redis Enterprise Software on Kubernetes documentation]({{< relref "/kubernetes/_index.md" >}}) |

Be aware that Redis Enterprise Software relies on certain components that require support from the operating system.  You cannot enable support for components, services, protocols, or versions that aren't supported by the operating system running Redis Enterprise Software.  In addition, updates to the operating system or to Redis Enterprise Software can impact component support.

To illustrate, version 6.2.8 of Redis Enterprise Software removed support for TLS 1.0 and TLS 1.1 on Red Hat Enterprise Linux 8 (RHEL 8) because that operating system [does not enable support](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/using-the-system-wide-cryptographic-policies_security-hardening) for these versions by default.  

If you have trouble enabling specific components, features, or versions, verify that they're supported by your operating system and that they're configured correctly.


## VMware

Redis Enterprise is compatible with VMware, but make sure that you:

- Configure your memory, CPU, network, and storage settings to allow for optimal Redis Enterprise performance.
- Pin each Redis Enterprise shard to a specific ESX/ESXi host by setting the appropriate affinity rules.
- If you must manually migrate a virtual machine to another host, follow the best practices for shard maintenance and contact support if you have questions.
- Disable VMware VMotion because Redis Enterprise is not compatible with VMotion.
- Don't use VMware snapshots because Redis Enterprise cluster manages state dynamically, so a snapshot might not have the correct node and cluster state.
