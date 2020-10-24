---
Title: Cluster behind a Load Balancer
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: /rs/administering/installing-upgrading/configuring/lba/
---
This page provides the guidelines for configuring Redis Enterprise cluster behind load balancer in an environment where DNS resolution is not available.

## DNS role for databases
Normally, Redis Enterprise uses DNS as a way to provide dynamic database endpoints.  A DNS name such as redis-12345.clustername.domain provides clients with access to the database resource:
If multiple proxies are in use, it resolves to multiple IPs so clients can load balance.
On fail-over or topology changes, it is automatically updated to reflect the live IP address(es)

In the absence of DNS, clients may still use an IP address but will not benefit from these capabilities (unless alternatives, such as a Redis Sentinel-aware client are used).

## Network architecture with Load Balancer
In this mode Enterprise Architecture depends on load balancers to expose services and provide the necessary service discovery.

A load balancer is configured in front of Redis Enterprise cluster, exposing several logical services:

- Control plane services, such as the Web admin console endpoint, used to access cluster administration interface

- Data plane services, such as a database endpoint, used to connect from client applications

Depending on which Redis Enterprise services you want to access outside the cluster you may need to configure the load balancers respectively. One or more Virtual IPs (VIPs) are defined on the load balancer to expose Redis Enterprise services.
The Architecture is demonstrated in the following diagram (the example has 3 nodes Redis Enterprise cluster with one database (DB1) configured on port 12000):

<to be added - image>

## Install Redis Enterprise Cluster
- Follow Redis Enterprise Software installation documentation to install latest version of Software https://docs.redislabs.com/latest/rs/installing-upgrading/
- Once the Redis Enterprise software installation is complete in all the nodes of cluster, start cluster setup as mentioned in https://docs.redislabs.com/latest/rs/administering/new-cluster-setup/
- In cluster setup it's important to note that in Create new cluster step provide cluster name (FQDN), it is required even when DNS is not in use. Remember that the same cluster name is also used to issue the licence keys. It is recommended to use a “.local” suffix in the FQDN.

## Load Balancer Configuration
- Ensure that the load balancer is performing TCP health checks on the cluster nodes
- Expose through a Virtual IP the following services as needed for the operational needs:

 Web Management Portal (8443)
 
 Control place Rest API service (secured: 9443, non secured: 8080)
 
 Database(s) Port(s) - in the range of 10000-19999
 
Full list of available services and ports are described here: https://docs.redislabs.com/latest/rs/administering/designing-production/networking/port-configurations/

Note: ONLY for the Web Management Portal ensure sticky sessions (8443)
- Certain LBAs provide specific logic to close idle connections, in that case, either disable this feature or make sure the applications connecting to Redis use reconnection logic.
- Make sure the LBA is fast enough to resolve connections between two clusters or applications that are connected to Redis databases through LBA.
- Choose the standard LBA which is commonly used in your environment and you have easy access and expertise in house for troubleshooting if any issue. 

## Redis Enterprise Cluster Configuration
There are certain recommended settings within Redis Enterprise cluster that ensure flawless connectivity experience for applications and admin users when they access the cluster via a Load Balancer.

Notes: 
- rladmin commands are performed only on the local cluster you are running it. 
- rladmin commands can be executed on only one of the nodes in a local cluster, no need to execute these commands on all the nodes of the local cluster.

```sh
 # enable all-node proxy policy by default
 rladmin tune cluster default_sharded_proxy_policy all-nodes

 # enable sparse placement by default
 rladmin tune cluster default_shards_placement sparse

 # ensure we redirect where necessary when running behind an LBA
 rladmin cluster config handle_redirects enabled
 ```
## Redis Enterprise Database Configuration

Once the cluster settings are done and LBAs are configured you can browse admin console in browser on https://load-balancer-virtual-ip:8443/ and then follow the new database configuration steps 
[Create
Database]({{< relref "/rs/administering/creating-databases/_index.md" >}}).

## IMPORTANT: Keep Load Balancer configuration updated on Redis Enterprise cluster changes

It's very important to update LBA in case of changes in cluster topology and/or IP addresses. Below are some common cases in which you need to update the LBA:

- Adding new nodes to the Redis Enterprise cluster
- Removing nodes from the Redis Enterprise cluster
- Maintenance for Redis Enterprise cluster nodes
- IP address changes for Redis Enterprise cluster nodes

Based on any of the above changes, you may also need to check redis connections in applications that are connected to Redis database. Especially if they are directly connected on IP addresses that have changed. 


