---
Title: Setting Up a Cluster Behind a Load Balancer
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
When you want to setup a Redis Enterprise cluster in an environment that doesn't allow DNS, you can use a load balancer agent (LBA to direct traffic between the cluster nodes.

## DNS role for databases

Normally, Redis Enterprise uses DNS to provide dynamic database endpoints.
A DNS name such as redis-12345.clustername.domain gives clients access to the database resource:

- If multiple proxies are in use, the DNS name resolves to multiple IP addresses so that clients can load balance.
- On failover or topology changes, the DNS name is automatically updated to reflect the live IP addresses.

When DNS cannot be used, clients can still connect to the endpoints with the IP addresses,
but the benefits of load balancing and automatically updates IP address are missing.

## Network architecture with load balancer

You can compensate for the lack of DNS resolution with load balancers that can expose services and provide service discovery.
A load balancer is configured in front of Redis Enterprise cluster, exposing several logical services:

- Control plane services, such as the RS admin console to access cluster administration interface
- Data plane services, such as a database endpoint to connect from client applications

Depending on which Redis Enterprise services you want to access outside the cluster you may need to configure the load balancers seperately.
One or more Virtual IPs (VIPs) are defined on the load balancer to expose Redis Enterprise services.
The architecture is shown in the following diagram with 3 nodes Redis Enterprise cluster with one database (DB1) configured on port 12000:

<to be added - image>

## Setting up an RS cluster with load balancers

### Prerequisites

- [Install]({{< relref "/rs/installing-upgrading/_index.md" >}}) the latest version of RS on your clusters
- Configure the cluster with the cluster name (FQDN) even though DNS is not in use.
    Remember that the same cluster name is used to issue the licence keys.
    We recommend that you use a “.local” suffix in the FQDN.

### Configuring the load balancers

- Make sure that the load balancer is performing TCP health checks on the cluster nodes.
- Expose the services that you require through a Virtual IP, for example:
    - Web Management Portal (8443)
    - Rest API service (Secured - 9443; Non-secured - 8080)
    - Database ports (In the range of 10000-19999)

Other ports are shown in the list of [RS network ports]({{< relref "/rs/administering/designing-production/networking/port-configurations.md" >}}).

{{< note >}}
Make sure the RS admin console only uses sticky, secured connections on port 8443:

- Certain LBAs provide specific logic to close idle connections. Either disable this feature or make sure the applications connecting to Redis use reconnection logic.
- Make sure the LBA is fast enough to resolve connections between two clusters or applications that are connected to Redis databases through LBA.
- Choose the standard LBA which is commonly used in your environment so that you have easy access to in-house expertise for troubleshooting issues.
{{< /note >}}

### RS cluster configuration

There are certain recommended settings within the cluster that guarantee a flawless connectivity experience for applications and admin users when they access the cluster through a Load Balancer.

{{< note >}}
- Run the `rladmin` commands directly on the cluster.
- The `rladmin` commands update the settings on all nodes in the cluster.
{{< /note >}}

To optimize the cluster to run behind an LBA, run:

```sh
    # enable all-node proxy policy by default
    rladmin tune cluster default_sharded_proxy_policy all-nodes

    # enable sparse placement by default
    rladmin tune cluster default_shards_placement sparse

    # ensure we redirect where necessary when running behind an LBA
    rladmin cluster config handle_redirects enabled
```

### RS database configuration

After the cluster settings are updated and the LBAs are configured,
you can go to the RS admin console at <https://load-balancer-virtual-ip:8443/> and [create a new database]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

### Keep LBA configuration updated when the cluster configuration changes

When your RS cluster is located behind a load balancer, you must update the LBA when the cluster topology and IP addresses change.
Some common cases that require you to update the LBA are:

- Adding new nodes to the Redis Enterprise cluster
- Removing nodes from the Redis Enterprise cluster
- Maintenance for Redis Enterprise cluster nodes
- IP address changes for Redis Enterprise cluster nodes

After these changes, make sure that the redis connections in your applications can connect to the Redis database,
especially if they are directly connected on IP addresses that have changed.
