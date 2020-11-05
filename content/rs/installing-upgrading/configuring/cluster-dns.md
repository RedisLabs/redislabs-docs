---
Title: Configuring Cluster DNS
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/cluster-name-dns-connection-management/
        /rs/installing-upgrading/configuring/cluster-name-dns-connection-management/
---
DNS is critical to the default operation of Redis Enterprise Software
(RS) deployments. This can be altered, but instead using the [Discovery
Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}),
which utilizes pure IP based connectivity as it is compliant with the
Redis Sentinel API.

As part of the high availability capabilities in RS, each node includes
a small DNS server for managing various internal cluster
functionalities, such as automatic failover or automatic migration.
Therefore, the node on which you are provisioning RS should not run any
other DNS server except for the one included with the RS installation.
The existence of another DNS server on the same machine might cause
unexpected and erroneous behavior.

## Cluster name (FQDN) and connection management

When connecting to the cluster for administration or connecting to
databases for data access, there are 2 options:

- URL Based Connections: URL based connections require DNS setup for
    resolution of the cluster name (FQDN) when connecting to the cluster
    for administration or connecting to databases for data access. As
    the topology of the cluster changes and new nodes are added or
    existing nodes are removed from the cluster, DNS records may need to
    be modified. However, with URL based connections, applications
    simply have to remember the URL for the cluster or the database.
- IP Based Connections: IP based connections do not require DNS setup
    and instead use IP addresses of the nodes in the cluster for
    connecting to the cluster for administration or data access. As the
    topology of the cluster changes and new nodes are added or existing
    nodes are removed from the cluster, no DNS records need to be
    modified. However, administrators and applications connecting to the
    cluster and to the databases need to maintain IP address of at least
    one node in the cluster to discover and access the cluster topology.

## URL-based connections and how to set up cluster name (FQDN)

The Fully Qualified Domain Name (FQDN) is the unique cluster identifier
that enables clients to connect to [the different components]({{< relref "/rs/concepts/_index.md" >}}) that are
part of the Redis Enterprise Software (RS). The FQDN is a crucial
component of the high-availability mechanism in RS because it is used by
the internal DNS to enable the automatic and transparent failover of
nodes, databases shards, and endpoints, by automatically updating their
IP addresses.

{{< note >}}
Setting the cluster's FQDN is a one-time operation.
After the FQDN is set it cannot be updated.
{{< /note >}}

The FQDN must always comply with the IETF's [RFC
952](http://tools.ietf.org/html/rfc952) standard and section 2.1 of the
[RFC 1123](http://tools.ietf.org/html/rfc1123) standard.

## Naming the cluster FQDN

You have two options for naming the cluster FQDN:

### DNS

Use this option if you already have your own domain, would like to make
the cluster part of your domain and are able to update the DNS.

1. Make sure that the cluster and at least one node (preferably all nodes) in the cluster are correctly
    configured in the DNS with the appropriate NS entries.

    For example:

        - Your domain is: mydomain.com
        - You would like to name the Redis Enterprise Software cluster:
            redislabscluster
        - You have three nodes in the cluster:
           - node1 with IP 1.1.1.1
           - node2 with IP 2.2.2.2
           - node3 with IP 3.3.3.3

1. In the FQDN field, enter the value: redislabscluster.mydomain.com, and
    add the following records in the DNS for mydomain.com:

    ```sh
    redislabscluster.mydomain.com         NS   node1.redislabscluster.mydomain.com
                                               node2.redislabscluster.mydomain.com
                                               node3.redislabscluster.mydomain.com 

    node1.redislabscluster.mydomain.com   A    1.1.1.1

    node2.redislabscluster.mydomain.com   A    2.2.2.2
    
    node3.redislabscluster.mydomain.com   A    3.3.3.3
    ```

### Zero-configuration using mDNS (Development option only) {#zeroconfiguration-using-mdns-development-option-only}

{{< note >}}
mDNS is not supported for use with production environments and
should only be used in dev/test environments.
{{< /note >}}

mDNS (Multicast DNS) is a standard protocol that provides DNS-like name
resolution and service discovery capabilities to machines on local
networks with minimal to no configuration. Because not all clients
support mDNS, ensure first that the clients that are connecting to
the cluster actually have mDNS support, and that the network
infrastructure permits mDNS / multi-casting between them and the cluster
nodes.

Configuring the cluster to support mDNS requires you to assign the
cluster a .local name.

For example, if you want to name the Redis Enterprise Software cluster: redislabscluster

1. In the FQDN field, enter the value: redislabscluster.local

When using the DNS or mDNS option, failover can be done transparently
and the DNS is updated automatically to point to the IP of the new
master.

## IP-based connections

When you use IP based connection option, the FQDN does not need to have
any special format because clients use IP addresses instead of
hostnames to access the databases so you are free to choose whatever
name you want. Using the IP Based connection option does not require any
DNS configuration either.

To administer the cluster you do need to know the IP address of at least
one of the nodes in the cluster. Once you have the IP address, you can
simply connect to port number 8443 (for example:
[https://10.0.0.12:8443](https://10.0.0.12:8443)). However, as the topology of the cluster changes
and node with the given IP address is removed, you need to remember
the IP address of another node participating in this cluster to connect
to the admin console and manage the cluster.

Applications connecting to RS databases for data access have the same
constraints. When using the IP based connection method, you can use the
[Discovery
Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}})
to discover the database endpoint for a given database name as long as
you have an IP address for at least one of the nodes in the cluster. The
API used for discovery service is compliant with the Redis Sentinel API.

You can find examples of how to connect to databases using the DNS or IP
based methods from various client libraries here on the [How-To
page](https://redislabs.com/resources/how-to-redis-enterprise/).

You can find a simple example of URL and IP Based connection in the
"Testing Connectivity to your Database" section on the ["Creating a new
database"
page]({{< relref "/rs/administering/creating-database/_index.md#simple-connectivity-test" >}}).
