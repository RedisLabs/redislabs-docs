---
Title: Endpoint discovery in Redis Enterprise
linktitle: Endpoint discovery
description: 
weight: 50
alwaysopen: false
categories: ["RS"]
aliases: 
---

## Connecting to Redis

Clients use the `RESP` serialization protocol to communicate with Redis over TCP.  This means that a client must first make a TCP connection before there is any transfer of data. TCP connections are established via an exchange known as the three-way handshake.

{{<image filename="images/rs/endpoint-discovery/tcp-3way-handshake.png" width="300px">}}{{</image>}}


Both Redis OSS and Enterprise use  `TCP` to connect to a database, but how the client *discovers* the endpoint for that connection initially and when components fail or change may be different. Redis OSS has a few options for a client to *discover* what IP and port to connect to depending on the type of Redis deployment.

### Stand Alone Redis

If the Redis OSS deployment is not utilizing any kind of clustering, then the client would need the IP and port of the main Redis server to be provided through manual configuration.  The client uses those to initiate the TCP connection directly. Simple.

```python
import redis

r = redis.Redis(host='127.0.0.1', port=6379)
```

The drawback is that there is no built-in method for the client to figure out if something has failed or changed. If Redis is being replicated there would need to be an additional orchestration layer that would promote the replica to a master role.  The client would also need to be informated what the new IP and port of the master has changed to.  This is where Sentinel comes in.

### Redis + Sentinel

Sentinel is a solution to provide high-availability and discovery to a simple Redis deployment.  Another set of Redis servers can be started in Sentinel mode and configured with the current master and replicas.  A client can connect initially to Sentinel and use `SENTINEL` commands to get the IP and port of the current master Redis server.  

{{<image filename="images/rs/endpoint-discovery/sentinel-discovery.png" width="500px">}}{{</image>}}

If a master process goes down Sentinel will orchestrate the role change of one of the replicas to a master.  When a client detects a failure it can request the (new) master IP from Sentinel.

{{<image filename="images/rs/endpoint-discovery/sentinel-failure.png" width="500px">}}{{</image>}}

This solution can be fairly heavy and complex with limitations.  

* A quorum of additional Sentinel servers needs to be deployed and managed.  
* Not all clients are able to utilize the Sentinel protocol.  
* It is only compatible with a simple master-->replica relationship which limits you to vertically scaling Redis (not really a discovery problem but is often part of the reason for dismissing this solution).

### Redis OSS Cluster

The most sophisticated solution in Redis OSS is to combine multiple Redis servers into a cluster.  The primary reason for doing this is usually scaling, but it also addresses the other issues mentioned with previous solutions.  When Redis servers are configured together in a cluster a mapping of the different components is maintained. For example which Redis instances are serving which partitions of data or tracking who has the role of master vs replica.  The cluster operates on a full mesh network.  All components can communicate with each other and are aware of the other's status.

{{<image filename="images/rs/endpoint-discovery/cluster-discovery.png" width="500px">}}{{</image>}}

Initially, a client needs at least one IP of one of the cluster nodes to get started, but typically all available nodes would be configured.  A connection is made to one of the nodes and the `CLUSTER` APIs are used to *discover* the topology of the database. 

redis-cli example:

```
redis-10666.cluster.re.demo:10666> cluster slots
1) 1) (integer) 0
   1) (integer) 4095
   2) 1) "172.18.0.21"
      1) (integer) 10666
      2) "1"
2) 1) (integer) 8192
   1) (integer) 16383
   2) 1) "172.18.0.22"
      1) (integer) 10666
      2) "2"
3) 1) (integer) 4096
   1) (integer) 8191
   2) 1) "172.18.0.23"
      1) (integer) 10666
      2) "3"
```


After that, it can keep the mappings of all the Redis OSS cluster node IPs and ports and their associated data partitions in memory.  This allows the client to determine which server to connect to for a given partition of data.

Python example:

```python
import redis
from redis.cluster import RedisCluster
from redis.cluster import ClusterNode

startup_nodes = [ClusterNode('10.10.1.15', 12000),
                ClusterNode('10.10.1.16', 12000),
                ClusterNode('10.10.1.17', 12000)]

rc = redis.RedisCluster(startup_nodes=startup_nodes, decode_responses=True)
```

If one of the master nodes in the cluster goes down, the cluster can automatically promote a replica to take its place.  If the client attempts to connect to a Redis server that has failed, or unable to establish a TCP connection, it can connect to another IP and port in the cluster and call the `CLUSTER` APIs to discover the current endpoints.

{{<image filename="images/rs/endpoint-discovery/cluster-failure.png" width="500px">}}{{</image>}}


When data is moved to a different endpoint (either from scaling or re-balancing) the cluster will return a `MOVED` response to the client directing it to the new endpoint.

While this is a more complete solution, it is also not without its drawbacks.  The complexity of maintaining the topology of the cluster is pushed onto the client.  As the cluster grows so will the number of connections the client will have open with each new server.  Lastly, there are some failure situations that the cluster cannot recover from automatically and require manual intervention before the client can continue.


You may be thinking: 
> I thought this was about endpoint discovery in Redis Enterprise? Why are we discussing client connections in Redis OSS?  

It is a good idea to be familiar with the solutions Redis OSS can provide along with the limitations. More importantly, it will allow you to see how the Redis Enterprise provides a different type of client discovery as well as the ones available in Redis OSS.

## The Easy Way --> DNS

Redis Enterprise was designed to utilize DNS to help solve this client discovery problem (among other things).  Once properly configured, each Redis Enterprise database is set up with a unique DNS domain and port.  A client can use the database domain to do a DNS lookup and then get back a single IP or list of IPs.  This IP is then used to establish a `TCP` connection.

{{<image filename="images/rs/endpoint-discovery/dns-discovery.png" width="600px">}}{{</image>}}

There are no direct connections to the Redis servers with Redis Enterprise.  Every connection goes through the proxy which in turn connects to the Redis servers, or shards.  The proxy is dynamically configured for each Redis database knowing the associated internal shard endpoints are and what partitions of data they are holding.  Shard failures or updates can cause their locations to change. The proxy will be updated automatically and be able to connect to the new location.  The client can just continue to use the same endpiont and the proxy will route the request appropriately.

{{<image filename="images/rs/endpoint-discovery/dns-shard-failure.png" width="600px">}}{{</image>}}

When the proxy cannot connect to a shard at all because resources are down or a network partition has occurred it may return a connection failure to the client.  The client should have some connection retry logic in place for a certain amount of attempts and/or time period.  As the resources are recovered or the failover has been completed the proxy will accept connections again.

There can be multiple proxies listening across Redis Enterprise nodes for a given database.  When the client does a DNS lookup it will receive a list of IPs. Subsequent lookups will rotate the list in a different order.  As application instances are spun up the load is spread across the endpoints.

{{<image filename="images/rs/endpoint-discovery/dns-multiple-proxies.png" width="700px">}}{{</image>}}

The IPs returned by the DNS lookup can change when a node fails, the database is being scaled out, the cluster is being updated or the proxy configuration is updated.  

{{<image filename="images/rs/endpoint-discovery/dns-node-failure.png" width="600px">}}{{</image>}}

Once failover has been completed, the DNS configurations are updated so that a client retrying the connection will eventually get the new endpoint.  The time this can take varies depending on the DNS services being used, the client DNS caching configuration and system configurations.

Utilizing DNS for discovery with Redis Enterprise databases is the simplest approach and provides the best experience as the cluster and database change over time. By utilizing DNS and the proxy Redis Enterprise can often orchestrate changes that have no impact to the clients at all.

## Enabling OSS Cluster API

A Redis Enterprise database can also be configured to utilize the Redis OSS cluster API.  The proxy supports the `CLUSTER` commands that allow for the client to discover the database topology.  Though the client does maintain database topology it still connects through the proxy which is true for all Redis Enterprise databases.

{{<image filename="images/rs/endpoint-discovery/oss-cluster-api-discovery.png" width="600px">}}{{</image>}}

From the client perspective, using the cluster API will be similar to interacting with a Redis OSS cluster but behind the scenes Redis Enterprise is orchestrating everything.  In the case when a database is scaled out further or other changes have occurred resulting in a different cluster topology, the client will get a `MOVED` response the same way it does in Redis OSS.  When change or failures occur the client can use the API to get an updated topology and then connect to the database through the new endpoints.

{{<image filename="images/rs/endpoint-discovery/oss-cluster-api-failure.png" width="600px">}}{{</image>}}

Utilizing this solution has some of the similar drawbacks to Redis OSS cluster, except that Redis Enterprise handles failures automatically.  On the other hand, there are some advantages for migration and performance. Deployments using Redis OSS cluster can migrate to  Redis Enterprise database with OSS Cluster API enabled and function in the same way they were before.  This configuration eliminates a lot of the cross node network hops which can be a performance benefit in extreme throughput scenarios.

## Using the Sentinel Service

Redis Enterprise exposes a Sentinel service (on port `8001`).

```
cluster.re.demo:8001> sentinel master demo
 1) "name"
 2) "demo"
 3) "ip"
 4) "172.18.0.21"
 5) "port"
 6) "18573"
 7) "flags"
 8) "master"
 9) "num-other-sentinels"
1)  "0"
```


This is not a Sentinel server but a service that exposes some Sentinel commands for discovering a proxy IP the port for the database.

{{<image filename="images/rs/endpoint-discovery/sentinel-service-discovery.png" width="600px">}}{{</image>}}

If the database endpoint is bound to a different node due to failures or changes to the configuration a new IP will be returned by the endpoint.

{{<image filename="images/rs/endpoint-discovery/sentinel-service-failure.png" width="600px">}}{{</image>}}

Only one IP is returned even if there are multiple proxies bound which means this would probably not be a good solution for a database where the proxy endpoints have been scaled to multiple Redis Enterprise nodes.  The client would not be able to discover all the endpoints for scaling or failover.


## Connecting through a Load Balancer

There are times when Redis Enterprise needs to be deployed behind a load balancer (usually because DNS is not available).  Typically, incoming requests will be Round Robin load balanced across all the proxies in the cluster. The client would then utilize the load balancer IP and port to connect to the database.  

{{<image filename="images/rs/endpoint-discovery/load-balancer-discovery.png" width="600px">}}{{</image>}}

Since a database must be configured to bind to every proxy in the cluster any change to shard configuration will not change how the client connects.  Node failures in the cluster may cause connection failures for the client which could be fixed by a retry (then the connection would be sent to another node).  

{{<image filename="images/rs/endpoint-discovery/load-balancer-failure.png" width="600px">}}{{</image>}}

It is possible to receive and error from the load balancer and a retry will be needed so the client should have connection retry logic in place, as usual.