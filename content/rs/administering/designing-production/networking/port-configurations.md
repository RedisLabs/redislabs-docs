---
Title: Network Port Configurations
description:
weight: $weight
alwaysopen: false
categories: ["RS"]
---
To make sure Redis Enterprise Software servers can pass necessary communications between them,
we recommend all servers have the following ports open.

{{% Note %}}
You must manually update your firewall with the port for each new database endpoint. The cluster assigns ports (between 10,000 and 19,999) for database endpoints by default, and only verifies that new endpoints are not already in use.
{{% /Note %}}

## Ports and port ranges used by Redis Enterprise Software

There are 3 types of ports that are open for use by RS:

- Internal - The traffic is between or within the cluster nodes
- External - The traffic is from client applications or external monitoring resources
- Active-Active - The traffic is from clusters that host Active-Active databases

### Ports for traffic between the cluster and other systems

You need to open these ports in your firewall to allow traffic to pass from the cluster to other systems:

| Protocol | Port | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| TCP | 8001 | Internal, External | Traffic from application to Redis Enterprise Software [Discovery Service]({{< relref "/rs/concepts/data-access/discovery-service.md" >}}) |
| TCP | 8070, 8071 | Internal, External | Metrics exported and managed by the web proxy |
| TCP | 8443 | Internal, External | Secure (HTTPS) access to the management web UI |
| TCP | 9081 | Internal, Active-Active | Active-Active management |
| TCP | 9443 (Recommended), [8080](#turning-off-http-support) | Internal, External, Active-Active | REST API traffic, including cluster management and node bootstrap |
| TCP | 10000-19999 | Internal, External, Active-Active | Database traffic |
| UDP | 53, 5353 | Internal, External | DNS/mDNS traffic |

### Ports for traffic between cluster nodes

These ports are used by Redis Software between cluster nodes:

| Protocol | Port | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| ICMP | * | Internal | Connectivity checking between nodes |
| TCP | 1968 | Internal | Proxy traffic |
| TCP | 3333-3341, 3343-3344, 36379, 36380 | Internal | Internode communication |
| TCP | 20000-29999 | Internal | Database shard traffic |

### Ports for traffic within the cluster nodes

These ports are used by Redis Software within each cluster node:

| Protocol | Port | Connection Source | Description |
|------------|-----------------|-----------------|-----------------|
| TCP | 8002, 8004, 8006 | Internal | System health monitoring |
| TCP | 8444, 9080 | Internal | Traffic betwen web proxy and cnm_http/cm |

## Changing the management web UI port

You can change the default port for the Redis Enterprise Software web UI (8443) to a custom port, as long as the new port is not in use by another process.

To change the default port for the RS Web UI, on any node in the cluster run:

```sh
rladmin cluster config cm_port <new-port>
```

After changing the Redis Enterprise Software web UI port, you must connect any new node added to the cluster to the UI with the custom port number:
`https://newnode.mycluster.example.com:`**`<nonstandard-port-number>`**

## Disabling HTTP support for API endpoints

To harden deployments, you can disable the HTTP support for API endpoints that is supported by default.
Before you disable HTTP support, make sure you migrate any scripts or proxy configurations that use HTTP to the encrypted API endpoint to prevent broken connections.

To disable HTTP support for API endpoints, run:

```sh
rladmin cluster config http_support disabled
```

After you disable HTTP support, traffic sent to the unencrypted API endpoint is blocked.
