---
Title: Client prerequisites for m[DNS]{.small-caps}
description: 
weight: $weight
alwaysopen: false
---
**Note:** mDNS is **not** supported for use with production environments
and should only be used in dev/test environments.

If you choose to use the mDNS protocol when setting the cluster name
(for details, refer [How to set the cluster
name](/redis-enterprise-documentation/administering/installing-upgrading/configuring/cluster-name-dns-connection-management/)),
ensure that the configurations and prerequisites, which are required for
resolving databases' endpoints, are met. These configurations and
perquisites are needed on the client machines, as well as on the
machines you are using as Redis Enterprise Software (RES) nodes if you
are using the [Replica
of](/redis-enterprise-documentation/database-configuration/replica-of)
feature.

First, ensure that the machines acting as clients and the machines
acting as nodes reside on the same physical network, or have the
networking infrastructure configured to allow multicasting between them.

Second, install the prerequisite packages, which are different depending
on the operating system you are using:

-   In Ubuntu:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    apt-get install libnss-mdns
    ```

-   In RHEL / CentOS 6.x:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ rpm -ivh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
    $ yum install nss-mdns
    $ service avahi-daemon start
    ```

-   In RHEL / CentOS 7:

    ``` {style="border: 2px solid #ddd; background-color: #333; color: #fff; padding: 10px; -webkit-font-smoothing: auto;"}
    $ rpm -ivh http://download.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
    $ yum install nss-mdns
    $ service avahi-daemon start
    ```

If you are using mDNS along with IPv6 addresses (see more details in
[Multi-IP &
IPv6](/redis-enterprise-documentation/administering/designing-production/networking/multi-ip-ipv6/)),
ensure that you also make the following update to the
"/etc/nsswitch.conf" file:

-   Update the hosts line to: hosts: files mdns4\_minimal
    \[NOTFOUND=return\] mdns
