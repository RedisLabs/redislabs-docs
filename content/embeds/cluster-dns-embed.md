Redis Enterprise Software deployments use DNS to communicate between nodes.
<!-- This can be altered, but instead using the [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}),
which utilizes pure IP-based connectivity as it is compliant with the Redis Sentinel API.
-->

Each node in an Redis Enterprise cluster includes a small DNS server to manage internal functions, such as high availability, automatic failover, automatic migration, and so on.
Nodes should only run the DNS server included with the software.  Running additional DNS servers can lead to unexpected behavior.

## Cluster name (FQDN) and connection management

Whether you're administering Redis Enterprise Software or accessing databases, there are two ways to connect:

- URL-based connections - URL-based connections use DNS to resolve the fully qualified cluster domain name (FQDN).  This means that DNS records might need to be updated when topology changes, such as adding (or removing) nodes from the cluster.  

    Because apps and other clients connections rely on the URL (rather than the address), they do not need to be modified when topology changes.  

- IP-based connections - IP-based connections do not require DNS setup, as they rely on the underlying TCP/IP addresses.  As long as topology changes do not change the address of the cluster nodes, no configuration changes are needed, DNS or otherwise.  

    However, changes to IP addresses (or changes to IP address access) impact all connections to the node, including apps and clients.  IP address changes can therefore be unpredictable or time-consuming.

## URL-based connections and how to set up cluster name (FQDN)

The fully qualified domain name (FQDN) is the unique cluster identifier that enables clients to connect to [the different components]({{< relref "/rs/concepts/_index.md" >}}) of Redis Enterprise Software.
The FQDN is a crucial component of the high-availability mechanism because it's used internally to enable and implement automatic and transparent failover of nodes, databases shards, and endpoints.

{{< note >}}
Setting the cluster's FQDN is a one-time operation, one that cannot be changed after being set.
{{< /note >}}

The FQDN must always comply with the IETF's [RFC 952](http://tools.ietf.org/html/rfc952) standard
and section 2.1 of the [RFC 1123](http://tools.ietf.org/html/rfc1123) standard.

## Name the cluster domain name

You can name the cluster domain name using either DNS or IP addresses.  

### DNS

Use DNS if you:

- have your own domain
- want to integrate the cluster into that domain
- can access and update the DNS records for that domain

1. Make sure that the cluster and at least one node (preferably all nodes) in the cluster
    are correctly configured in the DNS with the appropriate NS entries.

    For example:

        - Your domain is: mydomain.com
        - You would like to name the Redis Enterprise Software cluster:
            redislabscluster
        - You have three nodes in the cluster:
           - node1 with IP 1.1.1.1
           - node2 with IP 2.2.2.2
           - node3 with IP 3.3.3.3

1. In the FQDN field, enter the value `redislabscluster.mydomain.com`
    and add the following records in the DNS for mydomain.com:

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
mDNS is not supported for use with production environments and should only be used in development or test environments.
{{< /note >}}

mDNS (Multicast DNS) is a standard protocol that provides DNS-like name resolution and service discovery capabilities
to machines on local networks with minimal to no configuration.
Because not all clients support mDNS, ensure first that the clients that are connecting to the cluster actually have mDNS support,
and that the network infrastructure permits mDNS/multi-casting between them and the cluster nodes.

Configuring the cluster to support mDNS requires you to assign the cluster a `.local` name.

For example, if you want to name the Redis Enterprise Software cluster `redislabscluster`, enter `redislabscluster.local` in the FQDN field.

When using the DNS or mDNS option, failover can be done transparently and the DNS is updated automatically to point to the IP of the new master.

## IP-based connections

When you use the IP-based connection option, the FQDN does not need to have any special format
because clients use IP addresses instead of hostnames to access the databases so you are free to choose whatever name you want.
Using the IP-based connection option does not require any DNS configuration either.

To administer the cluster you do need to know the IP address of at least one of the nodes in the cluster.
Once you have the IP address, you can simply connect to port number 8443 (for example: <https://10.0.0.12:8443>).
However, as the topology of the cluster changes and node with the given IP address is removed,
you need to remember the IP address of another node participating in this cluster to connect to the admin console and manage the cluster.

Applications connecting to Redis Software databases have the same constraints.
When using the IP-based connection method, you can use the [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}})
to discover the database endpoint for a given database name as long as you have an IP address for at least one of the nodes in the cluster.
The API used for discovery service is compliant with the Redis Sentinel API.

To test your connection, try pinging the service.  For help, see [Connect to your database]({{< relref "rs/getting-started/#step-4-connect-to-your-database" >}}).
