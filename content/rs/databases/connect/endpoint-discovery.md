---
Title: Discover database endpoints in Redis Enterprise Software
linkTitle: Discover endpoints
description: Methods for clients to discover and connect to database proxy endpoints.
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: 
---

Clients use [RESP](https://redis.io/docs/reference/protocol-spec/) to communicate with Redis Enterprise Software and must establish a [`TCP`](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) connection using a three-way handshake before transferring data.

{{<image filename="images/rs/endpoint-discovery/tcp-3way-handshake.png" width="300px" alt="The digram shows the three-way handshake (SYN, SYN+ACK, ACK) between a client and Redis Enterprise.">}}{{</image>}}

To connect to a Redis Enterprise database, clients can use the following methods to discover IP addresses and ports of database proxy endpoints:

- [DNS](#dns) – The recommended endpoint discovery method for most deployments.

- [OSS Cluster API](#oss-cluster-api) – If you plan to migrate an open source Redis Cluster to Redis Enterprise and want to maintain current functionality.

- [Discovery service](#discovery-service) - A Sentinel-compliant endpoint discovery service. It only returns one endpoint.

- [Load balancer](#load-balancer) - If you need an alternative to DNS endpoint discovery.

## DNS

Redis Enterprise Software was designed to use [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) for client discovery as follows:

1. Each database is set up with a unique DNS domain and port.

1. The client uses the database domain to perform a DNS lookup.

1. The DNS server returns a single IP address or a list of IP addresses.

1. The client uses one of the IP addresses to establish a `TCP` connection to a database proxy.

1. The proxy connects to the Redis servers (also called shards).

{{<image filename="images/rs/endpoint-discovery/dns-discovery.png" width="75%" alt="The diagram shows how the client does a DNS lookup on the database domain to discover the IP addresses it can use to connect to the database proxy endpoint.">}}{{</image>}}

For more information about using DNS with Redis Enterprise Software, see [Configure cluster DNS]({{<relref "/rs/networking/cluster-dns">}}).

### Discover multiple proxies

If a database has multiple proxies listening on different nodes, the client receives a list of IP addresses from the DNS lookup. Subsequent lookups rotate the list in a different order to spread requests across the proxies.

{{<image filename="images/rs/endpoint-discovery/dns-multiple-proxies.png" width="75%" alt="The diagram shows how DNS lookup rotates the list of IP addresses if a database has multiple proxies.">}}{{</image>}}

### Shard failures and updates

If a shard fails or updates, its location can change. The proxy updates automatically to connect to the new location, so the client can continue to use the same endpoint.

{{<image filename="images/rs/endpoint-discovery/dns-shard-failure.png" width="75%" alt="The diagram shows how the database proxy automatically connects to a new shard if a shard fails.">}}{{</image>}}

If a proxy cannot connect to a shard at all (for example, if resources are down or a network partition occurred), it might temporarily return a connection failure to the client. As resources are recovered or failover completes, the proxy will accept connections when the client tries to connect again.

### Node failures and cluster updates

Node failures, database scaling, and updates to the cluster or proxy configuration can change the IP addresses returned by the DNS lookup.

{{<image filename="images/rs/endpoint-discovery/dns-node-failure.png" width="75%" alt="The diagram shows that DNS lookup returns new IP addresses if a node fails.">}}{{</image>}}

After failover completes, the DNS configurations are updated so clients trying to reconnect can find the new endpoint. How long this process takes can vary depending on the DNS services, the client DNS caching configuration, and system configurations.

By using DNS and proxies, Redis Enterprise Software can orchestrate changes without impacting client applications.

## OSS Cluster API

If you [enable the Redis OSS Cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}), clients can use [`CLUSTER` commands](https://redis.io/commands/?group=cluster) to discover the database topology. Although the client maintains the database topology in this case, it still uses a proxy to connect to the database.

{{<image filename="images/rs/endpoint-discovery/oss-cluster-api-discovery.png" width="75%" alt="The diagram shows how the client retrieves cluster information from a proxy and uses this information to connect to the other database endpoints.">}}{{</image>}}

### Retrieve updated database topology

If a clustered database's topology changes due to node failures or other updates, the client receives a `MOVED` response. The client can use the OSS Cluster API to retrieve an updated topology and then connect to the database through the new endpoints.

{{<image filename="images/rs/endpoint-discovery/oss-cluster-api-failure.png" width="75%" alt="The diagram shows that the client connects to a different proxy to retrieve cluster information if a node fails.">}}{{</image>}}

### OSS Cluster API considerations

The OSS Cluster API has the following benefits:

- If you migrate an open source Redis Cluster deployment to a Redis Enterprise Software database with the OSS Cluster API enabled, it functions the same as before migration.

- Decreased cross-node network hops, which can improve performance in large throughput scenarios.

{{<note>}}
If you add more nodes to the cluster, this also increases the number of connections the client needs to open.
{{</note>}}

## Discovery service

Redis Enterprise Software exposes a [Sentinel](https://redis.io/docs/management/sentinel/#sentinel-api)-compliant [discovery service]({{<relref "/rs/databases/durability-ha/discovery-service">}}) on port `8001`.

Because the discovery service only returns one IP address, clients cannot easily discover all available endpoints when scaling a database with multiple nodes and proxies.

See [Discovery service]({{<relref "/rs/databases/durability-ha/discovery-service">}}) for more information.

### Use Sentinel commands

Clients can use [Sentinel commands](https://redis.io/docs/management/sentinel/#sentinel-commands) to discover a database's proxy IP address and port.

{{<image filename="images/rs/endpoint-discovery/sentinel-service-discovery.png" width="75%" alt="The diagram shows how a client uses the discovery service to identify the master IP address and uses it to connect to the proxy endpoint.">}}{{</image>}}

### Node failures or changes

If the database endpoint is bound to a different node due to failures or configuration changes, the discovery service returns a new IP address that clients can use to connect to the database.

{{<image filename="images/rs/endpoint-discovery/sentinel-service-failure.png" width="75%" alt="The diagram shows how the discovery service sends the client a new master IP address after the original master node fails.">}}{{</image>}}

## Load balancer

If you did not set up DNS for your Redis Enterprise Software deployment, consider [setting up a load balancer]({{<relref "/rs/networking/cluster-lba-setup">}}) to direct traffic to the cluster nodes.

### Distribute requests across proxies

To connect to the database, clients use the load balancer's IP address and port. The load balancer distributes incoming client requests across all proxies in the cluster using [round robin](https://en.wikipedia.org/wiki/Round-robin_scheduling).

{{<image filename="images/rs/endpoint-discovery/load-balancer-discovery.png" width="75%" alt="The diagram shows how the load balancer connects the client to different proxy endpoints using round-robin.">}}{{</image>}}

### Node failures

If a node fails, the load balancer connects to a different node's proxy.

{{<image filename="images/rs/endpoint-discovery/load-balancer-failure.png" width="75%" alt="The diagram shows that the load balancer connects the client to a different proxy endpoint if a node fails.">}}{{</image>}}
