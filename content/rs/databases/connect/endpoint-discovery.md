---
Title: Endpoint discovery in Redis Enterprise
linktitle: Endpoint discovery
description: Methods for clients to discover and connect to database endpoints.
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: 
---

Clients use the `RESP` serialization protocol to communicate with Redis over TCP. Clients must make a TCP connection before there is any transfer of data. TCP connections are established via an exchange known as the three-way handshake.

{{<image filename="images/rs/endpoint-discovery/tcp-3way-handshake.png" width="300px">}}{{</image>}}

Redis Enterprise has a few options for a client to discover which IP and port to connect to depending on the type of Redis deployment:

- [DNS](#dns) – The recommended endpoint discovery method for most deployments.

- [OSS Cluster API](#oss-cluster-api) – If you plan to migrate an open source Redis Cluster to Redis Enterprise and want to maintain current functionality.

- [Discovery service](#discovery-service) - A Sentinel-compliant endpoint discovery service. It only returns one endpoint.

- [Load balancer](#load-balancer) - If you need an alternative to DNS endpoint discovery.

## DNS

Redis Enterprise was designed to use [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) for client discovery. Each Redis Enterprise database is set up with a unique DNS domain and port.  A client can use the database domain to do a DNS lookup and then get back a single IP or list of IPs. This IP is then used to establish a `TCP` connection.

Clients connect to a Redis Enterprise database using a proxy, which in turn connects to the Redis servers (also called shards). The proxy is dynamically configured for each Redis database knowing the associated internal shard endpoints are and what partitions of data they are holding.

{{<image filename="images/rs/endpoint-discovery/dns-discovery.png" width="75%">}}{{</image>}}

Shard failures or updates can cause their locations to change. The proxy updates automatically to connect to the new location, so the client can continue to use the same endpoint.

{{<image filename="images/rs/endpoint-discovery/dns-shard-failure.png" width="75%">}}{{</image>}}

If a proxy cannot connect to a shard at all (for example, if resources are down or a network partition has occurred), it might temporarily return a connection failure to the client. As resources are recovered or failover completes, the proxy will accept connections when the client tries to connect again.

If a database has multiple proxies listening on different nodes, the client receives a list of IP addresses when it does a DNS lookup. Subsequent lookups will rotate the list in a different order to spread requests across the endpoints.

{{<image filename="images/rs/endpoint-discovery/dns-multiple-proxies.png" width="75%">}}{{</image>}}

Node failures, database scaling, and updates to the cluster or proxy configuration can change the IP addresses returned by the DNS lookup.

{{<image filename="images/rs/endpoint-discovery/dns-node-failure.png" width="75%">}}{{</image>}}

After failover completes, the DNS configurations are updated so that a client retrying the connection will eventually get the new endpoint. The time this can take varies depending on the DNS services, the client DNS caching configuration, and system configurations.

By using DNS and proxies, Redis Enterprise can orchestrate changes without impacting client applications.

## OSS Cluster API

If you [enable the Redis OSS Cluster API]({{<relref "/rs/databases/configure/oss-cluster-api">}}), clients can use [`CLUSTER` commands](https://redis.io/commands/?group=cluster) to discover the database topology. Although the client maintains database topology, it still uses the proxy to connect to the database.

{{<image filename="images/rs/endpoint-discovery/oss-cluster-api-discovery.png" width="75%">}}{{</image>}}

If a clustered database's topology changes due to node failures or other changes, the client receives a `MOVED` response. The client can use the OSS Cluster API to retrieve an updated topology and then connect to the database through the new endpoints.

{{<image filename="images/rs/endpoint-discovery/oss-cluster-api-failure.png" width="75%">}}{{</image>}}

The OSS Cluster API has the following advantages:

- If you migrate an open source Redis Cluster deployment to a Redis Enterprise database with OSS Cluster API enabled, it functions the same as before migration.

- Decreased cross-node network hops, which can improve performance in large throughput scenarios.

{{<note>}}
If you add more nodes to the cluster, this also increases the number of connections the client needs to open.
{{</note>}}

## Discovery service

Redis Enterprise Software exposes a [Sentinel](https://redis.io/docs/management/sentinel/#sentinel-api)-compliant [discovery service]({{<relref "/rs/databases/durability-ha/discovery-service">}}) on port `8001`.

Clients can use [Sentinel commands](https://redis.io/docs/management/sentinel/#sentinel-commands) to discover a database's proxy IP address and port.

{{<image filename="images/rs/endpoint-discovery/sentinel-service-discovery.png" width="75%">}}{{</image>}}

If the database endpoint is bound to a different node due to failures or configuration changes, the discovery service returns a new IP address that clients can use to connect to the database.

{{<image filename="images/rs/endpoint-discovery/sentinel-service-failure.png" width="75%">}}{{</image>}}

Because the discovery service only returns one IP address, clients cannot easily discover all available endpoints when scaling a database with multiple nodes and proxies.

See [Discovery service]({{<relref "/rs/databases/durability-ha/discovery-service">}}) for more information.

## Load balancer

If you did not set up DNS for your Redis Enterprise Software deployment, consider using a [load balancer]({{<relref "/rs/networking/cluster-lba-setup">}}) to direct traffic to the cluster nodes.

To connect to the database, clients use the load balancer's IP address and port. The load balancer distributes incoming client requests across all proxies in the cluster using [round robin](https://en.wikipedia.org/wiki/Round-robin_scheduling).

{{<image filename="images/rs/endpoint-discovery/load-balancer-discovery.png" width="75%">}}{{</image>}}

If a node fails, the load balancer connects to a different node's proxy.

{{<image filename="images/rs/endpoint-discovery/load-balancer-failure.png" width="75%">}}{{</image>}}
