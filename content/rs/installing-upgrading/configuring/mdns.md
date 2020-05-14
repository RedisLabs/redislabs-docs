---
Title: Client Prerequisites for mDNS
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/mdns/
---
{{% note %}}
mDNS is only supported for development and testing environments.
{{% /note %}}

If you choose to use the mDNS protocol when [setting the cluster name]({{< relref "/rs/installing-upgrading/configuring/cluster-name-dns-connection-management/_index.md" >}}),
make sure that the configurations and prerequisites, which are required for
resolving databases' endpoints, are met. These configurations and
perquisites are needed on the client machines, as well as on the
machines you are using as Redis Enterprise Software (RS) nodes if you
are using the [Replica
of]({{< relref "/rs/administering/active-passive.md" >}})
feature.

First, make sure that the machines acting as clients and the machines
acting as nodes reside on the same physical network, or have the
networking infrastructure configured to allow multicasting between them.

Second, install the prerequisite packages, which are different depending
on the operating system you are using:

- In Ubuntu:

    ```src
    apt-get install libnss-mdns
    ```

- In RHEL / CentOS 6.x:

    ```src
    $ rpm -ivh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
    $ yum install nss-mdns
    $ service avahi-daemon start
    ```

- In RHEL / CentOS 7:

    ```src
    $ rpm -ivh http://download.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
    $ yum install nss-mdns
    $ service avahi-daemon start
    ```

If you are using mDNS along with IPv6 addresses (see more details in
[Multi-IP &
IPv6]({{< relref "/rs/administering/designing-production/networking/multi-ip-ipv6.md" >}}),
make sure that you also make the following update to the
"/etc/nsswitch.conf" file:

- Update the hosts line to: hosts: files mdns4_minimal
    \[NOTFOUND=return\] mdns
