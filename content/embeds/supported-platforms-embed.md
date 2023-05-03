
Redis Enterprise Software is supported on several operating systems, cloud environments, and virtual environments.

## System requirements

Make sure your system meets these requirements:

- Only 64-bit operating systems are supported.
- You must install Redis Enterprise Software directly on the host, not through system cloning.
- You must install on a clean host with no other applications running so that all RAM is allocated to the operating system and Redis Enterprise Software  only.
- Linux distributions must be installed with at least "Minimal Install" configuration.

## Supported platforms

<span title="Check mark icon">&#x2705;</span> Supported – The platform is supported for this version of Redis Enterprise Software.

<span title="Warning icon">&#x26A0;&#xFE0F;</span> Deprecated – The platform is still supported for this version of Redis Enterprise Software, but support will be removed in a future release.

<span title="X icon">&#x274c;</span> End of life – Platform support ended in this version of Redis Enterprise Software.

| Redis Enterprise | 6.4.2 | 6.2.18 | 6.2.12 | 6.2.10 | 6.2.8 | 6.2.4 |
|------------------|-------|--------|--------|--------|--------|-------|
| **Ubuntu**<sup>[1](#table-note-1)</sup> |
| 20.04 | <span title="Supported">&#x2705;</span><sup>[6](#table-note-6)</sup> | | | | |
| 18.04 | <span title="Supported"><span title="Supported">&#x2705;</span></span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| 16.04 | <span title="Deprecated">&#x26A0;&#xFE0F;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **RHEL & CentOS**<sup>[2](#table-note-2)</sup>
| 8.7 | <span title="Supported">&#x2705;</span> | | | | |
| 8.5-8.6 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | | |
| 8.0-8.4 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | |
| 7.0-7.9 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Oracle Linux**<sup>[3](#table-note-3)</sup> |
| 8 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | | |
| 7 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Rocky Linux**<sup>[3](#table-note-3)</sup> |
| 8 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | | | |
| **Amazon Linux** |
| 2 | <span title="Supported">&#x2705;</span><sup>[7](#table-note-7)</sup> | | | | |
| 1 | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Docker**<sup>[4](#table-note-4)</sup> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |
| **Kubernetes**<sup>[5](#table-note-5)</sup> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> | <span title="Supported">&#x2705;</span> |

1. <a name="table-note-1" style="display: block; height: 80px; margin-top: -80px;"></a>The server version of Ubuntu is recommended for production installations. The desktop version is only recommended for development deployments.

2. <a name="table-note-2" style="display: block; height: 80px; margin-top: -80px;"></a>RHEL and CentOS deployments require OpenSSL 1.0.2 and [firewall configuration]({{<relref "/rs/installing-upgrading/configuring/centos-rhel-firewall">}}).

3. <a name="table-note-3" style="display: block; height: 80px; margin-top: -80px;"></a>Based on the corresponding RHEL version.

4. <a name="table-note-4" style="display: block; height: 80px; margin-top: -80px;"></a>
[Docker images]({{<relref "/rs/installing-upgrading/get-started-docker">}}) of Redis Enterprise Software are certified for development and testing only.

5. <a name="table-note-5" style="display: block; height: 80px; margin-top: -80px;"></a>See the [Redis Enterprise for Kubernetes documentation]({{<relref "/kubernetes">}}).

6. <a name="table-note-6" style="display: block; height: 80px; margin-top: -80px;"></a>Ubuntu 20.04 support was added in Redis Enterprise Software [6.4.2-43]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-43">}}).

7. <a name="table-note-7" style="display: block; height: 80px; margin-top: -80px;"></a>A release candidate for Amazon Linux 2 support was added in Redis Enterprise Software [6.4.2-61]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-61">}}). Official support for Amazon Linux 2 was added in Redis Enterprise Software 6.4.2-TBA.

## Operating system limitations

Be aware that Redis Enterprise Software relies on certain components that require support from the operating system.  You cannot enable support for components, services, protocols, or versions that aren't supported by the operating system running Redis Enterprise Software.  In addition, updates to the operating system or to Redis Enterprise Software can impact component support.

To illustrate, version 6.2.8 of Redis Enterprise Software removed support for TLS 1.0 and TLS 1.1 on Red Hat Enterprise Linux 8 (RHEL 8) because that operating system [does not enable support](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/using-the-system-wide-cryptographic-policies_security-hardening) for these versions by default.  

If you have trouble enabling specific components, features, or versions, verify that they're supported by your operating system and that they're configured correctly.

### Ubuntu 20 rejects SHA1 certificates

With Ubuntu 20.04, you cannot use the SHA1 hash algorithm because [OpenSSL's security level is set to 2 by default](https://manpages.ubuntu.com/manpages/focal/man3/SSL_CTX_set_security_level.3ssl.html#notes). As a result, the operating system rejects SHA1 certificates, even if you enable the `mtls_allow_weak_hashing` option.

To avoid issues with SHA1 certificates, replace them with new certificates that use SHA-256. Note that certificates provided by Redis Enterprise Software use SHA-256.

### Upgrade RHEL when using modules

RHEL 7 clusters cannot be directly upgraded to RHEL 8 when hosting databases using modules.
Due to binary differences in modules between the two operating systems, you cannot directly update RHEL 7 clusters to RHEL 8 when those clusters host databases using modules. Instead, you need to create a new cluster on RHEL 8 and then migrate existing data from your RHEL 7 cluster. This does not apply to clusters that do not use modules.

### Modules not supported for Amazon Linux 2 release candidate

A database with modules cannot reside on an Amazon Linux 2 (release candidate) node. This limitation affects Redis Enterprise Software [6.4.2-61]({{<relref "/rs/release-notes/rs-6-4-2-releases/rs-6-4-2-61">}}) but was fixed in version 6.4.2-TBA.

## VMware

Redis Enterprise is compatible with VMware, but make sure that you:

- Configure your memory, CPU, network, and storage settings to allow for optimal Redis Enterprise performance.
- Pin each Redis Enterprise shard to a specific ESX/ESXi host by setting the appropriate affinity rules.
- If you must manually migrate a virtual machine to another host, follow the best practices for shard maintenance and contact support if you have questions.
- Disable VMware VMotion because Redis Enterprise is not compatible with VMotion.
- Don't use VMware snapshots because Redis Enterprise cluster manages state dynamically, so a snapshot might not have the correct node and cluster state.
