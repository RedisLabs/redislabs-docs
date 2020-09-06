---
Title: Client Prerequisites for mDNS
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/mdns/
---
{{< note >}}
mDNS is only supported for development and testing environments.
{{< /note >}}

If you choose to use the mDNS protocol when [you set the cluster name]({{< relref "/rs/installing-upgrading/configuring/cluster-dns/_index.md" >}}),
make sure that the configurations and prerequisites for resolving database endpoints are met on the client machines.
If you have [Active-Passive]({{< relref "/rs/administering/designing-production/active-passive.md" >}}) databases on the cluster,
the configurations and prerequisites are also required for the Redis Enterprise Software nodes.

To prepare a client or node for mDNS:

1. Make sure that the clients and cluster nodes are on the same physical network
    or have the network infrastructure configured to allow multicasting between them.
1. Install these prerequisite packages:

    - For Ubuntu:

        ```sh
        apt-get install libnss-mdns
        ```

    - For RHEL/CentOS 6.x:

        ```sh
        $ rpm -ivh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
        $ yum install nss-mdns
        $ service avahi-daemon start
        ```

    - For RHEL/CentOS 7:

        ```sh
        $ rpm -ivh https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-7-12.noarch.rpm
        $ yum install nss-mdns
        $ service avahi-daemon start
        ```

1. If you are using [mDNS with IPv6 addresses]({{< relref "/rs/administering/designing-production/networking/multi-ip-ipv6.md" >}}),
    update the hosts line in `/etc/nsswitch.conf`to:

    ```yaml
    hosts: files mdns4_minimal
    \[NOTFOUND=return\] mdns
    ```
