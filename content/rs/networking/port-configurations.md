---
Title: Network port configurations
linkTitle: Network ports
description: This document describes the various network port ranges and their uses.
weight: $weight
alwaysopen: false
categories: ["RS"]
aliases: [
    /rs/administering/designing-production/networking/port-configurations/,
    /rs/networking/port-configurations/,
    /rs/administering/troubleshooting/network-configuration.md,
    /rs/administering/troubleshooting/network-configuration/,

]
---

All Redis Enterprise Software deployments span multiple physical/virtual nodes. You'll need to keep several ports open between these nodes. This document describes the various port ranges and their uses.

{{< note >}}
Whenever you create a new database, you must verify that the ports assigned to the new database's endpoints are open. The cluster will not perform this verification for you.
{{< /note >}}

## Ports and port ranges used by Redis Enterprise Software

Redis Enterprise Software's port usage falls into three general categories:

- Internal: For traffic between or within cluster nodes
- External: For traffic from client applications or external monitoring resources
- Active-Active: For traffic to and from clusters hosting Active-Active databases

| Protocol | Port | Configurable | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| TCP | 8001 | No | Internal, External | Traffic from application to Redis Enterprise Software [Discovery Service]({{< relref "/rs/databases/durability-ha/discovery-service.md" >}}) |
| TCP | 8000, 8070, 8071, 9090 | No | Internal, External | Metrics exported and managed by the web proxy |
| TCP | 8443 | Yes | Internal, External | Secure (HTTPS) access to the management web UI |
| TCP | 9081 | No | Internal | Active-Active management (internal) |
| TCP | 9443 (Recommended), 8080 | Yes | Internal, External, Active-Active | REST API traffic, including cluster management and node bootstrap |
| TCP | 10000-19999 | Yes | Internal, External, Active-Active | Database traffic |
| UDP | 53, 5353 | No | Internal, External | DNS/mDNS traffic |
| ICMP | * | No | Internal | Connectivity checking between nodes |
| TCP | 1968 | No | Internal | Proxy traffic |
| TCP | 3333-3344, 36379, 36380 | No | Internal | Internode communication |
| TCP | 20000-29999 | No | Internal | Database shard traffic |
| TCP | 8002, 8004, 8006 | Yes | Internal | Default system health monitoring (envoy admin, envoy management server, gossip envoy admin)|
| TCP | 8444, 9080 | No | Internal | Traffic between web proxy and cnm_http/cm |

## Change the admin console port

The Redis Enterprise Software admin console uses port 8443, by default. You can change this to a custom port as long as the new port is not in use by another process.

To change this port, run:

```sh
rladmin cluster config cm_port <new-port>
```

After changing the Redis Enterprise Software web UI port, you must connect any new node added to the cluster to the UI with the custom port number:
`https://newnode.mycluster.example.com:`**`<nonstandard-port-number>`**

## Change the envoy  ports

For system health monitoring, Redis uses the following ports by default:

- Port 8002 for envoy admin

- Port 8004 for envoy management server

- Port 8006 for gossip envoy admin

You can change each envoy port to a custom port using the [`rladmin cluster config`]({{<relref "/rs/references/cli-utilities/rladmin/cluster/config">}}) command as long as the new port is not in use by another process. When you change `envoy_admin_port`, expect a restart of envoy.

To change the envoy admin port, run:

```sh
$ rladmin cluster config envoy_admin_port <new-port>
Updating envoy_admin_port... restarting now
```

To change the envoy management server port, run:

```sh
$ rladmin cluster config envoy_mgmt_server_port <new-port>
Cluster configured successfully
```

To change the gossip envoy admin port, run:

```sh
$ rladmin cluster config gossip_envoy_admin_port <new-port>
Cluster configured successfully
```

## Change the REST API port

For the REST API, Redis Enterprise Software uses port 9443 (secure) and port 8080 (not secure), by default. You can change this to a custom port as long as the new port is not in use by another process.

To change these ports, run:

```sh
rladmin cluster config cnm_http_port <new-port>
```

```sh
rladmin cluster config cnm_https_port <new-port>
```

## Require HTTPS for API endpoints

By default, the Redis Enterprise Software API supports communication over HTTP and HTTPS. However, you can turn off HTTP support to ensure that API requests are encrypted.

Before you turn off HTTP support, make sure you migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint to prevent broken connections.

To turn off HTTP support for API endpoints, run:

```sh
rladmin cluster config http_support disabled
```

After you turn off HTTP support, traffic sent to the unencrypted API endpoint is blocked.


## HTTP to HTTPS redirection
Starting with version 6.0.12, you cannot use automatic HTTP to HTTPS redirection.
To poll metrics from the `metrics_exporter` or to access the admin console, use HTTPS in your request. HTTP requests won't be automatically redirected to HTTPS for those services. 

## Nodes on different VLANs

Nodes in the same cluster must reside on the same VLAN. If you can't
host the nodes on the same VLAN, then you must open [all ports]({{< relref "/rs/networking/port-configurations.md" >}}) between them.
